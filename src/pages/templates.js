import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import TemplateCard from "../components/Templates/TemplateCard";
import { BuildifyLogoWithText } from "../components/Logo/BuildifyLogo";

const Templates = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Business", "Portfolio", "Blog", "E-commerce"];

  const templates = [
    {
      id: 1,
      title: "Tech Startup",
      description:
        "A sleek, modern template for tech startups with services showcase and contact forms.",
      category: "Business",
      templatePath: "/templates/tech-startup",
      features: [
        "Responsive Design",
        "Contact Forms",
        "Service Showcase",
        "Modern UI",
      ],
    },
    {
      id: 2,
      title: "Fashion Boutique",
      description:
        "A stylish template for fashion boutiques with product showcase and e-commerce features.",
      category: "E-commerce",
      templatePath: "/templates/fashion-boutique",
      features: [
        "Product Catalog",
        "Shopping Cart",
        "Newsletter Signup",
        "Social Integration",
      ],
    },
    {
      id: 3,
      title: "Personal Blog",
      description:
        "A clean, minimalist template for personal blogs with article management.",
      category: "Blog",
      templatePath: "/templates/personal-blog",
      features: [
        "Blog Posts",
        "Comments System",
        "Social Sharing",
        "Clean Design",
      ],
    },
    {
      id: 4,
      title: "Restaurant",
      description:
        "A vibrant template for restaurants with menu showcase and reservation system.",
      category: "Business",
      templatePath: "/templates/restaurant",
      features: [
        "Menu Display",
        "Online Reservations",
        "Location Map",
        "Gallery",
      ],
    },
    {
      id: 5,
      title: "Photography Portfolio",
      description:
        "An elegant template for photography portfolios with image galleries.",
      category: "Portfolio",
      templatePath: "/templates/photography-portfolio",
      features: [
        "Image Gallery",
        "Portfolio Showcase",
        "Contact Forms",
        "Responsive",
      ],
    },
    {
      id: 6,
      title: "Consulting Firm",
      description:
        "A professional template for consulting firms with service details.",
      category: "Business",
      templatePath: "/templates/consulting-firm",
      features: [
        "Service Pages",
        "Team Profiles",
        "Case Studies",
        "Professional Design",
      ],
    },
    {
      id: 7,
      title: "Online Store",
      description:
        "A dynamic template for online stores with full e-commerce functionality.",
      category: "E-commerce",
      templatePath: "/templates/online-store-new",
      features: [
        "Product Catalog",
        "Shopping Cart",
        "Payment Integration",
        "Inventory Management",
      ],
    },
    {
      id: 8,
      title: "Travel Agency",
      description:
        "An adventurous template for travel agencies with destination showcases.",
      category: "Business",
      templatePath: "/templates/travel-agency-new",
      features: [
        "Destination Gallery",
        "Booking Forms",
        "Travel Packages",
        "Interactive Maps",
      ],
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCustomizeTemplate = (template) => {
    // Store the selected template in localStorage for the customize page
    localStorage.setItem("selectedTemplate", JSON.stringify(template));
    // Navigate to customize page
    router.push("/customize");
  };

  const handlePreviewTemplate = (template) => {
    // Navigate to the template preview page
    router.push(template.templatePath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <BuildifyLogoWithText size="medium" />
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
                href="/customize"
                className="text-gray-500 hover:text-blue-600 hover:bg-blue-50/50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:shadow-md"
              >
                Customize
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
                New Site
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
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Choose a template
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select a template to start building your website. Each template is
              fully customizable and ready to launch.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">🔍</span>
                </div>
                <input
                  type="text"
                  placeholder="Search templates"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white/80 backdrop-blur-sm shadow-sm"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "gradient-primary text-white shadow-lg glow-blue"
                      : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50/50 border border-gray-300 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onCustomize={handleCustomizeTemplate}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                ←
              </button>
              <button className="px-3 py-2 text-sm font-medium gradient-primary text-white rounded-lg shadow-lg glow-blue">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                2
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                3
              </button>
              <span className="px-3 py-2 text-sm text-gray-500">...</span>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                10
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                →
              </button>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;
