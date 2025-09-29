import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  Settings,
  Palette,
  Sparkles,
  Zap,
  Globe,
  Star,
  Crown,
  ChevronRight,
  X,
} from "lucide-react";
import GrapesJSEditor from "../components/SAAS/GrapesJSEditor";
import WebsitePreview from "../components/SAAS/WebsitePreview";
import { WEBSITES } from "../lib/saas/websites/websiteData";

const CustomizePage = () => {
  const router = useRouter();
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWebsiteSelector, setShowWebsiteSelector] = useState(false);
  const [customizationStep, setCustomizationStep] = useState("select");
  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mounting to avoid SSR/hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run on client-side after router is ready
    if (!mounted || !router.isReady) {
      return;
    }

    const { website: queryWebsiteId, preview } = router.query;

    console.log("Processing query params:", { queryWebsiteId, preview });
    console.log(
      "Available websites:",
      WEBSITES.map((w) => ({ id: w.id, name: w.name }))
    );

    if (queryWebsiteId && queryWebsiteId !== "custom") {
      const website = WEBSITES.find((w) => w.id === queryWebsiteId);
      console.log("Found website:", website);
      console.log("Website name:", website?.name);

      if (website) {
        setSelectedWebsite(website);
        setCustomizationStep(preview === "true" ? "preview" : "customize");
        setIsLoading(false);
      } else {
        console.error("Website not found for ID:", queryWebsiteId);
        setIsLoading(false);
      }
    } else if (queryWebsiteId === "custom") {
      setSelectedWebsite({
        id: "custom",
        name: "Custom Website",
        category: "custom",
        description: "Start from scratch with a blank canvas",
        isCustom: true,
      });
      setCustomizationStep("customize");
      setIsLoading(false);
    } else {
      setCustomizationStep("select");
      setIsLoading(false);
    }
  }, [mounted, router.isReady, router.query]);

  const handleSave = (pageData) => {
    console.log("Page saved:", pageData);
    alert("Website saved successfully!");
  };

  const handlePublish = (pageData) => {
    console.log("Page published:", pageData);
    alert("Website published successfully!");
    router.push("/dashboard?published=true");
  };

  const handleWebsiteSelect = (website) => {
    setSelectedWebsite(website);
    setShowWebsiteSelector(false);
    setCustomizationStep("preview");
    router.replace(`/customize?website=${website.id}`, undefined, {
      shallow: true,
    });
  };

  const handleStartCustomizing = () => {
    setCustomizationStep("customize");
  };

  const handleBackToSelection = () => {
    setSelectedWebsite(null);
    setCustomizationStep("select");
    router.replace("/customize", undefined, { shallow: true });
  };

  const handleBackToPreview = () => {
    setCustomizationStep("preview");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Customization
          </h2>
          <p className="text-gray-600 mb-4">
            Setting up your website builder...
          </p>
          {selectedWebsite && (
            <div className="text-sm text-gray-500">
              Loading {selectedWebsite.name}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Website Selection View
  if (customizationStep === "select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Choose Your Website
                </h1>
                <p className="text-gray-600">
                  Select a website and customize it to match your brand
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>Professional Website Builder</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Website
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our collection of professionally designed websites and
              customize them to match your brand perfectly.
            </p>
          </div>

          {/* Website Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Website Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() =>
                handleWebsiteSelect({
                  id: "custom",
                  name: "Custom Website",
                  category: "custom",
                  description: "Start from scratch with a blank canvas",
                  isCustom: true,
                })
              }
              className="relative bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-400"
            >
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Palette className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-gray-600 font-medium text-lg">
                    Blank Canvas
                  </p>
                  <p className="text-gray-500 text-sm">Start from scratch</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Custom Website
                </h3>
                <p className="text-gray-600 mb-4">
                  Start from scratch with a blank canvas and build your website
                  exactly how you want it.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-lg">
                    Free
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Start Building
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Website Options */}
            {WEBSITES.map((website, index) => (
              <motion.div
                key={website.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => handleWebsiteSelect(website)}
                className="relative bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-400"
              >
                {/* Preview Image */}
                <div className="h-64 bg-gray-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={website.preview}
                    alt={website.name}
                    className="w-full h-full object-cover"
                  />
                  {website.isPremium && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Premium
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 hover:opacity-100 bg-white text-gray-900 px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-300">
                      <Eye className="w-4 h-4" />
                      Preview Website
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {website.category === "saas" && "💻"}
                      {website.category === "portfolio" && "🎨"}
                      {website.category === "restaurant" && "🍽️"}
                      {website.category === "ecommerce" && "🛒"}
                      {website.category === "blog" && "📝"}
                      {website.category === "business" && "💼"}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {website.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4">{website.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {website.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                    {website.features.length > 3 && (
                      <span className="bg-gray-50 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
                        +{website.features.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-bold text-lg ${
                          website.price === 0
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {website.price === 0 ? "Free" : `$${website.price}`}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Website Preview View
  if (customizationStep === "preview" && selectedWebsite) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToSelection}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Selection</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Preview: {selectedWebsite.name}
                </h1>
                <p className="text-sm text-gray-500">
                  See how your website will look before customizing
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowWebsiteSelector(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Switch Website</span>
              </button>
              <button
                onClick={handleStartCustomizing}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Palette className="w-4 h-4" />
                <span>Start Customizing</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Website Preview */}
        <div className="bg-white">
          <WebsitePreview website={selectedWebsite} />
        </div>

        {/* Website Selector Modal */}
        {showWebsiteSelector && (
          <WebsiteSelectorModal
            onClose={() => setShowWebsiteSelector(false)}
            onSelect={handleWebsiteSelect}
            currentWebsite={selectedWebsite}
          />
        )}
      </div>
    );
  }

  // Customization View
  if (customizationStep === "customize" && selectedWebsite) {
    return (
      <div className="h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToPreview}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Preview</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Customizing: {selectedWebsite.name}
              </h1>
              <p className="text-sm text-gray-500">
                Drag and drop to customize your website
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowWebsiteSelector(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Switch Website</span>
            </button>
          </div>
        </header>

        {/* Main Editor */}
        <div className="flex-1 overflow-hidden">
          <GrapesJSEditor
            templateData={selectedWebsite}
            onSave={handleSave}
            onPublish={handlePublish}
          />
        </div>

        {/* Website Selector Modal */}
        {showWebsiteSelector && (
          <WebsiteSelectorModal
            onClose={() => setShowWebsiteSelector(false)}
            onSelect={handleWebsiteSelect}
            currentWebsite={selectedWebsite}
          />
        )}
      </div>
    );
  }

  return null;
};

const WebsiteSelectorModal = ({ onClose, onSelect, currentWebsite }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWebsites = WEBSITES.filter((website) => {
    const matchesCategory =
      selectedCategory === "all" || website.category === selectedCategory;
    const matchesSearch =
      website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", name: "All Websites", icon: "🌟" },
    { id: "saas", name: "SaaS", icon: "💻" },
    { id: "portfolio", name: "Portfolio", icon: "🎨" },
    { id: "restaurant", name: "Restaurant", icon: "🍽️" },
    { id: "ecommerce", name: "E-commerce", icon: "🛒" },
    { id: "blog", name: "Blog", icon: "📝" },
    { id: "business", name: "Business", icon: "💼" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Choose a Website
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search websites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Websites Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Custom Website Option */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() =>
                onSelect({
                  id: "custom",
                  name: "Custom Website",
                  category: "custom",
                  description: "Start from scratch with a blank canvas",
                  isCustom: true,
                })
              }
              className={`relative bg-white rounded-lg shadow-sm border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                currentWebsite?.id === "custom"
                  ? "border-blue-500"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Settings className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Blank Canvas</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Custom Website
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Start from scratch with a blank canvas
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-sm">
                    Free
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Use Website →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Website Options */}
            {filteredWebsites.map((website, index) => (
              <motion.div
                key={website.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => onSelect(website)}
                className={`relative bg-white rounded-lg shadow-sm border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  currentWebsite?.id === website.id
                    ? "border-blue-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Preview Image */}
                <div className="h-48 bg-gray-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={website.preview}
                    alt={website.name}
                    className="w-full h-full object-cover"
                  />
                  {website.isPremium && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">
                      {website.category === "saas" && "💻"}
                      {website.category === "portfolio" && "🎨"}
                      {website.category === "restaurant" && "🍽️"}
                      {website.category === "ecommerce" && "🛒"}
                      {website.category === "blog" && "📝"}
                      {website.category === "business" && "💼"}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {website.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {website.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium text-sm ${
                        website.price === 0 ? "text-green-600" : "text-gray-900"
                      }`}
                    >
                      {website.price === 0 ? "Free" : `$${website.price}`}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Use Website →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Select a website to start building your project
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomizePage;
