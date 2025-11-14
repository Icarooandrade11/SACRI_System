export default function Acessos() {
  return (
    <main className="min-h-screen bg-[#F3FBFF]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-800">Acessos e canais</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="font-bold">Canais institucionais</h2>
            <ul className="mt-2 list-disc pl-5 text-black/70">
              <li>Prefeituras e Secretarias de Agricultura</li>
              <li>IPA / SDR</li>
              <li>ONGs e cooperativas</li>
            </ul>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="font-bold">Como solicitar apoio</h2>
            <ol className="mt-2 list-decimal pl-5 text-black/70">
              <li>Cadastro da família/comunidade</li>
              <li>Documentos e justificativa</li>
              <li>Anexos (fotos, localização, orçamento)</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
