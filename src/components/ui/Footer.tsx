export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[--border]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[--foreground] opacity-60 text-sm">
          © {new Date().getFullYear()} Votre Nom. Tous droits réservés.
        </p>
        <p className="text-[--foreground] opacity-60 text-sm">
          Fait avec <span className="text-[--accent]">Next.js</span> &{" "}
          <span className="text-[--accent]">Tailwind CSS</span>
        </p>
      </div>
    </footer>
  );
}
