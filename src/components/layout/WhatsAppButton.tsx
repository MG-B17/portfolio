import { layoutData } from "@/data/layout";

export default function WhatsAppButton() {
  return (
    <a
      href={layoutData.whatsapp.href}
      target="_blank"
      rel="noreferrer"
      aria-label={layoutData.whatsapp.ariaLabel}
      className="group fixed right-[20px] bottom-[max(20px,env(safe-area-inset-bottom))] z-40 inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/15 bg-[#12151a]/90 text-signal shadow-[0_14px_32px_-8px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.12)] transition-colors hover:border-transparent hover:bg-signal hover:text-on-signal"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[24px] w-[24px] fill-current"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.49 0 .14 5.35.14 11.92c0 2.1.55 4.15 1.59 5.96L0 24l6.29-1.65a11.86 11.86 0 0 0 5.77 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.18-3.47-8.42Zm-8.46 18.33h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.85 9.85 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.91-9.9 2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
