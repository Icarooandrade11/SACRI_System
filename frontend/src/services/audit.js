export function auditLog(action, meta = {}) {
  const rec = { id: crypto.randomUUID(), action, meta, at: new Date().toISOString() };
  const list = JSON.parse(localStorage.getItem("sacri:audit") || "[]");
  list.unshift(rec);
  localStorage.setItem("sacri:audit", JSON.stringify(list.slice(0, 500)));
}
