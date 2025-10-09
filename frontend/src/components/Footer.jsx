export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content">
      <aside>
        <p>© {new Date().getFullYear()} SACRI — Sistema de Apoio a Comunidades Rurais Isoladas</p>
      </aside>
    </footer>
  );
}
