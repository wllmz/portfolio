"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  const rawProgress = useSpring(0, { stiffness: 60, damping: 20 });
  const progress = useTransform(rawProgress, (v) => Math.round(v));
  const dashOffset = useTransform(rawProgress, [0, 100], [283, 0]);

  useEffect(() => {
    rawProgress.set(100);
    const t = setTimeout(() => setDone(true), 1100);
    const t2 = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [rawProgress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--background)" }}
          exit={{ y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="relative flex items-center justify-center">
            <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
              <circle
                cx="48" cy="48" r="45"
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
              />
              <motion.circle
                cx="48" cy="48" r="45"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="283"
                style={{ strokeDashoffset: dashOffset }}
              />
            </svg>
            <motion.span
              className="absolute text-lg font-bold tabular-nums"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-space-grotesk)" }}
            >
              {progress}
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: done ? 0 : 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-6 text-xs tracking-widest uppercase"
            style={{ color: "var(--muted)" }}
          >
            Chargement
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
