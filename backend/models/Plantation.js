import mongoose from "mongoose";

const plantationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    culture: { type: String, required: true },
    area: String,
    stage: {
      type: String,
      enum: ["preparo", "plantio", "manutencao", "colheita"],
      default: "preparo",
    },
    status: {
      type: String,
      enum: ["planejada", "em_andamento", "colhida", "suspensa"],
      default: "em_andamento",
    },
    plantingDate: Date,
    harvestForecast: Date,
    irrigationSystem: String,
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Plantation = mongoose.model("Plantation", plantationSchema);
export default Plantation;
