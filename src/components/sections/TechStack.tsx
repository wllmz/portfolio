"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const categories = [
  {
    label: "Frontend",
    items: [
      { name: "React",        sub: "UI Library" },
      { name: "Next.js",      sub: "Framework"  },
      { name: "TypeScript",   sub: "Language"   },
      { name: "Tailwind CSS", sub: "Styling"    },
      { name: "Framer Motion",sub: "Animation"  },
      { name: "Figma",        sub: "Design"     },
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
      { name: "Docker",          sub: "Container" },
      { name: "GitHub Actions",  sub: "CI/CD"     },
      { name: "Vercel",          sub: "Deploy"    },
      { name: "AWS",             sub: "Cloud"     },
      { name: "Linux",           sub: "OS"        },
      { name: "Nginx",           sub: "Server"    },
    ],
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section id="stack" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">

        <div ref={ref} className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "var(--accent)" }}
          >
            Technologies
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ clipPath: "inset(100% 0 0 0)", y: 12 }}
              animate={inView ? { clipPath: "inset(0% 0 0 0)", y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-6xl font-bold tracking-tight"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
            >
              Stack
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + ci * 0.1 }}
              className="grid grid-cols-4 md:grid-cols-7 gap-3"
            >
              {/* Category label cell */}
              <div
                className="col-span-1 rounded-xl p-4 flex items-center justify-center text-center"
                style={{ backgroundColor: "var(--accent)" }}
              >
                <p
                  className="text-xs font-bold tracking-widest uppercase leading-tight"
                  style={{ color: "#fff" }}
                >
                  {cat.label}
                </p>
              </div>

              {/* Tech cells */}
              {cat.items.map((item, ii) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: 0.2 + ci * 0.1 + ii * 0.05 }}
                  className="col-span-1 group relative border rounded-xl p-4 flex flex-col justify-between cursor-default transition-all duration-200"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--surface)",
                    minHeight: "88px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--accent)";
                    el.style.backgroundColor = "var(--card)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.backgroundColor = "var(--surface)";
                  }}
                >
                  <span className="text-[10px] font-medium" style={{ color: "var(--muted)" }}>
                    {item.sub}
                  </span>
                  <p
                    className="text-sm font-bold leading-tight group-hover:text-[--accent] transition-colors duration-200"
                    style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {item.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
