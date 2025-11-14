const KEY = "sacri:sync-queue:v1";

export function enqueue(task) {
  const q = JSON.parse(localStorage.getItem(KEY) || "[]");
  q.push({ id: crypto.randomUUID(), ts: Date.now(), ...task });
  localStorage.setItem(KEY, JSON.stringify(q));
}

export function readQueue() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function clearByIds(ids) {
  const idset = new Set(ids);
  const q = readQueue().filter((t) => !idset.has(t.id));
  localStorage.setItem(KEY, JSON.stringify(q));
}

export async function processQueue(processor) {
  const q = readQueue();
  if (!q.length) return { processed: 0 };
  const done = [];
  for (const item of q) {
    try {
      // processor deve lançar erro se falhar
      // exemplo de item: { type:"POST", url:"/orders", payload:{} }
      // quem chama decide como tratar conflitos
      // eslint-disable-next-line no-await-in-loop
      await processor(item);
      done.push(item.id);
    } catch (e) {
      // mantém na fila
      // você pode marcar retries etc.
    }
  }
  if (done.length) clearByIds(done);
  return { processed: done.length };
}
