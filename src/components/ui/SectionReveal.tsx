"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
}

export default function SectionReveal({
  children,
  className = "",
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const el = ref.current;
    if (!el) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div
        className="section-reveal"
        data-visible={visible ? "true" : "false"}
      >
        {children}
      </div>
    </div>
  );
}
