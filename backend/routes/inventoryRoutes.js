import express from "express";
import protect, { authorizeRoles } from "../middleware/authMiddleware.js";
import { SYSTEM_ROLES } from "../utils/roles.js";
import {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getStockMovements,
  createStockMovement,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.use(protect, authorizeRoles(...SYSTEM_ROLES));

router.route("/items").get(getInventoryItems).post(createInventoryItem);
router.route("/items/:id").put(updateInventoryItem).delete(deleteInventoryItem);
router.route("/movements").get(getStockMovements).post(createStockMovement);

export default router;
