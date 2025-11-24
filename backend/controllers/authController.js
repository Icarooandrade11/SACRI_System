import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ROLES } from "../utils/roles.js";
import { sendPasswordRecoveryEmail } from "../utils/mailer.js";
import { setUserOffline, setUserOnline } from "../utils/presence.js";
import { emitPresenceSnapshot } from "../utils/socket.js";
import { attachAuthCookie, clearAuthCookie } from "../utils/cookies.js";

const buildUserResponse = (user) => ({
  _id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  organization: user.organization,
  token: generateToken(user._id),
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, phone, organization } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const normalizedRole = Object.values(ROLES).includes(role) ? role : ROLES.MORADOR;
  const user = await User.create({ name, email, password, role: normalizedRole, phone, organization });
  const payload = buildUserResponse(user);
  attachAuthCookie(res, payload.token);

  return res.status(201).json(payload);
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    await setUserOnline(user._id);
    emitPresenceSnapshot();
    const payload = buildUserResponse(user);
    attachAuthCookie(res, payload.token);
    return res.json(payload);
  }

  return res.status(401).json({ message: "Credenciais inválidas" });
});

export const getProfile = asyncHandler(async (req, res) => {
  return res.json({
    _id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    phone: req.user.phone,
    organization: req.user.organization,
    online: req.user.online,
    lastSeenAt: req.user.lastSeenAt,
  });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  user.name = req.body.name || user.name;
  user.phone = req.body.phone ?? user.phone;
  user.organization = req.body.organization ?? user.organization;

  if (req.body.password) {
    user.password = req.body.password;
  }

  const updated = await user.save();
  return res.json({
    _id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    phone: updated.phone,
    organization: updated.organization,
    online: updated.online,
    lastSeenAt: updated.lastSeenAt,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  await setUserOffline(req.user._id);
  emitPresenceSnapshot();
  clearAuthCookie(res);
  return res.json({ message: "Sessão encerrada" });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Informe o e-mail" });

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "Se o e-mail existir, enviaremos instruções" });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.resetPasswordToken = hashed;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1h
  await user.save();

  const base = process.env.FRONTEND_URL || "http://localhost:5173";
  const link = `${base}/recuperar-senha?token=${resetToken}&email=${encodeURIComponent(email)}`;
  await sendPasswordRecoveryEmail({ to: email, name: user.name, link });

  return res.json({ message: "Se o e-mail existir, enviaremos instruções" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, email, password } = req.body;
  if (!token || !email || !password) {
    return res.status(400).json({ message: "Token, e-mail e nova senha são obrigatórios" });
  }

  const hashed = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    email,
    resetPasswordToken: hashed,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: "Token inválido ou expirado" });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return res.json({ message: "Senha atualizada com sucesso" });
});
