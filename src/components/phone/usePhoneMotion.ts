"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

export const BASE_TILT_Z = 0.075;

export interface MotionRef {
  spin: { targetIndex: number; startTime: number; swapped: boolean } | null;
  reducedMotion: boolean;
  visible: boolean;
}

export interface PhoneModelProps {
  activeScreen: number;
  onActiveScreenChange: (index: number) => void;
  onReady: () => void;
  motionRef: RefObject<MotionRef>;
}

export function usePhoneMotion(
  rootGroupRef: RefObject<THREE.Group | null>,
  pivotGroupRef: RefObject<THREE.Group | null>,
  motionRef: RefObject<MotionRef>,
  onActiveScreenChange: (index: number) => void
) {
  const scrollYRef = useRef(0);
  useEffect(() => {
    const onScroll = () => { scrollYRef.current = window.scrollY; };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const m = motionRef.current;
    const root = rootGroupRef.current;
    const pivot = pivotGroupRef.current;
    if (!root || !pivot) return;
    const now = performance.now();
    let spinAngle = 0;
    if (m.spin) {
      const p = Math.min((now - m.spin.startTime) / 1800, 1);
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      spinAngle = eased * Math.PI * 2;
      if (p >= 0.5 && !m.spin.swapped) {
        m.spin.swapped = true;
        onActiveScreenChange(m.spin.targetIndex);
      }
      if (p >= 1) m.spin = null;
    }
    const scrollProgress = Math.min(scrollYRef.current / 700, 1);
    const t = state.clock.getElapsedTime();
    pivot.rotation.y = spinAngle + (m.reducedMotion
      ? -0.28 : -0.32 + Math.sin(t * 0.65) * 0.12 - scrollProgress * 0.55);
    pivot.rotation.x = m.reducedMotion ? 0 : 0.04 + Math.cos(t * 0.55) * 0.035;
    root.position.y = m.reducedMotion ? 0 : Math.sin(t * 1.25) * 0.055;
    root.rotation.z = BASE_TILT_Z + (m.reducedMotion ? 0 : Math.sin(t * 0.85) * 0.015);
  });
}
