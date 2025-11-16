import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    destination: { type: String, required: true },
    contactEmail: String,
    status: {
      type: String,
      enum: ["rascunho", "enviada", "em_analise", "aprovada", "em_execucao", "concluida", "cancelada"],
      default: "rascunho",
    },
    expectedDate: Date,
    notes: String,
    items: [
      {
        name: String,
        quantity: Number,
        unit: String,
      },
    ],
    linkedNeed: { type: mongoose.Schema.Types.ObjectId, ref: "Need" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
export default Request;
