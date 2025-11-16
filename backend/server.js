import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import communityRoutes from "./routes/communityRoutes.js";
import plantationRoutes from "./routes/plantationRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import needRoutes from "./routes/needRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("🌾 SACRI API rodando..."));
app.use("/api/auth", authRoutes);
app.use("/api/communities", communityRoutes);
app.use("/api/plantations", plantationRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/needs", needRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
