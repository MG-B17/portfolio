"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createBrushedTitaniumTexture, useScreenTextures } from "./textures";
import { usePhoneMotion, type PhoneModelProps } from "./usePhoneMotion";

export const PHONE_W = 1;
export const PHONE_H = 2.08;
const PHONE_D = 0.105;
const PHONE_R = 0.165;

function createRoundedRectShape(w: number, h: number, r: number): THREE.Shape {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

export default function FlagshipPhoneModel({
  activeScreen, onActiveScreenChange, onReady, motionRef,
}: PhoneModelProps) {
  const rootGroupRef = useRef<THREE.Group>(null);
  const pivotGroupRef = useRef<THREE.Group>(null);
  const screenMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const sw = PHONE_W - 0.08;
  const sh = PHONE_H - 0.08;

  const built = useMemo(() => {
    const bd = PHONE_D - 0.036;
    const brushedTex = createBrushedTitaniumTexture();
    const bodyGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(PHONE_W - 0.036, PHONE_H - 0.036, PHONE_R - 0.018),
      { depth: bd, bevelEnabled: true, bevelThickness: 0.018, bevelSize: 0.018,
        bevelSegments: 14, curveSegments: 36 }
    );
    bodyGeo.translate(0, 0, -bd / 2);
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x626873, metalness: 1, roughness: 0.24, roughnessMap: brushedTex,
      bumpMap: brushedTex, bumpScale: 0.003, clearcoat: 0.55,
      clearcoatRoughness: 0.16, envMapIntensity: 2.4,
    });
    const backGlassGeo = new THREE.ShapeGeometry(
      createRoundedRectShape(PHONE_W - 0.054, PHONE_H - 0.054, PHONE_R - 0.024), 36
    );
    const backGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x1b1f25, metalness: 0.22, roughness: 0.34, clearcoat: 0.65,
      clearcoatRoughness: 0.16, envMapIntensity: 1.5,
    });
    const bezelGeo = new THREE.ShapeGeometry(
      createRoundedRectShape(PHONE_W - 0.044, PHONE_H - 0.044, PHONE_R - 0.02), 36
    );
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x040506, metalness: 0.15, roughness: 0.18,
    });
    const screenGeo = new THREE.ShapeGeometry(
      createRoundedRectShape(sw, sh, PHONE_R - 0.038), 36
    );
    const pos = screenGeo.attributes.position;
    const uvs: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      uvs.push(pos.getX(i) / sw + 0.5, pos.getY(i) / sh + 0.5);
    }
    screenGeo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    const glassCoverMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transparent: true, opacity: 0.065, roughness: 0.035,
      metalness: 0.06, clearcoat: 1, clearcoatRoughness: 0.04,
      reflectivity: 1, depthWrite: false, envMapIntensity: 2.2,
    });
    const islandGeo = new THREE.ShapeGeometry(createRoundedRectShape(0.245, 0.066, 0.033), 24);
    const islandMat = new THREE.MeshBasicMaterial({ color: 0x040506 });
    const frontLensGeo = new THREE.CircleGeometry(0.017, 24);
    const frontLensMat = new THREE.MeshPhysicalMaterial({
      color: 0x182b4d, metalness: 0.65, roughness: 0.08, clearcoat: 1,
    });
    const speakerMat = new THREE.MeshStandardMaterial({
      color: 0x16191d, roughness: 0.6, metalness: 0.3,
    });
    const bumpGeo = new THREE.ExtrudeGeometry(createRoundedRectShape(0.49, 0.51, 0.125), {
      depth: 0.026, bevelEnabled: true, bevelThickness: 0.009, bevelSize: 0.009,
      bevelSegments: 8, curveSegments: 24,
    });
    const bumpMat = new THREE.MeshPhysicalMaterial({
      color: 0x20252c, metalness: 0.72, roughness: 0.14, clearcoat: 1,
      clearcoatRoughness: 0.08, envMapIntensity: 1.9,
    });
    const ringGeo = new THREE.TorusGeometry(0.089, 0.013, 20, 48);
    const housingGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.028, 40);
    const lensGlassGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.012, 40);
    const pupilGeo = new THREE.CircleGeometry(0.032, 28);
    const coatRingGeo = new THREE.RingGeometry(0.036, 0.048, 32);
    const lensRingMat = new THREE.MeshPhysicalMaterial({
      color: 0x676e79, metalness: 1, roughness: 0.14, clearcoat: 0.6, envMapIntensity: 2.2,
    });
    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070c, metalness: 0.12, roughness: 0.03, clearcoat: 1,
      clearcoatRoughness: 0.03, reflectivity: 1, envMapIntensity: 2.6,
    });
    const pupilMat = new THREE.MeshPhysicalMaterial({
      color: 0x162a4f, metalness: 0.75, roughness: 0.08, clearcoat: 1,
    });
    const coatRingMat = new THREE.MeshBasicMaterial({
      color: 0x2a4575, transparent: true, opacity: 0.45, side: THREE.DoubleSide,
    });
    const flashGeo = new THREE.CircleGeometry(0.031, 24);
    const flashMat = new THREE.MeshStandardMaterial({
      color: 0xf7efd8, roughness: 0.22, metalness: 0.12,
    });
    const lidarGeo = new THREE.CircleGeometry(0.031, 24);
    const lidarMat = new THREE.MeshStandardMaterial({
      color: 0x07090c, roughness: 0.1, metalness: 0.45,
    });
    const ledGeo = new THREE.CircleGeometry(0.013, 20);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0xbbf36b });
    const antennaMat = new THREE.MeshStandardMaterial({
      color: 0x262a30, roughness: 0.55, metalness: 0.2,
    });
    const usbMat = new THREE.MeshStandardMaterial({
      color: 0x090b0d, roughness: 0.6, metalness: 0.5,
    });
    return {
      brushedTex, bodyGeo, titaniumMat, backGlassGeo, backGlassMat, bezelGeo, bezelMat,
      screenGeo, screenMat, glassCoverMat, islandGeo, islandMat, frontLensGeo, frontLensMat,
      speakerMat, bumpGeo, bumpMat, ringGeo, housingGeo, lensGlassGeo, pupilGeo, coatRingGeo,
      lensRingMat, lensGlassMat, pupilMat, coatRingMat, flashGeo, flashMat, lidarGeo,
      lidarMat, ledGeo, ledMat, antennaMat, usbMat,
    };
  }, [sw, sh]);

  useEffect(() => {
    screenMatRef.current = built.screenMat;
  }, [built.screenMat]);
  useScreenTextures(sw / sh, activeScreen, screenMatRef, true);
  usePhoneMotion(rootGroupRef, pivotGroupRef, motionRef, onActiveScreenChange);
  useEffect(() => { onReady(); }, [onReady]);
  useEffect(() => () => {
    Object.values(built).forEach((resource) => resource.dispose());
  }, [built]);

  const cameraOffsets: Array<[number, number]> = [
    [-0.105, 0.115], [-0.105, -0.115], [0.105, 0],
  ];
  return (
    <group ref={rootGroupRef}>
      <group ref={pivotGroupRef}>
        <mesh geometry={built.bodyGeo} material={built.titaniumMat} />
        <mesh position={[PHONE_W / 2 + 0.0005, 0.78, 0]} material={built.antennaMat}>
          <boxGeometry args={[0.004, 0.016, PHONE_D * 0.72]} />
        </mesh>
        <mesh position={[-PHONE_W / 2 - 0.0005, 0.78, 0]} material={built.antennaMat}>
          <boxGeometry args={[0.004, 0.016, PHONE_D * 0.72]} />
        </mesh>
        <mesh position={[PHONE_W / 2 + 0.0005, -0.78, 0]} material={built.antennaMat}>
          <boxGeometry args={[0.004, 0.016, PHONE_D * 0.72]} />
        </mesh>
        <mesh position={[-PHONE_W / 2 - 0.0005, -0.78, 0]} material={built.antennaMat}>
          <boxGeometry args={[0.004, 0.016, PHONE_D * 0.72]} />
        </mesh>
        <mesh geometry={built.backGlassGeo} material={built.backGlassMat}
          position={[0, 0, -PHONE_D / 2 - 0.001]} rotation={[0, Math.PI, 0]} />
        <mesh geometry={built.bezelGeo} material={built.bezelMat}
          position={[0, 0, PHONE_D / 2 + 0.001]} />
        <mesh geometry={built.screenGeo} material={built.screenMat}
          position={[0, 0, PHONE_D / 2 + 0.0025]} />
        <mesh position={[0, sh / 2 - 0.018, PHONE_D / 2 + 0.0032]} material={built.speakerMat}>
          <boxGeometry args={[0.14, 0.008, 0.002]} />
        </mesh>
        <mesh geometry={built.islandGeo} material={built.islandMat}
          position={[0, sh / 2 - 0.072, PHONE_D / 2 + 0.0035]} />
        <mesh geometry={built.frontLensGeo} material={built.frontLensMat}
          position={[0.068, sh / 2 - 0.072, PHONE_D / 2 + 0.004]} />
        <mesh geometry={built.screenGeo} material={built.glassCoverMat}
          position={[0, 0, PHONE_D / 2 + 0.0048]} />
        <mesh position={[PHONE_W / 2 + 0.006, 0.34, 0]} material={built.titaniumMat}>
          <boxGeometry args={[0.018, 0.27, 0.032]} />
        </mesh>
        <mesh position={[-PHONE_W / 2 - 0.006, 0.56, 0]} material={built.titaniumMat}>
          <boxGeometry args={[0.018, 0.095, 0.032]} />
        </mesh>
        <mesh position={[-PHONE_W / 2 - 0.006, 0.34, 0]} material={built.titaniumMat}>
          <boxGeometry args={[0.018, 0.17, 0.032]} />
        </mesh>
        <mesh position={[-PHONE_W / 2 - 0.006, 0.11, 0]} material={built.titaniumMat}>
          <boxGeometry args={[0.018, 0.17, 0.032]} />
        </mesh>
        <mesh position={[0, -PHONE_H / 2 - 0.001, 0]} material={built.usbMat}>
          <boxGeometry args={[0.135, 0.009, 0.032]} />
        </mesh>
        {[-0.22, -0.19, -0.16, 0.16, 0.19, 0.22, 0.25].map((sx, idx) => (
          <mesh key={idx} position={[sx, -PHONE_H / 2 - 0.001, 0]}
            rotation={[Math.PI / 2, 0, 0]} material={built.usbMat}>
            <cylinderGeometry args={[0.006, 0.006, 0.008, 12]} />
          </mesh>
        ))}
        <group position={[0.195, 0.71, -PHONE_D / 2 - 0.033]}>
          <mesh geometry={built.bumpGeo} material={built.bumpMat} />
          {cameraOffsets.map(([cx, cy], i) => (
            <group key={i} position={[cx, cy, -0.017]}>
              <mesh geometry={built.ringGeo} material={built.lensRingMat} />
              <mesh geometry={built.housingGeo} material={built.bumpMat}
                rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.006]} />
              <mesh geometry={built.lensGlassGeo} material={built.lensGlassMat}
                rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.004]} />
              <mesh geometry={built.coatRingGeo} material={built.coatRingMat}
                rotation={[0, Math.PI, 0]} position={[0, 0, -0.0108]} />
              <mesh geometry={built.pupilGeo} material={built.pupilMat}
                rotation={[0, Math.PI, 0]} position={[0, 0, -0.0112]} />
            </group>
          ))}
          <mesh geometry={built.flashGeo} material={built.flashMat}
            rotation={[0, Math.PI, 0]} position={[0.105, 0.155, -0.009]} />
          <mesh geometry={built.lidarGeo} material={built.lidarMat}
            rotation={[0, Math.PI, 0]} position={[0.105, -0.155, -0.009]} />
          <mesh geometry={built.ledGeo} material={built.ledMat}
            rotation={[0, Math.PI, 0]} position={[0.175, 0.195, -0.009]} />
        </group>
      </group>
    </group>
  );
}
