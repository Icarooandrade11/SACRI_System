import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../rbac/roles";

const MANAGE_ROLES = [ROLES.AGENTE, ROLES.GESTOR, ROLES.PARCEIRO, ROLES.ADMIN];

export default function Comunidades() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", region: "", families: "", contact: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const canManage = user && MANAGE_ROLES.includes(user.role);

  const q = useMemo(() => {
    const p = new URLSearchParams(location.search);
    return p.get("q")?.toLowerCase().trim() || "";
  }, [location.search]);

  async function load() {
    if (!canManage) return;
    try {
      const { data } = await api.get("/communities");
      setItems(data);
      setError("");
    } catch (e) {
      setError("Não foi possível carregar as comunidades.");
    }
  }

  useEffect(() => {
    load();
  }, [canManage]);

  const filtered = useMemo(() => {
    if (!q) return items;
    return items.filter(c =>
      [c.name, c.region, c.contact, c.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [items, q]);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/communities", { ...form, families: Number(form.families || 0) });
      setForm({ name: "", region: "", families: "", contact: "", description: "" });
      await load();
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Não foi possível salvar");
    } finally {
      setLoading(false);
    }
  }

  if (!canManage) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8 text-center">
        <h2 className="text-2xl font-bold text-emerald-700 mb-3">Acesso restrito</h2>
        <p className="text-sm opacity-70">
          Apenas organizadores, agentes e parceiros autenticados podem visualizar e registrar comunidades no sistema. Faça login
          com um perfil autorizado para continuar.
        </p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Cadastrar Comunidade</h2>
        <form onSubmit={handleCreate} className="grid gap-3">
          <input className="input input-bordered" placeholder="Nome" value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} required />
          <input className="input input-bordered" placeholder="Região" value={form.region} onChange={e=>setForm(f=>({...f, region: e.target.value}))} />
          <input className="input input-bordered" placeholder="Nº de famílias" value={form.families} onChange={e=>setForm(f=>({...f, families: e.target.value}))} />
          <input className="input input-bordered" placeholder="Contato" value={form.contact} onChange={e=>setForm(f=>({...f, contact: e.target.value}))} />
          <textarea className="textarea textarea-bordered" placeholder="Descrição" value={form.description} onChange={e=>setForm(f=>({...f, description: e.target.value}))} />
          <button className={`btn btn-primary ${loading && "loading"}`} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
        </form>
      </div>

      <div className="card bg-base-100 shadow p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Lista de Comunidades</h2>
          {q && <span className="text-sm opacity-70">Filtrando por: <b>{q}</b></span>}
        </div>
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Nome</th><th>Região</th><th>Famílias</th><th>Contato</th></tr></thead>
            <tbody>
              {filtered.map(c=>(
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.region || "-"}</td>
                  <td>{c.families ?? "-"}</td>
                  <td>{c.contact || "-"}</td>
                </tr>
              ))}
              {filtered.length===0 && (
                <tr><td colSpan="4" className="text-center opacity-60">Nenhuma comunidade encontrada.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
