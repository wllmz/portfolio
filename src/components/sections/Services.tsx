"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const services = [
  {
    number: "01",
    title: "Applications Web",
    description:
      "Du site vitrine à l'application SaaS complète. Je conçois et développe des interfaces rapides, accessibles et mémorables avec React et Next.js.",
    tags: ["Next.js", "React", "TypeScript", "UI/UX"],
  },
  {
    number: "02",
    title: "API & Backend",
    description:
      "Des architectures solides et scalables. Bases de données relationnelles, API REST ou GraphQL, authentication — tout ce qui fait tourner votre produit.",
    tags: ["Node.js", "PostgreSQL", "Prisma", "GraphQL"],
  },
  {
    number: "03",
    title: "Performance & SEO",
    description:
      "Un site lent fait fuir vos clients. J'optimise les Core Web Vitals, le SEO technique et l'accessibilité pour que votre produit performe vraiment.",
    tags: ["Lighthouse", "SEO", "A11y", "Core Web Vitals"],
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-t border-[--border] py-7 overflow-hidden cursor-default"
      style={{
        borderBottom:
          i === services.length - 1 ? "1px solid var(--border)" : "none",
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute inset-0 bg-[--accent]/10"
        style={{ transformOrigin: "left" }}
      />
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-[--accent] origin-bottom"
      />

      <div className="relative z-10 grid md:grid-cols-[72px_1fr_auto] gap-4 sm:gap-6 items-start">
        <motion.span
          animate={{ color: hovered ? "var(--accent)" : "var(--foreground)" }}
          transition={{ duration: 0.2 }}
          className="text-sm font-bold pt-1 hidden md:block"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {s.number}
        </motion.span>

        <div>
          <div className="flex items-center gap-3 mb-2 md:hidden">
            <span
              className="text-xs font-bold"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {s.number}
            </span>
          </div>
          <motion.h3
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-lg sm:text-xl font-bold mb-2 text-[--foreground]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {s.title}
          </motion.h3>
          <p className="text-sm leading-relaxed text-[--foreground] max-w-xl opacity-80">
            {s.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 md:justify-end">
          {s.tags.map((tag) => (
            <motion.span
              key={tag}
              animate={{
                borderColor: hovered ? "var(--accent)" : "var(--border)",
                color: hovered ? "var(--accent)" : "var(--foreground)",
              }}
              transition={{ duration: 0.25 }}
              className="text-xs px-2.5 py-1 rounded-full border"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <section
      id="services"
      className="relative z-10 py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-[--accent] text-xs font-bold tracking-widest uppercase mb-3"
          >
            Ce que je fais
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              ref={ref}
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : { y: "100%" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold text-[--foreground] tracking-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Services
            </motion.h2>
          </div>
        </div>

        <div>
          {services.map((s, i) => (
            <ServiceCard key={s.number} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
