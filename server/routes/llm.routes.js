import express from "express";
import { analyzeSecurity } from "../controllers/llm.controllers.js";

const router = express.Router();

router.post("/analyze", analyzeSecurity);

export default router;
