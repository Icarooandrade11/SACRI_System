export default function ExperiencePoll() {
  return (
    <section className="bg-[#A8E6A3] rounded-3xl shadow-inner border border-black/5">
      <div className="container mx-auto px-6 py-14 grid lg:grid-cols-2 gap-8 items-center w-full">
        <div className="relative">
          <div className="bg-[#CFF6C6] rounded-3xl h-64 sm:h-80 w-full" />
          <div className="absolute inset-0 flex items-end p-4">
            <button className="btn bg-white text-neutral rounded-full shadow">Vamos aos conhecimentos gerais?</button>
          </div>
        </div>

        <form className="bg-[#CDECF9] rounded-3xl p-6 space-y-3">
          <h4 className="text-xl font-bold mb-2">Qual sua experiência ao ter nosso sistema ao seu favor?</h4>
          {[
            "Não agregou tanto assim, faltam melhorias",
            "Ter uma alta demanda",
            "Oportunidades de vendas",
            "Aumento em meu crescimento rural"
          ].map((opt,i)=>(
            <label key={i} className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3">
              <input type="radio" name="exp" className="radio" />
              <span>{opt}</span>
            </label>
          ))}
          <div className="text-xs text-green-700">• o seu nome será partilhado | 0 votos</div>
        </form>
      </div>
    </section>
  );
}
