
import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getCommunities, createCommunity } from "../controllers/communityController.js";

const router = express.Router();
router.route("/").get(protect, getCommunities).post(protect, createCommunity);
export default router;
