// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { ROLES } from "../rbac/roles"; // ajuste o caminho se seu ROLES estiver aqui


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // boot: tenta restaurar usuário completo do localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) setUser(JSON.parse(raw));
      else {
        const token = localStorage.getItem("token");
        if (token) setUser({ token });
      }
    } catch {
      /* ignore */
    }
  }, []);

  function login(payload) {
    setUser(payload);
    try {
      localStorage.setItem("user", JSON.stringify(payload));
      if (payload?.token) localStorage.setItem("token", payload.token);
    } catch {}
  }

  function updateUser(partial) {
    setUser((prev) => {
      const next = { ...(prev || {}), ...(partial || {}) };
      try {
        localStorage.setItem("user", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Helper rápido pra dev: entrar como parceiro
export const mockLoginParceiro = (loginFn) =>
  loginFn({
    id: "p-001",
    name: "Fornecedor Alfa",
    email: "fornecedor@sacri.dev",
    role: ROLES.PARCEIRO,
    token: "mock-dev",
    meta: { phone: "(87) 99999-0000", organization: "Parceiros SACRI" },
  });

export { ROLES };
