import React, { useState, useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Plane,
  Sphere,
  Box,
  MeshDistortMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion";
import Lazy3DCanvas from "../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedOrbitControls,
} from "../../components/Templates/Performance3DComponents";

const PhotographyPortfolioTemplate = React.memo(
  ({ customization: externalCustomization = {} }) => {
    const [customization, setCustomization] = useState({
      // Branding
      primaryColor: externalCustomization.primaryColor || "#1F2937",
      secondaryColor: externalCustomization.secondaryColor || "#374151",
      accentColor: externalCustomization.accentColor || "#F59E0B",
      textColor: externalCustomization.textColor || "#1F2937",
      backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

      // Content
      photographerName:
        externalCustomization.photographerName ||
        externalCustomization.siteName ||
        "Alex Johnson",
      tagline:
        externalCustomization.tagline || "Capturing Life's Beautiful Moments",
      description:
        externalCustomization.description ||
        externalCustomization.heroSubtitle ||
        "Professional photographer specializing in portraits, weddings, and travel photography. Let me help you preserve your most precious memories.",
      heroImage: "",

      // Portfolio Categories
      category1: "Portraits",
      category1Desc: "Professional headshots and personal portraits",
      category2: "Weddings",
      category2Desc: "Your special day captured beautifully",
      category3: "Travel",
      category3Desc: "Adventures and landscapes from around the world",

      // Featured Work
      work1: "Sunset Portrait Session",
      work1Desc: "Golden hour portrait session at the beach",
      work2: "Mountain Wedding",
      work2Desc: "Intimate ceremony in the mountains",
      work3: "Cityscape Photography",
      work3Desc: "Urban landscapes and street photography",
      work4: "Corporate Headshots",
      work4Desc: "Professional business portraits",
      work5: "Event Photography",
      work5Desc: "Capturing special moments and celebrations",
      work6: "Product Photography",
      work6Desc: "Commercial product and lifestyle shots",

      // Awards & Recognition
      award1: "Best Wedding Photographer 2023",
      award1Org: "Local Photography Association",
      award2: "Portrait Excellence Award",
      award2Org: "Professional Photographers Guild",
      award3: "Creative Vision Award",
      award3Org: "Art & Design Society",

      // Testimonials
      testimonial1:
        "Alex captured our wedding perfectly. Every moment was beautiful.",
      testimonial1Author: "Sarah & Michael, Wedding Clients",
      testimonial2: "Professional, creative, and absolutely amazing results.",
      testimonial2Author: "Jennifer Martinez, Corporate Client",
      testimonial3:
        "The best photographer we've ever worked with. Highly recommended!",
      testimonial3Author: "David Chen, Event Organizer",

      // Contact
      email: "hello@alexjohnsonphoto.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      social: {
        instagram: "https://instagram.com/alexjohnsonphoto",
        facebook: "https://facebook.com/alexjohnsonphoto",
        twitter: "https://twitter.com/alexjohnsonphoto",
      },
    });

    const handleChange = (key, value) => {
      setCustomization((prev) => ({ ...prev, [key]: value }));
    };

    // 3D Camera Component
    const Camera3D = () => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      });

      return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Box ref={meshRef} args={[0.8, 0.6, 0.4]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#2D3748"
              attach="material"
              distort={0.1}
              speed={2}
              roughness={0.3}
              metalness={0.7}
            />
          </Box>
        </Float>
      );
    };

    // 3D Photo Frame Component
    const PhotoFrame3D = ({ position, color }) => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      });

      return (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
          <Plane
            ref={meshRef}
            position={position}
            args={[1, 1.2]}
            rotation={[0, 0, 0]}
          >
            <meshStandardMaterial
              color={color}
              metalness={0.2}
              roughness={0.3}
            />
          </Plane>
        </Float>
      );
    };

    // Floating Photography Elements
    const FloatingPhotoElement = ({ position, color, shape = "sphere" }) => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      });

      return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
          {shape === "sphere" ? (
            <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
              <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
              />
            </Sphere>
          ) : (
            <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
              <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
              />
            </Box>
          )}
        </Float>
      );
    };

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-neutral-50"
        style={{ backgroundColor: customization.backgroundColor }}
      >
        {/* Luxury Photography Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center"
              >
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-r from-gray-600 to-black shadow-lg"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    📸
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-black rounded-xl blur opacity-30"></div>
                </div>
                <span
                  className="ml-4 text-2xl font-black bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent"
                  style={{ color: customization.textColor }}
                >
                  {customization.photographerName}
                </span>
              </motion.div>

              <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="hidden md:flex space-x-8"
              >
                <a
                  href="#home"
                  className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-black transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#portfolio"
                  className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group"
                >
                  Portfolio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-black transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-black transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-gray-900 transition-all duration-300 font-medium relative group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-gray-400 to-black transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.nav>

              <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ backgroundColor: customization.primaryColor }}
              >
                <span className="relative z-10">Book Session</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-black rounded-xl blur opacity-30"></div>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Luxury Photography Hero Section with 3D Elements */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          {/* Optimized 3D Photography Background */}
          <Lazy3DCanvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="z-0"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#9CA3AF"
            />
            <OptimizedBox color="#2D3748" args={[0.8, 0.6, 0.4]} />
            <OptimizedBox
              position={[2, 1, -2]}
              color="#F3F4F6"
              args={[1, 1.2, 0.1]}
            />
            <OptimizedBox
              position={[-2, -1, -1]}
              color="#E5E7EB"
              args={[1, 1.2, 0.1]}
            />
            <OptimizedSphere
              position={[1, -2, -3]}
              color="#6B7280"
              args={[0.3, 32, 32]}
            />
            <OptimizedBox
              position={[-1, 2, -1]}
              color="#374151"
              args={[0.4, 0.4, 0.4]}
            />
            <OptimizedOrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Lazy3DCanvas>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-slate-700 via-gray-800 to-neutral-900 bg-clip-text text-transparent leading-tight"
                style={{ color: customization.textColor }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                {customization.tagline}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                {customization.description}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <motion.button
                  className="relative px-12 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-gray-800 transition-all duration-300 shadow-2xl hover:shadow-gray-500/25 transform hover:scale-105 group"
                  style={{ backgroundColor: customization.primaryColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    View Portfolio
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      📷
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-black rounded-2xl blur opacity-30 group-hover:opacity-50"></div>
                </motion.button>

                <motion.button
                  className="px-12 py-4 rounded-2xl text-gray-700 font-bold text-lg border-2 border-gray-300 hover:border-gray-500 hover:bg-gray-50 transition-all duration-300 backdrop-blur-sm"
                  style={{
                    borderColor: customization.primaryColor,
                    color: customization.primaryColor,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Session
                </motion.button>
              </motion.div>

              {/* Photography Stats */}
              <motion.div
                className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-gray-200 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-gray-700 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600">Photos Captured</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-gray-200 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-gray-700 mb-2">
                    50+
                  </div>
                  <div className="text-gray-600">Happy Clients</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-gray-200 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-gray-700 mb-2">
                    5⭐
                  </div>
                  <div className="text-gray-600">Average Rating</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Photography Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-gray-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </section>

        {/* Portfolio Categories */}
        <section id="portfolio" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Portfolio
              </h2>
              <p className="text-xl text-gray-600">
                Explore my work across different photography styles
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">
                    Portrait Gallery
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: customization.textColor }}
                  >
                    {customization.category1}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {customization.category1Desc}
                  </p>
                  <button
                    className="w-full px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    View Gallery
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Wedding Gallery</span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: customization.textColor }}
                  >
                    {customization.category2}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {customization.category2Desc}
                  </p>
                  <button
                    className="w-full px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    View Gallery
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Travel Gallery</span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: customization.textColor }}
                  >
                    {customization.category3}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {customization.category3Desc}
                  </p>
                  <button
                    className="w-full px-4 py-2 rounded-lg text-white font-medium"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    View Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Work */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Featured Work
              </h2>
              <p className="text-xl text-gray-600">
                Some of my favorite recent projects
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Featured Image</span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: customization.textColor }}
                  >
                    {customization.work1}
                  </h3>
                  <p className="text-gray-600">{customization.work1Desc}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Featured Image</span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: customization.textColor }}
                  >
                    {customization.work2}
                  </h3>
                  <p className="text-gray-600">{customization.work2Desc}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Featured Image</span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: customization.textColor }}
                  >
                    {customization.work3}
                  </h3>
                  <p className="text-gray-600">{customization.work3Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{ color: customization.textColor }}
                >
                  About {customization.photographerName}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  With over 8 years of experience in photography, I specialize
                  in capturing authentic moments and creating beautiful
                  memories. My approach is natural and unobtrusive, allowing
                  genuine emotions to shine through in every photograph.
                </p>
                <div className="flex space-x-6">
                  <a
                    href={customization.social.instagram}
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Instagram
                  </a>
                  <a
                    href={customization.social.facebook}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Facebook
                  </a>
                  <a
                    href={customization.social.twitter}
                    className="text-gray-600 hover:text-blue-400"
                  >
                    Twitter
                  </a>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-400 text-lg">
                  Photographer Photo
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Let&apos;s Work Together
              </h2>
              <p className="text-xl text-gray-600">
                Ready to capture your special moments?
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
                    <p className="text-gray-600">Location:</p>
                    <p>{customization.location}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3
                  className="text-2xl font-semibold mb-4"
                  style={{ color: customization.textColor }}
                >
                  Book a Session
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
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Select Session Type</option>
                    <option>Portrait Session</option>
                    <option>Wedding Photography</option>
                    <option>Event Photography</option>
                    <option>Travel Photography</option>
                  </select>
                  <textarea
                    rows="4"
                    placeholder="Tell me about your vision"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-white font-medium"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    Send Inquiry
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
                  📸
                </div>
                <span className="ml-3 text-xl font-bold">
                  {customization.photographerName}
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Capturing life&apos;s beautiful moments, one photo at a time.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href={customization.social.instagram}
                  className="text-gray-400 hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href={customization.social.facebook}
                  className="text-gray-400 hover:text-white"
                >
                  Facebook
                </a>
                <a
                  href={customization.social.twitter}
                  className="text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                © 2023 {customization.photographerName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
);

PhotographyPortfolioTemplate.displayName = "PhotographyPortfolioTemplate";

export default PhotographyPortfolioTemplate;
