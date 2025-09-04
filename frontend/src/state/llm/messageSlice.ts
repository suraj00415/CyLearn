import { Message } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Message[] = [
    {
        id: "welcome",
        type: "assistant",
        content: "Welcome to the Security Code Analyzer! Paste your code, and I'll analyze it for security vulnerabilities, identify CVEs and CWEs, and suggest secure alternatives.",
        timestamp: new Date().toISOString(),
    },
];

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<Message>) => {
            state.push(action.payload); // Append the new message while keeping previous ones
        },
        deleteMessage: (state, action: PayloadAction<Message>) => [
            {
                id: "welcome",
                type: "assistant",
                content: "Welcome to the Security Code Analyzer! Paste your code, and I'll analyze it for security vulnerabilities, identify CVEs and CWEs, and suggest secure alternatives.",
                timestamp: new Date().toISOString(),
            },
        ],
    },
});

export const { setMessage, deleteMessage } = messageSlice.actions;
export default messageSlice.reducer;
export const selectMessages = (state: any) => state.message;
