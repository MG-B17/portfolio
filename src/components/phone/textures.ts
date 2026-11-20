"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { heroData } from "@/data/hero";

export function createBrushedTitaniumTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#888888";
    ctx.fillRect(0, 0, 256, 256);
    for (let x = 0; x < 256; x++) {
      const shade = 115 + Math.floor(Math.sin(x * 1.7) * 18 + ((x * 37) % 24));
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(x, 0, 1, 256);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  tex.needsUpdate = true;
  return tex;
}

function createPlaceholderTexture(label: string, flipY: boolean): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 540;
  canvas.height = 1120;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, "#12161c");
    bgGrad.addColorStop(1, "#090b0e");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#bbf36b";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2 - 42, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f2f3ee";
    ctx.font = "600 36px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(heroData.placeholderTitle, canvas.width / 2, canvas.height / 2 + 6);
    ctx.fillStyle = "#8b949e";
    ctx.font = "500 22px ui-monospace, monospace";
    ctx.fillText(label.toUpperCase(), canvas.width / 2, canvas.height / 2 + 52);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.flipY = flipY;
  tex.needsUpdate = true;
  return tex;
}

function fitTextureCoverTop(texture: THREE.Texture, screenAspect: number): void {
  const image = texture.image as { width?: number; height?: number } | undefined;
  if (!image?.width || !image?.height || screenAspect <= 0) return;
  const imageAspect = image.width / image.height;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  if (imageAspect > screenAspect) {
    const repeatX = screenAspect / imageAspect;
    texture.repeat.set(repeatX, 1);
    texture.offset.set((1 - repeatX) / 2, 0);
  } else {
    const repeatY = imageAspect / screenAspect;
    texture.repeat.set(1, repeatY);
    texture.offset.set(0, texture.flipY ? 1 - repeatY : 0);
  }
  texture.needsUpdate = true;
}

export function useScreenTextures(
  screenAspect: number,
  activeScreen: number,
  screenMatRef: RefObject<THREE.MeshBasicMaterial | null>,
  flipY: boolean
) {
  const texturesRef = useRef<THREE.Texture[]>([]);
  const activeScreenRef = useRef(activeScreen);

  useEffect(() => {
    activeScreenRef.current = activeScreen;
    const mat = screenMatRef.current;
    const tex = texturesRef.current[activeScreen];
    if (mat && tex) {
      mat.map = tex;
      mat.needsUpdate = true;
    }
  }, [activeScreen, screenMatRef]);

  useEffect(() => {
    let disposed = false;
    const loader = new THREE.TextureLoader();
    texturesRef.current = heroData.phoneScreens.map((screen) =>
      createPlaceholderTexture(screen.label, flipY)
    );
    if (screenMatRef.current) {
      screenMatRef.current.map = texturesRef.current[activeScreenRef.current] ?? null;
      screenMatRef.current.needsUpdate = true;
    }
    heroData.phoneScreens.forEach((screen, idx) => {
      loader.load(screen.src, (loaded) => {
        if (disposed) {
          loaded.dispose();
          return;
        }
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.flipY = flipY;
        loaded.anisotropy = 8;
        fitTextureCoverTop(loaded, screenAspect);
        const prev = texturesRef.current[idx];
        texturesRef.current[idx] = loaded;
        prev?.dispose();
        if (screenMatRef.current && idx === activeScreenRef.current) {
          screenMatRef.current.map = loaded;
          screenMatRef.current.needsUpdate = true;
        }
      }, undefined, () => {
        // Keep the placeholder if a screenshot cannot load.
      });
    });
    return () => {
      disposed = true;
      texturesRef.current.forEach((tex) => tex.dispose());
      texturesRef.current = [];
    };
  }, [screenAspect, flipY, screenMatRef]);
}
