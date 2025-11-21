import { useState } from "react";
import { motion } from "framer-motion";

const RESOURCES = [
  {
    title: "MANUAL DE INSTRUÇÕES",
    text: "O que terá para sua utilidade e seus alcances.",
    details: [
      "Passo a passo de cadastro, criação de comunidade e visibilidade pública",
      "Como usar o painel de gestão, filtros e dashboards",
      "Checklist de segurança de dados e links rápidos para suporte",
    ],
  },
  {
    title: "APRENDA TODOS OS ACESSOS",
    text: "Dê ao seu público uma breve descrição deste recurso.",
    details: [
      "Acesso às áreas de comunidades, logística, parceiros e órgãos",
      "Fluxos para liberar ou revogar permissões por perfil",
      "Tutoriais curtos em vídeo ou PDF para compartilhar com o público",
    ],
  },
  {
    title: "CANAL DE COMUNICAÇÃO COM GOVERNO/ONGS",
    text: "Como será feito o contato e acompanhamento.",
    details: [
      "Templates de e-mail e ofícios para prefeituras, ONGs e SDR",
      "Espaço para acompanhar protocolos e respostas",
      "Registro das reuniões com histórico visível para gestores",
    ],
  },
];

function ResourceCard({ title, text, onRead }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-black/5 flex flex-col gap-3">
      <div className="h-32 bg-[#2DB3C7] rounded-2xl relative overflow-hidden">
        <div className="absolute right-8 bottom-6 w-32 h-28 rounded-xl rotate-6 bg-[#CDECF9]" />
      </div>
      <div className="text-[11px] tracking-widest uppercase text-neutral-500">Recurso</div>
      <div className="font-semibold text-lg">{title}</div>
      <p className="opacity-80 text-sm flex-1">{text}</p>
      <button onClick={onRead} className="btn btn-sm btn-outline mt-2 rounded-full self-start">LEIA MAIS</button>
    </div>
  );
}

function ResourceDetail({ resource, onClose }) {
  if (!resource) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-sm rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200"
        >
          Fechar
        </button>
        <p className="text-xs uppercase tracking-widest text-[#0e7490]">Leia mais</p>
        <h4 className="text-2xl font-extrabold text-[#0e2a47]">{resource.title}</h4>
        <p className="mt-2 text-gray-700">{resource.text}</p>
        <ul className="mt-4 space-y-2 list-disc pl-5 text-sm text-[#0e2a47]">
          {resource.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <div className="mt-4 rounded-2xl bg-[#F3FAF1] p-4 text-sm text-gray-700">
          <p className="font-semibold text-[#0e2a47]">Dica</p>
          <p>Use estes recursos como onboarding rápido para novos perfis e para responder dúvidas recorrentes.</p>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesGrid() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative bg-[#A8E6A3] rounded-3xl shadow-inner border border-black/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-[#CDECF9]/20" />
      <div className="relative container mx-auto px-6 py-14 w-full space-y-8">
        <h3 className="text-white text-4xl sm:text-5xl font-extrabold">Recursos a serem utilizados</h3>
        <p className="text-white/90 max-w-3xl">
          Organize tutoriais, fluxos de comunicação e orientação para que visitantes e empreendedores entendam o que está disponível
          no site e no sistema.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {RESOURCES.map((res) => (
            <motion.div key={res.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <ResourceCard title={res.title} text={res.text} onRead={() => setSelected(res)} />
            </motion.div>
          ))}
        </div>
      </div>
      <ResourceDetail resource={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
    