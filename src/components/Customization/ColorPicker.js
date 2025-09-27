import React from "react";

const ColorPicker = ({ label, value, onChange }) => {
  const presetColors = [
    "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6",
    "#EC4899", "#06B6D4", "#84CC16", "#F97316", "#6366F1",
    "#14B8A6", "#F43F5E", "#8B5A2B", "#1F2937", "#6B7280"
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center space-x-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="#000000"
        />
      </div>
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
