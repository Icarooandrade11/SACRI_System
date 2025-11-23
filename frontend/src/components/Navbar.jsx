import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../rbac/roles";

const SYSTEM_ROLES = [ROLES.AGENTE, ROLES.GESTOR, ROLES.PARCEIRO, ROLES.ADMIN, ROLES.ONG];

export default function Navbar({ variant }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const isHome = variant === "home" || pathname === "/";
  const canAccessSystem = user && SYSTEM_ROLES.includes(user.role);

  const AuthButtons = () => (
    <div className="flex items-center gap-3 text-sm">
      {user ? (
        <>
          <span className="hidden sm:block text-emerald-900 font-semibold">Olá, {user.name?.split(" ")[0]}</span>
          {canAccessSystem && (
            <Link to="/fornecedor" className="btn btn-sm btn-success">Acessar sistema</Link>
          )}
          <button className="btn btn-sm btn-outline" onClick={logout}>
            Sair
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="btn btn-sm btn-outline">
            Entrar
          </Link>
          <Link to="/registrar" className="btn btn-sm btn-success">
            Criar conta
          </Link>
        </>
      )}
    </div>
  );

  if (isHome) {
    return (
      <header className="absolute inset-x-0 top-6 z-30">
        <div className="mx-auto max-w-7xl px-6 flex items-center gap-6 justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/90 font-extrabold tracking-wider">
            <svg width="28" height="28" viewBox="0 0 24 24" className="opacity-90">
              <path d="M3 12l6-6l6 6l-6 6z" fill="currentColor" />
            </svg>
          </Link>
          <nav className="flex flex-1 ap-4 sm:gap-6 text-white/90 font-semibold text-lg">
            <Link to="/familias" className="hover:text-white">
              FAMÍLIAS
            </Link>
            <Link to="/comunidades" className="hover:text-white">
              COMUNIDADES
            </Link>
            <Link to="/novos-negocios" className="hover:text-white">
              PARCERIAS
            </Link>
          </nav>
          <AuthButtons />
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-emerald-600">
          SACRI
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/comunidades">Comunidades</Link>
          <Link to="/familias">Famílias</Link>
          <Link to="/plantacoes-rurais">Plantações</Link>
        </nav>
        <AuthButtons />
      </div>
    </header>
  );
}
