import Plantation from "../models/Plantation.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getPlantations = asyncHandler(async (req, res) => {
  const plantations = await Plantation.find().sort({ createdAt: -1 });
  return res.json(plantations);
});

export const createPlantation = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id };
  if (!payload.name || !payload.culture) {
    return res.status(400).json({ message: "Nome e cultura são obrigatórios" });
  }
  const plantation = await Plantation.create(payload);
  return res.status(201).json(plantation);
});

export const updatePlantation = asyncHandler(async (req, res) => {
  const plantation = await Plantation.findById(req.params.id);
  if (!plantation) return res.status(404).json({ message: "Plantação não encontrada" });

  Object.assign(plantation, req.body);
  const updated = await plantation.save();
  return res.json(updated);
});

export const deletePlantation = asyncHandler(async (req, res) => {
  const plantation = await Plantation.findById(req.params.id);
  if (!plantation) return res.status(404).json({ message: "Plantação não encontrada" });
  await plantation.deleteOne();
  return res.json({ message: "Plantação removida" });
});
