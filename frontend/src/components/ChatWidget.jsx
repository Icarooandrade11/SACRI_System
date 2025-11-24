import { useEffect, useMemo, useRef, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext.jsx";
import { ensureSocketConnected } from "../services/socket";

const defaultThreads = [
  { id: "geral", title: "Canal geral", audience: "Comunidade" },
  { id: "logistica", title: "Equipe logística", audience: "Logística" },
  { id: "parceiros", title: "Parceiros/ONGs", audience: "Parceiros" },
];

const timeString = (value) =>
  new Date(value).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export default function ChatWidget() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [activeThread, setActiveThread] = useState(defaultThreads[0]);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);

  const contactThreads = useMemo(
    () =>
      contacts.map((contact) => ({
        id: contact.channel,
        title: contact.name,
        audience: `${contact.relationship} • privado`,
      })),
    [contacts]
  );

  const availableThreads = useMemo(
    () => [...defaultThreads, ...contactThreads],
    [contactThreads]
  );

  const threadMessages = useMemo(
    () => messages.filter((m) => m.channel === activeThread.id),
    [messages, activeThread.id]
  );

  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      try {
        const { data } = await api.get("/contacts");
        setContacts(data?.contacts || []);
      } catch (error) {
        console.error("Erro ao carregar contatos", error);
      }
    })();
  }, [user?._id]);

  useEffect(() => {
    const exists = availableThreads.some((t) => t.id === activeThread.id);
    if (!exists) {
      setActiveThread(defaultThreads[0]);
    }
  }, [availableThreads, activeThread.id]);

  useEffect(() => {
    if (!user?._id) return undefined;
    const socket = ensureSocketConnected();
    socketRef.current = socket;

    const handleConnect = () => setConnected(true);
    const handleDisconnect = () => setConnected(false);
    const handleMessage = (message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("chat:message", handleMessage);
    socket.emit("chat:join", activeThread.id);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("chat:message", handleMessage);
    };
  }, [user?._id, activeThread.id]);
  
  useEffect(() => {
    if (!user?._id) return;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/chat", { params: { channel: activeThread.id } });
        setMessages((prev) => {
          const other = prev.filter((m) => m.channel !== activeThread.id);
          return [...other, ...(data?.messages || [])];
        });
      } catch (error) {
        console.error("Erro ao carregar mensagens do chat", error);
      } finally {
        setLoading(false);
      }
    })();
   }, [activeThread.id, user?._id]);

  function sendMessage() {
    if (!draft.trim() || !socketRef.current) return;
    socketRef.current.emit("chat:send", { channel: activeThread.id, text: draft });
    setDraft("");

  }

  return (
    <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full bg-[#0e7490] text-white px-5 py-3 shadow-2xl hover:bg-[#0c6a81] pointer-events-auto"
        aria-expanded={open}
      >
        {open ? "Fechar chat" : "Chat SACRI"}
      </button>

      {open && (
        <div className="w-full sm:w-96 max-w-[520px] rounded-2xl bg-white shadow-2xl border border-black/5 overflow-hidden pointer-events-auto">
          <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#A8E6A3] to-[#CDECF9]">
            <div>
              <p className="text-xs uppercase tracking-widest text-black/70">Chat em tempo real</p>
              <p className="font-semibold text-[#0e2a47]">Conversas rápidas</p>
            </div>
            <div className="text-right text-xs text-gray-600">
              <p className={`font-semibold ${connected ? "text-emerald-700" : "text-gray-500"}`}>
                {connected ? "Online" : "Reconectando"}
              </p>
              <p className="text-[11px] text-gray-600">Canal: {activeThread.title}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-b border-gray-100 px-2 py-2 text-sm">
            {availableThreads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveThread(t)}
                className={`px-3 py-1 rounded-full border whitespace-nowrap ${
                  activeThread.id === t.id ? "bg-[#CFF6C6] border-[#0e7490]" : "border-gray-200"
                }`}
              >
                <span className="block leading-tight">{t.title}</span>
                <span className="block text-[10px] text-gray-500">{t.audience}</span>
              </button>
            ))}
          </div>

          <div className="max-h-[60vh] overflow-y-auto px-4 py-3 space-y-3 bg-[#F9FBF7]">
            {loading && <p className="text-sm text-gray-500">Carregando mensagens...</p>}
            {!loading && threadMessages.length === 0 && (
              <p className="text-sm text-gray-500">Nenhuma mensagem ainda. Inicie a conversa!</p>
            )}
            {threadMessages.map((m) => (
              <div key={m.id} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-semibold text-[#0e2a47]">{m.author?.name || "Usuário"}</span>
                  <span>{timeString(m.createdAt)}</span>
                </div>
                <p className="text-sm mt-1 text-gray-700 whitespace-pre-wrap">{m.content}</p>
              </div>
            ))}
          </div>

          <div className="p-3 space-y-2 bg-white">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              placeholder="Escreva uma mensagem"
            />
            <button
              onClick={sendMessage}
              className="w-full rounded-full bg-[#0e7490] text-white py-2 font-semibold hover:bg-[#0c6a81] disabled:opacity-50"
              disabled={!draft.trim() || !connected}
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
