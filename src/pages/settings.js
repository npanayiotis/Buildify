import React, { useState } from "react";
import Link from "next/link";
import DashboardLayout from "../components/Layout/DashboardLayout";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile Information", icon: "👤" },
    { id: "billing", label: "Billing & Subscription", icon: "💳" },
    { id: "security", label: "Security & Privacy", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
  ];

  const ProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Profile Information
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                defaultValue="Acme Inc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title
              </label>
              <input
                type="text"
                defaultValue="Head of Everything"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AccountTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Account Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Enable
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">API Access</h4>
              <p className="text-sm text-gray-500">
                Generate API keys for programmatic access
              </p>
            </div>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
              Manage
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Data & Privacy
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Download Data</h4>
              <p className="text-sm text-gray-500">
                Export all your data in a portable format
              </p>
            </div>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
              Download
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all data
              </p>
            </div>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BillingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Current Plan
        </h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-blue-900">
                Professional Plan
              </h4>
              <p className="text-blue-700">$29/month • Billed monthly</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Change Plan
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">V</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Update
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Billing History
        </h3>
        <div className="space-y-3">
          {[
            { date: "Oct 1, 2023", amount: "$29.00", status: "Paid" },
            { date: "Sep 1, 2023", amount: "$29.00", status: "Paid" },
            { date: "Aug 1, 2023", amount: "$29.00", status: "Paid" },
          ].map((invoice, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{invoice.date}</p>
                <p className="text-sm text-gray-500">{invoice.status}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">
                  {invoice.amount}
                </span>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Email Notifications
        </h3>
        <div className="space-y-4">
          {[
            {
              label: "New inquiries",
              description: "Get notified when someone contacts you",
            },
            {
              label: "Booking confirmations",
              description: "Receive booking confirmations and reminders",
            },
            {
              label: "Payment updates",
              description: "Get notified about payment status changes",
            },
            {
              label: "System updates",
              description: "Receive important platform updates",
            },
          ].map((notification, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">
                  {notification.label}
                </h4>
                <p className="text-sm text-gray-500">
                  {notification.description}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Active Sessions
        </h3>
        <div className="space-y-3">
          {[
            {
              device: "MacBook Pro",
              location: "San Francisco, CA",
              lastActive: "Current session",
            },
            {
              device: "iPhone 14",
              location: "San Francisco, CA",
              lastActive: "2 hours ago",
            },
            {
              device: "Chrome on Windows",
              location: "New York, NY",
              lastActive: "1 day ago",
            },
          ].map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{session.device}</h4>
                <p className="text-sm text-gray-500">
                  {session.location} • {session.lastActive}
                </p>
              </div>
              <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const IntegrationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Connected Services
        </h3>
        <div className="space-y-4">
          {[
            {
              name: "Stripe",
              description: "Payment processing",
              status: "Connected",
              icon: "💳",
            },
            {
              name: "Google Analytics",
              description: "Website analytics",
              status: "Connected",
              icon: "📊",
            },
            {
              name: "SendGrid",
              description: "Email marketing",
              status: "Not connected",
              icon: "📧",
            },
            {
              name: "Google Calendar",
              description: "Appointment scheduling",
              status: "Connected",
              icon: "📅",
            },
          ].map((integration, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {integration.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {integration.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    integration.status === "Connected"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {integration.status}
                </span>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    integration.status === "Connected"
                      ? "bg-gray-600 text-white hover:bg-gray-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } transition-colors`}
                >
                  {integration.status === "Connected"
                    ? "Disconnect"
                    : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "account":
        return <AccountTab />;
      case "billing":
        return <BillingTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      case "integrations":
        return <IntegrationsTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">
                  SiteCraft
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/templates"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/customize"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Customize
              </Link>
              <Link
                href="/publish"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Publish
              </Link>
              <Link
                href="/settings"
                className="bg-blue-100 text-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Settings
              </Link>
              <Link
                href="/help"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Help
              </Link>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                + New Site
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - Settings Navigation */}
        <div className="w-64 bg-gray-100 min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right Content - Settings Content */}
        <div className="flex-1 p-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Profile Information
            </h1>
            <p className="text-gray-600 mb-8">
              Manage your personal details and preferences.
            </p>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
