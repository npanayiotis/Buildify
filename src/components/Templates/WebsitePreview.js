import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WebsitePreview = memo(
  ({
    templatePath,
    templateName,
    className = "",
    height = "300px",
    showControls = false,
    onFullscreen,
  }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [zoom, setZoom] = useState(0.5);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const iframeRef = useRef(null);

    // Intersection Observer for lazy loading
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      const element = document.getElementById(
        `preview-container-${templateName}`
      );
      if (element) {
        observer.observe(element);
      }

      return () => observer.disconnect();
    }, [templateName]);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000); // Reduced loading time

        return () => clearTimeout(timer);
      }
    }, [isVisible]);

    const handleIframeLoad = useCallback(() => {
      setIsLoading(false);
      setHasError(false);
    }, []);

    const handleIframeError = useCallback(() => {
      setIsLoading(false);
      setHasError(true);
    }, []);

    const toggleFullscreen = useCallback(() => {
      if (onFullscreen) {
        onFullscreen(templatePath, templateName);
      } else {
        setIsFullscreen(!isFullscreen);
      }
    }, [onFullscreen, templatePath, templateName, isFullscreen]);

    const refreshPreview = useCallback(() => {
      if (iframeRef.current) {
        setIsLoading(true);
        iframeRef.current.src = iframeRef.current.src;
      }
    }, []);

    const zoomIn = useCallback(
      () => setZoom((prev) => Math.min(prev + 0.1, 1)),
      []
    );
    const zoomOut = useCallback(
      () => setZoom((prev) => Math.max(prev - 0.1, 0.2)),
      []
    );

    if (hasError) {
      return (
        <div
          className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
          style={{ height }}
        >
          <div className="text-center p-4">
            <div className="text-4xl mb-2">⚠️</div>
            <p className="text-gray-500 text-sm">Preview not available</p>
            <button
              onClick={refreshPreview}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        id={`preview-container-${templateName}`}
        className={`relative bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
        style={{ height }}
      >
        {/* Controls */}
        {showControls && (
          <div className="absolute top-2 right-2 z-10 flex space-x-1">
            <button
              onClick={zoomOut}
              className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-xs hover:bg-gray-50"
              title="Zoom Out"
            >
              −
            </button>
            <span className="px-2 py-1 bg-white rounded shadow-sm text-xs">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-xs hover:bg-gray-50"
              title="Zoom In"
            >
              +
            </button>
            <button
              onClick={refreshPreview}
              className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-xs hover:bg-gray-50"
              title="Refresh"
            >
              ↻
            </button>
            <button
              onClick={toggleFullscreen}
              className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-xs hover:bg-gray-50"
              title="Fullscreen"
            >
              ⛶
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-500 text-sm">Loading preview...</p>
            </div>
          </div>
        )}

        {/* Website Preview */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full overflow-hidden"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                width: `${100 / zoom}%`,
                height: `${100 / zoom}%`,
              }}
            >
              <iframe
                ref={iframeRef}
                src={templatePath}
                className="w-full h-full border-0"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                sandbox="allow-scripts allow-forms allow-popups allow-top-navigation"
                title={`${templateName} Preview`}
                loading="lazy"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay for interaction */}
        <div className="absolute inset-0 bg-transparent pointer-events-none" />
      </div>
    );
  }
);

WebsitePreview.displayName = "WebsitePreview";

export default WebsitePreview;
