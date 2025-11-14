import { Link, useLocation } from "react-router-dom";

export default function Navbar({ variant }) {
  const { pathname } = useLocation();
  const isHome = variant === "home" || pathname === "/";

  if (isHome) {
    // Barra minimalista, transparente, no topo da HOME
    return (
      <header className="absolute inset-x-0 top-6 z-30">
        <div className="mx-auto max-w-7xl px-6 flex items-center gap-6">
          {/* logo simples */}
          <Link to="/" className="flex items-center gap-2 text-white/90 font-extrabold tracking-wider">
            <svg width="28" height="28" viewBox="0 0 24 24" className="opacity-90">
              <path d="M3 12l6-6l6 6l-6 6z" fill="currentColor" />
            </svg>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6 text-white/90 font-semibold text-lg">
            <Link to="/login" className="hover:text-white">LOGIN</Link>
            <span className="opacity-70">|</span>
            <Link to="/registrar" className="hover:text-white">CADASTRO</Link>
            <span className="opacity-70">|</span>
            <Link to="/familias" className="hover:text-white">FAMÍLIAS</Link>
          </nav>
        </div>
      </header>
    );
  }

  // Navbar padrão para o restante do site
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-emerald-600">SACRI</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/">Home</Link>
          <Link to="/comunidades">Comunidades</Link>
          <Link to="/familias">Famílias</Link>
          <Link to="/login" className="btn btn-sm">Entrar</Link>
        </nav>
      </div>
    </header>
  );
}
