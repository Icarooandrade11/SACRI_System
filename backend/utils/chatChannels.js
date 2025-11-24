import mongoose from "mongoose";
import Contact from "../models/Contact.js";

export const PUBLIC_CHANNELS = new Set(["geral", "logistica", "parceiros"]);

function normalizeId(value) {
  if (!value) return "";
  if (value._id) return value._id.toString();
  return value.toString();
}

export function buildDirectChannel(userId, targetId) {
  const [a, b] = [normalizeId(userId), normalizeId(targetId)].sort();
  return `dm:${a}:${b}`;
}

export function extractDirectTarget(channel, currentUserId) {
  if (!channel?.startsWith("dm:")) return null;
  const [, a, b] = channel.split(":");
  if (!a || !b) return null;
  const current = currentUserId.toString();
  if (a === current) return b;
  if (b === current) return a;
  return null;
}

export async function canAccessChannel(userId, channel) {
  if (!channel) return false;
  if (PUBLIC_CHANNELS.has(channel)) return true;
  const targetId = extractDirectTarget(channel, userId);
  if (!targetId) return false;
  if (!mongoose.Types.ObjectId.isValid(targetId)) return false;
  const canonical = buildDirectChannel(userId, targetId);
  if (canonical !== channel) return false;
  const contact = await Contact.findOne({ owner: userId, target: targetId });
  return Boolean(contact);
}
