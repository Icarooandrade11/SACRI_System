import { useEffect, useMemo, useState } from "react";
import api from "../../../api/api";

const columns = [
  { value: "rascunho", label: "Rascunho" },
  { value: "enviada", label: "Enviada" },
  { value: "em_analise", label: "Em análise" },
  { value: "aprovada", label: "Aprovada" },
  { value: "em_execucao", label: "Execução" },
  { value: "concluida", label: "Concluída" },
  { value: "cancelada", label: "Cancelada" },
];

export default function StatusSolicitacoes() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const grouped = useMemo(() => {
    return columns.map((column) => ({
      ...column,
      items: requests.filter((request) => request.status === column.value),
    }));
  }, [requests]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Status das solicitações</h2>
          <p className="text-sm opacity-70">Visão kanban para acelerar aprovações.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={load}>
          Atualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Carregando...</div>
      ) : (
        <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4">
          {grouped.map((column) => (
            <div key={column.value} className="rounded-2xl border bg-white/80 p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold uppercase text-emerald-500">{column.label}</p>
                  <p className="text-2xl font-black text-emerald-700">{column.items.length}</p>
                </div>
              </div>
              <div className="space-y-3 overflow-auto max-h-[420px] pr-1">
                {column.items.length === 0 ? (
                  <div className="text-xs opacity-60">Sem registros</div>
                ) : (
                  column.items.map((item) => (
                    <div key={item._id} className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                      <p className="font-semibold">{item.destination}</p>
                      <p className="text-xs opacity-70">{item.code}</p>
                      <p className="text-xs opacity-70">
                        {item.items?.length || 0} itens • prazo {item.expectedDate ? new Date(item.expectedDate).toLocaleDateString() : "—"}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
