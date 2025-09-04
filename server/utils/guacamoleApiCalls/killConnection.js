import axios from "axios";
import { baseUrl } from "../consts.js";

export async function killConnection(connectionId, token) {
    try {
        const url = `${baseUrl}/api/session/data/mysql/connections/${connectionId}?token=${token}`;
        const response = await axios.delete(url);
        return true;
    } catch (error) {
        console.error("Error:", error.message);
    }
}
