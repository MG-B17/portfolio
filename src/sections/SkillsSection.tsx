"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { skillsData } from "@/data/skills";
import SpotlightCard from "@/components/ui/SpotlightCard";
import DeviceStatusBar, { StatusIcons } from "@/components/ui/DeviceStatusBar";

function BackendNodeIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-[13px] w-[13px] stroke-current fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 2L4 9.5h4l-.5 4.5L12 6.5H8L8.5 2z" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-[13px] w-[13px] stroke-current fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 8h2.5l2-4.5 3 9 2-4.5H14" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 16 16" aria-hidden="true" className="h-[13px] w-[13px] stroke-current fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5.5h10M10.5 3L13 5.5 10.5 8M13 10.5H3M5.5 8L3 10.5 5.5 13" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-[13px] w-[13px] stroke-current fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="8" cy="4" rx="5" ry="2" />
      <path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4" />
      <path d="M3 8c0 1.1 2.2 2 5 2s5-.9 5-2" />
    </svg>
  );
}

export default function SkillsSection() {
  const { heading, subheading, usedInPrefix, tiles } = skillsData;
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [statePulseKey, setStatePulseKey] = useState(0);
  const [backendPulseKey, setBackendPulseKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduce = () => {
      setReducedMotion(mq.matches);
      if (mq.matches) setInView(true);
    };
    updateReduce();
    mq.addEventListener("change", updateReduce);

    if (mq.matches) {
      return () => mq.removeEventListener("change", updateReduce);
    }

    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return () => mq.removeEventListener("change", updateReduce);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      mq.removeEventListener("change", updateReduce);
    };
  }, []);

  const triggerStatePulse = useCallback(() => {
    if (reducedMotion) return;
    setStatePulseKey((k) => k + 1);
  }, [reducedMotion]);

  const triggerBackendPulse = useCallback(() => {
    if (reducedMotion) return;
    setBackendPulseKey((k) => k + 1);
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="border-t border-line py-[clamp(56px,9vw,120px)]"
    >
      <h2 className="m-0 mb-[16px] font-display text-[clamp(34px,5vw,60px)] font-bold leading-[1.02] tracking-[-0.035em]">
        {heading}
      </h2>
      <p className="m-0 max-w-[52ch] text-muted">{subheading}</p>

      <div className="mt-[40px] grid grid-cols-12 gap-[22px]">
        {/* (a) Large Tablet card: Flutter, built in layers */}
        <div className="col-span-12 lg:col-span-7">
          <SpotlightCard
            ariaLabel={tiles.layers.area}
            staggerIndex={0}
            className="iso-tile device-card-tablet"
          >
            <span aria-hidden="true" className="device-hw-btn device-hw-btn-top" />
            <div aria-hidden="true" className="device-tablet-cam" />
            <div className="device-card-bezel">
              <div className="device-card-screen p-[clamp(20px,2.6vw,26px)]">
                <div>
                  <div className="mb-[14px] flex items-center justify-between gap-[12px] font-mono text-[10.5px] text-muted/60">
                    <span>{tiles.layers.eyebrow}</span>
                    <StatusIcons />
                  </div>
                  <h3 className="m-0 font-display text-[23px] font-semibold tracking-[-0.025em]">
                    {tiles.layers.area}
                  </h3>
                  <p className="mt-[6px] mb-0 max-w-[48ch] text-[14.5px] text-muted">
                    {tiles.layers.summary}
                  </p>
                </div>

                <div className="skill-stage-well my-[20px] grid grid-cols-1 sm:grid-cols-[205px_1fr] items-center gap-[18px] p-[18px]">
                  <div
                    className="iso-scene mx-auto flex h-[178px] w-[195px] items-center justify-center"
                    role="img"
                    aria-label={tiles.layers.diagramAriaLabel}
                  >
                    <div
                      className="iso-stack-3d"
                      data-visible={inView ? "true" : "false"}
                    >
                      <div className="iso-slab-3d iso-slab-data">
                        <span className="iso-slab-tag">{tiles.layers.layers[2].name}</span>
                      </div>
                      <div className="iso-slab-3d iso-slab-domain">
                        <span className="iso-slab-tag">{tiles.layers.layers[1].name}</span>
                      </div>
                      <div className="iso-slab-3d iso-slab-presentation">
                        <span className="iso-slab-tag">{tiles.layers.layers[0].name}</span>
                      </div>
                    </div>
                  </div>

                  <ol className="m-0 list-none space-y-[9px] p-0">
                    {tiles.layers.layers.map((layer, idx) => (
                      <li
                        key={layer.name}
                        className="skill-sub-row flex items-start gap-[10px] px-[13px] py-[10px]"
                        style={{
                          borderLeftWidth: "2.5px",
                          borderLeftColor: layer.accent ? "var(--signal)" : "rgba(242,243,238,0.14)",
                        }}
                      >
                        <span className="mt-[2px] font-mono text-[10px] text-muted">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="font-display text-[14.5px] font-semibold leading-tight text-ink">
                            {layer.name}
                          </div>
                          <div className="mt-[2px] text-[12px] text-muted">
                            {layer.detail}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className="m-0 flex items-center gap-[8px] border-t border-white/10 pt-[12px] font-mono text-[12px] text-muted">
                    <span aria-hidden="true" className="text-signal">›</span>
                    <span>
                      {usedInPrefix} {tiles.layers.usedIn}
                    </span>
                  </p>
                  <div aria-hidden="true" className="device-home-indicator" />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* (b) Compact Phone card: State management */}
        <div className="col-span-12 lg:col-span-5">
          <SpotlightCard
            ariaLabel={tiles.state.area}
            staggerIndex={1}
            onActivate={triggerStatePulse}
            className="device-card-phone"
          >
            <span aria-hidden="true" className="device-hw-btn device-hw-btn-left-1" />
            <span aria-hidden="true" className="device-hw-btn device-hw-btn-left-2" />
            <span aria-hidden="true" className="device-hw-btn device-hw-btn-right" />
            <div className="device-card-bezel">
              <div className="device-card-screen p-[clamp(18px,2.4vw,24px)]">
                <div>
                  {/* Realistic minimal phone status bar flanking the Dynamic Island */}
                  <DeviceStatusBar />

                  <div className="mb-[6px] font-mono text-[10.5px] tracking-[0.06em] text-muted/70">
                    {tiles.state.eyebrow}
                  </div>
                  <h3 className="m-0 font-display text-[23px] font-semibold tracking-[-0.025em]">
                    {tiles.state.area}
                  </h3>
                  <p className="mt-[6px] mb-0 text-[14.5px] text-muted">
                    {tiles.state.summary}
                  </p>
                </div>

                <div className="skill-stage-well my-[20px] flex flex-col gap-[16px] px-[14px] py-[22px]">
                  <div
                    className="flex flex-wrap items-center justify-center gap-[8px]"
                    role="img"
                    aria-label={tiles.state.diagramAriaLabel}
                  >
                    {tiles.state.steps.map((step, index) => (
                      <div key={step.label} className="flex items-center gap-[8px]">
                        <div
                          className={`relative flex flex-col items-center justify-center rounded-[12px] border px-[12px] py-[10px] font-mono ${
                            step.accent
                              ? "border-transparent bg-signal text-on-signal shadow-[0_0_0_4px_rgba(187,243,107,0.14)]"
                              : "border-white/10 bg-surface/80 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                          }`}
                        >
                          {statePulseKey > 0 && !reducedMotion && (
                            <span
                              key={`${statePulseKey}-${index}`}
                              aria-hidden="true"
                              className="state-pulse-ring rounded-[12px]"
                              style={{ animationDelay: `${index * 130}ms` }}
                            />
                          )}
                          <span
                            className={`relative z-[1] mb-[4px] text-[9px] leading-none ${
                              step.accent ? "text-on-signal/70" : "text-muted"
                            }`}
                          >
                            0{index + 1}
                          </span>
                          <span className="relative z-[1] text-[12px] font-medium leading-none">
                            {step.label}
                          </span>
                        </div>
                        {index < tiles.state.steps.length - 1 && (
                          <svg
                            viewBox="0 0 16 10"
                            aria-hidden="true"
                            className="h-[10px] w-[12px] text-muted/60"
                          >
                            <line x1="0" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 2" />
                            <polyline points="8.5,2.5 12,5 8.5,7.5" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Subtle Flutter Bloc/Cubit inspector bar */}
                  <div className="skill-sub-row flex items-center justify-between px-[12px] py-[8px] font-mono text-[11px] text-muted">
                    <span className="inline-flex items-center gap-[6px]">
                      <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full bg-signal" />
                      {tiles.state.inspectorLeft}
                    </span>
                    <span className="text-muted/70">{tiles.state.inspectorRight}</span>
                  </div>
                </div>

                <div>
                  <p className="m-0 flex items-center gap-[8px] border-t border-white/10 pt-[12px] font-mono text-[12px] text-muted">
                    <span aria-hidden="true" className="text-signal">›</span>
                    <span>
                      {usedInPrefix} {tiles.state.usedIn}
                    </span>
                  </p>
                  <div aria-hidden="true" className="device-home-indicator" />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* (c) Tablet card: Backend and data */}
        <div className="col-span-12 lg:col-span-6">
          <SpotlightCard
            ariaLabel={tiles.backend.area}
            staggerIndex={0}
            onActivate={triggerBackendPulse}
            className="device-card-tablet"
          >
            <span aria-hidden="true" className="device-hw-btn device-hw-btn-top" />
            <div aria-hidden="true" className="device-tablet-cam" />
            <div className="device-card-bezel">
              <div className="device-card-screen p-[clamp(20px,2.6vw,26px)]">
                <div>
                  <div className="mb-[14px] flex items-center justify-between gap-[12px] font-mono text-[10.5px] text-muted/60">
                    <span>{tiles.backend.eyebrow}</span>
                    <StatusIcons />
                  </div>
                  <h3 className="m-0 font-display text-[23px] font-semibold tracking-[-0.025em]">
                    {tiles.backend.area}
                  </h3>
                  <p className="mt-[6px] mb-0 text-[14.5px] text-muted">
                    {tiles.backend.summary}
                  </p>
                </div>

                <div
                  className="backend-diagram skill-stage-well relative my-[20px] h-[218px] w-full p-[12px]"
                  data-visible={inView ? "true" : "false"}
                  role="img"
                  aria-label={tiles.backend.diagramAriaLabel}
                >
                  <svg
                    viewBox="0 0 420 210"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <g className="backend-line backend-line-1">
                      <path d="M 210 105 C 165 105, 145 44, 96 44" fill="none" stroke="var(--line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </g>
                    <g className="backend-line backend-line-2">
                      <path d="M 210 105 C 255 105, 275 44, 324 44" fill="none" stroke="var(--line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </g>
                    <g className="backend-line backend-line-3">
                      <path d="M 210 105 C 165 105, 145 166, 96 166" fill="none" stroke="var(--line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </g>
                    <g className="backend-line backend-line-4">
                      <path d="M 210 105 C 255 105, 275 166, 324 166" fill="none" stroke="var(--line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    </g>

                    {backendPulseKey > 0 && !reducedMotion && (
                      <g key={backendPulseKey}>
                        <g className="backend-pulse-line backend-pulse-1">
                          <path d="M 210 105 C 165 105, 145 44, 96 44" fill="none" stroke="var(--signal)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </g>
                        <g className="backend-pulse-line backend-pulse-2">
                          <path d="M 210 105 C 255 105, 275 44, 324 44" fill="none" stroke="var(--signal)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </g>
                        <g className="backend-pulse-line backend-pulse-3">
                          <path d="M 210 105 C 165 105, 145 166, 96 166" fill="none" stroke="var(--signal)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </g>
                        <g className="backend-pulse-line backend-pulse-4">
                          <path d="M 210 105 C 255 105, 275 166, 324 166" fill="none" stroke="var(--signal)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        </g>
                      </g>
                    )}
                  </svg>

                  {tiles.backend.nodes.map((node, idx) => {
                    const posClass = [
                      "backend-node-tl",
                      "backend-node-tr",
                      "backend-node-bl",
                      "backend-node-br",
                    ][idx];
                    return (
                      <div key={node.label} className={`backend-node ${posClass}`}>
                        <div className="flex items-center justify-center gap-[6px]">
                          <span className="text-signal">
                            <BackendNodeIcon index={idx} />
                          </span>
                          <span className="font-display text-[13px] font-semibold leading-tight text-ink">
                            {node.label}
                          </span>
                        </div>
                        <div className="mt-[3px] font-mono text-[10px] text-muted">
                          {node.sublabel}
                        </div>
                      </div>
                    );
                  })}

                  <div className="backend-node-center">
                    <span className="font-mono text-[12px] font-semibold text-on-signal">
                      {tiles.backend.centerLabel}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="m-0 flex items-center gap-[8px] border-t border-white/10 pt-[12px] font-mono text-[12px] text-muted">
                    <span aria-hidden="true" className="text-signal">›</span>
                    <span>
                      {usedInPrefix} {tiles.backend.usedIn}
                    </span>
                  </p>
                  <div aria-hidden="true" className="device-home-indicator" />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* (d) Tablet card: AI features */}
        <div className="col-span-12 lg:col-span-6">
          <SpotlightCard
            ariaLabel={tiles.ai.area}
            staggerIndex={1}
            className="ai-tile device-card-tablet"
          >
            <span aria-hidden="true" className="device-hw-btn device-hw-btn-top" />
            <div aria-hidden="true" className="device-tablet-cam" />
            <div className="device-card-bezel">
              <div className="device-card-screen p-[clamp(20px,2.6vw,26px)]">
                <div>
                  <div className="mb-[14px] flex items-center justify-between gap-[12px] font-mono text-[10.5px] text-muted/60">
                    <span>{tiles.ai.eyebrow}</span>
                    <StatusIcons />
                  </div>
                  <h3 className="m-0 font-display text-[23px] font-semibold tracking-[-0.025em]">
                    {tiles.ai.area}
                  </h3>
                  <p className="mt-[6px] mb-0 text-[14.5px] text-muted">
                    {tiles.ai.summary}
                  </p>
                </div>

                <ul className="skill-stage-well my-[20px] list-none space-y-[8px] p-[12px]">
                  {tiles.ai.rows.map((row) => (
                    <li
                      key={row.project}
                      className="skill-sub-row flex flex-col gap-[5px] px-[14px] py-[11px]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-[8px]">
                        <span className="inline-flex items-center gap-[8px] font-display text-[15px] font-semibold text-ink">
                          <span aria-hidden="true" className="h-[5px] w-[5px] rounded-full bg-signal/85" />
                          {row.project}
                        </span>
                        <span className="ai-chip relative rounded-full border border-white/10 bg-surface/75 px-[10px] py-[3px] font-mono text-[11px] text-muted">
                          {row.tech}
                          <span aria-hidden="true" className="ai-chip-underline" />
                        </span>
                      </div>
                      <span className="pl-[13px] text-[13px] text-muted">
                        {row.outcome}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <p className="m-0 flex items-center gap-[8px] border-t border-white/10 pt-[12px] font-mono text-[12px] text-muted">
                    <span aria-hidden="true" className="text-signal">›</span>
                    <span>
                      {usedInPrefix} {tiles.ai.usedIn}
                    </span>
                  </p>
                  <div aria-hidden="true" className="device-home-indicator" />
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* (e) Wide Tablet dock: Tools */}
        <div className="col-span-12">
          <SpotlightCard
            ariaLabel={tiles.tools.area}
            staggerIndex={0}
            className="device-card-tablet"
          >
            <span aria-hidden="true" className="device-hw-btn device-hw-btn-top" />
            <div aria-hidden="true" className="device-tablet-cam" />
            <div className="device-card-bezel">
              <div className="device-card-screen gap-[14px] p-[clamp(18px,2.4vw,24px)]">
                <div className="flex flex-col gap-[14px] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-[12px]">
                    <span className="font-mono text-[10.5px] tracking-[0.06em] text-muted/65">
                      {tiles.tools.eyebrow}
                    </span>
                    <h3 className="m-0 font-display text-[20px] font-semibold tracking-[-0.02em]">
                      {tiles.tools.area}
                    </h3>
                  </div>
                  <ul className="m-0 flex list-none flex-wrap items-center gap-[8px] p-0 font-mono text-[12px] text-ink">
                    {tiles.tools.items.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-white/10 bg-bg/65 px-[14px] py-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors hover:border-signal"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>

                <div aria-hidden="true" className="device-home-indicator" />
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
