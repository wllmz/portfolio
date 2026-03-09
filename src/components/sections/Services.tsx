"use client";

import { label } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    label: "WEB",
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
    label: "API",
    title: "API & Backend",
    description:
      "Des architectures solides et scalables. Bases de données relationnelles, API REST ou GraphQL, authentication — tout ce qui fait tourner votre produit.",
    tags: ["Node.js", "PostgreSQL", "MongoDB", "GraphQL"],
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
    label: "SEO",
    title: "Performance & SEO",
    description:
      "Un site lent fait fuir vos clients. J'optimise les Core Web Vitals, le SEO technique et l'accessibilité pour que votre produit performe vraiment.",
    tags: ["Lighthouse", "SEO", "Core Web Vitals"],
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

function SideScrollIndicator({
  total,
  sectionRef,
}: {
  total: number;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;

      if (rect.bottom <= 0 || rect.top >= viewportH) {
        setVisible(false);
        return;
      }

      setVisible(true);

      const scrollable = rect.height - viewportH;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const raw = -rect.top / scrollable;
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionRef]);

  if (!visible) return null;

  const barHeight = 140;
  const knobSize = 10;
  const travel = barHeight - knobSize;
  const offset = travel * progress;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[25] hidden sm:flex flex-col items-center gap-3 pointer-events-none">
      <span
        className="text-[10px] font-bold tracking-[0.2em] uppercase"
        style={{ color: "#4b5563" }}
      >
        Services
      </span>
      <div
        style={{
          position: "relative",
          height: barHeight,
          width: 2,
          backgroundColor: "#9ca3af",
        }}
      >
        {Array.from({ length: total }).map((_, idx) => (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: "50%",
              top:
                total === 1
                  ? barHeight / 2
                  : (barHeight - 2) * (idx / (total - 1)),
              transform: "translateX(-50%)",
              width: 8,
              height: 1,
              backgroundColor: "#9ca3af",
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: offset,
            transform: "translate(-50%, 0)",
            width: knobSize,
            height: knobSize,
            backgroundColor: "#111827",
          }}
        />
      </div>
    </div>
  );
}

function ServiceCard({
  s,
  i,
  total,
}: {
  s: (typeof services)[number];
  i: number;
  total: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  return (
    <div
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
          {s.label}
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
        className="relative w-full max-w-[420px] sm:max-w-[520px] xl:max-w-[640px] overflow-hidden"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(135deg, #1f2937 0%, #0b1f3b 45%, #111827 100%)",
          border: "1px solid #4b5563",
          padding: "clamp(2.25rem, 4.5vw, 3.25rem)",
          minHeight: "clamp(18rem, 22rem, 26rem)",
          boxShadow: hovered
            ? "0 26px 40px rgba(15,23,42,0.65), 0 0 0 1px rgba(148,163,184,0.35)"
            : "0 18px 32px rgba(15,23,42,0.45), 0 0 0 1px rgba(148,163,184,0.2)",
          transform: hovered
            ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-4px)`
            : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)",
          transformStyle: "preserve-3d",
          transition:
            "transform 0.16s ease-out, box-shadow 0.16s ease-out, border-color 0.16s ease-out",
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHovered(true);
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setPos({ x, y });

          const relX = x / rect.width - 0.5;
          const relY = y / rect.height - 0.5;
          const maxTilt = 10;
          setTilt({
            rx: -relY * maxTilt,
            ry: relX * maxTilt,
          });
        }}
        onMouseLeave={() => {
          setHovered(false);
          setTilt({ rx: 0, ry: 0 });
        }}
      >
        {/* Content */}
        <div className="relative z-10">
          {/* Number + icon */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-xs font-bold tracking-widest"
              style={{ color: "rgba(209,213,219,0.7)" }}
            >
              {s.number} / {String(total).padStart(2, "0")}
            </span>
            <div style={{ color: "#9ca3af", opacity: 0.9 }}>{s.icon}</div>
          </div>

          {/* Title */}
          <h2
            className="font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "#f9fafb",
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
            style={{ color: "rgba(229,231,235,0.72)" }}
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
                  borderColor: "rgba(156,163,175,0.7)",
                  color: "#c7d2fe",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      {i < total - 1 && (
        <p
          className="absolute bottom-10 text-xs"
          style={{ color: "var(--muted)", opacity: 0.45, zIndex: 1 }}
        >
          Scroll ↓
        </p>
      )}
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        height: `${services.length * 100}vh`,
        background:
          "radial-gradient(circle at top left, #f5f6f8 0%, #e3e5ea 35%, #d1d5db 100%)",
      }}
    >
      <SideScrollIndicator total={services.length} sectionRef={sectionRef} />

      {services.map((s, i) => (
        <ServiceCard key={s.number} s={s} i={i} total={services.length} />
      ))}
    </section>
  );
}
