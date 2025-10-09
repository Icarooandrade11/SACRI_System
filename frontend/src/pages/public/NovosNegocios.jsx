import { useEffect, useState } from "react";
import api from "../../api/api";

export default function NovosNegocios() {
  const [communities, setCommunities] = useState([]);
  const [crops, setCrops] = useState([]);
  const [q, setQ] = useState("");

  useEffect(()=>{
    api.get("/communities").then(({data})=>setCommunities(data||[])).catch(()=>setCommunities([]));
    api.get("/crops").then(({data})=>setCrops(data||[])).catch(()=>setCrops([]));
  },[]);

  const proposals = [
    { title:"Compra coletiva de insumos", text:"Pedido conjunto para reduzir custo.", tag:"coletivo" },
    { title:"Feira mensal regional", text:"Vitrine de produtos locais e artesanato.", tag:"feira" },
    { title:"Parceria com ONG logística", text:"Rota mensal de escoamento de excedentes.", tag:"parceria" },
  ].filter(p => (p.title+p.text).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">Novos Negócios</h1>
      <input className="input input-bordered w-full max-w-lg mb-6" placeholder="Buscar oportunidades..." value={q} onChange={e=>setQ(e.target.value)} />

      <h3 className="text-xl font-bold mb-3">Propostas</h3>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {proposals.map((p,i)=>(
          <div key={i} className="bg-base-100 rounded-2xl p-5 shadow border">
            <h4 className="text-lg font-semibold">{p.title}</h4>
            <p className="opacity-80 text-sm">{p.text}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mb-3">Comunidades & Plantações relacionadas</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-base-100 rounded-2xl p-5 shadow border">
          <h4 className="font-semibold mb-2">Comunidades</h4>
          <ul className="list-disc pl-5 text-sm">
            {communities.slice(0,8).map(c=><li key={c._id}>{c.name} — {c.region || "-"}</li>)}
          </ul>
        </div>
        <div className="bg-base-100 rounded-2xl p-5 shadow border">
          <h4 className="font-semibold mb-2">Plantações</h4>
          <ul className="list-disc pl-5 text-sm">
            {crops.slice(0,8).map(p=><li key={p._id}>{p.name} — {p.type || "-"}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
