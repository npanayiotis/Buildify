import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Type,
  Image,
  Layout,
  Settings,
  Eye,
  Save,
  Download,
  Undo,
  Redo,
  Plus,
  Trash2,
  Move,
  Edit3,
} from "lucide-react";

// Dynamically import all templates for customization
const TechStartupTemplate = dynamic(
  () => import("../pages/templates/tech-startup"),
  { ssr: false }
);

const ConsultingFirmTemplate = dynamic(
  () => import("../pages/templates/consulting-firm"),
  { ssr: false }
);

const PhotographyPortfolioTemplate = dynamic(
  () => import("../pages/templates/photography-portfolio"),
  { ssr: false }
);

const RestaurantTemplate = dynamic(
  () => import("../pages/templates/restaurant"),
  { ssr: false }
);

const PersonalBlogTemplate = dynamic(
  () => import("../pages/templates/personal-blog"),
  { ssr: false }
);

const FashionBoutiqueTemplate = dynamic(
  () => import("../pages/templates/fashion-boutique"),
  { ssr: false }
);

const OnlineStoreTemplate = dynamic(
  () => import("../pages/templates/online-store-new"),
  { ssr: false }
);

const TravelAgencyTemplate = dynamic(
  () => import("../pages/templates/travel-agency-new"),
  { ssr: false }
);

