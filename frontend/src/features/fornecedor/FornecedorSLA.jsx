export default function FornecedorSLA() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">SLA & Desempenho</h2>
      <ul className="list-disc pl-6">
        <li>Tempo médio de aceite: 3h40</li>
        <li>Tempo médio de entrega: 1.7 dias</li>
        <li>Taxa de sucesso (sem devolução): 96%</li>
        <li>Ocorrências com pendência: 2</li>
      </ul>
      <div className="alert alert-info">
        <span>Relatórios detalhados podem ser baixados no módulo “Relatórios”.</span>
      </div>
    </div>
  );
}
