// src/pages/Home.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import { ROLES } from "../context/AuthContext.jsx";

// --- Seções (conforme seu projeto)
import VisionGrid from "../sections/VisionGrid";
import AccessQuestions from "../sections/AccessQuestions";
import ResourcesGrid from "../sections/ResourcesGrid";
import FAQ from "../sections/FAQ";
import ThanksFeedback from "../sections/ThanksFeedback";
import ExperiencePoll from "../sections/ExperiencePoll";
import MotivationPoll from "../sections/MotivationPoll";
import FooterCTA from "../sections/FooterCTA";
import RoleAccess from "../sections/RoleAccess";
import AdminFeedback from "../sections/AdminFeedback";

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  function handleSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/buscar?q=${encodeURIComponent(q.trim())}`);
  }

  const float = {
    animate: { y: [0, -10, 0] },
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  };

  // Wrapper para padronizar cada seção de conteúdo
  const SectionWrap = ({ children, delay = 0 }) => (
    <motion.section
      className="bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">{children}</div>
    </motion.section>
  );

  return (
    <>
      {/* HERO (igual ao seu layout) */}
      <section className="relative min-h-[calc(100vh-0px)] overflow-hidden bg-[#A8E6A3]">
        {/* SHAPES – fundo direito (flutuam de leve) */}
        <motion.div
          {...float}
          className="pointer-events-none absolute right-20 top-6 w-[240px] h-[520px] rounded-[36px] bg-[#CDECF9] opacity-80 rotate-[10deg] -z-10"
        />
        <motion.div
          {...float}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute right-8 top-10 w-[620px] h-[900px] rounded-[42px] bg-[#CFF6C6] opacity-70 rotate-[15deg] -z-10"
        />
        <motion.div
          {...float}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-12 bottom-[-40px] w-[360px] h-[360px] rotate-[22deg] -z-10"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              d="M10 160 L190 100 Q195 110 182 120 L40 190 Z"
              fill="#2DB3C7"
            />
          </svg>
        </motion.div>

        <motion.svg
          {...float}
          viewBox="0 0 1440 320"
          className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-70 -z-10"
        >
          <path
            fill="#9ddf95"
            d="M0,96L80,96C160,96,320,96,480,101.3C640,107,800,117,960,133.3C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </motion.svg>

        {/* CONTEÚDO */}
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-24 relative z-10">
          {/* Barra de busca abaixo da navbar minimalista */}
          <form onSubmit={handleSearch} className="mb-10">
            <div className="relative w-[320px] sm:w-[380px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-black/60">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 16 9.5a6.47 6.47 0 0 0-1.57 4.23l.27.27h.8L20 21l1-1zM9.5 14A4.5 4.5 0 1 1 14 9.5A4.5 4.5 0 0 1 9.5 14Z"
                  />
                </svg>
              </span>
              <input
                className="h-12 w-full rounded-full pl-12 pr-4 text-lg bg-white/90 shadow-[0_6px_0_rgba(0,0,0,.15)] outline-none placeholder-black/50"
                placeholder="Pesquisar comunidades, famílias, plantações..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </form>

          {/* Título principal */}
          <h1
            className="text-white font-extrabold leading-[0.9] drop-shadow-[0_4px_16px_rgba(0,0,0,.15)]
                       text-[56px] sm:text-[72px] md:text-[96px]"
          >
            Bem-vindo
            <br />
            ao SACRI
          </h1>

          {/* Subtítulo */}
          <p className="mt-8 max-w-2xl text-white/95 text-xl sm:text-2xl">
            Acrescentando uma nova oportunidade para as comunidades rurais. Vem
            fazer parte desta nova etapa de negócios e investimentos!
          </p>

          {/* CTA */}
          <div className="mt-10">
            <button
              onClick={() => navigate("/registrar")}
              className="rounded-full bg-white/80 hover:bg-white text-emerald-700 font-bold px-8 py-3 text-lg shadow-[0_8px_0_rgba(0,0,0,.12)]"
            >
              COMECE AGORA
            </button>
          </div>
        </div>

        {/* gradiente suave no rodapé da dobra (só estética) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#9ddf95]" />
      </section>

      {/* --- SEÇÕES DO SCROLL (conforme seus prints) --- */}
      <SectionWrap><VisionGrid /></SectionWrap>
      <SectionWrap delay={0.05}><AccessQuestions /></SectionWrap>
      <SectionWrap delay={0.1}><ResourcesGrid /></SectionWrap>
      <SectionWrap delay={0.15}><RoleAccess /></SectionWrap>
      {isAdmin && <SectionWrap delay={0.2}><AdminFeedback /></SectionWrap>}
      <SectionWrap><FAQ /></SectionWrap>
      <SectionWrap><ThanksFeedback /></SectionWrap>
      <SectionWrap><ExperiencePoll /></SectionWrap>
      <SectionWrap><MotivationPoll /></SectionWrap>
      <SectionWrap><FooterCTA /></SectionWrap>
    </>
  );
}
