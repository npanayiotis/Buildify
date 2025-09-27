import React from "react";

const FontSelector = ({ label, value, onChange }) => {
  const fonts = [
    { name: "Inter", value: "Inter", category: "Sans-serif" },
    { name: "Roboto", value: "Roboto", category: "Sans-serif" },
    { name: "Open Sans", value: "Open Sans", category: "Sans-serif" },
    { name: "Lato", value: "Lato", category: "Sans-serif" },
    { name: "Poppins", value: "Poppins", category: "Sans-serif" },
    { name: "Playfair Display", value: "Playfair Display", category: "Serif" },
    { name: "Merriweather", value: "Merriweather", category: "Serif" },
    { name: "Source Serif Pro", value: "Source Serif Pro", category: "Serif" },
    { name: "Fira Code", value: "Fira Code", category: "Monospace" },
    { name: "JetBrains Mono", value: "JetBrains Mono", category: "Monospace" }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name} ({font.category})
          </option>
        ))}
      </select>
      <div className="text-sm text-gray-500" style={{ fontFamily: value }}>
        Preview: The quick brown fox jumps over the lazy dog
      </div>
    </div>
  );
};

export default FontSelector;
