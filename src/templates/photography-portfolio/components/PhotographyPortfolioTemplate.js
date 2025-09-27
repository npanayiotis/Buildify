import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lazy3DCanvas from "../../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedTorus,
  OptimizedOrbitControls,
} from "../../../components/Templates/Performance3DComponents";

const PhotographyPortfolioTemplate = memo(() => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: "1",
        limit: "50",
      });

      if (selectedCategory && selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await fetch(`/api/templates/photography-portfolio/projects?${params}`);
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Set default projects if API fails
      setProjects([
        {
          id: "1",
          title: "Urban Landscapes",
          description: "Capturing the essence of city life through architectural photography",
          category: "Architecture",
          images: [
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
            "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800",
          ],
          isFeatured: true,
        },
        {
          id: "2",
          title: "Portrait Series",
          description: "Intimate portraits that reveal the human spirit",
          category: "Portrait",
          images: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
          ],
          isFeatured: true,
        },
        {
          id: "3",
          title: "Nature's Beauty",
          description: "Exploring the natural world through landscape photography",
          category: "Landscape",
          images: [
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
          ],
          isFeatured: false,
        },
        {
          id: "4",
          title: "Street Photography",
          description: "Moments of everyday life captured in the urban environment",
          category: "Street",
          images: [
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800",
          ],
          isFeatured: false,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/templates/photography-portfolio/projects/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([
        { name: "Architecture", slug: "architecture", count: 1 },
        { name: "Portrait", slug: "portrait", count: 1 },
        { name: "Landscape", slug: "landscape", count: 1 },
        { name: "Street", slug: "street", count: 1 },
      ]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const openGallery = (project) => {
    setSelectedProject(project);
    setShowGallery(true);
  };

  const closeGallery = () => {
    setShowGallery(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Optimized 3D Background */}
      <Lazy3DCanvas camera={{ position: [0, 0, 5], fov: 75 }} className="z-0">
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[10, -10, -5]} intensity={0.5} color="#8B5CF6" />

        <OptimizedSphere
          position={[-2, 1, -2]}
          color="#3B82F6"
          scale={1.2}
          args={[1, 32, 32]}
        />
        <OptimizedSphere
          position={[2, -1, -1]}
          color="#8B5CF6"
          scale={0.8}
          args={[1, 32, 32]}
        />
        <OptimizedBox
          position={[0, 0, -3]}
          color="#10B981"
          scale={1}
          args={[0.4, 0.4, 0.4]}
        />
        <OptimizedBox
          position={[-1.5, -1, -2]}
          color="#F59E0B"
          scale={0.6}
          args={[0.3, 0.3, 0.3]}
        />
        <OptimizedTorus
          position={[1.5, 1, -1]}
          color="#EC4899"
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
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📸</span>
          </div>
          <span className="text-xl font-bold">Alex Photography</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-blue-400 transition-colors">
            Home
          </a>
          <a href="#portfolio" className="hover:text-blue-400 transition-colors">
            Portfolio
          </a>
          <a href="#about" className="hover:text-blue-400 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Book Session
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
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Alex Photography
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Capturing moments that tell stories. Professional photography for
            weddings, portraits, events, and commercial work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById("portfolio").scrollIntoView()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>View Portfolio</span>
              <span>→</span>
            </button>
            <button className="border-2 border-blue-400 text-blue-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300">
              Book Session
            </button>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore my latest work and discover the stories behind each photograph
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-12">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="flex-1 px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-black/30 text-gray-300 hover:bg-black/50 border border-gray-600"
                }`}
              >
                All Projects
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-black/30 text-gray-300 hover:bg-black/50 border border-gray-600"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => openGallery(project)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.images[0] || "https://via.placeholder.com/400x300"}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {project.isFeatured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        View Gallery
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">
                        {project.images.length} {project.images.length === 1 ? "Photo" : "Photos"}
                      </span>
                      <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
                        View Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6 bg-black/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Alex
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              With over 10 years of experience in photography, I specialize in
              capturing authentic moments that tell compelling stories. From intimate
              portraits to grand landscapes, every image is crafted with passion and precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📸</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                <p className="text-gray-300">
                  10+ years experience
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Award Winning</h3>
                <p className="text-gray-300">
                  Recognized excellence
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">❤️</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Passionate</h3>
                <p className="text-gray-300">
                  Love for photography
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let&apos;s Create Together
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to capture your special moments? Get in touch to discuss your photography needs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email</p>
                      <p className="text-gray-300">alex@photography.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Phone</p>
                      <p className="text-gray-300">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Location</p>
                      <p className="text-gray-300">New York, NY</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">
                  Quick Contact
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                  />
                  <textarea
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/20 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📸</span>
            </div>
            <span className="text-xl font-bold">Alex Photography</span>
          </div>

          <p className="text-gray-300 mb-6">
            Capturing moments that last a lifetime.
          </p>

          <div className="flex justify-center space-x-8 text-gray-400">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              LinkedIn
            </a>
          </div>

          <p className="text-gray-500 mt-6 text-sm">
            © 2024 Alex Photography. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Gallery Modal */}
      <AnimatePresence>
        {showGallery && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black/50 backdrop-blur-md rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-300">{selectedProject.description}</p>
                </div>
                <button
                  onClick={closeGallery}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedProject.images.map((image, index) => (
                  <div key={index} className="relative overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${selectedProject.title} ${index + 1}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

PhotographyPortfolioTemplate.displayName = "PhotographyPortfolioTemplate";

export default PhotographyPortfolioTemplate;
