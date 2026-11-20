import type { LayoutData } from "@/types/content";

export const layoutData: LayoutData = {
  name: "Mostafa Galal El Bakri",
  title: "Mostafa Galal El Bakri · Flutter Developer",
  description:
    "I build cross-platform Flutter apps from first idea to a working release. Right now: Daftari, an Arabic-first, offline-first Flutter app for Egyptian shopkeepers to manage customer credit, track payments, and securely back up their ledgers.",
  brand: { text: "MGB", mark: "®", href: "/" },
  primaryNavAriaLabel: "Primary",
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about", hideOnMobile: true },
    { label: "Skills", href: "/#skills" },
    { label: "Contact", href: "/#contact" },
  ],
  footer: {
    copyright: "© 2026 Mostafa Galal El Bakri",
    location: "Mansoura, Egypt",
  },
  whatsapp: {
    href: "https://wa.me/201033589095",
    ariaLabel: "Chat with Mostafa on WhatsApp",
  },
  statusBarTime: "9:41",
  backgroundBlueprints: {
    outlines: [
      { xRatio: 0.06, yRatio: 0.15, w: 126, h: 246, r: 26, depth: 1.0,
        phase: 0.2, kind: "phone", label: "Scaffold", meta: "60 FPS" },
      { xRatio: 0.165, yRatio: 0.36, w: 134, h: 60, r: 14, depth: 0.72,
        phase: 1.5, kind: "card", label: "BlocBuilder" },
      { xRatio: 0.855, yRatio: 0.13, w: 146, h: 72, r: 16, depth: 0.8,
        phase: 2.4, kind: "card", label: "Cubit<State>" },
      { xRatio: 0.91, yRatio: 0.52, w: 130, h: 252, r: 26, depth: 1.1,
        phase: 3.6, kind: "phone", label: "MaterialApp", meta: "iOS · Android" },
      { xRatio: 0.075, yRatio: 0.75, w: 148, h: 76, r: 16, depth: 0.75,
        phase: 4.5, kind: "card", label: "Repository" },
      { xRatio: 0.79, yRatio: 0.84, w: 116, h: 42, r: 21, depth: 0.6,
        phase: 5.3, kind: "pill", label: "Realtime" },
    ],
    links: [
      { from: 0, to: 1, speed: 0.13, offset: 0.0 },
      { from: 2, to: 3, speed: 0.11, offset: 0.35 },
      { from: 3, to: 5, speed: 0.14, offset: 0.7 },
    ],
  },
};
