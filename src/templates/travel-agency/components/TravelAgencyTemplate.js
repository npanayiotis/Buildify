import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Search,
  Filter,
  Plane,
  Camera,
  Heart,
} from "lucide-react";

const TravelAgencyTemplate = React.memo(
  ({ customization: externalCustomization = {} }) => {
    const [customization, setCustomization] = useState({
      // Branding
      primaryColor: externalCustomization.primaryColor || "#10B981",
      secondaryColor: externalCustomization.secondaryColor || "#059669",
      accentColor: externalCustomization.accentColor || "#F59E0B",
      textColor: externalCustomization.textColor || "#1F2937",
      backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

      // Content
      siteName: externalCustomization.siteName || "Travel Agency",
      heroTitle:
        externalCustomization.heroTitle || "Discover Amazing Destinations",
      heroSubtitle:
        externalCustomization.heroSubtitle ||
        "Plan your perfect getaway with our curated travel packages",
      heroImage: externalCustomization.heroImage || "",

      // Agency Details
      agencyDescription:
        externalCustomization.agencyDescription ||
        "Your trusted partner for unforgettable travel experiences around the world.",
      contactEmail:
        externalCustomization.contactEmail || "info@travelagency.com",
      phoneNumber: externalCustomization.phoneNumber || "+1 (555) 123-4567",
      address:
        externalCustomization.address ||
        "123 Travel St, Adventure City, AC 12345",

      // Social Links
      social: {
        facebook:
          externalCustomization.social?.facebook ||
          "https://facebook.com/travelagency",
        twitter:
          externalCustomization.social?.twitter ||
          "https://twitter.com/travelagency",
        instagram:
          externalCustomization.social?.instagram ||
          "https://instagram.com/travelagency",
        linkedin:
          externalCustomization.social?.linkedin ||
          "https://linkedin.com/company/travelagency",
      },
    });

    const [packages, setPackages] = useState([]);
    const [featuredPackages, setFeaturedPackages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDestination, setSelectedDestination] = useState("");
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchPackages();
      fetchFeaturedPackages();
      fetchDestinations();
    }, []);

    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/templates/travel-agency/packages");
        const data = await response.json();
        if (data.success) {
          setPackages(data.data);
        }
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeaturedPackages = async () => {
      try {
        const response = await fetch(
          "/api/templates/travel-agency/packages/featured"
        );
        const data = await response.json();
        if (data.success) {
          setFeaturedPackages(data.data);
        }
      } catch (error) {
        console.error("Error fetching featured packages:", error);
      }
    };

    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "/api/templates/travel-agency/packages/destinations"
        );
        const data = await response.json();
        if (data.success) {
          setDestinations(data.data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    const filteredPackages = packages.filter((pkg) => {
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDestination =
        !selectedDestination || pkg.destination === selectedDestination;
      const matchesPrice =
        (!priceRange.min || pkg.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || pkg.price <= parseFloat(priceRange.max));
      return matchesSearch && matchesDestination && matchesPrice;
    });

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">✈️</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Loading Travel Packages...
            </h2>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {customization.siteName}
                </h1>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#packages"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Packages
                </a>
                <a
                  href="#destinations"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Destinations
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {customization.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              Create unforgettable memories with our curated travel experiences
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Packages
            </motion.button>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-6 -mt-16 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Destinations</option>
                    {destinations.map((destination) => (
                      <option key={destination} value={destination}>
                        {destination}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    placeholder="Min price"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    placeholder="Max price"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Packages */}
        {featuredPackages.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Featured Packages
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={pkg.images?.[0] || "/placeholder-travel.jpg"}
                        alt={pkg.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                      <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {pkg.destination}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              {pkg.duration} days
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              Max {pkg.maxTravelers}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">
                            ${pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${pkg.originalPrice}
                            </span>
                          )}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Packages */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              All Travel Packages
            </h2>

            {filteredPackages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No packages found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={pkg.images?.[0] || "/placeholder-travel.jpg"}
                        alt={pkg.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {pkg.isFeatured && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                      <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {pkg.destination}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {pkg.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {pkg.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              {pkg.duration} days
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-gray-500 mr-1" />
                            <span className="text-sm text-gray-600">
                              Max {pkg.maxTravelers}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">
                            ${pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${pkg.originalPrice}
                            </span>
                          )}
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  {customization.siteName}
                </h3>
                <p className="text-gray-400">
                  Your trusted partner for unforgettable travel experiences
                  around the world.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Destinations</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Europe
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Asia
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Americas
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Africa
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Package Tours
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Custom Trips
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Group Travel
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Travel Insurance
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <p>📞 +1 (555) 123-4567</p>
                  <p>✉️ info@travelagency.com</p>
                  <p>📍 123 Travel Street, City, State</p>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 {customization.siteName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
);

TravelAgencyTemplate.displayName = "TravelAgencyTemplate";

export default TravelAgencyTemplate;
