import React, { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import ProductCard from "../components/Products/ProductCard";

const Products = () => {
  const [viewMode, setViewMode] = useState("grid"); // grid or table
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Templates",
    "Services",
    "Add-ons",
    "Consulting"
  ];

  const products = [
    {
      id: 1,
      name: "Restaurant Template",
      category: "Templates",
      description: "Complete restaurant website with menu, reservations, and online ordering",
      price: 99,
      stock: 50,
      views: 1250,
      status: "active",
      icon: "🍽️"
    },
    {
      id: 2,
      name: "Fitness Center Template",
      category: "Templates",
      description: "Gym website with class schedules, membership signup, and trainer profiles",
      price: 149,
      stock: 30,
      views: 890,
      status: "active",
      icon: "💪"
    },
    {
      id: 3,
      name: "Real Estate Template",
      category: "Templates",
      description: "Property listings website with search filters and virtual tours",
      price: 199,
      stock: 25,
      views: 2100,
      status: "active",
      icon: "🏠"
    },
    {
      id: 4,
      name: "SaaS Landing Page",
      category: "Templates",
      description: "Modern SaaS startup landing page with pricing and features",
      price: 129,
      stock: 40,
      views: 1650,
      status: "active",
      icon: "💻"
    },
    {
      id: 5,
      name: "Website Setup Service",
      category: "Services",
      description: "Complete website setup including domain, hosting, and basic customization",
      price: 299,
      stock: 100,
      views: 450,
      status: "active",
      icon: "⚙️"
    },
    {
      id: 6,
      name: "SEO Optimization",
      category: "Services",
      description: "Search engine optimization for better Google rankings",
      price: 199,
      stock: 50,
      views: 320,
      status: "active",
      icon: "📈"
    },
    {
      id: 7,
      name: "Custom Domain Setup",
      category: "Add-ons",
      description: "Professional domain setup with SSL certificate",
      price: 49,
      stock: 200,
      views: 680,
      status: "active",
      icon: "🌐"
    },
    {
      id: 8,
      name: "E-commerce Integration",
      category: "Add-ons",
      description: "Stripe and PayPal payment integration for online stores",
      price: 79,
      stock: 75,
      views: 420,
      status: "active",
      icon: "💳"
    },
    {
      id: 9,
      name: "Brand Consultation",
      category: "Consulting",
      description: "1-hour consultation for brand strategy and website direction",
      price: 150,
      stock: 20,
      views: 180,
      status: "active",
      icon: "💡"
    },
    {
      id: 10,
      name: "Content Migration",
      category: "Services",
      description: "Move your existing content to your new SiteCraft website",
      price: 249,
      stock: 30,
      views: 95,
      status: "draft",
      icon: "📦"
    }
  ];

  const filteredProducts = products.filter(product => 
    selectedCategory === "All" || product.category === selectedCategory
  );

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    totalRevenue: products.reduce((sum, p) => sum + (p.price * p.views), 0),
    totalViews: products.reduce((sum, p) => sum + p.views, 0)
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products & Services</h1>
            <p className="mt-2 text-gray-600">Manage your templates, services, and add-ons.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "grid" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "table" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Table
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              + New Product
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="text-2xl text-gray-400">📦</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="text-2xl text-green-400">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="text-2xl text-blue-400">👀</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Potential Revenue</p>
                <p className="text-2xl font-bold text-green-600">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="text-2xl text-green-400">💰</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          <div className="flex items-center space-x-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Content */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
                            <span className="text-lg">{product.icon}</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.views.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'active' ? 'bg-green-100 text-green-800' :
                          product.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-gray-600 hover:text-gray-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Products;
