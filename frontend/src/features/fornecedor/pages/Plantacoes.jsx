export default function Plantacoes() {
  return (
    <>
      <h2 className="text-xl font-black mb-4">Plantações</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[1,2,3].map(i=>(
          <div key={i} className="p-4 rounded-xl border bg-white shadow-sm">
            <div className="font-bold">Talhão {i}</div>
            <div className="text-sm opacity-70">Cultura, área, previsão…</div>
          </div>
        ))}
      </div>
    </>
  );
}
