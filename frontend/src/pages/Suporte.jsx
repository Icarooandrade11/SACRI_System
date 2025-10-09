export default function Suporte() {
  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Suporte & Contato</h2>
      <p className="mb-4">
        Para dúvidas e solicitações, entre em contato com a coordenação local ou envie um e-mail para:
        <span className="font-semibold"> suporte@sacri.local</span>
      </p>
      <ul className="list-disc ml-5 space-y-1">
        <li>Manual do usuário na pasta <code>/docs</code></li>
        <li>Treinamento básico previsto no DDE</li>
        <li>Recomendações de acessibilidade cumpridas (responsivo)</li>
      </ul>
    </div>
  );
}
