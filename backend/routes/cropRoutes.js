import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getCrops, createCrop } from "../controllers/cropController.js";

const router = express.Router();
router.route("/").get(protect, getCrops).post(protect, createCrop);
export default router;

    