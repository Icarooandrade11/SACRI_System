import { useMemo } from "react";

const communities = [
  { name: "Vale Verde", region: "Norte", families: 86, cultures: ["milho", "feijão", "mandioca"] },
  { name: "Serra Clara", region: "Norte", families: 41, cultures: ["cacau", "pimenta"] },
  { name: "Rio Dourado", region: "Nordeste", families: 122, cultures: ["coco", "caju", "mandioca"] },
  { name: "Chapada Viva", region: "Centro-Oeste", families: 73, cultures: ["soja", "milho", "girassol"] },
  { name: "Encosta Azul", region: "Sudeste", families: 65, cultures: ["café", "milho", "hortaliças"] },
  { name: "Lago Sereno", region: "Sul", families: 39, cultures: ["maçã", "uva", "trigo"] },
  { name: "Campo Esperança", region: "Sul", families: 51, cultures: ["uva", "soja"] },
];

function buildReportText(summary, regionTotals, cultureTotals) {
  const cultureLines = cultureTotals
    .map(({ culture, count }) => `- ${culture}: ${count} comunidades`)
    .join("\n");

  const regionLines = regionTotals
    .map(({ region, count }) => `- ${region}: ${count} comunidades`)
    .join("\n");

  return `RELATÓRIO SACRI\n\n` +
    `Data de emissão: ${new Date().toLocaleString()}\n` +
    `Comunidades monitoradas: ${summary.totalCommunities}\n` +
    `Famílias atendidas: ${summary.totalFamilies}\n` +
    `Culturas distintas: ${summary.distinctCultures}\n` +
    `-----------------------------\n` +
    `Totais por região:\n${regionLines}\n\n` +
    `Culturas predominantes:\n${cultureLines}\n\n` +
    `Observação: os dados refletem os cadastros mais recentes informados pelas equipes locais.`;
}

export default function Relatorios() {
  const { summary, regionTotals, cultureTotals } = useMemo(() => {
    const regionMap = new Map();
    const cultureMap = new Map();

    let families = 0;

    communities.forEach((community) => {
      families += community.families;

      regionMap.set(community.region, (regionMap.get(community.region) || 0) + 1);

      community.cultures.forEach((culture) => {
        cultureMap.set(culture, (cultureMap.get(culture) || 0) + 1);
      });
    });

    const regionTotals = Array.from(regionMap.entries()).map(([region, count]) => ({ region, count }));
    const cultureTotals = Array.from(cultureMap.entries())
      .map(([culture, count]) => ({ culture, count }))
      .sort((a, b) => b.count - a.count);

    return {
      summary: {
        totalCommunities: communities.length,
        totalFamilies: families,
        distinctCultures: cultureMap.size,
      },
      regionTotals,
      cultureTotals,
    };
  }, []);

  function exportReport(format) {
    if (format === "print") {
      window.print();
      return;
    }

    const content = buildReportText(summary, regionTotals, cultureTotals);
    const isPdf = format === "pdf";

    const blob = new Blob([content], {
      type: isPdf
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = isPdf ? "relatorio-sacri.pdf" : "relatorio-sacri.docx";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-black text-emerald-700">Relatórios consolidados</h2>
          <p className="text-sm opacity-70">
            Indicadores gerais por região e culturas cadastradas para usuários autenticados.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-sm btn-outline" onClick={() => exportReport("pdf")}>Exportar PDF</button>
          <button className="btn btn-sm btn-outline" onClick={() => exportReport("word")}>Exportar Word</button>
          <button className="btn btn-sm btn-primary" onClick={() => exportReport("print")}>Imprimir</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border bg-gradient-to-br from-white to-emerald-50">
          <p className="text-xs font-semibold uppercase text-emerald-500">Comunidades</p>
          <p className="text-3xl font-black text-emerald-700">{summary.totalCommunities}</p>
          <p className="text-sm text-gray-600">Monitoradas e com dados ativos</p>
        </div>
        <div className="p-4 rounded-2xl border bg-gradient-to-br from-white to-emerald-50">
          <p className="text-xs font-semibold uppercase text-emerald-500">Famílias atendidas</p>
          <p className="text-3xl font-black text-emerald-700">{summary.totalFamilies}</p>
          <p className="text-sm text-gray-600">Distribuídas entre as regiões</p>
        </div>
        <div className="p-4 rounded-2xl border bg-gradient-to-br from-white to-emerald-50">
          <p className="text-xs font-semibold uppercase text-emerald-500">Culturas distintas</p>
          <p className="text-3xl font-black text-emerald-700">{summary.distinctCultures}</p>
          <p className="text-sm text-gray-600">Mosaico de culturas cadastradas</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-5 space-y-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Comunidades por região</h3>
              <p className="text-sm text-gray-600">Distribuição territorial dos cadastros</p>
            </div>
            <span className="badge badge-ghost">{regionTotals.length} regiões</span>
          </div>
          <div className="space-y-3">
            {regionTotals.map((region) => (
              <div key={region.region} className="flex items-center justify-between border rounded-xl px-3 py-2">
                <div>
                  <p className="font-semibold text-emerald-700">{region.region}</p>
                  <p className="text-xs text-gray-500">Comunidades cadastradas</p>
                </div>
                <div className="text-2xl font-black text-emerald-700">{region.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 space-y-4 border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Culturas cadastradas</h3>
              <p className="text-sm text-gray-600">Diversidade e frequência</p>
            </div>
            <span className="badge badge-ghost">{cultureTotals.length} tipos</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {cultureTotals.map((culture) => (
              <div key={culture.culture} className="border rounded-xl px-3 py-2 bg-emerald-50/40">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-emerald-700 capitalize">{culture.culture}</p>
                  <span className="badge badge-success badge-sm">{culture.count}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Comunidades que reportaram essa cultura</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-emerald-600 to-cyan-500 text-white rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <p className="text-sm uppercase font-semibold">Exportação rápida</p>
          <h4 className="text-2xl font-black">Leve os indicadores para reuniões e auditorias</h4>
          <p className="text-white/80 text-sm max-w-2xl">
            Gere PDF ou Word com os totais por região e culturas cadastradas, garantindo transparência nos dados compartilhados com parceiros.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-sm" onClick={() => exportReport("pdf")}>PDF</button>
          <button className="btn btn-sm" onClick={() => exportReport("word")}>Word</button>
          <button className="btn btn-sm btn-outline" onClick={() => exportReport("print")}>Imprimir</button>
        </div>
      </div>
    </div>
  );
}
