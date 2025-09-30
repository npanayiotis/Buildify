import { useState } from "react";
import Link from "next/link";
import { WEBSITES, WEBSITE_CATEGORIES } from "../lib/saas/websites/websiteData";

export default function PreviewSelector() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredWebsites = WEBSITES.filter((website) => {
    return selectedCategory === "all" || website.category === selectedCategory;
  });

  const websiteRoutes = {
    "professional-blog-website": "/site/blog/home",
    "elegant-restaurant-website": "/site/restaurant/menu",
    "fitness-gym-website": "/site/gym/programs",
    "law-office-website": "/site/law/services",
    "creative-portfolio-website": "/site/portfolio/portfolio",
    "real-estate-agency-website": "/site/real-estate/properties",
    "medical-practice-website": "/site/medical/services",
    "photography-studio-website": "/site/photography/portfolio",
  };

  const getColorClasses = (category) => {
    const colors = {
      blog: "from-blue-600 to-indigo-700 border-blue-200",
      restaurant: "from-red-600 to-amber-600 border-red-200",
      gym: "from-green-600 to-teal-700 border-green-200",
      law: "from-blue-700 to-gray-800 border-blue-200",
      portfolio: "from-purple-600 to-pink-600 border-purple-200",
      "real-estate": "from-indigo-600 to-blue-700 border-indigo-200",
      medical: "from-blue-600 to-green-600 border-green-200",
      photography: "from-pink-600 to-purple-700 border-pink-200",
    };
    return colors[category] || colors.blog;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Preview All 8 Websites
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              See live demos of all fully functional websites
            </p>
            <div className="flex justify-center gap-8">
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">{WEBSITES.length}</div>
                <div className="text-sm">Templates Available</div>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm">Functional</div>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">19</div>
                <div className="text-sm">Live Pages</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
              }`}
            >
              All Templates ({WEBSITES.length})
            </button>
            {WEBSITE_CATEGORIES.map((category) => {
              const count = WEBSITES.filter(
                (w) => w.category === category.id
              ).length;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  {category.icon} {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Websites Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWebsites.map((website) => {
            const liveRoute = websiteRoutes[website.id];
            const hasLivePage = !!liveRoute;

            return (
              <div
                key={website.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group"
              >
                {/* Preview Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={website.preview}
                    alt={website.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {website.isPremium && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      👑 Premium
                    </div>
                  )}
                  {hasLivePage && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ✅ Live Pages
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {website.name}
                    </h3>
                    <span className="text-lg font-bold text-green-600">
                      {website.price === 0 ? "Free" : `$${website.price}`}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {website.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium capitalize">
                      {website.category}
                    </span>
                    {hasLivePage && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Live Demo
                      </span>
                    )}
                    {website.tags.slice(0, 2).map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Features Preview */}
                  <div className="mb-4 space-y-1">
                    {website.features.slice(0, 3).map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-gray-600"
                      >
                        <span className="text-blue-500">✓</span>
                        <span>{feature.title || feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {hasLivePage ? (
                      <Link
                        href={liveRoute}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold transition text-center"
                      >
                        View Live Demo
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex-1 bg-gray-300 text-gray-500 px-4 py-3 rounded-lg font-semibold text-center cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    )}
                    <Link
                      href={`/customize?website=${website.id}`}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-semibold transition text-center"
                    >
                      Customize
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              All websites are fully functional and ready to customize
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/templates"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Browse Templates
              </Link>
              <Link
                href="/all-websites"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                All Websites Index
              </Link>
              <Link
                href="/dashboard"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
