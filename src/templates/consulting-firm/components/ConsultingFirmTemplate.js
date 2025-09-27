import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lazy3DCanvas from "../../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedTorus,
  OptimizedOrbitControls,
} from "../../../components/Templates/Performance3DComponents";

const ConsultingFirmTemplate = memo(() => {
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [showCaseStudyModal, setShowCaseStudyModal] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchCaseStudies();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/templates/consulting-firm/services");
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      // Set default services if API fails
      setServices([
        {
          id: "1",
          title: "Strategic Consulting",
          description: "Transform your business with data-driven strategies and actionable insights that drive sustainable growth.",
          icon: "📊",
        },
        {
          id: "2",
          title: "Digital Transformation",
          description: "Modernize your operations with cutting-edge technology solutions and digital innovation strategies.",
          icon: "🚀",
        },
        {
          id: "3",
          title: "Process Optimization",
          description: "Streamline your workflows and eliminate inefficiencies to maximize productivity and reduce costs.",
          icon: "⚡",
        },
        {
          id: "4",
          title: "Change Management",
          description: "Guide your organization through successful transformations with proven change management methodologies.",
          icon: "🔄",
        },
      ]);
    }
  };

  const fetchCaseStudies = async () => {
    try {
      const response = await fetch("/api/templates/consulting-firm/case-studies/featured?limit=3");
      const data = await response.json();
      if (data.success) {
        setCaseStudies(data.data);
      }
    } catch (error) {
      console.error("Error fetching case studies:", error);
      setCaseStudies([
        {
          id: "1",
          title: "Digital Transformation for Fortune 500 Retailer",
          slug: "fortune-500-retailer-transformation",
          description: "Led a comprehensive digital transformation initiative that increased online sales by 150% and improved operational efficiency by 40%.",
          content: "Our team worked closely with the client to identify key digital opportunities and implement a phased transformation approach...",
          imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
          client: "Fortune 500 Retailer",
          industry: "Retail",
        },
        {
          id: "2",
          title: "Supply Chain Optimization for Manufacturing Company",
          slug: "supply-chain-optimization-manufacturing",
          description: "Redesigned supply chain operations resulting in 30% cost reduction and 50% improvement in delivery times.",
          content: "Through detailed analysis and process mapping, we identified bottlenecks and implemented lean manufacturing principles...",
          imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
          client: "Global Manufacturing Co.",
          industry: "Manufacturing",
        },
        {
          id: "3",
          title: "Financial Services Process Automation",
          slug: "financial-services-automation",
          description: "Implemented automated workflows that reduced processing time by 70% and improved accuracy by 95%.",
          content: "We developed a comprehensive automation strategy that integrated with existing systems while maintaining compliance...",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
          client: "Regional Bank",
          industry: "Financial Services",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openCaseStudy = (caseStudy) => {
    setSelectedCaseStudy(caseStudy);
    setShowCaseStudyModal(true);
  };

  const closeCaseStudyModal = () => {
    setShowCaseStudyModal(false);
    setSelectedCaseStudy(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
      {/* Optimized 3D Background */}
      <Lazy3DCanvas camera={{ position: [0, 0, 5], fov: 75 }} className="z-0">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OptimizedSphere
          position={[-2, 1, -2]}
          color="#3B82F6"
          scale={1.2}
          args={[1, 32, 32]}
        />
        <OptimizedSphere
          position={[2, -1, -1]}
          color="#6366F1"
          scale={0.8}
          args={[1, 32, 32]}
        />
        <OptimizedBox
          position={[0, 0, -3]}
          color="#1E40AF"
          scale={1}
          args={[0.4, 0.4, 0.4]}
        />
        <OptimizedBox
          position={[-1.5, -1, -2]}
          color="#4F46E5"
          scale={0.6}
          args={[0.3, 0.3, 0.3]}
        />
        <OptimizedTorus
          position={[1.5, 1, -1]}
          color="#7C3AED"
          scale={0.8}
          args={[1, 0.3, 16, 100]}
        />

        <OptimizedOrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
        />
      </Lazy3DCanvas>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">💼</span>
          </div>
          <span className="text-xl font-bold">Strategic Partners Consulting</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#services" className="hover:text-blue-600 transition-colors">
            Services
          </a>
          <a href="#case-studies" className="hover:text-blue-600 transition-colors">
            Case Studies
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
      >
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Strategic Partners Consulting
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Transform your business with strategic consulting, digital innovation,
            and proven methodologies that drive sustainable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById("services").scrollIntoView()}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Our Services</span>
              <span>→</span>
            </button>
            <button className="border-2 border-blue-400 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300">
              Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Comprehensive consulting solutions designed to accelerate your business growth
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="relative z-10 py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Case Studies
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Real results from our consulting engagements across various industries
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => openCaseStudy(caseStudy)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={caseStudy.imageUrl || "https://via.placeholder.com/400x250"}
                      alt={caseStudy.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        View Case Study
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {caseStudy.industry}
                      </span>
                      <span className="text-sm text-gray-500">
                        {caseStudy.client}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {caseStudy.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {caseStudy.description}
                    </p>

                    <button className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium">
                      Read Full Case Study →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Our Firm
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              With over 15 years of experience, Strategic Partners Consulting has helped
              hundreds of organizations achieve transformational growth through strategic
              thinking, innovative solutions, and proven methodologies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                <p className="text-gray-600">
                  Seasoned consultants with deep industry expertise
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                <p className="text-gray-600">
                  95% client satisfaction and measurable outcomes
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  Serving clients across multiple industries worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Let&apos;s discuss how our consulting expertise can drive your success
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">contact@strategicpartners.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold">Office</p>
                      <p className="text-gray-600">123 Business District, Suite 100</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Request Consultation
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    rows={4}
                    placeholder="Tell us about your challenges..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold"
                  >
                    Request Free Consultation
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💼</span>
            </div>
            <span className="text-xl font-bold">Strategic Partners Consulting</span>
          </div>

          <p className="text-gray-600 mb-6">
            Transforming businesses through strategic consulting and innovative solutions.
          </p>

          <div className="flex justify-center space-x-8 text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

          <p className="text-gray-500 mt-6 text-sm">
            © 2024 Strategic Partners Consulting. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Case Study Modal */}
      <AnimatePresence>
        {showCaseStudyModal && selectedCaseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedCaseStudy.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {selectedCaseStudy.industry}
                    </span>
                    <span className="text-sm text-gray-500">
                      {selectedCaseStudy.client}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeCaseStudyModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedCaseStudy.imageUrl || "https://via.placeholder.com/800x400"}
                  alt={selectedCaseStudy.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  {selectedCaseStudy.description}
                </p>
                <div className="text-gray-600">
                  {selectedCaseStudy.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

ConsultingFirmTemplate.displayName = "ConsultingFirmTemplate";

export default ConsultingFirmTemplate;
