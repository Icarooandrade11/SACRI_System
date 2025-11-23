import User from "../models/User.js";

export async function setUserOnline(userId) {
  if (!userId) return null;
  return User.findByIdAndUpdate(userId, { online: true, lastSeenAt: new Date() }, { new: true }).select(
    "name role online"
  );
}

export async function setUserOffline(userId) {
  if (!userId) return null;
  return User.findByIdAndUpdate(userId, { online: false, lastSeenAt: new Date() }, { new: true }).select(
    "name role online lastSeenAt"
  );
}

export async function listOnlineUsers() {
  return User.find({ online: true }).select("name role online");
}
