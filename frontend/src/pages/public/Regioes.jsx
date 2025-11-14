export default function Regioes() {
  const regioes = [
    { nome: "Mata Norte", foco: "Cana-de-açúcar, mandioca", observacao: "Tradição canavieira e usinas." },
    { nome: "Zona da Mata Sul", foco: "Banana, hortaliças", observacao: "Boa logística para RMR." },
    { nome: "Agreste", foco: "Feiras, milho/feijão", observacao: "Conexão com Caruaru e Polo têxtil." },
    { nome: "Sertão do São Francisco", foco: "Uva e Manga irrigada", observacao: "Exportação e packing-houses." },
  ];

  return (
    <main className="min-h-screen bg-[#F7FFFA]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">Regiões</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {regioes.map((r, i) => (
            <div key={i} className="rounded-xl bg-white p-4 shadow">
              <div className="font-bold text-lg">{r.nome}</div>
              <div className="text-black/70">Foco: {r.foco}</div>
              <p className="text-black/70">{r.observacao}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
