"use client";

const ACCENT = "#001d6f";
const ACCENT_BG = "rgba(0,29,111,0.08)";

const SKILLS: Record<string, string[]> = {
  Programmation: [
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Next.js",
    "Vue.js",
    "Node.js",
  ],
  "Frameworks & Tools": [
    "Tailwind CSS",
    "NestJS",
    "Express.js",
    "Prisma",
    "Docker",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
  ],
  "CMS & E‑commerce": ["WordPress", "Prestashop", "Shopify"],
  Design: ["Figma", "Adobe Suite"],
  "Gestion de projet": ["Git", "Méthodes Agile", "Jira", "CI/CD"],
};

const EXPERIENCES = [
  {
    role: "Développeur Full Stack Freelance",
    company: "Alcma",
    period: "2025 – 2026",
    bullets: [
      "Conception et développement d'un logiciel ERP sur mesure.",
      "Backend pour la facturation et la gestion de projet.",
      "Front de la partie gestion de projet.",
      "Gestion avancée des rôles avec système d'invitation.",
      "Sécurisation de l'authentification (protection brute‑force, etc.).",
    ],
  },
  {
    role: "Développeur Full Stack ",
    company: "MyLizy . Alternance",
    period: "2023 – 2025",
    bullets: [
      "Création du site MyLizy de A à Z avec React et Node.js.",
      "Conception de l'interface et des parcours utilisateurs sur Figma.",
      "Conception des schémas d'architecture et de base de données.",
      "Déploiement sur un VPS avec Docker et Traefik.",
      "Mise en place des bonnes pratiques (CI/CD, monitoring, sécurité).",
    ],
  },
  {
    role: "Développeur Full Stack",
    company: "HipeKids . Alternance",
    period: "2022 – 2023",
    bullets: [
      "Maintenance et évolution des sites clients.",
      "Création de nouveaux sites WordPress et Prestashop.",
      "Développement et contribution de plugins WordPress / Prestashop.",
      "Audit technique et accompagnement des clients.",
      "Intégration en collaboration avec graphiste / webdesigner.",
    ],
  },
  {
    role: "Développeur Full Stack",
    company: "COFFEE-MARKETING · Alternance",
    period: "2021 – 2022",
    bullets: [
      "Maintenance et évolution des sites clients.",
      "Création de nouveaux sites WordPress et Prestashop.",
      "Développement et contribution de plugins WordPress / Prestashop.",
      "Audit technique et accompagnement des clients.",
      "Intégration en collaboration avec graphiste / webdesigner.",
    ],
  },
];

const FORMATIONS = [
  {
    title: "MBA Développeur Full Stack",
    school: "MyDigitalSchool Paris",
    period: "2023 – 2025",
  },
  {
    title: "Bachelor Développeur Web",
    school: "MyDigitalSchool Nice",
    period: "2022 – 2023",
  },
  {
    title: "Bachelor (bac +3)",
    school: "Sup de web · Nice",
    period: "2019 – 2022",
  },
];

const CONTACTS = [
  { icon: "✉", label: "william.martinez06500@gmail.com" },
  { icon: "📞", label: "06 26 52 21 16" },
  { icon: "🌍", label: "Paris, France" },
  { icon: "🔗", label: "wllmz.fr" },
  { icon: "⌨", label: "@wllmz — GitHub" },
];

function SectionTitle({
  light = false,
  children,
}: {
  light?: boolean;
  children: React.ReactNode;
}) {
  return (
    <h2
      className="mb-4 text-sm sm:text-base font-semibold tracking-tight"
      style={{
        color: light ? "rgba(255,255,255,0.9)" : ACCENT,
        fontFamily: "var(--font-space-grotesk)",
      }}
    >
      {children}
    </h2>
  );
}

