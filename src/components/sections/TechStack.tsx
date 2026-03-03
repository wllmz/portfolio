"use client";

import { useEffect, useRef, useState } from "react";

const stacks = [
  {
    number: "01",
    label: "Frontend",
    title: "Interfaces modernes & réactives",
    description:
      "React, Next.js et TypeScript pour construire des interfaces propres, rapides et maintenables, pensées pour le produit avant tout.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Figma",
    ],
  },
  {
    number: "02",
    label: "Backend",
    title: "Fondations solides & scalables",
    description:
      "APIs robustes, bases de données bien structurées et logique métier claire pour supporter la croissance de votre produit.",
    tags: ["Node.js", "PostgreSQL", "Prisma", "GraphQL", "Redis", "REST API"],
  },
  {
    number: "03",
    label: "DevOps",
    title: "Mises en production fiables",
    description:
      "De la conteneurisation au déploiement automatisé, pour des livraisons rapides et des environnements stables.",
    tags: ["Docker", "GitHub Actions", "Vercel", "AWS", "Linux", "Nginx"],
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
        Stack
      </span>
      <div
        style={{
          position: "relative",
          height: barHeight,
          width: 2,
          backgroundColor: "#9ca3af",
        }}
      >
        {/* repères */}
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

        {/* curseur */}
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

function StackCard({
  s,
  i,
  total,
}: {
  s: (typeof stacks)[number];
  i: number;
  total: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  return (
    <div
      className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 relative"
      style={{
        zIndex: i + 2,
        backgroundColor: "var(--surface)",
        borderTop: i > 0 ? "1px solid var(--border)" : "none",
      }}
    >
      {/* Lignes inspirées de la chaussure — sur le background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 0, opacity: 0.9 }}
      />

      {/* Grand label derrière la carte */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <span
          className="font-bold leading-none"
          style={{
            fontSize: "clamp(8rem, 26vw, 16rem)",
            color: "#4b5563",
            opacity: 0.09,
            fontFamily: "var(--font-space-grotesk)",
            letterSpacing: "0.1em",
          }}
        >
          {s.label.toUpperCase()}
        </span>
      </div>

      {/* Section label */}
      <p
        className="text-xs font-bold tracking-widest uppercase mb-6"
        style={{ color: "#1f2937", letterSpacing: "0.22em", zIndex: 1 }}
      >
        Compétences
      </p>

      {/* ── CARD ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          zIndex: 2,
          maxWidth: 520,
          background:
            "linear-gradient(135deg, #1f2937 0%, #0b1f3b 45%, #111827 100%)",
          border: "1px solid #4b5563",
          padding: "clamp(1.75rem, 4vw, 2.75rem)",
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
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          setHovered(true);
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
        <div className="relative z-10">
          {/* Number + label */}
          <div className="flex items-center justify-between mb-5">
            <span
              className="text-xs font-bold tracking-widest"
              style={{ color: "rgba(209,213,219,0.7)" }}
            >
              {s.number} / {String(total).padStart(2, "0")}
            </span>
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#9ca3af", opacity: 0.9 }}
            >
              {s.label}
            </span>
          </div>

          {/* Title */}
          <h2
            className="font-bold leading-tight mb-4"
            style={{
              fontSize: "clamp(1.6rem, 3.8vw, 2.35rem)",
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

export default function TechStack() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={sectionRef}
      id="stack"
      style={{
        height: `${stacks.length * 100}vh`,
        background:
          "radial-gradient(circle at top left, #f5f6f8 0%, #e3e5ea 35%, #d1d5db 100%)",
      }}
    >
      <SideScrollIndicator total={stacks.length} sectionRef={sectionRef} />

      {stacks.map((s, i) => (
        <StackCard key={s.number} s={s} i={i} total={stacks.length} />
      ))}
    </section>
  );
}
