import axios from "axios";
import { baseUrl } from "../consts.js";

export async function getToken() {
    try {
        const url = `${baseUrl}/api/tokens`;
        console.log("Token URL:", url);
        const response = await axios.post(
            url,
            new URLSearchParams({
                username: "guacadmin",
                password: "guacadmin",
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        console.log(response?.data);
        return response?.data?.authToken;
    } catch (error) {
        console.error("Error:", error.message);
    }
}
