import React, { useState, useEffect } from "react";
import { Palette, Type, Settings, Image, Layout, Upload } from "lucide-react";
import NextImage from "next/image";

const CustomizationPanel = ({
  selectedElement,
  onUpdateStyle,
  onUpdateContent,
  editor,
}) => {
  const [activeTab, setActiveTab] = useState("colors");
  const [selectedComponent, setSelectedComponent] = useState(null);

  // Update selected component when element changes
  useEffect(() => {
    if (selectedElement) {
      setSelectedComponent(selectedElement);
    } else {
      setSelectedComponent(null);
    }
  }, [selectedElement]);

  const tabs = [
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "content", label: "Content", icon: Settings },
    { id: "media", label: "Media", icon: Image },
    { id: "layout", label: "Layout", icon: Layout },
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Customize</h3>
        <p className="text-xs text-gray-500 mt-1">
          {selectedComponent
            ? `Edit ${selectedComponent.tagName?.toLowerCase() || "element"}`
            : "Click an element to customize"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-2 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 mx-auto mb-1" />
              <div>{tab.label}</div>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {!selectedComponent && (
          <div className="flex items-center justify-center h-full p-8 text-center">
            <div className="text-gray-400">
              <Settings className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="text-sm">
                Click any element on the canvas to start customizing
              </p>
            </div>
          </div>
        )}

        {selectedComponent && activeTab === "colors" && (
          <ColorCustomization
            component={selectedComponent}
            onUpdateStyle={onUpdateStyle}
          />
        )}
        {selectedComponent && activeTab === "typography" && (
          <TypographyCustomization
            component={selectedComponent}
            onUpdateStyle={onUpdateStyle}
          />
        )}
        {selectedComponent && activeTab === "content" && (
          <ContentCustomization
            component={selectedComponent}
            onUpdateContent={onUpdateContent}
          />
        )}
        {selectedComponent && activeTab === "media" && (
          <MediaCustomization
            component={selectedComponent}
            onUpdateStyle={onUpdateStyle}
          />
        )}
        {selectedComponent && activeTab === "layout" && (
          <LayoutCustomization
            component={selectedComponent}
            onUpdateStyle={onUpdateStyle}
          />
        )}
      </div>
    </div>
  );
};

