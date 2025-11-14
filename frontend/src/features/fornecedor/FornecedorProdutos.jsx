import { useState } from "react";
import { toCSV } from "../../utils/exporters";

const seed = [
  { id:"P-001", nome:"Cesta básica", unidade:"kit", custo: 120.00, estoque: 40 },
  { id:"P-002", nome:"Semente de milho", unidade:"kg", custo: 9.50, estoque: 200 },
];

export default function FornecedorProdutos() {
  const [rows] = useState(seed);
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Produtos do Fornecedor</h2>
      <button className="btn btn-outline btn-sm" onClick={()=>toCSV(rows, "produtos.csv")}>Exportar CSV</button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr><th>ID</th><th>Produto</th><th>Unidade</th><th>Custo</th><th>Estoque</th></tr></thead>
          <tbody>
            {rows.map(p=>(
              <tr key={p.id}>
                <td>{p.id}</td><td>{p.nome}</td><td>{p.unidade}</td>
                <td>R$ {p.custo.toFixed(2)}</td><td>{p.estoque}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm opacity-70">Regras de substituição/itens equivalentes podem ser configuradas no Admin.</p>
    </div>
  );
}
