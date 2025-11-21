import express from "express";

const router = express.Router();

// In-memory placeholder store
const messages = [
  {
    id: "seed-1",
    channel: "geral",
    author: "Sistema",
    text: "Canal de chat inicial pronto para receber mensagens.",
    createdAt: new Date(),
  },
];

router.get("/", (req, res) => {
  res.json({ messages });
});

router.post("/", (req, res) => {
  const { channel = "geral", author = "Usuário", text = "" } = req.body || {};
  const entry = {
    id: `msg-${Date.now()}`,
    channel,
    author,
    text,
    createdAt: new Date(),
  };
  messages.unshift(entry);
  res.status(201).json(entry);
});

export default router;
