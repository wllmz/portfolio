"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Projets", href: "#projects" },
  { label: "À propos", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[--background]/90 backdrop-blur-md border-b border-[--border]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#hero"
          className="text-xl font-bold text-[--foreground] hover:text-[--accent] transition-colors"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Votre Nom<span style={{ color: "var(--accent)" }}>.</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[--muted] hover:text-[--foreground] transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--accent] transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200"
            style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
          >
            Démarrons →
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 bg-[--foreground] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[--foreground] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[--foreground] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[--background]/95 backdrop-blur-md border-b border-[--border]"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[--muted] hover:text-[--foreground] transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-4 flex items-center gap-3">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
