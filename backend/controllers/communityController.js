import Community from "../models/Community.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getCommunities = asyncHandler(async (req, res) => {
  const communities = await Community.find().sort({ createdAt: -1 });
  return res.json(communities);
});

export const createCommunity = asyncHandler(async (req, res) => {
  const { name, region, families, contact, description } = req.body;
  if (!name) return res.status(400).json({ message: "Nome é obrigatório" });

  const community = await Community.create({
    name,
    region,
    families,
    contact,
    description,
    createdBy: req.user._id,
  });

  return res.status(201).json(community);
});
