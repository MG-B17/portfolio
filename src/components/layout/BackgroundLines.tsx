"use client";

import { useEffect, useRef } from "react";
import { layoutData } from "@/data/layout";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function parseColor(cssColor: string, fallback: RGB): RGB {
  const s = cssColor.trim();
  if (s.startsWith("#")) {
    const hex = s.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };
    }
    if (hex.length >= 6) {
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };
    }
  }
  const m = s.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (m) {
    return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]) };
  }
  return fallback;
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.quadraticCurveTo(x, y, x + rad, y);
  ctx.closePath();
}

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  len: number,
  gap: number
) {
  const ox = x - gap;
  const oy = y - gap;
  const ow = w + gap * 2;
  const oh = h + gap * 2;

  ctx.beginPath();
  // Top-left
  ctx.moveTo(ox, oy + len);
  ctx.lineTo(ox, oy);
  ctx.lineTo(ox + len, oy);
  // Top-right
  ctx.moveTo(ox + ow - len, oy);
  ctx.lineTo(ox + ow, oy);
  ctx.lineTo(ox + ow, oy + len);
  // Bottom-right
  ctx.moveTo(ox + ow, oy + oh - len);
  ctx.lineTo(ox + ow, oy + oh);
  ctx.lineTo(ox + ow - len, oy + oh);
  // Bottom-left
  ctx.moveTo(ox + len, oy + oh);
  ctx.lineTo(ox, oy + oh);
  ctx.lineTo(ox, oy + oh - len);
  ctx.stroke();
}

function computeElbowPath(
  ax: number,
  ay: number,
  bx: number,
  by: number
): { pts: Array<[number, number]>; totalLen: number } {
  const midX = ax;
  const midY = by;
  const len1 = Math.hypot(midX - ax, midY - ay);
  const len2 = Math.hypot(bx - midX, by - midY);
  return {
    pts: [
      [ax, ay],
      [midX, midY],
      [bx, by],
    ],
    totalLen: len1 + len2,
  };
}

function sampleElbow(
  pts: Array<[number, number]>,
  tNorm: number
): [number, number] {
  const [p0, p1, p2] = pts;
  const d1 = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
  const d2 = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
  const total = d1 + d2;
  if (total < 1e-3) return p0;
  const dist = Math.max(0, Math.min(1, tNorm)) * total;
  if (dist <= d1 && d1 > 0) {
    const k = dist / d1;
    return [p0[0] + (p1[0] - p0[0]) * k, p0[1] + (p1[1] - p0[1]) * k];
  }
  const k = d2 > 0 ? (dist - d1) / d2 : 0;
  return [p1[0] + (p2[0] - p1[0]) * k, p1[1] + (p2[1] - p1[1]) * k];
}

