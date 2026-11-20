import Link from "next/link";
import { layoutData } from "@/data/layout";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-[28px]">
      <Link
        href={layoutData.brand.href}
        className="font-display text-[20px] font-bold tracking-[-0.02em] no-underline text-ink"
      >
        {layoutData.brand.text}
        <sup className="text-[10px] font-medium text-muted">
          {layoutData.brand.mark}
        </sup>
      </Link>

      <nav
        aria-label={layoutData.primaryNavAriaLabel}
        className="flex items-center gap-[clamp(16px,3vw,36px)] text-[15px]"
      >
        {layoutData.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`no-underline text-muted hover:text-ink transition-colors${
              item.hideOnMobile ? " max-[860px]:hidden" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
