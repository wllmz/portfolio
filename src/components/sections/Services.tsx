"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Applications Web",
    description:
      "Du site vitrine à l'application SaaS complète. Je conçois et développe des interfaces rapides, accessibles et mémorables avec React et Next.js.",
    tags: ["Next.js", "React", "TypeScript", "UI/UX"],
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="0" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8h4M7 11h2" />
        <path d="M15 9l2 2-2 2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "API & Backend",
    description:
      "Des architectures solides et scalables. Bases de données relationnelles, API REST ou GraphQL, authentication — tout ce qui fait tourner votre produit.",
    tags: ["Node.js", "PostgreSQL", "Prisma", "GraphQL"],
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9" />
        <path d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Performance & SEO",
    description:
      "Un site lent fait fuir vos clients. J'optimise les Core Web Vitals, le SEO technique et l'accessibilité pour que votre produit performe vraiment.",
    tags: ["Lighthouse", "SEO", "A11y", "Core Web Vitals"],
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ height: `${services.length * 100}vh` }}
    >
      {services.map((s, i) => (
        <div
          key={s.number}
          className="sticky top-0 h-screen flex flex-col items-center justify-center px-4"
          style={{
            zIndex: i + 2,
            backgroundColor: "var(--surface)",
            borderTop: i > 0 ? "1px solid var(--border)" : "none",
          }}
        >
          {/* Grand numéro derrière la carte */}
          <div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
          >
            <span
              className="font-bold leading-none"
              style={{
                fontSize: "clamp(18rem, 45vw, 38rem)",
                color: "var(--accent)",
                opacity: 0.04,
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {s.number}
            </span>
          </div>

          {/* Section label */}
          <p
            className="text-xs font-bold tracking-widest uppercase mb-6"
            style={{ color: "var(--accent)", zIndex: 1 }}
          >
            Services
          </p>

          {/* ── CARD ── */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              zIndex: 1,
              maxWidth: 500,
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              padding: "clamp(1.75rem, 4vw, 2.75rem)",
            }}
          >
            {/* Content */}
            <div className="relative z-10">
              {/* Number + icon */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  {s.number} / {String(services.length).padStart(2, "0")}
                </span>
                <div style={{ color: "var(--accent)", opacity: 0.8 }}>
                  {s.icon}
                </div>
              </div>

              {/* Title */}
              <h2
                className="font-bold leading-tight mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                {s.title}
              </h2>

              {/* Divider */}
              <div
                className="mb-4"
                style={{ height: 1, backgroundColor: "var(--border)" }}
              />

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--muted)" }}
              >
                {s.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 border"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--accent)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          {i < services.length - 1 && (
            <p
              className="absolute bottom-10 text-xs"
              style={{ color: "var(--muted)", opacity: 0.45, zIndex: 1 }}
            >
              Scroll ↓
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
