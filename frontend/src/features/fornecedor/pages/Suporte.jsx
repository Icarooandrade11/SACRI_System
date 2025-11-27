export default function Suporte() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Suporte e orientação</h2>
          <p className="text-sm opacity-70">Informações de contato, materiais rápidos e espaço para dúvidas.</p>
        </div>
        <a className="btn btn-sm btn-primary" href="mailto:suporte@sacri.com">Enviar e-mail</a>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 border rounded-2xl bg-white shadow">
          <h3 className="text-lg font-semibold text-emerald-700">Contatos principais</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-700">
            <li>
              <strong>Canal geral:</strong> systemsacri@gmail.com
            </li>
            <li>
              <strong>Telefone:</strong> (87) 4000-1234 — horário comercial
            </li>
            <li>
              <strong>WhatsApp:</strong> (87) 98888-0000 — respostas rápidas
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-3">
            Precisa de urgência? Inclua no assunto o número da solicitação para triagem imediata.
          </p>
        </div>

        <div className="p-5 border rounded-2xl bg-white shadow">
          <h3 className="text-lg font-semibold text-emerald-700">Orientações</h3>
          <ol className="mt-3 space-y-2 list-decimal list-inside text-sm text-gray-700">
            <li>Consulte os relatórios para confirmar se os dados já foram recebidos.</li>
            <li>Registre o número da comunidade e da solicitação, se existir.</li>
            <li>Envie capturas de tela ou documentos que ajudem na resolução.</li>
          </ol>
          <p className="text-xs text-gray-500 mt-3">Em breve: formulário interno para dúvidas e feedback direto pelo painel.</p>
        </div>
      </div>

      <div className="border rounded-2xl bg-emerald-50 p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white grid place-items-center font-bold">1</div>
          <div>
            <p className="font-semibold text-emerald-800">Envio rápido de dúvida</p>
            <p className="text-sm text-gray-600">Use o modelo abaixo e cole no e-mail ou chat.</p>
          </div>
        </div>
        <div className="p-4 bg-white border rounded-xl text-sm text-gray-700 space-y-1">
          <p><strong>Comunidade:</strong> ____________________</p>
          <p><strong>Assunto:</strong> ____________________</p>
          <p><strong>Descrição:</strong> ____________________</p>
          <p><strong>Impacto:</strong> ____________________</p>
        </div>
        <p className="text-xs text-gray-500">Copie e cole para agilizar a triagem pelo time.</p>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-cyan-500 text-white rounded-2xl p-6 grid md:grid-cols-2 gap-4 items-center">
        <div>
          <p className="text-sm uppercase font-semibold">Em breve</p>
          <h4 className="text-2xl font-black">Formulário interno de feedback</h4>
          <p className="text-white/80 text-sm">Traga dúvidas, sugestões ou relatos de incidentes sem sair do painel.</p>
        </div>
        <div className="bg-white/10 border border-white/30 rounded-xl p-4">
          <div className="text-sm">Campos planejados:</div>
          <ul className="list-disc list-inside text-sm mt-2 text-white/90 space-y-1">
            <li>Tipo de solicitação (dúvida, incidente, melhoria)</li>
            <li>Prioridade e categoria</li>
            <li>Anexo de documentos</li>
          </ul>
          <button className="btn btn-sm mt-3" onClick={() => alert("A funcionalidade estará disponível em breve.")}>Quero testar</button>
        </div>
      </div>
    </div>
  );
}
