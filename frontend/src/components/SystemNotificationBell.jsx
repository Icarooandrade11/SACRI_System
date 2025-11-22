import { useMemo, useState } from "react";
import { useFeedback } from "../context/FeedbackContext.jsx";
import { useCommunication } from "../context/CommunicationContext.jsx";

export default function SystemNotificationBell() {
  const { entries } = useFeedback();
  const { pendingIncoming } = useCommunication();
  const [open, setOpen] = useState(false);

  const unreadFeedback = useMemo(() => entries.filter((e) => e.status === "novo"), [entries]);
  const total = unreadFeedback.length + pendingIncoming.length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="btn btn-ghost btn-sm relative"
        aria-label="Notificações"
        aria-expanded={open}
      >
        <span className="text-xl">🔔</span>
        {total > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[11px] rounded-full px-1.5 font-semibold">
            {total}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl border rounded-xl p-3 z-50">
          <p className="text-sm font-semibold text-slate-800 mb-2">Notificações do sistema</p>

          <div className="space-y-2 max-h-72 overflow-y-auto">
            {pendingIncoming.map((req) => (
              <div key={req.id} className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-sm">
                <p className="font-semibold">Convite de {req.fromUser?.name}</p>
                <p className="text-xs text-slate-600">{req.fromUser?.role}</p>
              </div>
            ))}

            {unreadFeedback.map((f) => (
              <div key={f.id} className="rounded-lg border border-emerald-200 bg-emerald-50 p-2 text-sm">
                <p className="font-semibold">{f.title}</p>
                <p className="text-xs text-slate-600">{f.channel}</p>
                <p className="text-sm text-slate-700 mt-1">{f.message}</p>
              </div>
            ))}

            {total === 0 && <p className="text-sm text-slate-500">Nenhuma notificação pendente.</p>}
          </div>
        </div>
      )}
    </div>
  );
}
