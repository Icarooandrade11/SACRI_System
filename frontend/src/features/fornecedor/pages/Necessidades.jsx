import { useEffect, useMemo, useState } from "react";
import api from "../../../api/api";

const priorities = [
  { value: "alta", label: "Alta" },
  { value: "media", label: "Média" },
  { value: "baixa", label: "Baixa" },
];

const statusOptions = [
  { value: "aberta", label: "Aberta" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "atendida", label: "Atendida" },
  { value: "cancelada", label: "Cancelada" },
];

const emptyForm = {
  title: "",
  community: "",
  description: "",
  priority: priorities[0].value,
  category: "",
  dueDate: "",
};

export default function Necessidades() {
  const [needs, setNeeds] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get("/needs");
      setNeeds(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!statusFilter) return needs;
    return needs.filter((need) => need.status === statusFilter);
  }, [needs, statusFilter]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/needs", form);
      setForm(emptyForm);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function updateNeed(id, payload) {
    try {
      await api.put(`/needs/${id}`, payload);
      await load();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Necessidades prioritárias</h2>
          <p className="text-sm opacity-70">Planeje doações conforme o impacto em cada comunidade.</p>
        </div>
        <select
          className="select select-bordered w-full lg:w-64"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Todas as situações</option>
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-4">
          <h3 className="text-lg font-semibold">Registrar necessidade</h3>
          <input
            className="input input-bordered"
            placeholder="Título"
            value={form.title}
            onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            required
          />
          <input
            className="input input-bordered"
            placeholder="Comunidade / Família"
            value={form.community}
            onChange={(e) => setForm((prev) => ({ ...prev, community: e.target.value }))}
          />
          <input
            className="input input-bordered"
            placeholder="Categoria (ex. alimentação, irrigação)"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
          />
          <textarea
            className="textarea textarea-bordered"
            placeholder="Descrição do que é necessário"
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="select select-bordered"
              value={form.priority}
              onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
            >
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
            <label className="form-control text-sm">
              <span>Prazo limite</span>
              <input
                type="date"
                className="input input-bordered"
                value={form.dueDate}
                onChange={(e) => setForm((prev) => ({ ...prev, dueDate: e.target.value }))}
              />
            </label>
          </div>
          <button className={`btn btn-success w-full ${saving && "loading"}`} disabled={saving}>
            {saving ? "Registrando..." : "Salvar"}
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-10">Carregando necessidades...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 border rounded-2xl">Sem registros nesta situação.</div>
          ) : (
            filtered.map((need) => (
              <div key={need._id} className="border rounded-2xl p-4 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{need.title}</p>
                    <p className="text-sm opacity-70">{need.community || "Comunidade não informada"}</p>
                  </div>
                  <select
                    className="select select-bordered select-sm"
                    value={need.status}
                    onChange={(e) => updateNeed(need._id, { status: e.target.value })}
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-3 text-sm opacity-80 whitespace-pre-line">{need.description}</div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className={`badge ${need.priority === "alta" ? "badge-error" : need.priority === "baixa" ? "badge-ghost" : "badge-warning"}`}>
                    Prioridade {priorities.find((p) => p.value === need.priority)?.label}
                  </span>
                  {need.category && <span className="badge badge-outline">{need.category}</span>}
                  {need.dueDate && <span className="badge badge-outline">Até {new Date(need.dueDate).toLocaleDateString()}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
