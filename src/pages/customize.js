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
  Menu,
  RotateCcw,
  Search,
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
  const [showTemplateSwitcher, setShowTemplateSwitcher] = useState(false);

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

  const handleTemplateSwitch = (website) => {
    setSelectedWebsite(website);
    setShowTemplateSwitcher(false);
    // Keep the user in customize mode but with the new template
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </Link>
              <div className="h-6 w-px bg-white/30" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Choose Your Website
                </h1>
                <p className="text-white/70">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToSelection}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Selection</span>
              </button>
              <div className="h-6 w-px bg-white/30" />
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Preview: {selectedWebsite.name}
                </h1>
                <p className="text-sm text-white/70">
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
      <div className="h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4 relative z-10">
          <div className="flex items-center justify-between">
            {/* Left: Back Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => router.push("/templates")}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Templates</span>
              </button>
            </div>

            {/* Center: Title */}
            <div className="flex-1 text-center px-8">
              <h1 className="text-xl font-semibold text-white">
                Customizing: {selectedWebsite.name}
              </h1>
              <p className="text-sm text-white/70">
                Drag and drop to customize your website
              </p>
            </div>

            {/* Right: Actions */}
            <div className="flex-shrink-0 flex items-center space-x-3">
              <button
                onClick={() => setShowTemplateSwitcher(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Menu className="w-4 h-4" />
                <span>Switch Template</span>
              </button>
            </div>
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

        {/* Template Switcher Modal */}
        {showTemplateSwitcher && (
          <TemplateSwitcherModal
            onClose={() => setShowTemplateSwitcher(false)}
            onSelect={handleTemplateSwitch}
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col border border-white/20 overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Choose a Website</h2>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-6 flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search websites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Websites Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Custom Website Option */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              onClick={() =>
                onSelect({
                  id: "custom",
                  name: "Custom Website",
                  category: "custom",
                  description: "Start from scratch with a blank canvas",
                  isCustom: true,
                })
              }
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl ${
                currentWebsite?.id === "custom"
                  ? "border-purple-500 ring-2 ring-purple-400/50 shadow-purple-500/25"
                  : "border-white/20 hover:border-purple-400/50 hover:shadow-purple-500/10"
              }`}
            >
              <div className="h-56 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Settings className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-white font-semibold">Blank Canvas</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Custom Website
                </h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Start from scratch with a blank canvas
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold text-sm bg-green-900/30 px-3 py-1.5 rounded-full">
                    Free
                  </span>
                  <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
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
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onSelect(website)}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl ${
                  currentWebsite?.id === website.id
                    ? "border-purple-500 ring-2 ring-purple-400/50 shadow-purple-500/25"
                    : "border-white/20 hover:border-purple-400/50 hover:shadow-purple-500/10"
                }`}
              >
                {/* Preview Image */}
                <div className="h-56 relative overflow-hidden">
                  <Image
                    src={website.preview}
                    alt={website.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {website.isPremium && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                        Premium
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">
                      {website.category === "saas" && "💻"}
                      {website.category === "portfolio" && "🎨"}
                      {website.category === "restaurant" && "🍽️"}
                      {website.category === "ecommerce" && "🛒"}
                      {website.category === "blog" && "📝"}
                      {website.category === "business" && "💼"}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {website.name}
                    </h3>
                  </div>

                  <p className="text-white/70 text-sm mb-4 leading-relaxed">
                    {website.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`font-semibold text-sm px-3 py-1.5 rounded-full ${
                        website.price === 0
                          ? "text-green-400 bg-green-900/30"
                          : "text-blue-400 bg-blue-900/30"
                      }`}
                    >
                      {website.price === 0 ? "Free" : `$${website.price}`}
                    </span>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                      Use Website →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/20 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-sm">
              Select a website to start building your project
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium backdrop-blur-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const TemplateSwitcherModal = ({ onClose, onSelect, currentWebsite }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWebsites = WEBSITES.filter((website) => {
    const matchesCategory =
      selectedCategory === "all" || website.category === selectedCategory;
    const matchesSearch = website.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    "all",
    ...new Set(WEBSITES.map((website) => website.category)),
  ];

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[85vh] flex flex-col border border-white/20 overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Switch Template
              </h2>
              <p className="text-white/70 text-lg">
                Choose a different template for your website
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-full transition-all duration-300 group"
            >
              <X className="w-6 h-6 text-white group-hover:text-purple-300 transition-colors" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="p-8 border-b border-white/20 bg-white/5">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {category === "all"
                    ? "All"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWebsites.map((website) => (
              <motion.div
                key={website.id}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl ${
                  currentWebsite?.id === website.id
                    ? "border-purple-500 ring-2 ring-purple-400/50 shadow-purple-500/25"
                    : "border-white/20 hover:border-purple-400/50 hover:shadow-purple-500/10"
                }`}
                onClick={() => onSelect(website)}
              >
                {currentWebsite?.id === website.id && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                      Current
                    </span>
                  </div>
                )}

                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={website.preview}
                    alt={website.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-white text-lg mb-3">
                    {website.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {website.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-purple-300 bg-purple-900/30 px-3 py-1.5 rounded-full">
                      {website.category}
                    </span>
                    <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
                      Switch
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/20 bg-gradient-to-r from-purple-600/10 to-blue-600/10">
          <div className="flex items-center justify-between">
            <p className="text-white/70 text-sm">
              Select a template to switch to it immediately
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 font-medium backdrop-blur-sm"
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
