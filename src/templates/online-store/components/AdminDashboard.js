import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <AdminProducts />;
      case "orders":
        return <AdminOrders />;
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
              <h1 className="text-3xl font-bold text-gray-900">
                Online Store Admin
              </h1>
              <p className="text-gray-600">Manage your e-commerce store</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🛒</span>
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
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsResponse, ordersResponse] = await Promise.all([
        fetch("/api/templates/online-store/products"),
        fetch("/api/templates/online-store/orders/stats"),
      ]);

      const productsData = await productsResponse.json();
      const ordersData = await ordersResponse.json();

      if (productsData.success && ordersData.success) {
        setStats({
          totalProducts: productsData.data.length,
          totalOrders: ordersData.data.total || 0,
          totalRevenue: ordersData.data.totalRevenue || 0,
          pendingOrders: ordersData.data.pending || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "blue",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "green",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "purple",
      change: "+15%",
      changeType: "positive",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: "yellow",
      change: "-3%",
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
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      colorClasses[stat.color]
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-2">
                    vs last month
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Add Product</div>
              <div className="text-sm text-gray-500">Create a new product</div>
            </div>
          </button>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">View Orders</div>
              <div className="text-sm text-gray-500">
                Manage customer orders
              </div>
            </div>
          </button>

          <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">Analytics</div>
              <div className="text-sm text-gray-500">
                View store performance
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                New order #ORD-12345 received
              </p>
              <p className="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Product &quot;Wireless Headphones&quot; updated
              </p>
              <p className="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Order #ORD-12344 shipped</p>
              <p className="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
