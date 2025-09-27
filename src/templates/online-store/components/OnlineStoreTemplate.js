import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart, Search, Filter } from "lucide-react";

const OnlineStoreTemplate = React.memo(
  ({ customization: externalCustomization = {} }) => {
    const [customization, setCustomization] = useState({
      // Branding
      primaryColor: externalCustomization.primaryColor || "#3B82F6",
      secondaryColor: externalCustomization.secondaryColor || "#1D4ED8",
      accentColor: externalCustomization.accentColor || "#F59E0B",
      textColor: externalCustomization.textColor || "#1F2937",
      backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

      // Content
      siteName: externalCustomization.siteName || "Online Store",
      heroTitle: externalCustomization.heroTitle || "Welcome to Our Store",
      heroSubtitle:
        externalCustomization.heroSubtitle ||
        "Discover amazing products at unbeatable prices",
      heroImage: externalCustomization.heroImage || "",

      // Store Details
      storeDescription:
        externalCustomization.storeDescription ||
        "Your one-stop shop for quality products at great prices.",
      contactEmail:
        externalCustomization.contactEmail || "support@onlinestore.com",
      phoneNumber: externalCustomization.phoneNumber || "+1 (555) 123-4567",
      address:
        externalCustomization.address ||
        "123 Commerce St, Business City, BC 12345",

      // Social Links
      social: {
        facebook:
          externalCustomization.social?.facebook ||
          "https://facebook.com/onlinestore",
        twitter:
          externalCustomization.social?.twitter ||
          "https://twitter.com/onlinestore",
        instagram:
          externalCustomization.social?.instagram ||
          "https://instagram.com/onlinestore",
        linkedin:
          externalCustomization.social?.linkedin ||
          "https://linkedin.com/company/onlinestore",
      },
    });

    const [products, setProducts] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchProducts();
      fetchFeaturedProducts();
      fetchCart();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/templates/online-store/products");
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          "/api/templates/online-store/products/featured"
        );
        const data = await response.json();
        if (data.success) {
          setFeaturedProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await fetch("/api/templates/online-store/cart");
        const data = await response.json();
        if (data.success) {
          setCart(data.data?.items || []);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    const addToCart = async (productId, quantity = 1) => {
      try {
        const response = await fetch("/api/templates/online-store/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, quantity }),
        });

        if (response.ok) {
          fetchCart(); // Refresh cart
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    };

    const filteredProducts = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const categories = [
      ...new Set(products.map((product) => product.category).filter(Boolean)),
    ];

    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">🛒</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Loading Store...
            </h2>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {customization.siteName}
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button className="relative p-2 text-gray-600 hover:text-gray-900">
                  <ShoppingCart className="w-6 h-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {customization.heroTitle}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-8 text-blue-100"
            >
              {customization.heroSubtitle}
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </motion.button>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Featured Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={product.images?.[0] || "/placeholder-product.jpg"}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">
                          ${product.price}
                        </span>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <section className="py-8 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Filter by:</span>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              All Products
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={product.images?.[0] || "/placeholder-product.jpg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isFeatured && (
                        <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Featured
                        </div>
                      )}
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">
                          (4.8)
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-blue-600">
                            ${product.price}
                          </span>
                          {product.comparePrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.comparePrice}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Online Store</h3>
                <p className="text-gray-400">
                  Your one-stop shop for quality products at great prices.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Shipping
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Returns
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Customer Service</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Track Order
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Size Guide
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Online Store. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
);

OnlineStoreTemplate.displayName = "OnlineStoreTemplate";

export default OnlineStoreTemplate;
