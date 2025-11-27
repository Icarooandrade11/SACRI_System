# SACRI_System

SACRI – Sistema de Apoio a Comunidades Rurais Isoladas
Plataforma web (React + Vite + Tailwind + DaisyUI) com backend real (Node.js + Express + MongoDB/Mongoose) para cadastro de famílias/comunidades, plantações, necessidades e comunicação com governo/ONGs.
Autenticação via JWT, senhas com bcrypt, CRUD completo e páginas públicas (Negociantes, Famílias, Regiões, Acessos, Plantações Rurais, Novos Negócios).

Ponto de status: o projeto está funcional com autenticação, rotas protegidas, API viva, páginas públicas e Home com layout e snap scrolling (rolagem “página a página”). O frontend já possui barra de busca integrada ao backend.

1) Visão Geral

Backend: Node.js (ESM) + Express + Mongoose + JWT + Bcrypt

Rotas: /api/auth (login/registro), /api/communities, /api/plantations, /api/inventory, /api/needs, /api/requests, /api/dashboard, /api/chat, /api/contacts.

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
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      User.js
      Community.js
      Plantation.js
      InventoryItem.js
      StockMovement.js
      Need.js
      Request.js
      Contact.js
      ContactRequest.js
      ChatMessage.js
    routes/
      authRoutes.js
      communityRoutes.js
      plantationRoutes.js
      inventoryRoutes.js
      needRoutes.js
      requestRoutes.js
      dashboardRoutes.js
      chatRoutes.js
      contactRoutes.js
    controllers/
      authController.js
      communityController.js
      plantationController.js
      inventoryController.js
      needController.js
      requestController.js
      dashboardController.js
    utils/
      generateToken.js
      chatChannels.js
      socket.js
      presence.js
      roles.js
      cookies.js

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

Copie `backend/.env.example` e configure pelo menos uma das opções abaixo:

**Opção A – URI completa do MongoDB (recomendado pelo Atlas)**

