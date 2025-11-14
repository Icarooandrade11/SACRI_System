# SACRI_System

SACRI – Sistema de Apoio a Comunidades Rurais Isoladas
Plataforma web (React + Vite + Tailwind + DaisyUI) com backend real (Node.js + Express + MongoDB/Mongoose) para cadastro de famílias/comunidades, plantações, necessidades e comunicação com governo/ONGs.
Autenticação via JWT, senhas com bcrypt, CRUD completo e páginas públicas (Negociantes, Famílias, Regiões, Acessos, Plantações Rurais, Novos Negócios).

Ponto de status: o projeto está funcional com autenticação, rotas protegidas, API viva, páginas públicas e Home com layout e snap scrolling (rolagem “página a página”). O frontend já possui barra de busca integrada ao backend.

1) Visão Geral

Backend: Node.js (ESM) + Express + Mongoose + JWT + Bcrypt

Rotas: /api/auth (login/registro), /api/communities e /api/crops (CRUD).

Middleware de auth, geração de token, conexão MongoDB.

Frontend: React + Vite + TailwindCSS + DaisyUI + React Router + Contexto de Autenticação

Páginas: Home (seções com snap), Login, Register, Dashboard (privado), Comunidades (gestão), Relatórios (placeholder), Busca (Search), públicas: Negociantes, Famílias, Regiões, Acessos, Plantações Rurais, Novos Negócios.

Navbar: HOME, LOGIN, CADASTRO, FAMÍLIAS (leva à página pública, não ao login).

Busca: /buscar?q=… retorna cartões vindos da API.

2) Requisitos

Node.js: ≥ 18 (testado também no 22).

MongoDB: local (mongodb://localhost:27017/sacri) ou Atlas.

Git e npm.

Windows/PowerShell compatível (comandos abaixo cobrem gotchas de PowerShell).

Se você usa a extensão Console Ninja no VS Code, pode aparecer um aviso do Vite/Node 22 — é apenas da extensão. O projeto roda normalmente.

3) Estrutura de Pastas
Project_SACRI/
  backend/
    server.js
    package.json
    .env.example
    config/db.js
    middleware/authMiddleware.js
    models/
      User.js
      Community.js
      Crop.js
    routes/
      authRoutes.js
      communityRoutes.js
      cropRoutes.js
    controllers/
      authController.js
      communityController.js
      cropController.js
    utils/generateToken.js

  frontend/
    index.html
    package.json
    vite.config.js
    tailwind.config.js
    .env.example
    src/
      main.jsx
      App.jsx
      api/api.js
      styles/global.css
      context/AuthContext.jsx
      components/
        Navbar.jsx
        Footer.jsx
        ProtectedRoute.jsx
        PublicCard.jsx
      pages/
        Home.jsx
        Login.jsx
        Register.jsx
        Dashboard.jsx
        Comunidades.jsx
        Plantacoes.jsx
        Relatorios.jsx
        Search.jsx
        Suporte.jsx
        public/
          Negociantes.jsx
          FamiliasPublico.jsx
          Regioes.jsx
          Acessos.jsx
          PlantacoesRurais.jsx
          NovosNegocios.jsx

4) Variáveis de Ambiente
4.1 Backend (backend/.env)
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sacri
JWT_SECRET=um-segredo-forte-aqui
CORS_ORIGIN=http://localhost:5173


Copie de .env.example e ajuste MONGODB_URI/JWT_SECRET.

4.2 Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000/api

5) Instalação & Execução
5.1 Backend
cd backend
npm install
npm run dev   # nodemon
# OU: npm start


Acesse: http://localhost:5000/api/health (se existir rota de health) ou apenas verifique o console.

5.2 Frontend
cd ../frontend
npm install
npm run dev
# Local: http://localhost:5173


Se o Vite reclamar de pacote faltando (ex.: @vitejs/plugin-react), rode npm i -D @vitejs/plugin-react.
Se faltar framer-motion: npm i framer-motion.

6) Autenticação & Fluxo

Registro: /api/auth/register → retorna token JWT.

Login: /api/auth/login → retorna token JWT.

O frontend salva o JWT no localStorage (token) e popula o AuthContext.

Rotas protegidas usam ProtectedRoute (verifica useAuth()).

Exemplo de login (curl):

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sacri.com","password":"123456"}'

7) API – Endpoints (resumo)
Auth

POST /api/auth/register – { name, email, password }

POST /api/auth/login – { email, password }

Communities (token obrigatório)

GET /api/communities

POST /api/communities – cria

GET /api/communities/:id

PUT /api/communities/:id

DELETE /api/communities/:id

Crops (token obrigatório)

GET /api/crops

POST /api/crops

GET /api/crops/:id

PUT /api/crops/:id

DELETE /api/crops/:id

Headers:
Authorization: Bearer <TOKEN>

8) Frontend – Páginas & Recursos

Home: herói com busca, “visão geral” (cards), seções de FAQ, recursos e chamadas.

Layout com snap scroll (rolagem “página a página” suave) para seções de 100vh.

