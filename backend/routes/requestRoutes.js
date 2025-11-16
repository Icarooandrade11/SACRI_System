import express from "express";
import protect, { authorizeRoles } from "../middleware/authMiddleware.js";
import { SYSTEM_ROLES } from "../utils/roles.js";
import { getRequests, createRequest, updateRequest } from "../controllers/requestController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorizeRoles(...SYSTEM_ROLES), getRequests)
  .post(protect, authorizeRoles(...SYSTEM_ROLES), createRequest);

router
  .route("/:id")
  .put(protect, authorizeRoles(...SYSTEM_ROLES), updateRequest);

export default router;
