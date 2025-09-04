import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import app from "./app.js";
import connectDB from "./utils/connectDB.js";

const PORT = process.env.PORT || 5010;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(
                `😊 Server is running on http://localhost:${PORT} 🙌😎`
            );
        });
    })
    .catch((error) => {
        console.log(
            "Error connecting to MongoDB so Server is Not Started:",
            error
        );
    });
