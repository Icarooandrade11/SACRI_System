// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { disconnectSocket } from "../services/socket";
import { ROLES } from "../rbac/roles";

const USER_KEY = "sacri_user";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(USER_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed);
      }
    } catch (error) {
      console.error("Erro ao carregar sessão", error);
    } finally {
      setBootstrapped(true);
    }
  }, []);

  useEffect(() => {
    if (!bootstrapped) return;
    if (!user) refreshProfile();
  }, [bootstrapped]);

  function persistSession(payload) {
    if (!payload) {
      sessionStorage.removeItem(USER_KEY);
      setUser(null);
      return;
    }
    const { token: _, ...session } = payload;
    sessionStorage.setItem(USER_KEY, JSON.stringify(session));
  }

  function login(payload) {
    persistSession(payload);
  }

  function updateUser(partial) {
    setUser((prev) => {
      const next = { ...(prev || {}), ...(partial || {}) };
      persistSession(next);
      return next;
    });
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erro ao encerrar sessão", error);
    } finally {
      disconnectSocket();
      persistSession(null);
    }
  }

  async function refreshProfile() {
    try {
      persistSession({ ...user, ...data });
      return data;
    } catch (error) {
      logout();
      return null;
    }
  }

  const value = { user, login, logout, updateUser, refreshProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export const mockLoginParceiro = (loginFn) =>
  loginFn({
    _id: "mock-001",
    name: "Fornecedor Alfa",
    email: "fornecedor@sacri.dev",
    role: ROLES.PARCEIRO,
    token: "mock-dev",
    phone: "(87) 99999-0000",
    organization: "Parceiros SACRI",
  });

export { ROLES };
