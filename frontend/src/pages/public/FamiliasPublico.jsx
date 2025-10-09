import { useEffect, useState } from "react";
import api from "../../api/api";

export default function FamiliasPublico() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{ api.get("/communities").then(({data})=>setItems(data||[])).catch(()=>setItems([])); },[]);
  const filtered = items.filter(c => [c.name,c.region,c.description].filter(Boolean).join(" ").toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">Famílias</h1>
      <input className="input input-bordered w-full max-w-lg mb-6" placeholder="Buscar famílias/comunidades..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(c=>(
          <div key={c._id} className="bg-base-100 rounded-2xl p-5 shadow border">
            <h4 className="text-lg font-semibold">{c.name}</h4>
            <p className="opacity-80 text-sm">{c.region || "-"}</p>
            {c.contact && <p className="text-sm mt-1"><b>Contato:</b> {c.contact}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
