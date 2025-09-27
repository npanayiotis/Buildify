import React from "react";

const ButtonWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  const getButtonStyles = (style) => {
    const styles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
      ghost: "text-blue-600 hover:bg-blue-50",
      success: "bg-green-600 text-white hover:bg-green-700",
      warning: "bg-yellow-600 text-white hover:bg-yellow-700",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };
    return styles[style] || styles.primary;
  };

  return (
    <div className="py-4">
      {isSelected ? (
        <div className="space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Button Text
              </label>
              <input
                type="text"
                value={data.text || ""}
                onChange={(e) => handleUpdate("text", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Button text"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link URL
              </label>
              <input
                type="url"
                value={data.link || ""}
                onChange={(e) => handleUpdate("link", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="https://example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Style
              </label>
              <select
                value={data.style || "primary"}
                onChange={(e) => handleUpdate("style", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <select
                value={data.size || "medium"}
                onChange={(e) => handleUpdate("size", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width
              </label>
              <select
                value={data.width || "auto"}
                onChange={(e) => handleUpdate("width", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="auto">Auto</option>
                <option value="full">Full Width</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Align
              </label>
              <select
                value={data.align || "left"}
                onChange={(e) => handleUpdate("align", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.openInNewTab || false}
                onChange={(e) => handleUpdate("openInNewTab", e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Open in new tab</span>
            </label>
          </div>
        </div>
      ) : (
        <div className={`text-${data.align || "left"}`}>
          <a
            href={data.link || "#"}
            target={data.openInNewTab ? "_blank" : "_self"}
            rel={data.openInNewTab ? "noopener noreferrer" : ""}
            className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${getButtonStyles(
              data.style || "primary"
            )} ${
              data.size === "small" ? "px-4 py-2 text-sm" :
              data.size === "large" ? "px-8 py-4 text-lg" :
              data.size === "xl" ? "px-10 py-5 text-xl" :
              "px-6 py-3"
            } ${data.width === "full" ? "w-full" : ""}`}
          >
            {data.text || "Click Me"}
          </a>
        </div>
      )}
    </div>
  );
};

export default ButtonWidget;
