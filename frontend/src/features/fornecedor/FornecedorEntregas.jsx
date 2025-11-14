import { useState } from "react";
import { toCSV } from "../../utils/exporters";

const demo = [
  { id:"E-1001", orderId:"O-2001", rota:"Lote 7 - Comunidade A", janela:"09-12h", status:"EM_ROTA" },
  { id:"E-1002", orderId:"O-2005", rota:"Comunidade B", janela:"14-18h", status:"ENTREGUE" },
];

export default function FornecedorEntregas() {
  const [rows] = useState(demo);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Entregas & Romaneios</h2>
      <button className="btn btn-outline btn-sm" onClick={()=>toCSV(rows, "entregas.csv")}>Exportar CSV</button>
      <div className="overflow-x-auto mt-2">
        <table className="table">
          <thead><tr><th>ID</th><th>Pedido</th><th>Rota</th><th>Janela</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.orderId}</td><td>{r.rota}</td><td>{r.janela}</td>
                <td><span className="badge">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="alert">
        <span>Romaneios e etiquetas podem ser gerados no momento do “Aceitar Pedido”.</span>
      </div>
    </div>
  );
}
