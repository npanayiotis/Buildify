import React, { useState } from "react";
import { motion } from "framer-motion";
import WebsitePreview from "./WebsitePreview";
import FullscreenPreview from "./FullscreenPreview";

const TemplateCard = ({ template, onCustomize }) => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handleLivePreview = () => {
    setShowFullscreen(true);
  };

  const handleCustomize = () => {
    if (onCustomize) {
      onCustomize(template);
    }
  };

  return (
    <>
      <motion.div
        className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Live Website Preview with Enhanced Styling */}
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
          <WebsitePreview
            templatePath={template.templatePath}
            templateName={template.title}
            height="100%"
            className="rounded-t-2xl group-hover:scale-105 transition-transform duration-700"
          />

          {/* Premium Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Premium Badge */}
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 gradient-primary text-white text-xs font-bold rounded-full shadow-lg glow-blue"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            PREMIUM
          </motion.div>
        </div>

        <div className="relative p-6 flex-1 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2">
              {template.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 flex-1 line-clamp-3">
              {template.description}
            </p>

            {/* Enhanced Template Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold rounded-full border border-blue-200 glow-blue">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                {template.category}
              </span>
            </div>

            {/* Template Features */}
            {template.features && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5">
                  {template.features.slice(0, 2).map((feature, index) => (
                    <motion.span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      {feature}
                    </motion.span>
                  ))}
                  {template.features.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                      +{template.features.length - 2}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Enhanced Action Buttons */}
            <div className="flex space-x-3 mt-auto">
              <motion.button
                onClick={handleLivePreview}
                className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-2.5 rounded-lg text-xs font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 group/btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  👁️ Preview
                </span>
              </motion.button>
              <motion.button
                onClick={handleCustomize}
                className="flex-1 gradient-primary text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:shadow-xl glow-blue transition-all duration-300 shadow-lg group/btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center">
                  ⚡ Customize
                  <motion.span
                    className="ml-1.5"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Premium Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </motion.div>

      {/* Fullscreen Preview Modal */}
      <FullscreenPreview
        isOpen={showFullscreen}
        onClose={() => setShowFullscreen(false)}
        templatePath={template.templatePath}
        templateName={template.title}
      />
    </>
  );
};

export default TemplateCard;
