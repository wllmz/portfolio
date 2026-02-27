"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
  {
    number: "04",
    title: "Conseil & Architecture",
    description:
      "Audit de code, choix technologiques, architecture d'un nouveau projet — je vous aide à prendre les bonnes décisions techniques dès le départ.",
    tags: ["Audit", "Architecture", "CI/CD", "DevOps"],
  },
];

function ServiceCard({ s, i }: { s: (typeof services)[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-t border-[--border] py-8 px-6 overflow-hidden cursor-default group"
      style={{
        borderBottom:
          i === services.length - 1 ? "1px solid var(--border)" : "none",
      }}
    >
      {/* Fill sweep */}
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-[--accent]/10"
        style={{ transformOrigin: "left" }}
      />

      {/* Left accent bar */}
      <motion.div
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-[--accent] origin-bottom"
      />

      <div className="relative z-10 grid md:grid-cols-[80px_1fr_auto] gap-6 items-start">
        <motion.span
          animate={{ color: hovered ? "var(--accent)" : "var(--muted)" }}
          transition={{ duration: 0.2 }}
          className="text-sm font-bold pt-1"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {s.number}
        </motion.span>

        <div>
          <motion.h3
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-bold mb-3 text-[--foreground]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {s.title}
          </motion.h3>
          <p className="text-sm leading-relaxed max-w-lg text-[--muted]">
            {s.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 md:justify-end">
          {s.tags.map((tag) => (
            <motion.span
              key={tag}
              animate={{
                borderColor: hovered ? "var(--accent)" : "var(--border)",
                color: hovered ? "var(--accent)" : "var(--muted)",
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
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[--accent] text-xs font-bold tracking-widest uppercase mb-3"
          >
            Ce que je fais
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              ref={ref}
              initial={{ y: "100%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-bold text-[--foreground] tracking-tight"
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
