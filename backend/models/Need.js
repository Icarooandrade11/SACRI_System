import mongoose from "mongoose";

const needSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    community: String,
    priority: { type: String, enum: ["baixa", "media", "alta"], default: "media" },
    status: { type: String, enum: ["aberta", "em_andamento", "atendida", "cancelada"], default: "aberta" },
    description: String,
    category: String,
    dueDate: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Need = mongoose.model("Need", needSchema);
export default Need;
