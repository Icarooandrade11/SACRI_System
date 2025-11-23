import express from "express";
import Contact from "../models/Contact.js";
import ContactRequest from "../models/ContactRequest.js";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";
import { ROLES } from "../utils/roles.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();
const ELIGIBLE_ROLES = [ROLES.AGENTE, ROLES.GESTOR, ROLES.ONG];

function normalizeContact(doc) {
  if (!doc) return null;
  return {
    id: doc.id,
    userId: doc.target._id.toString(),
    name: doc.target.name,
    role: doc.target.role,
    relationship: doc.relationship,
    status: doc.target.online ? "online" : "offline",
    };
}

router.use(protect);

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const [contacts, requests] = await Promise.all([
      Contact.find({ owner: req.user._id }).populate("target", "name role online"),
      ContactRequest.find({
        status: "pendente",
        $or: [{ from: req.user._id }, { to: req.user._id }],
      })
        .populate("from", "name role")
        .populate("to", "name role"),
    ]);

    const formattedContacts = contacts.map(normalizeContact);
    const formattedRequests = requests.map((reqItem) => ({
      id: reqItem.id,
      relationship: reqItem.relationship,
      note: reqItem.note,
      status: reqItem.status,
      direction: reqItem.to._id.equals(req.user._id) ? "incoming" : "outgoing",
      fromUser: {
        id: reqItem.from.id,
        name: reqItem.from.name,
        role: reqItem.from.role,
      },
      target: {
        id: reqItem.to.id,
        name: reqItem.to.name,
        role: reqItem.to.role,
      },
    }));

    res.json({ contacts: formattedContacts, requests: formattedRequests });
  })
);

router.get(
  "/targets",
  asyncHandler(async (req, res) => {
    const search = (req.query.search || "").trim();
    const regex = search ? new RegExp(`^${search}`, "i") : null;

    const [contacts, requests] = await Promise.all([
      Contact.find({ owner: req.user._id }).select("target"),
      ContactRequest.find({ status: "pendente", from: req.user._id }).select("to"),
    ]);

    const excludedIds = new Set([
      ...contacts.map((c) => c.target.toString()),
      ...requests.map((r) => r.to.toString()),
      req.user._id.toString(),
    ]);

    const criteria = {
      role: { $in: ELIGIBLE_ROLES },
      _id: { $nin: Array.from(excludedIds) },
    };

    if (regex) {
      criteria.name = regex;
    }

    const targets = await User.find(criteria).limit(10).select("name role online");

    res.json({
      targets: targets.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        status: t.online ? "online" : "offline",
      })),
    });
  })
);

router.post(
  "/requests",
  asyncHandler(async (req, res) => {
    const { targetId, relationship = "amigo", note = "" } = req.body || {};
    if (!targetId) return res.status(400).json({ message: "Contato alvo é obrigatório" });
    if (targetId === req.user._id.toString()) return res.status(400).json({ message: "Não é possível convidar a si mesmo" });

    const target = await User.findById(targetId).select("name role online");
    if (!target || !ELIGIBLE_ROLES.includes(target.role)) {
      return res.status(400).json({ message: "Contato não elegível" });
    }

    const existingContact = await Contact.findOne({ owner: req.user._id, target: targetId });
    if (existingContact) return res.status(409).json({ message: "Contato já existe" });

    const existingRequest = await ContactRequest.findOne({ from: req.user._id, to: targetId, status: "pendente" });
    if (existingRequest) return res.status(409).json({ message: "Solicitação já enviada" });

    const request = await ContactRequest.create({ from: req.user._id, to: targetId, relationship, note });

    res.status(201).json({
      id: request.id,
      relationship: request.relationship,
      note: request.note,
      status: request.status,
      direction: "outgoing",
      fromUser: { id: req.user._id, name: req.user.name, role: req.user.role },
      target: { id: target.id, name: target.name, role: target.role },
    });
  })
);

router.patch(
  "/requests/:id/accept",
  asyncHandler(async (req, res) => {
    const request = await ContactRequest.findById(req.params.id).populate("from", "name role online");
    if (!request || !request.to.equals(req.user._id) || request.status !== "pendente") {
      return res.status(404).json({ message: "Solicitação não encontrada" });
    }

    request.status = "aceita";
    await request.save();

    const [contactA, contactB] = await Promise.all([
      Contact.findOneAndUpdate(
        { owner: req.user._id, target: request.from._id },
        { relationship: request.relationship },
        { new: true, upsert: true }
      ),
      Contact.findOneAndUpdate(
        { owner: request.from._id, target: req.user._id },
        { relationship: request.relationship },
        { new: true, upsert: true }
      ),
    ]);

    const hydrated = await contactA.populate("target", "name role online");

    res.json({ contact: normalizeContact(hydrated) });
  })
);

router.patch(
  "/requests/:id/decline",
  asyncHandler(async (req, res) => {
    const request = await ContactRequest.findById(req.params.id);
    if (!request || (!request.to.equals(req.user._id) && !request.from.equals(req.user._id))) {
      return res.status(404).json({ message: "Solicitação não encontrada" });
    }

    await ContactRequest.deleteOne({ _id: req.params.id });
    res.json({ removed: { id: request.id } });
  })
);

router.patch(
  "/contacts/:id",
  asyncHandler(async (req, res) => {
    const { relationship } = req.body || {};
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { relationship },
      { new: true }
    ).populate("target", "name role online");

    if (!contact) return res.status(404).json({ message: "Contato não encontrado" });

    res.json({ contact: normalizeContact(contact) });
  })
);

export default router;
