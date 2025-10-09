// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


// Seções existentes
import VisionGrid from "../sections/VisionGrid";
import AccessQuestions from "../sections/AccessQuestions";
import ResourcesGrid from "../sections/ResourcesGrid";
import FAQ from "../sections/FAQ";
import ThanksFeedback from "../sections/ThanksFeedback";
import ExperiencePoll from "../sections/ExperiencePoll";
import MotivationPoll from "../sections/MotivationPoll";
import FooterCTA from "../sections/FooterCTA";

// wrapper para cada "tela" com animação de pulo/flutuar
function FloatSection({ children, bg = "transparent" }) {
  return (
    <motion.section
      className={`min-h-full screen snap-start ${bg}`}
      initial={{ opacity: 0, y: 60, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 14, mass: 0.6 }}
      viewport={{ amount: 0.4, once: false }}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/comunidades?q=${encodeURIComponent(q.trim())}`);
  }

  return (
    // Container que controla o scroll da home: de tela em tela
    <div className="h-[calc(100vh-100px)] overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* TELA 1 — HERO */}
      <FloatSection bg="relative overflow-hidden bg-[#A8E6A3]">
        {/* formas decorativas */}
        <svg className="absolute -right-10 -top-5 rotate-6 opacity-50" width="420" height="420" viewBox="0 0 420 420" aria-hidden>
          <rect x="40" y="20" rx="36" ry="36" width="360" height="320" fill="#CFF6C6" />
        </svg>
        <svg className="absolute right-1/4 top-10 -rotate-12 opacity-70" width="180" height="280" viewBox="0 0 180 280" aria-hidden>
          <path d="M40 10 h90 a25 25 0 0 1 25 25 v210 a25 25 0 0 1 -25 25 h-50 a25 25 0 0 1 -25 -25 z" fill="#CDECF9"/>
        </svg>
        <svg className="absolute bottom-4 right-6 rotate-12 opacity-90" width="160" height="160" viewBox="0 0 160 160" aria-hidden>
          <path d="M10 110 L150 80 Q155 85 145 95 L25 150 Z" fill="#2DB3C7"/>
        </svg>

        <div className="container mx-auto px-6 pt-6 pb-16">
          {/* busca */}
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="relative">
              <input
                className="w-full rounded-full pl-12 pr-4 py-3 shadow-md outline-none"
                placeholder="Pesquisar comunidades, famílias, plantações..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-base-200">
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.505 4.505 0 0 1 9.5 14"/>
                </svg>
              </button>
            </div>
          </form>

          {/* título/subtítulo/cta */}
          <div className="mt-10 max-w-4xl">
            <h1 className="text-5xl sm:text-8xl font-extrabold leading-tight text-white drop-shadow-[0_2px_2px_rgba(0,0,0,.08)]">
              Bem-vindo<br />ao <span className="text-white/95">SACRI</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-white/90 max-w-2xl">
              Acrescentando uma nova oportunidade para as comunidades rurais. Vem fazer parte desta nova etapa de negócios e investimentos!
            </p>
            <div className="mt-10">
              <button onClick={() => navigate("/registrar")} className="btn btn-success rounded-full font-semibold">
                COMEÇE AGORA
              </button>
              <div className="flex flex-wrap gap-1">
                <Link className="btn btn-outline btn-sm rounded-full" to="/Negociantes">NEGOCIANTES</Link>
                <Link className="btn btn-outline btn-sm rounded-full" to="/FamiliasPublico">FAMÍLIAS</Link>
                <Link className="btn btn-outline btn-sm rounded-full" to="/Regioes">REGIÕES</Link>
                <Link className="btn btn-outline btn-sm rounded-full" to="/Acessos">ACESSOS</Link>
                <Link className="btn btn-outline btn-sm rounded-full" to="/PlantacoesRurais">PLANTAÇÕES RURAIS</Link>
                <Link className="btn btn-outline btn-sm rounded-full" to="/NovosNegocios">NOVOS NEGÓCIOS</Link>
              </div>
            </div>
          </div>
        </div>
      </FloatSection>

      {/* TELA 2 em diante — cada uma ocupa a tela inteira e dá o “pulo” ao entrar */}
      <FloatSection><VisionGrid /></FloatSection>
      <FloatSection><AccessQuestions /></FloatSection>
      <FloatSection><ResourcesGrid /></FloatSection>
      <FloatSection><FAQ /></FloatSection>
      <FloatSection><ThanksFeedback /></FloatSection>
      <FloatSection><ExperiencePoll /></FloatSection>
      <FloatSection><MotivationPoll /></FloatSection>
      <FloatSection><FooterCTA /></FloatSection>
    </div>
  );
}
