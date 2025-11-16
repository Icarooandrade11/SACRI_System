// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api, { TOKEN_KEY } from "../api/api";
import { ROLES } from "../rbac/roles";

const USER_KEY = "sacri_user";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
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
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !user) {
      refreshProfile();
    }
  }, [bootstrapped]);

  function persistSession(payload) {
    if (!payload) {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      setUser(null);
      return;
    }
    const session = { ...payload };
    setUser(session);
    localStorage.setItem(USER_KEY, JSON.stringify(session));
    if (session.token) {
      localStorage.setItem(TOKEN_KEY, session.token);
    }
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

  function logout() {
    persistSession(null);
  }

  async function refreshProfile() {
    try {
      const { data } = await api.get("/auth/me");
      const token = localStorage.getItem(TOKEN_KEY) || user?.token;
      if (token) {
        persistSession({ ...data, token });
      } else {
        setUser(data);
      }
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
