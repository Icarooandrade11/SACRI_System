import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setErr("");

      // aqui entraria seu POST real; por ora, login simples:
      login({ id: "u1", name: "Usuário", email: form.email, role: "AGENTE", token: "t" });
      navigate("/");
    } catch (e) {
      setErr("Falha ao entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full h-screen bg-gradient-to-br from-[#9BF6A3] to-[#7EE7A2] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white/95 rounded-[28px] shadow-lg grid md:grid-cols-2 overflow-hidden">
        <div className="p-8 sm:p-12">
          <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-extrabold text-[#34D399]">SACRI</div>
            <nav className="hidden sm:flex gap-6 text-[#34D399] font-semibold">
              <Link to="/">HOME</Link>
              <span className="opacity-60 cursor-not-allowed">ABOUT</span>
              <span className="opacity-60 cursor-not-allowed">CONTACT</span>
              <span className="underline">LOG IN</span>
            </nav>
          </div>

          <h1 className="text-4xl font-extrabold text-[#34D399] mb-6">Log in</h1>
          {err && <div className="alert alert-error mb-3">{err}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="input input-bordered rounded-full flex items-center gap-2">
              <input
                type="email"
                className="grow"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
              />
            </label>

            <label className="input input-bordered rounded-full flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
              />
            </label>

            <button className={`btn btn-success rounded-full w-full ${loading && "loading"}`} disabled={loading}>
              {loading ? "Entrando..." : "Log in"}
            </button>
          </form>
          <div className="text-sm mt-2">
            ou <Link to="/registrar" className="link link-primary">criar conta</Link>
          </div>
        </div>

        <div className="relative hidden md:block bg-[#0F6C7A]" />
      </div>
    </div>
  );
}
