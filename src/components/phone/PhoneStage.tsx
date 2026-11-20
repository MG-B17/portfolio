"use client";

import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import dynamic from "next/dynamic";
import { heroData } from "@/data/hero";
import PhoneFrame from "@/components/ui/PhoneFrame";

function FallbackPhone() {
  const { src, alt, label } = heroData.phoneScreen;

  return (
    <div className="hero-phone-rig relative z-[1] flex items-center justify-center">
      <div className="hero-phone-float">
        <PhoneFrame
          src={src}
          alt={alt}
          label={label}
          priority
          sizes="(max-width: 860px) 260px, 290px"
          className="hero-phone"
        />
      </div>
    </div>
  );
}

const PhoneScene = dynamic(() => import("./PhoneScene"), {
  ssr: false,
  loading: () => null,
});

interface PhoneErrorBoundaryProps {
  onError: () => void;
  fallback: ReactNode;
  children: ReactNode;
}

interface PhoneErrorBoundaryState {
  hasError: boolean;
}

class PhoneErrorBoundary extends Component<
  PhoneErrorBoundaryProps,
  PhoneErrorBoundaryState
> {
  state: PhoneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): PhoneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export default function PhoneStage() {
  const [useFallback, setUseFallback] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      if (!hasWebGLSupport()) setUseFallback(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleReady = useCallback(() => {
    setSceneReady(true);
  }, []);

  const handleFallback = useCallback(() => {
    setSceneReady(false);
    setUseFallback(true);
  }, []);

  return (
    <div className="phone-stage">
      {(!sceneReady || useFallback) && <FallbackPhone />}
      {mounted && !useFallback && (
        <PhoneErrorBoundary onError={handleFallback} fallback={null}>
          <Suspense fallback={null}>
            <PhoneScene onReady={handleReady} onFallback={handleFallback} />
          </Suspense>
        </PhoneErrorBoundary>
      )}
    </div>
  );
}
