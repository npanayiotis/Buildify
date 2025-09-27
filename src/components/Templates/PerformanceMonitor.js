import React, { useEffect, useState } from "react";

const PerformanceMonitor = ({ enabled = false }) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    const startTime = performance.now();

    // Monitor performance metrics
    const updateMetrics = () => {
      // Load time
      const loadTime = performance.now() - startTime;

      // Memory usage (if available)
      const memoryUsage = performance.memory
        ? Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)
        : 0;

      // FPS monitoring
      let fps = 0;
      let lastTime = performance.now();
      let frameCount = 0;

      const measureFPS = () => {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime - lastTime >= 1000) {
          fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
          frameCount = 0;
          lastTime = currentTime;
        }

        requestAnimationFrame(measureFPS);
      };

      measureFPS();

      setMetrics({
        loadTime: Math.round(loadTime),
        renderTime: 0, // This would be measured in the component
        memoryUsage,
        fps,
      });
    };

    // Update metrics every second
    const interval = setInterval(updateMetrics, 1000);

    // Web Vitals monitoring
    if ("web-vitals" in window) {
      import("web-vitals").then(
        ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(console.log);
          getFID(console.log);
          getFCP(console.log);
          getLCP(console.log);
          getTTFB(console.log);
        }
      );
    }

    return () => {
      clearInterval(interval);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div className="space-y-1">
        <div>Load: {metrics.loadTime}ms</div>
        <div>Memory: {metrics.memoryUsage}MB</div>
        <div>FPS: {metrics.fps}</div>
        <div className="text-xs opacity-60">
          {navigator.connection
            ? `${navigator.connection.effectiveType}`
            : "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
