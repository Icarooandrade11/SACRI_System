// src/pages/fornecedor/FornecedorApp.jsx
import { NavLink, Routes, Route, Navigate } from "react-router-dom";

function LinkItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md ${isActive ? "bg-base-200 font-semibold" : "hover:bg-base-200"}`
      }
    >
      {label}
    </NavLink>
  );
}

function FornecedorHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Área do Parceiro</h1>
      <p className="opacity-70 mt-2">
        Bem-vindo! Aqui você acompanha pedidos, produtos e solicitações vinculadas ao seu cadastro.
      </p>
    </div>
  );
}

function Pedidos()   { return <div className="p-6">Pedidos do parceiro (em breve)</div>; }
function Produtos()  { return <div className="p-6">Catálogo / Meus produtos (em breve)</div>; }
function Solic()     { return <div className="p-6">Solicitações / Trâmites (em breve)</div>; }

export default function FornecedorApp() {
  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-6">
      <div className="mb-4 flex gap-2">
        <LinkItem to="" label="Início" />
        <LinkItem to="pedidos" label="Pedidos" />
        <LinkItem to="produtos" label="Produtos" />
        <LinkItem to="solicitacoes" label="Solicitações" />
      </div>

      <div className="rounded-xl bg-base-100 shadow">
        <Routes>
          <Route index element={<FornecedorHome />} />
          <Route path="pedidos" element={<Pedidos />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="solicitacoes" element={<Solic />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </div>
  );
}
