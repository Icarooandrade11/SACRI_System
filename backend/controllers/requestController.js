import Request from "../models/Request.js";
import asyncHandler from "../utils/asyncHandler.js";

const buildCode = () => `REQ-${Date.now().toString(36).toUpperCase()}`;

export const getRequests = asyncHandler(async (req, res) => {
  const requests = await Request.find()
    .sort({ createdAt: -1 })
    .populate("linkedNeed", "title priority community");
  return res.json(requests);
});

export const createRequest = asyncHandler(async (req, res) => {
  const payload = { ...req.body, createdBy: req.user._id };
  if (!payload.destination) return res.status(400).json({ message: "Destino é obrigatório" });
  payload.code = payload.code || buildCode();
  const request = await Request.create(payload);
  return res.status(201).json(request);
});

export const updateRequest = asyncHandler(async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: "Solicitação não encontrada" });
  Object.assign(request, req.body);
  const updated = await request.save();
  return res.json(updated);
});
