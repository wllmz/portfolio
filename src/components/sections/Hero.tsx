"use client";

import {
  motion,
  type Variants,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ─── Two mouse-reactive wireframe cubes ─── */
type V3 = [number, number, number];
const V: V3[] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];
const E: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 0],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 4],
  [0, 4],
  [1, 5],
  [2, 6],
  [3, 7],
];
const rotX = (p: V3, a: number): V3 => [
  p[0],
  p[1] * Math.cos(a) - p[2] * Math.sin(a),
  p[1] * Math.sin(a) + p[2] * Math.cos(a),
];
const rotY = (p: V3, a: number): V3 => [
  p[0] * Math.cos(a) + p[2] * Math.sin(a),
  p[1],
  -p[0] * Math.sin(a) + p[2] * Math.cos(a),
];
const lp = (a: number, b: number, t: number) => a + (b - a) * t;

function MouseCubes() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const mouse = { x: 0.5, y: 0.5 };
    const s1 = { rx: 0.5, ry: 0.4 };
    const s2 = { rx: -0.3, ry: 0.8 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    const draw = (
      cx: number,
      cy: number,
      size: number,
      rx: number,
      ry: number,
      alpha: number,
      lw: number,
    ) => {
      const pts = V.map((v) => {
        let p: V3 = [v[0] * size, v[1] * size, v[2] * size];
        p = rotX(p, rx);
        p = rotY(p, ry);
        const z = p[2] + 600;
        const s = 600 / Math.max(z, 1);
        return [p[0] * s + cx, p[1] * s + cy] as [number, number];
      });
      const accent = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim();
      const h = accent.replace("#", "");
      const r = parseInt(h.slice(0, 2), 16),
        g = parseInt(h.slice(2, 4), 16),
        b = parseInt(h.slice(4, 6), 16);
      const rgb = isNaN(r) ? "59,130,246" : `${r},${g},${b}`;
      ctx.strokeStyle = `rgba(${rgb},${alpha})`;
      ctx.lineWidth = lw;
      for (const [a, b2] of E) {
        ctx.beginPath();
        ctx.moveTo(pts[a][0], pts[a][1]);
        ctx.lineTo(pts[b2][0], pts[b2][1]);
        ctx.stroke();
      }
    };

    let raf: number;
    const tick = () => {
      const W = c.width,
        H = c.height;
      ctx.clearRect(0, 0, W, H);

      s1.rx = lp(s1.rx, (mouse.y - 0.5) * 1.4, 0.04);
      s1.ry = lp(s1.ry, (mouse.x - 0.5) * 1.6, 0.04);
      s2.rx = lp(s2.rx, -(mouse.y - 0.5) * 1.0 + 0.3, 0.025);
      s2.ry = lp(s2.ry, -(mouse.x - 0.5) * 1.2 - 0.4, 0.025);

      const cx = W * 0.82,
        cy = H * 0.38;
      draw(cx, cy, 100, s1.rx, s1.ry, 0.6, 1.2);
      draw(cx, cy, 50, s2.rx, s2.ry, 0.35, 0.9);
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

const roles = [
  "Full Stack Developer",
  "UI/UX Enthusiast",
  "Problem Solver",
  "Open Source Lover",
];

function RotatingText() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="overflow-hidden h-6 flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-[--accent] font-semibold text-base whitespace-nowrap leading-none"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 1.8, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setDisplay(String(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, count, rounded]);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const words = [
  "applications",
  "web",
  "qui",
  "font",
  "avancer",
  "votre",
  "activité.",
];
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.6 } },
};
const wordVariant: Variants = {
  hidden: { y: "110%", opacity: 0 },
  show: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  }),
};

export default function Hero() {
  return (
    <section id="hero" className="relative z-10 overflow-x-hidden py-0 px-4 sm:px-6 min-h-screen flex flex-col justify-center">
      <MouseCubes />
      <div className="max-w-6xl mx-auto w-full pt-24 pb-16">
        <motion.div
          variants={fadeUp}
          custom={0.2}
          initial="hidden"
          animate="show"
          className="mb-10"
        >
          <span className="text-sm text-[--foreground] opacity-60 font-medium tracking-wide">
            Développeur Freelance · Full Stack
          </span>
        </motion.div>

        <div className="mb-6">
          <motion.p
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="show"
            className="text-[--foreground] opacity-60 text-lg mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Je construis des
          </motion.p>
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-x-4 gap-y-0"
          >
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.span
                  variants={wordVariant}
                  className="block text-[clamp(36px,6.5vw,84px)] font-bold leading-tight tracking-tight text-[--foreground]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {word === "activité." ? (
                    <span>
                      activité<span className="text-[--accent]">.</span>
                    </span>
                  ) : (
                    word
                  )}
                </motion.span>
              </div>
            ))}
          </motion.h1>
        </div>

        <motion.div
          variants={fadeUp}
          custom={1.4}
          initial="hidden"
          animate="show"
          className="mb-6 h-6 flex items-center"
        >
          <RotatingText />
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={1.6}
          initial="hidden"
          animate="show"
          className="text-[--foreground] opacity-70 max-w-lg leading-relaxed mb-8 text-base"
        >
          De l&apos;idée à la mise en production, je prends en charge la
          conception et le développement de vos projets web sur-mesure.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={1.8}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-4 mb-12"
        >
          <a
            href="#projects"
            className="px-6 py-3 text-sm font-bold tracking-wide border-2 transition-all duration-200 hover:opacity-80"
            style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
          >
            Voir les réalisations →
          </a>
          <a
            href="#contact"
            className="px-6 py-3 text-sm font-bold tracking-wide transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: "var(--accent)", color: "#ffffff" }}
          >
            Me contacter →
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={2.2}
          initial="hidden"
          animate="show"
          className="border-t border-[--border] pt-10 flex gap-12"
        >
          {[
            { to: 20, suffix: "+", label: "projets livrés" },
            { to: 5, suffix: "+", label: "ans d'expérience" },
            { to: 15, suffix: "+", label: "clients satisfaits" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <p
                className="text-3xl font-bold text-[--foreground] leading-none"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-xs text-[--foreground] opacity-60 whitespace-nowrap">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
