import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    target: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    relationship: { type: String, default: "amigo" },
  },
  { timestamps: true }
);

contactSchema.index({ owner: 1, target: 1 }, { unique: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
