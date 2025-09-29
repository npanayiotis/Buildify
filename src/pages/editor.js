import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Download,
  Settings,
  Palette,
} from "lucide-react";
import GrapesJSEditor from "../components/SAAS/GrapesJSEditor";
import { SAAS_TEMPLATES } from "../lib/saas/templates/templateData";

const EditorPage = () => {
  const router = useRouter();
  const { template: templateId, mode } = router.query;
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  useEffect(() => {
    console.log("Editor page - templateId:", templateId);
    if (templateId && templateId !== "custom") {
      const template = SAAS_TEMPLATES.find((t) => t.id === templateId);
      console.log("Found template:", template);
      if (template) {
        setSelectedTemplate(template);
        console.log("Template set:", template.name);
      } else {
        console.error("Template not found for ID:", templateId);
      }
    } else if (templateId === "custom") {
      setSelectedTemplate({
        id: "custom",
        name: "Custom Page",
        category: "custom",
        description: "Start from scratch with a blank canvas",
        isCustom: true,
      });
    }
    setIsLoading(false);
  }, [templateId]);

  const handleSave = (pageData) => {
    console.log("Page saved:", pageData);
    // Here you would typically save to your database
  };

  const handlePublish = (pageData) => {
    console.log("Page published:", pageData);
    // Here you would typically publish to a live URL
    router.push("/dashboard?published=true");
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowTemplateSelector(false);
    // Update URL without page reload
    router.replace(`/editor?template=${template.id}`, undefined, {
      shallow: true,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Editor
          </h2>
          <p className="text-gray-600 mb-4">
            Setting up your website builder...
          </p>
          <div className="text-sm text-gray-500">
            {selectedTemplate
              ? `Loading ${selectedTemplate.name} template`
              : "Initializing blank canvas"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/templates"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Templates</span>
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {selectedTemplate ? selectedTemplate.name : "Website Editor"}
            </h1>
            <p className="text-sm text-gray-500">
              {selectedTemplate?.description || "Build your website"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowTemplateSelector(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Switch Template</span>
          </button>
        </div>
      </header>

      {/* Main Editor */}
      <div className="flex-1 overflow-hidden">
        {selectedTemplate ? (
          <GrapesJSEditor
            templateData={selectedTemplate}
            onSave={handleSave}
            onPublish={handlePublish}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a Template
              </h3>
              <p className="text-gray-600 mb-6">
                Choose a template to start building your website
              </p>
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Templates
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelectorModal
          onClose={() => setShowTemplateSelector(false)}
          onSelect={handleTemplateSelect}
          currentTemplate={selectedTemplate}
        />
      )}
    </div>
  );
};

const TemplateSelectorModal = ({ onClose, onSelect, currentTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = SAAS_TEMPLATES.filter((template) => {
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "all", name: "All Templates", icon: "🌟" },
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
              Choose a Template
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search templates..."
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

        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Custom Template Option */}
            <motion.div
              whileHover={{ y: -2 }}
              onClick={() =>
                onSelect({
                  id: "custom",
                  name: "Custom Page",
                  category: "custom",
                  description: "Start from scratch with a blank canvas",
                  isCustom: true,
                })
              }
              className={`relative bg-white rounded-lg shadow-sm border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                currentTemplate?.id === "custom"
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
                  Custom Page
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Start from scratch with a blank canvas
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium text-sm">
                    Free
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Use Template →
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Template Options */}
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                onClick={() => onSelect(template)}
                className={`relative bg-white rounded-lg shadow-sm border-2 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  currentTemplate?.id === template.id
                    ? "border-blue-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Preview Image */}
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {template.isPremium && (
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
                      {template.category === "saas" && "💻"}
                      {template.category === "portfolio" && "🎨"}
                      {template.category === "restaurant" && "🍽️"}
                      {template.category === "ecommerce" && "🛒"}
                      {template.category === "blog" && "📝"}
                      {template.category === "business" && "💼"}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {template.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {template.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className={`font-medium text-sm ${
                        template.price === 0
                          ? "text-green-600"
                          : "text-gray-900"
                      }`}
                    >
                      {template.price === 0 ? "Free" : `$${template.price}`}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Use Template →
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
              Select a template to start building your website
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

export default EditorPage;
