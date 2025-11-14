import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import { ROLES } from "./context/AuthContext.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Auth from "./pages/Auth";
import Comunidades from "./pages/Comunidades.jsx";
import Search from "./pages/Search.jsx";

import Negociantes from "./pages/public/Negociantes.jsx";
import FamiliasPublico from "./pages/public/FamiliasPublico.jsx";
import Regioes from "./pages/public/Regioes.jsx";
import Acessos from "./pages/public/Acessos.jsx";
import PlantacoesRurais from "./pages/public/PlantacoesRurais.jsx";
import NovosNegocios from "./pages/public/NovosNegocios.jsx";

import FornecedorLayout from "./features/fornecedor/FornecedorLayout.jsx";
import FornecedorHome from "./features/fornecedor/pages/FornecedorHome.jsx";
import Plantacoes from "./features/fornecedor/pages/Plantacoes.jsx";
import Necessidades from "./features/fornecedor/pages/Necessidades.jsx";
import Solicitacoes from "./features/fornecedor/pages/Solicitacoes.jsx";
import StatusSolicitacoes from "./features/fornecedor/pages/StatusSolicitacoes.jsx";
import PainelGestao from "./features/fornecedor/pages/PainelGestao.jsx";
import OrgaosApd from "./features/fornecedor/pages/OrgaosApd.jsx";
import PerfilFornecedor from "./features/fornecedor/pages/Perfil.jsx"; // NOVO

function ProtectedByRole({ allow, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={isHome ? "flex-1 bg-[#A8E6A3]" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ambas as rotas levam à mesma página com estado interno */}
          <Route path="/login" element={<Auth />} />
          <Route path="/registrar" element={<Auth />} />

          <Route path="/negociantes" element={<Negociantes />} />
          <Route path="/familias" element={<FamiliasPublico />} />
          <Route path="/regioes" element={<Regioes />} />
          <Route path="/acessos" element={<Acessos />} />
          <Route path="/plantacoes-rurais" element={<PlantacoesRurais />} />
          <Route path="/novos-negocios" element={<NovosNegocios />} />

          <Route path="/comunidades" element={<Comunidades />} />
          <Route path="/buscar" element={<Search />} />

          <Route
            path="/fornecedor"
            element={
              <ProtectedByRole allow={[ROLES.PARCEIRO, ROLES.GESTOR, ROLES.ADMIN]}>
                <FornecedorLayout />
              </ProtectedByRole>
            }
          >
            <Route index element={<FornecedorHome />} />
            <Route path="plantacoes" element={<Plantacoes />} />
            <Route path="necessidades" element={<Necessidades />} />
            <Route path="solicitacoes" element={<Solicitacoes />} />
            <Route path="status" element={<StatusSolicitacoes />} />
            <Route path="painel" element={<PainelGestao />} />
            <Route path="orgaos" element={<OrgaosApd />} />
            {/* NOVO: página de perfil do fornecedor */}
            <Route path="perfil" element={<PerfilFornecedor />} />
          </Route>

          <Route path="*" element={<div className="p-8">404 — Página não encontrada.</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}