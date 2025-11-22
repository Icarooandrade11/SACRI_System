import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useFeedback } from "../context/FeedbackContext.jsx";
import { useCommunication } from "../context/CommunicationContext.jsx";

const RELATIONSHIPS = [
  { key: "amigo", label: "Amigo" },
  { key: "orgao", label: "Órgão" },
  { key: "parceiro", label: "Parceiro" },
  { key: "logistica", label: "Logística" },
  { key: "outros", label: "Outras" },
];

export default function CommunicationPanel() {
  const { addFeedback } = useFeedback();
  const { contacts, requests, targets, sendRequest, acceptRequest, declineRequest, updateRelationship, pendingIncoming } =
    useCommunication();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("todos");
  const [logisticNote, setLogisticNote] = useState("");
  const [selectedTarget, setSelectedTarget] = useState("");
  const [targetRelationship, setTargetRelationship] = useState("amigo");
  const [requestNote, setRequestNote] = useState("");

  const visibleContacts = useMemo(() => {
    if (filter === "todos") return contacts;
    return contacts.filter((c) => c.relationship === filter);
  }, [contacts, filter]);

  function handleLogisticRequest() {
    if (!logisticNote.trim()) return;
    addFeedback({
      title: "Solicitação logística",
      message: logisticNote,
      channel: "Painel lateral",
    });
    setLogisticNote("");
  }

  async function handleSendRequest(e) {
    e.preventDefault();
    if (!selectedTarget) return;
    await sendRequest(selectedTarget, targetRelationship, requestNote);
    setSelectedTarget("");
    setRequestNote("");
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
            <p className="font-semibold text-[#0e2a47]">Convites e contatos</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-gray-600">Contatos</p>
            <p className="text-sm font-semibold text-[#0e7490]">{contacts.length}</p>
            {pendingIncoming.length > 0 && (
              <p className="text-[11px] text-amber-600 font-semibold">{pendingIncoming.length} convite(s) pendente(s)</p>
            )}
          </div>
        </div>

        {/* Convites pendentes */}
        {requests.length > 0 && (
          <div className="px-4 py-3 border-b border-gray-100 space-y-3 bg-[#F9FBF7]">
            <div className="flex items-center justify-between text-sm font-semibold text-[#0e2a47]">
              <span>Solicitações</span>
              <span className="text-[11px] text-gray-600">Entrada / Saída</span>
            </div>
            {requests.map((req) => (
              <div key={req.id} className="rounded-xl border border-gray-200 p-3 bg-white space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-[#0e2a47] leading-tight">
                      {req.direction === "incoming" ? req.fromUser?.name : req.target?.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {req.direction === "incoming" ? req.fromUser?.role : req.target?.role}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] px-2 py-1 rounded-full capitalize ${
                      req.direction === "incoming" ? "bg-amber-100 text-amber-700" : "bg-cyan-50 text-cyan-700"
                    }`}
                  >
                    {req.direction === "incoming" ? "Entrada" : "Saída"}
                  </span>
                </div>
                {req.note && <p className="text-sm text-gray-700">{req.note}</p>}

                {req.direction === "incoming" ? (
                  <div className="flex gap-2 text-sm">
                    <button
                      onClick={() => acceptRequest(req.id)}
                      className="flex-1 rounded-full bg-emerald-600 text-white py-1.5 font-semibold hover:bg-emerald-700"
                    >
                      Aceitar
                    </button>
                    <button
                      onClick={() => declineRequest(req.id)}
                      className="flex-1 rounded-full bg-gray-100 text-gray-700 py-1.5 font-semibold hover:bg-gray-200"
                    >
                      Recusar
                    </button>
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-600">Aguardando aceite do outro usuário</p>
                )}
              </div>
            ))}
          </div>
        )}

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

        <div className="px-4 py-4 space-y-4 bg-[#F9FBF7] border-t border-gray-100">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#0e2a47]">Convide alguém</p>
            <form className="space-y-2" onSubmit={handleSendRequest}>
              <select
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                value={selectedTarget}
                onChange={(e) => setSelectedTarget(e.target.value)}
              >
                <option value="">Selecione um contato sugerido</option>
                {targets.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.role}
                  </option>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="col-span-1 text-gray-600">Tipo de vínculo</label>
                <label className="col-span-1 text-gray-600 text-right">Pedido personalizado</label>
              </div>
              <div className="flex gap-2">
                <select
                  value={targetRelationship}
                  onChange={(e) => setTargetRelationship(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm"
                >
                  {RELATIONSHIPS.map((r) => (
                    <option key={r.key} value={r.key}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="Explique por que quer se conectar"
                rows={3}
              />
              <button
                type="submit"
                disabled={!selectedTarget}
                className="w-full rounded-full bg-[#0e7490] text-white py-2 font-semibold hover:bg-[#0c6a81] disabled:opacity-50"
              >
                Enviar solicitação
              </button>
            </form>
          </div>

          <div className="space-y-2">
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
        </div>
      </motion.aside>
    </div>
  );
}
