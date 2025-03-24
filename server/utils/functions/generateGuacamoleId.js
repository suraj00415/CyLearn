export function generateGuacamoleIdentifier(connectionId, type, authProvider) {
    const rawString = `${connectionId}\0${type}\0${authProvider}`;
    return Buffer.from(rawString, "utf-8").toString("base64");
}
