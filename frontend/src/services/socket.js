import { io } from "socket.io-client";

// URL BASE DA API (ex: https://sacri-backend.onrender.com/api)
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// URL DO SOCKET (remove /api)
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  API_BASE_URL.replace(/\/api$/, "");

let socket;

export function getSocket() {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      withCredentials: true,
    });
  }
  return socket;
}

export function ensureSocketConnected(authToken) {
  const instance = getSocket();

  // 🔐 envia token no handshake
  if (authToken) {
    instance.auth = { token: authToken };
  }

  if (!instance.connected) {
    instance.connect();
  }

  return instance;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
