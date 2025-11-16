import Plantation from "../models/Plantation.js";
import InventoryItem from "../models/InventoryItem.js";
import StockMovement from "../models/StockMovement.js";
import Need from "../models/Need.js";
import Request from "../models/Request.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDashboardMetrics = asyncHandler(async (req, res) => {
  const [plantations, needsOpen, requests, lowStock, lastMovements] = await Promise.all([
    Plantation.countDocuments(),
    Need.countDocuments({ status: { $in: ["aberta", "em_andamento"] } }),
    Request.find(),
    InventoryItem.find({ $expr: { $lt: ["$currentQuantity", "$minQuantity"] } }),
    StockMovement.find().sort({ createdAt: -1 }).limit(5).populate("item", "name unit"),
  ]);

  const statusMap = requests.reduce((acc, req) => {
    acc[req.status] = (acc[req.status] || 0) + 1;
    return acc;
  }, {});

  const metrics = {
    plantations,
    openNeeds: needsOpen,
    activeRequests: requests.length,
    lowStock: lowStock.length,
    lowStockItems: lowStock,
    requestStatus: statusMap,
    lastMovements,
  };

  return res.json(metrics);
});
