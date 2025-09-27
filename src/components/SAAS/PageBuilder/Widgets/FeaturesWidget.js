import React from "react";
import { Plus, Trash2 } from "lucide-react";

const FeaturesWidget = ({ data, isSelected, onUpdate }) => {
  const handleUpdate = (field, value) => {
    onUpdate({ [field]: value });
  };

  const addFeature = () => {
    const newFeatures = [
      ...(data.items || []),
      {
        icon: "⭐",
        title: "New Feature",
        description: "Feature description",
      },
    ];
    handleUpdate("items", newFeatures);
  };

  const updateFeature = (index, field, value) => {
    const newFeatures = [...(data.items || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    handleUpdate("items", newFeatures);
  };

  const removeFeature = (index) => {
    const newFeatures = (data.items || []).filter((_, i) => i !== index);
    handleUpdate("items", newFeatures);
  };

  const getGridCols = (count) => {
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 3) return "grid-cols-1 md:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  };

  return (
    <div className="py-12">
      {isSelected ? (
        <div className="space-y-6 p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Features Section</h3>
            <button
              onClick={addFeature}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Feature</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {(data.items || []).map((feature, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>
                  <button
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={feature.icon || ""}
                      onChange={(e) => updateFeature(index, "icon", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="🏆"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={feature.title || ""}
                      onChange={(e) => updateFeature(index, "title", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Feature title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={feature.description || ""}
                      onChange={(e) => updateFeature(index, "description", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      placeholder="Feature description"
                      rows="2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Layout
              </label>
              <select
                value={data.layout || "grid"}
                onChange={(e) => handleUpdate("layout", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="grid">Grid</option>
                <option value="list">List</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alignment
              </label>
              <select
                value={data.align || "center"}
                onChange={(e) => handleUpdate("align", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4">
          <div className={`grid gap-8 ${getGridCols((data.items || []).length)}`}>
            {(data.items || []).map((feature, index) => (
              <div
                key={index}
                className={`text-${data.align || "center"} ${
                  data.layout === "list" ? "flex items-start space-x-4" : ""
                }`}
              >
                {data.layout === "list" ? (
                  <>
                    <div className="text-3xl flex-shrink-0">
                      {feature.icon || "⭐"}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title || "Feature Title"}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description || "Feature description"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-4">
                      {feature.icon || "⭐"}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title || "Feature Title"}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description || "Feature description"}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesWidget;
