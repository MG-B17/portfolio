"use client";

import { type CSSProperties, useState } from "react";
import Image from "next/image";
import { workData } from "@/data/work";

interface PhoneFrameProps {
  src?: string;
  alt: string;
  label?: string;
  emptyText?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export default function PhoneFrame({
  src,
  alt,
  label,
  emptyText = workData.emptyScreensText,
  sizes = "(max-width: 860px) 150px, 232px",
  priority = false,
  className = "",
}: PhoneFrameProps) {
  const [hasError, setHasError] = useState(false);
  const [screenRatio, setScreenRatio] = useState<number | null>(null);
  const showEmpty = !src || hasError;

  const frameStyle = screenRatio
    ? ({ "--screen-ratio": `${screenRatio}` } as CSSProperties)
    : undefined;

  return (
    <div
      className={`phone-frame ${className}`.trim()}
      style={frameStyle}
    >
      {/* Machined titanium side hardware buttons */}
      <span aria-hidden="true" className="phone-btn phone-btn-action" />
      <span aria-hidden="true" className="phone-btn phone-btn-vol-up" />
      <span aria-hidden="true" className="phone-btn phone-btn-vol-down" />
      <span aria-hidden="true" className="phone-btn phone-btn-power" />

      {/* Precision matte-black OLED bezel with recessed earpiece slit */}
      <div className="phone-bezel">
        <span aria-hidden="true" className="phone-earpiece" />
        <div className="phone-screen">
          {showEmpty ? (
            <div
              role="img"
              aria-label={alt}
              className="flex h-full w-full flex-col items-center justify-center gap-[10px] px-4 text-center"
            >
              <span
                aria-hidden="true"
                className="h-[6px] w-[6px] rounded-full bg-signal opacity-80"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.09em] text-muted">
                {!src ? emptyText : label ?? emptyText}
              </span>
            </div>
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover object-top"
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth && img.naturalHeight) {
                  const raw = img.naturalWidth / img.naturalHeight;
                  const clamped = Math.min(0.58, Math.max(0.44, raw));
                  setScreenRatio(Number(clamped.toFixed(4)));
                }
              }}
              onError={() => setHasError(true)}
            />
          )}

          {/* Subtle curved-glass specular reflection */}
          <div aria-hidden="true" className="phone-glass-sheen" />
        </div>
      </div>
    </div>
  );
}
