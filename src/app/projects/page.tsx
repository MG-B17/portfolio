import type { Metadata } from "next";
import Link from "next/link";
import CaseStudy from "@/components/ui/CaseStudy";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { workData } from "@/data/work";

export const metadata: Metadata = {
  title: workData.projectsPage.title,
  description: workData.projectsPage.description,
  openGraph: {
    title: workData.projectsPage.title,
    description: workData.projectsPage.description,
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="wrap">
      <Header />

      <main id="top" className="border-t border-line py-[clamp(48px,7vw,96px)]">
        <Link
          href="/"
          className="mb-[28px] inline-block font-mono text-[13px] text-muted no-underline hover:text-ink transition-colors"
        >
          {workData.projectsPage.backLabel}
        </Link>

        <h1 className="m-0 mb-[16px] font-display text-[clamp(40px,6vw,72px)] font-bold leading-[1.0] tracking-[-0.04em]">
          {workData.projectsPage.heading}
        </h1>
        <p className="m-0 max-w-[56ch] text-[18px] text-muted">
          {workData.projectsPage.intro}
        </p>

        <div className="mt-[48px]">
          {workData.projects.map((project, index) => (
            <CaseStudy
              key={project.slug}
              project={project}
              index={index}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
