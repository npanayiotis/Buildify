import React, { useState } from "react";

const LivePreview = ({ customization }) => {
  const [previewMode, setPreviewMode] = useState("desktop"); // desktop, tablet, mobile
  const [activeSection, setActiveSection] = useState("hero");

  const previewModes = [
    { id: "desktop", label: "Desktop", icon: "🖥️", width: "100%" },
    { id: "tablet", label: "Tablet", icon: "📱", width: "768px" },
    { id: "mobile", label: "Mobile", icon: "📱", width: "375px" }
  ];

  const sections = [
    { id: "hero", label: "Hero" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
    { id: "footer", label: "Footer" }
  ];

  const HeroPreview = () => (
    <div 
      className="relative min-h-screen flex items-center justify-center text-center"
      style={{ 
        backgroundColor: customization.backgroundColor || "#FFFFFF",
        padding: `${customization.sectionPadding || 64}px 0`
      }}
    >
      {customization.heroImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${customization.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {customization.logo && (
          <img 
            src={customization.logo} 
            alt="Logo" 
            className="mx-auto mb-8"
            style={{ height: `${customization.logoHeight || 64}px` }}
          />
        )}
        <h1 
          className="mb-6"
          style={{
            fontFamily: customization.headingFont,
            color: customization.primaryColor,
            fontSize: customization.headingSize === "xl" ? "3rem" :
                     customization.headingSize === "2xl" ? "3.5rem" :
                     customization.headingSize === "3xl" ? "4rem" : "4.5rem"
          }}
        >
          {customization.heroHeadline || "Welcome to Our Business"}
        </h1>
        <p 
          className="mb-8 text-xl"
          style={{
            fontFamily: customization.bodyFont,
            color: customization.textColor || "#1F2937",
            fontSize: customization.bodySize === "sm" ? "1rem" :
                     customization.bodySize === "base" ? "1.125rem" :
                     customization.bodySize === "lg" ? "1.25rem" : "1.375rem"
          }}
        >
          {customization.heroSubheadline || "We provide exceptional services to help your business grow"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            className="px-8 py-3 text-white font-medium"
            style={{ 
              backgroundColor: customization.primaryColor,
              borderRadius: `${customization.buttonRadius || 8}px`
            }}
          >
            {customization.heroPrimaryButton || "Get Started"}
          </button>
          <button 
            className="px-8 py-3 font-medium border-2"
            style={{ 
              borderColor: customization.primaryColor,
              color: customization.primaryColor,
              borderRadius: `${customization.buttonRadius || 8}px`
            }}
          >
            {customization.heroSecondaryButton || "Learn More"}
          </button>
        </div>
      </div>
    </div>
  );

  const AboutPreview = () => (
    <div 
      className="py-16"
      style={{ 
        backgroundColor: customization.backgroundColor || "#FFFFFF",
        padding: `${customization.sectionPadding || 64}px 0`
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 
              className="mb-6"
              style={{
                fontFamily: customization.headingFont,
                color: customization.primaryColor,
                fontSize: customization.headingSize === "xl" ? "2.5rem" :
                         customization.headingSize === "2xl" ? "3rem" :
                         customization.headingSize === "3xl" ? "3.5rem" : "4rem"
              }}
            >
              {customization.aboutHeadline || "About Us"}
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{
                fontFamily: customization.bodyFont,
                color: customization.textColor || "#1F2937",
                fontSize: customization.bodySize === "sm" ? "1rem" :
                         customization.bodySize === "base" ? "1.125rem" :
                         customization.bodySize === "lg" ? "1.25rem" : "1.375rem"
              }}
            >
              {customization.aboutDescription || "Tell your story and what makes your business unique"}
            </p>
          </div>
          {customization.aboutImage && (
            <div>
              <img 
                src={customization.aboutImage} 
                alt="About" 
                className="w-full rounded-lg shadow-lg"
                style={{ borderRadius: `${customization.cardRadius || 12}px` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ServicesPreview = () => (
    <div 
      className="py-16"
      style={{ 
        backgroundColor: customization.backgroundColor || "#F9FAFB",
        padding: `${customization.sectionPadding || 64}px 0`
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 
            className="mb-4"
            style={{
              fontFamily: customization.headingFont,
              color: customization.primaryColor,
              fontSize: customization.headingSize === "xl" ? "2.5rem" :
                       customization.headingSize === "2xl" ? "3rem" :
                       customization.headingSize === "3xl" ? "3.5rem" : "4rem"
            }}
          >
            {customization.servicesHeadline || "Our Services"}
          </h2>
          <p 
            className="text-lg"
            style={{
              fontFamily: customization.bodyFont,
              color: customization.textColor || "#1F2937",
              fontSize: customization.bodySize === "sm" ? "1rem" :
                       customization.bodySize === "base" ? "1.125rem" :
                       customization.bodySize === "lg" ? "1.25rem" : "1.375rem"
            }}
          >
            {customization.servicesDescription || "Describe the services you offer to your customers"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-lg shadow-sm"
              style={{ 
                borderRadius: `${customization.cardRadius || 12}px`,
                marginBottom: `${customization.elementSpacing || 24}px`
              }}
            >
              <h3 
                className="mb-4"
                style={{
                  fontFamily: customization.headingFont,
                  color: customization.primaryColor,
                  fontSize: "1.5rem"
                }}
              >
                {customization[`service${index}Title`] || `Service ${index}`}
              </h3>
              <p 
                style={{
                  fontFamily: customization.bodyFont,
                  color: customization.textColor || "#1F2937",
                  fontSize: customization.bodySize === "sm" ? "0.875rem" :
                           customization.bodySize === "base" ? "1rem" :
                           customization.bodySize === "lg" ? "1.125rem" : "1.25rem"
                }}
              >
                {customization[`service${index}Description`] || `Description for service ${index}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ContactPreview = () => (
    <div 
      className="py-16"
      style={{ 
        backgroundColor: customization.backgroundColor || "#FFFFFF",
        padding: `${customization.sectionPadding || 64}px 0`
      }}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 
          className="mb-8"
          style={{
            fontFamily: customization.headingFont,
            color: customization.primaryColor,
            fontSize: customization.headingSize === "xl" ? "2.5rem" :
                     customization.headingSize === "2xl" ? "3rem" :
                     customization.headingSize === "3xl" ? "3.5rem" : "4rem"
          }}
        >
          {customization.contactHeadline || "Get In Touch"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl mb-4">📧</div>
            <h3 
              className="mb-2"
              style={{
                fontFamily: customization.headingFont,
                color: customization.primaryColor
              }}
            >
              Email
            </h3>
            <p 
              style={{
                fontFamily: customization.bodyFont,
                color: customization.textColor || "#1F2937"
              }}
            >
              {customization.contactEmail || "info@example.com"}
            </p>
          </div>
          <div>
            <div className="text-4xl mb-4">📞</div>
            <h3 
              className="mb-2"
              style={{
                fontFamily: customization.headingFont,
                color: customization.primaryColor
              }}
            >
              Phone
            </h3>
            <p 
              style={{
                fontFamily: customization.bodyFont,
                color: customization.textColor || "#1F2937"
              }}
            >
              {customization.contactPhone || "+1 (555) 123-4567"}
            </p>
          </div>
          <div>
            <div className="text-4xl mb-4">📍</div>
            <h3 
              className="mb-2"
              style={{
                fontFamily: customization.headingFont,
                color: customization.primaryColor
              }}
            >
              Address
            </h3>
            <p 
              style={{
                fontFamily: customization.bodyFont,
                color: customization.textColor || "#1F2937"
              }}
            >
              {customization.contactAddress || "123 Main Street, City, State 12345"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const FooterPreview = () => (
    <div 
      className="py-8"
      style={{ 
        backgroundColor: customization.primaryColor,
        padding: `${customization.sectionPadding || 32}px 0`
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center text-white">
          <p 
            className="mb-4"
            style={{
              fontFamily: customization.bodyFont,
              fontSize: customization.bodySize === "sm" ? "0.875rem" :
                       customization.bodySize === "base" ? "1rem" :
                       customization.bodySize === "lg" ? "1.125rem" : "1.25rem"
            }}
          >
            {customization.footerText || "© 2023 Your Business Name. All rights reserved."}
          </p>
          <div className="flex justify-center space-x-6">
            {customization.facebookUrl && (
              <a href={customization.facebookUrl} className="text-white hover:text-gray-300">
                Facebook
              </a>
            )}
            {customization.twitterUrl && (
              <a href={customization.twitterUrl} className="text-white hover:text-gray-300">
                Twitter
              </a>
            )}
            {customization.instagramUrl && (
              <a href={customization.instagramUrl} className="text-white hover:text-gray-300">
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return <HeroPreview />;
      case "about":
        return <AboutPreview />;
      case "services":
        return <ServicesPreview />;
      case "contact":
        return <ContactPreview />;
      case "footer":
        return <FooterPreview />;
      default:
        return <HeroPreview />;
    }
  };

  const currentMode = previewModes.find(mode => mode.id === previewMode);

  return (
    <div className="space-y-6">
      {/* Preview Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {previewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setPreviewMode(mode.id)}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  previewMode === mode.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{mode.icon}</span>
                {mode.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div 
          className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
          style={{ 
            width: currentMode.width,
            maxWidth: "100%"
          }}
        >
          {renderSection()}
        </div>
      </div>

      {/* Preview Info */}
      <div className="text-center text-sm text-gray-500">
        Live preview • Changes update in real-time • {currentMode.label} view
      </div>
    </div>
  );
};

export default LivePreview;