Login & Register: telas modernas conforme layout enviado.

Públicas:

Negociantes: lista (com filtro) mapeada a partir de communities.

Famílias: idem.

Regiões: agrupamento por region.

Acessos: cards informativos.

Plantações Rurais: lista de crops.

Novos Negócios: propostas + recortes de comunidades/plantações.

Busca: /buscar?q=... – usa api.js para retornar dados da API e renderiza PublicCard.

Dashboard/Comunidades: áreas de gestão (CRUD) protegidas.

9) Scripts úteis
Backend
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js",
  "lint": "eslint ."
}

Frontend
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

10) Troubleshooting (erros reais que já ocorreram)
10.1 MongoDB URI undefined
Erro ao conectar no MongoDB: The `uri` parameter to `openUri()` must be a string


→ Defina MONGODB_URI em backend/.env e reinicie o servidor.

10.2 Falta de pacotes no frontend
Cannot find package '@vitejs/plugin-react'


→ npm i -D @vitejs/plugin-react (e rode npm run dev).

10.3 PowerShell não remove node_modules com rmdir /s /q

Use:

Remove-Item -Recurse -Force .\node_modules
# ou:
cmd /c rmdir /s /q node_modules

10.4 Tela branca / erro de import

Import apontando para arquivo que não existe (Vite overlay vermelho).

Solução: criar o arquivo com export default e caminho exato, sem acentos (ex.: Regioes.jsx, não Regiões.jsx).

10.5 useAuth() undefined no Navbar
Cannot destructure property 'user' of 'useAuth(...)' as it is undefined


→ Faltou <AuthProvider> em main.jsx ou Navbar destruturando sem checar.
Corrigido envolvendo <App /> com <AuthProvider> e usando destruturação segura no Navbar.

10.6 Link is not defined no Home

→ Faltou import { Link } from "react-router-dom" no Home.jsx.

10.7 Identificador duplicado
Identifier 'useNavigate' has already been declared


→ Import duplicado. Deixe um único:

import { Link, useNavigate } from "react-router-dom";

10.8 Git: remote já existe / push rejeitado

error: remote origin already exists. → use git remote set-url origin <url>.

rejected (fetch first) → faça:

git add -A
git commit -m "WIP before rebase"
git pull --rebase origin main
# resolva conflitos, depois:
git push -u origin main

11) Qualidade, Segurança & Padrões

Senhas com bcrypt (saltRounds recomendados: 10–12).

JWT com expiresIn adequado (ex.: 7d) e JWT_SECRET forte.

CORS restrito à origem do frontend em dev (http://localhost:5173).

ESLint/Prettier (opcional) para padronização de código.

DTOs/validações (Zod/Yup) – próximos passos.

12) Roadmap (alinhado ao DDE/ERS)

MVP (entregue / em curso)

 Autenticação (JWT), registro/login

 CRUD Comunidades/Plantações

 Páginas públicas (Negociantes, Famílias, Regiões, Acessos, Plantações, Novos Negócios)

 Busca unificada

 Home com snap scrolling e seções do layout

 Documentação e scripts

Próximos

 Exportação de relatórios (PDF/Excel)

 Notificações de solicitações/demandas

 Dashboards detalhados e filtros

 Perfis (Organizador/Participante) e RBAC

 Upload de mídia (ex.: fotos de plantações)

 Deploy (Render/ Railway + Atlas) e CI/CD

Futuro

 Integrações governamentais

 Offline-first / sync

 IA para insights de produção/demanda

13) Contribuição

Fork → git clone → git checkout -b feature/minha-feature

Faça commits pequenos e objetivos.

npm run lint (se configurado)

Pull Request com descrição clara (antes/depois, screenshots se UI).

14) Licença

Projeto acadêmico com fins sociais. Licença a definir (MIT sugerida).

15) Contato / Suporte

Suporte SACRI: 2024130014@AESA-CESA.BR

Autor: Ícaro de Andrade Santos — Matrícula: 2024130014 — Curso: ADS (4º período)

Instituição: AESA-CESA

Anexos Rápidos

frontend/src/context/AuthContext.jsx – snippet chave

import { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => { const t = localStorage.getItem("token"); if (t) setUser({ token: t }); }, []);
  const login = (u) => { setUser(u); if (u?.token) localStorage.setItem("token", u.token); };
  const logout = () => { setUser(null); localStorage.removeItem("token"); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
} 
export const useAuth = () => useContext(AuthContext);


frontend/src/main.jsx – provider + router

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/global.css";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

Front-end

React 18 (JSX)

Vite 5 (dev server/build com esbuild)

React Router DOM 6 (rotas e proteção por papel)

Context API (Auth + RBAC) + localStorage (token)

Tailwind CSS + daisyUI

Framer Motion (animações/overlays)

Páginas públicas (Home + seções, Busca, vitrines) e Área do Fornecedor com layout + rotas filhas

Back-end (conectado)

API acessada em http://localhost:5000
 ⇒ Node.js + Express (REST)