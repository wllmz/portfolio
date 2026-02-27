"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let animFrame: number;

    const onMove = (e: MouseEvent) => {
      setDot({ x: e.clientX, y: e.clientY });
    };

    const animateRing = () => {
      setPos((prev) => ({
        x: prev.x + (dot.x - prev.x) * 0.12,
        y: prev.y + (dot.y - prev.y) * 0.12,
      }));
      animFrame = requestAnimationFrame(animateRing);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) setHovering(true);
    };
    const onHoverEnd = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) setHovering(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onHoverStart);
    window.addEventListener("mouseout", onHoverEnd);
    animFrame = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onHoverStart);
      window.removeEventListener("mouseout", onHoverEnd);
      cancelAnimationFrame(animFrame);
    };
  }, [dot]);

  return (
    <>
      {/* Dot */}
      <div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        style={{
          transform: `translate(${dot.x - 4}px, ${dot.y - 4}px)`,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "white",
          transition: "transform 0.05s",
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-[--accent]"
        style={{
          transform: `translate(${pos.x - (hovering ? 24 : 16)}px, ${pos.y - (hovering ? 24 : 16)}px)`,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: clicking ? 0.4 : 0.7,
          transition: "width 0.2s, height 0.2s, opacity 0.1s",
          boxShadow: "0 0 12px var(--accent)",
        }}
      />
    </>
  );
}
