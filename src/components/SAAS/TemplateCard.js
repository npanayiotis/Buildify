import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Eye, Palette, Star, ArrowRight, Download } from "lucide-react";
import TemplatePreviewModal from "./TemplatePreviewModal";

const TemplateCard = ({ template, viewMode, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSelect = (e) => {
    e.preventDefault();
    onSelect(template);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPreview(true);
  };

  const formatPrice = (price) => {
    if (price === 0) return "Free";
    return `$${price}`;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      business: "💼",
      portfolio: "🎨",
      ecommerce: "🛒",
      blog: "📝",
      saas: "💻",
      restaurant: "🍽️",
    };
    return icons[category] || "📄";
  };

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <div className="flex">
          {/* Preview Image */}
          <div className="w-64 h-48 relative bg-gray-100 flex-shrink-0">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Palette className="w-8 h-8 text-gray-400" />
              </div>
            )}
            <img
              src={template.preview}
              alt={template.name}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {template.isPremium && (
              <div className="absolute top-3 left-3">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  Premium
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <button
                onClick={handlePreview}
                className="opacity-0 hover:opacity-100 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">
                  {getCategoryIcon(template.category)}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {template.name}
                </h3>
                {template.isPremium && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-gray-600 mb-4">{template.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.features.slice(0, 4).map((feature, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {feature}
                  </span>
                ))}
                {template.features.length > 4 && (
                  <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                    +{template.features.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-gray-900">
                  {formatPrice(template.price)}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
              <button
                onClick={handleSelect}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                Use Template
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Preview Image */}
      <div className="relative h-48 bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Palette className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <img
          src={template.preview}
          alt={template.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Premium Badge */}
        {template.isPremium && (
          <div className="absolute top-3 left-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Crown className="w-3 h-3" />
              Premium
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-all duration-300 ${
            isHovered ? "bg-opacity-30" : "bg-opacity-0"
          }`}
        >
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-2">
              <button
                onClick={handlePreview}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleSelect}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Palette className="w-4 h-4" />
                Customize
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{getCategoryIcon(template.category)}</span>
          <h3 className="text-lg font-semibold text-gray-900">
            {template.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {template.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
          {template.features.length > 3 && (
            <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
              +{template.features.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold text-gray-900">
              {formatPrice(template.price)}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>

          <button
            onClick={handleSelect}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            Use Template
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      <TemplatePreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        template={template}
      />
    </motion.div>
  );
};

export default TemplateCard;
