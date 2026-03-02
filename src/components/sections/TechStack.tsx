"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const categories = [
  {
    label: "Frontend",
    items: [
      { name: "React",         sub: "UI Library" },
      { name: "Next.js",       sub: "Framework"  },
      { name: "TypeScript",    sub: "Language"   },
      { name: "Tailwind CSS",  sub: "Styling"    },
      { name: "Framer Motion", sub: "Animation"  },
      { name: "Figma",         sub: "Design"     },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js",    sub: "Runtime"  },
      { name: "PostgreSQL", sub: "Database" },
      { name: "Prisma",     sub: "ORM"      },
      { name: "GraphQL",    sub: "API"      },
      { name: "Redis",      sub: "Cache"    },
      { name: "REST API",   sub: "Protocol" },
    ],
  },
  {
    label: "DevOps",
    items: [
      { name: "Docker",         sub: "Container" },
      { name: "GitHub Actions", sub: "CI/CD"     },
      { name: "Vercel",         sub: "Deploy"    },
      { name: "AWS",            sub: "Cloud"     },
      { name: "Linux",          sub: "OS"        },
      { name: "Nginx",          sub: "Server"    },
    ],
  },
];

function TechRow({ cat, i }: { cat: (typeof categories)[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
      className="border-t border-[--border] py-7 flex flex-col sm:grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-8 items-start"
    >
      {/* Category label */}
      <div className="flex items-center gap-2 pt-0.5">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          {cat.label}
        </span>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {cat.items.map((item, ii) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.08 + ii * 0.04 }}
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            className="flex items-baseline gap-1.5 px-3.5 py-2 border cursor-default transition-all duration-200"
            style={{
              borderColor: hoveredItem === item.name ? "var(--accent)" : "var(--border)",
              backgroundColor: hoveredItem === item.name ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "var(--surface)",
            }}
          >
            <span
              className="text-sm font-semibold transition-colors duration-200"
              style={{
                color: hoveredItem === item.name ? "var(--accent)" : "var(--foreground)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              {item.name}
            </span>
            <span
              className="text-[10px] font-medium opacity-50"
              style={{ color: "var(--foreground)" }}
            >
              {item.sub}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <section id="stack" className="relative z-10 py-20 sm:py-28 px-4 sm:px-6" style={{ backgroundColor: "var(--surface)" }}>
      <div className="max-w-6xl mx-auto w-full">

        <div ref={ref} className="mb-10 sm:mb-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Technologies
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
              animate={inView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : { clipPath: "inset(100% 0 0 0)", y: 12 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Compétences
            </motion.h2>
          </div>
        </div>

        <div>
          {categories.map((cat, i) => (
            <TechRow key={cat.label} cat={cat} i={i} />
          ))}
          <div className="border-t border-[--border]" />
        </div>

      </div>
    </section>
  );
}
