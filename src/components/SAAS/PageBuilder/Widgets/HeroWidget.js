import React from "react";
import { motion } from "framer-motion";

const HeroWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="relative min-h-[500px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {isSelected ? (
              <div className="space-y-6">
                <input
                  type="text"
                  value={data.title || ""}
                  onChange={(e) => handleUpdate("title", e.target.value)}
                  className="text-5xl md:text-6xl font-bold text-white bg-transparent border-2 border-dashed border-white/50 rounded-lg p-4 w-full text-center placeholder-white/70"
                  placeholder="Enter your title"
                />
                <textarea
                  value={data.subtitle || ""}
                  onChange={(e) => handleUpdate("subtitle", e.target.value)}
                  className="text-xl text-white/90 bg-transparent border-2 border-dashed border-white/50 rounded-lg p-4 w-full text-center placeholder-white/70 resize-none"
                  placeholder="Enter your subtitle"
                  rows="3"
                />
                <div className="flex justify-center space-x-4">
                  <input
                    type="text"
                    value={data.buttonText || ""}
                    onChange={(e) => handleUpdate("buttonText", e.target.value)}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg border-2 border-dashed border-blue-400 text-center placeholder-white/70"
                    placeholder="Button text"
                  />
                  <input
                    type="url"
                    value={data.buttonLink || ""}
                    onChange={(e) => handleUpdate("buttonLink", e.target.value)}
                    className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg border-2 border-dashed border-gray-400 text-center placeholder-white/70"
                    placeholder="Button link"
                  />
                </div>
                <div className="mt-4">
                  <input
                    type="url"
                    value={data.backgroundImage || ""}
                    onChange={(e) => handleUpdate("backgroundImage", e.target.value)}
                    className="w-full px-4 py-2 bg-black/50 text-white border border-white/30 rounded-lg text-sm placeholder-white/70"
                    placeholder="Background image URL"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  {data.title || "Your Amazing Title"}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  {data.subtitle || "Add your compelling subtitle here"}
                </p>
                {data.buttonText && (
                  <div className="flex justify-center space-x-4">
                    <a
                      href={data.buttonLink || "#"}
                      className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {data.buttonText}
                    </a>
                    {data.buttonSecondary && (
                      <a
                        href={data.buttonSecondaryLink || "#"}
                        className="inline-flex items-center px-8 py-3 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors backdrop-blur-sm"
                      >
                        {data.buttonSecondary}
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroWidget;
