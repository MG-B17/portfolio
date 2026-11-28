import type { HeroData } from "@/types/content";

export const heroData: HeroData = {
  role: "Mostafa Galal El Bakri · Flutter Developer",
  availability: "Open to roles",
  headlineLine1: "Mobile apps that solve",
  headlineHighlight: "real problems.",
  ledePrefix:
    "I architect and ship cross-platform Flutter apps from first idea to production release. Right now: ",
  ledeHighlight: "Daftari",
  ledeSuffix:
    " is under Google Play review — an Arabic-first, offline-first Flutter app that replaces a shopkeeper's paper credit notebook to manage customer credit, track payments, and securely back up their ledgers.",
  primaryCta: { label: "Explore my work ↗", href: "#work" },
  secondaryCta: { label: "Get in touch", href: "#contact" },
  stats: [
    { value: "10", label: "Flutter projects" },
    { value: "Clean Arch", label: "Bloc · Cubit · SOLID" },
    { value: "iOS & Android", label: "Cross-platform targets" },
  ],
  phoneScreen: {
    src: "/assets/screens/daftari-1.jpeg",
    alt: "Daftari ledger dashboard showing total customer credit, daily collections, and top debtors",
    label: "Ledger",
  },
  phoneScreens: [
    {
      src: "/assets/screens/daftari-1.jpeg",
      alt: "Daftari ledger dashboard showing total customer credit, daily collections, and top debtors",
      label: "Ledger",
    },
    {
      src: "/assets/screens/daftari-2.jpeg",
      alt: "Daftari customers screen listing balances, debt filters, and quick customer actions",
      label: "Customers",
    },
    {
      src: "/assets/screens/daftari.jpeg",
      alt: "Daftari settings screen with theme modes, Arabic language, and release version",
      label: "Settings",
    },
  ],
  placeholderTitle: "Daftari",
};
