import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import SystemNotificationBell from "../../components/SystemNotificationBell.jsx";

const items = [
  { to: "/fornecedor/plantacoes", label: "PLANTAÇÕES" },
  { to: "/fornecedor/necessidades", label: "NECESSIDADES" },
  { to: "/fornecedor/solicitacoes", label: "SOLICITAÇÕES" },
  { to: "/fornecedor/status", label: "STATUS DE SOLICITAÇÕES" },
  { to: "/fornecedor/painel", label: "PAINEL DE GESTÃO" },
  // alinhei com as rotas: path "orgaos"
  { to: "/fornecedor/orgaos", label: "ÓRGÃOS - APD" },
];

export default function FornecedorLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = ((user?.name || user?.email || "U")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("") || "U").toUpperCase();

  return (
    <div className="min-h-screen bg-[#d8f3f6]">
      {/* topo */}
      <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-emerald-600">SACRI</span>
            <span className="text-2xl font-extrabold text-gray-400 select-none">SYSTEM</span>
          </div>

          {/* Notificações e perfil */}
          <div className="ml-auto flex items-center gap-2">
            <SystemNotificationBell />
            <div className="dropdown dropdown-end">
              <button className="btn btn-ghost btn-sm flex items-center gap-2" tabIndex={0}>
                <span className="hidden sm:block">PERFIL</span>
                <div className="avatar placeholder">
                  <div className="bg-emerald-200 text-emerald-800 rounded-full w-9 h-9 grid place-items-center font-semibold">
                    {initials}
                  </div>
                </div>
              </button>

              <ul tabIndex={0} className="dropdown-content menu p-3 shadow bg-base-100 rounded-box w-72">
                <li className="menu-title px-2 pt-1 pb-2">
                  <div className="text-xs text-gray-500">Logado como</div>
                  <div className="font-semibold">{user?.name || "—"}</div>
                  <div className="text-xs opacity-70">{user?.email || "sem e-mail"}</div>
                  {user?.role && <div className="badge badge-success mt-1">{user.role}</div>}
                </li>
                <li>
                  <Link to="/fornecedor/perfil">Meu Perfil</Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login", { replace: true });
                    }}
                  >
                    Sair
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* fundo com shapes */}
      <div className="relative">
        <motion.div
          className="absolute left-[20%] top-0 w-[55%] h-40 bg-[#9bd9e6]/40 rounded-3xl -z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[30%] top-56 w-[48%] h-52 bg-[#9bd9e6]/30 rounded-3xl rotate-6 -z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
        />
      </div>

      {/* grade principal */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        {/* sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-3">
          <div className="bg-white/90 rounded-2xl shadow p-4 sticky top-20">
            <div className="text-center mb-3">
              <div className="text-xl font-black text-cyan-700">SYSTEM</div>
              <div className="text-xl font-black text-emerald-600 -mt-1">SACRI</div>
            </div>
            <hr className="mb-3" />
            <nav className="space-y-3">
              {items.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  className={({ isActive }) =>
                    `block text-center font-extrabold tracking-wide rounded-full px-4 py-3 transition ${
                      isActive
                        ? "bg-emerald-500 text-white shadow"
                        : "bg-black text-white hover:bg-emerald-600"
                    }`
                  }
                  end
                >
                  {it.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-5">
              <div className="mx-auto w-20 flex justify-between opacity-70">
                <span className="w-2.5 h-2.5 bg-black rounded-full" />
                <span className="w-2.5 h-2.5 bg-black/60 rounded-full" />
                <span className="w-2.5 h-2.5 bg-black/30 rounded-full" />
              </div>
            </div>
          </div>
        </aside>

        {/* conteúdo (rotas filhas) */}
        <main className="col-span-12 md:col-span-9 lg:col-span-9">
          <div className="bg-white/90 rounded-2xl shadow p-6 min-h-[60vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
