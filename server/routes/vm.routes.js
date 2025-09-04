import express from "express";
import {
    createInstance,
    deleteInstance,
} from "../controllers/vm.controllers.js";

const router = express.Router();

router.post("/create-instance", createInstance);

router.post("/delete-instance", deleteInstance);

export default router;
