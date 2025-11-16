import { useEffect, useState } from "react";
import api from "../../../api/api";

const movementTypes = [
  { value: "entrada", label: "Entrada" },
  { value: "saida", label: "Saída" },
];

const emptyItemForm = {
  name: "",
  category: "",
  unit: "un",
  currentQuantity: 0,
  minQuantity: 0,
  location: "",
  notes: "",
};

const emptyMovementForm = {
  itemId: "",
  type: movementTypes[0].value,
  quantity: 0,
  reason: "",
  document: "",
  date: "",
};

export default function PainelGestao() {
  const [metrics, setMetrics] = useState(null);
  const [items, setItems] = useState([]);
  const [movements, setMovements] = useState([]);
  const [itemForm, setItemForm] = useState(emptyItemForm);
  const [movementForm, setMovementForm] = useState(emptyMovementForm);
  const [loading, setLoading] = useState(true);
  const [savingItem, setSavingItem] = useState(false);
  const [savingMovement, setSavingMovement] = useState(false);

  async function loadAll() {
    setLoading(true);
    try {
      const [metricsResp, itemsResp, movementsResp] = await Promise.all([
        api.get("/dashboard"),
        api.get("/inventory/items"),
        api.get("/inventory/movements?limit=8"),
      ]);
      setMetrics(metricsResp.data);
      setItems(itemsResp.data);
      setMovements(movementsResp.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!movementForm.itemId && items.length) {
      setMovementForm((prev) => ({ ...prev, itemId: items[0]._id }));
    }
  }, [items, movementForm.itemId]);

  async function handleItemSubmit(e) {
    e.preventDefault();
    setSavingItem(true);
    try {
      await api.post("/inventory/items", { ...itemForm, currentQuantity: Number(itemForm.currentQuantity) || 0, minQuantity: Number(itemForm.minQuantity) || 0 });
      setItemForm(emptyItemForm);
      await loadAll();
    } finally {
      setSavingItem(false);
    }
  }

  async function handleMovementSubmit(e) {
    e.preventDefault();
    setSavingMovement(true);
    try {
      await api.post("/inventory/movements", {
        ...movementForm,
        quantity: Number(movementForm.quantity) || 0,
      });
      setMovementForm((prev) => ({ ...emptyMovementForm, itemId: prev.itemId || (items[0]?._id || "") }));
      await loadAll();
    } finally {
      setSavingMovement(false);
    }
  }

  const lowStockIds = new Set(metrics?.lowStockItems?.map((item) => item._id) || []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Painel de gestão</h2>
          <p className="text-sm opacity-70">Visão consolidada de estoque, demandas e fluxos de saída.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={loadAll}>
          Atualizar
        </button>
      </div>

      {loading && !metrics ? (
        <div className="text-center py-10">Carregando dados...</div>
      ) : (
        <div className="grid md:grid-cols-4 gap-4">
          <div className="stat bg-emerald-50 rounded-2xl">
            <div className="stat-title">Plantios monitorados</div>
            <div className="stat-value text-emerald-700">{metrics?.plantations ?? 0}</div>
          </div>
          <div className="stat bg-emerald-50 rounded-2xl">
            <div className="stat-title">Necessidades abertas</div>
            <div className="stat-value text-emerald-700">{metrics?.openNeeds ?? 0}</div>
          </div>
          <div className="stat bg-emerald-50 rounded-2xl">
            <div className="stat-title">Solicitações ativas</div>
            <div className="stat-value text-emerald-700">{metrics?.activeRequests ?? 0}</div>
          </div>
          <div className="stat bg-rose-50 rounded-2xl">
            <div className="stat-title">Estoques críticos</div>
            <div className="stat-value text-rose-600">{metrics?.lowStock ?? 0}</div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleItemSubmit} className="bg-white rounded-2xl shadow p-5 space-y-3">
          <h3 className="text-lg font-semibold">Novo item de estoque</h3>
          <input
            className="input input-bordered"
            placeholder="Nome"
            value={itemForm.name}
            onChange={(e) => setItemForm((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
          <input
            className="input input-bordered"
            placeholder="Categoria"
            value={itemForm.category}
            onChange={(e) => setItemForm((prev) => ({ ...prev, category: e.target.value }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              className="input input-bordered"
              type="number"
              min="0"
              placeholder="Quantidade atual"
              value={itemForm.currentQuantity}
              onChange={(e) => setItemForm((prev) => ({ ...prev, currentQuantity: e.target.value }))}
            />
            <input
              className="input input-bordered"
              type="number"
              min="0"
              placeholder="Estoque mínimo"
              value={itemForm.minQuantity}
              onChange={(e) => setItemForm((prev) => ({ ...prev, minQuantity: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              className="input input-bordered"
              placeholder="Unidade"
              value={itemForm.unit}
              onChange={(e) => setItemForm((prev) => ({ ...prev, unit: e.target.value }))}
            />
            <input
              className="input input-bordered"
              placeholder="Localização"
              value={itemForm.location}
              onChange={(e) => setItemForm((prev) => ({ ...prev, location: e.target.value }))}
            />
          </div>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Observações"
            value={itemForm.notes}
            onChange={(e) => setItemForm((prev) => ({ ...prev, notes: e.target.value }))}
          />
          <button className={`btn btn-success w-full ${savingItem && "loading"}`} disabled={savingItem}>
            {savingItem ? "Salvando..." : "Adicionar"}
          </button>
        </form>

        <form onSubmit={handleMovementSubmit} className="bg-white rounded-2xl shadow p-5 space-y-3">
          <h3 className="text-lg font-semibold">Registrar entrada/saída</h3>
          <select
            className="select select-bordered w-full"
            value={movementForm.itemId}
            onChange={(e) => setMovementForm((prev) => ({ ...prev, itemId: e.target.value }))}
            required
          >
            <option value="">Selecione o item</option>
            {items.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <select
              className="select select-bordered"
              value={movementForm.type}
              onChange={(e) => setMovementForm((prev) => ({ ...prev, type: e.target.value }))}
            >
              {movementTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <input
              className="input input-bordered"
              type="number"
              min="0"
              placeholder="Quantidade"
              value={movementForm.quantity}
              onChange={(e) => setMovementForm((prev) => ({ ...prev, quantity: e.target.value }))}
            />
          </div>
          <input
            className="input input-bordered"
            placeholder="Motivo"
            value={movementForm.reason}
            onChange={(e) => setMovementForm((prev) => ({ ...prev, reason: e.target.value }))}
          />
          <input
            className="input input-bordered"
            placeholder="Documento / Nota"
            value={movementForm.document}
            onChange={(e) => setMovementForm((prev) => ({ ...prev, document: e.target.value }))}
          />
          <label className="form-control text-sm">
            <span>Data</span>
            <input
              type="date"
              className="input input-bordered"
              value={movementForm.date}
              onChange={(e) => setMovementForm((prev) => ({ ...prev, date: e.target.value }))}
            />
          </label>
          <button className={`btn btn-primary w-full ${savingMovement && "loading"}`} disabled={savingMovement}>
            {savingMovement ? "Registrando..." : "Salvar movimento"}
          </button>
        </form>

        <div className="bg-white rounded-2xl shadow p-5 space-y-4">
          <h3 className="text-lg font-semibold">Últimos movimentos</h3>
          <div className="space-y-3 max-h-[360px] overflow-auto pr-1">
            {movements.map((movement) => (
              <div key={movement._id} className="p-3 rounded-xl border bg-base-100 text-sm">
                <div className="font-semibold">
                  {movement.type === "entrada" ? "Entrada" : "Saída"} • {movement.item?.name}
                </div>
                <div className="opacity-70">
                  {movement.quantity} {movement.item?.unit} • {movement.reason || "—"}
                </div>
                <div className="text-xs opacity-50">
                  {movement.date ? new Date(movement.date).toLocaleDateString() : new Date(movement.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
            {!movements.length && <div className="text-sm opacity-60">Nenhum movimento ainda.</div>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Estoque monitorado</h3>
          <span className="text-sm opacity-70">{items.length} itens</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Categoria</th>
                <th>Qtd atual</th>
                <th>Mínimo</th>
                <th>Local</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className={lowStockIds.has(item._id) ? "bg-rose-50" : ""}>
                  <td className="font-semibold">{item.name}</td>
                  <td>{item.category || "—"}</td>
                  <td>
                    {item.currentQuantity} {item.unit}
                  </td>
                  <td>{item.minQuantity}</td>
                  <td>{item.location || "—"}</td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td colSpan={5} className="text-center opacity-60">
                    Nenhum item cadastrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
