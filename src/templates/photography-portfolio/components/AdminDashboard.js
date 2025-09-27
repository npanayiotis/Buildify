import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import AdminProjects from "./AdminProjects";

const AdminDashboard = memo(() => {
  const [activeTab, setActiveTab] = useState("projects");

  const tabs = [
    { id: "projects", name: "Portfolio Management", icon: "📸" },
    { id: "analytics", name: "Analytics", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📸</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Photography Admin</h1>
                <p className="text-sm text-gray-600">Alex Photography Portfolio</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome back, Admin
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "projects" && <AdminProjects />}
          {activeTab === "analytics" && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">Analytics coming soon...</div>
              <div className="text-gray-400 text-sm mt-2">
                Track your portfolio performance and engagement metrics
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
});

AdminDashboard.displayName = "AdminDashboard";

export default AdminDashboard;
