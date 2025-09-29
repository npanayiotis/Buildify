import React, { useRef, useState, useEffect, useCallback } from "react";
import { X, ChevronDown, ChevronUp, Palette, Type, Image, Layout, Settings } from "lucide-react";

// Customization Panel Component
const CustomizationPanel = ({ selectedElement, onUpdateStyle, onUpdateContent, editor }) => {
  const [activeTab, setActiveTab] = useState("colors");

  const tabs = [
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "content", label: "Content", icon: Settings },
    { id: "media", label: "Media", icon: Image },
    { id: "layout", label: "Layout", icon: Layout }
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Customize</h3>
        <p className="text-xs text-gray-500 mt-1">
          {selectedElement ? "Edit selected element" : "Select an element to customize"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-2 py-3 text-xs font-medium transition-colors ${
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
        {activeTab === "colors" && (
          <ColorCustomization
            onUpdateStyle={onUpdateStyle}
            selectedElement={selectedElement}
            editor={editor}
          />
        )}
        {activeTab === "typography" && (
          <TypographyCustomization
            onUpdateStyle={onUpdateStyle}
            selectedElement={selectedElement}
            editor={editor}
          />
        )}
        {activeTab === "content" && (
          <ContentCustomization
            onUpdateContent={onUpdateContent}
            selectedElement={selectedElement}
            editor={editor}
          />
        )}
        {activeTab === "media" && (
          <MediaCustomization
            onUpdateStyle={onUpdateStyle}
            selectedElement={selectedElement}
            editor={editor}
          />
        )}
        {activeTab === "layout" && (
          <LayoutCustomization
            onUpdateStyle={onUpdateStyle}
            selectedElement={selectedElement}
            editor={editor}
          />
        )}
      </div>
    </div>
  );
};

// Color Customization Section
const ColorCustomization = ({ onUpdateStyle, selectedElement, editor }) => {
  const [colors, setColors] = useState({
    background: "#ffffff",
    text: "#1f2937",
    primary: "#3b82f6",
    secondary: "#6b7280"
  });

  useEffect(() => {
    if (selectedElement && editor) {
      const component = editor.getSelected();
      if (component) {
        const styles = component.getStyle();
        setColors({
          background: styles['background-color'] || "#ffffff",
          text: styles['color'] || "#1f2937",
          primary: styles['border-color'] || "#3b82f6",
          secondary: styles['border-top-color'] || "#6b7280"
        });
      }
    }
  }, [selectedElement, editor]);

  const handleColorChange = (property, value) => {
    setColors(prev => ({ ...prev, [property]: value }));
    if (onUpdateStyle) {
      onUpdateStyle(property, value);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Background Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colors.background}
            onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.background}
            onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
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
            value={colors.text}
            onChange={(e) => handleColorChange("color", e.target.value)}
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.text}
            onChange={(e) => handleColorChange("color", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={colors.primary}
            onChange={(e) => handleColorChange("primary", e.target.value)}
            className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={colors.primary}
            onChange={(e) => handleColorChange("primary", e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Presets</h4>
        <div className="grid grid-cols-4 gap-2">
          {[
            { bg: "#3b82f6", label: "Blue" },
            { bg: "#10b981", label: "Green" },
            { bg: "#f59e0b", label: "Orange" },
            { bg: "#8b5cf6", label: "Purple" },
            { bg: "#ef4444", label: "Red" },
            { bg: "#06b6d4", label: "Cyan" },
            { bg: "#ec4899", label: "Pink" },
            { bg: "#6b7280", label: "Gray" }
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleColorChange("primary", preset.bg)}
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
const TypographyCustomization = ({ onUpdateStyle, selectedElement, editor }) => {
  const [typography, setTypography] = useState({
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.5"
  });

  useEffect(() => {
    if (selectedElement && editor) {
      const component = editor.getSelected();
      if (component) {
        const styles = component.getStyle();
        setTypography({
          fontFamily: styles['font-family'] || "Inter",
          fontSize: styles['font-size'] || "16px",
          fontWeight: styles['font-weight'] || "400",
          lineHeight: styles['line-height'] || "1.5"
        });
      }
    }
  }, [selectedElement, editor]);

  const fonts = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins"];
  const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px", "48px"];
  const fontWeights = ["300", "400", "500", "600", "700", "800"];

  const handleChange = (property, value) => {
    setTypography(prev => ({ ...prev, [property]: value }));
    if (onUpdateStyle) {
      onUpdateStyle(property, value);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Font Family
        </label>
        <select
          value={typography.fontFamily}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        >
          {fonts.map(font => (
            <option key={font} value={font}>{font}</option>
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
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}</option>
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
          {fontWeights.map(weight => (
            <option key={weight} value={weight}>
              {weight === "300" ? "Light" :
               weight === "400" ? "Regular" :
               weight === "500" ? "Medium" :
               weight === "600" ? "Semi Bold" :
               weight === "700" ? "Bold" : "Extra Bold"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Line Height
        </label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={parseFloat(typography.lineHeight)}
          onChange={(e) => handleChange("lineHeight", e.target.value)}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{typography.lineHeight}</div>
      </div>
    </div>
  );
};

// Content Customization Section
const ContentCustomization = ({ onUpdateContent, selectedElement, editor }) => {
  const [content, setContent] = useState({
    text: "",
    linkUrl: "",
    linkText: ""
  });

  useEffect(() => {
    if (selectedElement && editor) {
      const component = editor.getSelected();
      if (component) {
        const content = component.get('content') || component.getEl()?.textContent || '';
        setContent({
          text: content,
          linkUrl: "",
          linkText: ""
        });
      }
    }
  }, [selectedElement, editor]);

  const handleContentChange = (field, value) => {
    setContent(prev => ({ ...prev, [field]: value }));
    if (onUpdateContent) {
      onUpdateContent(field, value);
    }
  };

  return (
    <div className="p-4 space-y-4">
      {!selectedElement && (
        <div className="text-center py-8 text-gray-500">
          <Settings className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Select an element to edit its content</p>
        </div>
      )}

      {selectedElement && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={content.text}
              onChange={(e) => handleContentChange("text", e.target.value)}
              placeholder="Enter text content..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button/Link Text
            </label>
            <input
              type="text"
              value={content.linkText}
              onChange={(e) => handleContentChange("linkText", e.target.value)}
              placeholder="Click here"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link URL
            </label>
            <input
              type="text"
              value={content.linkUrl}
              onChange={(e) => handleContentChange("linkUrl", e.target.value)}
              placeholder="https://example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
};

// Media Customization Section
const MediaCustomization = ({ onUpdateStyle, selectedElement, editor }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (selectedElement && editor) {
      const component = editor.getSelected();
      if (component) {
        const el = component.getEl();
        const img = el?.querySelector('img');
        if (img) {
          setImageUrl(img.src || '');
        }
      }
    }
  }, [selectedElement, editor]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target?.result);
        if (onUpdateStyle) {
          onUpdateStyle("backgroundImage", `url(${event.target?.result})`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            if (onUpdateStyle) {
              onUpdateStyle("backgroundImage", `url(${e.target.value})`);
            }
          }}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div className="text-center">
        <span className="text-sm text-gray-500">or</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>

      {imageUrl && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-32 object-cover rounded border border-gray-300"
          />
        </div>
      )}
    </div>
  );
};

// Layout Customization Section
const LayoutCustomization = ({ onUpdateStyle, selectedElement, editor }) => {
  const [layout, setLayout] = useState({
    padding: "20px",
    margin: "0px",
    borderRadius: "0px",
    width: "auto"
  });

  useEffect(() => {
    if (selectedElement && editor) {
      const component = editor.getSelected();
      if (component) {
        const styles = component.getStyle();
        setLayout({
          padding: styles['padding'] || "20px",
          margin: styles['margin'] || "0px",
          borderRadius: styles['border-radius'] || "0px",
          width: styles['width'] || "auto"
        });
      }
    }
  }, [selectedElement, editor]);

  const handleChange = (property, value) => {
    setLayout(prev => ({ ...prev, [property]: value }));
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
          placeholder="20px"
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
          placeholder="0px"
          className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Border Radius
        </label>
        <input
          type="range"
          min="0"
          max="50"
          value={parseInt(layout.borderRadius)}
          onChange={(e) => handleChange("borderRadius", `${e.target.value}px`)}
          className="w-full"
        />
        <div className="text-xs text-gray-500 mt-1">{layout.borderRadius}</div>
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
          <option value="100%">Full Width</option>
          <option value="50%">Half Width</option>
          <option value="33.33%">Third Width</option>
          <option value="25%">Quarter Width</option>
        </select>
      </div>
    </div>
  );
};

export default CustomizationPanel;
