"use client";

import { motion } from "framer-motion";

export default function BgShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, #4ADE80 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Large circle top-right */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-[#4ADE80]/8"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-[#4ADE80]/5"
      />

      {/* Large circle bottom-left */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full border border-[#4ADE80]/6"
      />

      {/* Glow blob top-right */}
      <motion.div
        animate={{ opacity: [0.06, 0.12, 0.06], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#4ADE80] blur-[160px]"
      />

      {/* Glow blob bottom-left */}
      <motion.div
        animate={{ opacity: [0.04, 0.09, 0.04], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#4ADE80] blur-[180px]"
      />

      {/* Diagonal lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1={`${i * 10 - 20}%`}
            y1="0%"
            x2={`${i * 10 + 20}%`}
            y2="100%"
            stroke="#4ADE80"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* Floating particles */}
      {[
        { top: "15%", left: "8%", delay: 0, dur: 6 },
        { top: "35%", left: "92%", delay: 1.5, dur: 8 },
        { top: "60%", left: "15%", delay: 3, dur: 7 },
        { top: "75%", left: "80%", delay: 0.8, dur: 9 },
        { top: "25%", left: "55%", delay: 2, dur: 5 },
        { top: "85%", left: "45%", delay: 4, dur: 7 },
      ].map((p, i) => (
        <motion.div
          key={i}
          style={{ top: p.top, left: p.left }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          className="absolute w-1 h-1 rounded-full bg-[#4ADE80]"
        />
      ))}
    </div>
  );
}
