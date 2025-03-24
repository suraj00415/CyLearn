import axios from "axios";
import { baseUrl } from "../consts.js";

export async function createRDPConnection(token, hostname, podname) {
    try {
        const url = `${baseUrl}/api/session/data/mysql/connections?token=${token}`;
        console.log("Create RDP Connection URL:", url);
        const data = {
            parentIdentifier: "ROOT",
            name: podname,
            protocol: "rdp",
            parameters: {
                hostname,
                port: "3389",
                username: "testuser",
                password: "toor",
                security: "rdp",
            },
            attributes: {},
        };

        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response.data);
        return response?.data?.identifier;
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
    }
}
