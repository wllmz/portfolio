"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    const apply = () => {
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      setDark(next);
    };

    if (!document.startViewTransition) {
      apply();
      return;
    }

    document.documentElement.style.setProperty("--vt-cx", `${cx}px`);
    document.documentElement.style.setProperty("--vt-cy", `${cy}px`);
    document.startViewTransition(apply);
  };

  return (
    <motion.button
      onClick={toggle}
      whileTap={{ scale: 0.88 }}
      aria-label="Changer le thème"
      className="w-9 h-9 rounded-full border border-[--border] flex items-center justify-center text-[--muted] hover:text-[--foreground] hover:border-[--accent] transition-colors duration-200"
    >
      <motion.span
        key={dark ? "moon" : "sun"}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="text-base leading-none"
      >
        {dark ? "☀" : "☾"}
      </motion.span>
    </motion.button>
  );
}
