import { useEffect, useMemo, useState } from "react";
import api from "../../../api/api";

const stages = [
  { value: "preparo", label: "Preparo" },
  { value: "plantio", label: "Plantio" },
  { value: "manutencao", label: "Manutenção" },
  { value: "colheita", label: "Colheita" },
];

const statuses = [
  { value: "planejada", label: "Planejada" },
  { value: "em_andamento", label: "Em andamento" },
  { value: "colhida", label: "Colhida" },
  { value: "suspensa", label: "Suspensa" },
];

const emptyForm = {
  name: "",
  culture: "",
  area: "",
  stage: stages[0].value,
  status: statuses[1].value,
  plantingDate: "",
  harvestForecast: "",
  irrigationSystem: "",
  notes: "",
};

export default function Plantacoes() {
  const [plantations, setPlantations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState("");

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get("/plantations");
      setPlantations(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    return statuses.map((status) => ({
      ...status,
      count: plantations.filter((p) => p.status === status.value).length,
    }));
  }, [plantations]);

  const filtered = plantations.filter((p) =>
    filter ? `${p.name} ${p.culture} ${p.stage}`.toLowerCase().includes(filter.toLowerCase()) : true
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/plantations", form);
      setForm(emptyForm);
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await api.put(`/plantations/${id}`, { status });
      await load();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Mapa de Plantios</h2>
          <p className="text-sm opacity-70">Monitoramento em tempo real das frentes de cultivo.</p>
        </div>
        <input
          className="input input-bordered w-full lg:w-64"
          placeholder="Buscar por cultura ou talhão"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.value} className="p-4 rounded-2xl border bg-gradient-to-br from-white to-emerald-50">
            <p className="text-xs font-semibold uppercase text-emerald-500">{stat.label}</p>
            <p className="text-3xl font-black text-emerald-700">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-4 lg:col-span-1">
          <h3 className="text-lg font-semibold">Nova plantação</h3>
          <input
            className="input input-bordered"
            placeholder="Nome do talhão"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            className="input input-bordered"
            placeholder="Cultura"
            value={form.culture}
            onChange={(e) => setForm((prev) => ({ ...prev, culture: e.target.value }))}
            required
          />
          <input
            className="input input-bordered"
            placeholder="Área / Hectares"
            value={form.area}
            onChange={(e) => setForm((prev) => ({ ...prev, area: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className="select select-bordered"
              value={form.stage}
              onChange={(e) => setForm((prev) => ({ ...prev, stage: e.target.value }))}
            >
              {stages.map((stage) => (
                <option key={stage.value} value={stage.value}>
                  {stage.label}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered"
              value={form.status}
              onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
            >
              {statuses.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="form-control text-sm">
              <span>Plantio</span>
              <input
                type="date"
                className="input input-bordered"
                value={form.plantingDate}
                onChange={(e) => setForm((prev) => ({ ...prev, plantingDate: e.target.value }))}
              />
            </label>
            <label className="form-control text-sm">
              <span>Colheita prevista</span>
              <input
                type="date"
                className="input input-bordered"
                value={form.harvestForecast}
                onChange={(e) => setForm((prev) => ({ ...prev, harvestForecast: e.target.value }))}
              />
            </label>
          </div>
          <input
            className="input input-bordered"
            placeholder="Sistema de irrigação"
            value={form.irrigationSystem}
            onChange={(e) => setForm((prev) => ({ ...prev, irrigationSystem: e.target.value }))}
          />
          <textarea
            className="textarea textarea-bordered"
            placeholder="Observações"
            value={form.notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          />
          <button className={`btn btn-success w-full ${saving && "loading"}`} disabled={saving}>
            {saving ? "Salvando..." : "Registrar"}
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="text-center py-10">Carregando plantios...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10 border rounded-2xl">Nenhuma plantação encontrada.</div>
          ) : (
            <div className="space-y-4">
              {filtered.map((plantation) => (
                <div key={plantation._id} className="border rounded-2xl p-4 bg-white shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{plantation.name}</p>
                      <p className="text-sm opacity-70">
                        {plantation.culture} • {plantation.area || "Área não informada"}
                      </p>
                    </div>
                    <select
                      className="select select-bordered select-sm"
                      value={plantation.status}
                      onChange={(e) => handleStatusChange(plantation._id, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-3 grid sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-semibold">Etapa:</span> {stages.find((s) => s.value === plantation.stage)?.label}
                    </div>
                    <div>
                      <span className="font-semibold">Plantio:</span>{" "}
                      {plantation.plantingDate ? new Date(plantation.plantingDate).toLocaleDateString() : "—"}
                    </div>
                    <div>
                      <span className="font-semibold">Previsão:</span>{" "}
                      {plantation.harvestForecast ? new Date(plantation.harvestForecast).toLocaleDateString() : "—"}
                    </div>
                    <div>
                      <span className="font-semibold">Irrigação:</span> {plantation.irrigationSystem || "—"}
                    </div>
                  </div>
                  {plantation.notes && <p className="text-sm mt-3 opacity-70">{plantation.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
