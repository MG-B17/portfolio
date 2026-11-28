import type { WorkData } from "@/types/content";

export const workData: WorkData = {
  heading: "Work",
  subheading: "Two recent Flutter products in depth.",
  showMoreLabel: "Show more projects",
  githubLinkLabel: "View on GitHub",
  linkedinLinkLabel: "View on LinkedIn ↗",
  liveLinkLabel: "Live preview ↗",
  demoLinkLabel: "Demo",
  demoModalCloseAriaLabel: "Close demo video",
  demoModalTitleSuffix: "Demo",
  demoVideoUnsupported: "Your browser does not support video playback.",
  emptyScreensText: "Screens coming soon",
  screensLabel: "screens",
  screenLabel: "screen",
  projectsPage: {
    title: "Projects · Mostafa Galal El Bakri",
    description: "All Flutter mobile apps and AI-backed projects built by Mostafa Galal El Bakri, newest first.",
    heading: "All projects",
    intro: "Every Flutter app and side project I have built, newest first.",
    backLabel: "← Back to home",
  },
  projects: [
  {
    slug: "daftari",
    name: "Daftari",
    date: "2026-11",
    summary:
      "Daftari (دفتري) — An Arabic-first, offline-first Flutter app for Egyptian shopkeepers to manage customer credit, track payments, and securely back up their ledgers.",
    stack: [
      "Flutter",
      "Cubit",
      "Drift (SQLite)",
      "Supabase",
      "GoRouter",
      "GetIt",
      "Clean Architecture",
      "Arabic RTL",
    ],
    github: "https://github.com/MG-B17/Daftari-App",
    demoVideo: "/assets/videos/Daftari.mp4",
    screens: [
      "/assets/screens/daftari-onboarding.jpeg",
      "/assets/screens/daftari-dashboard.jpeg",
      "/assets/screens/daftari-settings.jpeg",
    ],
    screenAlts: [
      "Daftari onboarding screen",
      "Daftari ledger dashboard screen",
      "Daftari settings screen",
    ],
    featured: true,
  },
  {
    slug: "bridge-x",
    name: "Bridge X",
    date: "2026-02",
    summary:
      "Student-to-industry career platform built in a team of 2 across 14 feature-first Clean Architecture modules with 55 integrated API endpoints. Includes Supabase Realtime chat (JWT auth, RLS policies, atomic unread counters), FCM push notifications, and 4-tab navigation with an 8-step auth-aware redirect guard.",
    stack: [
      "Flutter",
      "Supabase Realtime",
      "GoRouter",
      "Dio",
      "Cubit",
      "GetIt",
      "FCM",
    ],
    github: "https://github.com/MG-B17/Bridge_X",
    demoVideo: "/assets/videos/Bridge_X_Demo.mp4",
    screens: [
      "/assets/screens/bridge-x-1.png",
      "/assets/screens/bridge-x-2.png",
      "/assets/screens/bridge-x-3.png",
    ],
    screenAlts: [
      "Bridge X categories screen",
      "Bridge X matching screen",
      "Bridge X team chat screen",
    ],
    featured: true,
  },
  {
    slug: "stridex",
    name: "Stride X",
    date: "2025-11",
    summary:
      "Offline-first fitness tracking app using the hardware pedometer sensor with Android/iOS permission handling and user calibration (height, weight, gender, age). Structured in Clean Architecture with Sqflite storage, daily/weekly/monthly analytics, local notifications, and adaptive Light/Dark UI in a 20 MB APK.",
    stack: ["Flutter", "Cubit", "Sqflite", "Clean Architecture"],
    github: "https://github.com/MG-B17/STRIDE-X.git",
    demoVideo: "/assets/videos/Stride_X_Demo.mp4",
    screens: [
      "/assets/screens/stridex-1.jpeg",
      "/assets/screens/stridex-2.jpeg",
      "/assets/screens/stridex-3.jpeg",
    ],
    screenAlts: [
      "Stride X activity dashboard screen",
      "Stride X step tracking screen",
      "Stride X analytics screen",
    ],
  },
  {
    slug: "anomatrix",
    name: "Anomatrix",
    date: "2025-08",
    summary:
      "Flutter mobile client for a computer-vision surveillance system, integrating anomaly detection endpoints with live-feed monitoring, real-time alert screens, and video-upload flows.",
    stack: ["Flutter", "Computer Vision", "REST API", "Clean Architecture"],
    github: "https://github.com/MG-B17/anomatrix",
    demoVideo: "/assets/videos/Anomatrix_Demo.mp4",
    screens: [
      "/assets/screens/anomatrix-1.jpg",
      "/assets/screens/anomatrix-2.jpg",
      "/assets/screens/anomatrix-3.jpg",
    ],
    screenAlts: [
      "Anomatrix surveillance screen 1",
      "Anomatrix live monitoring screen",
      "Anomatrix anomaly alerts screen",
    ],
  },
  {
    slug: "meal-planner",
    name: "AI Meal Planner",
    date: "2025-04",
    summary:
      "Built end-to-end during my Cellula Technologies remote internship. Delivers Gemini-powered recipe suggestions and interactive chat using feature-based Clean Architecture (MVVM), Cubit, and Dio.",
    stack: ["Flutter", "Gemini API", "Cubit", "Dio", "MVVM"],
    github: "https://github.com/MG-B17/Meal-Planner",
    demoVideo: "/assets/videos/Meal_Planner_demo.mp4",
    screens: [
      "/assets/screens/meal-planner-1.png",
      "/assets/screens/meal-planner-2.png",
      "/assets/screens/meal-planner-3.png",
    ],
    screenAlts: [
      "AI Meal Planner home screen",
      "AI Meal Planner recipe suggestions screen",
      "AI Meal Planner Gemini chat screen",
    ],
  },
  {
    slug: "ai-weather",
    name: "AI Weather",
    date: "2025-03",
    summary:
      "Built end-to-end during my Cellula Technologies remote internship. Connects a Python Random Forest forecasting model to a Flutter client via Dio with full loading and error-state handling.",
    stack: ["Flutter", "Python", "Random Forest", "Cubit", "Dio"],
    github: "https://github.com/MG-B17/ai-weather",
    demoVideo: "/assets/videos/Ai_Weather_Demo.mp4",
    screens: [
      "/assets/screens/ai-weather-1.png",
      "/assets/screens/ai-weather-2.png",
      "/assets/screens/ai-weather-3.png",
    ],
    screenAlts: [
      "AI Weather forecast screen 1",
      "AI Weather ML prediction screen",
      "AI Weather details screen",
    ],
  },
  {
    slug: "movia",
    name: "Movia",
    date: "2024-11",
    summary:
      "Movie discovery app to browse trending titles, search by query, and view cast and release details. Powered by Bloc state management and Dio REST API integration.",
    stack: ["Flutter", "Bloc", "Dio", "REST API"],
    github: "https://github.com/MG-B17/Movia-App",
    demoVideo: "/assets/videos/Movia_Demo.mp4",
    screens: [
      "/assets/screens/movia-1.png",
      "/assets/screens/movia-2.png",
      "/assets/screens/movia-3.png",
    ],
    screenAlts: [
      "Movia trending movies screen",
      "Movia movie details screen",
      "Movia search screen",
    ],
  },
  {
    slug: "quran-app",
    name: "Muslim App",
    date: "2025-01",
    summary:
      "Quran and prayer companion app with Arabic/English translations, accurate prayer times, daily Adhkar, and audio recitations from 200+ reciters backed by offline Sqflite storage.",
    stack: ["Flutter", "Cubit", "Dio", "Sqflite"],
    github: "https://github.com/MG-B17/Quran-App",
    demoVideo: "/assets/videos/Quran_app_Demo.mp4",
    screens: [
      "/assets/screens/quran-app-1.png",
      "/assets/screens/quran-app-2.png",
      "/assets/screens/quran-app-3.png",
    ],
    screenAlts: [
      "Muslim App Quran reading screen",
      "Muslim App prayer times screen",
      "Muslim App Adhkar and reciters screen",
    ],
  },
  {
    slug: "up-to-do",
    name: "UpToDo",
    date: "2024-09",
    summary:
      "Flutter task and productivity manager for organizing daily to-dos, categories, and reminders.",
    stack: ["Flutter", "Dart"],
    demoVideo: "/assets/videos/To_Do_App_Demo.mp4",
    screens: [
      "/assets/screens/up-to-do-1.png",
      "/assets/screens/up-to-do-2.png",
      "/assets/screens/up-to-do-3.png",
    ],
    screenAlts: [
      "UpToDo screen 1",
      "UpToDo screen 2",
      "UpToDo screen 3",
    ],
  },
  {
    slug: "zoyota-ecommerce",
    name: "Zoyota E-Commerce",
    date: "2024-07",
    summary:
      "Cross-platform Flutter shopping app with product browsing, cart management, and checkout flows.",
    stack: ["Flutter", "Dart"],
    demoVideo: "/assets/videos/Zoyota_Demo.mp4",
    screens: [
      "/assets/screens/zoyota-ecommerce-1.png",
      "/assets/screens/zoyota-ecommerce-2.png",
      "/assets/screens/zoyota-ecommerce-3.png",
    ],
    screenAlts: [
      "Zoyota E-Commerce screen 1",
      "Zoyota E-Commerce screen 2",
      "Zoyota E-Commerce screen 3",
    ],
  },
  ],
};
