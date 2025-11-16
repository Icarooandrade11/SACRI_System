import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";

export default function FornecedorHome() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/dashboard");
        setMetrics(data);
      } catch {
        setMetrics(null);
      }
    })();
  }, []);

  const cards = [
    {
      title: "Plantações",
      value: metrics?.plantations ?? "—",
      link: "/fornecedor/plantacoes",
      description: "Talhões monitorados",
    },
    {
      title: "Necessidades",
      value: metrics?.openNeeds ?? "—",
      link: "/fornecedor/necessidades",
      description: "Pedidos em aberto",
    },
    {
      title: "Solicitações",
      value: metrics?.activeRequests ?? "—",
      link: "/fornecedor/solicitacoes",
      description: "Envios ativos",
    },
    {
      title: "Estoque crítico",
      value: metrics?.lowStock ?? "—",
      link: "/fornecedor/painel",
      description: "Itens abaixo do mínimo",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-3xl p-8 shadow">
        <h1 className="text-3xl font-black text-emerald-800 mb-2">Bem-vindo ao painel SACRI</h1>
        <p className="text-emerald-900/70 max-w-2xl">
          Centralize o registro das plantações, o controle de estoque e o envio de solicitações oficiais em um único ambiente.
          Utilize o menu lateral para navegar entre os módulos.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.title} to={card.link} className="p-4 rounded-2xl border bg-white shadow hover:-translate-y-0.5 transition">
            <p className="text-sm font-semibold text-emerald-500">{card.title}</p>
            <p className="text-3xl font-black text-emerald-700">{card.value}</p>
            <p className="text-xs opacity-70">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
