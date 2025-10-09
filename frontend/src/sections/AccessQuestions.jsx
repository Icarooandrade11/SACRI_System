function Bullet({ title, text }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#A8E6A3] text-[#0e7490]">
        <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m21 7l-2 10H7L5 7zM4 5h16l1 2H3z"/></svg>
      </div>
      <div>
        <div className="text-xs tracking-widest text-[#0e7490] font-semibold">{title}</div>
        <p className="text-[#0e2a47] mt-1">{text}</p>
      </div>
    </div>
  );
}

export default function AccessQuestions() {
  return (
    <section className="bg-[#CDECF9]">
      <div className="container mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10 items-start">
        <div className="relative">
          <span className="absolute -left-4 top-8 h-12 w-12 rounded-full bg-[#A8E6A3] blur-sm opacity-70" />
          <h3 className="text-5xl sm:text-6xl font-extrabold text-[#0e2a47] leading-tight">
            Qual suas <span className="bg-[#A8E6A3] px-2 rounded-md">formas</span><br/> de conseguir ser<br/> alcançado?
          </h3>
        </div>
        <div className="space-y-7">
          <Bullet
            title="O QUE VOCÊ PROPORCIONA?"
            text="O que sua família proporciona e quer de oportunidades para crescer? Como vocês atuam? Descreva aqui."
          />
          <Bullet
            title="QUAIS POSSIBILIDADES DE ACESSO?"
            text="Dê ideias e clareza para definirmos melhor logística e formas de propagar sua comunidade."
          />
          <Bullet
            title="COMUNICAÇÃO ENTRE COMUNIDADES"
            text="Conecte-se a outras comunidades e a acessores. Crie oportunidades de negócios e apoio estrutural."
          />
        </div>
      </div>
    </section>
  );
}
