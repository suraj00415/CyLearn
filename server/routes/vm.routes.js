import express from "express";
import * as k8s from "@kubernetes/client-node";
import {
    getKaliServiceManifest,
    getUbuntuPodManifest,
} from "../utils/manifestFiles/ubuntu.js";
import { getToken } from "../utils/guacamoleApiCalls/getToken.js";
import { createRDPConnection } from "../utils/guacamoleApiCalls/createConnection.js";
import { generateGuacamoleIdentifier } from "../utils/functions/generateGuacamoleId.js";

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const router = express.Router();

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

router.post("/create-instance", async (req, res) => {
    try {
        // Step 1: Create the Pod in the default namespace (or your chosen one)
        const userId = Math.random().toString(36).substring(7);
        const podLabel = `ubuntu-gnome-${userId}`;
        const podManifest = getUbuntuPodManifest(userId);
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
        const serviceManifest = getKaliServiceManifest(podName, podLabel);
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
            podName
        );
        const clientID = generateGuacamoleIdentifier(
            connectionId,
            "c",
            "mysql"
        );
        res.json({
            podName,
            podIP,
            guacUrl: `http://localhost:30008/guacamole/#/client/${clientID}`,
            serviceName: serviceName,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.toString() });
    }
});

export default router;
