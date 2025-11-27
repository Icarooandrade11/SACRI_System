import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PUBLIC_PAGES } from "../data/publicPages";

function PageCard({ page }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold">Público</p>
          <h2 className="text-xl font-bold text-emerald-800">{page.title}</h2>
        </div>
        <Link
          to={page.path}
          className="text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition px-4 py-2 rounded-full"
        >
          Acessar
        </Link>
      </div>
      <p className="text-slate-600">{page.description}</p>
      <div className="flex flex-wrap gap-2">
        {page.tags?.map((tag) => (
          <span key={tag} className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Search() {
  const [sp] = useSearchParams();
 const query = (sp.get("q") || "").trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!query) return PUBLIC_PAGES;

    return PUBLIC_PAGES.filter((page) => {
      const haystack = [page.title, page.description, page.path, ...(page.tags || [])]
        .filter(Boolean)
        .map((item) => item.toLowerCase());

      return haystack.some((field) => field.includes(query));
    });
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <p className="text-sm text-emerald-700 font-semibold">Busca</p>
        <h1 className="text-3xl font-black text-emerald-900">Páginas públicas disponíveis</h1>
        <p className="text-slate-600 mt-2">
          {query
            ? `Resultados para "${sp.get("q")}" — ${filtered.length} página(s) encontrada(s).`
            : "Visualize todas as páginas abertas ao público e descubra onde deseja navegar."}
        </p>
      </header>

      {query && filtered.length === 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-900 p-6">
          Nenhuma página pública corresponde à sua busca. Tente usar outros termos ou explore as sugestões abaixo.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((page) => (
            <PageCard key={page.path} page={page} />
          ))}
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-bold text-emerald-900">Ideias de páginas disponíveis</h2>
        <p className="text-slate-600 mb-3">Veja rapidamente algumas rotas abertas sem cadastro.</p>
        <div className="flex flex-wrap gap-3">
          {PUBLIC_PAGES.slice(0, 6).map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100 hover:bg-emerald-100"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
