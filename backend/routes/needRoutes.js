import express from "express";
import protect, { authorizeRoles } from "../middleware/authMiddleware.js";
import { SYSTEM_ROLES } from "../utils/roles.js";
import { getNeeds, createNeed, updateNeedStatus } from "../controllers/needController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorizeRoles(...SYSTEM_ROLES), getNeeds)
  .post(protect, authorizeRoles(...SYSTEM_ROLES), createNeed);

router
  .route("/:id")
  .put(protect, authorizeRoles(...SYSTEM_ROLES), updateNeedStatus);

export default router;
