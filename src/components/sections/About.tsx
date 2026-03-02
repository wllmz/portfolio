"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
  { value: "5+", label: "ans d'expérience" },
  { value: "15+", label: "clients satisfaits" },
  { value: "100%", label: "remote-ready" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <section id="about" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div ref={ref} className="mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Qui suis-je ?
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
              animate={
                inView
                  ? { clipPath: "inset(0% 0 0 0)", y: 0 }
                  : { clipPath: "inset(100% 0 0 0)", y: 12 }
              }
              transition={{ duration: 0.9, ease: EASE }}
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight"
              style={{
                color: "var(--foreground)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              Mon approche
            </motion.h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 mb-12 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="flex flex-col justify-between gap-6 sm:gap-8"
          >
            <div className="space-y-4">
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--foreground)" }}
              >
                Je suis développeur freelance full stack, spécialisé dans la
                création d&apos;applications web{" "}
                <span style={{ color: "var(--accent)" }}>
                  rapides, accessibles et mémorables.
                </span>
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed opacity-80"
                style={{ color: "var(--foreground)" }}
              >
                Depuis plus de 5 ans, j&apos;accompagne des startups et des PME
                dans la conception et le développement de leurs projets digitaux
                — de l&apos;idée jusqu&apos;à la mise en production.
              </p>
              <p
                className="text-sm sm:text-base leading-relaxed opacity-80"
                style={{ color: "var(--foreground)" }}
              >
                Ce qui me différencie&nbsp;: je pense autant en tant que
                designer qu&apos;en tant qu&apos;ingénieur. Le code que
                j&apos;écris est pensé pour durer, et l&apos;interface que je
                crée est pensée pour convertir.
              </p>
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-sm font-semibold w-fit px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity duration-200"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Travaillons ensemble →
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[--border] rounded-xl overflow-hidden">
            {approach.map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                  delay: 0.15 + i * 0.08,
                }}
                className="p-5 sm:p-6 flex flex-col gap-3 transition-colors duration-300"
                style={{ backgroundColor: "var(--surface)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--card)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "var(--surface)";
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
                  style={{
                    color: "var(--foreground)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-xs leading-relaxed opacity-80"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-[--border] rounded-xl overflow-hidden"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-6 sm:py-8 px-3 border-r border-[--border] last:border-r-0"
            >
              <p
                className="text-2xl sm:text-3xl font-bold mb-1"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs text-center opacity-70"
                style={{ color: "var(--foreground)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
