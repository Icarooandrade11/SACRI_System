import { useEffect, useMemo, useState } from "react";
import api from "../../api/api";

export default function Regioes() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{ api.get("/communities").then(({data})=>setItems(data||[])).catch(()=>setItems([])); },[]);
  const byRegion = useMemo(()=>{
    const map = new Map();
    items.forEach(c=>{
      const key = c.region || "Sem região";
      if(!map.has(key)) map.set(key,[]);
      map.get(key).push(c);
    });
    return [...map.entries()].sort((a,b)=>a[0].localeCompare(b[0]));
  },[items]);

  const regions = byRegion.filter(([region]) => region.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">Regiões</h1>
      <input className="input input-bordered w-full max-w-lg mb-6" placeholder="Buscar regiões..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map(([region, list])=>(
          <div key={region} className="bg-base-100 rounded-2xl p-5 shadow border">
            <h4 className="text-lg font-semibold">{region}</h4>
            <p className="opacity-80 text-sm mb-2">{list.length} comunidades</p>
            <ul className="list-disc pl-5 text-sm">
              {list.slice(0,6).map(c=><li key={c._id}>{c.name}</li>)}
              {list.length>6 && <li className="opacity-60">+{list.length-6} outras</li>}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
