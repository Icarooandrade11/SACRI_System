import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_BASE_URL.replace(/\/api$/, "");

let socket;

export function getSocket(token) {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ["websocket", "polling"],
    });
  }

  if (token) {
    socket.auth = { token };
  }

  return socket;
}

export function ensureSocketConnected(token) {
  const instance = getSocket(token);
  if (token) {
    instance.auth = { token };
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
