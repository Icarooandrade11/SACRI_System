import express from "express";
import protect, { authorizeRoles } from "../middleware/authMiddleware.js";
import { SYSTEM_ROLES } from "../utils/roles.js";
import {
  getPlantations,
  createPlantation,
  updatePlantation,
  deletePlantation,
} from "../controllers/plantationController.js";

const router = express.Router();

router
  .route("/")
  .get(protect, authorizeRoles(...SYSTEM_ROLES), getPlantations)
  .post(protect, authorizeRoles(...SYSTEM_ROLES), createPlantation);

router
  .route("/:id")
  .put(protect, authorizeRoles(...SYSTEM_ROLES), updatePlantation)
  .delete(protect, authorizeRoles(...SYSTEM_ROLES), deletePlantation);

export default router;
