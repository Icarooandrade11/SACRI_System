import { useEffect, useMemo, useState } from "react";
import api from "../../../api/api";

const statusLabel = {
  rascunho: "Rascunho",
  enviada: "Enviada",
  em_analise: "Em análise",
  aprovada: "Aprovada",
  em_execucao: "Em execução",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

export default function OrgaosAPD() {
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
    const map = new Map();
    requests.forEach((request) => {
      if (!map.has(request.destination)) {
        map.set(request.destination, { destination: request.destination, contactEmail: request.contactEmail, total: 0, statuses: {}, last: request.updatedAt || request.createdAt });
      }
      const entry = map.get(request.destination);
      entry.total += 1;
      entry.statuses[request.status] = (entry.statuses[request.status] || 0) + 1;
      entry.last = request.updatedAt && new Date(request.updatedAt) > new Date(entry.last) ? request.updatedAt : entry.last;
    });
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [requests]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Órgãos, parceiros e doadores</h2>
          <p className="text-sm opacity-70">Histórico de relacionamentos e tempo de resposta.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={load}>
          Atualizar
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Carregando parceiros...</div>
      ) : grouped.length === 0 ? (
        <div className="text-center py-10 border rounded-2xl">Nenhum pedido foi enviado ainda.</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-5">
          {grouped.map((partner) => (
            <div key={partner.destination} className="p-5 border rounded-2xl bg-white shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{partner.destination}</p>
                  <p className="text-sm opacity-70">{partner.contactEmail || "sem contato cadastrado"}</p>
                </div>
                <span className="badge badge-outline">{partner.total} solicitações</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {Object.entries(partner.statuses).map(([status, count]) => (
                  <div key={status} className="p-2 rounded-xl bg-emerald-50">
                    <p className="font-semibold">{count}</p>
                    <p className="text-xs opacity-70">{statusLabel[status] || status}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs opacity-70">
                Última atualização: {partner.last ? new Date(partner.last).toLocaleDateString() : "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
