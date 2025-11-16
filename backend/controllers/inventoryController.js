import InventoryItem from "../models/InventoryItem.js";
import StockMovement from "../models/StockMovement.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getInventoryItems = asyncHandler(async (req, res) => {
  const items = await InventoryItem.find().sort({ createdAt: -1 });
  return res.json(items);
});

export const createInventoryItem = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id };
  if (!payload.name) return res.status(400).json({ message: "Nome é obrigatório" });
  const item = await InventoryItem.create(payload);
  return res.status(201).json(item);
});

export const updateInventoryItem = asyncHandler(async (req, res) => {
  const item = await InventoryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item não encontrado" });
  Object.assign(item, req.body);
  const updated = await item.save();
  return res.json(updated);
});

export const deleteInventoryItem = asyncHandler(async (req, res) => {
  const item = await InventoryItem.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item não encontrado" });
  await item.deleteOne();
  return res.json({ message: "Item removido" });
});

export const getStockMovements = asyncHandler(async (req, res) => {
  const limit = Number(req.query.limit) || 50;
  const movements = await StockMovement.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate("item", "name unit");
  return res.json(movements);
});

export const createStockMovement = asyncHandler(async (req, res) => {
  const { itemId, type, quantity, reason, document, date } = req.body;
  const item = await InventoryItem.findById(itemId);
  if (!item) return res.status(404).json({ message: "Item não encontrado" });

  const qty = Number(quantity);
  if (!qty || qty <= 0) {
    return res.status(400).json({ message: "Quantidade inválida" });
  }

  if (type === "saida" && item.currentQuantity - qty < 0) {
    return res.status(400).json({ message: "Estoque insuficiente" });
  }

  item.currentQuantity = type === "entrada" ? item.currentQuantity + qty : item.currentQuantity - qty;
  await item.save();

  const movement = await StockMovement.create({
    item: itemId,
    type,
    quantity: qty,
    reason,
    document,
    date,
    createdBy: req.user._id,
  });

  return res.status(201).json(movement);
});
