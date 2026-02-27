"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    index: "01",
    title: "Plateforme SaaS",
    category: "Application Web · Full Stack",
    description: "Outil de gestion interne pour une PME de 50 personnes. Dashboard en temps réel, gestion des rôles, exports CSV automatisés.",
    impact: { value: "↓ 3h", label: "gagnées / jour / équipe" },
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    demo: "#", github: "#",
  },
  {
    index: "02",
    title: "E-commerce Mode",
    category: "Boutique en ligne · Paiement",
    description: "Boutique e-commerce sur-mesure avec tunnel de paiement optimisé, gestion des stocks et programme fidélité.",
    impact: { value: "+42%", label: "taux de conversion" },
    tags: ["Next.js", "Stripe", "Sanity", "Tailwind"],
    demo: "#", github: "#",
  },
  {
    index: "03",
    title: "API Logistique",
    category: "Backend · Architecture",
    description: "Refonte complète de l'API d'une startup logistique. Migration GraphQL, cache Redis, réduction des temps de réponse de 80%.",
    impact: { value: "↓ 80%", label: "temps de réponse API" },
    tags: ["Node.js", "GraphQL", "Redis", "Docker"],
    demo: "#", github: "#",
  },
];

function ProjectRow({ p, i }: { p: typeof projects[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-t border-[--border] cursor-default group"
    >
      {/* Main row */}
      <div className="py-6 flex items-center gap-6 md:gap-10">
        {/* Big number */}
        <span
          className="text-[56px] md:text-[72px] font-bold leading-none tabular-nums select-none transition-colors duration-300 flex-shrink-0"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: hovered ? "var(--accent)" : "var(--border)",
          }}
        >
          {p.index}
        </span>

        {/* Title + category */}
        <div className="flex-1 min-w-0">
          <h3
            className="text-2xl md:text-3xl font-bold leading-tight truncate transition-colors duration-200"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: hovered ? "var(--accent)" : "var(--foreground)",
            }}
          >
            {p.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {p.category}
          </p>
        </div>

        {/* Impact + arrow */}
        <div className="hidden md:flex items-center gap-8 flex-shrink-0">
          <div className="text-right">
            <p
              className="text-xl font-bold leading-none"
              style={{ color: "var(--accent)", fontFamily: "var(--font-space-grotesk)" }}
            >
              {p.impact.value}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {p.impact.label}
            </p>
          </div>
          <motion.span
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-2xl"
            style={{ color: hovered ? "var(--accent)" : "var(--muted)" }}
          >
            →
          </motion.span>
        </div>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="pb-6 pt-2 pl-[88px] md:pl-[112px] flex flex-wrap items-end justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--muted)" }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full border"
                      style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <a
                  href={p.demo}
                  className="text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: "var(--accent)", color: "#fff" }}
                >
                  Voir ↗
                </a>
                <a
                  href={p.github}
                  className="text-xs font-semibold px-4 py-2 rounded-full border transition-colors duration-200"
                  style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
                >
                  Code
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="projects" className="py-24 relative z-10 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Réalisations
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
              animate={inView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-bold tracking-tight"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Projets
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            href="#contact"
            className="text-sm mt-3 inline-block transition-colors"
            style={{ color: "var(--muted)" }}
          >
            Votre projet pourrait être le prochain →
          </motion.a>
        </div>

        <div>
          {projects.map((p, i) => (
            <ProjectRow key={p.index} p={p} i={i} />
          ))}
          <div className="border-t border-[--border]" />
        </div>
      </div>
    </section>
  );
}
