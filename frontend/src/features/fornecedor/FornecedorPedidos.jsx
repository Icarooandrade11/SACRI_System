import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";
import { toCSV } from "../../utils/exporters";
import { enqueue } from "../../services/syncQueue";
import { auditLog } from "../../services/audit";

export default function FornecedorPedidos() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/orders?scope=partner");
        setRows(data);
      } catch {
        setRows([]); // sem dados na primeira execução
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter(r =>
      (status ? r.status === status : true) &&
      (q ? JSON.stringify(r).toLowerCase().includes(q.toLowerCase()) : true)
    );
  }, [rows, q, status]);

  function aceitarPedido(row) {
    // offline-first: se offline, vai pra fila; se online axios resolve
    const op = { type: "PUT", url: `/orders/${row.id}/accept`, payload: {} };
    enqueue(op);
    auditLog("partner:accept_order", { orderId: row.id });
    alert("Pedido marcado para aceite (será sincronizado quando possível).");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Pedidos</h2>

      <div className="flex flex-wrap gap-2 items-end">
        <div className="form-control">
          <label className="label"><span className="label-text">Busca</span></label>
          <input className="input input-bordered" placeholder="ID, comunidade, item..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
        <div className="form-control">
          <label className="label"><span className="label-text">Status</span></label>
          <select className="select select-bordered" value={status} onChange={e=>setStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="ABERTO">ABERTO</option>
            <option value="EM_COMPRA">EM_COMPRA</option>
            <option value="EM_ROTA">EM_ROTA</option>
            <option value="ENTREGUE">ENTREGUE</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        <button className="btn btn-outline" onClick={()=>toCSV(filtered, "pedidos.csv")}>Exportar CSV</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th><th>Comunidade</th><th>Itens</th><th>Status</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.community?.name}</td>
                <td>{r.items?.length ?? 0}</td>
                <td><span className="badge">{r.status}</span></td>
                <td className="flex gap-2">
                  {r.status === "ABERTO" && (
                    <button className="btn btn-xs btn-primary" onClick={()=>aceitarPedido(r)}>Aceitar</button>
                  )}
                  <button className="btn btn-xs">Detalhes</button>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan={5} className="text-center opacity-60">Sem registros</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
