import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/api";
import { useAuth } from "./AuthContext.jsx";
import { ensureSocketConnected, getSocket, disconnectSocket } from "../services/socket";

const CommunicationContext = createContext();

export function CommunicationProvider({ children }) {
    const { user } = useAuth();
    const [contacts, setContacts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [targets, setTargets] = useState([]);
    const [loading, setLoading] = useState(true);

  async function loadData(searchTerm = "") {
    if (!user) {
      setContacts([]);
      setRequests([]);
      setTargets([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [{ data: main }, { data: targetData }] = await Promise.all([
        api.get("/contacts"),
        api.get("/contacts/targets", { params: searchTerm ? { search: searchTerm } : {} }),
      ]);

      setContacts(main?.contacts ?? []);
      setRequests(main?.requests ?? []);
      setTargets(targetData?.targets ?? []);
    } catch (error) {
      console.error("Erro ao carregar contatos:", error);
      setContacts([]);
      setRequests([]);
      setTargets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
   }, [user?._id]);

  useEffect(() => {
    if (!user?._id) return undefined;
    const socket = ensureSocketConnected();

    const handlePresence = (onlineUsers = []) => {
      const onlineSet = new Set(onlineUsers.filter((u) => u.online).map((u) => u.id));
      setContacts((prev) => prev.map((c) => ({ ...c, status: onlineSet.has(c.userId) ? "online" : "offline" })));
      setTargets((prev) => prev.map((t) => ({ ...t, status: onlineSet.has(t.id) ? "online" : "offline" })));
    };

    socket.on("presence:update", handlePresence);

    return () => {
      socket.off("presence:update", handlePresence);
    };
  }, [user?._id]);

  useEffect(() => {
    if (!user) {
      disconnectSocket();
    } else {
      getSocket();
    }
  }, [user]);

  async function sendRequest(targetId, relationship, note) {
    const { data } = await api.post("/contacts/requests", { targetId, relationship, note });
    setRequests((prev) => [...prev, data]);
    setTargets((prev) => prev.filter((t) => t.id !== targetId));
    return data;
  }

  async function acceptRequest(id) {
    const { data } = await api.patch(`/contacts/requests/${id}/accept`);
    setRequests((prev) => prev.filter((r) => r.id !== id));
    if (data?.contact) setContacts((prev) => [...prev, data.contact]);
    return data?.contact;
  }

  async function declineRequest(id) {
    await api.patch(`/contacts/requests/${id}/decline`);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  async function updateRelationship(contactId, relationship) {
    const { data } = await api.patch(`/contacts/${contactId}`, { relationship });
    setContacts((prev) => prev.map((c) => (c.id === contactId ? data.contact : c)));
    return data.contact;
  }

  async function searchTargets(searchTerm) {
    await loadData(searchTerm);
  }

  const pendingIncoming = useMemo(
    () => requests.filter((r) => r.direction === "incoming" && r.status === "pendente"),
    [requests]
  );

  const value = useMemo(
    () => ({
      loading,
      contacts,
      requests,
      targets,
      sendRequest,
      acceptRequest,
      declineRequest,
      updateRelationship,
      pendingIncoming,
      searchTargets,
    }),
    [loading, contacts, requests, targets, pendingIncoming]
  );

  return <CommunicationContext.Provider value={value}>{children}</CommunicationContext.Provider>;
}

export function useCommunication() {
  const ctx = useContext(CommunicationContext);
  if (!ctx) throw new Error("useCommunication deve ser usado dentro de CommunicationProvider");
  return ctx;
}
