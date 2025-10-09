import { useEffect, useState } from "react";
import api from "../api/api";

export default function Plantacoes() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ familyName: "", cropType: "", area: "", production: "", needs: "" });
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const { data } = await api.get("/crops");
      setItems(data);
    } catch (e) {}
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/crops", {
        ...form,
        production: Number(form.production || 0)
      });
      setForm({ familyName: "", cropType: "", area: "", production: "", needs: "" });
      await load();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Cadastrar Plantação</h2>
        <form onSubmit={handleCreate} className="grid gap-3">
          <input className="input input-bordered" placeholder="Família" value={form.familyName} onChange={e=>setForm(f=>({...f, familyName: e.target.value}))} required />
          <input className="input input-bordered" placeholder="Tipo de cultura (ex: milho, feijão)" value={form.cropType} onChange={e=>setForm(f=>({...f, cropType: e.target.value}))} required />
          <input className="input input-bordered" placeholder="Área (ex: 2 ha)" value={form.area} onChange={e=>setForm(f=>({...f, area: e.target.value}))} />
          <input className="input input-bordered" placeholder="Produção (kg)" value={form.production} onChange={e=>setForm(f=>({...f, production: e.target.value}))} />
          <textarea className="textarea textarea-bordered" placeholder="Necessidades (insumos, irrigação...)" value={form.needs} onChange={e=>setForm(f=>({...f, needs: e.target.value}))} />
          <button className={`btn btn-primary ${loading && "loading"}`} disabled={loading}>{loading ? "Salvando..." : "Salvar"}</button>
        </form>
      </div>

      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Lista de Plantações</h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead><tr><th>Família</th><th>Tipo</th><th>Área</th><th>Produção</th></tr></thead>
            <tbody>
              {items.map(c=>(
                <tr key={c._id}>
                  <td>{c.familyName}</td>
                  <td>{c.cropType}</td>
                  <td>{c.area || "-"}</td>
                  <td>{c.production ?? "-"}</td>
                </tr>
              ))}
              {items.length===0 && (
                <tr><td colSpan="4" className="text-center opacity-60">Sem registros ainda.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
