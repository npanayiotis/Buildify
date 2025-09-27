import React, { memo, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// Memoized sphere component for better performance
export const OptimizedSphere = memo(
  ({
    position = [0, 0, 0],
    color = "#3B82F6",
    scale = 1,
    distort = 0.2,
    speed = 1.5,
    args = [1, 32, 32], // Reduced geometry complexity
  }) => {
    const meshRef = useRef();

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      }
    });

    const materialProps = useMemo(
      () => ({
        color,
        distort,
        speed,
        roughness: 0,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9,
      }),
      [color, distort, speed]
    );

    return (
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <sphereGeometry args={args} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </Float>
    );
  }
);

// Memoized box component for better performance
export const OptimizedBox = memo(
  ({
    position = [0, 0, 0],
    color = "#6366F1",
    scale = 1,
    args = [0.4, 0.4, 0.4],
  }) => {
    const meshRef = useRef();

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      }
    });

    const materialProps = useMemo(
      () => ({
        color,
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
      }),
      [color]
    );

    return (
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <boxGeometry args={args} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </Float>
    );
  }
);

// Memoized torus component for better performance
export const OptimizedTorus = memo(
  ({
    position = [0, 0, 0],
    color = "#FFD700",
    scale = 1,
    args = [1, 0.3, 16, 100],
  }) => {
    const meshRef = useRef();

    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      }
    });

    const materialProps = useMemo(
      () => ({
        color,
        metalness: 0.9,
        roughness: 0,
        transparent: true,
        opacity: 0.9,
      }),
      [color]
    );

    return (
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef} position={position} scale={scale}>
          <torusGeometry args={args} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </Float>
    );
  }
);

// Performance-optimized orbit controls
export const OptimizedOrbitControls = memo(
  ({
    enableZoom = false,
    enablePan = false,
    autoRotate = true,
    autoRotateSpeed = 0.3,
  }) => {
    const { OrbitControls } = require("@react-three/drei");

    return (
      <OrbitControls
        enableZoom={enableZoom}
        enablePan={enablePan}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        enableDamping={true}
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    );
  }
);

OptimizedSphere.displayName = "OptimizedSphere";
OptimizedBox.displayName = "OptimizedBox";
OptimizedTorus.displayName = "OptimizedTorus";
OptimizedOrbitControls.displayName = "OptimizedOrbitControls";
