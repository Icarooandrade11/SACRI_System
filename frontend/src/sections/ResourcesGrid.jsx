const ResourceCard = ({ title, text }) => (
  <div className="bg-base-100 rounded-2xl p-6 shadow">
    <div className="h-36 bg-[#2DB3C7] rounded-2xl mb-4 relative overflow-hidden">
      <div className="absolute right-8 bottom-6 w-32 h-28 rounded-xl rotate-6 bg-[#CDECF9]" />
    </div>
    <div className="text-xs tracking-widest uppercase text-neutral-500">Recurso</div>
    <div className="font-semibold text-lg mb-2">{title}</div>
    <p className="opacity-80 text-sm">{text}</p>
    <button className="btn btn-sm btn-outline mt-4 rounded-full">LEIA MAIS</button>
  </div>
);

export default function ResourcesGrid() {
  return (
    <section className="relative bg-[#A8E6A3]">
      <div className="container mx-auto px-6 py-12">
        <h3 className="text-white text-5xl sm:text-6xl font-extrabold mb-8">Recursos a serem utilizados</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <ResourceCard title="MANUAL DE INSTRUÇÕES" text="O que terá para sua utilidade e seus alcances." />
          <ResourceCard title="APRENDA TODOS OS ACESSOS" text="Dê ao seu público uma breve descrição deste recurso." />
          <ResourceCard title="CANAL DE COMUNICAÇÃO COM GOVERNO/ONGS" text="Como será feito o contato e acompanhamento." />
        </div>
      </div>
    </section>
  );
}
