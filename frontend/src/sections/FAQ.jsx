const QA = ({ title, text }) => (
  <div className="bg-[#CFF6C6] rounded-2xl p-5">
    <div className="flex items-center gap-2 mb-2">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#A8E6A3] text-[#0e7490]">
        <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m21 7l-2 10H7L5 7zM4 5h16l1 2H3z"/></svg>
      </span>
      <h4 className="font-semibold">{title}</h4>
    </div>
    <p className="text-sm opacity-90">{text}</p>
  </div>
);

export default function FAQ() {
  return (
    <section className="bg-[#CDECF9] min-h-full h-screen flex items-center">
      <div className="container mx-auto px-6 py-12 w-full">
        <h3 className="text-5xl font-extrabold text-[#0e2a47] mb-8">Perguntas Frequentes</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <QA title="Quanto tempo dura para ficar visível ao público?"
              text="FAQ ajuda a apresentar informações de forma clara. Usando perguntas e respostas, o conteúdo fica envolvente." />
          <QA title="Qual é a população atingida?"
              text="Explique público-alvo, alcance e critérios. Facilita planejamento e atendimento." />
          <QA title="Quais zonas rurais podem se cadastrarem?"
              text="Defina escopo de cadastro, requisitos e elegibilidade para comunidades." />
        </div>
      </div>
    </section>
  );
}