// Color Customization Section
const ColorCustomization = ({ component, onUpdateStyle }) => {
  const [colors, setColors] = useState({
    backgroundColor: "#ffffff",
    color: "#1f2937",
    borderColor: "#e5e7eb",
  });

  // Convert RGB/RGBA to hex format
  const rgbToHex = (rgb) => {
    if (!rgb || rgb === "rgba(0, 0, 0, 0)" || rgb === "transparent")
      return "#ffffff";
    if (rgb.startsWith("#")) return rgb;

    const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return "#ffffff";
  };

  // Load current styles when component changes
  useEffect(() => {
    if (component && component.element) {
      const computedStyle = window.getComputedStyle(component.element);
      setColors({
        backgroundColor: rgbToHex(computedStyle.backgroundColor) || "#ffffff",
        color: rgbToHex(computedStyle.color) || "#1f2937",
        borderColor: rgbToHex(computedStyle.borderColor) || "#e5e7eb",
      });
    }
  }, [component]);

  const handleColorChange = (property, value) => {
    setColors((prev) => ({ ...prev, [property]: value }));

    // Apply the style directly to the element
    if (component && component.element) {
      const styleMap = {
        backgroundColor: "background-color",
        color: "color",
        borderColor: "border-color",
      };

      const cssProperty = styleMap[property] || property;
      component.element.style[cssProperty] = value;
    }

    if (onUpdateStyle) {
      onUpdateStyle(property, value);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-xs text-green-600 mb-2">
        ✓ Changes apply instantly - no reload needed
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colors.backgroundColor}
            onChange={(e) =>
              handleColorChange("backgroundColor", e.target.value)
            }
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.backgroundColor}
            onChange={(e) =>
              handleColorChange("backgroundColor", e.target.value)
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colors.color}
            onChange={(e) => handleColorChange("color", e.target.value)}
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.color}
            onChange={(e) => handleColorChange("color", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="#1f2937"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colors.borderColor}
            onChange={(e) => handleColorChange("borderColor", e.target.value)}
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.borderColor}
            onChange={(e) => handleColorChange("borderColor", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
            placeholder="#e5e7eb"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Quick Presets
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {[
            { bg: "#3b82f6", label: "Blue" },
            { bg: "#10b981", label: "Green" },
            { bg: "#f59e0b", label: "Orange" },
            { bg: "#8b5cf6", label: "Purple" },
            { bg: "#ef4444", label: "Red" },
            { bg: "#06b6d4", label: "Cyan" },
            { bg: "#ec4899", label: "Pink" },
            { bg: "#6b7280", label: "Gray" },
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleColorChange("backgroundColor", preset.bg)}
              className="w-full aspect-square rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
              style={{ backgroundColor: preset.bg }}
              title={preset.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Typography Customization Section
const TypographyCustomization = ({ component, onUpdateStyle }) => {
  const [typography, setTypography] = useState({
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5",
    textAlign: "left",
  });

  useEffect(() => {
    if (component && component.element) {
      const computedStyle = window.getComputedStyle(component.element);
      setTypography({
        fontFamily: computedStyle.fontFamily?.replace(/['"]/g, "") || "Inter",
        fontSize: computedStyle.fontSize || "16px",
        fontWeight: computedStyle.fontWeight || "400",
        lineHeight: computedStyle.lineHeight || "1.5",
        textAlign: computedStyle.textAlign || "left",
      });
    }
  }, [component]);

  const fonts = [
    "Inter",
    "Roboto",
    "Open Sans",
    "Lato",
    "Montserrat",
    "Poppins",
    "Arial",
    "Georgia",
    "Times New Roman",
  ];
  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "48px",
    "64px",
  ];
  const fontWeights = ["300", "400", "500", "600", "700", "800"];

  const handleChange = (property, value) => {
    setTypography((prev) => ({ ...prev, [property]: value }));

    // Apply the style directly to the element
    if (component && component.element) {
      const styleMap = {
        fontFamily: "font-family",
        fontSize: "font-size",
        fontWeight: "font-weight",
        lineHeight: "line-height",
        textAlign: "text-align",
      };

      const cssProperty = styleMap[property] || property;
      component.element.style[cssProperty] = value;
    }

    if (onUpdateStyle) {
      onUpdateStyle(property, value);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-xs text-green-600 mb-2">
        ✓ Typography changes apply instantly
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          value={typography.fontFamily}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Size
        </label>
        <select
          value={typography.fontSize}
          onChange={(e) => handleChange("fontSize", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Weight
        </label>
        <select
          value={typography.fontWeight}
          onChange={(e) => handleChange("fontWeight", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          {fontWeights.map((weight) => (
            <option key={weight} value={weight}>
              {weight === "300"
                ? "Light"
                : weight === "400"
                ? "Regular"
                : weight === "500"
                ? "Medium"
                : weight === "600"
                ? "Semi Bold"
                : weight === "700"
                ? "Bold"
                : "Extra Bold"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Align
        </label>
        <div className="flex gap-2">
          {["left", "center", "right", "justify"].map((align) => (
            <button
              key={align}
              onClick={() => handleChange("textAlign", align)}
              className={`flex-1 px-3 py-2 text-sm border rounded ${
                typography.textAlign === align
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {align.charAt(0).toUpperCase() + align.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line Height: {typography.lineHeight}
        </label>
        <input
          type="range"
          min="1"
          max="2.5"
          step="0.1"
          value={parseFloat(typography.lineHeight)}
          onChange={(e) => handleChange("lineHeight", e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
};

// Content Customization Section
const ContentCustomization = ({ component, onUpdateContent }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (component) {
      const currentContent = component.textContent || "";
      setContent(currentContent);
    }
  }, [component]);

  const handleContentChange = (value) => {
    setContent(value);
    if (component && component.element) {
      component.element.textContent = value;
      // Mark content as modified to prevent HTML regeneration
      if (onUpdateContent) {
        onUpdateContent("text", value, true); // Pass true to indicate content was modified
      }
    }
    console.log("Content changed:", value);
  };

  const handleApplyChanges = () => {
    if (component && component.element) {
      component.element.textContent = content;
      // Mark content as modified to prevent HTML regeneration
      if (onUpdateContent) {
        onUpdateContent("text", content, true); // Pass true to indicate content was modified
      }
      console.log("Changes applied:", content);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter text content..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        onClick={handleApplyChanges}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Apply Changes
      </button>

      {component && (
        <div className="mt-2 text-xs text-green-600 text-center">
          ✓ Changes applied instantly
        </div>
      )}

      {component && (
        <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
          <div>
            <strong>Element:</strong> {component.tagName}
          </div>
          <div>
            <strong>Class:</strong> {component.className || "none"}
          </div>
          <div>
            <strong>ID:</strong> {component.id || "none"}
          </div>
        </div>
      )}
    </div>
  );
};

// Media Customization Section
const MediaCustomization = ({ component, onUpdateStyle }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (component && component.element) {
      const computedStyle = window.getComputedStyle(component.element);
      const bgImage = computedStyle.backgroundImage || "";
      const url = bgImage.replace(/url\(['"]?(.+?)['"]?\)/, "$1");
      setImageUrl(url);
    }
  }, [component]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        setImageUrl(result);

        // Apply the style directly to the element
        if (component && component.element && result) {
          component.element.style.backgroundImage = `url(${result})`;
        }

        if (onUpdateStyle) {
          onUpdateStyle("backgroundImage", `url(${result})`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (url) => {
    setImageUrl(url);

    // Apply the style directly to the element
    if (component && component.element && url) {
      component.element.style.backgroundImage = `url(${url})`;
    }

    if (onUpdateStyle && url) {
      onUpdateStyle("backgroundImage", `url(${url})`);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-xs text-green-600 mb-2">
        ✓ Media changes apply instantly
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-400" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or GIF</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {imageUrl && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <NextImage
            src={imageUrl}
            alt="Preview"
            width={400}
            height={160}
            className="w-full h-40 object-cover rounded border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

// Layout Customization Section
const LayoutCustomization = ({ component, onUpdateStyle }) => {
  const [layout, setLayout] = useState({
    padding: "20px",
    margin: "0px",
    borderRadius: "0px",
    width: "auto",
    height: "auto",
    display: "block",
  });

  useEffect(() => {
    if (component) {
      const styles = component.getStyle();
      setLayout({
        padding: styles.padding || "20px",
        margin: styles.margin || "0px",
        borderRadius: styles["border-radius"] || styles.borderRadius || "0px",
        width: styles.width || "auto",
        height: styles.height || "auto",
        display: styles.display || "block",
      });
    }
  }, [component]);

  const handleChange = (property, value) => {
    setLayout((prev) => ({ ...prev, [property]: value }));
    if (onUpdateStyle) {
      onUpdateStyle(property, value);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Padding
        </label>
        <input
          type="text"
          value={layout.padding}
          onChange={(e) => handleChange("padding", e.target.value)}
          placeholder="20px or 10px 20px"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Margin
        </label>
        <input
          type="text"
          value={layout.margin}
          onChange={(e) => handleChange("margin", e.target.value)}
          placeholder="0px or 10px auto"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Radius: {layout.borderRadius}
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(layout.borderRadius) || 0}
          onChange={(e) => handleChange("borderRadius", `${e.target.value}px`)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Width
        </label>
        <select
          value={layout.width}
          onChange={(e) => handleChange("width", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="auto">Auto</option>
          <option value="100%">Full Width (100%)</option>
          <option value="75%">Three Quarters (75%)</option>
          <option value="50%">Half Width (50%)</option>
          <option value="33.33%">Third Width (33%)</option>
          <option value="25%">Quarter Width (25%)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display
        </label>
        <select
          value={layout.display}
          onChange={(e) => handleChange("display", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          <option value="block">Block</option>
          <option value="inline-block">Inline Block</option>
          <option value="flex">Flex</option>
          <option value="grid">Grid</option>
          <option value="none">None (Hidden)</option>
        </select>
      </div>
    </div>
  );
};

export default CustomizationPanel;
