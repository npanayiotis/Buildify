import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plane, MapPin, DollarSign, Users, TrendingUp, BarChart3 } from "lucide-react";
import AdminPackages from "./AdminPackages";
import AdminBookings from "./AdminBookings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "packages", label: "Packages", icon: MapPin },
    { id: "bookings", label: "Bookings", icon: Plane },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "packages":
        return <AdminPackages />;
      case "bookings":
        return <AdminBookings />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Travel Agency Admin</h1>
              <p className="text-gray-600">Manage your travel packages and bookings</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✈️</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

const OverviewTab = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [packagesResponse, bookingsResponse] = await Promise.all([
        fetch("/api/templates/travel-agency/packages"),
        fetch("/api/templates/travel-agency/bookings/stats"),
      ]);

      const packagesData = await packagesResponse.json();
      const bookingsData = await bookingsResponse.json();

      if (packagesData.success && bookingsData.success) {
        setStats({
          totalPackages: packagesData.data.length,
          totalBookings: bookingsData.data.total || 0,
          totalRevenue: bookingsData.data.totalRevenue || 0,
          pendingBookings: bookingsData.data.pending || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      title: "Total Packages",
      value: stats.totalPackages,
      icon: MapPin,
      color: "blue",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: Plane,
      color: "green",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "purple",
      change: "+18%",
      changeType: "positive",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: TrendingUp,
      color: "yellow",
      change: "-5%",
      changeType: "negative",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: "bg-blue-100 text-blue-600",
            green: "bg-green-100 text-green-600",
            purple: "bg-purple-100 text-purple-600",
            yellow: "bg-yellow-100 text-yellow-600",
          };

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${colorClasses[stat.color]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Add Package</div>
              <div className="text-sm text-gray-500">Create a new travel package</div>
            </div>
          </button>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <Plane className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">View Bookings</div>
              <div className="text-sm text-gray-500">Manage customer bookings</div>
            </div>
          </button>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Analytics</div>
              <div className="text-sm text-gray-500">View travel analytics</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">New booking for &quot;Paris Adventure&quot; package</p>
              <p className="text-xs text-gray-500">5 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Package &quot;Tokyo Discovery&quot; updated</p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Booking #TB-12345 confirmed</p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
