export default function FamiliasPublico() {
  const familias = [
    { titular: "Maria do Carmo", comunidade: "Sítio Barra Nova (Agreste)", culturas: "Milho, feijão", contato: "(81) 9 1111-1111" },
    { titular: "João Pereira", comunidade: "Assentamento São José (Sertão)", culturas: "Caprinos, palma forrageira", contato: "(87) 9 2222-2222" },
  ];

  return (
    <main className="min-h-screen bg-[#FFFDF1]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">Famílias</h1>
        <p className="mt-3 text-black/70">Exemplo de famílias acessíveis para intermediação e apoio.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {familias.map((f, i) => (
            <div key={i} className="rounded-xl bg-white p-4 shadow">
              <div className="font-bold">{f.titular}</div>
              <div className="text-black/70">{f.comunidade}</div>
              <div className="text-black/70">Culturas: {f.culturas}</div>
              <div className="text-black/60 text-sm">Contato: {f.contato}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
