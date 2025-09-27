import React, { useState, useRef, memo, useMemo, lazy, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Lazy3DCanvas from "../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedOrbitControls,
} from "../../components/Templates/Performance3DComponents";

const TechStartupTemplate = React.memo(
  ({ customization: externalCustomization = {} }) => {
    const [customization, setCustomization] = useState({
      // Branding
      primaryColor: externalCustomization.primaryColor || "#3B82F6",
      secondaryColor: externalCustomization.secondaryColor || "#1E40AF",
      accentColor: externalCustomization.accentColor || "#10B981",
      textColor: externalCustomization.textColor || "#1F2937",
      backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

      // Content
      companyName:
        externalCustomization.companyName ||
        externalCustomization.siteName ||
        "TechStart",
      tagline:
        externalCustomization.tagline || "Building the Future of Technology",
      description:
        externalCustomization.description ||
        externalCustomization.heroSubtitle ||
        "We create innovative solutions that transform businesses and drive digital transformation.",
      heroImage: externalCustomization.heroImage || "",

      // Services
      service1: externalCustomization.service1 || "Web Development",
      service1Desc:
        externalCustomization.service1Desc ||
        "Custom web applications built with modern technologies",
      service2: "Mobile Apps",
      service2Desc: "Native and cross-platform mobile solutions",
      service3: "Cloud Solutions",
      service3Desc: "Scalable cloud infrastructure and deployment",
      service4: "AI & Machine Learning",
      service4Desc: "Intelligent solutions powered by cutting-edge AI",
      service5: "DevOps & Automation",
      service5Desc: "Streamlined deployment and continuous integration",
      service6: "Cybersecurity",
      service6Desc: "Protecting your digital assets with advanced security",

      // Team Members
      teamMember1: "Sarah Chen",
      teamMember1Role: "CEO & Co-Founder",
      teamMember1Bio:
        "Former Google engineer with 10+ years in tech leadership",
      teamMember1Image: "",
      teamMember2: "Michael Rodriguez",
      teamMember2Role: "CTO & Co-Founder",
      teamMember2Bio: "Full-stack architect specializing in scalable systems",
      teamMember2Image: "",
      teamMember3: "Emily Johnson",
      teamMember3Role: "Head of Design",
      teamMember3Bio: "Award-winning UX designer with focus on user experience",
      teamMember3Image: "",
      teamMember4: "David Kim",
      teamMember4Role: "Lead Developer",
      teamMember4Bio: "Expert in React, Node.js, and cloud technologies",
      teamMember4Image: "",

      // Case Studies
      caseStudy1: "E-commerce Platform",
      caseStudy1Desc:
        "Built a scalable e-commerce solution for a Fortune 500 company",
      caseStudy1Result: "300% increase in conversion rates",
      caseStudy2: "Mobile Banking App",
      caseStudy2Desc:
        "Developed a secure mobile banking application with biometric authentication",
      caseStudy2Result: "1M+ downloads in first 6 months",
      caseStudy3: "AI-Powered Analytics",
      caseStudy3Desc:
        "Implemented machine learning algorithms for predictive analytics",
      caseStudy3Result: "50% reduction in operational costs",

      // Technologies
      technologies: [
        "React",
        "Node.js",
        "Python",
        "AWS",
        "Docker",
        "Kubernetes",
        "MongoDB",
        "PostgreSQL",
        "GraphQL",
        "TypeScript",
        "Next.js",
      ],

      // Testimonials
      testimonial1:
        "TechStart transformed our business with their innovative solutions.",
      testimonial1Author: "John Smith, CEO of InnovateCorp",
      testimonial2: "The team's expertise in cloud technologies is unmatched.",
      testimonial2Author: "Sarah Wilson, CTO of CloudTech",
      testimonial3: "Outstanding results and exceptional service delivery.",
      testimonial3Author: "Mike Davis, Founder of StartupXYZ",

      // Contact
      email: "hello@techstart.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, San Francisco, CA 94105",

      // Social
      linkedin: "https://linkedin.com/company/techstart",
      twitter: "https://twitter.com/techstart",
      github: "https://github.com/techstart",
    });

    const handleChange = (key, value) => {
      setCustomization((prev) => ({ ...prev, [key]: value }));
    };

    // 3D Animated Sphere Component
    const AnimatedSphere = () => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      });

      return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.4}>
            <MeshDistortMaterial
              color={customization.primaryColor}
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      );
    };

    // Floating Tech Cubes
    const FloatingCube = ({ position, color }) => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      });

      return (
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <Box ref={meshRef} position={position} args={[0.5, 0.5, 0.5]}>
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
        className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
        style={{ backgroundColor: customization.backgroundColor }}
      >
        {/* Luxury Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
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
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
                    style={{ backgroundColor: customization.primaryColor }}
                  >
                    TS
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-30"></div>
                </div>
                <span
                  className="ml-4 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                  style={{ color: customization.textColor }}
                >
                  {customization.companyName}
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
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#services"
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group"
                >
                  Services
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#about"
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group"
                >
                  About
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.nav>

              <motion.button
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ backgroundColor: customization.primaryColor }}
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30"></div>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Luxury Hero Section with 3D Elements */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          {/* Optimized 3D Background */}
          <Lazy3DCanvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="z-0"
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} />
            <AnimatedSphere />
            <FloatingCube position={[2, 1, -2]} color="#3B82F6" />
            <FloatingCube position={[-2, -1, -1]} color="#6366F1" />
            <FloatingCube position={[1, -2, -3]} color="#8B5CF6" />
            <OptimizedOrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
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
                className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-indigo-300 bg-clip-text text-transparent leading-tight"
                style={{ color: customization.textColor }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              >
                {customization.tagline}
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed"
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
                  className="relative px-12 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 group"
                  style={{ backgroundColor: customization.primaryColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Project
                    <motion.span
                      className="ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      →
                    </motion.span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50"></div>
                </motion.button>

                <motion.button
                  className="px-12 py-4 rounded-2xl text-white font-bold text-lg border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                  style={{
                    borderColor: customization.primaryColor,
                    color: customization.primaryColor,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
              >
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-white mb-2">
                    500+
                  </div>
                  <div className="text-white/70">Projects Delivered</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-white mb-2">
                    99.9%
                  </div>
                  <div className="text-white/70">Uptime Guarantee</div>
                </motion.div>
                <motion.div
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-4xl font-black text-white mb-2">
                    24/7
                  </div>
                  <div className="text-white/70">Expert Support</div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </section>

        {/* Luxury Services Section */}
        <section
          id="services"
          className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our Services
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Comprehensive technology solutions that transform your business
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      💻
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                      {customization.service1}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      {customization.service1Desc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 2 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br from-purple-500 to-pink-600 shadow-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      📱
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                      {customization.service2}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      {customization.service2Desc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 3 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br from-green-500 to-blue-600 shadow-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      ☁️
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors">
                      {customization.service3}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      {customization.service3Desc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 4 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      🤖
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors">
                      {customization.service4}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      {customization.service4Desc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 5 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      ⚙️
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">
                      {customization.service5}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      {customization.service5Desc}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Service 6 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 bg-gradient-to-br from-yellow-500 to-orange-600 shadow-2xl"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      🔒
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors">
                      {customization.service6}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/90 transition-colors">
                      {customization.service6Desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                The brilliant minds behind our innovative solutions
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Team Member 1 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                      {customization.teamMember1.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {customization.teamMember1}
                    </h3>
                    <p className="text-blue-300 text-sm font-medium mb-3">
                      {customization.teamMember1Role}
                    </p>
                    <p className="text-white/70 text-sm">
                      {customization.teamMember1Bio}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 2 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                      {customization.teamMember2.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {customization.teamMember2}
                    </h3>
                    <p className="text-purple-300 text-sm font-medium mb-3">
                      {customization.teamMember2Role}
                    </p>
                    <p className="text-white/70 text-sm">
                      {customization.teamMember2Bio}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 3 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-blue-600 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                      {customization.teamMember3.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {customization.teamMember3}
                    </h3>
                    <p className="text-green-300 text-sm font-medium mb-3">
                      {customization.teamMember3Role}
                    </p>
                    <p className="text-white/70 text-sm">
                      {customization.teamMember3Bio}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Team Member 4 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
                      {customization.teamMember4.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {customization.teamMember4}
                    </h3>
                    <p className="text-orange-300 text-sm font-medium mb-3">
                      {customization.teamMember4Role}
                    </p>
                    <p className="text-white/70 text-sm">
                      {customization.teamMember4Bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section
          id="case-studies"
          className="relative py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Case Studies
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Real results from our successful projects
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Case Study 1 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {customization.caseStudy1}
                    </h3>
                    <p className="text-white/70 mb-6">
                      {customization.caseStudy1Desc}
                    </p>
                    <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                      <p className="text-green-300 font-bold text-lg">
                        {customization.caseStudy1Result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Case Study 2 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {customization.caseStudy2}
                    </h3>
                    <p className="text-white/70 mb-6">
                      {customization.caseStudy2Desc}
                    </p>
                    <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                      <p className="text-green-300 font-bold text-lg">
                        {customization.caseStudy2Result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Case Study 3 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {customization.caseStudy3}
                    </h3>
                    <p className="text-white/70 mb-6">
                      {customization.caseStudy3Desc}
                    </p>
                    <div className="bg-green-500/20 rounded-lg p-4 border border-green-500/30">
                      <p className="text-green-300 font-bold text-lg">
                        {customization.caseStudy3Result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section
          id="technologies"
          className="relative py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Technologies We Use
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Cutting-edge tools and frameworks for modern development
              </motion.p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {customization.technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-white/10 text-white font-medium hover:scale-105 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="relative py-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                What Our Clients Say
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Trusted by industry leaders worldwide
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl text-blue-300 mb-4">&ldquo;</div>
                    <p className="text-white/80 text-lg mb-6 italic">
                      {customization.testimonial1}
                    </p>
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-blue-300 font-semibold">
                        {customization.testimonial1Author}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl text-purple-300 mb-4">&ldquo;</div>
                    <p className="text-white/80 text-lg mb-6 italic">
                      {customization.testimonial2}
                    </p>
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-purple-300 font-semibold">
                        {customization.testimonial2Author}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 3 */}
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-600/20 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-4xl text-green-300 mb-4">&ldquo;</div>
                    <p className="text-white/80 text-lg mb-6 italic">
                      {customization.testimonial3}
                    </p>
                    <div className="border-t border-white/20 pt-4">
                      <p className="text-green-300 font-semibold">
                        {customization.testimonial3Author}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Luxury Contact Section */}
        <section
          id="contact"
          className="relative py-32 bg-black overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h2>
              <motion.p
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Ready to start your next project? Let&apos;s talk!
              </motion.p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="relative p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10">
                    <form className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Subject"
                          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        />
                      </div>
                      <div className="relative">
                        <textarea
                          rows="6"
                          placeholder="Your Message"
                          className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:border-blue-400 focus:bg-white/10 transition-all duration-300 backdrop-blur-sm resize-none"
                        ></textarea>
                      </div>
                      <motion.button
                        type="submit"
                        className="w-full px-8 py-4 rounded-2xl text-white font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Message
                      </motion.button>
                    </form>
                  </div>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-6">
                    <motion.div
                      className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/10"
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        📧
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">Email</p>
                        <a
                          href={`mailto:${customization.email}`}
                          className="text-white font-semibold hover:text-blue-400 transition-colors"
                        >
                          {customization.email}
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-white/10"
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                        📞
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">Phone</p>
                        <a
                          href={`tel:${customization.phone}`}
                          className="text-white font-semibold hover:text-purple-400 transition-colors"
                        >
                          {customization.phone}
                        </a>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-600/10 border border-white/10"
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                        📍
                      </div>
                      <div>
                        <p className="text-white/70 text-sm">Address</p>
                        <p className="text-white font-semibold">
                          {customization.address}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Luxury Footer */}
        <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex items-center justify-center mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-2xl">
                    TS
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
                </div>
                <span className="ml-6 text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  {customization.companyName}
                </span>
              </motion.div>

              <motion.p
                className="text-white/70 text-xl mb-12 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Building the future of technology, one project at a time.
              </motion.p>

              <motion.div
                className="flex justify-center space-x-8 mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href={customization.linkedin}
                  className="text-white/60 hover:text-blue-400 transition-all duration-300 font-semibold relative group"
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  LinkedIn
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
                <motion.a
                  href={customization.twitter}
                  className="text-white/60 hover:text-blue-300 transition-all duration-300 font-semibold relative group"
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  Twitter
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
                <motion.a
                  href={customization.github}
                  className="text-white/60 hover:text-white transition-all duration-300 font-semibold relative group"
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  GitHub
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </motion.a>
              </motion.div>

              <motion.div
                className="border-t border-white/10 pt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <p className="text-white/40 text-sm">
                  © 2024 {customization.companyName}. All rights reserved. |
                  Crafted with ❤️ for the future
                </p>
              </motion.div>
            </motion.div>
          </div>
        </footer>
      </div>
    );
  }
);

TechStartupTemplate.displayName = "TechStartupTemplate";

export default TechStartupTemplate;
