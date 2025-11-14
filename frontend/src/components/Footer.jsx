export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-[1000] pointer-events-auto">
      <div className="mx-auto max-w-7xl px-6 py-3
                      bg-base-200/90 backdrop-blur
                      supports-[backdrop-filter]:bg-base-200/70
                      shadow border-t">
        <p className="text-center text-sm opacity-80">
          © {new Date().getFullYear()} SACRI — Sistema de Apoio a Comunidades Rurais Isoladas
        </p>
      </div>
    </footer>
  );
}