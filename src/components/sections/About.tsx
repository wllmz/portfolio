"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const approach = [
  {
    num: "01",
    title: "Comprendre avant de coder",
    desc: "Analyser le besoin métier avant d'écrire la première ligne.",
  },
  {
    num: "02",
    title: "Design & technique, ensemble",
    desc: "Interface et architecture en parallèle. L'UX n'est pas un détail.",
  },
  {
    num: "03",
    title: "Livrer, itérer, améliorer",
    desc: "Versions fonctionnelles vite, retours intégrés, amélioration continue.",
  },
  {
    num: "04",
    title: "Transparence totale",
    desc: "Avancement, blocages, décisions — vous êtes informé à chaque étape.",
  },
];

function ApproachCard({
  item,
  index,
  inView,
}: {
  item: (typeof approach)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{
        duration: 0.65,
        ease: EASE,
        delay: 0.15 + index * 0.08,
      }}
      className="p-5 sm:p-6 flex flex-col gap-3 border transition-colors duration-200"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--card)")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--surface)")}
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
        className="text-xs leading-relaxed"
        style={{ color: "var(--foreground)" }}
      >
        {item.desc}
      </p>
    </motion.div>
  );
}

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto w-full">
        <div ref={ref} className="mb-12 sm:mb-16 text-center sm:text-left">
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

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="flex flex-col justify-between gap-6 sm:gap-8 text-left"
          >
            <div className="space-y-3">
              <p
                className="text-base sm:text-lg leading-relaxed"
                style={{ color: "var(--foreground)" }}
              >
                Je suis William, développeur full stack freelance basé à Paris.
                J&apos;aide les entreprises à transformer leurs idées en{" "}
                <span style={{ color: "var(--accent)" }}>
                  outils web concrets et bien pensés.
                </span>
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--foreground)" }}
              >
                Applications métier (ERP, SaaS) avec Next.js et Node.js, du
                Figma au déploiement. Technique et UX au même niveau.
              </p>
            </div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
              className="inline-flex items-center gap-2 text-sm font-semibold w-fit px-5 py-2.5 hover:opacity-90 transition-opacity duration-200"
              style={{ backgroundColor: "var(--accent)", color: "#fff" }}
            >
              Travaillons ensemble →
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {approach.map((item, i) => (
              <ApproachCard key={item.num} item={item} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
