import React, { useState, useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  Torus,
  Sphere,
  Box,
  MeshDistortMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion";
import Lazy3DCanvas from "../../components/Templates/Lazy3DCanvas";
import {
  OptimizedTorus,
  OptimizedSphere,
  OptimizedBox,
  OptimizedOrbitControls,
} from "../../components/Templates/Performance3DComponents";

const RestaurantTemplate = React.memo(
  ({ customization: externalCustomization = {} }) => {
    const [customization, setCustomization] = useState({
      // Branding
      primaryColor: externalCustomization.primaryColor || "#DC2626",
      secondaryColor: externalCustomization.secondaryColor || "#B91C1C",
      accentColor: externalCustomization.accentColor || "#F59E0B",
      textColor: externalCustomization.textColor || "#1F2937",
      backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

      // Content
      restaurantName:
        externalCustomization.restaurantName ||
        externalCustomization.siteName ||
        "Bella Vista",
      tagline: externalCustomization.tagline || "Authentic Italian Cuisine",
      description:
        externalCustomization.description ||
        externalCustomization.heroSubtitle ||
        "Experience the finest Italian flavors in a warm, welcoming atmosphere.",
      heroImage: externalCustomization.heroImage || "",

      // Menu
      dish1: externalCustomization.dish1 || "Margherita Pizza",
      dish1Price: externalCustomization.dish1Price || "$18",
      dish1Desc:
        externalCustomization.dish1Desc ||
        "Fresh mozzarella, tomato sauce, basil",
      dish2: externalCustomization.dish2 || "Spaghetti Carbonara",
      dish2Price: externalCustomization.dish2Price || "$22",
      dish2Desc:
        externalCustomization.dish2Desc ||
        "Creamy pasta with pancetta and parmesan",
      dish3: externalCustomization.dish3 || "Osso Buco",
      dish3Price: externalCustomization.dish3Price || "$28",
      dish3Desc:
        externalCustomization.dish3Desc || "Braised veal shanks with risotto",
      dish4: externalCustomization.dish4 || "Truffle Risotto",
      dish4Price: externalCustomization.dish4Price || "$32",
      dish4Desc:
        externalCustomization.dish4Desc ||
        "Creamy risotto with black truffle shavings",
      dish5: externalCustomization.dish5 || "Branzino",
      dish5Price: externalCustomization.dish5Price || "$26",
      dish5Desc:
        externalCustomization.dish5Desc || "Mediterranean sea bass with herbs",
      dish6: externalCustomization.dish6 || "Tiramisu",
      dish6Price: externalCustomization.dish6Price || "$12",
      dish6Desc:
        externalCustomization.dish6Desc ||
        "Classic Italian dessert with coffee and mascarpone",

      // Chef & Team
      chefName: externalCustomization.chefName || "Marco Rossi",
      chefBio:
        externalCustomization.chefBio ||
        "Head Chef with 15+ years of experience in authentic Italian cuisine",
      chefImage: externalCustomization.chefImage || "",
      teamMember1: "Giuseppe Bianchi",
      teamMember1Role: "Sous Chef",
      teamMember1Exp: "10+ years experience",
      teamMember2: "Elena Romano",
      teamMember2Role: "Pastry Chef",
      teamMember2Exp: "8+ years experience",
      teamMember3: "Antonio Ferrara",
      teamMember3Role: "Sommelier",
      teamMember3Exp: "12+ years experience",

      // Awards & Recognition
      award1: "Best Italian Restaurant 2023",
      award1Org: "Local Food Critics Association",
      award2: "Wine Spectator Award",
      award2Org: "Wine & Dine Magazine",
      award3: "Chef's Choice Award",
      award3Org: "Culinary Institute",

      // Testimonials
      testimonial1:
        "The best Italian food I've had outside of Italy. Absolutely incredible!",
      testimonial1Author: "Sarah Johnson, Food Critic",
      testimonial2:
        "Perfect atmosphere, amazing food, and excellent service. Highly recommended!",
      testimonial2Author: "Michael Chen, Regular Customer",
      testimonial3:
        "A true gem in the city. The pasta is made fresh daily and it shows.",
      testimonial3Author: "Elena Martinez, Food Blogger",

      // Contact
      email: "info@bellavista.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Little Italy, NY 10013",
      hours: "Mon-Thu: 5pm-10pm, Fri-Sat: 5pm-11pm, Sun: 4pm-9pm",

      // Social
      instagram: "https://instagram.com/bellavista",
      facebook: "https://facebook.com/bellavista",
    });

    const handleChange = (key, value) => {
      setCustomization((prev) => ({ ...prev, [key]: value }));
    };

    // 3D Food Elements
    const FloatingFood = ({ position, color, shape = "sphere" }) => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      });

      return (
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
          {shape === "sphere" ? (
            <Sphere ref={meshRef} position={position} args={[0.4, 32, 32]}>
              <MeshDistortMaterial
                color={color}
                attach="material"
                distort={0.2}
                speed={1.5}
                roughness={0.3}
                metalness={0.1}
              />
            </Sphere>
          ) : (
            <Box ref={meshRef} position={position} args={[0.5, 0.3, 0.3]}>
              <meshStandardMaterial
                color={color}
                metalness={0.2}
                roughness={0.4}
              />
            </Box>
          )}
        </Float>
      );
    };

    // 3D Plate Component
    const Plate3D = () => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      });

      return (
        <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
          <Torus ref={meshRef} args={[1.2, 0.2, 16, 100]} scale={1.5}>
            <meshStandardMaterial
              color="#F3F4F6"
              metalness={0.3}
              roughness={0.2}
            />
          </Torus>
        </Float>
      );
    };

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50"
        style={{ backgroundColor: customization.backgroundColor }}
      >
        {/* Luxury Restaurant Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-lg"
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-r from-orange-500 to-red-600 shadow-lg"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    🍝
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl blur opacity-30"></div>
                </div>
                <span
                  className="ml-4 text-2xl font-black bg-gradient-to-r from-gray-800 to-red-800 bg-clip-text text-transparent"
                  style={{ color: customization.textColor }}
                >
                  {customization.restaurantName}
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
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#menu"
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  Menu
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#about"
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-orange-600 transition-all duration-300 font-medium relative group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.nav>

              <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ backgroundColor: customization.primaryColor }}
              >
                <span className="relative z-10">Make Reservation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl blur opacity-30"></div>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Luxury Restaurant Hero Section with 3D Food Elements */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          {/* Optimized 3D Food Background */}
          <Lazy3DCanvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="z-0"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#FFB366"
            />
            <OptimizedTorus
              color="#F3F4F6"
              scale={1.5}
              args={[1.2, 0.2, 16, 100]}
            />
            <OptimizedSphere
              position={[2, 1, -2]}
              color="#FF6B35"
              args={[0.4, 32, 32]}
            />
            <OptimizedBox
              position={[-2, -1, -1]}
              color="#F7931E"
              args={[0.5, 0.3, 0.3]}
            />
            <OptimizedSphere
              position={[1, -2, -3]}
              color="#8B4513"
              args={[0.4, 32, 32]}
            />
            <OptimizedBox
              position={[-1, 2, -1]}
              color="#D2691E"
              args={[0.5, 0.3, 0.3]}
            />
            <OptimizedOrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.2}
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
                className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent leading-tight"
                style={{ color: customization.textColor }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                {customization.tagline}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
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
                  className="relative px-12 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 group"
                  style={{ backgroundColor: customization.primaryColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    View Menu
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      🍽️
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-50"></div>
                </motion.button>

                <motion.button
                  className="px-12 py-4 rounded-2xl text-orange-600 font-bold text-lg border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50 transition-all duration-300 backdrop-blur-sm"
                  style={{
                    borderColor: customization.primaryColor,
                    color: customization.primaryColor,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Make Reservation
                </motion.button>
              </motion.div>

              {/* Restaurant Stats */}
              <motion.div
                className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-orange-200 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-orange-600 mb-2">
                    15+
                  </div>
                  <div className="text-gray-700">Years Experience</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-red-200 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-red-600 mb-2">
                    100+
                  </div>
                  <div className="text-gray-700">Menu Items</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-yellow-200 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-yellow-600 mb-2">
                    5⭐
                  </div>
                  <div className="text-gray-700">Customer Rating</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Food Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-orange-300 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-orange-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Our Menu
              </h2>
              <p className="text-xl text-gray-600">
                Fresh ingredients, authentic recipes, unforgettable flavors
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4"
                  style={{ backgroundColor: customization.accentColor }}
                >
                  🍕
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: customization.textColor }}
                >
                  {customization.dish1}
                </h3>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ color: customization.primaryColor }}
                >
                  {customization.dish1Price}
                </p>
                <p className="text-gray-600">{customization.dish1Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4"
                  style={{ backgroundColor: customization.accentColor }}
                >
                  🍝
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: customization.textColor }}
                >
                  {customization.dish2}
                </h3>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ color: customization.primaryColor }}
                >
                  {customization.dish2Price}
                </p>
                <p className="text-gray-600">{customization.dish2Desc}</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mb-4"
                  style={{ backgroundColor: customization.accentColor }}
                >
                  🥩
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: customization.textColor }}
                >
                  {customization.dish3}
                </h3>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ color: customization.primaryColor }}
                >
                  {customization.dish3Price}
                </p>
                <p className="text-gray-600">{customization.dish3Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{ color: customization.textColor }}
                >
                  About {customization.restaurantName}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  For over 20 years, we&apos;ve been serving authentic Italian
                  cuisine made with love and tradition. Our family recipes have
                  been passed down through generations, ensuring every dish
                  tells a story.
                </p>
                <div className="flex space-x-6">
                  <a
                    href={customization.instagram}
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Instagram
                  </a>
                  <a
                    href={customization.facebook}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Facebook
                  </a>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-400 text-lg">
                  Restaurant Interior
                </span>
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
                Visit Us
              </h2>
              <p className="text-xl text-gray-600">
                We&apos;d love to welcome you to our restaurant
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
                  Make a Reservation
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
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="time"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg text-white font-medium"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    Reserve Table
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
                  🍝
                </div>
                <span className="ml-3 text-xl font-bold">
                  {customization.restaurantName}
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Authentic Italian cuisine made with love and tradition.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href={customization.instagram}
                  className="text-gray-400 hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href={customization.facebook}
                  className="text-gray-400 hover:text-white"
                >
                  Facebook
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                © 2023 {customization.restaurantName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
);

RestaurantTemplate.displayName = "RestaurantTemplate";

export default RestaurantTemplate;
