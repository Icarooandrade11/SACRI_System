import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "participante" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    try {
      await register(form);
    } catch (error) {
      setErr(error?.response?.data?.message || "Falha ao registrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-160px)] bg-gradient-to-br from-[#9BF6A3] to-[#7EE7A2] flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white/95 rounded-[28px] shadow-lg grid md:grid-cols-2 overflow-hidden">
        {/* esquerda */}
        <div className="p-8 sm:p-12">
          <div className="flex items-center justify-between mb-8">
            <div className="text-2xl font-extrabold text-[#34D399]">SACRI</div>
            <nav className="hidden sm:flex gap-6 text-[#34D399] font-semibold">
              <Link to="/">HOME</Link>
              <a className="opacity-60 cursor-not-allowed">ABOUT US</a>
              <a className="opacity-60 cursor-not-allowed">CONTACT</a>
              <span className="underline">SIGN UP</span>
            </nav>
          </div>

          <h1 className="text-4xl font-extrabold text-[#34D399] mb-6">Sign up</h1>
          {err && <div className="alert alert-error mb-3">{err}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="input input-bordered rounded-full flex items-center gap-2">
              <input type="text" className="grow" placeholder="Full Name" value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} required/>
            </label>

            <label className="input input-bordered rounded-full flex items-center gap-2">
              <input type="email" className="grow" placeholder="Email Address" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} required/>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="input input-bordered rounded-full flex items-center gap-2">
                <input type="password" className="grow" placeholder="Password" value={form.password} onChange={e=>setForm(f=>({...f, password: e.target.value}))} required/>
              </label>
              <label className="input input-bordered rounded-full flex items-center gap-2">
                <select className="grow bg-transparent" value={form.role} onChange={e=>setForm(f=>({...f, role: e.target.value}))}>
                  <option value="participante">Participante</option>
                  <option value="organizador">Organizador</option>
                </select>
              </label>
            </div>

            <button className={`btn btn-success rounded-full w-full ${loading && "loading"}`} disabled={loading}>
              {loading ? "Criando..." : "Create Account"}
            </button>

            <div className="text-sm mt-2">
              or <Link to="/login" className="link link-primary">Log in</Link>
            </div>
          </form>
        </div>

        {/* direita (painel teal com shapes) */}
        <div className="relative hidden md:block bg-[#0F6C7A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F6C7A] to-[#075E6A] rounded-l-[28px]" />
          <div className="absolute inset-0 p-8">
            <div className="absolute right-10 top-10 w-40 h-40 rounded-full bg-[#0ea5b9]/40 blur" />
            <div className="absolute left-12 top-24 right-12 bottom-12 rounded-2xl bg-[#065f6f]" />
            <div className="absolute left-16 top-36 right-16 h-10 rounded-full bg-[#0ea5b9]/30" />
            <div className="absolute left-16 top-56 right-16 h-10 rounded-full bg-[#0ea5b9]/30" />
            <div className="absolute left-16 top-76 right-16 h-10 rounded-full bg-[#0ea5b9]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
