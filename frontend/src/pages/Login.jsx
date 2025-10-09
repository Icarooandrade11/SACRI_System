import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await login(form.email, form.password);
    } catch (error) {
      setErr(error?.response?.data?.message || "Falha ao entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-160px)] bg-gradient-to-br from-[#9BF6A3] to-[#7EE7A2] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white/95 rounded-[28px] shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* coluna esquerda */}
        <div className="p-8 sm:p-12">
          <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-extrabold text-[#34D399]">SACRI</div>
            <nav className="hidden sm:flex gap-6 text-[#34D399] font-semibold">
              <Link to="/">HOME</Link>
              <a className="opacity-60 cursor-not-allowed">ABOUT US</a>
              <a className="opacity-60 cursor-not-allowed">CONTACT</a>
              <span className="underline">LOG IN</span>
            </nav>
          </div>

          <h1 className="text-4xl font-extrabold text-[#34D399] mb-6">Log in</h1>

          {err && <div className="alert alert-error mb-3">{err}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="input input-bordered rounded-full flex items-center gap-2">
              <span className="opacity-60">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M10 12a5 5 0 1 1 5-5a5 5 0 0 1-5 5m-7 9a7 7 0 1 1 14 0z"/></svg>
              </span>
              <input type="email" className="grow" placeholder="Username" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} required/>
            </label>

            <label className="input input-bordered rounded-full flex items-center gap-2">
              <span className="opacity-60">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5"/></svg>
              </span>
              <input type="password" className="grow" placeholder="Password" value={form.password} onChange={e=>setForm(f=>({...f, password: e.target.value}))} required/>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" className="checkbox checkbox-sm"/><span>Remember Me</span></label>
              <a className="opacity-60">Forgot Password?</a>
            </div>

            <button className={`btn btn-success rounded-full w-full ${loading && "loading"}`} disabled={loading}>
              {loading ? "Entrando..." : "Log in"}
            </button>

            <div className="text-sm mt-2">
              or <Link to="/registrar" className="link link-primary">Sign up</Link>
            </div>
          </form>
        </div>

        {/* coluna direita com painel teal e shapes */}
        <div className="relative hidden md:block bg-[#0F6C7A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F6C7A] to-[#075E6A] rounded-l-[28px]" />
          <div className="absolute inset-0 p-8">
            <div className="absolute right-10 top-10 w-40 h-40 rounded-full bg-[#0ea5b9]/40 blur" />
            <div className="absolute left-12 top-24 right-12 bottom-12 rounded-2xl bg-[#065f6f] shadow-[inset_0_0_0_9999px_rgba(255,255,255,0.02)]" />
            <div className="absolute left-16 top-36 right-16 h-10 rounded-full bg-[#0ea5b9]/30" />
            <div className="absolute left-16 top-56 right-16 h-10 rounded-full bg-[#0ea5b9]/30" />
            <div className="absolute left-16 top-76 right-16 h-10 rounded-full bg-[#0ea5b9]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
