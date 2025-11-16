import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function PasswordRecovery() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const defaultEmail = params.get("email") || "";
  const [email, setEmail] = useState(defaultEmail);
  const [feedback, setFeedback] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail(defaultEmail);
  }, [defaultEmail]);

  async function handleRequest(e) {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    try {
      await api.post("/auth/forgot-password", { email });
      setFeedback("Se o e-mail existir, enviaremos instruções em instantes.");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Não foi possível processar o pedido.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    if (password !== confirm) {
      setFeedback("As senhas não conferem");
      return;
    }
    setLoading(true);
    setFeedback("");
    try {
      await api.post("/auth/reset-password", { token, email, password });
      setFeedback("Senha atualizada! Você já pode fazer login novamente.");
      setPassword("");
      setConfirm("");
    } catch (error) {
      setFeedback(error.response?.data?.message || "Não foi possível atualizar a senha");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-100px)] bg-gradient-to-b from-[#E8FFF0] to-[#C7F4DB] flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
        <div className="p-8 bg-emerald-600 text-white">
          <h1 className="text-3xl font-black mb-4">Recupere o acesso</h1>
          <p className="opacity-90">
            Enviaremos um link seguro para o e-mail do responsável pela conta e, se preferir, você pode redefinir a senha
            diretamente por aqui quando receber o token.
          </p>
          <ul className="mt-6 space-y-2 text-sm opacity-80">
            <li>• Tokens expiram em 1 hora.</li>
            <li>• Apenas o criador da conta recebe a mensagem.</li>
            <li>• Verifique a caixa de spam se não encontrar o e-mail.</li>
          </ul>
        </div>
        <div className="p-8 space-y-6">
          {token ? (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label className="label text-sm font-semibold">E-mail</label>
                <input className="input input-bordered w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="label text-sm font-semibold">Nova senha</label>
                <input
                  className="input input-bordered w-full"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <div>
                <label className="label text-sm font-semibold">Confirme a nova senha</label>
                <input
                  className="input input-bordered w-full"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
              <button className={`btn btn-success w-full ${loading && "loading"}`} disabled={loading}>
                Redefinir senha
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequest} className="space-y-4">
              <div>
                <label className="label text-sm font-semibold">E-mail do responsável</label>
                <input
                  className="input input-bordered w-full"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className={`btn btn-success w-full ${loading && "loading"}`} disabled={loading}>
                Enviar instruções
              </button>
            </form>
          )}

          {feedback && <p className="text-sm text-emerald-700">{feedback}</p>}
          <Link to="/login" className="link link-primary text-sm block text-center">
            Voltar para o login
          </Link>
        </div>
      </div>
    </section>
  );
}
