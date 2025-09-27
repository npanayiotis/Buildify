import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lazy3DCanvas from "../../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedTorus,
  OptimizedOrbitControls,
} from "../../../components/Templates/Performance3DComponents";

const FashionBoutiqueTemplate = memo(() => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchCart();
  }, []);

  const fetchProducts = async (category = selectedCategory, search = searchQuery) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (category && category !== "all") params.append("category", category);
      if (search) params.append("search", search);
      if (params.toString()) params.append("featured", "true");

      const response = await fetch(`/api/templates/fashion-boutique/products?${params}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Set default products if API fails
      setProducts([
        {
          id: "1",
          name: "Elegant Summer Dress",
          description: "Beautiful floral summer dress perfect for any occasion",
          price: 89.99,
          comparePrice: 129.99,
          images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
          category: "Dresses",
          tags: ["summer", "floral", "elegant"],
          inventory: 10,
          isFeatured: true,
        },
        {
          id: "2",
          name: "Classic Blazer",
          description: "Professional blazer for business and formal events",
          price: 149.99,
          images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"],
          category: "Blazers",
          tags: ["professional", "formal", "classic"],
          inventory: 5,
          isFeatured: true,
        },
        {
          id: "3",
          name: "Trendy Jeans",
          description: "Comfortable and stylish jeans for everyday wear",
          price: 79.99,
          images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
          category: "Jeans",
          tags: ["casual", "comfortable", "trendy"],
          inventory: 15,
          isFeatured: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/templates/fashion-boutique/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([
        { id: "1", name: "Dresses", slug: "dresses" },
        { id: "2", name: "Blazers", slug: "blazers" },
        { id: "3", name: "Jeans", slug: "jeans" },
        { id: "4", name: "Accessories", slug: "accessories" },
      ]);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch("/api/templates/fashion-boutique/cart?sessionId=anonymous");
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch("/api/templates/fashion-boutique/cart?action=add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
          sessionId: "anonymous",
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchCart();
        // Show success message
        alert("Product added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchProducts(category, searchQuery);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(selectedCategory, searchQuery);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 text-gray-900">
      {/* Optimized 3D Background */}
      <Lazy3DCanvas camera={{ position: [0, 0, 5], fov: 75 }} className="z-0">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OptimizedSphere
          position={[-2, 1, -2]}
          color="#EC4899"
          scale={1.2}
          args={[1, 32, 32]}
        />
        <OptimizedSphere
          position={[2, -1, -1]}
          color="#A855F7"
          scale={0.8}
          args={[1, 32, 32]}
        />
        <OptimizedBox
          position={[0, 0, -3]}
          color="#F472B6"
          scale={1}
          args={[0.4, 0.4, 0.4]}
        />
        <OptimizedBox
          position={[-1.5, -1, -2]}
          color="#C084FC"
          scale={0.6}
          args={[0.3, 0.3, 0.3]}
        />
        <OptimizedTorus
          position={[1.5, 1, -1]}
          color="#FBBF24"
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
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">FB</span>
          </div>
          <span className="text-xl font-bold">FashionBoutique</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-pink-600 transition-colors">
            Home
          </a>
          <a href="#products" className="hover:text-pink-600 transition-colors">
            Products
          </a>
          <a href="#about" className="hover:text-pink-600 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-pink-600 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCart(true)}
            className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
            </svg>
            {cart.items && cart.items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cart.items.length}
              </span>
            )}
          </button>
          <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300">
            Sign In
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
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Fashion Forward
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Discover the latest trends in fashion with our curated collection of
            stylish and elegant pieces.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById("products").scrollIntoView()}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-pink-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Shop Now</span>
              <span>→</span>
            </button>
            <button className="border-2 border-pink-400 text-pink-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-pink-400 hover:text-white transition-all duration-300">
              View Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Our Products
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Handpicked fashion pieces that define style and elegance
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
                  placeholder="Search products..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
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
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-300"
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0] || "https://via.placeholder.com/400x400"}
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isFeatured && (
                      <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button
                        onClick={() => addToCart(product.id)}
                        className="opacity-0 group-hover:opacity-100 bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-all duration-300"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-pink-600">
                          ${product.price}
                        </span>
                        {product.comparePrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${product.comparePrice}
                          </span>
                        )}
                      </div>
                      {product.inventory < 5 && (
                        <span className="text-sm text-orange-600 font-medium">
                          Only {product.inventory} left!
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                    >
                      Add to Cart
                    </button>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About FashionBoutique
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              We believe that fashion is a form of self-expression. Our carefully
              curated collection brings you the latest trends while maintaining
              timeless elegance and quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Curated Selection</h3>
                <p className="text-gray-600">
                  Every piece is handpicked by our fashion experts
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
                <p className="text-gray-600">
                  Free shipping on orders over $100
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  High-quality materials and craftsmanship
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Have questions about our products? We&apos;d love to hear from you!
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
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">hello@fashionboutique.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📞</span>
                    </div>
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold">Address</p>
                      <p className="text-gray-600">123 Fashion Street, Style City</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Send us a Message
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-semibold"
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
      <footer className="relative z-10 py-12 px-6 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">FB</span>
            </div>
            <span className="text-xl font-bold">FashionBoutique</span>
          </div>

          <p className="text-gray-600 mb-6">
            Bringing you the latest in fashion trends and timeless elegance.
          </p>

          <div className="flex justify-center space-x-8 text-gray-600">
            <a href="#" className="hover:text-pink-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-pink-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-pink-600 transition-colors">
              Contact
            </a>
          </div>

          <p className="text-gray-500 mt-6 text-sm">
            © 2024 FashionBoutique. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Shopping Cart Modal */}
      <AnimatePresence>
        {showCart && (
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
              className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Shopping Cart
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.items && cart.items.length > 0 ? (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.product.images[0] || "https://via.placeholder.com/100x100"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{item.product.name}</h4>
                        <p className="text-gray-600">${item.product.price} x {item.quantity}</p>
                      </div>
                      <div className="text-lg font-bold text-pink-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-xl font-bold text-pink-600">
                        ${cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                      Checkout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🛒</div>
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => setShowCart(false)}
                    className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FashionBoutiqueTemplate.displayName = "FashionBoutiqueTemplate";

export default FashionBoutiqueTemplate;
