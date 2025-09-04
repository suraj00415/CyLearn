import {
    getKaliServiceManifest,
    getUbuntuPodManifest,
} from "../utils/manifestFiles/ubuntu.js";
import { getToken } from "../utils/guacamoleApiCalls/getToken.js";
import { createRDPConnection } from "../utils/guacamoleApiCalls/createConnection.js";
import { generateGuacamoleIdentifier } from "../utils/functions/generateGuacamoleId.js";
import { killConnection } from "../utils/guacamoleApiCalls/killConnection.js";
import * as k8s from "@kubernetes/client-node";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

async function waitForPodIP(namespace, podName, timeout = 300000) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const res = await k8sApi.readNamespacedPod({
            name: podName,
            namespace,
        });
        if (res.status.phase === "Running" && res.status.podIP) {
            return res.status.podIP;
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    throw new Error("Timed out waiting for pod to be ready");
}

export const createInstance = async (req, res) => {
    try {
        const machines = [
            {
                id: 1,
                image: "surajshah/linux-privilege-escalation:sudo",
                name: "linux-privilege-escalation-sudo",
                username: "karen",
                password: "abc123",
            },
            {
                id: 2,
                image: "surajshah/linux-privilege-escalation:suid",
                name: "linux-privilege-escalation-suid",
                username: "karen",
                password: "abc123",
            },
            {
                id: 3,
                image: "surajshah/linux-privilege-escalation:cap",
                name: "linux-privilege-escalation-capabilities",
                username: "karen",
                password: "abc123",
            },

            {
                id: 4,
                image: "surajshah/linux-privilege-escalation:cron",
                name: "linux-privilege-escalation-cronjobs",
                username: "karen",
                password: "abc123",
            },
            {
                id: 5,
                image: "surajshah/linux-privilege-escalation:path",
                name: "linux-privilege-escalation-path",
                username: "karen",
                password: "abc123",
            },

            {
                id: 6,
                image: "surajshah/ubuntu-vm:v2",
                name: "ubuntu-gnome",
                username: "testuser",
                password: "toor",
            },
        ];

        // Step 1: Create the Pod in the default namespace (or your chosen one)
        const labId = req?.body?.labId;
        let selectedLab = {};
        if (
            labId == undefined ||
            labId == null ||
            labId > machines.length ||
            labId <= 0
        ) {
            selectedLab = machines[5];
        } else {
            selectedLab = machines.find((a) => a.id == Number(labId));
        }
        const userId = Math.random().toString(36).substring(7);
        const podLabel = `${selectedLab?.name}-${userId}`;
        const podManifest = getUbuntuPodManifest(
            userId,
            selectedLab?.name,
            selectedLab?.image
        );
        const createResponse = await k8sApi.createNamespacedPod({
            namespace: "default",
            body: podManifest,
        });
        console.log("Response:", createResponse?.metadata?.name);
        const podName = createResponse?.metadata?.name;
        console.log(`Pod ${podName} created`);

        // Step 2: Wait for the pod to be running and get its IP
        const podIP = await waitForPodIP("default", podName);
        console.log(`Pod ${podName} is running at ${podIP}`);

        // Step 3️ Create a NodePort Service
        const serviceManifest = getKaliServiceManifest(
            podName,
            podLabel,
            selectedLab?.name
        );
        const serviceResponse = await k8sApi.createNamespacedService({
            namespace: "default",
            body: serviceManifest,
        });
        const serviceName = serviceResponse?.metadata?.name;
        console.log("Service created:", serviceName);
        // Step 4: (Simulated) Update Guacamole connection
        const token = await getToken();
        const connectionId = await createRDPConnection(
            token,
            serviceName,
            podName,
            selectedLab?.username,
            selectedLab?.password
        );
        const clientID = generateGuacamoleIdentifier(
            connectionId,
            "c",
            "mysql"
        );
        res.json({
            podName,
            podIP,
            sessionIdentifier: connectionId,
            guacUrl: `${process.env.GUACAMOLE_WEBURL_FRONTEND}/#/client/${clientID}`,
            serviceName: serviceName,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
};

export const deleteInstance = async (req, res) => {
    const podName = req.body?.podName;
    const connectionIdentifier = req.body?.connectionIdentifier;
    if (!podName) {
        return res.status(400).json({ error: "Pod name is required" });
    }

    const deleteResponse = await k8sApi.deleteNamespacedPod({
        name: podName,
        namespace: "default",
    });

    const token = await getToken();
    const deleteConnectionResponse = await killConnection(
        connectionIdentifier,
        token
    );
    if (deleteConnectionResponse) {
        return res.json({ status: "Success" });
    }
    return res.status(500).json({ error: "Failed to delete pod" });
};
