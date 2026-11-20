import type { AboutData } from "@/types/content";

export const aboutData: AboutData = {
  eyebrow: "About · Mansoura, Egypt",
  headlineLine1: "Mostafa Galal El Bakri,",
  headlineLine2: "Flutter Developer.",
  heading: "About",
  primaryCta: {
    label: "View Résumé ↗",
    href: "https://drive.google.com/file/d/1kcUmRRbNwIqLuBbLgQW8nN4dTJZMlJ3E/view?usp=sharing",
  },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  photo: {
    src: "/assets/me.jpg",
    alt: "Portrait of Mostafa Galal El Bakri",
    caption: "Mansoura, Egypt · B.Sc. CS ’26",
  },
  paragraphs: [
    {
      lead: "I’m a Flutter developer and Computer Science graduate (Mansoura University, 2026).",
      body: "I architect and ship cross-platform mobile apps with Flutter and Dart using Clean Architecture, Bloc/Cubit, REST APIs, Firebase, Supabase, and SQLite.",
    },
    {
      body: "I interned remotely at Cellula Technologies (Feb–Apr 2025), delivering two AI-powered Flutter apps end-to-end, and trained in mobile development at ITI (Mansoura University, 2025–Present). I integrate AI services into mobile products and work with structured architecture rules and reviewed code.",
    },
  ],
  facts: [
    { index: "01", label: "Education", title: "Mansoura University",
      detail: "B.Sc. Computer & Information Science · 2022–2026" },
    { index: "02", label: "Experience", title: "Cellula Technologies",
      detail: "Flutter Developer Intern (Remote) · Feb–Apr 2025" },
    { index: "03", label: "Training", title: "ITI · Mansoura University",
      detail: "Mobile Development Trainee · 2025–Present" },
    { index: "04", label: "Languages", title: "Arabic & English",
      detail: "Arabic (Native) · English (B2)" },
  ],
};
