export default function VisionGrid() {
  const Card = ({ title, subtitle, color="bg-[#2DB3C7]" }) => (
    <div className="space-y-3">
      <div className={`${color} h-44 rounded-2xl`} />
      <div className="text-xs tracking-widest uppercase opacity-80">{title}</div>
      <div className="text-lg leading-snug">
        {subtitle}
      </div>
    </div>
  );

  return (
    <section className="relative bg-[#A8E6A3]">
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-white text-5xl sm:text-7xl font-extrabold mb-8">
          Visão <span className="text-white/95">geral</span> do nosso sistema
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card title="NEGOCIANTES" subtitle={<><b>Negociantes</b> rurais no brasil</>} color="bg-[#2DB3C7]" />
          <Card title="FAMÍLIAS" subtitle={<>Famílias <b>acessáveis</b> já em negócio</>} color="bg-[#CFF6C6]" />
          <Card title="REGIÕES" subtitle={<>Localidades de <b>negociantes rurais</b></>} color="bg-[#CDECF9]" />
          <Card title="ACESSOS" subtitle={<>Onde conseguir, e <b>como</b> conseguir</>} color="bg-[#CDECF9]" />
          <Card title="PLANTAÇÕES_RURAIS" subtitle={<>Todos os itens <b>comercializados</b></>} color="bg-[#2DB3C7]" />
          <Card title="NOVOS_NEGÓCIOS" subtitle={<>Oportunidades de <b>expansões</b></>} color="bg-[#CFF6C6]" />
        </div>
      </div>
    </section>
  );
}
