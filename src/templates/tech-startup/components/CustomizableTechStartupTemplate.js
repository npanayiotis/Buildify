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
  ChevronDown
} from "lucide-react";

const CustomizableTechStartupTemplate = ({ customization = {} }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  // Default values with customization overrides
  const config = {
    siteName: customization.siteName || "TechStart",
    tagline: customization.tagline || "Building the Future",
    primaryColor: customization.primaryColor || "#3B82F6",
    secondaryColor: customization.secondaryColor || "#10B981",
    accentColor: customization.accentColor || "#F59E0B",
    backgroundColor: customization.backgroundColor || "#FFFFFF",
    textColor: customization.textColor || "#1F2937",
    headingFont: customization.headingFont || "Inter",
    bodyFont: customization.bodyFont || "Inter",
    heroTitle: customization.heroTitle || "Revolutionary Technology Solutions",
    heroSubtitle: customization.heroSubtitle || "We build innovative software that transforms businesses and creates lasting impact.",
    heroButtonText: customization.heroButtonText || "Get Started",
    heroButtonSecondary: customization.heroButtonSecondary || "Learn More",
    heroImage: customization.heroImage || "/api/placeholder/800/600",
    aboutImage: customization.aboutImage || "/api/placeholder/600/400",
    email: customization.email || "hello@techstart.com",
    phone: customization.phone || "+1 (555) 123-4567",
    address: customization.address || "123 Innovation Drive, Tech City, TC 12345",
    twitter: customization.twitter || "https://twitter.com/techstart",
    linkedin: customization.linkedin || "https://linkedin.com/company/techstart",
    github: customization.github || "https://github.com/techstart",
    sections: customization.sections || {
      hero: { enabled: true, order: 1 },
      services: { enabled: true, order: 2 },
      about: { enabled: true, order: 3 },
      team: { enabled: true, order: 4 },
      contact: { enabled: true, order: 5 }
    }
  };

  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices.",
      icon: "🌐",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Integration"]
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      icon: "📱",
      features: ["React Native", "iOS Development", "Android Development", "App Store Deployment"]
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment solutions for your business.",
      icon: "☁️",
      features: ["AWS & Azure", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoring & Analytics"]
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/api/placeholder/300/300",
      bio: "10+ years in tech leadership"
    },
    {
      name: "Mike Chen",
      role: "CTO",
      image: "/api/placeholder/300/300",
      bio: "Full-stack developer and architect"
    },
    {
      name: "Emily Rodriguez",
      role: "Lead Designer",
      image: "/api/placeholder/300/300",
      bio: "UX/UI specialist with creative vision"
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      company: "TechCorp",
      content: "TechStart transformed our business with their innovative solutions.",
      rating: 5
    },
    {
      name: "Jane Doe",
      company: "StartupXYZ",
      content: "Outstanding development team. Highly recommend their services.",
      rating: 5
    }
  ];

  const customStyles = {
    '--primary-color': config.primaryColor,
    '--secondary-color': config.secondaryColor,
    '--accent-color': config.accentColor,
    '--background-color': config.backgroundColor,
    '--text-color': config.textColor,
    '--heading-font': config.headingFont,
    '--body-font': config.bodyFont
  };

  return (
    <div style={{...customStyles, backgroundColor: config.backgroundColor, color: config.textColor}} className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: config.primaryColor }}>
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold" style={{ color: config.textColor }}>
                {config.siteName}
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:opacity-80 transition-opacity" style={{ color: config.textColor }}>
                Home
              </a>
              <a href="#services" className="hover:opacity-80 transition-opacity" style={{ color: config.textColor }}>
                Services
              </a>
              <a href="#about" className="hover:opacity-80 transition-opacity" style={{ color: config.textColor }}>
                About
              </a>
              <a href="#team" className="hover:opacity-80 transition-opacity" style={{ color: config.textColor }}>
                Team
              </a>
              <a href="#contact" className="hover:opacity-80 transition-opacity" style={{ color: config.textColor }}>
                Contact
              </a>
              <button 
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: config.primaryColor }}
              >
                Get Started
              </button>
            </nav>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {config.sections.hero.enabled && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 
                  className="text-4xl md:text-6xl font-bold mb-6"
                  style={{ color: config.textColor, fontFamily: config.headingFont }}
                >
                  {config.heroTitle}
                </h1>
                <p 
                  className="text-xl mb-8 opacity-80"
                  style={{ color: config.textColor, fontFamily: config.bodyFont }}
                >
                  {config.heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    className="px-8 py-4 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: config.primaryColor }}
                  >
                    {config.heroButtonText}
                  </button>
                  <button 
                    className="px-8 py-4 rounded-lg border-2 font-semibold hover:opacity-80 transition-opacity"
                    style={{ 
                      borderColor: config.primaryColor, 
                      color: config.primaryColor,
                      backgroundColor: 'transparent'
                    }}
                  >
                    {config.heroButtonSecondary}
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <img
                  src={config.heroImage}
                  alt="Hero"
                  className="w-full h-96 object-cover rounded-lg shadow-2xl"
                />
                <div 
                  className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-2xl"
                  style={{ backgroundColor: config.accentColor }}
                >
                  🚀
                </div>
              </motion.div>
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
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: config.textColor, fontFamily: config.headingFont }}
              >
                Our Services
              </h2>
              <p 
                className="text-xl opacity-80 max-w-2xl mx-auto"
                style={{ color: config.textColor, fontFamily: config.bodyFont }}
              >
                We provide comprehensive technology solutions to help your business grow and succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setActiveService(index)}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 
                    className="text-xl font-semibold mb-4"
                    style={{ color: config.textColor, fontFamily: config.headingFont }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="mb-6 opacity-80"
                    style={{ color: config.textColor, fontFamily: config.bodyFont }}
                  >
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle 
                          className="w-5 h-5 mr-3 flex-shrink-0" 
                          style={{ color: config.secondaryColor }}
                        />
                        <span 
                          className="text-sm"
                          style={{ color: config.textColor, fontFamily: config.bodyFont }}
                        >
                          {feature}
                        </span>
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
        <section id="about" className="py-20" style={{ backgroundColor: config.backgroundColor === '#FFFFFF' ? '#F9FAFB' : 'rgba(0,0,0,0.05)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 
                  className="text-3xl md:text-4xl font-bold mb-6"
                  style={{ color: config.textColor, fontFamily: config.headingFont }}
                >
                  About {config.siteName}
                </h2>
                <p 
                  className="text-lg mb-6 opacity-80"
                  style={{ color: config.textColor, fontFamily: config.bodyFont }}
                >
                  {config.tagline}
                </p>
                <p 
                  className="text-lg mb-8 opacity-80"
                  style={{ color: config.textColor, fontFamily: config.bodyFont }}
                >
                  We are a team of passionate developers, designers, and innovators dedicated to creating 
                  cutting-edge technology solutions. With years of experience in the industry, we help 
                  businesses transform their ideas into reality.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: config.primaryColor, fontFamily: config.headingFont }}
                    >
                      50+
                    </div>
                    <div 
                      className="text-sm opacity-80"
                      style={{ color: config.textColor, fontFamily: config.bodyFont }}
                    >
                      Projects Completed
                    </div>
                  </div>
                  <div>
                    <div 
                      className="text-3xl font-bold mb-2"
                      style={{ color: config.primaryColor, fontFamily: config.headingFont }}
                    >
                      5+
                    </div>
                    <div 
                      className="text-sm opacity-80"
                      style={{ color: config.textColor, fontFamily: config.bodyFont }}
                    >
                      Years Experience
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={config.aboutImage}
                  alt="About"
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </motion.div>
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
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: config.textColor, fontFamily: config.headingFont }}
              >
                Meet Our Team
              </h2>
              <p 
                className="text-xl opacity-80 max-w-2xl mx-auto"
                style={{ color: config.textColor, fontFamily: config.bodyFont }}
              >
                The talented individuals behind our success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg"
                    />
                    <div 
                      className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: config.accentColor }}
                    >
                      👨‍💻
                    </div>
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: config.textColor, fontFamily: config.headingFont }}
                  >
                    {member.name}
                  </h3>
                  <p 
                    className="text-lg mb-2 opacity-80"
                    style={{ color: config.primaryColor, fontFamily: config.bodyFont }}
                  >
                    {member.role}
                  </p>
                  <p 
                    className="text-sm opacity-80"
                    style={{ color: config.textColor, fontFamily: config.bodyFont }}
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
        <section id="contact" className="py-20" style={{ backgroundColor: config.backgroundColor === '#FFFFFF' ? '#F9FAFB' : 'rgba(0,0,0,0.05)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: config.textColor, fontFamily: config.headingFont }}
              >
                Get In Touch
              </h2>
              <p 
                className="text-xl opacity-80 max-w-2xl mx-auto"
                style={{ color: config.textColor, fontFamily: config.bodyFont }}
              >
                Ready to start your next project? Let&apos;s talk!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ color: config.textColor, fontFamily: config.headingFont }}
                      >
                        Email
                      </h3>
                      <p 
                        className="opacity-80"
                        style={{ color: config.textColor, fontFamily: config.bodyFont }}
                      >
                        {config.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ color: config.textColor, fontFamily: config.headingFont }}
                      >
                        Phone
                      </h3>
                      <p 
                        className="opacity-80"
                        style={{ color: config.textColor, fontFamily: config.bodyFont }}
                      >
                        {config.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ color: config.textColor, fontFamily: config.headingFont }}
                      >
                        Address
                      </h3>
                      <p 
                        className="opacity-80"
                        style={{ color: config.textColor, fontFamily: config.bodyFont }}
                      >
                        {config.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 
                    className="text-lg font-semibold mb-4"
                    style={{ color: config.textColor, fontFamily: config.headingFont }}
                  >
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a 
                      href={config.twitter}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={config.linkedin}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href={config.github}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <form className="space-y-6">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.textColor, fontFamily: config.bodyFont }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                      style={{ 
                        borderColor: config.primaryColor + '40',
                        focusRingColor: config.primaryColor 
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.textColor, fontFamily: config.bodyFont }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                      style={{ 
                        borderColor: config.primaryColor + '40',
                        focusRingColor: config.primaryColor 
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2"
                      style={{ color: config.textColor, fontFamily: config.bodyFont }}
                    >
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-opacity-50 focus:outline-none"
                      style={{ 
                        borderColor: config.primaryColor + '40',
                        focusRingColor: config.primaryColor 
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: config.primaryColor }}
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
      <footer className="py-12" style={{ backgroundColor: config.textColor, color: config.backgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span 
                  className="text-xl font-bold"
                  style={{ color: config.backgroundColor, fontFamily: config.headingFont }}
                >
                  {config.siteName}
                </span>
              </div>
              <p 
                className="opacity-80"
                style={{ color: config.backgroundColor, fontFamily: config.bodyFont }}
              >
                {config.tagline}
              </p>
            </div>
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: config.backgroundColor, fontFamily: config.headingFont }}
              >
                Services
              </h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#"
                      className="opacity-80 hover:opacity-100 transition-opacity"
                      style={{ color: config.backgroundColor, fontFamily: config.bodyFont }}
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: config.backgroundColor, fontFamily: config.headingFont }}
              >
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#about"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    style={{ color: config.backgroundColor, fontFamily: config.bodyFont }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#team"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    style={{ color: config.backgroundColor, fontFamily: config.bodyFont }}
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact"
                    className="opacity-80 hover:opacity-100 transition-opacity"
                    style={{ color: config.backgroundColor, fontFamily: config.bodyFont }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 
                className="text-lg font-semibold mb-4"
                style={{ color: config.backgroundColor, fontFamily: config.headingFont }}
              >
                Connect
              </h3>
              <div className="flex space-x-4">
                <a 
                  href={config.twitter}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Twitter className="w-4 h-4 text-white" />
                </a>
                <a 
                  href={config.linkedin}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
                <a 
                  href={config.github}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Github className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-opacity-20 mt-8 pt-8 text-center">
            <p 
              className="opacity-80"
              style={{ color: config.backgroundColor, fontFamily: config.bodyFont }}
            >
              © 2024 {config.siteName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomizableTechStartupTemplate;
