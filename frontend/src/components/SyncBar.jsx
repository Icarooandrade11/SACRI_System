import useOnlineStatus from "../hooks/useOnlineStatus";
import { processQueue, readQueue } from "../services/syncQueue";
import api from "../api/api";

export default function SyncBar() {
  const online = useOnlineStatus();
  const pending = readQueue().length;

  async function syncNow() {
    await processQueue(async (item) => {
      if (item.type === "POST") await api.post(item.url, item.payload);
      else if (item.type === "PUT") await api.put(item.url, item.payload);
      else if (item.type === "DELETE") await api.delete(item.url);
      else throw new Error("Tipo não suportado");
    });
  }

  return (
    <div className="fixed bottom-[48px] left-1/2 -translate-x-1/2 z-40">
      <div className="rounded-full px-4 py-2 shadow bg-base-200/90 backdrop-blur flex items-center gap-3">
        <span className={`badge ${online ? "badge-success" : "badge-error"}`}>
          {online ? "Online" : "Offline"}
        </span>
        <span className="text-sm">Fila: {pending}</span>
        <button onClick={syncNow} className="btn btn-xs">Sincronizar</button>
      </div>
    </div>
  );
}
