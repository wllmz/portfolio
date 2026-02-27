"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const approach = [
  {
    num: "01",
    title: "Comprendre avant de coder",
    desc: "Je prends le temps d'analyser le besoin métier avant d'écrire la première ligne. Un bon produit commence par les bonnes questions.",
  },
  {
    num: "02",
    title: "Design & technique, ensemble",
    desc: "Je travaille l'interface et l'architecture en parallèle. L'expérience utilisateur n'est pas un détail — c'est le produit.",
  },
  {
    num: "03",
    title: "Livrer, itérer, améliorer",
    desc: "Je livre vite des versions fonctionnelles, j'intègre vos retours et j'améliore en continu. Pas de big bang, pas de surprise.",
  },
  {
    num: "04",
    title: "Transparence totale",
    desc: "Avancement, blocages, décisions techniques — vous êtes informé à chaque étape. La confiance se construit dans la clarté.",
  },
];

const stats = [
  { value: "20+", label: "projets livrés" },
  { value: "5+",  label: "ans d'expérience" },
  { value: "15+", label: "clients satisfaits" },
  { value: "100%", label: "remote-ready" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Qui suis-je ?
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
              animate={inView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-bold tracking-tight"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Mon approche
            </motion.h2>
          </div>
        </div>

        {/* Bio + approche */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 mb-20">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-between gap-8"
          >
            <div className="space-y-5">
              <p className="text-lg leading-relaxed" style={{ color: "var(--foreground)" }}>
                Je suis développeur freelance full stack, spécialisé dans la création d'applications web{" "}
                <span style={{ color: "var(--accent)" }}>rapides, accessibles et mémorables.</span>
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Depuis plus de 5 ans, j'accompagne des startups et des PME dans la conception et le développement de leurs projets digitaux — de l'idée jusqu'à la mise en production.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Ce qui me différencie : je pense autant en tant que designer qu'en tant qu'ingénieur. Le code que j'écris est pensé pour durer, et l'interface que je crée est pensée pour convertir.
              </p>
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 text-sm font-semibold w-fit px-5 py-2.5 rounded-full transition-all duration-200"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Travaillons ensemble →
            </motion.a>
          </motion.div>

          {/* Approche — grille 2×2 */}
          <div className="grid sm:grid-cols-2 gap-px border border-[--border] rounded-lg overflow-hidden">
            {approach.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group p-6 flex flex-col gap-3 transition-colors duration-300"
                style={{ backgroundColor: "var(--surface)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "var(--surface)";
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  {item.num}
                </span>
                <h3
                  className="text-sm font-bold leading-snug"
                  style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
                >
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats en ligne */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-[--border] rounded-lg overflow-hidden"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-8 px-4 border-r border-[--border] last:border-r-0"
            >
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: "var(--accent)", fontFamily: "var(--font-space-grotesk)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
