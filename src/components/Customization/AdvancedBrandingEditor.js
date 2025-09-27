import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import FontSelector from "./FontSelector";
import ImageUpload from "./ImageUpload";

const AdvancedBrandingEditor = ({ customization, onChange }) => {
  const [activeSection, setActiveSection] = useState("colors");

  const sections = [
    { id: "colors", label: "Colors", icon: "🎨" },
    { id: "typography", label: "Typography", icon: "📝" },
    { id: "logo", label: "Logo", icon: "🏷️" },
    { id: "spacing", label: "Spacing", icon: "📏" },
  ];

  const handleChange = (key, value) => {
    onChange({ ...customization, [key]: value });
  };

  const ColorSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Primary Colors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Primary Color"
            value={customization.primaryColor}
            onChange={(value) => handleChange("primaryColor", value)}
          />
          <ColorPicker
            label="Secondary Color"
            value={customization.secondaryColor}
            onChange={(value) => handleChange("secondaryColor", value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Accent Colors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ColorPicker
            label="Accent Color"
            value={customization.accentColor}
            onChange={(value) => handleChange("accentColor", value)}
          />
          <ColorPicker
            label="Success Color"
            value={customization.successColor || "#10B981"}
            onChange={(value) => handleChange("successColor", value)}
          />
          <ColorPicker
            label="Warning Color"
            value={customization.warningColor || "#F59E0B"}
            onChange={(value) => handleChange("warningColor", value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Neutral Colors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker
            label="Text Color"
            value={customization.textColor || "#1F2937"}
            onChange={(value) => handleChange("textColor", value)}
          />
          <ColorPicker
            label="Background Color"
            value={customization.backgroundColor || "#FFFFFF"}
            onChange={(value) => handleChange("backgroundColor", value)}
          />
        </div>
      </div>

      {/* Color Palette Preview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Color Palette Preview
        </h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-200"
              style={{ backgroundColor: customization.primaryColor }}
            ></div>
            <p className="text-xs text-gray-600">Primary</p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-200"
              style={{ backgroundColor: customization.secondaryColor }}
            ></div>
            <p className="text-xs text-gray-600">Secondary</p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-200"
              style={{ backgroundColor: customization.accentColor }}
            ></div>
            <p className="text-xs text-gray-600">Accent</p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-200"
              style={{
                backgroundColor: customization.successColor || "#10B981",
              }}
            ></div>
            <p className="text-xs text-gray-600">Success</p>
          </div>
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-2 border border-gray-200"
              style={{
                backgroundColor: customization.warningColor || "#F59E0B",
              }}
            ></div>
            <p className="text-xs text-gray-600">Warning</p>
          </div>
        </div>
      </div>
    </div>
  );

  const TypographySection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Font Families
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FontSelector
            label="Heading Font"
            value={customization.headingFont}
            onChange={(value) => handleChange("headingFont", value)}
          />
          <FontSelector
            label="Body Font"
            value={customization.bodyFont}
            onChange={(value) => handleChange("bodyFont", value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Sizes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Heading Size
            </label>
            <select
              value={customization.headingSize || "2xl"}
              onChange={(e) => handleChange("headingSize", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="xl">Extra Large</option>
              <option value="2xl">2X Large</option>
              <option value="3xl">3X Large</option>
              <option value="4xl">4X Large</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Body Size
            </label>
            <select
              value={customization.bodySize || "base"}
              onChange={(e) => handleChange("bodySize", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="sm">Small</option>
              <option value="base">Base</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Typography Preview
        </h3>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h1
            className="mb-4"
            style={{
              fontFamily: customization.headingFont,
              color: customization.primaryColor,
              fontSize:
                customization.headingSize === "xl"
                  ? "1.25rem"
                  : customization.headingSize === "2xl"
                  ? "1.5rem"
                  : customization.headingSize === "3xl"
                  ? "1.875rem"
                  : "2.25rem",
            }}
          >
            This is a Heading
          </h1>
          <p
            className="mb-2"
            style={{
              fontFamily: customization.bodyFont,
              color: customization.textColor || "#1F2937",
              fontSize:
                customization.bodySize === "sm"
                  ? "0.875rem"
                  : customization.bodySize === "base"
                  ? "1rem"
                  : customization.bodySize === "lg"
                  ? "1.125rem"
                  : "1.25rem",
            }}
          >
            This is body text that demonstrates how your content will look with
            the selected fonts and sizes.
          </p>
          <p
            style={{
              fontFamily: customization.bodyFont,
              color: customization.textColor || "#1F2937",
              fontSize:
                customization.bodySize === "sm"
                  ? "0.875rem"
                  : customization.bodySize === "base"
                  ? "1rem"
                  : customization.bodySize === "lg"
                  ? "1.125rem"
                  : "1.25rem",
            }}
          >
            You can use different font weights and styles to create visual
            hierarchy.
          </p>
        </div>
      </div>
    </div>
  );

  const LogoSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Logo Upload
        </h3>
        <ImageUpload
          label="Main Logo"
          value={customization.logo}
          onChange={(value) => handleChange("logo", value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Logo Variations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUpload
            label="Logo Light (for dark backgrounds)"
            value={customization.logoLight}
            onChange={(value) => handleChange("logoLight", value)}
          />
          <ImageUpload
            label="Logo Dark (for light backgrounds)"
            value={customization.logoDark}
            onChange={(value) => handleChange("logoDark", value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Logo Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Height
            </label>
            <input
              type="range"
              min="32"
              max="128"
              value={customization.logoHeight || 64}
              onChange={(e) =>
                handleChange("logoHeight", parseInt(e.target.value))
              }
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {customization.logoHeight || 64}px
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo Position
            </label>
            <select
              value={customization.logoPosition || "left"}
              onChange={(e) => handleChange("logoPosition", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const SpacingSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Section Spacing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Padding
            </label>
            <input
              type="range"
              min="16"
              max="128"
              value={customization.sectionPadding || 64}
              onChange={(e) =>
                handleChange("sectionPadding", parseInt(e.target.value))
              }
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {customization.sectionPadding || 64}px
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Element Spacing
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={customization.elementSpacing || 24}
              onChange={(e) =>
                handleChange("elementSpacing", parseInt(e.target.value))
              }
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {customization.elementSpacing || 24}px
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Border Radius
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Radius
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={customization.buttonRadius || 8}
              onChange={(e) =>
                handleChange("buttonRadius", parseInt(e.target.value))
              }
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {customization.buttonRadius || 8}px
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Radius
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={customization.cardRadius || 12}
              onChange={(e) =>
                handleChange("cardRadius", parseInt(e.target.value))
              }
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {customization.cardRadius || 12}px
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "colors":
        return <ColorSection />;
      case "typography":
        return <TypographySection />;
      case "logo":
        return <LogoSection />;
      case "spacing":
        return <SpacingSection />;
      default:
        return <ColorSection />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex space-x-2 border-b border-gray-200">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeSection === section.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      {renderSection()}
    </div>
  );
};

export default AdvancedBrandingEditor;
