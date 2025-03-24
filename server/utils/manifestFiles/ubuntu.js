export function getUbuntuPodManifest(userId) {
    // Create a unique label for the pod using the userId
    const podLabel = `ubuntu-gnome-${userId}`;
    return {
        apiVersion: "v1",
        kind: "Pod",
        metadata: {
            generateName: `${podLabel}-`,
            labels: { app: "ubuntu-gnome", podLabel },
            namespace: "default",
        },
        spec: {
            containers: [
                {
                    name: "ubuntu-gnome",
                    image: "surajshah/ubuntu-vm:v1",
                    securityContext: { privileged: true },
                    ports: [{ containerPort: 3389 }],
                },
            ],
        },
    };
}

export function getKaliServiceManifest(podName,podLabel) {
    return {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
            name: `service-${podName}`,
            labels: { app: "ubuntu-gnome", podLabel },
        },
        spec: {
            type: "ClusterIP",
            ports: [
                {
                    port: 3389,
                    targetPort: 3389,
                    protocol: "TCP",
                },
            ],
            // The selector now matches the custom label we set on the pod
            selector: { app: "ubuntu-gnome", podLabel },
        },
    };
}
