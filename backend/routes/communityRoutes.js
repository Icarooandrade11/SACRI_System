import express from "express";
import protect, { authorizeRoles } from "../middleware/authMiddleware.js";
import { getCommunities, createCommunity } from "../controllers/communityController.js";
import { SYSTEM_ROLES } from "../utils/roles.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorizeRoles(...SYSTEM_ROLES), getCommunities)
  .post(protect, authorizeRoles(...SYSTEM_ROLES), createCommunity);

export default router;
