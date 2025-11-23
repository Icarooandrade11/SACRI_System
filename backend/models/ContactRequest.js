import mongoose from "mongoose";

const contactRequestSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    relationship: { type: String, default: "amigo" },
    note: String,
    status: { type: String, enum: ["pendente", "aceita", "recusada"], default: "pendente", index: true },
  },
  { timestamps: true }
);

contactRequestSchema.index({ from: 1, to: 1 }, { unique: true });

const ContactRequest = mongoose.model("ContactRequest", contactRequestSchema);

export default ContactRequest;
