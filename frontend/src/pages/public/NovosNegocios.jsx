export default function NovosNegocios() {
  const ideias = [
    { nome: "Polpa de frutas", valor: "Agregação de valor à manga/uva", parceiro: "Cooperativas locais" },
    { nome: "Embalagens e rotulagem", valor: "Preparar para varejo/feiras", parceiro: "Senai/SEBRAE" },
    { nome: "Microcrédito para irrigação", valor: "Aumentar produtividade", parceiro: "Agências locais" },
  ];

  return (
    <main className="min-h-screen bg-[#F4FFF7]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">Novos negócios</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {ideias.map((i, idx) => (
            <div key={idx} className="rounded-xl bg-white p-5 shadow">
              <div className="font-bold">{i.nome}</div>
              <div className="text-black/70">Impacto: {i.valor}</div>
              <div className="text-black/70">Parceiro sugerido: {i.parceiro}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
