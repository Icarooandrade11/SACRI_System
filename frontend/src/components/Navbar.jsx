import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#A8E6A3]">
      {/* Top strip com links LOGIN | CADASTRO | FAMÍLIAS */}
      <div className="container mx-auto px-4 py-3 text-sm font-semibold tracking-wide flex items-center gap-4">
        <span className="inline-flex items-center gap-2 text-neutral-700">
          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80"><path fill="currentColor" d="M11 21h-1v-8H6l7-10h1v8h4z"/></svg>
        </span>

        <nav className="flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="link link-hover text-neutral-900"
              >
                LOGIN
              </button>
              <span className="opacity-60">|</span>
              <button
                onClick={() => navigate("/registrar")}
                className="link link-hover text-neutral-900"
              >
                CADASTRO
              </button>
              <span className="opacity-60">|</span>
              <button
                onClick={() => navigate("/comunidades")}
                className="link link-hover text-neutral-900"
              >
                FAMÍLIAS
              </button>
            </>
          ) : (
            <>
              <span className="text-neutral-900">Olá, {user.name}</span>
              <span className="opacity-60">|</span>
              <button onClick={() => navigate("/dashboard")} className="link link-hover text-neutral-900">
                DASHBOARD
              </button>
              <span className="opacity-60">|</span>
              <button onClick={() => navigate("/comunidades")} className="link link-hover text-neutral-900">
                FAMÍLIAS
              </button>
              <span className="opacity-60">|</span>
              <button onClick={logout} className="link link-hover text-neutral-900">
                SAIR
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
