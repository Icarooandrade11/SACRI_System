import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/api";
import PublicCard from "../components/PublicCard";


export default function Search() {
  const q = new URLSearchParams(useLocation().search).get("q") || "";
  const [communities, setCommunities] = useState([]);
  const [crops, setCrops] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    Promise.all([api.get("/communities"), api.get("/crops")]).then(([c, p]) => {
      setCommunities(c.data || []);
      setCrops(p.data || []);
    });
  }, []);

  const query = q.toLowerCase();
  const cFiltered = useMemo(()=>communities.filter(c => [c.name,c.region,c.contact,c.description].filter(Boolean).join(" ").toLowerCase().includes(query)),[communities,query]);
  const pFiltered = useMemo(()=>crops.filter(p => [p.name,p.type,p.region,p.family,p.notes].filter(Boolean).join(" ").toLowerCase().includes(query)),[crops,query]);

  const all = [...cFiltered.map(x=>({type:"Comunidade", data:x})), ...pFiltered.map(x=>({type:"Plantação", data:x}))];

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-4">Resultados para “{q}”</h1>

      <div className="tabs tabs-boxed mb-6">
        <button className={`tab ${tab==="all" && "tab-active"}`} onClick={()=>setTab("all")}>Todos ({all.length})</button>
        <button className={`tab ${tab==="communities" && "tab-active"}`} onClick={()=>setTab("communities")}>Comunidades ({cFiltered.length})</button>
        <button className={`tab ${tab==="crops" && "tab-active"}`} onClick={()=>setTab("crops")}>Plantações ({pFiltered.length})</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(tab==="all" ? all : tab==="communities" ? cFiltered.map(x=>({type:"Comunidade",data:x})) : pFiltered.map(x=>({type:"Plantação",data:x}))).map((row,idx)=>(
          <PublicCard key={idx} title={`${row.type}: ${row.data.name}`} subtitle={row.data.region || row.data.type || "-"}>
            {row.data.description && <p className="opacity-80">{row.data.description}</p>}
            {row.data.notes && <p className="opacity-80">{row.data.notes}</p>}
          </PublicCard>
        ))}
      </div>
    </div>
  );
}
