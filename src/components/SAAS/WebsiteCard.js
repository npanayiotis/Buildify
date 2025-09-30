import React from "react";
import { motion } from "framer-motion";
import { Eye, Settings, Star, Crown, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

const WebsiteCard = ({ website, viewMode, onSelect, onPreview }) => {
  const { requireAuth } = useAuth();

  const handlePreview = (e) => {
    e.stopPropagation();
    // Open live demo in new tab if available
    if (website.livePages) {
      const livePage =
        website.livePages.home || Object.values(website.livePages)[0];
      window.open(livePage, "_blank");
    } else {
      requireAuth(() => onPreview(website));
    }
  };

  const handleCustomize = (e) => {
    e.stopPropagation();
    requireAuth(() => onSelect(website));
  };

  if (viewMode === "list") {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
      >
        <div className="flex">
          {/* Image */}
          <div className="relative w-64 h-48 flex-shrink-0">
            <Image
              src={website.preview || "/api/preview/placeholder"}
              alt={website.name}
              fill
              className="object-cover"
            />
            {website.isPremium && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Premium
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {website.name}
                </h3>
                <p className="text-gray-600 mb-3">{website.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    4.9
                  </span>
                  <span className="capitalize">{website.category}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              {website.features.slice(0, 4).map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {typeof feature === "string"
                    ? feature
                    : feature.title || feature}
                </span>
              ))}
              {website.features.length > 4 && (
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                  +{website.features.length - 4} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePreview}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                Preview
                <ExternalLink className="w-3 h-3" />
              </button>
              <button
                onClick={handleCustomize}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Settings className="w-4 h-4" />
                Customize
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
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <Image
          src={website.preview || "/api/preview/placeholder"}
          alt={website.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {website.isPremium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Crown className="w-3 h-3" />
            Premium
          </div>
        )}
        {website.livePages && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            ✅ Live Demo
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handlePreview}
            className="flex items-center gap-2 px-4 py-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            Preview
            <ExternalLink className="w-3 h-3" />
          </button>
          <button
            onClick={handleCustomize}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Settings className="w-4 h-4" />
            Customize
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {website.name}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {website.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4 flex-shrink-0">
          {website.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
            >
              {typeof feature === "string" ? feature : feature.title || feature}
            </span>
          ))}
          {website.features.length > 3 && (
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
              +{website.features.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 flex-shrink-0">
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            4.9
          </span>
          <span className="capitalize">{website.category}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          {website.livePages ? (
            <a
              href={
                website.livePages.home || Object.values(website.livePages)[0]
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              Live Demo
            </a>
          ) : (
            <button
              onClick={handlePreview}
              className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          )}
          <button
            onClick={handleCustomize}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Settings className="w-4 h-4" />
            Customize
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WebsiteCard;
