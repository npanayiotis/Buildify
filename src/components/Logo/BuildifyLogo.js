import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Text,
  Box,
  Sphere,
  Torus,
  MeshDistortMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

// Animated 3D Logo Component
const AnimatedLogo = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.scale.setScalar(hovered ? scale * 1.2 : scale);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main Building Structure */}
      <Box args={[1, 2, 0.5]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#3B82F6"
          speed={2}
          distort={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </Box>

      {/* Windows */}
      <Box args={[0.1, 0.3, 0.1]} position={[-0.3, 0.5, 0.3]}>
        <meshStandardMaterial
          color="#FEF3C7"
          emissive="#FEF3C7"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.1, 0.3, 0.1]} position={[0.3, 0.5, 0.3]}>
        <meshStandardMaterial
          color="#FEF3C7"
          emissive="#FEF3C7"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.1, 0.3, 0.1]} position={[-0.3, -0.2, 0.3]}>
        <meshStandardMaterial
          color="#FEF3C7"
          emissive="#FEF3C7"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.1, 0.3, 0.1]} position={[0.3, -0.2, 0.3]}>
        <meshStandardMaterial
          color="#FEF3C7"
          emissive="#FEF3C7"
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Roof */}
      <Box args={[1.2, 0.2, 0.6]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#8B5CF6" />
      </Box>

      {/* Foundation */}
      <Box args={[1.4, 0.3, 0.8]} position={[0, -1.15, 0]}>
        <meshStandardMaterial color="#64748B" />
      </Box>

      {/* Floating Elements */}
      <Sphere args={[0.1]} position={[0.8, 0.5, 0]} scale={[1, 1, 0.5]}>
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere args={[0.08]} position={[-0.8, -0.3, 0]} scale={[1, 1, 0.5]}>
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Gear/Construction Elements */}
      <Torus
        args={[0.15, 0.05, 8, 16]}
        position={[0.6, -0.8, 0]}
        rotation={[0, 0, Math.PI / 4]}
      >
        <meshStandardMaterial color="#EF4444" />
      </Torus>

      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </group>
  );
};

// Floating Particles
const ParticleField = ({ count = 50 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  const particles = Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
    ],
    scale: Math.random() * 0.5 + 0.1,
  }));

  return (
    <group ref={meshRef}>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[particle.scale]} position={particle.position}>
          <meshStandardMaterial
            color="#3B82F6"
            transparent
            opacity={0.3}
            emissive="#3B82F6"
            emissiveIntensity={0.1}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Main Logo Component
const BuildifyLogo = ({
  size = "medium",
  showText = true,
  animated = true,
  className = "",
}) => {
  const sizeMap = {
    small: { canvasSize: 200, textSize: 0.3, logoScale: 0.8 },
    medium: { canvasSize: 300, textSize: 0.5, logoScale: 1 },
    large: { canvasSize: 400, textSize: 0.7, logoScale: 1.2 },
  };

  const { canvasSize, textSize, logoScale } = sizeMap[size] || sizeMap.medium;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
        style={{ width: canvasSize, height: canvasSize }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: "transparent" }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#3B82F6"
          />

          {/* Main Logo */}
          <AnimatedLogo scale={logoScale} />

          {/* Floating Particles */}
          {animated && <ParticleField count={30} />}

          {/* 3D Text */}
          {showText && (
            <Text
              position={[0, -2.5, 0]}
              fontSize={textSize}
              color="#1E293B"
              anchorX="center"
              anchorY="middle"
            >
              Buildify
            </Text>
          )}
        </Canvas>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full pointer-events-none" />

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl pointer-events-none" />
      </motion.div>
    </div>
  );
};

// Simplified 2D Logo for smaller contexts
const BuildifyLogo2D = ({ size = "medium", className = "" }) => {
  const sizeMap = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`${sizeMap[size]} ${className} relative`}
    >
      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
        <div className="text-white font-bold text-lg">B</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-lg blur-sm" />
    </motion.div>
  );
};

// Logo with Text
const BuildifyLogoWithText = ({
  size = "medium",
  showLogo = true,
  textColor = "text-gray-900",
  className = "",
}) => {
  const sizeMap = {
    small: { logoSize: "small", textSize: "text-lg" },
    medium: { logoSize: "medium", textSize: "text-2xl" },
    large: { logoSize: "large", textSize: "text-4xl" },
  };

  const { logoSize, textSize } = sizeMap[size] || sizeMap.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center space-x-3 ${className}`}
    >
      {showLogo && <BuildifyLogo2D size={logoSize} />}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`font-bold ${textSize} ${textColor} bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}
      >
        Buildify
      </motion.span>
    </motion.div>
  );
};

export default BuildifyLogo;
export { BuildifyLogo2D, BuildifyLogoWithText, AnimatedLogo };
