import React, { useState, useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Lazy3DCanvas from "../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedOrbitControls,
} from "../../components/Templates/Performance3DComponents";

const ConsultingFirmTemplate = React.memo(
  ({ customization: externalCustomization = {} }) => {
    const [customization, setCustomization] = useState({
      // Branding
      primaryColor: externalCustomization.primaryColor || "#1E40AF",
      secondaryColor: externalCustomization.secondaryColor || "#1E3A8A",
      accentColor: externalCustomization.accentColor || "#10B981",
      textColor: externalCustomization.textColor || "#1F2937",
      backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

      // Content
      firmName:
        externalCustomization.firmName ||
        externalCustomization.siteName ||
        "Strategic Solutions",
      tagline: externalCustomization.tagline || "Expert Business Consulting",
      description:
        externalCustomization.description ||
        externalCustomization.heroSubtitle ||
        "We help businesses grow and succeed through strategic planning, process optimization, and digital transformation.",
      heroImage: externalCustomization.heroImage || "",

      // Services
      service1: externalCustomization.service1 || "Strategic Planning",
      service1Desc:
        externalCustomization.service1Desc ||
        "Develop comprehensive business strategies for sustainable growth",
      service2: "Process Optimization",
      service2Desc:
        "Streamline operations and improve efficiency across your organization",
      service3: "Digital Transformation",
      service3Desc:
        "Modernize your business with cutting-edge technology solutions",
      service4: "Financial Advisory",
      service4Desc: "Expert financial planning and investment strategies",
      service5: "Change Management",
      service5Desc: "Guide organizations through successful transformations",
      service6: "Market Research",
      service6Desc: "Data-driven insights for informed business decisions",

      // Case Studies
      caseStudy1: "Fortune 500 Restructuring",
      caseStudy1Desc:
        "Led organizational restructuring for a Fortune 500 company",
      caseStudy1Result: "40% increase in operational efficiency",
      caseStudy2: "Digital Transformation Initiative",
      caseStudy2Desc:
        "Implemented digital solutions across multiple departments",
      caseStudy2Result: "60% reduction in manual processes",
      caseStudy3: "Market Expansion Strategy",
      caseStudy3Desc: "Developed and executed international expansion plan",
      caseStudy3Result: "200% revenue growth in new markets",

      // Industries
      industries: [
        "Technology",
        "Healthcare",
        "Finance",
        "Manufacturing",
        "Retail",
        "Education",
        "Government",
        "Non-profit",
        "Energy",
        "Automotive",
      ],

      // Testimonials
      testimonial1:
        "Strategic Solutions transformed our business approach completely.",
      testimonial1Author: "Jennifer Martinez, CEO of GlobalTech",
      testimonial2: "Their expertise in process optimization is unmatched.",
      testimonial2Author: "Robert Chen, COO of InnovateCorp",
      testimonial3: "Outstanding results and exceptional strategic guidance.",
      testimonial3Author: "Sarah Williams, Founder of StartupXYZ",

      // Team
      teamMember1: "Sarah Johnson",
      teamMember1Role: "Senior Partner",
      teamMember1Exp: "15+ years experience",
      teamMember2: "Michael Chen",
      teamMember2Role: "Technology Consultant",
      teamMember2Exp: "12+ years experience",
      teamMember3: "Emily Rodriguez",
      teamMember3Role: "Strategy Director",
      teamMember3Exp: "10+ years experience",

      // Contact
      email: "info@strategicsolutions.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Plaza, Suite 500, New York, NY 10001",
      hours: "Mon-Fri: 9am-6pm",

      // Social
      social: {
        linkedin: "https://linkedin.com/company/strategicsolutions",
        twitter: "https://twitter.com/strategicsolutions",
      },
    });

    const handleChange = (key, value) => {
      setCustomization((prev) => ({ ...prev, [key]: value }));
    };

    // 3D Business Elements
    const BusinessSphere = () => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      });

      return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
            <MeshDistortMaterial
              color="#1E40AF"
              attach="material"
              distort={0.2}
              speed={1.5}
              roughness={0}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      );
    };

    // Floating Business Cubes
    const BusinessCube = ({ position, color }) => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      });

      return (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
          <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
            <meshStandardMaterial
              color={color}
              metalness={0.8}
              roughness={0.2}
            />
          </Box>
        </Float>
      );
    };

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
        style={{ backgroundColor: customization.backgroundColor }}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  💼
                </div>
                <span
                  className="ml-3 text-xl font-bold"
                  style={{ color: customization.textColor }}
                >
                  {customization.firmName}
                </span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
                <a
                  href="#services"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Services
                </a>
                <a href="#team" className="text-gray-600 hover:text-gray-900">
                  Team
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </a>
              </nav>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: customization.primaryColor }}
              >
                Get Consultation
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="home"
          className="py-20"
          style={{ backgroundColor: customization.backgroundColor }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1
                className="text-5xl font-bold mb-6"
                style={{ color: customization.textColor }}
              >
                {customization.tagline}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {customization.description}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-8 py-3 rounded-lg text-white font-medium"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  Start Your Project
                </button>
                <button
                  className="px-8 py-3 rounded-lg border-2 font-medium"
                  style={{
                    borderColor: customization.primaryColor,
                    color: customization.primaryColor,
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Our Services
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive consulting solutions for your business needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4"
                  style={{ backgroundColor: customization.accentColor }}
                >
                  📊
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: customization.textColor }}
                >
                  {customization.service1}
                </h3>
                <p className="text-gray-600">{customization.service1Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4"
                  style={{ backgroundColor: customization.accentColor }}
                >
                  ⚙️
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: customization.textColor }}
                >
                  {customization.service2}
                </h3>
                <p className="text-gray-600">{customization.service2Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4"
                  style={{ backgroundColor: customization.accentColor }}
                >
                  💻
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: customization.textColor }}
                >
                  {customization.service3}
                </h3>
                <p className="text-gray-600">{customization.service3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Our Team
              </h2>
              <p className="text-xl text-gray-600">
                Meet the experts behind our success
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">
                    Team Member Photo
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: customization.textColor }}
                  >
                    {customization.teamMember1}
                  </h3>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: customization.primaryColor }}
                  >
                    {customization.teamMember1Role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {customization.teamMember1Exp}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">
                    Team Member Photo
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: customization.textColor }}
                  >
                    {customization.teamMember2}
                  </h3>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: customization.primaryColor }}
                  >
                    {customization.teamMember2Role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {customization.teamMember2Exp}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">
                    Team Member Photo
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: customization.textColor }}
                  >
                    {customization.teamMember3}
                  </h3>
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: customization.primaryColor }}
                  >
                    {customization.teamMember3Role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {customization.teamMember3Exp}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600">
                Ready to transform your business? Let&apos;s discuss your needs.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: customization.textColor }}
                >
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <a
                      href={`mailto:${customization.email}`}
                      className="text-blue-600"
                    >
                      {customization.email}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <a
                      href={`tel:${customization.phone}`}
                      className="text-blue-600"
                    >
                      {customization.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-600">Address:</p>
                    <p>{customization.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Hours:</p>
                    <p>{customization.hours}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: customization.textColor }}
                >
                  Request Consultation
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Service</option>
                    <option>Strategic Planning</option>
                    <option>Process Optimization</option>
                    <option>Digital Transformation</option>
                    <option>General Consultation</option>
                  </select>
                  <textarea
                    rows="4"
                    placeholder="Tell us about your business needs"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-white font-medium"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    Request Consultation
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  💼
                </div>
                <span className="ml-3 text-xl font-bold">
                  {customization.firmName}
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Expert business consulting for sustainable growth and success.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href={customization.social.linkedin}
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href={customization.social.twitter}
                  className="text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                © 2023 {customization.firmName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
);

ConsultingFirmTemplate.displayName = "ConsultingFirmTemplate";

export default ConsultingFirmTemplate;
