export default function MotivationPoll() {
  return (
    <section className="bg-[#A8E6A3]">
      <div className="container mx-auto px-6 py-12 grid lg:grid-cols-2 gap-8 items-center">
        <div className="relative">
          <div className="bg-[#2DB3C7] rounded-3xl h-72 w-full relative overflow-hidden">
            <div className="absolute inset-8 rounded-2xl rotate-3 bg-[#CDECF9]" />
          </div>
        </div>

        <form className="bg-[#CDECF9] rounded-3xl p-6 space-y-3">
          <h4 className="text-xl font-bold mb-2">Qual sua principal motivação ao participar do nosso sistema SACRI?</h4>
          {[
            "Desenvolvimento pessoal",
            "Crescimento rural",
            "Novas oportunidades de negócios",
            "Aumentar os ganhos e o reconhecimento rural"
          ].map((opt,i)=>(
            <label key={i} className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3">
              <input type="radio" name="motiv" className="radio" />
              <span>{opt}</span>
            </label>
          ))}
          <div className="text-xs text-green-700">• o seu nome será partilhado | 0 votos</div>
        </form>
      </div>
    </section>
  );
}
