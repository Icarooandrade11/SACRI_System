import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useFeedback } from "../context/FeedbackContext.jsx";

const RELATIONSHIPS = [
  { key: "amigo", label: "Amigo" },
  { key: "orgao", label: "Órgão" },
  { key: "parceiro", label: "Parceiro" },
  { key: "logistica", label: "Logística" },
  { key: "outros", label: "Outras" },
];

const initialContacts = [
  { id: "c1", name: "Maria Gomes", role: "Agente comunitária", relationship: "amigo", status: "online" },
  { id: "c2", name: "João Lima", role: "Secretaria Municipal", relationship: "orgao", status: "ausente" },
  { id: "c3", name: "Associação Verde", role: "Parceiro/Fornecedor", relationship: "parceiro", status: "online" },
  { id: "c4", name: "Equipe de Rotas", role: "Suporte logístico", relationship: "logistica", status: "offline" },
  { id: "c5", name: "Rede de Jovens", role: "ONG", relationship: "outros", status: "online" },
];

export default function CommunicationPanel() {
  const { addFeedback } = useFeedback();
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState("todos");
  const [logisticNote, setLogisticNote] = useState("");

  const visibleContacts = useMemo(() => {
    if (filter === "todos") return contacts;
    return contacts.filter((c) => c.relationship === filter);
  }, [contacts, filter]);

  function updateRelationship(id, relationship) {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, relationship } : c)));
  }

  function handleLogisticRequest() {
    if (!logisticNote.trim()) return;
    addFeedback({
      title: "Solicitação logística",
      message: logisticNote,
      channel: "Painel lateral",
    });
    setLogisticNote("");
  }

  return (
    <div className="fixed top-24 left-4 z-40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-[#0e7490] text-white px-4 py-2 shadow-lg hover:bg-[#0c6a81] transition"
        aria-expanded={open}
      >
        {open ? "Fechar contatos" : "Contatos"}
      </button>

      <motion.aside
        initial={{ x: -280, opacity: 0 }}
        animate={open ? { x: 0, opacity: 1 } : { x: -280, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="mt-3 w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-black/5 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-[#A8E6A3] to-[#CDECF9] px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-black/70">Sistema de comunicação</p>
            <p className="font-semibold text-[#0e2a47]">Mapa de relacionamentos</p>
          </div>
          <span className="text-sm font-semibold text-[#0e7490]">{contacts.length}</span>
        </div>

        <div className="px-4 py-3 border-b border-gray-100 flex gap-2 overflow-x-auto text-sm">
          <button
            onClick={() => setFilter("todos")}
            className={`px-3 py-1 rounded-full border ${filter === "todos" ? "bg-[#A8E6A3] border-[#0e7490]" : "border-gray-200"}`}
          >
            Todos
          </button>
          {RELATIONSHIPS.map((r) => (
            <button
              key={r.key}
              onClick={() => setFilter(r.key)}
              className={`px-3 py-1 rounded-full border whitespace-nowrap ${
                filter === r.key ? "bg-[#CDECF9] border-[#0e7490]" : "border-gray-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
          {visibleContacts.map((c) => (
            <div key={c.id} className="px-4 py-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-[#0e2a47] leading-tight">{c.name}</p>
                  <p className="text-xs text-gray-600">{c.role}</p>
                </div>
                <span
                  className={`text-[11px] px-2 py-1 rounded-full capitalize ${
                    c.status === "online"
                      ? "bg-[#CFF6C6] text-[#0e7048]"
                      : c.status === "ausente"
                      ? "bg-[#FFF4CC] text-[#875703]"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-600">Relacionamento:</span>
                <select
                  value={c.relationship}
                  onChange={(e) => updateRelationship(c.id, e.target.value)}
                  className="flex-1 rounded-lg border border-gray-200 px-2 py-1 text-sm"
                >
                  {RELATIONSHIPS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-4 space-y-2 bg-[#F9FBF7] border-t border-gray-100">
          <p className="text-sm font-semibold text-[#0e2a47]">Precisa de ajuda logística?</p>
          <textarea
            value={logisticNote}
            onChange={(e) => setLogisticNote(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
            placeholder="Descreva sua rota, entrega ou apoio necessário"
            rows={3}
          />
          <button
            onClick={handleLogisticRequest}
            className="w-full rounded-full bg-[#0e7490] text-white py-2 font-semibold hover:bg-[#0c6a81]"
          >
            Enviar pedido ao Admin
          </button>
          <p className="text-[11px] text-gray-500">Envie dúvidas ou urgências sem sair da página.</p>
        </div>
      </motion.aside>
    </div>
  );
}
