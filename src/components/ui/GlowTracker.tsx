"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlowTracker() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 480,
        height: 480,
        borderRadius: "50%",
        background: "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
        opacity: 0.06,
        filter: "blur(50px)",
        zIndex: 1,
      }}
    />
  );
}