```
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

**Opção B – Credenciais separadas** (o backend monta a URI, útil quando há caracteres especiais na senha)

```
MONGO_USER=<usuario_do_mongo>
MONGO_PASSWORD=<senha_do_mongo>
MONGO_HOST=cluster0.xxxxxx.mongodb.net
MONGO_DB=sacri
MONGO_OPTIONS=retryWrites=true&w=majority&appName=Cluster0
```

Outras variáveis importantes:

```
PORT=5000
JWT_SECRET=um-segredo-forte-aqui
MAIL_FROM=no-reply@sacri.local
FRONTEND_URL=http://localhost:5173
```

4.2 Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000/api

5) Documentação Técnica (versão expandida)
5.1 Arquitetura em camadas
- **Frontend (React + Vite)**: SPA que usa React Router para páginas públicas e protegidas, Context API para controle de sessão e axios para falar com o backend. O socket.io-client é usado para presença e chat em tempo real.
- **Backend (Node.js + Express + Mongoose)**: API REST em ESM, separada em rotas, controllers e models. Middleware `protect` faz a autenticação via JWT (header ou cookie) e `authorizeRoles` valida papéis (`MORADOR`, `AGENTE`, `GESTOR`, `ONG`, `PARCEIRO`, `ADMIN`). Socket.io no servidor mantém chat e status online.
- **Banco (MongoDB/Mongoose)**: coleções com timestamps automáticos, relações via `ref` (User -> comunidades, plantações, necessidades, mensagens). Utiliza índices de unicidade (ex.: `Request.code`).

5.2 Tecnologias atuais (stack)
- **Frontend:** React 18, React Router DOM 6, Vite 5, TailwindCSS 3 + DaisyUI, Framer Motion, axios, socket.io-client.
- **Backend:** Node 18+, Express 4, Mongoose 8, JWT, bcryptjs, cors, dotenv, nodemailer (placeholder), socket.io.
- **Ferramentas:** nodemon para hot reload do backend, scripts Vite (`dev/build/preview`) para o frontend.

5.3 Organização das camadas do backend
- `server.js`: inicia Express, conecta no MongoDB, configura CORS (origem do frontend), JSON/body parser, rotas REST e Socket.io.
- `routes/`: registra endpoints temáticos (`/api/auth`, `/api/communities`, `/api/plantations`, `/api/inventory`, `/api/needs`, `/api/requests`, `/api/dashboard`, `/api/chat`, `/api/contacts`).
- `controllers/`: lógica de negócio; cada controller recebe o usuário autenticado via middleware para registrar `createdBy` e aplicar regras (ex.: visibilidade por papel no dashboard).
- `middleware/`: `authMiddleware` (JWT + roles) e `errorMiddleware` (tratamento centralizado de erros assíncronos).
- `utils/`: geração de token, canais de chat, presença online, cookies e wrapper `asyncHandler`.

5.4 Principais modelos (MongoDB)
- **User**: nome, email único, senha (hash bcrypt), `role`, `approvalStatus`, dados de recuperação de senha, flags de presença online.
- **Community**: nome, região, total de famílias, contato, descrição, `createdBy` (User).
- **Plantation**: nome, cultura, área, estágio (preparo/plantio/manutenção/colheita), status (planejada/em andamento/colhida/suspensa), datas de plantio/colheita, sistema de irrigação, notas, `createdBy`.
- **InventoryItem** + **StockMovement**: controle de estoque por item (categoria, unidade, quantidades mínimas/atuais, localização) e movimentos (entrada/saída, quantidade, observações, vínculo com item e usuário).
- **Need**: demanda aberta por comunidade, com prioridade, status, categoria, data alvo e `createdBy`.
- **Request**: solicitações enviadas a órgãos/ONGs, com código único, destino, itens solicitados, status de fluxo (rascunho → concluída) e `linkedNeed` opcional.
- **ChatMessage**: mensagens por canal (público ou direto), autor e conteúdo; usadas tanto pelo REST (`/api/chat`) quanto pelo Socket.io.
- **Contact/ContactRequest**: registros de contato/solicitação externa para triagem.

5.5 API e segurança
- **Autenticação**: POST `/api/auth/register` e `/api/auth/login` geram JWT; token pode ser enviado no header `Authorization: Bearer <token>` ou cookie. Rotas protegidas exigem `protect`; permissões refinadas com `authorizeRoles`.
- **Comunidades**: GET/POST `/api/communities` (controle por papel de sistema).
- **Plantações**: CRUD parcial em `/api/plantations` (lista/cria) e `/api/plantations/:id` (atualiza/exclui).
- **Inventário**: `/api/inventory/items` (listar/criar), `/api/inventory/items/:id` (atualizar/remover) e `/api/inventory/movements` (listar/criar movimentações).
- **Necessidades e Solicitações**: `/api/needs` e `/api/requests` expõem criação e leitura de demandas/solicitações; requests podem conter itens e vincular uma Need.
- **Dashboard**: `/api/dashboard/summary` (indicadores consolidados por papel) e rotas auxiliares de busca/contagem.
- **Chat**: `/api/chat` suporta listagem (query `channel`) e envio de mensagens; Socket.io mantém presença (`presence:update`) e canais públicos/DMs (`chat:join`, `chat:message`).
- **Contatos externos**: `/api/contacts` registra pedidos de suporte oriundos das páginas públicas.
- **Padrões**: JSON consistente, respostas de erro padronizadas em `errorMiddleware`, status HTTP coerentes (401/403 para auth/role, 400 validação, 404 se não encontrado quando aplicável).

5.6 Fluxos e observabilidade
- **Autenticação end-to-end**: usuário registra/login → token salvo no localStorage pelo AuthContext → axios envia `Authorization` → backend popula `req.user` e aplica roles.
- **Chat em tempo real**: cliente abre conexão Socket.io com token (auth handshake) → servidor registra presença (`presence:update` broadcast) → mensagens são persistidas e replicadas para o canal.
- **Monitoramento manual**: logs no console do backend mostram conexão Mongo e porta HTTP; endpoints de listagem (`/api/dashboard/summary`, `/api/inventory/items`) ajudam a validar dados inseridos.
- **Dados de exemplo**: é possível cadastrar rapidamente via Postman/REST Client com os corpos mínimos indicados nos modelos acima; `code` em Request deve ser único.

6) Instalação & Execução
6.1 Backend
cd backend
npm install
npm run dev   # nodemon
# OU: npm start


Acesse: http://localhost:5000/api/health (se existir rota de health) ou apenas verifique o console.

6.2 Frontend
cd ../frontend
npm install
npm run dev
# Local: http://localhost:5173


Se o Vite reclamar de pacote faltando (ex.: @vitejs/plugin-react), rode npm i -D @vitejs/plugin-react.
Se faltar framer-motion: npm i framer-motion.

7) Autenticação & Fluxo

Registro: /api/auth/register → retorna token JWT.

Login: /api/auth/login → retorna token JWT.

O frontend salva o JWT no localStorage (token) e popula o AuthContext.

Rotas protegidas usam ProtectedRoute (verifica useAuth()).

Exemplo de login (curl):

curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sacri.com","password":"123456"}'

8) API – Endpoints (resumo)
Auth
- POST /api/auth/register – { name, email, password }
- POST /api/auth/login – { email, password }

Comunidades (token obrigatório)
- GET /api/communities
- POST /api/communities

Plantações (token obrigatório)
- GET /api/plantations
- POST /api/plantations
- PUT /api/plantations/:id
- DELETE /api/plantations/:id

Inventário (token obrigatório)
- GET /api/inventory/items
- POST /api/inventory/items
- PUT /api/inventory/items/:id
- DELETE /api/inventory/items/:id
- GET /api/inventory/movements
- POST /api/inventory/movements

Necessidades & Solicitações (token obrigatório)
- GET /api/needs
- POST /api/needs
- PUT /api/needs/:id
- GET /api/requests
- POST /api/requests
- PUT /api/requests/:id

Dashboard & Chat
- GET /api/dashboard/summary
- GET /api/chat?channel=geral
- POST /api/chat – { channel, text }

Headers comuns: Authorization: Bearer <TOKEN>

9) Frontend – Páginas & Recursos

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

10) Scripts úteis
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

11) Troubleshooting (erros reais que já ocorreram)
11.1 MongoDB URI undefined
Erro ao conectar no MongoDB: The `uri` parameter to `openUri()` must be a string


→ Defina MONGODB_URI em backend/.env e reinicie o servidor.

11.2 Falta de pacotes no frontend
Cannot find package '@vitejs/plugin-react'


→ npm i -D @vitejs/plugin-react (e rode npm run dev).

11.3 PowerShell não remove node_modules com rmdir /s /q

Use:

Remove-Item -Recurse -Force .\node_modules
# ou:
cmd /c rmdir /s /q node_modules

11.4 Tela branca / erro de import

Import apontando para arquivo que não existe (Vite overlay vermelho).

Solução: criar o arquivo com export default e caminho exato, sem acentos (ex.: Regioes.jsx, não Regiões.jsx).

11.5 useAuth() undefined no Navbar
Cannot destructure property 'user' of 'useAuth(...)' as it is undefined


→ Faltou <AuthProvider> em main.jsx ou Navbar destruturando sem checar.
Corrigido envolvendo <App /> com <AuthProvider> e usando destruturação segura no Navbar.

11.6 Link is not defined no Home

→ Faltou import { Link } from "react-router-dom" no Home.jsx.

11.7 Identificador duplicado
Identifier 'useNavigate' has already been declared


→ Import duplicado. Deixe um único:

import { Link, useNavigate } from "react-router-dom";

11.8 Git: remote já existe / push rejeitado

error: remote origin already exists. → use git remote set-url origin <url>.

rejected (fetch first) → faça:

git add -A
git commit -m "WIP before rebase"
git pull --rebase origin main
# resolva conflitos, depois:
git push -u origin main

12) Qualidade, Segurança & Padrões

Senhas com bcrypt (saltRounds recomendados: 10–12).

JWT com expiresIn adequado (ex.: 7d) e JWT_SECRET forte.

CORS restrito à origem do frontend em dev (http://localhost:5173).

ESLint/Prettier (opcional) para padronização de código.

DTOs/validações (Zod/Yup) – próximos passos.

13) Roadmap (alinhado ao DDE/ERS)

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

14) Contribuição

Fork → git clone → git checkout -b feature/minha-feature

Faça commits pequenos e objetivos.

npm run lint (se configurado)

Pull Request com descrição clara (antes/depois, screenshots se UI).

15) Licença

Projeto acadêmico com fins sociais. Licença a definir (MIT sugerida).

16) Contato / Suporte

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
