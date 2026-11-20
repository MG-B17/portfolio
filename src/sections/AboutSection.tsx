import Image from "next/image";
import { aboutData as about } from "@/data/about";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function AboutSection() {

  return (
    <section
      id="about"
      className="relative border-t border-line py-[clamp(56px,9vw,120px)]"
    >
      <div className="grid grid-cols-[1.12fr_0.88fr] max-[860px]:grid-cols-1 items-center gap-[clamp(36px,6vw,76px)]">
        {/* Left column: identity pill, headline, bio, CTAs */}
        <div>
          <div className="mb-[18px] inline-flex items-center gap-[8px] rounded-full border border-white/10 bg-[var(--card-bg)] px-[12px] py-[5px] font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] rounded-full bg-signal"
            />
            {about.eyebrow}
          </div>

          <h2 className="m-0 mb-[22px] font-display text-[clamp(34px,4.6vw,58px)] font-bold leading-[1.03] tracking-[-0.035em]">
            <span className="block text-ink">{about.headlineLine1}</span>
            <span className="hl block">{about.headlineLine2}</span>
          </h2>

          <div className="mb-[30px] space-y-[14px]">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="m-0 max-w-[54ch] text-[16.5px] leading-[1.65] text-muted"
              >
                {paragraph.lead ? (
                  <>
                    <b className="font-medium text-ink">{paragraph.lead}</b>{" "}
                    {paragraph.body}
                  </>
                ) : (
                  paragraph.body
                )}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-[12px]">
            <a
              href={about.primaryCta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-[8px] rounded-[12px] border border-transparent bg-signal px-[24px] py-[14px] text-[15px] font-medium text-on-signal no-underline transition-opacity hover:opacity-90"
            >
              {about.primaryCta.label}
            </a>
          </div>
        </div>

        {/* Right column: studio editorial portrait frame */}
        <div className="relative mx-auto flex w-full max-w-[360px] items-center justify-center">
          {/* Subtle offset architectural hairline behind portrait */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 translate-x-[12px] translate-y-[12px] rounded-[26px] border border-signal/35"
          />

          <div className="relative z-[1] w-full overflow-hidden rounded-[24px] border border-white/15 bg-[var(--card-bg)] p-[8px] shadow-[0_32px_64px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px] bg-[#0d0f12]">
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="(max-width: 860px) 320px, 360px"
                className="object-cover object-[50%_18%]"
              />
              {/* Subtle bottom gradient + clean credential caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b0c0d]/90 via-[#0b0c0d]/45 to-transparent px-[16px] pt-[40px] pb-[14px]">
                <div className="inline-flex items-center gap-[8px] rounded-full border border-white/10 bg-[#0b0c0d]/75 px-[11px] py-[4px] font-mono text-[11px] text-ink/90">
                  <span
                    aria-hidden="true"
                    className="h-[6px] w-[6px] rounded-full bg-signal"
                  />
                  {about.photo.caption}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured 4-card credentials strip */}
      <div className="mt-[52px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[16px]">
        {about.facts.map((fact, idx) => (
          <SpotlightCard
            key={fact.label}
            ariaLabel={fact.label}
            staggerIndex={idx}
            className="flex flex-col justify-between rounded-[18px] border border-white/10 bg-[var(--card-bg)] p-[20px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <div className="mb-[12px] flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
              <span>{fact.label}</span>
              <span className="text-signal/80">{fact.index}</span>
            </div>
            <div>
              <div className="font-display text-[17px] font-semibold tracking-[-0.02em] text-ink">
                {fact.title}
              </div>
              <p className="mt-[5px] mb-0 text-[13px] leading-[1.45] text-muted">
                {fact.detail}
              </p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
