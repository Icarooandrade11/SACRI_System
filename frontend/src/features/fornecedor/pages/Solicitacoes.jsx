export default function Solicitacoes() {
  return (
    <>
      <h2 className="text-xl font-black mb-4">Solicitações</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th><th>Destinatário</th><th>Itens</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>124</td><td>Secretaria A</td><td>3</td><td>Em análise</td></tr>
            <tr><td>125</td><td>ONG B</td><td>1</td><td>Enviada</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
