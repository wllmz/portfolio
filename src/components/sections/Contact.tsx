"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connecter à un service email (Resend, EmailJS, etc.)
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[--accent] text-sm font-medium tracking-widest uppercase mb-3">
            Travaillons ensemble
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[--foreground] mb-4">
            Contact
          </h2>
          <p className="text-[--muted] text-lg">
            Un projet en tête ? N&apos;hésitez pas à me contacter.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-[--card] border border-[--border] rounded-2xl p-8"
        >
          <div className="grid sm:grid-cols-2 gap-6">
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
                className="w-full bg-[--background] border border-[--border] rounded-lg px-4 py-3 text-[--foreground] placeholder-[--muted] focus:outline-none focus:border-[--accent] transition-colors text-sm"
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
                className="w-full bg-[--background] border border-[--border] rounded-lg px-4 py-3 text-[--foreground] placeholder-[--muted] focus:outline-none focus:border-[--accent] transition-colors text-sm"
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
              className="w-full bg-[--background] border border-[--border] rounded-lg px-4 py-3 text-[--foreground] placeholder-[--muted] focus:outline-none focus:border-[--accent] transition-colors text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[--accent] text-white rounded-lg font-medium hover:bg-[--accent-light] transition-colors duration-200 relative overflow-hidden"
          >
            {sent ? "Message envoyé ✓" : "Envoyer le message"}
          </button>
        </motion.form>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-6 mt-10"
        >
          {[
            { label: "GitHub", href: "https://github.com/tonpseudo" },
            { label: "LinkedIn", href: "https://linkedin.com/in/tonpseudo" },
            { label: "Email", href: "mailto:ton@email.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--muted] hover:text-[--accent] transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
