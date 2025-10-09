export default function Acessos() {
  const data = [
    {title:"Canais de contato", text:"Telefone, WhatsApp, e-mail e rádios locais."},
    {title:"Pontos de apoio", text:"Postos municipais, sindicatos rurais, igrejas e escolas."},
    {title:"Logística", text:"Rotas/dias de transporte, cooperativas e caronas solidárias."},
  ];
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">Acessos</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {data.map((it,idx)=>(
          <div key={idx} className="bg-base-100 rounded-2xl p-5 shadow border">
            <div className="h-32 bg-[#2DB3C7] rounded-xl mb-3" />
            <h4 className="text-lg font-semibold">{it.title}</h4>
            <p className="text-sm opacity-80">{it.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
