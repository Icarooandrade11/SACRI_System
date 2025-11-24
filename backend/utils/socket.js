import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";
import { listOnlineUsers, setUserOffline, setUserOnline } from "./presence.js";

let ioInstance;

function buildMessagePayload(message, user) {
  return {
    id: message.id,
    channel: message.channel,
    content: message.content,
    createdAt: message.createdAt,
    author: {
      id: user?._id?.toString?.() || message.author?.toString?.(),
      name: message.authorName,
    },
  };
}

async function broadcastPresence() {
  const users = await listOnlineUsers();
  ioInstance?.emit(
    "presence:update",
    users.map((u) => ({ id: u.id, name: u.name, role: u.role, online: u.online }))
  );
}

export function initSocket(server) {
  ioInstance = new Server(server, {
    cors: { origin: "*" },
  });

  ioInstance.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next();

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("name role online");
      if (user) {
        socket.data.user = user;
        await setUserOnline(user._id);
        return next();
      }
    } catch (error) {
      return next(error);
    }

    return next();
  });

  ioInstance.on("connection", async (socket) => {
    const user = socket.data.user;
    if (user) {
      socket.join("geral");
      await broadcastPresence();
    }

    socket.on("chat:join", (channel) => {
      if (!channel) return;
      socket.join(channel);
    });

    socket.on("chat:send", async ({ channel = "geral", text }) => {
      const trimmed = (text || "").trim();
      if (!user || !trimmed) return;

      const message = await ChatMessage.create({
        channel,
        author: user._id,
        authorName: user.name,
        content: trimmed,
      });

      const payload = buildMessagePayload(message, user);
      ioInstance.to(channel).emit("chat:message", payload);
    });

    socket.on("disconnect", async () => {
      if (user) {
        await setUserOffline(user._id);
        await broadcastPresence();
      }
    });
  });
}

export function emitChatMessage(message, user) {
  if (!ioInstance) return;
  const payload = buildMessagePayload(message, user);
  ioInstance.to(message.channel || "geral").emit("chat:message", payload);
}

export function emitPresenceSnapshot() {
  return broadcastPresence();
}

export function getIoInstance() {
  return ioInstance;
}