export default function BackgroundLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let ctx: CanvasRenderingContext2D | null = null;
    try {
      ctx = canvas.getContext("2d", { alpha: true });
    } catch {
      return;
    }
    if (!ctx) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerMq = window.matchMedia("(pointer: fine)");

    let reducedMotion = reduceMq.matches;
    let finePointer = finePointerMq.matches;
    let isVisible = true;
    let rafId = 0;
    let lastFrame = 0;
    let lastPointerMove = -Infinity;
    scrollYRef.current = window.scrollY;
    const onScroll = () => { scrollYRef.current = window.scrollY; };

    const styles = getComputedStyle(document.documentElement);
    const baseRgb: RGB = parseColor(
      styles.getPropertyValue("--muted"),
      { r: 139, g: 148, b: 158 }
    );
    const accentRgb: RGB = parseColor(
      styles.getPropertyValue("--signal"),
      { r: 187, g: 243, b: 107 }
    );
    const inkRgb: RGB = parseColor(
      styles.getPropertyValue("--ink"),
      { r: 242, g: 243, b: 238 }
    );

    let width = 0;
    let height = 0;

    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      if (!vw || !vh) return;
      width = vw;
      height = vh;

      const dpr = Math.min(window.devicePixelRatio || 1, vw < 640 ? 1 : 1.5);
      canvas.width = Math.max(1, Math.floor(vw * dpr));
      canvas.height = Math.max(1, Math.floor(vh * dpr));
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const pointer = {
      x: -9999,
      y: -9999,
      tx: -9999,
      ty: -9999,
      nx: 0,
      ny: 0,
      active: false,
      alpha: 0,
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!finePointer || e.pointerType === "touch") return;
      lastPointerMove = performance.now();
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      if (!pointer.active) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        pointer.active = true;
      }
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const { outlines, links } = layoutData.backgroundBlueprints;

    const drawFrame = (now: number) => {
      if (!ctx || !width || !height) return;

      const t = reducedMotion ? 0 : now * 0.00022;
      const scrollOffset = reducedMotion ? 0 : scrollYRef.current * 0.055;

      if (pointer.active && width && height) {
        pointer.x += (pointer.tx - pointer.x) * 0.09;
        pointer.y += (pointer.ty - pointer.y) * 0.09;
        pointer.nx = pointer.x / width - 0.5;
        pointer.ny = pointer.y / height - 0.5;
        pointer.alpha += (1 - pointer.alpha) * 0.1;
      } else {
        pointer.nx *= 0.94;
        pointer.ny *= 0.94;
        pointer.alpha *= 0.92;
      }

      ctx.clearRect(0, 0, width, height);

      const scale = width < 640 ? 0.68 : 1;
      const baseAlpha = 0.145;
      const radius = 290;

      // 1. Precision margin ruler ticks on far left & right edges (desktop)
      if (width >= 900) {
        const tickStep = 48;
        const tickShift = (scrollOffset * 0.6) % tickStep;
        ctx.strokeStyle = `rgba(${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b}, ${
          0.11
        })`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let y = -tickShift; y < height + tickStep; y += tickStep) {
          const major = Math.round((y + tickShift) / tickStep) % 4 === 0;
          const len = major ? 9 : 4;
          ctx.moveTo(0, y);
          ctx.lineTo(len, y);
          ctx.moveTo(width, y);
          ctx.lineTo(width - len, y);
        }
        ctx.stroke();
      }

      // 2. Cursor-revealed precision micro-dot matrix (ONLY visible near pointer)
      if (pointer.alpha > 0.02 && !reducedMotion) {
        const dotStep = 30;
        const dotRadius = 210;
        const minX = Math.max(0, Math.floor((pointer.x - dotRadius) / dotStep) * dotStep);
        const maxX = Math.min(width, Math.ceil((pointer.x + dotRadius) / dotStep) * dotStep);
        const minY = Math.max(0, Math.floor((pointer.y - dotRadius) / dotStep) * dotStep);
        const maxY = Math.min(height, Math.ceil((pointer.y + dotRadius) / dotStep) * dotStep);

        for (let x = minX; x <= maxX; x += dotStep) {
          for (let y = minY; y <= maxY; y += dotStep) {
            const dist = Math.hypot(x - pointer.x, y - pointer.y);
            if (dist >= dotRadius) continue;
            const k = 1 - dist / dotRadius;
            const a = k * k * pointer.alpha * 0.28;
            ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${a.toFixed(3)})`;
            ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
          }
        }
      }

      const boxes = outlines.map((o) => {
        const w = o.w * scale;
        const h = o.h * scale;
        const driftX = Math.sin(t * o.depth + o.phase) * 12;
        const driftY = Math.cos(t * 0.82 * o.depth + o.phase) * 16;
        const parallaxX = pointer.nx * -24 * o.depth;
        const parallaxY = pointer.ny * -18 * o.depth;

        const rawY = o.yRatio * height + driftY + parallaxY - scrollOffset * o.depth;
        const wrapSpan = height + h + 180;
        const y = ((((rawY + h + 90) % wrapSpan) + wrapSpan) % wrapSpan) - h - 90;
        const x = o.xRatio * width - w * 0.5 + driftX + parallaxX;

        const cx = x + w * 0.5;
        const cy = y + h * 0.5;
        let proximity = 0;
        if (pointer.active) {
          const dist = Math.hypot(cx - pointer.x, cy - pointer.y);
          if (dist < radius) {
            const k = 1 - dist / radius;
            proximity = k * k;
          }
        }

        return { x, y, w, h, r: o.r * scale, cx, cy, proximity, o };
      });

      // 3. Edge-to-edge widget-tree connectors + traveling lime signal packet + arrival ping
      for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const a = boxes[link.from];
        const b = boxes[link.to];
        if (Math.abs(a.cy - b.cy) > height * 0.65) continue;

        const startX = a.cx;
        const startY = a.y + a.h;
        const endX = b.cx >= a.cx ? b.x : b.x + b.w;
        const endY = b.cy;

        const { pts, totalLen } = computeElbowPath(startX, startY, endX, endY);
        const [p0, p1, p2] = pts;
        const prox = Math.max(a.proximity, b.proximity);
        const r = Math.round(baseRgb.r + (accentRgb.r - baseRgb.r) * prox);
        const g = Math.round(baseRgb.g + (accentRgb.g - baseRgb.g) * prox);
        const bCol = Math.round(baseRgb.b + (accentRgb.b - baseRgb.b) * prox);
        const alpha = baseAlpha * 0.8 + prox * 0.22;

        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${bCol}, ${alpha.toFixed(3)})`;
        ctx.setLineDash([4, 5]);
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.arcTo(p1[0], p1[1], p2[0], p2[1], 12);
        ctx.lineTo(p2[0], p2[1]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Port dots
        ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${(
          0.5 +
          prox * 0.4
        ).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(startX, startY, 2.2, 0, Math.PI * 2);
        ctx.arc(endX, endY, 2.2, 0, Math.PI * 2);
        ctx.fill();

        if (!reducedMotion && totalLen > 24) {
          const progress = ((now * 0.001 * link.speed + link.offset) % 1 + 1) % 1;
          const tailProgress = Math.max(0, progress - 0.13);
          const head = sampleElbow(pts, progress);
          const tail = sampleElbow(pts, tailProgress);

          const grad = ctx.createLinearGradient(tail[0], tail[1], head[0], head[1]);
          grad.addColorStop(0, `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0)`);
          grad.addColorStop(
            1,
            `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${
              0.78
            })`
          );

          ctx.lineWidth = 1.6;
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(tail[0], tail[1]);
          ctx.lineTo(head[0], head[1]);
          ctx.stroke();

          ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${
            0.92
          })`;
          ctx.beginPath();
          ctx.arc(head[0], head[1], 2.2, 0, Math.PI * 2);
          ctx.fill();

          // Subtle arrival ripple at destination port when packet completes
          if (progress > 0.88) {
            const p = (progress - 0.88) / 0.12;
            ctx.strokeStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${(
              (1 - p) *
              0.55
            ).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(endX, endY, 2.5 + p * 9, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // 4. Draw premium wireframe mobile & Flutter widget frames
      ctx.textBaseline = "bottom";

      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        const prox = box.proximity;
        const r = Math.round(baseRgb.r + (accentRgb.r - baseRgb.r) * prox);
        const g = Math.round(baseRgb.g + (accentRgb.g - baseRgb.g) * prox);
        const bCol = Math.round(baseRgb.b + (accentRgb.b - baseRgb.b) * prox);
        const alpha = baseAlpha + prox * 0.34;

        // Whisper-soft depth fill
        ctx.fillStyle = `rgba(${r}, ${g}, ${bCol}, ${(alpha * 0.15).toFixed(3)})`;
        drawRoundedRect(ctx, box.x, box.y, box.w, box.h, box.r);
        ctx.fill();

        // Outer hairline border
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${bCol}, ${alpha.toFixed(3)})`;
        drawRoundedRect(ctx, box.x, box.y, box.w, box.h, box.r);
        ctx.stroke();

        // Subtle studio top-edge specular highlight
        const topGrad = ctx.createLinearGradient(box.x, box.y, box.x + box.w, box.y);
        topGrad.addColorStop(0, `rgba(${inkRgb.r}, ${inkRgb.g}, ${inkRgb.b}, 0)`);
        topGrad.addColorStop(
          0.5,
          `rgba(${inkRgb.r}, ${inkRgb.g}, ${inkRgb.b}, ${(
            0.18 +
            prox * 0.2
          ).toFixed(3)})`
        );
        topGrad.addColorStop(1, `rgba(${inkRgb.r}, ${inkRgb.g}, ${inkRgb.b}, 0)`);
        ctx.strokeStyle = topGrad;
        ctx.beginPath();
        ctx.moveTo(box.x + box.r, box.y + 0.5);
        ctx.lineTo(box.x + box.w - box.r, box.y + 0.5);
        ctx.stroke();

        // Precision corner registration brackets fade in smoothly on pointer proximity
        if (prox > 0.06) {
          ctx.strokeStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${(
            prox * 0.65
          ).toFixed(3)})`;
          ctx.lineWidth = 1;
          drawCornerBrackets(ctx, box.x, box.y, box.w, box.h, 7, 5);
        }

        // Inner mobile UI blueprint details
        if (box.o.kind === "phone") {
          const pad = 5 * scale;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${bCol}, ${(alpha * 0.42).toFixed(3)})`;
          drawRoundedRect(
            ctx,
            box.x + pad,
            box.y + pad,
            box.w - pad * 2,
            box.h - pad * 2,
            Math.max(6, box.r - pad)
          );
          ctx.stroke();

          // Dynamic Island pill
          const pillW = box.w * 0.28;
          const pillH = Math.max(3.5, box.w * 0.048);
          ctx.fillStyle = `rgba(${r}, ${g}, ${bCol}, ${(alpha * 0.85).toFixed(3)})`;
          drawRoundedRect(
            ctx,
            box.x + (box.w - pillW) * 0.5,
            box.y + box.w * 0.1,
            pillW,
            pillH,
            pillH * 0.5
          );
          ctx.fill();

          // Flutter layout cards inside phone blueprint
          const innerX = box.x + box.w * 0.12;
          const innerW = box.w * 0.76;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${bCol}, ${(alpha * 0.45).toFixed(3)})`;
          drawRoundedRect(ctx, innerX, box.y + box.h * 0.22, innerW, box.h * 0.24, 9 * scale);
          ctx.stroke();
          drawRoundedRect(ctx, innerX, box.y + box.h * 0.51, innerW, box.h * 0.13, 8 * scale);
          ctx.stroke();
          drawRoundedRect(ctx, innerX, box.y + box.h * 0.68, innerW, box.h * 0.13, 8 * scale);
          ctx.stroke();

          // Micro metadata tag inside phone hero card
          if (box.o.meta && width >= 640) {
            ctx.font = `500 ${Math.round(8.5 * scale)}px ui-monospace, monospace`;
            ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${(
              0.36 +
              prox * 0.38
            ).toFixed(3)})`;
            ctx.fillText(box.o.meta, innerX + 7, box.y + box.h * 0.22 + 16 * scale);
          }

          // Home bar
          const barW = box.w * 0.34;
          ctx.fillStyle = `rgba(${r}, ${g}, ${bCol}, ${(alpha * 0.65).toFixed(3)})`;
          drawRoundedRect(
            ctx,
            box.x + (box.w - barW) * 0.5,
            box.y + box.h - 11 * scale,
            barW,
            2.5,
            2
          );
          ctx.fill();
        } else if (box.o.kind === "card") {
          const ix = box.x + 12 * scale;
          const iy = box.y + box.h * 0.38;
          ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${(
            0.48 +
            prox * 0.38
          ).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(ix + 3, iy, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(${r}, ${g}, ${bCol}, ${(alpha * 0.7).toFixed(3)})`;
          drawRoundedRect(ctx, ix + 12 * scale, iy - 2, box.w * 0.45, 4, 2);
          ctx.fill();
          ctx.fillStyle = `rgba(${r}, ${g}, ${bCol}, ${(alpha * 0.45).toFixed(3)})`;
          drawRoundedRect(ctx, ix, iy + 12 * scale, box.w * 0.66, 3.5, 2);
          ctx.fill();
        }

        // Subtle Flutter widget-inspector label above frame
        if (box.o.label && width >= 640) {
          ctx.font = `500 ${Math.round(10 * scale)}px ui-monospace, monospace`;
          const labelAlpha = 0.26 + prox * 0.46;
          ctx.fillStyle = `rgba(${r}, ${g}, ${bCol}, ${labelAlpha.toFixed(3)})`;
          ctx.fillText(box.o.label, box.x + 4, box.y - 6);
        }
      }
    };

    const startLoop = () => {
      if (rafId || reducedMotion || document.hidden || !isVisible) return;
      const tick = (now: number) => {
        if (reducedMotion || document.hidden || !isVisible) {
          rafId = 0;
          return;
        }
        const pointerMoving = pointer.active && now - lastPointerMove < 200;
        if (pointerMoving || now - lastFrame >= 1000 / 30 - 1) {
          drawFrame(now);
          lastFrame = now;
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    drawFrame(performance.now());
    if (!reducedMotion) startLoop();

    const onVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else if (!reducedMotion) startLoop();
    };

    const onReduceChange = () => {
      reducedMotion = reduceMq.matches;
      if (reducedMotion) {
        stopLoop();
        drawFrame(performance.now());
      } else {
        startLoop();
      }
    };

    const onPointerTypeChange = () => {
      finePointer = finePointerMq.matches;
      if (!finePointer) pointer.active = false;
    };

    const onResize = () => {
      resize();
      if (reducedMotion) drawFrame(performance.now());
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible && !reducedMotion) startLoop();
        else stopLoop();
      });
      io.observe(canvas);
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    reduceMq.addEventListener("change", onReduceChange);
    finePointerMq.addEventListener("change", onPointerTypeChange);

    return () => {
      stopLoop();
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      reduceMq.removeEventListener("change", onReduceChange);
      finePointerMq.removeEventListener("change", onPointerTypeChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.55]"
    />
  );
}
