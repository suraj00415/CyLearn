import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const analyzeSecurity = asyncHandler(async (req, res) => {
    const url = process.env.LLM_SERVER + "/analyze";
    let data = req?.body?.sample_code;
    if (!data) throw new ApiError(403, "Sample Code Required");
    const sendData = {
        sample_code: JSON.stringify(data),
    };
    const response = await axios.post(url, sendData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response || !response.data)
        throw new ApiError(404, "Response Data Not Found");

    console.log("Response:", response.data);
    return res.status(200).json(
        new ApiResponse(200, "LLM Data SuccessFully Fetched", {
            id: Math.floor(Math.random() * 20000),
            type: "assistant",
            timestamp: new Date().toISOString(),
            ...response.data,
        })
    );
});
