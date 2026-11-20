import type { Project } from "@/types/content";
import { workData } from "@/data/work";
import PhoneFrame from "./PhoneFrame";
import SpotlightCard from "./SpotlightCard";

interface CaseStudyProps {
  project: Project;
  index?: number;
  reverse?: boolean;
}

const PARALLAX_ZONES = [
  "tl",
  "tc",
  "tr",
  "ml",
  "mc",
  "mr",
  "bl",
  "bc",
  "br",
] as const;

export default function CaseStudy({
  project,
  index = 0,
  reverse = false,
}: CaseStudyProps) {
  const screens = project.screens.slice(0, 3);
  const count = screens.length;
  const badgeNumber = String(index + 1).padStart(2, "0");

  return (
    <div className="mt-[24px] first-of-type:mt-[40px]">
      <SpotlightCard
        ariaLabel={project.name}
        className="grid grid-cols-1 min-[861px]:grid-cols-2 items-center gap-[clamp(28px,5vw,72px)] rounded-[20px] border border-line bg-[var(--card-bg)] p-[clamp(22px,3.5vw,34px)]"
      >
        <div
          className={`flex h-full flex-col justify-between ${
            reverse ? "min-[861px]:order-2" : "min-[861px]:order-1"
          }`}
        >
          <div>
            <div className="mb-[14px] flex items-center justify-between gap-[12px]">
              <span className="font-mono text-[12px] tracking-[0.06em] text-muted">
                {project.date}
              </span>
              <span className="rounded-full border border-line px-[10px] py-[2px] font-mono text-[11px] text-muted">
                {badgeNumber}
              </span>
            </div>

            <h3 className="m-0 mb-[12px] font-display text-[clamp(26px,3vw,34px)] font-semibold tracking-[-0.025em]">
              {project.name}
            </h3>

            <p className="m-0 mb-[20px] max-w-[52ch] text-[15px] text-muted">
              {project.summary}
            </p>

            <div className="mb-[24px] flex flex-wrap gap-[8px]">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border border-line bg-bg px-[11px] py-[4px] font-mono text-[11px] font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {(project.github || project.linkedin || project.live) && (
            <div className="flex flex-wrap items-center gap-[22px] border-t border-line pt-[16px]">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="accent-link"
                >
                  {workData.githubLinkLabel}
                </a>
              )}
              {project.linkedin && (
                <a
                  href={project.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="accent-link"
                >
                  {workData.linkedinLinkLabel}
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="accent-link"
                >
                  {workData.liveLinkLabel}
                </a>
              )}
            </div>
          )}
        </div>

        <div
          className={`phone-group ${
            reverse ? "min-[861px]:order-1" : "min-[861px]:order-2"
          }`}
          data-count={count}
          aria-label={`${project.name} ${workData.screensLabel}`}
        >
          {/* CSS-only 3x3 pointer parallax grid (active only on hover:hover & pointer:fine) */}
          <div className="pg-zones" aria-hidden="true">
            {PARALLAX_ZONES.map((zone) => (
              <span key={zone} className={`pg-zone pg-zone-${zone}`} />
            ))}
          </div>

          <div className="phone-group-inner">
            {count === 0 ? (
              <PhoneFrame
                alt={`${project.name} — ${workData.emptyScreensText}`}
                emptyText={workData.emptyScreensText}
                sizes="(max-width: 860px) 180px, 232px"
              />
            ) : (
              screens.map((src, idx) => (
                <PhoneFrame
                  key={src}
                  src={src}
                  alt={
                    project.screenAlts?.[idx] ??
                    `${project.name} ${workData.screenLabel} ${idx + 1}`
                  }
                  emptyText={workData.emptyScreensText}
                  sizes={
                    count === 3
                      ? "(max-width: 480px) 108px, (max-width: 860px) 140px, 220px"
                      : "(max-width: 480px) 140px, (max-width: 860px) 170px, 232px"
                  }
                />
              ))
            )}
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}
