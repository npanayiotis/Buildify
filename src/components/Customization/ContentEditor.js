import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

const ContentEditor = ({ customization, onChange }) => {
  const [activeSection, setActiveSection] = useState("hero");

  const sections = [
    { id: "hero", label: "Hero Section", icon: "🎯" },
    { id: "about", label: "About", icon: "ℹ️" },
    { id: "services", label: "Services", icon: "🛠️" },
    { id: "contact", label: "Contact", icon: "📞" },
    { id: "footer", label: "Footer", icon: "🦶" }
  ];

  const handleChange = (key, value) => {
    onChange({ ...customization, [key]: value });
  };

  const HeroSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Headline
            </label>
            <input
              type="text"
              value={customization.heroHeadline || "Welcome to Our Business"}
              onChange={(e) => handleChange("heroHeadline", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subheadline
            </label>
            <textarea
              value={customization.heroSubheadline || "We provide exceptional services to help your business grow"}
              onChange={(e) => handleChange("heroSubheadline", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Button Text
              </label>
              <input
                type="text"
                value={customization.heroPrimaryButton || "Get Started"}
                onChange={(e) => handleChange("heroPrimaryButton", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={customization.heroSecondaryButton || "Learn More"}
                onChange={(e) => handleChange("heroSecondaryButton", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Image</h3>
        <ImageUpload
          label="Hero Background Image"
          value={customization.heroImage}
          onChange={(value) => handleChange("heroImage", value)}
        />
      </div>
    </div>
  );

  const AboutSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Headline
            </label>
            <input
              type="text"
              value={customization.aboutHeadline || "About Us"}
              onChange={(e) => handleChange("aboutHeadline", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About Description
            </label>
            <textarea
              value={customization.aboutDescription || "Tell your story and what makes your business unique"}
              onChange={(e) => handleChange("aboutDescription", e.target.value)}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About Image</h3>
        <ImageUpload
          label="About Section Image"
          value={customization.aboutImage}
          onChange={(value) => handleChange("aboutImage", value)}
        />
      </div>
    </div>
  );

  const ServicesSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Services Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services Headline
            </label>
            <input
              type="text"
              value={customization.servicesHeadline || "Our Services"}
              onChange={(e) => handleChange("servicesHeadline", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services Description
            </label>
            <textarea
              value={customization.servicesDescription || "Describe the services you offer to your customers"}
              onChange={(e) => handleChange("servicesDescription", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Items</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service {index} Title
                  </label>
                  <input
                    type="text"
                    value={customization[`service${index}Title`] || `Service ${index}`}
                    onChange={(e) => handleChange(`service${index}Title`, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service {index} Description
                  </label>
                  <textarea
                    value={customization[`service${index}Description`] || `Description for service ${index}`}
                    onChange={(e) => handleChange(`service${index}Description`, e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Headline
            </label>
            <input
              type="text"
              value={customization.contactHeadline || "Get In Touch"}
              onChange={(e) => handleChange("contactHeadline", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={customization.contactEmail || "info@example.com"}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={customization.contactPhone || "+1 (555) 123-4567"}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={customization.contactAddress || "123 Main Street, City, State 12345"}
              onChange={(e) => handleChange("contactAddress", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const FooterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Footer Content</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Footer Text
            </label>
            <textarea
              value={customization.footerText || "© 2023 Your Business Name. All rights reserved."}
              onChange={(e) => handleChange("footerText", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media Links
              </label>
              <div className="space-y-2">
                <input
                  type="url"
                  placeholder="Facebook URL"
                  value={customization.facebookUrl || ""}
                  onChange={(e) => handleChange("facebookUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="url"
                  placeholder="Twitter URL"
                  value={customization.twitterUrl || ""}
                  onChange={(e) => handleChange("twitterUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  value={customization.instagramUrl || ""}
                  onChange={(e) => handleChange("instagramUrl", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Links
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Privacy Policy"
                  value={customization.privacyPolicy || ""}
                  onChange={(e) => handleChange("privacyPolicy", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Terms of Service"
                  value={customization.termsOfService || ""}
                  onChange={(e) => handleChange("termsOfService", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return <HeroSection />;
      case "about":
        return <AboutSection />;
      case "services":
        return <ServicesSection />;
      case "contact":
        return <ContactSection />;
      case "footer":
        return <FooterSection />;
      default:
        return <HeroSection />;
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

export default ContentEditor;
