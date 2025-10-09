
export default function FooterCTA() {
  return (
       <section className="relative overflow-hidden bg-[#A8E6A3] min-h-full flex items-center">
      <div className="container mx-auto px-6 py-16 grid lg:grid-cols-2 gap-10 items-center w-full">
        {/* ... */}
        <div className="relative">
          <div className="absolute -left-8 -top-8 w-64 h-36 rounded-2xl bg-[#2DB3C7] rotate-6 opacity-80" />
          <div className="absolute left-10 top-20 w-72 h-96 rounded-3xl bg-[#CFF6C6] -rotate-6 opacity-90" />
          <div className="absolute left-24 bottom-0 w-40 h-12 rounded-full bg-[#CDECF9] rotate-6 opacity-80" />
          <div className="h-96" />
        </div>

        <div>
          <h3 className="text-white text-4xl sm:text-5xl font-extrabold leading-snug">
            Mal podemos esperar pela sua interatividade, e<br/> visibilidade perante a comunidade!
          </h3>
          <p className="mt-6 text-white/90 uppercase tracking-widest text-sm">Para qualquer dúvida sobre o sistema e suas funcionalidades, contate o suporte:</p>
          <div className="mt-3 inline-flex items-center bg-[#CDECF9] text-[#0e2a47] font-semibold rounded-full px-6 py-3">2024130014@AESA-CESA.BR</div>

          <div className="mt-8 flex items-center gap-3 text-white/90">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11 21h-1v-8H6l7-10h1v8h4z"/></svg>
            <span>SACRI | Um sistema transformador de comunidades</span>
          </div>
        </div>
      </div>
    </section>
  );
}
