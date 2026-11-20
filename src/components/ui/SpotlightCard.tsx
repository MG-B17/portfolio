"use client";

import {
  type FocusEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  staggerIndex?: number;
  focusable?: boolean;
  onActivate?: () => void;
}

export default function SpotlightCard({
  children,
  className = "",
  ariaLabel,
  staggerIndex = 0,
  focusable,
  onActivate,
}: SpotlightCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const pointerEnabledRef = useRef(true);
  const rectRef = useRef<DOMRect | null>(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const invalidate = () => { rectRef.current = null; };
    window.addEventListener("scroll", invalidate, { passive: true, capture: true });
    window.addEventListener("resize", invalidate, { passive: true });
    const observer = new ResizeObserver(invalidate);
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      window.removeEventListener("scroll", invalidate, true);
      window.removeEventListener("resize", invalidate);
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const coarseMq = window.matchMedia("(pointer: coarse)");
    const hoverNoneMq = window.matchMedia("(hover: none)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePointerEnabled = () => {
      pointerEnabledRef.current = !(
        coarseMq.matches ||
        hoverNoneMq.matches ||
        reduceMq.matches
      );
      if (!pointerEnabledRef.current && cardRef.current) {
        cardRef.current.removeAttribute("data-spot");
      }
    };

    updatePointerEnabled();
    coarseMq.addEventListener("change", updatePointerEnabled);
    hoverNoneMq.addEventListener("change", updatePointerEnabled);
    reduceMq.addEventListener("change", updatePointerEnabled);

    if (reduceMq.matches) {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => {
        cancelAnimationFrame(frame);
        coarseMq.removeEventListener("change", updatePointerEnabled);
        hoverNoneMq.removeEventListener("change", updatePointerEnabled);
        reduceMq.removeEventListener("change", updatePointerEnabled);
      };
    }

    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => {
        cancelAnimationFrame(frame);
        coarseMq.removeEventListener("change", updatePointerEnabled);
        hoverNoneMq.removeEventListener("change", updatePointerEnabled);
        reduceMq.removeEventListener("change", updatePointerEnabled);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      coarseMq.removeEventListener("change", updatePointerEnabled);
      hoverNoneMq.removeEventListener("change", updatePointerEnabled);
      reduceMq.removeEventListener("change", updatePointerEnabled);
    };
  }, []);

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!pointerEnabledRef.current || e.pointerType === "touch") return;
    const card = cardRef.current;
    if (!card) return;
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      if (!pointerEnabledRef.current) return;
      const rect = rectRef.current ?? card.getBoundingClientRect();
      rectRef.current = rect;
      card.style.setProperty("--mx", `${(pointerRef.current.x - rect.left).toFixed(1)}px`);
      card.style.setProperty("--my", `${(pointerRef.current.y - rect.top).toFixed(1)}px`);
      card.setAttribute("data-spot", "true");
    });
  };

  const handlePointerLeave = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    rectRef.current = null;
    cardRef.current?.removeAttribute("data-spot");
  };

  const handleMouseEnter = (_e: MouseEvent<HTMLElement>) => {
    onActivate?.();
  };

  const handleFocus = (_e: FocusEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (card) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${(rect.width * 0.5).toFixed(1)}px`);
      card.style.setProperty("--my", `${(rect.height * 0.5).toFixed(1)}px`);
    }
    onActivate?.();
  };

  return (
    <div ref={wrapRef} className="h-full">
      <article
        ref={cardRef}
        tabIndex={(focusable ?? Boolean(onActivate)) ? 0 : undefined}
        aria-label={ariaLabel}
        data-revealed={revealed ? "true" : "false"}
        style={{
          transitionDelay: revealed ? `${staggerIndex * 80}ms` : "0ms",
        }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => {
          rectRef.current = cardRef.current?.getBoundingClientRect() ?? null;
        }}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={handleMouseEnter}
        onFocus={handleFocus}
        className={`spotlight-card relative h-full ${className}`.trim()}
      >
        {children}
      </article>
    </div>
  );
}
