import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Users,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Star,
  ChevronDown,
  Camera,
  Heart,
  Share2,
  Filter,
  Grid,
  List,
} from "lucide-react";

const CustomizablePhotographyPortfolioTemplate = ({ customization = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  // Default values with customization overrides
  const config = {
    siteName: customization.siteName || "Photo Studio",
    tagline: customization.tagline || "Capturing Life's Moments",
    primaryColor: customization.primaryColor || "#3B82F6",
    secondaryColor: customization.secondaryColor || "#10B981",
    accentColor: customization.accentColor || "#F59E0B",
    backgroundColor: customization.backgroundColor || "#FFFFFF",
    textColor: customization.textColor || "#1F2937",
    headingFont: customization.headingFont || "Inter",
    bodyFont: customization.bodyFont || "Inter",
    heroTitle: customization.heroTitle || "Professional Photography",
    heroSubtitle:
      customization.heroSubtitle ||
      "Beautiful photography that tells your story and captures precious moments.",
    heroButtonText: customization.heroButtonText || "View Portfolio",
    heroButtonSecondary: customization.heroButtonSecondary || "Book Session",
    heroImage: customization.heroImage || "/api/placeholder/800/600",
    aboutImage: customization.aboutImage || "/api/placeholder/600/400",
    email: customization.email || "hello@photostudio.com",
    phone: customization.phone || "+1 (555) 123-4567",
    address: customization.address || "123 Art District, City, ST 12345",
    twitter: customization.twitter || "https://twitter.com/photostudio",
    linkedin:
      customization.linkedin || "https://linkedin.com/company/photostudio",
    github: customization.github || "https://github.com/photostudio",
    sections: customization.sections || {
      hero: { enabled: true, order: 1 },
      portfolio: { enabled: true, order: 2 },
      about: { enabled: true, order: 3 },
      services: { enabled: true, order: 4 },
      contact: { enabled: true, order: 5 },
    },
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Wedding Photography",
      category: "wedding",
      image: "/api/placeholder/400/300",
      description: "Beautiful wedding moments captured forever",
    },
    {
      id: 2,
      title: "Portrait Session",
      category: "portrait",
      image: "/api/placeholder/400/300",
      description: "Professional portrait photography",
    },
    {
      id: 3,
      title: "Event Photography",
      category: "event",
      image: "/api/placeholder/400/300",
      description: "Corporate and private events",
    },
    {
      id: 4,
      title: "Nature Photography",
      category: "nature",
      image: "/api/placeholder/400/300",
      description: "Stunning natural landscapes",
    },
    {
      id: 5,
      title: "Fashion Shoot",
      category: "fashion",
      image: "/api/placeholder/400/300",
      description: "Creative fashion photography",
    },
    {
      id: 6,
      title: "Family Session",
      category: "family",
      image: "/api/placeholder/400/300",
      description: "Family moments and memories",
    },
  ];

  const services = [
    {
      title: "Wedding Photography",
      description: "Complete wedding day coverage with professional editing.",
      price: "Starting at $2,500",
      features: [
        "Full Day Coverage",
        "Online Gallery",
        "Print Rights",
        "Engagement Session",
      ],
    },
    {
      title: "Portrait Sessions",
      description:
        "Professional portrait photography for individuals and families.",
      price: "Starting at $300",
      features: [
        "1-2 Hour Session",
        "Online Gallery",
        "Print Rights",
        "Professional Editing",
      ],
    },
    {
      title: "Event Photography",
      description: "Corporate events, parties, and special occasions.",
      price: "Starting at $500",
      features: [
        "Event Coverage",
        "Quick Turnaround",
        "Online Gallery",
        "Print Rights",
      ],
    },
  ];

  const categories = [
    "all",
    "wedding",
    "portrait",
    "event",
    "nature",
    "fashion",
    "family",
  ];

  const filteredPortfolio =
    activeCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: config.backgroundColor,
        color: config.textColor,
      }}
    >
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <Camera
                  className="w-8 h-8"
                  style={{ color: config.primaryColor }}
                />
                <div>
                  <h1
                    className="text-2xl font-bold"
                    style={{
                      color: config.primaryColor,
                      fontFamily: config.headingFont,
                    }}
                  >
                    {config.siteName}
                  </h1>
                  <p
                    className="text-sm text-gray-600"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    {config.tagline}
                  </p>
                </div>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#portfolio"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                style={{ fontFamily: config.bodyFont }}
              >
                Portfolio
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                style={{ fontFamily: config.bodyFont }}
              >
                About
              </a>
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                style={{ fontFamily: config.bodyFont }}
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                style={{ fontFamily: config.bodyFont }}
              >
                Contact
              </a>
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {config.sections.hero.enabled && (
        <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1
                  className="text-5xl font-bold mb-6"
                  style={{
                    color: config.textColor,
                    fontFamily: config.headingFont,
                  }}
                >
                  {config.heroTitle}
                </h1>
                <p
                  className="text-xl mb-8"
                  style={{
                    color: config.textColor,
                    fontFamily: config.bodyFont,
                  }}
                >
                  {config.heroSubtitle}
                </p>
                <div className="flex space-x-4">
                  <button
                    className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: config.primaryColor,
                      fontFamily: config.bodyFont,
                    }}
                  >
                    {config.heroButtonText}
                  </button>
                  <button
                    className="px-8 py-3 rounded-lg font-semibold border-2 transition-all hover:shadow-lg"
                    style={{
                      borderColor: config.primaryColor,
                      color: config.primaryColor,
                      fontFamily: config.bodyFont,
                    }}
                  >
                    {config.heroButtonSecondary}
                  </button>
                </div>
              </div>
              <div>
                <img
                  src={config.heroImage}
                  alt="Hero"
                  className="w-full h-96 object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section */}
      {config.sections.portfolio.enabled && (
        <section id="portfolio" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  color: config.textColor,
                  fontFamily: config.headingFont,
                }}
              >
                Portfolio
              </h2>
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: config.bodyFont }}
              >
                A collection of my best work
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === category
                        ? "text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                    style={{
                      backgroundColor:
                        activeCategory === category
                          ? config.primaryColor
                          : "transparent",
                      fontFamily: config.bodyFont,
                    }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolio.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity flex space-x-4">
                        <button className="p-2 bg-white rounded-full">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-2 bg-white rounded-full">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{
                        color: config.textColor,
                        fontFamily: config.headingFont,
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-gray-600"
                      style={{ fontFamily: config.bodyFont }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {config.sections.about.enabled && (
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{
                    color: config.textColor,
                    fontFamily: config.headingFont,
                  }}
                >
                  About Me
                </h2>
                <p
                  className="text-lg mb-6"
                  style={{
                    color: config.textColor,
                    fontFamily: config.bodyFont,
                  }}
                >
                  I am a passionate photographer with over 10 years of
                  experience capturing life&apos;s most precious moments. My
                  goal is to create beautiful, timeless images that tell your
                  unique story.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{
                        color: config.primaryColor,
                        fontFamily: config.headingFont,
                      }}
                    >
                      500+
                    </div>
                    <div
                      className="text-gray-600"
                      style={{ fontFamily: config.bodyFont }}
                    >
                      Sessions Completed
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold mb-2"
                      style={{
                        color: config.primaryColor,
                        fontFamily: config.headingFont,
                      }}
                    >
                      5★
                    </div>
                    <div
                      className="text-gray-600"
                      style={{ fontFamily: config.bodyFont }}
                    >
                      Average Rating
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img
                  src={config.aboutImage}
                  alt="About"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {config.sections.services.enabled && (
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  color: config.textColor,
                  fontFamily: config.headingFont,
                }}
              >
                Services & Pricing
              </h2>
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: config.bodyFont }}
              >
                Professional photography services for every occasion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{
                      color: config.textColor,
                      fontFamily: config.headingFont,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-gray-600 mb-6"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    {service.description}
                  </p>
                  <div
                    className="text-2xl font-bold mb-6"
                    style={{
                      color: config.primaryColor,
                      fontFamily: config.headingFont,
                    }}
                  >
                    {service.price}
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                        style={{ fontFamily: config.bodyFont }}
                      >
                        <CheckCircle
                          className="w-4 h-4 mr-2"
                          style={{ color: config.primaryColor }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {config.sections.contact.enabled && (
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  color: config.textColor,
                  fontFamily: config.headingFont,
                }}
              >
                Let&apos;s Work Together
              </h2>
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: config.bodyFont }}
              >
                Ready to capture your special moments? Get in touch!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail
                      className="w-6 h-6 mr-4"
                      style={{ color: config.primaryColor }}
                    />
                    <span style={{ fontFamily: config.bodyFont }}>
                      {config.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone
                      className="w-6 h-6 mr-4"
                      style={{ color: config.primaryColor }}
                    />
                    <span style={{ fontFamily: config.bodyFont }}>
                      {config.phone}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin
                      className="w-6 h-6 mr-4"
                      style={{ color: config.primaryColor }}
                    />
                    <span style={{ fontFamily: config.bodyFont }}>
                      {config.address}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: config.bodyFont }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: config.bodyFont }}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell me about your photography needs"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{ fontFamily: config.bodyFont }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: config.primaryColor,
                      fontFamily: config.bodyFont,
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Camera
                  className="w-8 h-8"
                  style={{ color: config.primaryColor }}
                />
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: config.headingFont }}
                >
                  {config.siteName}
                </h3>
              </div>
              <p
                className="text-gray-400"
                style={{ fontFamily: config.bodyFont }}
              >
                {config.tagline}
              </p>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: config.headingFont }}
              >
                Services
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    Wedding
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    Portrait
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    Event
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: config.headingFont }}
              >
                Portfolio
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: config.headingFont }}
              >
                Connect
              </h4>
              <div className="flex space-x-4">
                <a
                  href={config.twitter}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href={config.linkedin}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={config.github}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p
              className="text-gray-400"
              style={{ fontFamily: config.bodyFont }}
            >
              © 2024 {config.siteName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomizablePhotographyPortfolioTemplate;
