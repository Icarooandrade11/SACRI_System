import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ comunidades: 0, plantacoes: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [c, p] = await Promise.all([
          api.get("/communities"),
          api.get("/crops")
        ]);
        setStats({ comunidades: c.data.length, plantacoes: p.data.length });
      } catch (e) {
        // silencioso para primeira carga sem dados
      }
    })();
  }, []);

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">Comunidades</div>
        <div className="stat-value">{stats.comunidades}</div>
        <div className="stat-desc">Cadastradas</div>
      </div>
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">Plantações</div>
        <div className="stat-value">{stats.plantacoes}</div>
        <div className="stat-desc">Ativas</div>
      </div>
      <div className="stat bg-base-200 rounded-xl">
        <div className="stat-title">Relatórios</div>
        <div className="stat-value">Básicos</div>
        <div className="stat-desc">Versão inicial</div>
      </div>
    </section>
  );
}
