import Link from "next/link";
import CaseStudy from "@/components/ui/CaseStudy";
import { workData } from "@/data/work";

export default function WorkSection() {
  const featuredProjects = workData.projects
    .filter((project) => project.featured)
    .slice(0, 2);

  return (
    <section
      id="work"
      className="border-t border-line py-[clamp(56px,9vw,120px)]"
    >
      <h2 className="m-0 mb-[16px] font-display text-[clamp(34px,5vw,60px)] font-bold leading-[1.02] tracking-[-0.035em]">
        {workData.heading}
      </h2>
      <p className="m-0 max-w-[52ch] text-muted">{workData.subheading}</p>
      <div>
        {featuredProjects.map((project, index) => (
          <CaseStudy
            key={project.slug}
            project={project}
            index={index}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
      <div className="mt-[56px]">
        <Link href="/projects" className="btn-outline-signal">
          {workData.showMoreLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
