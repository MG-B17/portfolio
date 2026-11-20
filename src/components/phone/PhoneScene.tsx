"use client";

import { Component, type ReactNode, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { heroData } from "@/data/hero";
import FlagshipPhoneModel, { PHONE_H, PHONE_W } from "./FlagshipPhoneModel";
import type { MotionRef } from "./usePhoneMotion";

function CameraFitter() {
  const { get, size } = useThree();
  useEffect(() => {
    const camera = get().camera;
    if (!(camera instanceof THREE.PerspectiveCamera) || !size.width || !size.height) return;
    const aspect = size.width / size.height;
    camera.aspect = aspect;
    const k = Math.tan((camera.fov * Math.PI) / 360);
    const d1 = PHONE_H / 0.78 / (2 * k);
    const d2 = PHONE_W / 0.70 / aspect / (2 * k);
    camera.position.set(0, 0, Math.max(d1, d2));
    camera.updateProjectionMatrix();
  }, [get, size.width, size.height]);
  return null;
}

class SceneErrorBoundary extends Component<
  { onError: () => void; children: ReactNode }, { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.hasError ? null : this.props.children; }
}

export default function PhoneScene({
  onReady, onFallback,
}: { onReady: () => void; onFallback: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const motionRef = useRef<MotionRef>({
    spin: null, reducedMotion: false, visible: true,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { motionRef.current.reducedMotion = mq.matches; };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries[0]?.isIntersecting ?? true;
      motionRef.current.visible = visible;
      setIsVisible(visible);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const triggerScreenChange = useCallback((targetIndex: number) => {
    const m = motionRef.current;
    if (m.spin || targetIndex === activeScreen) return;
    if (m.reducedMotion) { setActiveScreen(targetIndex); return; }
    m.spin = { targetIndex, startTime: performance.now(), swapped: false };
  }, [activeScreen]);
  useEffect(() => {
    const interval = window.setInterval(() => {
      const m = motionRef.current;
      if (!m.visible || m.reducedMotion) return;
      triggerScreenChange((activeScreen + 1) % heroData.phoneScreens.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, [activeScreen, triggerScreenChange]);

  return (
    <SceneErrorBoundary onError={onFallback}>
      <div ref={containerRef} className="pointer-events-none absolute inset-0 z-[1]">
        <Canvas dpr={[1, 2]} frameloop={isVisible ? "always" : "never"}
          camera={{ fov: 28, near: 0.1, far: 50, position: [0, 0, 5] }}
          gl={{
            antialias: true, alpha: true, powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.18,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e: Event) => {
              e.preventDefault();
              onFallback();
            }, false);
          }}>
          <CameraFitter />
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={0.15} color="#07080a"
              scale={[24, 24, 1]} position={[0, 0, -10]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={0.2} color="#0a0c10"
              scale={[16, 16, 1]} position={[0, 0, 10]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={7.5} color="#ffffff"
              scale={[7.5, 2.2, 1]} position={[-6.5, 3.5, 4]}
              target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={5.5} color="#f2f6fb"
              scale={[1.6, 11, 1]} position={[7.5, 0.5, 3.2]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={3.0} color="#bbf36b"
              scale={[9, 1.3, 1]} position={[0, -5.5, 3]} target={[0, 0, 0]} />
            <Lightformer form="rect" intensity={4.2} color="#e9edf5"
              scale={[5.5, 5.5, 1]} position={[0, 8, -1.5]} target={[0, 0, 0]} />
            <Lightformer form="ring" intensity={2.8} color="#ffffff"
              scale={[5, 5, 1]} position={[-4, -2, -5.5]} target={[0, 0, 0]} />
          </Environment>
          <directionalLight color="#bbf36b" intensity={2.0} position={[-3.2, 2.2, -3]} />
          <directionalLight color="#ffffff" intensity={1.15} position={[3.2, 3.5, 4.2]} />
          <directionalLight color="#dbe7ff" intensity={0.45} position={[-3, -1, 3]} />
          <Suspense fallback={null}>
            <FlagshipPhoneModel activeScreen={activeScreen}
              onActiveScreenChange={setActiveScreen}
              onReady={onReady} motionRef={motionRef} />
          </Suspense>
          <ContactShadows position={[0, -1.24, 0]} opacity={0.46} scale={4.2}
            blur={2.2} far={2.8} />
        </Canvas>
      </div>
    </SceneErrorBoundary>
  );
}
