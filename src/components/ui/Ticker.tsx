"use client";

import { motion } from "framer-motion";

const items = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "API REST",
  "Docker",
  "Performance",
  "UI / UX",
  "Full Stack",
  "Prisma",
  "GraphQL",
  "CI/CD",
  "AWS",
  "Accessibilité",
];

interface Props {
  bg?: string;
  text?: string;
  reverse?: boolean;
}

export default function Ticker({
  bg = "var(--foreground)",
  text = "var(--background)",
  reverse = false,
}: Props) {
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden py-3.5 select-none"
      style={{ backgroundColor: bg }}
    >
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="flex gap-0 whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xs font-semibold tracking-widest uppercase px-6 flex items-center gap-6"
            style={{ color: text }}
          >
            {item}
            <span
              style={{
                color: "var(--accent)",
                opacity: text === "var(--background)" ? 1 : 0.5,
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
