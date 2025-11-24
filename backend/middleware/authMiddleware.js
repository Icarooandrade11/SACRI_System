import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getAuthTokenFromRequest } from "../utils/cookies.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

    if (!token) {
    token = getAuthTokenFromRequest(req);
  }

  if (!token) {
    return res.status(401).json({ message: "Sem token, acesso negado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
});

export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Sem permissão para acessar este recurso" });
  }

  return next();
};

export default protect;
