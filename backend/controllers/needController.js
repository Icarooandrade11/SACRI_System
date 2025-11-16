import Need from "../models/Need.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getNeeds = asyncHandler(async (req, res) => {
  const needs = await Need.find().sort({ createdAt: -1 });
  return res.json(needs);
});

export const createNeed = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id };
  if (!payload.title) return res.status(400).json({ message: "Título é obrigatório" });
  const need = await Need.create(payload);
  return res.status(201).json(need);
});

export const updateNeedStatus = asyncHandler(async (req, res) => {
  const need = await Need.findById(req.params.id);
  if (!need) return res.status(404).json({ message: "Necessidade não encontrada" });
  if (req.body.status) need.status = req.body.status;
  if (req.body.priority) need.priority = req.body.priority;
  if (req.body.description) need.description = req.body.description;
  const updated = await need.save();
  return res.json(updated);
});