const Customize = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState("design");
  const [availableTemplates] = useState([
    { id: 1, name: "Tech Startup", type: "tech-startup" },
    { id: 2, name: "Consulting Firm", type: "consulting-firm" },
    { id: 3, name: "Photography Portfolio", type: "photography-portfolio" },
    { id: 4, name: "Restaurant", type: "restaurant" },
    { id: 5, name: "Personal Blog", type: "personal-blog" },
    { id: 6, name: "Fashion Boutique", type: "fashion-boutique" },
    { id: 7, name: "Online Store", type: "online-store" },
    { id: 8, name: "Travel Agency", type: "travel-agency" },
  ]);
  const [customization, setCustomization] = useState({
    // Branding
    logo: "",
    favicon: "",
    siteName: "TechStart",
    tagline: "Building the Future",

    // Colors
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    accentColor: "#F59E0B",
    backgroundColor: "#FFFFFF",
    textColor: "#1F2937",

    // Typography
    headingFont: "Inter",
    bodyFont: "Inter",
    fontSize: "16px",

    // Layout
    headerStyle: "default",
    footerStyle: "default",

    // Content
    heroTitle: "Revolutionary Technology Solutions",
    heroSubtitle:
      "We build innovative software that transforms businesses and creates lasting impact.",
    heroButtonText: "Get Started",
    heroButtonSecondary: "Learn More",

    // Images
    heroImage: "/api/placeholder/800/600",
    aboutImage: "/api/placeholder/600/400",

    // Contact
    email: "hello@techstart.com",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, Tech City, TC 12345",
    contactEmail: "hello@techstart.com",
    phoneNumber: "+1 (555) 123-4567",
    description:
      "We build innovative software that transforms businesses and creates lasting impact.",

    // Social
    social: {
      facebook: "https://facebook.com/techstart",
      twitter: "https://twitter.com/techstart",
      instagram: "https://instagram.com/techstart",
      linkedin: "https://linkedin.com/company/techstart",
      github: "https://github.com/techstart",
    },

    // Sections
    sections: {
      hero: { enabled: true, order: 1 },
      services: { enabled: true, order: 2 },
      about: { enabled: true, order: 3 },
      team: { enabled: true, order: 4 },
      contact: { enabled: true, order: 5 },
    },
  });

  const [history, setHistory] = useState([customization]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState({});
  const debounceTimeoutRef = useRef(null);

  // Load selected template from localStorage
  useEffect(() => {
    const templateData = localStorage.getItem("selectedTemplate");
    if (templateData) {
      const template = JSON.parse(templateData);
      setSelectedTemplate(template);
      initializeCustomizationForTemplate(template);
    }
  }, []);

  // Initialize customization for a specific template
  const initializeCustomizationForTemplate = (template) => {
    if (template.id === 1) {
      // Tech Startup
      setCustomization((prev) => ({
        ...prev,
        siteName: "TechStart",
        tagline: "Building the Future",
        heroTitle: "Revolutionary Technology Solutions",
        heroSubtitle:
          "We build innovative software that transforms businesses and creates lasting impact.",
        description:
          "We build innovative software that transforms businesses and creates lasting impact.",
        contactEmail: "hello@techstart.com",
        phoneNumber: "+1 (555) 123-4567",
        address: "123 Innovation Drive, Tech City, TC 12345",
        social: {
          facebook: "https://facebook.com/techstart",
          twitter: "https://twitter.com/techstart",
          instagram: "https://instagram.com/techstart",
          linkedin: "https://linkedin.com/company/techstart",
        },
      }));
    } else if (template.id === 2) {
      // Consulting Firm
      setCustomization((prev) => ({
        ...prev,
        siteName: "Strategic Consulting",
        tagline: "Expert Business Solutions",
        heroTitle: "Strategic Business Consulting",
        heroSubtitle:
          "We help businesses grow and succeed with expert consulting services.",
        description:
          "We help businesses grow and succeed with expert consulting services.",
        contactEmail: "info@strategicconsulting.com",
        phoneNumber: "+1 (555) 234-5678",
        address: "456 Business Ave, Corporate City, CC 23456",
        social: {
          facebook: "https://facebook.com/strategicconsulting",
          twitter: "https://twitter.com/strategicconsulting",
          instagram: "https://instagram.com/strategicconsulting",
          linkedin: "https://linkedin.com/company/strategicconsulting",
        },
      }));
    } else if (template.id === 3) {
      // Photography Portfolio
      setCustomization((prev) => ({
        ...prev,
        siteName: "Photo Studio",
        tagline: "Capturing Life's Moments",
        heroTitle: "Professional Photography",
        heroSubtitle:
          "Beautiful photography that tells your story and captures precious moments.",
        description:
          "Beautiful photography that tells your story and captures precious moments.",
        contactEmail: "hello@photostudio.com",
        phoneNumber: "+1 (555) 345-6789",
        address: "789 Art District, Creative City, CC 34567",
        social: {
          facebook: "https://facebook.com/photostudio",
          twitter: "https://twitter.com/photostudio",
          instagram: "https://instagram.com/photostudio",
          linkedin: "https://linkedin.com/company/photostudio",
        },
      }));
    } else if (template.id === 4) {
      // Restaurant
      setCustomization((prev) => ({
        ...prev,
        siteName: "Bella Vista",
        tagline: "Fine Dining Experience",
        heroTitle: "Welcome to Bella Vista",
        heroSubtitle:
          "Experience exceptional cuisine in an elegant atmosphere.",
        description: "Experience exceptional cuisine in an elegant atmosphere.",
        contactEmail: "reservations@bellavista.com",
        phoneNumber: "+1 (555) 456-7890",
        address: "321 Culinary Street, Food City, FC 45678",
        social: {
          facebook: "https://facebook.com/bellavista",
          twitter: "https://twitter.com/bellavista",
          instagram: "https://instagram.com/bellavista",
          linkedin: "https://linkedin.com/company/bellavista",
        },
      }));
    } else if (template.id === 5) {
      // Personal Blog
      setCustomization((prev) => ({
        ...prev,
        siteName: "My Blog",
        tagline: "Thoughts and Stories",
        heroTitle: "Welcome to My Blog",
        heroSubtitle:
          "Sharing thoughts, experiences, and stories from my journey.",
        description:
          "Sharing thoughts, experiences, and stories from my journey.",
        contactEmail: "hello@myblog.com",
        phoneNumber: "+1 (555) 567-8901",
        address: "654 Writer's Lane, Story City, SC 56789",
        social: {
          facebook: "https://facebook.com/myblog",
          twitter: "https://twitter.com/myblog",
          instagram: "https://instagram.com/myblog",
          linkedin: "https://linkedin.com/company/myblog",
        },
      }));
    } else if (template.id === 6) {
      // Fashion Boutique
      setCustomization((prev) => ({
        ...prev,
        siteName: "Style Boutique",
        tagline: "Fashion Forward",
        heroTitle: "Discover Your Style",
        heroSubtitle:
          "Curated fashion pieces that express your unique personality.",
        description:
          "Curated fashion pieces that express your unique personality.",
        contactEmail: "info@styleboutique.com",
        phoneNumber: "+1 (555) 678-9012",
        address: "987 Fashion Avenue, Style City, SC 67890",
        social: {
          facebook: "https://facebook.com/styleboutique",
          twitter: "https://twitter.com/styleboutique",
          instagram: "https://instagram.com/styleboutique",
          linkedin: "https://linkedin.com/company/styleboutique",
        },
      }));
    } else if (template.id === 7) {
      // Online Store
      setCustomization((prev) => ({
        ...prev,
        siteName: "My Store",
        tagline: "Quality Products",
        heroTitle: "Welcome to Our Store",
        heroSubtitle:
          "Discover amazing products at great prices with fast shipping.",
        description:
          "Discover amazing products at great prices with fast shipping.",
        contactEmail: "support@mystore.com",
        phoneNumber: "+1 (555) 789-0123",
        address: "147 Commerce Street, Business City, BC 78901",
        social: {
          facebook: "https://facebook.com/mystore",
          twitter: "https://twitter.com/mystore",
          instagram: "https://instagram.com/mystore",
          linkedin: "https://linkedin.com/company/mystore",
        },
      }));
    } else if (template.id === 8) {
      // Travel Agency
      setCustomization((prev) => ({
        ...prev,
        siteName: "Adventure Travel",
        tagline: "Explore the World",
        heroTitle: "Your Next Adventure Awaits",
        heroSubtitle:
          "Discover amazing destinations and create unforgettable memories.",
        description:
          "Discover amazing destinations and create unforgettable memories.",
        contactEmail: "info@adventuretravel.com",
        phoneNumber: "+1 (555) 890-1234",
        address: "258 Adventure Road, Travel City, TC 89012",
        social: {
          facebook: "https://facebook.com/adventuretravel",
          twitter: "https://twitter.com/adventuretravel",
          instagram: "https://instagram.com/adventuretravel",
          linkedin: "https://linkedin.com/company/adventuretravel",
        },
      }));
    }
  };

  // Template selector function
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    initializeCustomizationForTemplate(template);
  };

  const tabs = [
    { id: "design", label: "Design", icon: Palette },
    { id: "content", label: "Content", icon: Type },
    { id: "layout", label: "Layout", icon: Layout },
    { id: "media", label: "Media", icon: Image },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Debounced update function with better performance
  const debouncedUpdate = useCallback(
    (key, value) => {
      setCustomization((prev) => {
        const newCustomization = {
          ...prev,
          [key]: value,
        };

        // Add to history
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newCustomization);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setPendingChanges({});

        return newCustomization;
      });
    },
    [history, historyIndex]
  );

  const handleChange = useCallback(
    (key, value) => {
      // Update pending changes immediately for UI responsiveness
      setPendingChanges((prev) => ({ ...prev, [key]: value }));

      // Clear existing timeout
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      // Set new timeout for debounced update
      debounceTimeoutRef.current = setTimeout(() => {
        debouncedUpdate(key, value);
      }, 500); // Increased to 500ms for better performance
    },
    [debouncedUpdate]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Inject custom styles for template customization
  useEffect(() => {
    const mergedCustomization = { ...customization, ...pendingChanges };
    const styleId = "customization-styles";
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = `
      .customizable-template * {
        --primary-color: ${mergedCustomization.primaryColor} !important;
        --secondary-color: ${mergedCustomization.secondaryColor} !important;
        --accent-color: ${mergedCustomization.accentColor} !important;
        --background-color: ${mergedCustomization.backgroundColor} !important;
        --text-color: ${mergedCustomization.textColor} !important;
        --heading-font: ${mergedCustomization.headingFont} !important;
        --body-font: ${mergedCustomization.bodyFont} !important;
      }
      
      .customizable-template .bg-blue-600,
      .customizable-template .bg-blue-500,
      .customizable-template .text-blue-600,
      .customizable-template .border-blue-600,
      .customizable-template .hover\\:bg-blue-700:hover,
      .customizable-template .hover\\:bg-blue-600:hover {
        background-color: ${mergedCustomization.primaryColor} !important;
        color: ${mergedCustomization.primaryColor} !important;
        border-color: ${mergedCustomization.primaryColor} !important;
      }
      
      .customizable-template .bg-green-500,
      .customizable-template .bg-green-600,
      .customizable-template .text-green-600,
      .customizable-template .border-green-600,
      .customizable-template .hover\\:bg-green-600:hover {
        background-color: ${mergedCustomization.secondaryColor} !important;
        color: ${mergedCustomization.secondaryColor} !important;
        border-color: ${mergedCustomization.secondaryColor} !important;
      }
      
      .customizable-template .bg-yellow-500,
      .customizable-template .bg-orange-500,
      .customizable-template .text-yellow-600,
      .customizable-template .text-orange-600,
      .customizable-template .border-yellow-600,
      .customizable-template .border-orange-600 {
        background-color: ${mergedCustomization.accentColor} !important;
        color: ${mergedCustomization.accentColor} !important;
        border-color: ${mergedCustomization.accentColor} !important;
      }
      
      .customizable-template .bg-white,
      .customizable-template .bg-gray-50,
      .customizable-template .bg-gray-100 {
        background-color: ${mergedCustomization.backgroundColor} !important;
      }
      
      .customizable-template .text-gray-900,
      .customizable-template .text-gray-800,
      .customizable-template .text-gray-700,
      .customizable-template .text-gray-600 {
        color: ${mergedCustomization.textColor} !important;
      }
      
      .customizable-template h1,
      .customizable-template h2,
      .customizable-template h3,
      .customizable-template h4,
      .customizable-template h5,
      .customizable-template h6,
      .customizable-template .text-4xl,
      .customizable-template .text-3xl,
      .customizable-template .text-2xl,
      .customizable-template .text-xl,
      .customizable-template .text-lg {
        font-family: ${mergedCustomization.headingFont} !important;
      }
      
      .customizable-template body,
      .customizable-template p,
      .customizable-template span,
      .customizable-template div,
      .customizable-template a,
      .customizable-template button,
      .customizable-template input,
      .customizable-template textarea {
        font-family: ${mergedCustomization.bodyFont} !important;
      }
    `;
  }, [customization, pendingChanges]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCustomization(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCustomization(history[historyIndex + 1]);
    }
  };

  const handleSave = () => {
    localStorage.setItem("customization", JSON.stringify(customization));
    alert("Customization saved!");
  };

  const handlePublish = () => {
    // Here you would typically save to database and deploy
    alert("Website published successfully!");
  };

  const ColorPicker = ({ label, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>
    </div>
  );

  const FontSelector = ({ label, value, onChange }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
      >
        <option value="Inter">Inter</option>
        <option value="Roboto">Roboto</option>
        <option value="Open Sans">Open Sans</option>
        <option value="Lato">Lato</option>
        <option value="Montserrat">Montserrat</option>
        <option value="Poppins">Poppins</option>
      </select>
    </div>
  );

  const TextInput = ({
    label,
    value,
    onChange,
    multiline = false,
    fieldKey,
  }) => {
    const currentValue =
      pendingChanges[fieldKey] !== undefined ? pendingChanges[fieldKey] : value;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
        {multiline ? (
          <textarea
            value={currentValue}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
          />
        ) : (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
        )}
      </div>
    );
  };

  const SectionToggle = ({ label, enabled, onChange }) => (
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-gray-700">{label}</span>
      <button
        onClick={() => onChange(!enabled)}
        className={`w-10 h-6 rounded-full transition-colors ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  const DesignTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Brand Colors
        </h3>
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
        <ColorPicker
          label="Accent Color"
          value={customization.accentColor}
          onChange={(value) => handleChange("accentColor", value)}
        />
        <ColorPicker
          label="Background Color"
          value={customization.backgroundColor}
          onChange={(value) => handleChange("backgroundColor", value)}
        />
        <ColorPicker
          label="Text Color"
          value={customization.textColor}
          onChange={(value) => handleChange("textColor", value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
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
  );

  const ContentTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Site Information
        </h3>
        <TextInput
          label="Site Name"
          value={customization.siteName}
          onChange={(value) => handleChange("siteName", value)}
          fieldKey="siteName"
        />
        <TextInput
          label="Tagline"
          value={customization.tagline}
          onChange={(value) => handleChange("tagline", value)}
          fieldKey="tagline"
        />
        <TextInput
          label="Description"
          value={customization.description}
          onChange={(value) => handleChange("description", value)}
          multiline
          fieldKey="description"
        />
        <TextInput
          label="Contact Email"
          value={customization.contactEmail}
          onChange={(value) => handleChange("contactEmail", value)}
          fieldKey="contactEmail"
        />
        <TextInput
          label="Phone Number"
          value={customization.phoneNumber}
          onChange={(value) => handleChange("phoneNumber", value)}
          fieldKey="phoneNumber"
        />
        <TextInput
          label="Address"
          value={customization.address}
          onChange={(value) => handleChange("address", value)}
          multiline
          fieldKey="address"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Hero Section
        </h3>
        <TextInput
          label="Hero Title"
          value={customization.heroTitle}
          onChange={(value) => handleChange("heroTitle", value)}
          fieldKey="heroTitle"
        />
        <TextInput
          label="Hero Subtitle"
          value={customization.heroSubtitle}
          onChange={(value) => handleChange("heroSubtitle", value)}
          multiline
          fieldKey="heroSubtitle"
        />
        <TextInput
          label="Primary Button Text"
          value={customization.heroButtonText}
          onChange={(value) => handleChange("heroButtonText", value)}
          fieldKey="heroButtonText"
        />
        <TextInput
          label="Secondary Button Text"
          value={customization.heroButtonSecondary}
          onChange={(value) => handleChange("heroButtonSecondary", value)}
          fieldKey="heroButtonSecondary"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Information
        </h3>
        <TextInput
          label="Email"
          value={customization.email}
          onChange={(value) => handleChange("email", value)}
          fieldKey="email"
        />
        <TextInput
          label="Phone"
          value={customization.phone}
          onChange={(value) => handleChange("phone", value)}
          fieldKey="phone"
        />
        <TextInput
          label="Address"
          value={customization.address}
          onChange={(value) => handleChange("address", value)}
          multiline
          fieldKey="address"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Social Media Links
        </h3>
        <TextInput
          label="Facebook URL"
          value={customization.social?.facebook || ""}
          onChange={(value) =>
            handleChange("social", {
              ...customization.social,
              facebook: value,
            })
          }
          fieldKey="social.facebook"
        />
        <TextInput
          label="Twitter URL"
          value={customization.social?.twitter || ""}
          onChange={(value) =>
            handleChange("social", {
              ...customization.social,
              twitter: value,
            })
          }
          fieldKey="social.twitter"
        />
        <TextInput
          label="Instagram URL"
          value={customization.social?.instagram || ""}
          onChange={(value) =>
            handleChange("social", {
              ...customization.social,
              instagram: value,
            })
          }
          fieldKey="social.instagram"
        />
        <TextInput
          label="LinkedIn URL"
          value={customization.social?.linkedin || ""}
          onChange={(value) =>
            handleChange("social", {
              ...customization.social,
              linkedin: value,
            })
          }
          fieldKey="social.linkedin"
        />
      </div>

      {/* Template-specific customization sections */}
      {selectedTemplate?.id === 1 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Tech Startup - Services
          </h3>
          <TextInput
            label="Service 1"
            value={customization.service1 || ""}
            onChange={(value) => handleChange("service1", value)}
            fieldKey="service1"
          />
          <TextInput
            label="Service 1 Description"
            value={customization.service1Desc || ""}
            onChange={(value) => handleChange("service1Desc", value)}
            multiline
            fieldKey="service1Desc"
          />
          <TextInput
            label="Service 2"
            value={customization.service2 || ""}
            onChange={(value) => handleChange("service2", value)}
            fieldKey="service2"
          />
          <TextInput
            label="Service 2 Description"
            value={customization.service2Desc || ""}
            onChange={(value) => handleChange("service2Desc", value)}
            multiline
            fieldKey="service2Desc"
          />
        </div>
      )}

      {selectedTemplate?.id === 2 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Consulting Firm - Services
          </h3>
          <TextInput
            label="Service 1"
            value={customization.service1 || ""}
            onChange={(value) => handleChange("service1", value)}
            fieldKey="service1"
          />
          <TextInput
            label="Service 1 Description"
            value={customization.service1Desc || ""}
            onChange={(value) => handleChange("service1Desc", value)}
            multiline
            fieldKey="service1Desc"
          />
          <TextInput
            label="Service 2"
            value={customization.service2 || ""}
            onChange={(value) => handleChange("service2", value)}
            fieldKey="service2"
          />
          <TextInput
            label="Service 2 Description"
            value={customization.service2Desc || ""}
            onChange={(value) => handleChange("service2Desc", value)}
            multiline
            fieldKey="service2Desc"
          />
        </div>
      )}

      {selectedTemplate?.id === 3 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Photography Portfolio - Featured Work
          </h3>
          <TextInput
            label="Work 1 Title"
            value={customization.work1 || ""}
            onChange={(value) => handleChange("work1", value)}
            fieldKey="work1"
          />
          <TextInput
            label="Work 1 Description"
            value={customization.work1Desc || ""}
            onChange={(value) => handleChange("work1Desc", value)}
            multiline
            fieldKey="work1Desc"
          />
          <TextInput
            label="Work 2 Title"
            value={customization.work2 || ""}
            onChange={(value) => handleChange("work2", value)}
            fieldKey="work2"
          />
          <TextInput
            label="Work 2 Description"
            value={customization.work2Desc || ""}
            onChange={(value) => handleChange("work2Desc", value)}
            multiline
            fieldKey="work2Desc"
          />
        </div>
      )}

      {selectedTemplate?.id === 4 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Restaurant - Menu Items
          </h3>
          <TextInput
            label="Dish 1"
            value={customization.dish1 || ""}
            onChange={(value) => handleChange("dish1", value)}
            fieldKey="dish1"
          />
          <TextInput
            label="Dish 1 Price"
            value={customization.dish1Price || ""}
            onChange={(value) => handleChange("dish1Price", value)}
            fieldKey="dish1Price"
          />
          <TextInput
            label="Dish 1 Description"
            value={customization.dish1Desc || ""}
            onChange={(value) => handleChange("dish1Desc", value)}
            multiline
            fieldKey="dish1Desc"
          />
          <TextInput
            label="Dish 2"
            value={customization.dish2 || ""}
            onChange={(value) => handleChange("dish2", value)}
            fieldKey="dish2"
          />
          <TextInput
            label="Dish 2 Price"
            value={customization.dish2Price || ""}
            onChange={(value) => handleChange("dish2Price", value)}
            fieldKey="dish2Price"
          />
          <TextInput
            label="Dish 2 Description"
            value={customization.dish2Desc || ""}
            onChange={(value) => handleChange("dish2Desc", value)}
            multiline
            fieldKey="dish2Desc"
          />
        </div>
      )}

      {selectedTemplate?.id === 5 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Blog - Recent Posts
          </h3>
          <TextInput
            label="Post 1 Title"
            value={customization.post1 || ""}
            onChange={(value) => handleChange("post1", value)}
            fieldKey="post1"
          />
          <TextInput
            label="Post 1 Date"
            value={customization.post1Date || ""}
            onChange={(value) => handleChange("post1Date", value)}
            fieldKey="post1Date"
          />
          <TextInput
            label="Post 1 Excerpt"
            value={customization.post1Excerpt || ""}
            onChange={(value) => handleChange("post1Excerpt", value)}
            multiline
            fieldKey="post1Excerpt"
          />
          <TextInput
            label="Post 2 Title"
            value={customization.post2 || ""}
            onChange={(value) => handleChange("post2", value)}
            fieldKey="post2"
          />
          <TextInput
            label="Post 2 Date"
            value={customization.post2Date || ""}
            onChange={(value) => handleChange("post2Date", value)}
            fieldKey="post2Date"
          />
          <TextInput
            label="Post 2 Excerpt"
            value={customization.post2Excerpt || ""}
            onChange={(value) => handleChange("post2Excerpt", value)}
            multiline
            fieldKey="post2Excerpt"
          />
        </div>
      )}

      {selectedTemplate?.id === 6 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fashion Boutique - Products
          </h3>
          <TextInput
            label="Product 1"
            value={customization.product1 || ""}
            onChange={(value) => handleChange("product1", value)}
            fieldKey="product1"
          />
          <TextInput
            label="Product 1 Price"
            value={customization.product1Price || ""}
            onChange={(value) => handleChange("product1Price", value)}
            fieldKey="product1Price"
          />
          <TextInput
            label="Product 1 Description"
            value={customization.product1Desc || ""}
            onChange={(value) => handleChange("product1Desc", value)}
            multiline
            fieldKey="product1Desc"
          />
          <TextInput
            label="Product 2"
            value={customization.product2 || ""}
            onChange={(value) => handleChange("product2", value)}
            fieldKey="product2"
          />
          <TextInput
            label="Product 2 Price"
            value={customization.product2Price || ""}
            onChange={(value) => handleChange("product2Price", value)}
            fieldKey="product2Price"
          />
          <TextInput
            label="Product 2 Description"
            value={customization.product2Desc || ""}
            onChange={(value) => handleChange("product2Desc", value)}
            multiline
            fieldKey="product2Desc"
          />
        </div>
      )}

      {selectedTemplate?.id === 7 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Online Store - Store Details
          </h3>
          <TextInput
            label="Store Description"
            value={customization.storeDescription || ""}
            onChange={(value) => handleChange("storeDescription", value)}
            multiline
            fieldKey="storeDescription"
          />
          <TextInput
            label="Contact Email"
            value={customization.contactEmail || ""}
            onChange={(value) => handleChange("contactEmail", value)}
            fieldKey="contactEmail"
          />
          <TextInput
            label="Phone Number"
            value={customization.phoneNumber || ""}
            onChange={(value) => handleChange("phoneNumber", value)}
            fieldKey="phoneNumber"
          />
          <TextInput
            label="Address"
            value={customization.address || ""}
            onChange={(value) => handleChange("address", value)}
            multiline
            fieldKey="address"
          />
        </div>
      )}

      {selectedTemplate?.id === 8 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Travel Agency - Agency Details
          </h3>
          <TextInput
            label="Agency Description"
            value={customization.agencyDescription || ""}
            onChange={(value) => handleChange("agencyDescription", value)}
            multiline
            fieldKey="agencyDescription"
          />
          <TextInput
            label="Contact Email"
            value={customization.contactEmail || ""}
            onChange={(value) => handleChange("contactEmail", value)}
            fieldKey="contactEmail"
          />
          <TextInput
            label="Phone Number"
            value={customization.phoneNumber || ""}
            onChange={(value) => handleChange("phoneNumber", value)}
            fieldKey="phoneNumber"
          />
          <TextInput
            label="Address"
            value={customization.address || ""}
            onChange={(value) => handleChange("address", value)}
            multiline
            fieldKey="address"
          />
        </div>
      )}
    </div>
  );

  const LayoutTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Page Sections
        </h3>
        <SectionToggle
          label="Hero Section"
          enabled={customization.sections.hero.enabled}
          onChange={(enabled) =>
            handleChange("sections", {
              ...customization.sections,
              hero: { ...customization.sections.hero, enabled },
            })
          }
        />
        <SectionToggle
          label="Services Section"
          enabled={customization.sections.services.enabled}
          onChange={(enabled) =>
            handleChange("sections", {
              ...customization.sections,
              services: { ...customization.sections.services, enabled },
            })
          }
        />
        <SectionToggle
          label="About Section"
          enabled={customization.sections.about.enabled}
          onChange={(enabled) =>
            handleChange("sections", {
              ...customization.sections,
              about: { ...customization.sections.about, enabled },
            })
          }
        />
        <SectionToggle
          label="Team Section"
          enabled={customization.sections.team.enabled}
          onChange={(enabled) =>
            handleChange("sections", {
              ...customization.sections,
              team: { ...customization.sections.team, enabled },
            })
          }
        />
        <SectionToggle
          label="Contact Section"
          enabled={customization.sections.contact.enabled}
          onChange={(enabled) =>
            handleChange("sections", {
              ...customization.sections,
              contact: { ...customization.sections.contact, enabled },
            })
          }
        />
      </div>
    </div>
  );

  const MediaTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hero Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Image
              className="w-8 h-8 text-gray-400 mx-auto mb-2"
              alt="Upload icon"
            />
            <p className="text-sm text-gray-500">Click to upload hero image</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) =>
                    handleChange("heroImage", e.target.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            About Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Image
              className="w-8 h-8 text-gray-400 mx-auto mb-2"
              alt="Upload icon"
            />
            <p className="text-sm text-gray-500">Click to upload about image</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) =>
                    handleChange("aboutImage", e.target.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          SEO Settings
        </h3>
        <TextInput
          label="Meta Title"
          value={customization.siteName}
          onChange={(value) => handleChange("siteName", value)}
          fieldKey="siteName"
        />
        <TextInput
          label="Meta Description"
          value={customization.tagline}
          onChange={(value) => handleChange("tagline", value)}
          multiline
          fieldKey="tagline"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Social Links
        </h3>
        <TextInput
          label="Twitter URL"
          value={customization.twitter}
          onChange={(value) => handleChange("twitter", value)}
          fieldKey="twitter"
        />
        <TextInput
          label="LinkedIn URL"
          value={customization.linkedin}
          onChange={(value) => handleChange("linkedin", value)}
          fieldKey="linkedin"
        />
        <TextInput
          label="GitHub URL"
          value={customization.github}
          onChange={(value) => handleChange("github", value)}
          fieldKey="github"
        />
      </div>
    </div>
  );

  // Memoized template renderer component with stable key
  const MemoizedTemplateRenderer = React.memo(
    ({ selectedTemplate, customization, pendingChanges }) => {
      if (!selectedTemplate) return null;

      const mergedCustomization = { ...customization, ...pendingChanges };

      return (
        <div
          className="min-h-screen customizable-template"
          style={{
            backgroundColor: mergedCustomization.backgroundColor,
            color: mergedCustomization.textColor,
            fontFamily: mergedCustomization.bodyFont,
          }}
        >
          {selectedTemplate.id === 1 && (
            <TechStartupTemplate
              key={`tech-startup-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
          {selectedTemplate.id === 2 && (
            <ConsultingFirmTemplate
              key={`consulting-firm-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
          {selectedTemplate.id === 3 && (
            <PhotographyPortfolioTemplate
              key={`photography-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
          {selectedTemplate.id === 4 && (
            <RestaurantTemplate
              key={`restaurant-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
          {selectedTemplate.id === 5 && (
            <PersonalBlogTemplate
              key={`blog-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
          {selectedTemplate.id === 6 && (
            <FashionBoutiqueTemplate
              key={`fashion-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
          {selectedTemplate.id === 7 && (
            <OnlineStoreTemplate
              key={`store-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
          {selectedTemplate.id === 8 && (
            <TravelAgencyTemplate
              key={`travel-${selectedTemplate.id}`}
              customization={mergedCustomization}
            />
          )}
        </div>
      );
    },
    // Custom comparison function to prevent unnecessary re-renders
    (prevProps, nextProps) => {
      // Only re-render if the template ID changes or if there are significant customization changes
      if (prevProps.selectedTemplate?.id !== nextProps.selectedTemplate?.id) {
        return false;
      }

      // For the same template, only re-render if customization actually changed
      const prevCustomization = {
        ...prevProps.customization,
        ...prevProps.pendingChanges,
      };
      const nextCustomization = {
        ...nextProps.customization,
        ...nextProps.pendingChanges,
      };

      // Compare only the essential customization properties
      const essentialProps = [
        "primaryColor",
        "secondaryColor",
        "accentColor",
        "backgroundColor",
        "textColor",
        "siteName",
        "tagline",
        "heroTitle",
        "heroSubtitle",
      ];

      for (const prop of essentialProps) {
        if (prevCustomization[prop] !== nextCustomization[prop]) {
          return false;
        }
      }

      return true; // Props are the same, don't re-render
    }
  );

  MemoizedTemplateRenderer.displayName = "MemoizedTemplateRenderer";

  const renderTabContent = () => {
    if (!selectedTemplate) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <Settings className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Select a Template
          </h3>
          <p className="text-sm text-gray-500">
            Choose a template from the dropdown above to start customizing
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case "design":
        return <DesignTab />;
      case "content":
        return <ContentTab />;
      case "layout":
        return <LayoutTab />;
      case "media":
        return <MediaTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DesignTab />;
    }
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Template Selected
          </h2>
          <p className="text-gray-500 mb-4">
            Please select a template to customize
          </p>
          <Link
            href="/templates"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Choose Template
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/templates"
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back to Templates
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">
                Customizing: {selectedTemplate.name}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <Redo className="w-4 h-4" />
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isPreviewMode
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>{isPreviewMode ? "Customize Mode" : "Preview Mode"}</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handlePublish}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                <Download className="w-4 h-4" />
                <span>Publish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar - Customization Panel */}
        {!isPreviewMode && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            className="w-80 bg-white shadow-sm border-r border-gray-200 min-h-screen"
          >
            <div className="p-6">
              {/* Template Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Template to Customize
                </label>
                <select
                  value={selectedTemplate?.id || ""}
                  onChange={(e) => {
                    const templateId = parseInt(e.target.value);
                    const template = availableTemplates.find(
                      (t) => t.id === templateId
                    );
                    if (template) {
                      handleTemplateSelect(template);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a template...</option>
                  {availableTemplates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Template Info */}
              {selectedTemplate && (
                <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-blue-900 mb-1">
                    Currently Customizing: {selectedTemplate.name}
                  </h3>
                  <p className="text-xs text-blue-700">
                    All changes will be applied to this template
                  </p>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-white text-blue-600 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Right Content - Full Template Preview */}
        <div className="flex-1 relative">
          {/* Full Template with Customization Overlay */}
          <div className="h-screen overflow-auto">
            {!selectedTemplate ? (
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-gray-400 mb-4">
                    <Eye className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No Template Selected
                  </h3>
                  <p className="text-gray-500">
                    Choose a template from the sidebar to see the preview
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Customization Overlay Controls */}
                {!isPreviewMode && (
                  <div className="absolute top-4 right-4 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-3">
                        <Settings className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Quick Customize
                        </span>
                      </div>

                      {/* Quick Color Picker */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <label className="text-xs text-gray-600">
                            Primary:
                          </label>
                          <input
                            type="color"
                            value={customization.primaryColor}
                            onChange={(e) =>
                              handleChange("primaryColor", e.target.value)
                            }
                            className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label className="text-xs text-gray-600">
                            Secondary:
                          </label>
                          <input
                            type="color"
                            value={customization.secondaryColor}
                            onChange={(e) =>
                              handleChange("secondaryColor", e.target.value)
                            }
                            className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <label className="text-xs text-gray-600">
                            Background:
                          </label>
                          <input
                            type="color"
                            value={customization.backgroundColor}
                            onChange={(e) =>
                              handleChange("backgroundColor", e.target.value)
                            }
                            className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Full Template Rendering */}
                <MemoizedTemplateRenderer
                  selectedTemplate={selectedTemplate}
                  customization={customization}
                  pendingChanges={pendingChanges}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
