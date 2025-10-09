
import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  familyName: { type: String, required: true },
  cropType: { type: String, required: true },
  area: String,
  production: Number,
  needs: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Crop = mongoose.model("Crop", cropSchema);
export default Crop;
