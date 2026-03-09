"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Project = {
  id: string;
  title: string;
  href: string;
  image?: string;
  images?: string[];
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
    images: ["/sas.png"],
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
    images: ["/freia.png"],
    role: "E-commerce",
    meta: "Boutique en ligne mode",
    year: "2024",
    impact: "+42% taux de conversion",
    stack: ["Next.js", "Stripe", "PostgreSQL", "TypeScript"],
  },
];

/** Timeline horizontale — un projet = un bloc avec année, titre, description */
function TimelineCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex-shrink-0 w-[280px] sm:w-[340px] text-left border-0 bg-transparent p-0 outline-none cursor-pointer"
    >
      <div className="flex flex-col gap-4 relative pt-2">
        {/* Point sur la ligne (la ligne est dans le parent) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125 z-10"
          style={{ backgroundColor: "var(--accent)" }}
        />

        {/* Année */}
        <span
          className="text-xs font-bold tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          {project.year}
        </span>

        {/* Image miniature */}
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="340px"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: project.gradient }}
            />
          )}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Texte */}
        <div>
          <h3
            className="text-lg font-bold mb-1"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "var(--foreground)",
            }}
          >
            {project.title}
          </h3>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {project.meta}
          </p>
          {project.impact && (
            <p
              className="text-sm font-semibold mt-2"
              style={{ color: "var(--accent)" }}
            >
              {project.impact}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

const backdropTransition = {
  duration: 0.35,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};
const modalZoomTransition = {
  type: "spring" as const,
  stiffness: 150,
  damping: 25,
};

/** Laptop mockup — taille agrandie pour la popup */
function LaptopMockup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`laptop-mockup relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] mx-auto ${className}`}
      style={{
        padding: "14px 14px 22px",
        background: "linear-gradient(145deg, #e8e8e8 0%, #d0d0d0 100%)",
        boxShadow: "0 24px 48px -12px rgba(0,0,0,0.18)",
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

type CarouselSlide = { type: "mockup"; src: string } | { type: "full"; src: string };

/** Carousel images — clic pour alterner mockup/vue plein écran */
function PopupCarousel({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const hasGradient = !project.image && !project.images?.length && project.gradient;

  const slides: CarouselSlide[] = hasGradient
    ? []
    : (project.images?.length ? project.images : project.image ? [project.image] : []).flatMap(
        (src) =>
          [
            { type: "mockup" as const, src },
            { type: "full" as const, src },
          ] as CarouselSlide[]
      );

  const [index, setIndex] = useState(0);
  const hasMultipleViews = slides.length > 1;

  if (hasGradient) {
    return (
      <div className={className}>
        <LaptopMockup>
          <div
            className="absolute inset-0"
            style={{ background: project.gradient }}
          />
        </LaptopMockup>
      </div>
    );
  }

  if (slides.length === 0) return null;

  const slide = slides[index];

  return (
    <div
      className={`overflow-hidden ${className}`}
      onClick={() => hasMultipleViews && setIndex((i) => (i + 1) % slides.length)}
      role={hasMultipleViews ? "button" : undefined}
      tabIndex={hasMultipleViews ? 0 : undefined}
      onKeyDown={(e) => {
        if (hasMultipleViews && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setIndex((i) => (i + 1) % slides.length);
        }
      }}
      style={{
        cursor: hasMultipleViews ? "pointer" : "default",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {slide.type === "mockup" ? (
            <LaptopMockup>
              <Image
                src={slide.src}
                alt={`${project.title} - capture ${index + 1}`}
                fill
                draggable={false}
                className="object-cover object-top"
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 320px"
              />
            </LaptopMockup>
          ) : (
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1a1a1a]">
              <Image
                src={slide.src}
                alt={`${project.title} - vue ${index + 1}`}
                fill
                draggable={false}
                className="object-cover object-top"
                sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 320px"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Modal projet — une popup par projet */
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-white"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
        >
          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden flex flex-col bg-white p-4 sm:p-6 lg:p-8 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={modalZoomTransition}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 lg:-top-3 lg:-right-3 w-10 h-10 flex items-center justify-center rounded-full text-gray-500 z-20"
              aria-label="Fermer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 overflow-hidden pt-2">
              <div className="lg:col-span-5 space-y-3 flex-shrink-0">
                <h2
                  className="text-xl sm:text-2xl font-bold"
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
                <div className="pt-2 border-t border-[#e5e7eb]">
                  <p className="text-xs mb-1.5" style={{ color: "#9ca3af" }}>
                    Stack technique
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {team.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1"
                        style={{
                          color: "#6b7280",
                          backgroundColor: "#f3f4f6",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex items-center justify-center flex-shrink-0 min-w-0">
                <PopupCarousel project={project} className="w-full" />
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

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative z-10 py-20 sm:py-28 px-4 sm:px-6"
    >
      <div className="w-full mx-auto max-w-6xl">
        <div className="mb-12">
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
            Chronologie de mes réalisations.
          </p>
        </div>

        <ProjectModal
          isOpen={selectedProject !== null}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />

        <div className="overflow-x-auto projects-carousel -mx-4 px-4">
          <div className="relative flex gap-12 sm:gap-16 min-w-max py-8">
            {/* Ligne continue de la timeline */}
            <div
              className="absolute top-2 left-0 right-0 h-px min-w-full"
              style={{ backgroundColor: "var(--muted)", opacity: 0.5 }}
            />
            {projects.map((project) => (
              <TimelineCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm" style={{ color: "var(--foreground)" }}>
            <a href="#contact" className="hover:opacity-70 transition-opacity">
              Votre projet pourrait être le prochain →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
