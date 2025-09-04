import express from "express";
import cors from "cors";
import indexRoutes from "./routes/health-check.routes.js";
import vmRoutes from "./routes/vm.routes.js";
import llmRoutes from "./routes/llm.routes.js";
import userRoutes from "./routes/user.routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
// app.use(cors({ origin: process.env.WEB_SERVER, credentials: true }));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ limit: "30kb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", indexRoutes);
app.use("/api/vm", vmRoutes);
app.use("/api/user", userRoutes);
app.use("/api/llm", llmRoutes);

export default app;
