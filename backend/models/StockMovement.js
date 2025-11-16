import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema(
  {
    item: { type: mongoose.Schema.Types.ObjectId, ref: "InventoryItem", required: true },
    type: { type: String, enum: ["entrada", "saida"], required: true },
    quantity: { type: Number, required: true },
    reason: String,
    document: String,
    date: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const StockMovement = mongoose.model("StockMovement", stockMovementSchema);
export default StockMovement;
