const ACCESS_MATRIX = [
  {
    title: "Agentes Comunitários",
    color: "bg-[#CFF6C6]",
    bullets: [
      "Cadastro e validação de famílias com georreferenciamento aproximado",
      "Envio de alertas de campo para gestores e logística",
      "Acesso rápido a manuais de visita e formulários offline",
    ],
  },
  {
    title: "Gestores",
    color: "bg-[#CDECF9]",
    bullets: [
      "Painel de indicadores de adesão e entregas",
      "Configuração de permissões por comunidade/região",
      "Central de notificações para perguntas, chat e logística",
    ],
  },
  {
    title: "ONGs",
    color: "bg-[#A8E6A3]",
    bullets: [
      "Publicação de editais e mentorias",
      "Chat direcionado com parceiros e comunidades",
      "Histórico de impacto por projeto apoiado",
    ],
  },
  {
    title: "Parceiros/Fornecedores",
    color: "bg-[#2DB3C7]/70",
    bullets: [
      "Catálogo de insumos e status de pedidos",
      "Canal direto com logística para janelas de entrega",
      "Alertas de compliance e documentos",
    ],
  },
];

export default function RoleAccess() {
  return (
    <section className="relative rounded-3xl bg-white/80 shadow-lg border border-black/5">
      <div className="absolute -top-10 right-6 w-20 h-20 rounded-full bg-[#CDECF9] blur-2xl opacity-70" />
      <div className="absolute -bottom-12 left-10 w-32 h-32 rounded-full bg-[#CFF6C6] blur-3xl opacity-60" />
      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#0e7490]">Acessos específicos</p>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0e2a47]">Governança por perfil</h3>
            <p className="mt-2 text-gray-700 max-w-2xl">
              Detalhamos o que cada perfil precisa para agir com autonomia e segurança dentro do sistema.
            </p>
          </div>
          <div className="rounded-full bg-[#0e7490] text-white text-sm font-semibold px-4 py-2 shadow">
            Controlado por RBAC
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {ACCESS_MATRIX.map((item) => (
            <div key={item.title} className={`rounded-2xl ${item.color} bg-opacity-80 p-5 shadow-inner border border-black/5`}>
              <h4 className="text-xl font-bold text-[#0e2a47] mb-3">{item.title}</h4>
              <ul className="space-y-2 text-sm text-[#0e2a47] list-disc pl-5">
                {item.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
