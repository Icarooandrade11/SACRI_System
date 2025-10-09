import { useEffect, useState } from "react";
import api from "../api/api";

export default function Relatorios() {
  const [summary, setSummary] = useState({ comunidades: 0, plantacoes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [c, p] = await Promise.all([api.get("/communities"), api.get("/crops")]);
        setSummary({ comunidades: c.data.length, plantacoes: p.data.length });
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Relatórios básicos</h2>
      {loading ? (
        <div className="loading loading-spinner loading-lg" />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total de Comunidades</div>
              <div className="stat-value">{summary.comunidades}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total de Plantações</div>
              <div className="stat-value">{summary.plantacoes}</div>
            </div>
          </div>
        </div>
      )}

      <div className="divider"></div>
      <p className="opacity-80">
        Exportações PDF/Excel e dashboards avançados estão mapeados como **Média prioridade** e podem ser adicionados nas próximas versões.
      </p>
    </div>
  );
}
