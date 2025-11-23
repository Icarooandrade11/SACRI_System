import express from "express";

const router = express.Router();

// Dados em memória para simulação
const prospects = [
  { id: "u-101", name: "Maria Gomes", role: "Agente comunitária", relationship: "amigo", status: "online" },
  { id: "u-102", name: "João Lima", role: "Gestor municipal", relationship: "orgao", status: "ausente" },
  { id: "u-103", name: "Associação Verde", role: "Parceiro/Fornecedor", relationship: "parceiro", status: "online" },
  { id: "u-104", name: "Rede de Jovens", role: "ONG", relationship: "outros", status: "online" },
];

const contacts = [
  { id: "c-1", userId: "u-103", name: "Associação Verde", role: "Parceiro/Fornecedor", relationship: "parceiro", status: "online" },
];

const requests = [
  {
    id: "rq-1",
    fromUser: { id: "u-104", name: "Rede de Jovens", role: "ONG" },
    toUserId: "current",
    relationship: "amigo",
    direction: "incoming",
    status: "pendente",
    note: "Gostaríamos de colaborar em novas hortas comunitárias.",
  },
];

router.get("/", (req, res) => {
  res.json({ contacts, requests });
});

router.get("/targets", (req, res) => {
  const available = prospects.filter(
    (p) => !contacts.some((c) => c.userId === p.id) && !requests.some((r) => r.fromUser?.id === p.id)
  );
  res.json({ targets: available });
});

router.post("/requests", (req, res) => {
  const { targetId, relationship = "amigo", note = "" } = req.body || {};
  const target = prospects.find((p) => p.id === targetId);
  if (!target) return res.status(400).json({ message: "Contato não encontrado" });

  const request = {
    id: `rq-${Date.now()}`,
    fromUser: { id: "current", name: "Você", role: "Sistema" },
    toUserId: target.id,
    target,
    relationship,
    direction: "outgoing",
    status: "pendente",
    note,
  };
  requests.push(request);
  res.status(201).json(request);
});

router.patch("/requests/:id/accept", (req, res) => {
  const { id } = req.params;
  const index = requests.findIndex((r) => r.id === id && r.direction === "incoming");
  if (index === -1) return res.status(404).json({ message: "Solicitação não encontrada" });

  const request = requests.splice(index, 1)[0];
  const contact = {
    id: `c-${Date.now()}`,
    userId: request.fromUser.id,
    name: request.fromUser.name,
    role: request.fromUser.role,
    relationship: request.relationship,
    status: "online",
  };
  contacts.push(contact);
  res.json({ contact });
});

router.patch("/requests/:id/decline", (req, res) => {
  const { id } = req.params;
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return res.status(404).json({ message: "Solicitação não encontrada" });
  const [removed] = requests.splice(index, 1);
  res.json({ removed });
});

router.patch("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { relationship } = req.body || {};
  const contact = contacts.find((c) => c.id === id);
  if (!contact) return res.status(404).json({ message: "Contato não encontrado" });
  if (relationship) contact.relationship = relationship;
  res.json({ contact });
});

export default router;