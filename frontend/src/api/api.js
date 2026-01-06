import axios from "axios";

// 🔹 Base URL da API (Render em produção / localhost em dev)
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, ""); // remove "/" final se existir

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 🔐 cookies de sessão
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Erro vindo da API (status 4xx / 5xx)
    if (error.response) {
      console.error(
        "❌ API error:",
        error.response.status,
        error.response.data
      );
      return Promise.reject(error.response.data);
    }

    // Erro de rede / CORS / API offline
    console.error("❌ API error:", error.message);
    return Promise.reject(error);
  }
);

export default api;