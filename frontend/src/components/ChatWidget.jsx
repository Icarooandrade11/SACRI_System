import { useMemo, useState } from "react";
import { useFeedback } from "../context/FeedbackContext.jsx";

const sampleThreads = [
  { id: "t1", title: "Canal geral", audience: "Comunidade", unread: 1 },
  { id: "t2", title: "Equipe logística", audience: "Logística", unread: 0 },
  { id: "t3", title: "Parceiros/ONGs", audience: "Parceiros", unread: 2 },
];

export default function ChatWidget() {
  const { addFeedback } = useFeedback();
  const [open, setOpen] = useState(false);
  const [activeThread, setActiveThread] = useState(sampleThreads[0]);
  const [messages, setMessages] = useState([
    { id: "m1", thread: "t1", author: "Equipe SACRI", text: "Bem-vindo! Escolha um canal para conversar.", time: "08:10" },
    { id: "m2", thread: "t2", author: "Equipe de Rotas", text: "Envie o ponto de coleta e a rota prevista.", time: "08:20" },
    { id: "m3", thread: "t3", author: "ONG Raízes", text: "Estamos disponíveis para mentorias semanais.", time: "09:00" },
  ]);
  const [draft, setDraft] = useState("");

  const threadMessages = useMemo(
    () => messages.filter((m) => m.thread === activeThread.id),
    [messages, activeThread.id]
  );

  function sendMessage() {
    if (!draft.trim()) return;
    const newMessage = {
      id: `m-${Date.now()}`,
      thread: activeThread.id,
      author: "Você",
      text: draft,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setDraft("");
    addFeedback({
      title: `Mensagem via chat - ${activeThread.title}`,
      message: draft,
      channel: "Chat SACRI",
    });
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-[#0e7490] text-white px-5 py-3 shadow-2xl hover:bg-[#0c6a81]"
        aria-expanded={open}
      >
        {open ? "Fechar chat" : "Chat SACRI"}
      </button>

      {open && (
        <div className="w-[92vw] sm:w-96 rounded-2xl bg-white shadow-2xl border border-black/5 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#A8E6A3] to-[#CDECF9]">
            <div>
              <p className="text-xs uppercase tracking-widest text-black/70">Chat unificado</p>
              <p className="font-semibold text-[#0e2a47]">Conversas rápidas</p>
            </div>
            <span className="text-sm font-semibold text-[#0e7490]">{activeThread.title}</span>
          </div>

          <div className="flex border-b border-gray-100 overflow-x-auto px-2 py-2 gap-2 text-sm">
            {sampleThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThread(t)}
                className={`px-3 py-1 rounded-full border whitespace-nowrap ${
                  activeThread.id === t.id ? "bg-[#CFF6C6] border-[#0e7490]" : "border-gray-200"
                }`}
              >
                {t.title}
                {t.unread > 0 && (
                  <span className="ml-2 text-[11px] bg-[#0e7490] text-white rounded-full px-2">{t.unread}</span>
                )}
              </button>
            ))}
          </div>

          <div className="max-h-64 overflow-y-auto px-4 py-3 space-y-3 bg-[#F9FBF7]">
            {threadMessages.map((m) => (
              <div key={m.id} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-[#0e2a47]">{m.author}</span>
                  <span>{m.time}</span>
                </div>
                <p className="text-sm mt-1 text-gray-700">{m.text}</p>
              </div>
            ))}
          </div>

          <div className="p-3 space-y-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              placeholder="Escreva uma mensagem ou pedido de ajuda"
            />
            <button
              onClick={sendMessage}
              className="w-full rounded-full bg-[#0e7490] text-white py-2 font-semibold hover:bg-[#0c6a81]"
            >
              Enviar e notificar Admin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
