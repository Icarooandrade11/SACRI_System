import { useSearchParams } from "react-router-dom";
export default function Search() {
  const [sp] = useSearchParams();
  return <div className="p-6">Busca: {sp.get("q") || "-"}</div>;
}
