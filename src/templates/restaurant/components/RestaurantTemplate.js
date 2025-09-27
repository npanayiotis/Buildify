import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lazy3DCanvas from "../../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedTorus,
  OptimizedOrbitControls,
} from "../../../components/Templates/Performance3DComponents";

const RestaurantTemplate = memo(() => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, [selectedCategory, searchQuery]);

  const fetchMenuItems = async () => {
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

      const response = await fetch(`/api/templates/restaurant/menu?${params}`);
      const data = await response.json();
      if (data.success) {
        setMenuItems(data.data);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      // Set default menu items if API fails
      setMenuItems([
        {
          id: "1",
          name: "Grilled Salmon",
          description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon",
          price: 28.99,
          imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500",
          category: "Main Course",
          ingredients: ["Salmon", "Lemon", "Herbs", "Olive Oil"],
          allergens: ["Fish"],
          isFeatured: true,
        },
        {
          id: "2",
          name: "Beef Tenderloin",
          description: "Premium beef tenderloin with red wine reduction and seasonal vegetables",
          price: 35.99,
          imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
          category: "Main Course",
          ingredients: ["Beef", "Red Wine", "Vegetables", "Butter"],
          allergens: ["Dairy"],
          isFeatured: true,
        },
        {
          id: "3",
          name: "Caesar Salad",
          description: "Crisp romaine lettuce with parmesan cheese, croutons, and our signature dressing",
          price: 12.99,
          imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
          category: "Appetizer",
          ingredients: ["Romaine", "Parmesan", "Croutons", "Caesar Dressing"],
          allergens: ["Dairy", "Gluten"],
          isFeatured: false,
        },
        {
          id: "4",
          name: "Chocolate Lava Cake",
          description: "Warm chocolate cake with molten center, served with vanilla ice cream",
          price: 8.99,
          imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500",
          category: "Dessert",
          ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Vanilla Ice Cream"],
          allergens: ["Dairy", "Eggs", "Gluten"],
          isFeatured: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/templates/restaurant/menu/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([
        { name: "Appetizer", slug: "appetizer", count: 1 },
        { name: "Main Course", slug: "main-course", count: 2 },
        { name: "Dessert", slug: "dessert", count: 1 },
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

  const openReservationModal = () => {
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-100 text-gray-900">
      {/* Optimized 3D Background */}
      <Lazy3DCanvas camera={{ position: [0, 0, 5], fov: 75 }} className="z-0">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OptimizedSphere
          position={[-2, 1, -2]}
          color="#F97316"
          scale={1.2}
          args={[1, 32, 32]}
        />
        <OptimizedSphere
          position={[2, -1, -1]}
          color="#DC2626"
          scale={0.8}
          args={[1, 32, 32]}
        />
        <OptimizedBox
          position={[0, 0, -3]}
          color="#EF4444"
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
          color="#EAB308"
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
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🍽️</span>
          </div>
          <span className="text-xl font-bold">Bella Vista Restaurant</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-orange-600 transition-colors">
            Home
          </a>
          <a href="#menu" className="hover:text-orange-600 transition-colors">
            Menu
          </a>
          <a href="#about" className="hover:text-orange-600 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-orange-600 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={openReservationModal}
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300"
          >
            Make Reservation
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
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent"
          >
            Bella Vista Restaurant
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Experience exquisite cuisine in an elegant atmosphere. Fresh ingredients,
            masterful preparation, and exceptional service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById("menu").scrollIntoView()}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>View Menu</span>
              <span>→</span>
            </button>
            <button
              onClick={openReservationModal}
              className="border-2 border-orange-400 text-orange-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-400 hover:text-white transition-all duration-300"
            >
              Reserve Table
            </button>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
              Our Menu
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Carefully crafted dishes made with the finest ingredients
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
                  placeholder="Search menu items..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300"
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
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
                    : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-300"
                }`}
              >
                All Items
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white"
                      : "bg-white text-gray-700 hover:bg-orange-50 border border-gray-300"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/400x250"}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.isFeatured && (
                      <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-lg font-bold text-orange-600">
                        ${item.price}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.name}
                      </h3>
                      <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Ingredients:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {item.ingredients?.slice(0, 3).map((ingredient) => (
                          <span
                            key={ingredient}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {ingredient}
                          </span>
                        ))}
                        {item.ingredients?.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{item.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {item.allergens && item.allergens.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-red-600 mb-1">
                          Allergens:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {item.allergens.map((allergen) => (
                            <span
                              key={allergen}
                              className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                            >
                              {allergen}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
              About Bella Vista
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              For over two decades, Bella Vista has been serving exceptional cuisine
              in the heart of the city. Our commitment to quality, innovation, and
              hospitality has made us a beloved destination for food lovers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Chefs</h3>
                <p className="text-gray-600">
                  World-class culinary expertise
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
                <p className="text-gray-600">
                  Locally sourced, premium quality
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Award Winning</h3>
                <p className="text-gray-600">
                  Recognized excellence in dining
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent">
              Visit Us
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              We&apos;d love to welcome you to our restaurant. Make a reservation today!
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
                  Restaurant Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600">123 Culinary Street, Food District</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">🕒</span>
                    </div>
                    <div>
                      <p className="font-semibold">Hours</p>
                      <p className="text-gray-600">Mon-Sun: 5:00 PM - 11:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Quick Reservation
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    Ready to experience fine dining? Make a reservation now!
                  </p>
                  <button
                    onClick={openReservationModal}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-semibold text-lg"
                  >
                    Make a Reservation
                  </button>
                  <p className="text-sm text-gray-500 text-center">
                    Or call us directly for special requests
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍽️</span>
            </div>
            <span className="text-xl font-bold">Bella Vista Restaurant</span>
          </div>

          <p className="text-gray-600 mb-6">
            Fine dining experience with exceptional cuisine and hospitality.
          </p>

          <div className="flex justify-center space-x-8 text-gray-600">
            <a href="#" className="hover:text-orange-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-orange-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-orange-600 transition-colors">
              Contact
            </a>
          </div>

          <p className="text-gray-500 mt-6 text-sm">
            © 2024 Bella Vista Restaurant. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showReservationModal && (
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
              className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Make a Reservation
                </h3>
                <button
                  onClick={closeReservationModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time
                    </label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select Time</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="21:30">9:30 PM</option>
                      <option value="22:00">10:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select Guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="7">7 Guests</option>
                    <option value="8">8 Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                    placeholder="Any special dietary requirements or occasion notes..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeReservationModal}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-semibold"
                  >
                    Make Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

RestaurantTemplate.displayName = "RestaurantTemplate";

export default RestaurantTemplate;
