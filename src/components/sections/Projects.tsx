"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  href: string;
  image?: string;
  gradient?: string;
  role?: string;
  meta?: string;
  year?: string;
  impact?: string;
  stack?: string[];
};

const projects: Project[] = [
  {
    id: "api",
    title: "API Logistique",
    href: "#",
    gradient: "linear-gradient(135deg, #0d3b2e 0%, #00897b 60%, #004d40 100%)",
    role: "Backend",
    meta: "Refonte complète",
    year: "2024",
    impact: "−80% temps de réponse API",
    stack: ["Node.js", "PostgreSQL", "GraphQL", "TypeScript"],
  },
  {
    id: "alcma",
    title: "Alcma",
    href: "/alcma",
    image: "/sas.png",
    role: "Plateforme SaaS",
    meta: "Application de gestion interne",
    year: "2024",
    impact: "−3h gagnées par jour par équipe",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"],
  },
  {
    id: "portfolio",
    title: "Portfolio",
    href: "#",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    role: "Site vitrine",
    meta: "Développement web",
    year: "2024",
    impact: "100% sur mesure",
    stack: ["Next.js", "React", "Tailwind", "Framer Motion"],
  },
  {
    id: "freia",
    title: "Freïa",
    href: "/freia",
    image: "/freia.png",
    role: "E-commerce",
    meta: "Boutique en ligne mode",
    year: "2024",
    impact: "+42% taux de conversion",
    stack: ["Next.js", "Stripe", "PostgreSQL", "TypeScript"],
  },
];

const cardClassName =
  "bento-card group relative block h-full min-h-[220px] lg:min-h-[280px] p-3 sm:p-4 rounded-lg transition-all duration-200 hover:shadow-xl hover:ring-2 hover:ring-white/50 active:scale-[0.97] active:ring-2 active:ring-white/80 cursor-pointer w-full text-left";
const cardStyle = {
  backgroundColor: "var(--surface)",
};

/** Carte image avec titre — ouvre la modale au clic */
function ProjectImageCard({
  project,
  onClick,
  className = "",
}: {
  project: Project;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}) {
  const content = (
    <>
      <div className="relative h-full min-h-[180px] w-full overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: project.gradient }}
          />
        )}
        <div
          className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
          }}
        >
          <h3
            className="text-base sm:text-lg font-bold"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "white",
            }}
          >
            {project.title}
          </h3>
        </div>
      </div>
    </>
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cardClassName} ${className}`}
      style={cardStyle}
    >
      {content}
    </button>
  );
}

const modalTransition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

/** Laptop mockup — style Mike Matas / Lobe */
function LaptopMockup({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="laptop-mockup relative w-full max-w-md mx-auto"
      style={{
        padding: "20px 20px 28px",
        background: "linear-gradient(145deg, #e8e8e8 0%, #d0d0d0 100%)",
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.15)",
      }}
    >
      <div
        className="relative overflow-hidden bg-[#1a1a1a] w-full"
        style={{ aspectRatio: "16/10", borderRadius: "6px" }}
      >
        {children}
      </div>
      <div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-[70%]"
        style={{
          background: "linear-gradient(180deg, #c8c8c8 0%, #a0a0a0 100%)",
          borderRadius: "0 0 4px 4px",
        }}
      />
    </div>
  );
}

/** Modal overlay pour tous les projets — style Lobe / Mike Matas */
function ProjectModal({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  if (!project) return null;
  const team = project.stack ?? ["React", "Next.js", "Node.js", "TypeScript"];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={modalTransition}
        >
          <motion.div
            className="absolute inset-0 bg-white"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={modalTransition}
          />
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-auto bg-white p-8 sm:p-12"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.995 }}
            transition={modalTransition}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-2xl font-light hover:opacity-70 transition-opacity"
              style={{ color: "#9ca3af" }}
              aria-label="Fermer"
            >
              ×
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Colonne gauche — texte style Lobe */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="text-[#9ca3af] hover:text-[#6b7280] transition-colors"
                    aria-label="Retour"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span
                    className="w-2 h-2 block"
                    style={{ backgroundColor: "#d1d5db" }}
                  />
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "#111827",
                  }}
                >
                  {project.title}
                </h2>
                <div className="space-y-1 text-sm" style={{ color: "#6b7280" }}>
                  {project.role && <p>{project.role}</p>}
                  {project.meta && <p>{project.meta}</p>}
                  {project.year && <p>{project.year}</p>}
                </div>
                {project.impact && (
                  <p
                    className="text-base font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {project.impact}
                  </p>
                )}
                <div className="pt-4 border-t border-[#e5e7eb]">
                  <p className="text-xs mb-3" style={{ color: "#9ca3af" }}>
                    Stack technique
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {team.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1"
                        style={{ color: "#6b7280", backgroundColor: "#f3f4f6" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne droite — laptop mockup */}
              <div className="lg:col-span-7">
                <LaptopMockup>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 700px, 100vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{ background: project.gradient }}
                    />
                  )}
                </LaptopMockup>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative z-10 py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="w-full mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 p-6">
          <p
            className="text-xs font-bold tracking-[0.2em] uppercase mb-2"
            style={{ color: "var(--accent)" }}
          >
            Réalisations
          </p>
          <h2
            className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight"
            style={{
              color: "var(--foreground)",
              fontFamily: "var(--font-space-grotesk)",
            }}
          >
            Projets
          </h2>
          <p
            className="mt-2 text-sm max-w-lg"
            style={{ color: "var(--muted)" }}
          >
            Pas des maquettes. Des trucs en prod.
          </p>
        </div>

        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />

        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            <div className="lg:col-span-4">
              <ProjectImageCard
                project={projects[0]}
                onClick={() => setSelectedProject(projects[0])}
              />
            </div>
            <div className="lg:col-span-8">
              <ProjectImageCard
                project={projects[1]}
                onClick={() => setSelectedProject(projects[1])}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            <div className="lg:col-span-4">
              <ProjectImageCard
                project={projects[2]}
                onClick={() => setSelectedProject(projects[2])}
              />
            </div>
            <div className="lg:col-span-8">
              <ProjectImageCard
                project={projects[3]}
                onClick={() => setSelectedProject(projects[3])}
              />
            </div>
          </div>
        </div>

        <p className="mt-12 text-sm" style={{ color: "var(--foreground)" }}>
          <a href="#contact" className="hover:opacity-70 transition-opacity">
            Votre projet pourrait être le prochain →
          </a>
        </p>
      </div>
    </section>
  );
}
