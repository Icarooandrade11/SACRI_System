import 'dotenv/config';
import { createServer } from "http";

import connectDB from "./config/db.js";
import { initSocket } from "./utils/socket.js";
import app from "./app.js";

connectDB();

const PORT = process.env.PORT || 5000;

const server = createServer(app);

// 🔥 Socket sem corsOptions (CORS já está no app.js)
initSocket(server);

server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});