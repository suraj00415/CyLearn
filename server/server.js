import dotenv from "dotenv";
dotenv.config({path: "./.env"});

import app from "./app.js";


const PORT = process.env.PORT || 5011;

app.listen(PORT, () => {
    console.log(`😊 Server is running on http://localhost:${PORT} 🙌😎`);
});
