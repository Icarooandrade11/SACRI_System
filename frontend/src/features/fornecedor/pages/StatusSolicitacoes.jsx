export default function StatusSolicitacoes() {
  const columns = ["Em aberto", "Em análise", "Aprovada", "Em execução", "Concluída"];
  return (
    <>
      <h2 className="text-xl font-black mb-4">Status de Solicitações (Kanban)</h2>
      <div className="grid md:grid-cols-5 gap-3">
        {columns.map(c=>(
          <div key={c} className="rounded-xl border bg-white/80 p-3">
            <div className="font-bold mb-2">{c}</div>
            <div className="space-y-2">
              <div className="p-2 rounded bg-emerald-50 border">SOL-12</div>
              <div className="p-2 rounded bg-emerald-50 border">SOL-34</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
