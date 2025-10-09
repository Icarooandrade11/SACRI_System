import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("sacri_user");
    return u ? JSON.parse(u) : null;
  });
  const navigate = useNavigate();

  // login
  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("sacri_user", JSON.stringify(data));
    localStorage.setItem("sacri_token", data.token);
    setUser(data);
    navigate("/dashboard");
  }

  // registrar
  async function register(payload) {
    const { data } = await api.post("/auth/register", payload);
    localStorage.setItem("sacri_user", JSON.stringify(data));
    localStorage.setItem("sacri_token", data.token);
    setUser(data);
    navigate("/dashboard");
  }

  function logout() {
    localStorage.removeItem("sacri_user");
    localStorage.removeItem("sacri_token");
    setUser(null);
    navigate("/login");
  }

  // garante persistência do tema (opcional)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
