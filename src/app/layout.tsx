import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono, Inter } from "next/font/google";
import BackgroundLines from "@/components/layout/BackgroundLines";
import ScrollProgress from "@/components/layout/ScrollProgress";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { layoutData } from "@/data/layout";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: layoutData.title,
  description: layoutData.description,
  openGraph: {
    title: layoutData.title,
    description: layoutData.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geist.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="overflow-x-clip bg-bg text-ink font-body antialiased">
        <ScrollProgress />
        <BackgroundLines />
        <div className="relative z-[1]">{children}</div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
