"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full">

          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="text-[--accent] text-xs font-bold tracking-widest uppercase mb-3">
              Travaillons ensemble
            </p>
            <h2
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-[--foreground] mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Contact
            </h2>
            <p className="text-base sm:text-lg opacity-80" style={{ color: "var(--foreground)" }}>
              Un projet en tête&nbsp;? N&apos;hésitez pas à me contacter.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto w-full">
            <motion.form
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              onSubmit={handleSubmit}
              className="space-y-5 border border-[--border] p-6 sm:p-8"
              style={{ backgroundColor: "var(--card)" }}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[--foreground] mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Votre nom"
                    className="w-full border border-[--border] px-4 py-3 text-[--foreground] focus:outline-none focus:border-[--accent] transition-colors text-sm"
                    style={{ backgroundColor: "var(--background)" }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[--foreground] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="w-full border border-[--border] px-4 py-3 text-[--foreground] focus:outline-none focus:border-[--accent] transition-colors text-sm"
                    style={{ backgroundColor: "var(--background)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[--foreground] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className="w-full border border-[--border] px-4 py-3 text-[--foreground] focus:outline-none focus:border-[--accent] transition-colors text-sm resize-none"
                  style={{ backgroundColor: "var(--background)" }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 font-semibold text-sm hover:opacity-90 transition-opacity duration-200 relative overflow-hidden"
                style={{ backgroundColor: "var(--accent)", color: "#fff" }}
              >
                {sent ? "Message envoyé ✓" : "Envoyer le message"}
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
              className="flex justify-center gap-6 mt-8"
            >
              {[
                { label: "GitHub",   href: "https://github.com/tonpseudo"          },
                { label: "LinkedIn", href: "https://linkedin.com/in/tonpseudo"     },
                { label: "Email",    href: "mailto:ton@email.com"                  },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:text-[--accent] transition-colors"
                  style={{ color: "var(--foreground)" }}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </div>

        </div>
    </section>
  );
}
