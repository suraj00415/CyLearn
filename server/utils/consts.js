export const baseUrl = process.env.GUACAMOLE_WEBURL;
export const option = {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
};
export const LogoutOption = {
    secure: true,
    httpOnly: true,
};
