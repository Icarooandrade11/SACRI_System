export default function PainelGestao() {
  return (
    <>
      <h2 className="text-xl font-black mb-4">Painel de Gestão</h2>
      <div className="grid md:grid-cols-3 gap-3">
        <div className="stat bg-emerald-50 rounded-xl">
          <div className="stat-title">Necessidades abertas</div>
          <div className="stat-value text-emerald-700">12</div>
        </div>
        <div className="stat bg-emerald-50 rounded-xl">
          <div className="stat-title">Pedidos em rota</div>
          <div className="stat-value text-emerald-700">3</div>
        </div>
        <div className="stat bg-emerald-50 rounded-xl">
          <div className="stat-title">Estoque crítico</div>
          <div className="stat-value text-emerald-700">2</div>
        </div>
      </div>
    </>
  );
}
