import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Interceptor para respostas (mantém compatível com CORS)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se quiser tratar erros globais no futuro, é aqui
    return Promise.reject(
      error?.response?.data || error
    );
  }
);

export default api;