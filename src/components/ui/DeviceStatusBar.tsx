import { layoutData } from "@/data/layout";

export function StatusIcons() {
  return (
    <span aria-hidden="true" className="inline-flex items-center gap-[5px] text-muted/60">
      <svg viewBox="0 0 14 10" className="h-[9px] w-[12px] fill-current">
        <rect x="0" y="6" width="2" height="4" rx="0.6" />
        <rect x="3.5" y="4" width="2" height="6" rx="0.6" />
        <rect x="7" y="2" width="2" height="8" rx="0.6" />
        <rect x="10.5" y="0" width="2" height="10" rx="0.6" />
      </svg>
      <svg viewBox="0 0 20 10" className="h-[9px] w-[18px]">
        <rect x="0.75" y="0.75" width="15.5" height="8.5" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="2.5" y="2.5" width="11" height="5" rx="1" fill="currentColor" />
        <rect x="17.5" y="3" width="1.8" height="4" rx="0.8" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function DeviceStatusBar() {
  return (
    <div aria-hidden="true" className="mb-[18px] flex items-center justify-between gap-[8px]">
      <span className="font-mono text-[10.5px] font-medium text-muted/65">{layoutData.statusBarTime}</span>
      <div className="device-phone-island" />
      <StatusIcons />
    </div>
  );
}
