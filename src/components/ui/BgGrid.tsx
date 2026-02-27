"use client";

export default function BgGrid() {
  return (
    <>
      {/* Texture de points — très subtile */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--muted) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.05,
        }}
      />
      {/* Vignette bords */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, var(--background) 100%)",
        }}
      />
    </>
  );
}
