// src/features/fornecedor/pages/Perfil.jsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function PerfilFornecedor() {
  const { user, updateUser, logout } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.meta?.phone || "",
    organization: user?.meta?.organization || "",
  });
  const [saving, setSaving] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateUser({
        name: form.name,
        email: form.email,
        meta: { ...(user?.meta || {}), phone: form.phone, organization: form.organization },
      });
      setSaving(false);
      // feedback simples
      // eslint-disable-next-line no-alert
      alert("Perfil atualizado!");
    }, 300);
  }

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">Meu Perfil</div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Dados */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white/80 rounded-2xl p-6 shadow">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="form-control">
              <span className="label-text">Nome</span>
              <input
                className="input input-bordered"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </label>

            <label className="form-control">
              <span className="label-text">E-mail</span>
              <input
                className="input input-bordered"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                type="email"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Telefone</span>
              <input
                className="input input-bordered"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="(87) 9xxxx-xxxx"
              />
            </label>

            <label className="form-control">
              <span className="label-text">Organização</span>
              <input
                className="input input-bordered"
                value={form.organization}
                onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                placeholder="Minha ONG / Empresa"
              />
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button className={`btn btn-success ${saving && "loading"}`} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>

        {/* Cartão lateral */}
        <div className="bg-white/80 rounded-2xl p-6 shadow">
          <div className="font-semibold mb-2">Informações da conta</div>
          <div className="text-sm opacity-70 mb-3">ID: {user?.id || "—"}</div>
          <div className="badge badge-success mb-4">{user?.role || "—"}</div>

          <div className="font-semibold mb-2">Permissões</div>
          <ul className="list-disc ml-5 text-sm">
            <li>Acessar Plantacões</li>
            <li>Gerir Necessidades</li>
            <li>Enviar Solicitações</li>
            <li>Ver Status (Kanban)</li>
            <li>Painel de Gestão</li>
            <li>Órgãos – APD</li>
          </ul>

          <div className="divider" />
          <button className="btn btn-outline btn-error btn-sm" onClick={logout}>
            Encerrar sessão
          </button>
        </div>
      </div>
    </div>
  );
}
