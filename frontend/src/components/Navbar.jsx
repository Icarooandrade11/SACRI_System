import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const auth = useAuth();                    // pode ser null antes do provider
  const { user, logout } = auth || {};       // destructuring seguro
  const navigate = useNavigate();

  return (
    <header className="w-full bg-[#A8E6A3]">
      <div className="container mx-auto px-4 py-3 text-sm font-semibold tracking-wide flex items-center gap-4">
        <nav className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="link link-hover text-neutral-900">HOME</button>
          <span className="opacity-60">|</span>
          {!user ? (
            <>
              <button onClick={() => navigate("/login")} className="link link-hover text-neutral-900">LOGIN</button>
              <span className="opacity-60">|</span>
              <button onClick={() => navigate("/registrar")} className="link link-hover text-neutral-900">CADASTRO</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/comunidades")} className="link link-hover text-neutral-900">DASHBOARD</button>
              <span className="opacity-60">|</span>
              <button onClick={logout} className="link link-hover text-neutral-900">SAIR</button>
            </>
          )}
          <span className="opacity-60">|</span>
          <Link to="/familias" className="link link-hover text-neutral-900">FAMÍLIAS</Link>
        </nav>
      </div>
    </header>
  );
}
