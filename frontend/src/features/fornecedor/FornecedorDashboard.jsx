import { Link } from "react-router-dom";

export default function FornecedorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">Painel do Fornecedor</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">Pedidos Abertos</div>
          <div className="stat-value">12</div>
          <div className="stat-desc">Aguardando aceite</div>
        </div>
        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">Entregas Hoje</div>
          <div className="stat-value">3</div>
          <div className="stat-desc">Em rota</div>
        </div>
        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">SLA Médio</div>
          <div className="stat-value">92%</div>
          <div className="stat-desc">Últimos 30 dias</div>
        </div>
      </div>
      <div className="flex gap-3">
        <Link className="btn btn-primary btn-sm" to="/fornecedor/pedidos">Ver Pedidos</Link>
        <Link className="btn btn-secondary btn-sm" to="/fornecedor/entregas">Ver Entregas</Link>
      </div>
    </div>
  );
}
