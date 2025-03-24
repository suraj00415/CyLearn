import express from "express";

const router = express.Router();

// Home Route
router.get("/", (req, res) => {
    res.json({ message: "Welcome to Express API!" });
});

// Example API Route
router.get("/api/data", (req, res) => {
    res.json({ data: "Sample API Response" });
});

export default router;
