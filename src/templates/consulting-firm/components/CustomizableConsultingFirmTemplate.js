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
  Briefcase,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";

const CustomizableConsultingFirmTemplate = ({ customization = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  // Default values with customization overrides
  const config = {
    siteName: customization.siteName || "Strategic Consulting",
    tagline: customization.tagline || "Expert Business Solutions",
    primaryColor: customization.primaryColor || "#3B82F6",
    secondaryColor: customization.secondaryColor || "#10B981",
    accentColor: customization.accentColor || "#F59E0B",
    backgroundColor: customization.backgroundColor || "#FFFFFF",
    textColor: customization.textColor || "#1F2937",
    headingFont: customization.headingFont || "Inter",
    bodyFont: customization.bodyFont || "Inter",
    heroTitle: customization.heroTitle || "Strategic Business Consulting",
    heroSubtitle:
      customization.heroSubtitle ||
      "We help businesses grow and succeed with expert consulting services.",
    heroButtonText: customization.heroButtonText || "Get Started",
    heroButtonSecondary: customization.heroButtonSecondary || "Learn More",
    heroImage: customization.heroImage || "/api/placeholder/800/600",
    aboutImage: customization.aboutImage || "/api/placeholder/600/400",
    email: customization.email || "hello@consulting.com",
    phone: customization.phone || "+1 (555) 123-4567",
    address: customization.address || "123 Business District, City, ST 12345",
    twitter: customization.twitter || "https://twitter.com/consulting",
    linkedin:
      customization.linkedin || "https://linkedin.com/company/consulting",
    github: customization.github || "https://github.com/consulting",
    sections: customization.sections || {
      hero: { enabled: true, order: 1 },
      services: { enabled: true, order: 2 },
      about: { enabled: true, order: 3 },
      team: { enabled: true, order: 4 },
      contact: { enabled: true, order: 5 },
    },
  };

  const services = [
    {
      title: "Business Strategy",
      description:
        "Strategic planning and business development consulting to drive growth.",
      icon: "🎯",
      features: [
        "Market Analysis",
        "Strategic Planning",
        "Business Development",
        "Growth Strategy",
      ],
    },
    {
      title: "Operations Consulting",
      description:
        "Optimize your business processes and improve operational efficiency.",
      icon: "⚙️",
      features: [
        "Process Optimization",
        "Efficiency Analysis",
        "Workflow Design",
        "Performance Metrics",
      ],
    },
    {
      title: "Financial Advisory",
      description:
        "Expert financial guidance to help you make informed business decisions.",
      icon: "💰",
      features: [
        "Financial Planning",
        "Investment Analysis",
        "Risk Assessment",
        "Budget Optimization",
      ],
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Senior Partner",
      image: "/api/placeholder/300/300",
      bio: "15+ years in strategic consulting",
    },
    {
      name: "Michael Chen",
      role: "Operations Director",
      image: "/api/placeholder/300/300",
      bio: "Expert in process optimization",
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Advisor",
      image: "/api/placeholder/300/300",
      bio: "CFA with 12 years experience",
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      company: "TechCorp",
      content:
        "Strategic Consulting transformed our business with their expert guidance.",
      rating: 5,
    },
    {
      name: "Jane Doe",
      company: "StartupXYZ",
      content: "Outstanding consulting team. Highly recommend their services.",
      rating: 5,
    },
  ];

  const customStyles = {
    "--primary-color": config.primaryColor,
    "--secondary-color": config.secondaryColor,
    "--accent-color": config.accentColor,
    "--background-color": config.backgroundColor,
    "--text-color": config.textColor,
    "--heading-font": config.headingFont,
    "--body-font": config.bodyFont,
  };

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
                <Briefcase
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
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                style={{ fontFamily: config.bodyFont }}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                style={{ fontFamily: config.bodyFont }}
              >
                About
              </a>
              <a
                href="#team"
                className="text-gray-700 hover:text-blue-600 transition-colors"
                style={{ fontFamily: config.bodyFont }}
              >
                Team
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
                Our Services
              </h2>
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: config.bodyFont }}
              >
                Expert consulting services to help your business succeed
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5 }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
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
                  About Our Firm
                </h2>
                <p
                  className="text-lg mb-6"
                  style={{
                    color: config.textColor,
                    fontFamily: config.bodyFont,
                  }}
                >
                  We are a leading consulting firm with over 20 years of
                  experience helping businesses achieve their strategic goals.
                  Our team of experts provides comprehensive consulting services
                  across various industries.
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
                      Projects Completed
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
                      98%
                    </div>
                    <div
                      className="text-gray-600"
                      style={{ fontFamily: config.bodyFont }}
                    >
                      Client Satisfaction
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

      {/* Team Section */}
      {config.sections.team.enabled && (
        <section id="team" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  color: config.textColor,
                  fontFamily: config.headingFont,
                }}
              >
                Our Team
              </h2>
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: config.bodyFont }}
              >
                Meet our experienced consulting professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{
                      color: config.textColor,
                      fontFamily: config.headingFont,
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-gray-600 mb-2"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-sm text-gray-500"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    {member.bio}
                  </p>
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
                Get In Touch
              </h2>
              <p
                className="text-xl text-gray-600"
                style={{ fontFamily: config.bodyFont }}
              >
                Ready to start your next project? Let&apos;s talk!
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
                      placeholder="Your Message"
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
                <Briefcase
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
                    Strategy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    Operations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: config.bodyFont }}
                  >
                    Finance
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: config.headingFont }}
              >
                Company
              </h4>
              <ul className="space-y-2">
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
                    Team
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

export default CustomizableConsultingFirmTemplate;
