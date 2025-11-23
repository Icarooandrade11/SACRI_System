export default function Footer() {
  return (
    <footer className="fixed inset-x-1 bottom-0 z-[10] pointer-events-auto">
      <div className="mx-auto max-w-6xl px-2 py-2
                      bg-base-200/10 backdrop-blur
                      supports-[backdrop-filter]:bg-base-100/60
                      shadow border-t">
        <p className="text-center text-sm opacity-70" >
          © {new Date().getFullYear()} SACRI — Sistema de Apoio a Comunidades Rurais Isoladas
        </p>
      </div>
    </footer>
  );
}