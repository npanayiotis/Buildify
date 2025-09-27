import React, { memo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Sphere,
  Box,
  Torus,
  MeshDistortMaterial,
  OrbitControls,
  Float,
  Text3D,
  Center,
  Environment,
  Stars,
  Effects,
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { UnrealBloomPass } from "three-stdlib";
import { extend } from "@react-three/fiber";

// Extend Three.js with additional effects
extend({ UnrealBloomPass });

// Enhanced 3D Components with better materials
const GlowingSphere = memo(({ position, color, scale, args, ...props }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      position={position}
      scale={scale}
      args={args}
      {...props}
    >
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
});

GlowingSphere.displayName = "GlowingSphere";

const GlowingBox = memo(({ position, color, scale, args, ...props }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Box ref={meshRef} position={position} scale={scale} args={args} {...props}>
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </Box>
  );
});

GlowingBox.displayName = "GlowingBox";

const GlowingTorus = memo(({ position, color, scale, args, ...props }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Torus
      ref={meshRef}
      position={position}
      scale={scale}
      args={args}
      {...props}
    >
      <meshStandardMaterial
        color={color}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </Torus>
  );
});

GlowingTorus.displayName = "GlowingTorus";

const FloatingElements = memo(() => {
  return (
    <>
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <GlowingSphere
          position={[-4, 3, -3]}
          color="#3B82F6"
          scale={1.5}
          args={[1, 64, 64]}
        />
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
        <GlowingSphere
          position={[4, -2, -2]}
          color="#8B5CF6"
          scale={1.2}
          args={[1, 64, 64]}
        />
      </Float>

      <Float speed={4} rotationIntensity={3} floatIntensity={4}>
        <GlowingBox
          position={[0, 2, -4]}
          color="#10B981"
          scale={0.8}
          args={[0.6, 0.6, 0.6]}
        />
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <GlowingBox
          position={[-3, -2, -3]}
          color="#F59E0B"
          scale={0.6}
          args={[0.4, 0.4, 0.4]}
        />
      </Float>

      <Float speed={3.5} rotationIntensity={1.2} floatIntensity={3.5}>
        <GlowingTorus
          position={[3, 2, -2]}
          color="#EF4444"
          scale={0.9}
          args={[1.2, 0.4, 32, 100]}
        />
      </Float>

      <Float speed={2.2} rotationIntensity={1.8} floatIntensity={2.2}>
        <GlowingTorus
          position={[-2, 0, -3]}
          color="#EC4899"
          scale={0.7}
          args={[1, 0.3, 32, 100]}
        />
      </Float>

      <Float speed={2.8} rotationIntensity={1.3} floatIntensity={2.8}>
        <GlowingSphere
          position={[0, -3, -2]}
          color="#06B6D4"
          scale={1.1}
          args={[1, 64, 64]}
        />
      </Float>

      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.8}>
        <GlowingBox
          position={[2, 1, -4]}
          color="#F97316"
          scale={0.5}
          args={[0.3, 0.3, 0.3]}
        />
      </Float>
    </>
  );
});

FloatingElements.displayName = "FloatingElements";

const CentralLogo = memo(() => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <Center position={[0, 0, 0]}>
      <group ref={meshRef}>
        <mesh>
          <torusGeometry args={[3, 0.3, 32, 100]} />
          <meshStandardMaterial
            color="#FFFFFF"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <torusGeometry args={[2.5, 0.2, 24, 80]} />
          <meshStandardMaterial
            color="#3B82F6"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.8}
          />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <torusGeometry args={[2, 0.15, 16, 60]} />
          <meshStandardMaterial
            color="#8B5CF6"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.7}
          />
        </mesh>
      </group>
    </Center>
  );
});

CentralLogo.displayName = "CentralLogo";

const AnimatedLoader = memo(() => {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  const handleEnterWebsite = () => {
    router.push("/templates");
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Enhanced 3D Scene */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 75 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            color="#3B82F6"
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={1}
            color="#8B5CF6"
          />
          <pointLight
            position={[0, 0, 0]}
            intensity={2}
            color="#FFFFFF"
            distance={20}
          />

          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
          />

          <Environment preset="night" />

          <FloatingElements />
          <CentralLogo />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center max-w-5xl"
        >
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-7xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Website CRM
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-3xl md:text-4xl text-white mb-6 font-light"
          >
            Customize Your Superb Website
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="text-xl md:text-2xl text-white mb-16 font-light opacity-90"
          >
            In Seconds & Be Online
          </motion.p>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-300">Deploy in seconds</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Beautiful Design
              </h3>
              <p className="text-gray-300">Stunning templates</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Professional
              </h3>
              <p className="text-gray-300">Business ready</p>
            </div>
          </motion.div>

          {/* Enter Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnterWebsite}
            className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white text-xl font-bold shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <span>Enter Website CRM</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.button>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-12"
          >
            <div className="flex items-center justify-center space-x-3">
              <motion.div
                className="w-4 h-4 bg-blue-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-4 h-4 bg-purple-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              />
              <motion.div
                className="w-4 h-4 bg-pink-400 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: `hsl(${Math.random() * 60 + 200}, 70%, 70%)`,
            }}
            animate={{
              y: [0, -200, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
});

AnimatedLoader.displayName = "AnimatedLoader";

export default AnimatedLoader;
