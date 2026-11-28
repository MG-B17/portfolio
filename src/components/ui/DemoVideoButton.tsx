"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { workData } from "@/data/work";

interface DemoVideoButtonProps {
  src: string;
  projectName: string;
}

export default function DemoVideoButton({
  src,
  projectName,
}: DemoVideoButtonProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const modalTitle = `${projectName} · ${workData.demoModalTitleSuffix}`;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={modalTitle}
        className="inline-flex h-[38px] cursor-pointer items-center gap-[8px] rounded-full border border-white/15 bg-bg/60 px-[14px] font-mono text-[12.5px] font-medium text-ink transition-colors hover:border-signal hover:text-signal"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-[16px] w-[16px] fill-none stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2.5" y="6" width="13.5" height="12" rx="2.5" />
          <path d="M16 10l5.5-3v10L16 14v-4z" />
        </svg>
        <span>{workData.demoLinkLabel}</span>
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={modalTitle}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-[clamp(16px,4vw,32px)] backdrop-blur-sm"
          >
            <div className="relative flex max-h-[90vh] w-full max-w-[820px] flex-col overflow-hidden rounded-[24px] border border-white/15 bg-[#12151a] p-[16px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.9)]">
              <div className="mb-[12px] flex items-center justify-between gap-[12px] border-b border-white/10 pb-[12px]">
                <span className="font-display text-[16px] font-semibold tracking-[-0.02em] text-ink">
                  {modalTitle}
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label={workData.demoModalCloseAriaLabel}
                  className="inline-flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-white/10 bg-bg/70 text-ink transition-colors hover:border-signal hover:text-signal"
                >
                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="h-[14px] w-[14px] stroke-current"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                  >
                    <path d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-center overflow-hidden rounded-[16px] bg-black">
                <video
                  src={src}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="max-h-[75vh] w-auto max-w-full"
                >
                  {workData.demoVideoUnsupported}
                </video>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
