import React, { useState, useEffect } from "react";
import WebsitePreview from "./WebsitePreview";

const FullscreenPreview = ({ isOpen, onClose, templatePath, templateName }) => {
  const [zoom, setZoom] = useState(1);
  const [isDesktopView, setIsDesktopView] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white/20 backdrop-blur-lg z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden border border-blue-200/50">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {templateName} - Live Preview
            </h2>
            <span className="text-sm text-gray-500 bg-blue-100/50 px-2 py-1 rounded-full">
              {isDesktopView ? "Desktop View" : "Mobile View"}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Device Toggle */}
            <div className="flex bg-blue-100/50 rounded-lg p-1">
              <button
                onClick={() => setIsDesktopView(true)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                  isDesktopView
                    ? "gradient-primary text-white shadow-lg glow-blue"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                }`}
              >
                Desktop
              </button>
              <button
                onClick={() => setIsDesktopView(false)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all duration-300 ${
                  !isDesktopView
                    ? "gradient-primary text-white shadow-lg glow-blue"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                }`}
              >
                Mobile
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.3))}
                className="w-8 h-8 bg-blue-100/50 rounded flex items-center justify-center hover:bg-blue-200/50 transition-all duration-300 hover:shadow-md"
                title="Zoom Out"
              >
                −
              </button>
              <span className="px-2 py-1 bg-blue-100/50 rounded text-sm font-medium min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
                className="w-8 h-8 bg-blue-100/50 rounded flex items-center justify-center hover:bg-blue-200/50 transition-all duration-300 hover:shadow-md"
                title="Zoom In"
              >
                +
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 bg-red-100/50 rounded flex items-center justify-center hover:bg-red-200/50 transition-all duration-300 hover:shadow-md"
              title="Close Preview"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-blue-50/30 to-purple-50/30 flex items-center justify-center p-4">
          <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              isDesktopView ? "w-full max-w-6xl" : "w-full max-w-sm"
            }`}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center",
              transition: "transform 0.2s ease",
            }}
          >
            <iframe
              src={templatePath}
              className={`w-full border-0 ${
                isDesktopView ? "h-[600px]" : "h-[800px]"
              }`}
              sandbox="allow-scripts allow-forms allow-popups"
              title={`${templateName} Full Preview`}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              This is a live preview of your selected template. All
              functionality is fully working.
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200/50 text-gray-800 rounded-lg hover:bg-gray-300/50 transition-all duration-300 hover:shadow-md"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Navigate to customize page
                  window.location.href = "/customize";
                }}
                className="px-4 py-2 gradient-primary text-white rounded-lg hover:shadow-lg glow-blue transition-all duration-300 hover:scale-105"
              >
                Customize This Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenPreview;
