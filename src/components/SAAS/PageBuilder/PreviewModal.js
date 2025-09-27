import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Tablet, Monitor } from "lucide-react";

const PreviewModal = ({ isOpen, onClose, widgets, template }) => {
  const [deviceView, setDeviceView] = useState("desktop");

  const getDeviceStyles = () => {
    switch (deviceView) {
      case "mobile":
        return { width: "375px", height: "667px" };
      case "tablet":
        return { width: "768px", height: "1024px" };
      default:
        return { width: "100%", height: "100%" };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Preview: {template?.name || "Custom Page"}
                </h2>
                
                {/* Device Selector */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setDeviceView("mobile")}
                    className={`p-2 rounded-md transition-colors ${
                      deviceView === "mobile"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    title="Mobile View"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceView("tablet")}
                    className={`p-2 rounded-md transition-colors ${
                      deviceView === "tablet"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    title="Tablet View"
                  >
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeviceView("desktop")}
                    className={`p-2 rounded-md transition-colors ${
                      deviceView === "desktop"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    title="Desktop View"
                  >
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-hidden bg-gray-50 flex items-center justify-center p-4">
              <div
                className="bg-white rounded-lg shadow-lg overflow-auto"
                style={getDeviceStyles()}
              >
                <div className="min-h-full">
                  {widgets.length > 0 ? (
                    <div className="space-y-0">
                      {widgets.map((widget, index) => {
                        const WidgetComponent = getWidgetComponent(widget.type);
                        return WidgetComponent ? (
                          <WidgetComponent
                            key={widget.id}
                            data={widget.data}
                            isSelected={false}
                            onUpdate={() => {}}
                          />
                        ) : (
                          <div
                            key={widget.id}
                            className="p-8 bg-gray-100 border-2 border-dashed border-gray-300 text-center"
                          >
                        <p className="text-gray-500">
                          Widget type &quot;{widget.type}&quot; not found
                        </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[400px]">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <Monitor className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No content to preview
                        </h3>
                        <p className="text-gray-600">
                          Add some widgets to see your page preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Preview mode - Changes are not saved
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      // Handle publish action
                      console.log("Publish page");
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Publish Page
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Import widget components for preview
import HeroWidget from "./Widgets/HeroWidget";
import TextWidget from "./Widgets/TextWidget";
import ImageWidget from "./Widgets/ImageWidget";
import ButtonWidget from "./Widgets/ButtonWidget";
import FeaturesWidget from "./Widgets/FeaturesWidget";
import TestimonialsWidget from "./Widgets/TestimonialsWidget";
import ContactWidget from "./Widgets/ContactWidget";
import PricingWidget from "./Widgets/PricingWidget";

const getWidgetComponent = (type) => {
  const components = {
    hero: HeroWidget,
    text: TextWidget,
    image: ImageWidget,
    button: ButtonWidget,
    features: FeaturesWidget,
    testimonials: TestimonialsWidget,
    contact: ContactWidget,
    pricing: PricingWidget,
  };
  return components[type];
};

export default PreviewModal;
