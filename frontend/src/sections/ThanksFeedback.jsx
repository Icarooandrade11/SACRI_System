export default function ThanksFeedback() {
  return (
    <section className="bg-[#A8E6A3] rounded-3xl shadow-inner border border-black/5">
      <div className="container mx-auto px-6 py-14 grid lg:grid-cols-2 gap-10 items-start w-full">
        <div>
          <h3 className="text-white text-4xl sm:text-5xl font-extrabold leading-tight">
            Obrigado por
            <br /> estar nos
            <br /> ajudando
          </h3>
          <div className="mt-6 bg-[#CDECF9] rounded-2xl p-5 max-w-xs">
            <div className="flex gap-2 items-center mb-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#A8E6A3] text-[#0e7490]">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m21 7l-2 10H7L5 7zM4 5h16l1 2H3z"/></svg>
              </span>
              <span className="font-semibold">Pesquisa rápida</span>
            </div>
            <p className="text-sm opacity-90">Responda esta breve pesquisa para que nosso sistema permaneça sempre em melhorias!</p>
          </div>
        </div>

        <form className="bg-[#CDECF9] rounded-3xl p-6 space-y-3">
          <h4 className="text-xl font-bold mb-2">Como você geralmente prefere receber novos feedbacks de sua comunidade?</h4>
          {["Sessões de feedbacks individuais","Feedbacks por escrito","Discussões em reuniões gerais","Feedback informal e imediato"].map((opt,i)=>(
            <label key={i} className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3">
              <input type="radio" name="feedback" className="radio" />
              <span>{opt}</span>
            </label>
          ))}
          <div className="text-xs text-ellipsis mt-1">• Responda com lealdade</div>
        </form>
      </div>
    </section>
  );
}
