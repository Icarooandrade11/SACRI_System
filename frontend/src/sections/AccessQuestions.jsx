import { useState } from "react";
import { motion } from "framer-motion";
import { useFeedback } from "../context/FeedbackContext.jsx";

const QUESTIONS = [
  {
    title: "O QUE VOCÊ PROPORCIONA?",
    text: "O que sua família proporciona e quer de oportunidades para crescer? Como vocês atuam? Descreva aqui.",
  },
  {
    title: "QUAIS POSSIBILIDADES DE ACESSO?",
    text: "Dê ideias e clareza para definirmos melhor logística e formas de propagar sua comunidade.",
  },
  {
    title: "COMUNICAÇÃO ENTRE COMUNIDADES",
    text: "Conecte-se a outras comunidades e a acessores. Crie oportunidades de negócios e apoio estrutural.",
  },
];

function Bullet({ title, text, onSend, sent }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white/80 p-4 shadow border border-[#0e7490]/10">
      <div className="flex gap-3 items-start">
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#A8E6A3] text-[#0e7490]">
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m21 7l-2 10H7L5 7zM4 5h16l1 2H3z"/></svg>
        </div>
        <div>
          <div className="text-[11px] tracking-widest text-[#0e7490] font-semibold">{title}</div>
          <p className="text-[#0e2a47] mt-1 text-sm leading-relaxed">{text}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-600">Ao enviar, o administrador recebe uma notificação instantânea.</p>
        <button
          onClick={onSend}
          className={`rounded-full px-4 py-2 text-xs font-semibold border ${
            sent ? "bg-[#CFF6C6] text-[#0e7048] border-[#0e7048]" : "bg-[#0e7490] text-white border-[#0e7490]"
          }`}
        >
          {sent ? "Enviado ao Admin" : "Enviar pergunta"}
        </button>
      </div>
    </div>
  );
}

export default function AccessQuestions() {
  const { addFeedback } = useFeedback();
  const [sentMap, setSentMap] = useState({});

  function sendQuestion(question) {
    addFeedback({
      title: question.title,
      message: question.text,
      channel: "Perguntas do site",
    });
    setSentMap((prev) => ({ ...prev, [question.title]: true }));
  }

  return (
    <section className="bg-[#CDECF9] rounded-3xl shadow-inner border border-black/5">
      <div className="mx-auto max-w-6xl px-6 py-14 grid lg:grid-cols-2 gap-10 items-start w-full">
        <div className="relative">
          <span className="absolute -left-4 top-8 h-12 w-12 rounded-full bg-[#A8E6A3] blur-sm opacity-70" />
          <h3 className="text-4xl sm:text-5xl font-extrabold text-[#0e2a47] leading-tight">
            Qual suas <span className="bg-[#A8E6A3] px-2 rounded-md">formas</span>
            <br /> de conseguir ser
            <br /> alcançado?
          </h3>
          <p className="mt-3 text-gray-700 text-sm sm:text-base">
            Quanto mais claro for o seu canal de comunicação, mais rápida fica a resposta do time gestor e do administrador.
          </p>
        </div>

        <div className="space-y-4">
          {QUESTIONS.map((q) => (
            <motion.div
              key={q.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
            >
              <Bullet title={q.title} text={q.text} onSend={() => sendQuestion(q)} sent={sentMap[q.title]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
