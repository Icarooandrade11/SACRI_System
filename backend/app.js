import 'dotenv/config';
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import plantationRoutes from "./routes/plantationRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import needRoutes from "./routes/needRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://sacri-system.vercel.app",
];

// 🔐 CORS ÚNICO E CONSISTENTE
const corsOptions = {
  origin: function (origin, callback) {
    // permite requests sem origin (Render, Postman, health checks)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("🌾 SACRI API rodando...");
});

// 🔗 ROTAS
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/plantations", plantationRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/needs", needRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/contacts", contactRoutes);

// ❗ sempre por último
app.use(errorHandler);

export default app;
