import { useEffect, useState } from "react";
import api from "../../api/api";

export default function PlantacoesRurais() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{ api.get("/crops").then(({data})=>setItems(data||[])).catch(()=>setItems([])); },[]);
  const filtered = items.filter(p => [p.name,p.type,p.region,p.family,p.notes].filter(Boolean).join(" ").toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">Plantações Rurais</h1>
      <input className="input input-bordered w-full max-w-lg mb-6" placeholder="Buscar plantações..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p=>(
          <div key={p._id} className="bg-base-100 rounded-2xl p-5 shadow border">
            <h4 className="text-lg font-semibold">{p.name}</h4>
            <p className="text-sm opacity-80">{p.type || "-"}</p>
            <p className="text-sm"><b>Região:</b> {p.region || "-"}</p>
            {p.notes && <p className="text-sm mt-2">{p.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
