import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Comunidades from "./pages/Comunidades.jsx";
import Plantacoes from "./pages/Plantacoes.jsx";
import Relatorios from "./pages/Relatorios.jsx";
import Suporte from "./pages/Suporte.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useLocation } from "react-router-dom";


export default function App() {
    const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className={isHome ? "flex-1 overflow-hidden" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/comunidades"
            element={
              <ProtectedRoute>
                <Comunidades />
              </ProtectedRoute>
            }
          />

          <Route
            path="/plantacoes"
            element={
              <ProtectedRoute>
                <Plantacoes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/relatorios"
            element={
              <ProtectedRoute>
                <Relatorios />
              </ProtectedRoute>
            }
          />

          <Route
            path="/suporte"
            element={
              <ProtectedRoute>
                <Suporte />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
