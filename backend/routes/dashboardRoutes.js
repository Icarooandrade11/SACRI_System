import express from "express";
import protect, { authorizeRoles } from "../middleware/authMiddleware.js";
import { SYSTEM_ROLES } from "../utils/roles.js";
import { getDashboardMetrics } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, authorizeRoles(...SYSTEM_ROLES), getDashboardMetrics);

export default router;
