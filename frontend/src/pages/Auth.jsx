// src/pages/Auth.jsx
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, mockLoginParceiro } from "../context/AuthContext";
import api from "../api/api";
import { ROLES } from "../rbac/roles";

function Field({ icon, ...props }) {
  return (
    <label className="input input-bordered rounded-full flex items-center gap-2 bg-white/95">
      <span className="opacity-60">{icon}</span>
      <input {...props} className="grow bg-transparent outline-none" />
    </label>
  );
}

function LoginForm({ onMock }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("auth/login", f);
      login(data);
      if (data.role === ROLES.MORADOR) navigate("/", { replace: true });
      else navigate("/fornecedor", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Não foi possível entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Field
        type="email"
        placeholder="Email"
        value={f.email}
        onChange={(e) => setF((x) => ({ ...x, email: e.target.value }))}
        icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4l-8 5L4 8V6l8 5l8-5z"/></svg>}
        required
      />
      <Field
        type="password"
        placeholder="Password"
        value={f.password}
        onChange={(e) => setF((x) => ({ ...x, password: e.target.value }))}
        icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5"/></svg>}
        required
      />

      <button className={`btn btn-success rounded-full w-full ${loading && "loading"}`} disabled={loading}>
        {loading ? "Entrando..." : "Log in"}
      </button>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <button type="button" onClick={onMock} className="btn btn-sm">
        Entrar como PARCEIRO (mock)
      </button>

      <div className="text-sm space-y-1 text-center">
        <div>
          ou <Link className="link link-primary" to="/registrar">criar conta</Link>
        </div>
        <Link className="link" to="/recuperar-senha">
          Esqueceu sua senha?
        </Link>
      </div>
    </form>
  );
}

function SignupForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", role: ROLES.MORADOR, password: "", phone: "", organization: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", f);
      login(data);
      if (data.role === ROLES.MORADOR) navigate("/", { replace: true });
      else navigate("/fornecedor", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Não foi possível cadastrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Field
        placeholder="Full Name"
        value={f.name}
        onChange={(e) => setF((x) => ({ ...x, name: e.target.value }))}
        icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M10 12a5 5 0 1 1 5-5a5 5 0 0 1-5 5m-7 9a7 7 0 1 1 14 0z"/></svg>}
        required
      />
      <Field
        type="email"
        placeholder="Email Address"
        value={f.email}
        onChange={(e) => setF((x) => ({ ...x, email: e.target.value }))}
        icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 4l-8 5L4 8V6l8 5l8-5z"/></svg>}
        required
      />
      <div className="flex items-center gap-3">
        <Field
          type="password"
          placeholder="Password"
          value={f.password}
          onChange={(e) => setF((x) => ({ ...x, password: e.target.value }))}
          icon={<svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5"/></svg>}
          required
        />
        <select
          className="select select-bordered rounded-full grow bg-white/95"
          value={f.role}
          onChange={(e) => setF((x) => ({ ...x, role: e.target.value }))}
        >
          <option value={ROLES.MORADOR}>Participante / Morador</option>
          <option value={ROLES.AGENTE}>Agente Comunitário</option>
          <option value={ROLES.GESTOR}>Gestor</option>
          <option value={ROLES.ONG}>ONG</option>
        </select>
      </div>
      <p className="text-xs text-emerald-700">
        Participantes/moradores acessam apenas o site público. Para usar o sistema de gestão selecione um perfil de agente,
        gestor ou parceiro.
      </p>
      <p>

      </p>
      <p className="text-xs text-emerald-700">

        OBS: Após escolher como Parceiro ou Gestor, aguardar aprovação do ADMIN!
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <input
          className="input input-bordered rounded-full"
          placeholder="Telefone para contato"
          value={f.phone}
          onChange={(e) => setF((x) => ({ ...x, phone: e.target.value }))}
        />
        <input
          className="input input-bordered rounded-full"
          placeholder="Organização"
          value={f.organization}
          onChange={(e) => setF((x) => ({ ...x, organization: e.target.value }))}
        />
      </div>

      <button className={`btn btn-success rounded-full w-full ${loading && "loading"}`} disabled={loading}>
        {loading ? "Enviando..." : "Create Account"}
      </button>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      <div className="text-sm">
        ou <Link className="link link-primary" to="/login">Log in</Link>
      </div>
    </form>
  );
}

