import { layoutData } from "@/data/layout";

export default function Footer() {
  const { footer } = layoutData;

  return (
    <footer className="flex flex-wrap justify-between gap-[16px] border-t border-line pt-[28px] pb-[48px] text-[14px] text-muted">
      <span>{footer.copyright}</span>
      <span>{footer.location}</span>
    </footer>
  );
}
