export function getUbuntuPodManifest(userId, name, image) {
    // Create a unique label for the pod using the userId
    const podLabel = `${name}-${userId}`;
    return {
        apiVersion: "v1",
        kind: "Pod",
        metadata: {
            generateName: `${podLabel}-`,
            labels: { app: name, podLabel },
            namespace: "default",
        },
        spec: {
            containers: [
                {
                    name,
                    image,
                    securityContext: { privileged: true },
                    ports: [{ containerPort: 3389 }],
                },
            ],
        },
    };
}

export function getKaliServiceManifest(podName, podLabel, name) {
    return {
        apiVersion: "v1",
        kind: "Service",
        metadata: {
            name: `service-${podName}`,
            labels: { app: name, podLabel },
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
            selector: { app: name, podLabel },
        },
    };
}
