
import Community from "../models/Community.js";

export const getCommunities = async (req, res) => {
  const communities = await Community.find();
  res.json(communities);
};

export const createCommunity = async (req, res) => {
  const { name, region, families, contact, description } = req.body;
  const community = await Community.create({ name, region, families, contact, description, createdBy: req.user._id });
  res.status(201).json(community);
};
