import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Star, Crown, Eye, Palette } from "lucide-react";
import WebsiteCard from "../components/SAAS/WebsiteCard";
import { WEBSITES, WEBSITE_CATEGORIES } from "../lib/saas/websites/websiteData";

const TemplatesPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");

  const filteredWebsites = WEBSITES.filter((website) => {
    const matchesCategory =
      selectedCategory === "all" || website.category === selectedCategory;
    const matchesSearch =
      website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      website.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  const sortedWebsites = [...filteredWebsites].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "popular":
      default:
        return a.isPremium ? 1 : -1;
    }
  });

  const handleWebsiteSelect = (website) => {
    // Navigate to customize page with website selection
    console.log("Navigating to customize page with website:", website);
    console.log("Website ID:", website.id);
    console.log("Website name:", website.name);
    router.push(`/customize?website=${website.id}`);
  };

  const handleWebsitePreview = (website) => {
    // Open preview in new tab
    window.open(`/customize?website=${website.id}&preview=true`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow-blue">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Buildify
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
              >
                Dashboard
              </Link>
              <Link
                href="/templates"
                className="gradient-primary text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg glow-blue"
              >
                Templates
              </Link>
              <Link
                href="/pricing"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
              >
                Pricing
              </Link>
              <Link
                href="/help"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
              >
                Help
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg glow-blue transition-all duration-300 hover:scale-105">
                Start Building
              </button>
              <div className="w-8 h-8 gradient-secondary rounded-full flex items-center justify-center glow-purple">
                <span className="text-sm font-medium text-white">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Choose Your Perfect Website
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional websites designed for every business. Preview and
              customize with our drag-and-drop builder.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between"
          >
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search websites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === "all"
                      ? "gradient-primary text-white shadow-lg glow-blue"
                      : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50/50 border border-gray-300 hover:shadow-md"
                  }`}
                >
                  All
                </button>
                {WEBSITE_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "gradient-primary text-white shadow-lg glow-blue"
                        : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50/50 border border-gray-300 hover:shadow-md"
                    }`}
                  >
                    {category.icon} {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white/80 backdrop-blur-sm"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>

              <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-300">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col gap-0.5">
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                    <div className="bg-current h-1 rounded-sm"></div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Websites Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${searchQuery}-${sortBy}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {sortedWebsites.map((website, index) => (
                <motion.div
                  key={website.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WebsiteCard
                    website={website}
                    viewMode={viewMode}
                    onSelect={handleWebsiteSelect}
                    onPreview={handleWebsitePreview}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {sortedWebsites.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Palette className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No websites found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          >
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {WEBSITES.length}+
              </div>
              <div className="text-gray-600">Professional Websites</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                100%
              </div>
              <div className="text-gray-600">Customizable</div>
            </div>
            <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TemplatesPage;
