import 'dotenv/config';
import { createServer } from "http";

import connectDB from "./config/db.js";
import { initSocket } from "./utils/socket.js";
import app from "./app.js";

// 🔌 conecta no banco antes de subir o servidor
connectDB();

const PORT = process.env.PORT || 5000;

const server = createServer(app);

// 🔥 Socket.IO inicializado após o HTTP server
initSocket(server);

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