/** Bloco teal cobrindo o lado INATIVO */
function TealOverlay({ side }) {
  return (
    <motion.div
      className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-20"
      initial={false}
      animate={{ x: side === "right" ? "100%" : "0%" }}
      transition={{ type: "spring", stiffness: 90, damping: 16 }}
      aria-hidden
    >
      <div className={`absolute inset-0 ${side === "right" ? "rounded-l-[28px]" : "rounded-r-[28px]"} bg-[#0F6C7A]`} />
      <div className="absolute inset-0 p-6">
        <div className="wave-bubble w-56 h-20 top-10 right-10" />
        <div className="wave-card" />
        <div className="wave-line top-28 left-10 right-10" />
        <div className="wave-line top-48 left-10 right-10" />
        <div className="wave-line top-68 left-10 right-10" />
      </div>
    </motion.div>
  );
}

export default function Auth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); // para o mock

  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const isLogin = mode === "login";

  // controla modo via rota (/login ou /registrar)
  useEffect(() => {
    if (pathname.includes("registrar")) setMode("signup");
    else setMode("login");
  }, [pathname]);

  function handleGoLogin() {
    setMode("login");
    navigate("/login", { replace: true });
  }
  function handleGoSignup() {
    setMode("signup");
    navigate("/registrar", { replace: true });
  }
  function handleMockParceiro() {
    // agora realmente loga e redireciona
    mockLoginParceiro(login);
    navigate("/fornecedor", { replace: true });
  }

  const inactiveSide = isLogin ? "right" : "left";

  return (
    <section className="min-h-[calc(100vh-100px)] bg-gradient-to-b from-[#A8E6A3] to-[#9FE09E] flex items-center justify-center px-4">
      <div className="relative w-[1100px] max-w-[95vw] h-[560px] rounded-[28px] shadow-xl overflow-hidden border border-white/30 bg-white/30 backdrop-blur-md">
        <div className="absolute z-30 top-4 right-6 flex items-center gap-6 font-semibold text-emerald-900/80">
          <button onClick={handleGoLogin} className={isLogin ? "underline" : "opacity-70 hover:opacity-100"}>LOG IN</button>
          <button onClick={handleGoSignup} className={!isLogin ? "underline" : "opacity-70 hover:opacity-100"}>SIGN UP</button>
        </div>

        <div className="absolute inset-0 grid grid-cols-2">
          <div className={`relative flex items-center justify-center transition-all ${isLogin ? "z-10" : "z-0 pointer-events-none"}`}>
            <AnimatePresence mode="popLayout">
              {isLogin && (
                <motion.div
                  key="login-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="w-[520px] max-w-[90%] rounded-[24px] bg-white/90 p-8 shadow-md"
                >
                  <div className="text-3xl font-extrabold text-emerald-800 mb-6">Log in</div>
                  <LoginForm onMock={handleMockParceiro} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={`relative flex items-center justify-center transition-all ${!isLogin ? "z-10" : "z-0 pointer-events-none"}`}>
            <AnimatePresence mode="popLayout">
              {!isLogin && (
                <motion.div
                  key="signup-card"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="w-[520px] max-w-[90%] rounded-[24px] bg-white/90 p-8 shadow-md"
                >
                  <div className="text-3xl font-extrabold text-emerald-800 mb-6">Sign up</div>
                  <SignupForm />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        {/* cobre o lado inativo */}
          <TealOverlay side={inactiveSide} />
        </div>
      </div>
    </section>
  );
}