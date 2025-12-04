import 'dotenv/config';
import dotenv from "dotenv";
import { createServer } from "http";

import connectDB from "./config/db.js";
import { initSocket } from "./utils/socket.js";
import app, { corsOptions } from "./app.js";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const server = createServer(app);
initSocket(server, corsOptions);
server.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
