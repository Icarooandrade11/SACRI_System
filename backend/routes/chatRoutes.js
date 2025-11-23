import express from "express";
import ChatMessage from "../models/ChatMessage.js";
import protect from "../middleware/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { emitChatMessage } from "../utils/socket.js";

const router = express.Router();

router.use(protect);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const channel = req.query.channel || "geral";
    const messages = await ChatMessage.find({ channel })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    res.json({
      messages: messages
        .reverse()
        .map((m) => ({
          id: m._id.toString(),
          channel: m.channel,
          content: m.content,
          createdAt: m.createdAt,
          author: { id: m.author?.toString?.(), name: m.authorName },
        })),
    });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const channel = req.body?.channel || "geral";
    const content = (req.body?.text || req.body?.content || "").trim();
    if (!content) return res.status(400).json({ message: "Mensagem obrigatória" });

    const message = await ChatMessage.create({
      channel,
      author: req.user._id,
      authorName: req.user.name,
      content,
    });

    emitChatMessage(message, req.user);
    res.status(201).json({
      id: message.id,
      channel: message.channel,
      content: message.content,
      createdAt: message.createdAt,
      author: { id: req.user.id, name: req.user.name },
    });
  })
);

export default router;
