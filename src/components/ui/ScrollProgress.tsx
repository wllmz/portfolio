"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const spring = useSpring(0, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? window.scrollY / total : 0;
      setProgress(p);
      spring.set(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [spring]);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX: spring,
        background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
      }}
    />
  );
}
