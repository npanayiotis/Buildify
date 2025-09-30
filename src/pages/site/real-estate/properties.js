import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function RealEstatePropertiesPage() {
  const realEstateData = WEBSITES.find(
    (w) => w.id === "real-estate-agency-website"
  );
  const { properties, navigation, footer } = realEstateData.fullWebsite;
  const [filters, setFilters] = useState({
    priceRange: "all",
    propertyType: "all",
    bedrooms: "all",
  });
  const [selectedProperty, setSelectedProperty] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-indigo-600">
              {navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/real-estate${
                    link.href === "/" ? "/properties" : link.href
                  }`}
                  className="text-gray-700 hover:text-indigo-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Browse our exclusive collection of properties in prime locations
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters({ ...filters, priceRange: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Prices</option>
                {properties.filters.priceRange.map((range, i) => (
                  <option key={i} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) =>
                  setFilters({ ...filters, propertyType: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Types</option>
                {properties.filters.propertyType.map((type, i) => (
                  <option key={i} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) =>
                  setFilters({ ...filters, bedrooms: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Any</option>
                {properties.filters.bedrooms.map((bed, i) => (
                  <option key={i} value={bed}>
                    {bed} Bedrooms
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({
                    priceRange: "all",
                    propertyType: "all",
                    bedrooms: "all",
                  })
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.featured.map((property, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedProperty(property)}
              >
                <div className="relative h-64">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white text-indigo-600 px-3 py-1 rounded-lg font-bold">
                    {property.price}
                  </div>
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm">
                    {property.type}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-4 flex items-center gap-1">
                    <span>📍</span> {property.location}
                  </p>

                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span>🛏️ {property.bedrooms} Beds</span>
                    <span>🚿 {property.bathrooms} Baths</span>
                    <span>📐 {property.squareFeet} sqft</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {property.features.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      Agent: {property.agent}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Help Finding a Property?
          </h2>
          <p className="text-xl mb-8 text-indigo-100">
            Our expert agents are ready to assist you
          </p>
          <Link
            href="/site/real-estate/contact"
            className="inline-block bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Contact an Agent
          </Link>
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-96">
              <img
                src={selectedProperty.image}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-white text-gray-700 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-2xl">
                {selectedProperty.price}
              </div>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {selectedProperty.type}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedProperty.title}
                </h2>
                <p className="text-lg text-gray-600 flex items-center gap-2">
                  <span>📍</span> {selectedProperty.location}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">🛏️</div>
                  <div className="font-bold text-gray-900">
                    {selectedProperty.bedrooms}
                  </div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">🚿</div>
                  <div className="font-bold text-gray-900">
                    {selectedProperty.bathrooms}
                  </div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">📐</div>
                  <div className="font-bold text-gray-900">
                    {selectedProperty.squareFeet}
                  </div>
                  <div className="text-sm text-gray-600">Square Feet</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-1">🏠</div>
                  <div className="font-bold text-gray-900">
                    {selectedProperty.type}
                  </div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Property Features
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedProperty.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-indigo-600">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-gray-900 mb-2">Listing Agent</h4>
                <p className="text-gray-700">{selectedProperty.agent}</p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/site/real-estate/contact"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  Schedule Viewing
                </Link>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">{footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
