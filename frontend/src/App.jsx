// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas base
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Comunidades from "./pages/Comunidades";
import Search from "./pages/Search";

// Páginas públicas
import Negociantes from "./pages/public/Negociantes";
import FamiliasPublico from "./pages/public/FamiliasPublico";
import Regioes from "./pages/public/Regioes";
import Acessos from "./pages/public/Acessos";
import PlantacoesRurais from "./pages/public/PlantacoesRurais";
import NovosNegocios from "./pages/public/NovosNegocios";


export default function App() {
  const isHome = useLocation().pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={isHome ? "flex-1 overflow-hidden" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} />

          {/* Público */}
          <Route path="/negociantes" element={<Negociantes />} />
          <Route path="/familias" element={<FamiliasPublico />} />
          <Route path="/regioes" element={<Regioes />} />
          <Route path="/acessos" element={<Acessos />} />
          <Route path="/plantacoes-rurais" element={<PlantacoesRurais />} />
          <Route path="/novos-negocios" element={<NovosNegocios />} />

          {/* Gestão */}
          <Route path="/comunidades" element={<Comunidades />} />

          {/* Busca */}
          <Route path="/buscar" element={<Search />} />

          {/* Fallback */}
          <Route path="*" element={<div className="p-8">Página não encontrada.</div>} />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}
