export default function PlantacoesRurais() {
  const destaquesPE = [
    {
      cultura: "Uva (mesa e vinificação)",
      polo: "Petrolina/PE – Vale do São Francisco",
      obs: "Exportação forte; parceria com Juazeiro/BA.",
    },
    {
      cultura: "Manga",
      polo: "Petrolina/PE – Vale do São Francisco",
      obs: "Referência nacional em produtividade e qualidade.",
    },
    {
      cultura: "Cana-de-açúcar",
      polo: "Mata Norte",
      obs: "Tradição histórica; base para açúcar e etanol.",
    },
    {
      cultura: "Banana",
      polo: "Zona da Mata Sul",
      obs: "Boa oferta anual; abastece feiras e centrais.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#E8FFF0]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">
          Plantações Rurais — Destaques de Pernambuco
        </h1>

        <p className="mt-3 text-emerald-900/80">
          Panorama ilustrativo de polos e culturas relevantes do estado.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {destaquesPE.map((it, i) => (
            <div key={i} className="rounded-2xl bg-white p-5 shadow">
              <div className="text-xs font-bold tracking-widest text-black/60">CULTURA</div>
              <h2 className="text-xl font-bold mt-0.5">{it.cultura}</h2>
              <div className="mt-2 text-sm">
                <div className="font-semibold text-black/70">Polo:</div>
                <div>{it.polo}</div>
              </div>
              <p className="mt-2 text-black/75">{it.obs}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
