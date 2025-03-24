import express from "express";
import cors from "cors";
import indexRoutes from "./routes/health-check.routes.js";
import vmRoutes from "./routes/vm.routes.js";
import bodyParser from "body-parser";

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", indexRoutes);
app.use("/vm", vmRoutes);

export default app;
