import React from "react";

const TextWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="py-8">
      {isSelected ? (
        <div className="space-y-4">
          <select
            value={data.tag || "p"}
            onChange={(e) => handleUpdate("tag", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </select>
          
          <textarea
            value={data.content || ""}
            onChange={(e) => handleUpdate("content", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 resize-none"
            placeholder="Enter your text content..."
            rows="6"
          />
          
          <div className="flex space-x-4">
            <select
              value={data.align || "left"}
              onChange={(e) => handleUpdate("align", e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="left">Align Left</option>
              <option value="center">Align Center</option>
              <option value="right">Align Right</option>
              <option value="justify">Justify</option>
            </select>
            
            <input
              type="color"
              value={data.color || "#000000"}
              onChange={(e) => handleUpdate("color", e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
              title="Text color"
            />
            
            <input
              type="range"
              min="12"
              max="48"
              value={data.fontSize || "16"}
              onChange={(e) => handleUpdate("fontSize", e.target.value)}
              className="flex-1"
              title="Font size"
            />
            <span className="text-sm text-gray-600 self-center">
              {data.fontSize || "16"}px
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`text-${data.align || "left"}`}
          style={{
            color: data.color || "#000000",
            fontSize: `${data.fontSize || "16"}px`,
          }}
        >
          {React.createElement(
            data.tag || "p",
            null,
            data.content || "Enter your text content..."
          )}
        </div>
      )}
    </div>
  );
};

export default TextWidget;
