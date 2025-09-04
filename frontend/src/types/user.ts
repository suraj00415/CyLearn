export type MessageType = "user" | "assistant";

export interface Message {
    id: string;
    type: MessageType;
    content: string;
    timestamp?: string;
    code?: string;
    security_level?: string;
    cwe_list?: Array<{
        type: string;
        id: string;
        name: string;
        description: string;
        severity: "Critical" | "high" | "medium" | "low";
    }>;
    mitigation?: string;
    changes_explanation?: string;
}
