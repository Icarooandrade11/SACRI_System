import { useAuth } from "../../context/AuthContext";

export default function FornecedorPerfil() {
  const { user } = useAuth();
  return (
    <div className="max-w-xl space-y-3">
      <h2 className="text-xl font-bold">Perfil do Parceiro</h2>
      <div className="form-control">
        <label className="label"><span className="label-text">Nome</span></label>
        <input className="input input-bordered" defaultValue={user?.name || ""} readOnly />
      </div>
      <div className="form-control">
        <label className="label"><span className="label-text">Papel</span></label>
        <input className="input input-bordered" defaultValue={user?.role || ""} readOnly />
      </div>
      <p className="text-sm opacity-70">Documentos, certificados e validade podem ser anexados aqui (integra depois com backend).</p>
    </div>
  );
}
