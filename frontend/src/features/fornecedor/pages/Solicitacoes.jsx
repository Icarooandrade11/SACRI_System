import { useEffect, useState } from "react";
import api from "../../../api/api";

const statusOptions = [
  { value: "rascunho", label: "Rascunho" },
  { value: "enviada", label: "Enviada" },
  { value: "em_analise", label: "Em análise" },
  { value: "aprovada", label: "Aprovada" },
  { value: "em_execucao", label: "Em execução" },
  { value: "concluida", label: "Concluída" },
  { value: "cancelada", label: "Cancelada" },
];

const createItem = () => ({ name: "", quantity: 1, unit: "un" });
const emptyForm = {
  destination: "",
  contactEmail: "",
  expectedDate: "",
  status: statusOptions[1].value,
  notes: "",
  items: [createItem()],
};

export default function Solicitacoes() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const { data } = await api.get("/requests");
      setRequests(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function updateItem(index, patch) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    }));
  }

  function addItemRow() {
    setForm((prev) => ({ ...prev, items: [...prev.items, createItem()] }));
  }

  function removeItem(index) {
    setForm((prev) => {
      if (prev.items.length === 1) return prev;
      return { ...prev, items: prev.items.filter((_, i) => i !== index) };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        items: form.items.filter((item) => item.name).map((item) => ({ ...item, quantity: Number(item.quantity) || 0 })),
      };
      await api.post("/requests", payload);
      setForm({ ...emptyForm, items: [createItem()] });
      await load();
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(id, status) {
    try {
      await api.put(`/requests/${id}`, { status });
      await load();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Solicitações oficiais</h2>
          <p className="text-sm opacity-70">Envie pedidos para órgãos e parceiros e acompanhe cada etapa.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-4">
          <h3 className="text-lg font-semibold">Nova solicitação</h3>
          <input
            className="input input-bordered"
            placeholder="Órgão / parceiro destino"
            value={form.destination}
            onChange={(e) => setForm((prev) => ({ ...prev, destination: e.target.value }))}
            required
          />
          <input
            className="input input-bordered"
            placeholder="E-mail do contato"
            value={form.contactEmail}
            onChange={(e) => setForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
          />
          <label className="form-control text-sm">
            <span>Data desejada</span>
            <input
              type="date"
              className="input input-bordered"
              value={form.expectedDate}
              onChange={(e) => setForm((prev) => ({ ...prev, expectedDate: e.target.value }))}
            />
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Contexto / observações"
            value={form.notes}
            onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
          />
          <select
            className="select select-bordered"
            value={form.status}
            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Itens solicitados</p>
            {form.items.map((item, index) => (
              <div key={index} className="grid grid-cols-6 gap-2 items-center">
                <input
                  className="input input-bordered col-span-3"
                  placeholder="Item"
                  value={item.name}
                  onChange={(e) => updateItem(index, { name: e.target.value })}
                />
                <input
                  className="input input-bordered col-span-1"
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, { quantity: e.target.value })}
                />
                <input
                  className="input input-bordered col-span-1"
                  placeholder="Un"
                  value={item.unit}
                  onChange={(e) => updateItem(index, { unit: e.target.value })}
                />
                <button type="button" className="btn btn-ghost btn-xs" onClick={() => removeItem(index)}>
                  ×
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-sm btn-outline" onClick={addItemRow}>
              Adicionar item
            </button>
          </div>

          <button className={`btn btn-success w-full ${saving && "loading"}`} disabled={saving}>
            {saving ? "Enviando..." : "Registrar pedido"}
          </button>
        </form>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-10">Carregando solicitações...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Destino</th>
                    <th>Itens</th>
                    <th>Status</th>
                    <th>Prazo</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id}>
                      <td className="font-semibold">{request.code}</td>
                      <td>
                        <div className="font-semibold">{request.destination}</div>
                        <div className="text-xs opacity-70">{request.contactEmail || "—"}</div>
                      </td>
                      <td>
                        <ul className="text-xs">
                          {request.items?.map((item, idx) => (
                            <li key={idx}>
                              {item.name} ({item.quantity} {item.unit})
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <select
                          className="select select-bordered select-xs"
                          value={request.status}
                          onChange={(e) => handleStatusChange(request._id, e.target.value)}
                        >
                          {statusOptions.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="text-sm">
                        {request.expectedDate ? new Date(request.expectedDate).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))}
                  {!requests.length && (
                    <tr>
                      <td colSpan={5} className="text-center opacity-60">
                        Nenhuma solicitação registrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