export default function CvPage() {
  const handleExportPdf = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <main className="min-h-screen bg-[--background] flex items-start justify-center px-4 py-10 sm:py-16 print:bg-white print:p-0">
      <div
        className="w-full max-w-5xl overflow-hidden border border-slate-200 bg-white print:border-0 print:shadow-none"
        style={{ boxShadow: "0 25px 60px rgba(0,29,111,0.1)" }}
      >
        {/* ── HEADER clair ── */}
        <header className="relative px-8 sm:px-12 pt-8 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 overflow-hidden">
          {/* bande bleue fine à gauche */}
          <span
            className="absolute inset-y-5 left-0 w-[3px]"
            style={{ backgroundColor: ACCENT }}
          />

          <div className="relative z-10">
            <p
              className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2"
              style={{ color: ACCENT }}
            >
              Curriculum Vitae
            </p>
            <h1
              className="text-3xl sm:text-4xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              William Martinez
            </h1>
            <p
              className="mt-1 text-base font-semibold"
              style={{ color: ACCENT }}
            >
              Développeur Full Stack
            </p>
            <p
              className="mt-2 text-sm max-w-md leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Spécialisé en applications web modernes, de la conception Figma au
              déploiement Docker, avec un vrai focus sur la performance et
              l&apos;expérience utilisateur.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-start sm:items-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExportPdf}
              className="print:hidden mb-2 inline-flex items-center gap-2 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 border rounded-full hover:bg-[--accent] hover:text-white active:scale-95"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              ⬇ Télécharger en PDF
            </button>
            {CONTACTS.map(({ icon, label }) => (
              <p
                key={label}
                className="flex items-center gap-2 text-xs print:text-slate-500"
                style={{ color: "var(--muted)" }}
              >
                <span style={{ color: ACCENT }}>{icon}</span>
                {label}
              </p>
            ))}
          </div>
        </header>

        {/* ── BODY ── */}
        <div className="bg-white px-8 sm:px-12 py-8 sm:py-10 grid gap-10 lg:grid-cols-[2fr,1.25fr] print:grid-cols-[2fr,1.25fr]">
          {/* ── Colonne gauche : Expériences ── */}
          <div>
            <SectionTitle>Expériences</SectionTitle>
            <div className="space-y-5">
              {EXPERIENCES.map((exp, i) => (
                <article
                  key={exp.company}
                  className="relative pl-5 transition-all duration-200 hover:translate-x-1 group"
                >
                  {/* Ligne verticale */}
                  {i < EXPERIENCES.length - 1 && (
                    <span
                      className="absolute left-0 top-2 bottom-[-20px] w-[2px] transition-opacity duration-200"
                      style={{ backgroundColor: ACCENT, opacity: 0.15 }}
                    />
                  )}
                  {/* Puce */}
                  <span
                    className="absolute left-[-4px] top-[7px] h-2.5 w-2.5 transition-all duration-200 group-hover:scale-125"
                    style={{ backgroundColor: ACCENT }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-0.5">
                    <p className="text-sm font-bold text-[--foreground] transition-colors duration-200 group-hover:text-[--accent]">
                      {exp.role}
                    </p>
                    <span
                      className="shrink-0 text-[10px] font-bold tracking-[0.14em] px-2 py-0.5"
                      style={{ backgroundColor: ACCENT_BG, color: ACCENT }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p
                    className="text-xs font-semibold mb-2 transition-colors duration-200 group-hover:text-[--accent]"
                    style={{ color: "var(--muted)" }}
                  >
                    {exp.company}
                  </p>
                  <ul className="space-y-1">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0"
                          style={{ backgroundColor: ACCENT, opacity: 0.4 }}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* ── Colonne droite ── */}
          <div className="space-y-8">
            {/* Compétences */}
            <div>
              <SectionTitle>Compétences</SectionTitle>
              <div className="space-y-4">
                {Object.entries(SKILLS).map(([cat, skills]) => (
                  <div key={cat}>
                    <p
                      className="text-[10px] font-bold tracking-[0.2em] uppercase mb-1.5"
                      style={{ color: "rgba(0,29,111,0.4)" }}
                    >
                      {cat}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-[11px] font-medium border cursor-default transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm"
                          style={{
                            borderColor: "rgba(0,29,111,0.15)",
                            backgroundColor: "rgba(0,29,111,0.03)",
                            color: "var(--foreground)",
                          }}
                          onMouseEnter={(e) => {
                            (
                              e.currentTarget as HTMLElement
                            ).style.backgroundColor = ACCENT_BG;
                            (e.currentTarget as HTMLElement).style.borderColor =
                              ACCENT;
                            (e.currentTarget as HTMLElement).style.color =
                              ACCENT;
                          }}
                          onMouseLeave={(e) => {
                            (
                              e.currentTarget as HTMLElement
                            ).style.backgroundColor = "rgba(0,29,111,0.03)";
                            (e.currentTarget as HTMLElement).style.borderColor =
                              "rgba(0,29,111,0.15)";
                            (e.currentTarget as HTMLElement).style.color =
                              "var(--foreground)";
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formations */}
            <div>
              <SectionTitle>Formations</SectionTitle>
              <div className="space-y-4">
                {FORMATIONS.map((f, i) => (
                  <div
                    key={f.title}
                    className="relative pl-5 transition-all duration-200 hover:translate-x-1 group"
                  >
                    {i < FORMATIONS.length - 1 && (
                      <span
                        className="absolute left-0 top-2 bottom-[-16px] w-[2px]"
                        style={{ backgroundColor: ACCENT, opacity: 0.15 }}
                      />
                    )}
                    <span
                      className="absolute left-[-4px] top-[7px] h-2.5 w-2.5 transition-all duration-200 group-hover:scale-125"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <p className="text-sm font-bold text-[--foreground] transition-colors duration-200 group-hover:text-[--accent]">
                      {f.title}
                    </p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>
                      {f.school}
                    </p>
                    <span
                      className="inline-block mt-1 text-[10px] font-bold tracking-[0.14em] px-2 py-0.5"
                      style={{ backgroundColor: ACCENT_BG, color: ACCENT }}
                    >
                      {f.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
