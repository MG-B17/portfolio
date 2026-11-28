import type { SkillsData } from "@/types/content";

export const skillsData: SkillsData = {
  heading: "Skills",
  subheading: "How the apps are structured, wired, and shipped.",
  usedInPrefix: "Used in",
  tiles: {
    layers: {
      id: "layers",
      eyebrow: "01 · ARCHITECTURE",
      diagramAriaLabel: "3D isometric stack of Presentation, Domain, and Data layers",
      area: "Flutter, built in layers",
      summary:
        "Feature-first Clean Architecture and MVVM keep UI, business rules, and data sources testable and independent.",
      layers: [
        {
          name: "Presentation",
          detail: "Responsive UI, RTL (Arabic/English), theming, Lottie",
          accent: true,
        },
        {
          name: "Domain",
          detail: "Use cases, SOLID principles, unit & widget testing",
        },
        {
          name: "Data",
          detail: "Dio/HTTP, Supabase (Realtime, RLS), Firebase, Sqflite",
        },
      ],
      items: ["Presentation", "Domain", "Data"],
      usedIn: "Bridge X, Stride X, AI Meal Planner, Muslim App",
    },
    state: {
      id: "state",
      eyebrow: "02 · REACTIVITY",
      diagramAriaLabel: "State flow: Event to Cubit to State to UI",
      inspectorLeft: "emit(Loaded)",
      inspectorRight: "BlocBuilder → UI",
      area: "State management",
      summary: "Predictable unidirectional state with Bloc, Cubit, Provider, and GetIt DI.",
      steps: [
        { label: "Event" },
        { label: "Cubit", accent: true },
        { label: "State" },
        { label: "UI" },
      ],
      items: ["Event", "Cubit", "State", "UI"],
      usedIn: "Bridge X, Stride X, AI Meal Planner, Movia",
    },
    backend: {
      id: "backend",
      eyebrow: "03 · DATA LAYER",
      diagramAriaLabel: "Node diagram linking Flutter App in the center to Firebase, Supabase, REST (Dio), and SQLite",
      area: "Backend and data",
      summary: "Realtime sync, RLS policies, secure token storage, caching, and offline-first data.",
      centerLabel: "Flutter App",
      nodes: [
        { label: "Firebase", sublabel: "FCM · Crashlytics" },
        { label: "Supabase", sublabel: "Realtime · RLS" },
        { label: "REST", sublabel: "Dio · HTTP" },
        { label: "SQLite", sublabel: "Sqflite · Cache" },
      ],
      items: ["Firebase", "Supabase", "REST (Dio)", "SQLite"],
      usedIn: "Bridge X, Stride X, Muslim App",
    },
    ai: {
      id: "ai",
      eyebrow: "04 · APPLIED AI",
      area: "AI features",
      summary: "AI services integrated into mobile flows and AI-assisted development with AGENT.md rules.",
      rows: [
        {
          project: "AI Meal Planner",
          tech: "Gemini API",
          outcome: "Recipe suggestions and chat built at Cellula Technologies",
        },
        {
          project: "AI Weather",
          tech: "Random Forest · Dio",
          outcome: "Forecasts served from a Python ML model with loading/error states",
        },
        {
          project: "Anomatrix",
          tech: "Computer Vision",
          outcome: "Mobile client with live-feed, alert, and video-upload screens",
        },
      ],
      items: ["Gemini API", "Random Forest (Python)", "Computer Vision"],
      usedIn: "AI Meal Planner, AI Weather, Anomatrix",
    },
    tools: {
      id: "tools",
      eyebrow: "05 · WORKFLOW",
      area: "Tools & AI Workflow",
      items: [
        "Git & GitHub",
        "CI/CD",
        "Crashlytics",
        "GoRouter",
        "GetIt",
        "Claude",
        "Cursor",
        "Antigravity",
        "OpenCode CLI",
      ],
      usedIn: "AGENT.md architecture rules & reviewed code across all 10 projects",
    },
  },
};
