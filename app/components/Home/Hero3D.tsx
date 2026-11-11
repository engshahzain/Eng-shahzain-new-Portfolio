"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 800 random particles (low count for high performance)
  const particles = useMemo(() => {
    const temp = new Float32Array(800 * 3);
    for (let i = 0; i < 800 * 3; i++) {
      temp[i] = (Math.random() - 0.5) * 10;
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Very slow, elegant rotation
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#34d399" /* Emerald 400 */
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 60 }}
        // Performance clamp: Limits pixel ratio to save GPU
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
