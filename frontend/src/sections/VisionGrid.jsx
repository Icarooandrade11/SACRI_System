import { Link } from "react-router-dom";

function Tile({ to, badge, title, bullets = [], bg }) {
  return (
    <Link
      to={to}
      aria-label={`Abrir ${title}`}
      className={`group relative block rounded-3xl p-6 min-h-[240px] ${bg}
                  shadow-[0_12px_0_rgba(0,0,0,.08)] hover:shadow-[0_16px_0_rgba(0,0,0,.10)]
                  transition-all duration-200 hover:-translate-y-0.5 outline-none focus:ring-4 ring-white/60`}
    >
      <div className="relative z-10">
        <div className="text-xs font-bold tracking-widest uppercase text-black/60">
          {badge}
        </div>
        <h3 className="mt-1 text-2xl font-extrabold text-black/80">{title}</h3>

        <ul className="mt-3 space-y-1 text-sm text-black/75 list-disc pl-5">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>

        <span className="inline-flex items-center gap-2 mt-4 font-semibold text-emerald-900">
          Acessar
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M13 5l7 7l-7 7v-4H4v-6h9V5z"
            />
          </svg>
        </span>
      </div>

      {/* brilho suave ao passar o mouse */}
      <div className="absolute inset-0 rounded-3xl bg-white/0 group-hover:bg-white/6 transition-colors" />
    </Link>
  );
}

export default function VisionGrid() {
  return (
    <section className="screen-section bg-[#A8E6A3]">
      <div className="section-inner">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow">
          Visão geral do nosso sistema
        </h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Tile
            to="/negociantes"
            badge="NEGOCIANTES"
            title="Negociantes rurais no Brasil"
            bullets={[
              "Cooperativas e atacadistas com atuação no NE",
              "Compra programada e sazonal",
              "Ex.: redes de distribuição em Recife e Caruaru",
            ]}
            bg="bg-[#2DB3C7]/75"
          />

          <Tile
            to="/familias"
            badge="FAMÍLIAS"
            title="Famílias acessíveis já em negócio"
            bullets={[
              "Cadastro validado por comunidade",
              "Contato e localização aproximada",
              "Preferências de cultivo e demanda",
            ]}
            bg="bg-[#CFF6C6]"
          />

          <Tile
            to="/regioes"
            badge="REGIÕES"
            title="Localidades de negociantes rurais"
            bullets={[
              "Mata Norte, Agreste, Sertão e Sertão do São Francisco",
              "Rotas/estradas principais e pontos de apoio",
              "Clusters produtivos por cultura",
            ]}
            bg="bg-[#CDECF9]"
          />

          <Tile
            to="/acessos"
            badge="ACESSOS"
            title="Onde e como conseguir"
            bullets={[
              "Canais: Prefeitura, SDR, IPA, ONGs e cooperativas",
              "Passo a passo para solicitações",
              "Documentos e elegibilidade (resumo)",
            ]}
            bg="bg-[#CDECF9]"
          />

          <Tile
            to="/plantacoes-rurais"
            badge="PLANTAÇÕES RURAIS"
            title="Destaques de Pernambuco"
            bullets={[
              "Uva & Manga – Vale do São Francisco (Petrolina)",
              "Cana-de-açúcar – Mata Norte",
              "Banana – Zona da Mata Sul",
            ]}
            bg="bg-[#2DB3C7]/75"
          />

          <Tile
            to="/novos-negocios"
            badge="NOVOS NEGÓCIOS"
            title="Oportunidades de expansão"
            bullets={[
              "Irrigação sustentável e microcrédito",
              "Agregação de valor (polpas, doces, embalagens)",
              "Parcerias com feiras e Varejo PE",
            ]}
            bg="bg-[#CFF6C6]"
          />
        </div>
      </div>
    </section>
  );
}
