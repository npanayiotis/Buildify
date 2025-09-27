import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Lazy load the Canvas component
const Canvas = lazy(() =>
  import("@react-three/fiber").then((module) => ({ default: module.Canvas }))
);

// Loading component for 3D scenes
const CanvasLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
    <motion.div
      className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

// Performance-optimized 3D Canvas wrapper
const Lazy3DCanvas = ({
  children,
  camera = { position: [0, 0, 5], fov: 75 },
  className = "",
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Intersection Observer to only render 3D when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("3d-canvas-container");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  if (!shouldRender) {
    return (
      <div id="3d-canvas-container" className={`absolute inset-0 ${className}`}>
        <CanvasLoader />
      </div>
    );
  }

  return (
    <div id="3d-canvas-container" className={`absolute inset-0 ${className}`}>
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          camera={camera}
          onCreated={handleLoad}
          performance={{ min: 0.5 }}
          dpr={[1, 2]}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
};

export default Lazy3DCanvas;
