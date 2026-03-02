"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

function ProjectRow({ p, i }: { p: (typeof projects)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-t border-[--border] cursor-default"
    >
      <div className="py-5 sm:py-6 flex items-center gap-4 sm:gap-8 md:gap-10">
        <span
          className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-none tabular-nums select-none transition-colors duration-300 flex-shrink-0"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: hovered ? "var(--accent)" : "var(--foreground)",
            opacity: hovered ? 1 : 0.25,
          }}
        >
          {p.index}
        </span>

        <div className="flex-1 min-w-0">
          <h3
            className="text-[clamp(1.1rem,2.5vw,1.875rem)] font-bold leading-tight truncate transition-colors duration-200"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: hovered ? "var(--accent)" : "var(--foreground)",
            }}
          >
            {p.title}
          </h3>
          <p className="text-xs sm:text-sm mt-1 opacity-60" style={{ color: "var(--foreground)" }}>
            {p.category}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
          <div className="text-right">
            <p
              className="text-base sm:text-xl font-bold leading-none"
              style={{ color: "var(--accent)", fontFamily: "var(--font-space-grotesk)" }}
            >
              {p.impact.value}
            </p>
            <p className="text-xs mt-0.5 opacity-60" style={{ color: "var(--foreground)" }}>
              {p.impact.label}
            </p>
          </div>
          <motion.span
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="text-xl transition-colors duration-200"
            style={{ color: hovered ? "var(--accent)" : "var(--foreground)" }}
          >
            →
          </motion.span>
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-5 pt-1 pl-[56px] sm:pl-[80px] md:pl-[104px] flex flex-wrap items-end justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--foreground)" }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full border"
                      style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
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
  const inView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <section id="projects" className="relative z-10 overflow-x-hidden py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full">

          <div ref={ref} className="mb-10 sm:mb-14">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "var(--accent)" }}
            >
              Réalisations
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
                animate={inView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : { clipPath: "inset(100% 0 0 0)", y: 12 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight"
                style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
              >
                Projets
              </motion.h2>
            </div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
              href="#contact"
              className="text-sm mt-3 inline-block hover:text-[--accent] transition-colors"
              style={{ color: "var(--foreground)" }}
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
