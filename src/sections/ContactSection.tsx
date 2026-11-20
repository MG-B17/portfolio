import { contactData as contact } from "@/data/contact";
import ContactForm from "@/components/ui/ContactForm";

export default function ContactSection() {

  return (
    <section
      id="contact"
      className="border-t border-line py-[clamp(56px,9vw,120px)]"
    >
      <div className="grid grid-cols-[1.05fr_0.95fr] max-[860px]:grid-cols-1 items-center gap-[clamp(36px,5.5vw,76px)]">
        <div>
          <div className="mb-[18px] inline-flex items-center gap-[8px] rounded-full border border-white/10 bg-[var(--card-bg)] px-[12px] py-[5px] font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
            <span
              aria-hidden="true"
              className="h-[6px] w-[6px] rounded-full bg-signal"
            />
            {contact.eyebrow}
          </div>

          <h2 className="m-0 mb-[16px] font-display text-[clamp(36px,5.2vw,64px)] font-bold leading-[1.02] tracking-[-0.035em]">
            {contact.heading}
          </h2>
          <p className="m-0 mb-[30px] max-w-[44ch] text-[17px] text-muted">
            {contact.subheading}
          </p>

          {/* Direct email card */}
          <a
            href={`mailto:${contact.email}`}
            className="group mb-[28px] flex items-center justify-between gap-[16px] rounded-[18px] border border-white/10 bg-[var(--card-bg)] px-[20px] py-[18px] no-underline transition-colors hover:border-signal"
          >
            <div className="min-w-0">
              <div className="mb-[4px] font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
                {contact.directEmailLabel}
              </div>
              <div className="break-all font-display text-[clamp(18px,2.2vw,24px)] font-semibold tracking-[-0.02em] text-ink">
                {contact.email}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex h-[40px] w-[40px] flex-none items-center justify-center rounded-full border border-white/10 bg-bg/60 text-[16px] text-ink transition-colors group-hover:border-transparent group-hover:bg-signal group-hover:text-on-signal"
            >
              ↗
            </span>
          </a>

          {/* Social pill links */}
          <div className="flex flex-wrap gap-[10px]">
            {contact.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-[6px] rounded-full border border-white/10 bg-[var(--card-bg)] px-[16px] py-[9px] font-mono text-[12.5px] text-ink no-underline transition-colors hover:border-signal hover:text-signal"
              >
                <span>{link.label}</span>
                <span aria-hidden="true" className="text-[11px] opacity-70">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
