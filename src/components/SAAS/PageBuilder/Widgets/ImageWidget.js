import React from "react";

const ImageWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  const getImageStyles = () => {
    const styles = {
      width: data.width || "100%",
      height: data.height || "auto",
      objectFit: data.objectFit || "cover",
      borderRadius: data.borderRadius || "0px",
    };
    return styles;
  };

  const getContainerStyles = () => {
    return {
      textAlign: data.align || "left",
    };
  };

  return (
    <div className="py-4" style={getContainerStyles()}>
      {isSelected ? (
        <div className="space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={data.src || ""}
                onChange={(e) => handleUpdate("src", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={data.alt || ""}
                onChange={(e) => handleUpdate("alt", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                placeholder="Image description"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caption
            </label>
            <input
              type="text"
              value={data.caption || ""}
              onChange={(e) => handleUpdate("caption", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Optional caption"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Width
              </label>
              <select
                value={data.width || "100%"}
                onChange={(e) => handleUpdate("width", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="100%">Full Width</option>
                <option value="75%">75%</option>
                <option value="50%">50%</option>
                <option value="25%">25%</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Object Fit
              </label>
              <select
                value={data.objectFit || "cover"}
                onChange={(e) => handleUpdate("objectFit", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="cover">Cover</option>
                <option value="contain">Contain</option>
                <option value="fill">Fill</option>
                <option value="scale-down">Scale Down</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Border Radius
              </label>
              <select
                value={data.borderRadius || "0px"}
                onChange={(e) => handleUpdate("borderRadius", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="0px">None</option>
                <option value="4px">Small</option>
                <option value="8px">Medium</option>
                <option value="12px">Large</option>
                <option value="50%">Circle</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alignment
            </label>
            <div className="flex space-x-2">
              {["left", "center", "right"].map((align) => (
                <button
                  key={align}
                  onClick={() => handleUpdate("align", align)}
                  className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                    data.align === align
                      ? "bg-blue-100 border-blue-300 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={data.lazy || false}
                onChange={(e) => handleUpdate("lazy", e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Lazy loading</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="relative">
          {data.src ? (
            <img
              src={data.src}
              alt={data.alt || ""}
              style={getImageStyles()}
              loading={data.lazy ? "lazy" : "eager"}
              className="max-w-full h-auto"
            />
          ) : (
            <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🖼️</div>
                <p>No image selected</p>
              </div>
            </div>
          )}
          
          {data.caption && (
            <p className="text-sm text-gray-600 mt-2 text-center italic">
              {data.caption}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageWidget;
