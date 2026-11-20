import { heroData as hero } from "@/data/hero";
import PhoneStage from "@/components/phone/PhoneStage";

export default function HeroSection() {

  return (
    <div className="relative grid grid-cols-[1.08fr_0.92fr] max-[860px]:grid-cols-1 items-center gap-[clamp(24px,4vw,48px)] pt-[clamp(20px,4vw,52px)] pb-[clamp(44px,6vw,72px)]">
      <div>
        {/* Executive identity & availability pill */}
        <div className="inline-flex flex-wrap items-center gap-[10px] rounded-full border border-white/10 bg-[var(--card-bg)] px-[14px] py-[6px] font-mono text-[11.5px] font-medium uppercase tracking-[0.07em] text-muted">
          <span
            aria-hidden="true"
            className="h-[7px] w-[7px] rounded-full bg-signal shadow-[0_0_0_3px_rgba(187,243,107,0.18)]"
          />
          <span className="text-ink/90">{hero.role}</span>
        </div>

        <h1 className="font-display mt-[24px] mb-[22px] text-[clamp(40px,5.5vw,74px)] font-bold leading-[1.02] tracking-[-0.04em]">
          <span className="block">{hero.headlineLine1}</span>
          <span className="hl block">{hero.headlineHighlight}</span>
        </h1>

        <p className="m-0 mb-[32px] max-w-[48ch] text-[18px] leading-[1.6] text-muted">
          {hero.ledePrefix}
          <b className="font-medium text-ink">{hero.ledeHighlight}</b>
          {hero.ledeSuffix}
        </p>

        <div className="flex flex-wrap items-center gap-[12px]">
          <a
            href={hero.primaryCta.href}
            className="inline-flex items-center gap-[8px] rounded-[12px] border border-transparent bg-signal px-[24px] py-[14px] text-[15px] font-medium text-on-signal no-underline transition-opacity hover:opacity-90"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-[8px] rounded-[12px] border border-white/15 bg-[var(--card-bg)] px-[24px] py-[14px] text-[15px] font-medium text-ink no-underline transition-colors hover:border-signal hover:text-signal"
          >
            {hero.secondaryCta.label}
          </a>
        </div>

        {/* Clean 3-column architectural metrics strip */}
        <div className="mt-[44px] grid max-w-[520px] grid-cols-3 max-[480px]:grid-cols-1 gap-[18px] border-t border-white/10 pt-[24px]">
          {hero.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={
                idx > 0
                  ? "min-[481px]:border-l min-[481px]:border-white/10 min-[481px]:pl-[18px]"
                  : ""
              }
            >
              <div className="font-display text-[19px] font-semibold tracking-[-0.02em] text-ink">
                {stat.value}
              </div>
              <span className="mt-[3px] block font-mono text-[11.5px] text-muted">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <PhoneStage />
    </div>
  );
}
