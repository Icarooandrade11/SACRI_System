import { createContext, useContext, useMemo, useState } from "react";

const FeedbackContext = createContext();

const initialEntries = [
  {
    id: "notif-1",
    title: "Canal aberto com prefeitura",
    message: "Pergunta sobre documentação enviada pelo formulário de acessos.",
    channel: "Perguntas do site",
    audience: "Administrador",
    status: "novo",
    timestamp: "Hoje, 10:15",
  },
  {
    id: "notif-2",
    title: "Feedback de usabilidade",
    message: "Usuário relatou que o formulário mobile ficou mais rápido.",
    channel: "Chat SACRI",
    audience: "Administrador",
    status: "em andamento",
    timestamp: "Ontem, 18:40",
  },
];

export function FeedbackProvider({ children }) {
  const [entries, setEntries] = useState(initialEntries);

  function addFeedback({ title, message, channel = "Canal público", audience = "Administrador" }) {
    setEntries((prev) => [
      {
        id: `notif-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
        title,
        message,
        channel,
        audience,
        status: "novo",
        timestamp: new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
      },
      ...prev,
    ]);
  }

  const value = useMemo(() => ({ entries, addFeedback }), [entries]);

  return <FeedbackContext.Provider value={value}>{children}</FeedbackContext.Provider>;
}

export function useFeedback() {
  const ctx = useContext(FeedbackContext);
  if (!ctx) throw new Error("useFeedback deve ser usado dentro de FeedbackProvider");
  return ctx;
}
