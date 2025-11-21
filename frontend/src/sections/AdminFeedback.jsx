import { useMemo, useState } from "react";
import { useFeedback } from "../context/FeedbackContext.jsx";

export default function AdminFeedback() {
  const { entries } = useFeedback();
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = useMemo(() => {
    if (statusFilter === "todos") return entries;
    return entries.filter((item) => item.status === statusFilter);
  }, [entries, statusFilter]);

  return (
    <section className="rounded-3xl bg-white shadow-lg border border-black/5 overflow-hidden">
      <div className="bg-gradient-to-r from-[#A8E6A3] to-[#CDECF9] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-black/70">Administrador</p>
          <h3 className="text-3xl font-extrabold text-[#0e2a47]">Feedbacks e notificações</h3>
          <p className="text-sm text-[#0e2a47]/80 max-w-2xl">
            Centralize perguntas, respostas e retornos do site, do chat e dos formulários de pesquisa em um único painel.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm flex-wrap">
          {["todos", "novo", "em andamento"].map((tag) => (
            <button
              key={tag}
              onClick={() => setStatusFilter(tag)}
              className={`px-3 py-1 rounded-full border ${
                statusFilter === tag ? "bg-white text-[#0e7490] border-[#0e7490]" : "border-white/70"
              }`}
            >
              {tag.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-[#0e2a47]">Notificações recentes</h4>
            <span className="text-sm text-gray-600">{filtered.length} itens</span>
          </div>
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {filtered.map((item) => (
              <div key={item.id} className="rounded-2xl bg-[#F9FBF7] border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-[#0e2a47]">{item.channel}</span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="mt-1 text-lg font-semibold text-[#0e2a47]">{item.title}</p>
                <p className="text-sm text-gray-700">{item.message}</p>
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-[#0e7490] font-semibold bg-white px-3 py-1 rounded-full border border-[#0e7490]/40">
                  {item.audience}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4 bg-[#F3FAF1]">
          <h4 className="text-xl font-bold text-[#0e2a47]">Como o Admin recebe</h4>
          <ul className="space-y-3 text-sm text-[#0e2a47]">
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#0e7490]" />
              Perguntas enviadas em cada seção viram notificações em tempo real.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#0e7490]" />
              Chats e pedidos logísticos entram marcados por canal de origem.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[#0e7490]" />
              Feedbacks podem ser triados por status e prioridade.
            </li>
          </ul>
          <div className="rounded-2xl bg-white border border-gray-100 p-4 shadow-sm text-sm text-gray-700">
            <p className="font-semibold text-[#0e2a47]">Fluxo proposto</p>
            <p className="mt-1">Perguntas ➜ Notificação ➜ Etiqueta de perfil (agente, ONG, parceiro) ➜ Resposta pelo chat ou e-mail.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
