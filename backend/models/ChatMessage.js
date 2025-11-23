import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    channel: { type: String, default: "geral", index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    authorName: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default ChatMessage;
