export default function Negociantes() {
  const lista = [
    { nome: "CooperAgro São Francisco", foco: "Uva/Manga (in natura)", regiao: "Petrolina/PE", contato: "(87) 9 0000-0000" },
    { nome: "Atacadão Verde PE", foco: "Hortifruti misto", regiao: "Região Metropolitana do Recife", contato: "(81) 9 0000-0000" },
    { nome: "Rede Agreste Food", foco: "Distribuição regional", regiao: "Caruaru/Agreste", contato: "(81) 9 0000-0000" },
  ];

  return (
    <main className="min-h-screen bg-[#F1FFFE]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">Negociantes</h1>
        <p className="mt-3 text-black/70">Lista ilustrativa de agentes compradores e distribuidores.</p>

        <div className="mt-6 space-y-4">
          {lista.map((n, i) => (
            <div key={i} className="rounded-xl bg-white p-4 shadow">
              <div className="font-bold text-lg">{n.nome}</div>
              <div className="text-black/70">{n.foco}</div>
              <div className="text-black/70">{n.regiao}</div>
              <div className="text-black/60 text-sm">{n.contato}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
