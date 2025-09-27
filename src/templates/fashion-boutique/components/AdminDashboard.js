import React, { useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";

const AdminDashboard = ({ tenantId }) => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    { id: "products", label: "Products", icon: "👗" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <AdminProducts tenantId={tenantId} />;
      case "orders":
        return <AdminOrders tenantId={tenantId} />;
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Sales
                </h3>
                <p className="text-3xl font-bold text-green-600">$12,345</p>
                <p className="text-sm text-gray-500">+12% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Orders
                </h3>
                <p className="text-3xl font-bold text-blue-600">156</p>
                <p className="text-sm text-gray-500">+8% from last month</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Products Sold
                </h3>
                <p className="text-3xl font-bold text-purple-600">423</p>
                <p className="text-sm text-gray-500">+15% from last month</p>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Store Settings</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                General Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input
                    type="text"
                    defaultValue="FashionBoutique"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Discover the latest trends in fashion with our curated collection of stylish and elegant pieces."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">FB</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Fashion Boutique Admin
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">View live site</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>

              <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-pink-500 text-pink-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
