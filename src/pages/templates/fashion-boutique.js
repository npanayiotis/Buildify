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

const FashionBoutiqueTemplate = React.memo(({ customization: externalCustomization = {} }) => {
  const [customization, setCustomization] = useState({
    // Branding
    primaryColor: externalCustomization.primaryColor || "#7C3AED",
    secondaryColor: externalCustomization.secondaryColor || "#5B21B6",
    accentColor: externalCustomization.accentColor || "#EC4899",
    textColor: externalCustomization.textColor || "#1F2937",
    backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

    // Content
    boutiqueName: externalCustomization.boutiqueName || externalCustomization.siteName || "Chic Boutique",
    tagline: externalCustomization.tagline || "Fashion Forward",
    description: externalCustomization.description || externalCustomization.heroSubtitle ||
      "Discover the latest trends in fashion with our curated collection of stylish pieces.",
    heroImage: externalCustomization.heroImage || "",

    // Products
    product1: externalCustomization.product1 || "Summer Dress",
    product1Price: externalCustomization.product1Price || "$89",
    product1Desc: externalCustomization.product1Desc || "Lightweight floral dress perfect for summer",
    product2: externalCustomization.product2 || "Designer Handbag",
    product2Price: externalCustomization.product2Price || "$199",
    product2Desc: externalCustomization.product2Desc || "Luxury leather handbag in classic black",
    product3: externalCustomization.product3 || "Statement Jewelry",
    product3Price: externalCustomization.product3Price || "$45",
    product3Desc: externalCustomization.product3Desc || "Elegant necklace with matching earrings",
    product4: externalCustomization.product4 || "Winter Coat",
    product4Price: externalCustomization.product4Price || "$149",
    product4Desc: externalCustomization.product4Desc || "Warm wool coat in classic camel color",
    product5: externalCustomization.product5 || "Evening Gown",
    product5Price: externalCustomization.product5Price || "$299",
    product5Desc: externalCustomization.product5Desc || "Elegant floor-length gown for special occasions",
    product6: externalCustomization.product6 || "Casual Jeans",
    product6Price: externalCustomization.product6Price || "$79",
    product6Desc: externalCustomization.product6Desc || "Premium denim jeans with perfect fit",

    // Collections
    collection1: externalCustomization.collection1 || "Spring Collection",
    collection1Desc: externalCustomization.collection1Desc || "Fresh styles for the new season",
    collection2: externalCustomization.collection2 || "Evening Wear",
    collection2Desc: externalCustomization.collection2Desc || "Elegant pieces for special occasions",
    collection3: externalCustomization.collection3 || "Casual Chic",
    collection3Desc: externalCustomization.collection3Desc || "Comfortable yet stylish everyday wear",

    // Testimonials
    testimonial1: externalCustomization.testimonial1 || "The quality and style are absolutely amazing. I always get compliments!",
    testimonial1Author: externalCustomization.testimonial1Author || "Sarah M., Customer",
    testimonial2: externalCustomization.testimonial2 || "Best boutique in the city. The staff is so helpful and the clothes are gorgeous.",
    testimonial2Author: externalCustomization.testimonial2Author || "Jessica L., Regular Customer",
    testimonial3: externalCustomization.testimonial3 || "I found the perfect dress for my wedding here. Highly recommended!",
    testimonial3Author: externalCustomization.testimonial3Author || "Emma R., Bride",

    // Contact
    email: "hello@chicboutique.com",
    phone: "+1 (555) 123-4567",
    address: "456 Fashion Ave, New York, NY 10001",
    hours: "Mon-Sat: 10am-8pm, Sun: 12pm-6pm",

    // Social
    instagram: "https://instagram.com/chicboutique",
    facebook: "https://facebook.com/chicboutique",
    pinterest: "https://pinterest.com/chicboutique",
  });

  const handleChange = (key, value) => {
    setCustomization((prev) => ({ ...prev, [key]: value }));
  };

  // 3D Fashion Jewelry Component
  const FashionJewelry = () => {
    const meshRef = useRef();
    useFrame((state) => {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    });

    return (
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Torus ref={meshRef} args={[1, 0.3, 16, 100]} scale={1.5}>
          <MeshDistortMaterial
            color="#FFD700"
            attach="material"
            distort={0.2}
            speed={2}
            roughness={0}
            metalness={0.9}
          />
        </Torus>
      </Float>
    );
  };

  // Floating Fashion Elements
  const FloatingFashionElement = ({ position, color, shape = "box" }) => {
    const meshRef = useRef();
    useFrame((state) => {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    });

    return (
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
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
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50"
      style={{ backgroundColor: customization.backgroundColor }}
    >
      {/* Luxury Fashion Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-lg"
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  👗
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl blur opacity-30"></div>
              </div>
              <span
                className="ml-4 text-2xl font-black bg-gradient-to-r from-gray-800 to-purple-800 bg-clip-text text-transparent"
                style={{ color: customization.textColor }}
              >
                {customization.boutiqueName}
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
                className="text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#shop"
                className="text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium relative group"
              >
                Shop
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </motion.nav>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center space-x-4"
            >
              <motion.button
                className="text-gray-600 hover:text-pink-600 transition-colors duration-300 p-2 rounded-full hover:bg-pink-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                🛒
              </motion.button>
              <motion.button
                className="relative px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ backgroundColor: customization.primaryColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-30"></div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Luxury Fashion Hero Section with 3D Elements */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        {/* Optimized 3D Fashion Background */}
        <Lazy3DCanvas camera={{ position: [0, 0, 5], fov: 75 }} className="z-0">
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.5}
            color="#FFB6C1"
          />
          <OptimizedTorus
            color="#FFD700"
            scale={1.5}
            args={[1, 0.3, 16, 100]}
          />
          <OptimizedSphere
            position={[2, 1, -2]}
            color="#FF69B4"
            args={[0.3, 32, 32]}
          />
          <OptimizedBox
            position={[-2, -1, -1]}
            color="#DA70D6"
            args={[0.4, 0.4, 0.4]}
          />
          <OptimizedSphere
            position={[1, -2, -3]}
            color="#FFD700"
            args={[0.3, 32, 32]}
          />
          <OptimizedBox
            position={[-1, 2, -1]}
            color="#FF1493"
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
              className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight"
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
                className="relative px-12 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 group"
                style={{ backgroundColor: customization.primaryColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Shop Collection
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ✨
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50"></div>
              </motion.button>

              <motion.button
                className="px-12 py-4 rounded-2xl text-pink-600 font-bold text-lg border-2 border-pink-300 hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 backdrop-blur-sm"
                style={{
                  borderColor: customization.primaryColor,
                  color: customization.primaryColor,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Lookbook
              </motion.button>
            </motion.div>

            {/* Fashion Stats */}
            <motion.div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2 }}
            >
              <motion.div
                className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-pink-200 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl font-black text-pink-600 mb-2">
                  500+
                </div>
                <div className="text-gray-700">Fashion Items</div>
              </motion.div>
              <motion.div
                className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-purple-200 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl font-black text-purple-600 mb-2">
                  50+
                </div>
                <div className="text-gray-700">Designers</div>
              </motion.div>
              <motion.div
                className="text-center p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-indigo-200 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl font-black text-indigo-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-700">Style Support</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Fashion Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-pink-300 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-pink-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Luxury Featured Products Section */}
      <section
        id="shop"
        className="relative py-32 bg-gradient-to-b from-pink-50 to-purple-50 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF69B4' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Featured Collection
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Handpicked pieces for the modern woman that define elegance and
              style
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105">
                <div className="relative h-80 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center overflow-hidden">
                  <motion.div
                    className="text-8xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    👗
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <motion.button
                    className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-pink-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Quick View
                  </motion.button>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                    {customization.product1}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {customization.product1Desc}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      ${customization.product1Price}
                    </span>
                    <motion.button
                      className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Product Image</span>
              </div>
              <div className="p-6">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: customization.textColor }}
                >
                  {customization.product2}
                </h3>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ color: customization.primaryColor }}
                >
                  {customization.product2Price}
                </p>
                <p className="text-gray-600 mb-4">
                  {customization.product2Desc}
                </p>
                <button
                  className="w-full px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Product Image</span>
              </div>
              <div className="p-6">
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ color: customization.textColor }}
                >
                  {customization.product3}
                </h3>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ color: customization.primaryColor }}
                >
                  {customization.product3Price}
                </p>
                <p className="text-gray-600 mb-4">
                  {customization.product3Desc}
                </p>
                <button
                  className="w-full px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  Add to Cart
                </button>
              </div>
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
                About {customization.boutiqueName}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe fashion is a form of self-expression. Our carefully
                curated collection features pieces that empower women to look
                and feel their best, whether they&apos;re dressing for work,
                play, or special occasions.
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
                <a
                  href={customization.pinterest}
                  className="text-gray-600 hover:text-red-600"
                >
                  Pinterest
                </a>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <span className="text-gray-400 text-lg">Boutique Interior</span>
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
              Visit Our Store
            </h2>
            <p className="text-xl text-gray-600">
              Come experience our collection in person
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: customization.textColor }}
              >
                Store Information
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
                Newsletter Signup
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with our latest collections and exclusive offers.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg text-white font-medium"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  Subscribe
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
                👗
              </div>
              <span className="ml-3 text-xl font-bold">
                {customization.boutiqueName}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Fashion forward, always in style.
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
              <a
                href={customization.pinterest}
                className="text-gray-400 hover:text-white"
              >
                Pinterest
              </a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              © 2023 {customization.boutiqueName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});

FashionBoutiqueTemplate.displayName = "FashionBoutiqueTemplate";

export default FashionBoutiqueTemplate;
