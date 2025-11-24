import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";
import { listOnlineUsers, setUserOffline, setUserOnline } from "./presence.js";
import { AUTH_COOKIE_NAME, parseCookies } from "./cookies.js";
import { buildDirectChannel, canAccessChannel, extractDirectTarget, PUBLIC_CHANNELS } from "./chatChannels.js";

let ioInstance;

function extractToken(socket) {
  if (socket.handshake.auth?.token) return socket.handshake.auth.token;
  const rawCookies = socket.handshake.headers?.cookie || "";
  const cookies = parseCookies(rawCookies);
  return cookies[AUTH_COOKIE_NAME];
}

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

export function initSocket(server, corsOptions = {}) {
  ioInstance = new Server(server, {
   cors: { origin: corsOptions.origin || "*", credentials: Boolean(corsOptions.credentials) },
  });

  ioInstance.use(async (socket, next) => {
    const token = extractToken(socket);
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
      for (const channel of PUBLIC_CHANNELS) {
        socket.join(channel);
      }
      await broadcastPresence();
    }

    socket.on("chat:join", async (channel) => {
      if (!channel || !user) return;
      const directTarget = extractDirectTarget(channel, user._id);
      const normalizedChannel = channel.startsWith("dm:") && directTarget
        ? buildDirectChannel(user._id, directTarget)
        : channel;

      const allowed = await canAccessChannel(user._id, normalizedChannel);
      if (!allowed) return;
      socket.join(normalizedChannel);
    });

    socket.on("chat:send", async ({ channel = "geral", text }) => {
      const trimmed = (text || "").trim();
      if (!user || !trimmed) return;

      const directTarget = extractDirectTarget(channel, user._id);
      const normalizedChannel = channel.startsWith("dm:") && directTarget
        ? buildDirectChannel(user._id, directTarget)
        : channel;

      const allowed = await canAccessChannel(user._id, normalizedChannel);
      if (!allowed) return;

      const message = await ChatMessage.create({
        channel: normalizedChannel,
        author: user._id,
        authorName: user.name,
        content: trimmed,
      });

      const payload = buildMessagePayload(message, user);
      ioInstance.to(normalizedChannel).emit("chat:message", payload);
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
