import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const WidgetPanel = ({ widgets, onAddWidget }) => {
  const widgetCategories = {
    layout: widgets.filter(w => w.category === "layout"),
    content: widgets.filter(w => w.category === "content"),
    media: widgets.filter(w => w.category === "media"),
    interactive: widgets.filter(w => w.category === "interactive"),
    forms: widgets.filter(w => w.category === "forms"),
    business: widgets.filter(w => w.category === "business"),
    social: widgets.filter(w => w.category === "social"),
  };

  const handleAddWidget = (widgetType) => {
    onAddWidget(widgetType);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Add Widgets</h3>
        <p className="text-xs text-gray-600">
          Drag widgets to your page or click to add them
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(widgetCategories).map(([category, categoryWidgets]) => {
          if (categoryWidgets.length === 0) return null;

          return (
            <div key={category}>
              <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-3">
                {category}
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {categoryWidgets.map((widget) => (
                  <motion.button
                    key={widget.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddWidget(widget.id)}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{widget.icon}</span>
                      <span className="text-sm font-medium text-gray-900 group-hover:text-blue-700">
                        {widget.name}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 group-hover:text-blue-600">
                      {widget.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-3">
          Quick Add
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => handleAddWidget("text")}
            className="w-full flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Text Block</span>
          </button>
          <button
            onClick={() => handleAddWidget("image")}
            className="w-full flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Image</span>
          </button>
          <button
            onClick={() => handleAddWidget("button")}
            className="w-full flex items-center space-x-2 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Button</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WidgetPanel;
