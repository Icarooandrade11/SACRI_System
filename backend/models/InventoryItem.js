import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "insumo" },
    unit: { type: String, default: "un" },
    currentQuantity: { type: Number, default: 0 },
    minQuantity: { type: Number, default: 0 },
    location: String,
    notes: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);
export default InventoryItem;
