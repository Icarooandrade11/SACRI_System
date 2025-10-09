import Crop from "../models/Crop.js";

export const getCrops = async (req, res) => {
  const crops = await Crop.find();
  res.json(crops);
};

export const createCrop = async (req, res) => {
  const { familyName, cropType, area, production, needs } = req.body;
  const crop = await Crop.create({ familyName, cropType, area, production, needs, createdBy: req.user._id });
  res.status(201).json(crop);
};

