import React, { useState } from "react";
import AdminPosts from "./AdminPosts";
import AdminComments from "./AdminComments";

const AdminDashboard = ({ tenantId }) => {
  const [activeTab, setActiveTab] = useState("posts");

  const tabs = [
    { id: "posts", label: "Posts", icon: "📝" },
    { id: "comments", label: "Comments", icon: "💬" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <AdminPosts tenantId={tenantId} />;
      case "comments":
        return <AdminComments tenantId={tenantId} />;
      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Blog Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Posts
                </h3>
                <p className="text-3xl font-bold text-blue-600">24</p>
                <p className="text-sm text-gray-500">+3 this month</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Total Views
                </h3>
                <p className="text-3xl font-bold text-green-600">1,234</p>
                <p className="text-sm text-gray-500">+156 this week</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Comments
                </h3>
                <p className="text-3xl font-bold text-purple-600">89</p>
                <p className="text-sm text-gray-500">+12 this week</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Subscribers
                </h3>
                <p className="text-3xl font-bold text-orange-600">156</p>
                <p className="text-sm text-gray-500">+8 this month</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Posts
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">My Journey in Web Development</span>
                    <span className="text-sm font-semibold text-blue-600">234 views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Travel Tips for Digital Nomads</span>
                    <span className="text-sm font-semibold text-blue-600">189 views</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Welcome to My Personal Blog</span>
                    <span className="text-sm font-semibold text-blue-600">156 views</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Categories
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Technology</span>
                    <span className="text-sm font-semibold text-green-600">8 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Travel</span>
                    <span className="text-sm font-semibold text-green-600">6 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Personal</span>
                    <span className="text-sm font-semibold text-green-600">5 posts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Blog Settings</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                General Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    defaultValue="My Personal Blog"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Sharing thoughts, experiences, and insights about life, technology, and everything in between."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author Bio
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Passionate writer and developer sharing experiences and insights through blogging."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                Save Settings
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comment Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="commentModeration"
                    defaultChecked
                    className="mr-2"
                  />
                  <label htmlFor="commentModeration" className="text-sm font-medium text-gray-700">
                    Require comment approval
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="commentNotifications"
                    defaultChecked
                    className="mr-2"
                  />
                  <label htmlFor="commentNotifications" className="text-sm font-medium text-gray-700">
                    Email notifications for new comments
                  </label>
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                Save Comment Settings
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                SEO Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    defaultValue="Personal blog sharing insights about technology, travel, and life experiences."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Keywords
                  </label>
                  <input
                    type="text"
                    defaultValue="blog, technology, travel, personal, web development"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
                Save SEO Settings
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
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">📝</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Blog Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">View live blog</span>
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

              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors">
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
                    ? "border-blue-500 text-blue-600"
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
