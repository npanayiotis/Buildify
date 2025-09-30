import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Globe,
  TrendingUp,
  DollarSign,
  Eye,
  Settings,
  BarChart3,
  Zap,
  Crown,
  Bot,
  Palette,
  Shield,
  Activity,
  ArrowUpRight,
} from "lucide-react";

const AdminDashboard = () => {
  // Mock data for admin metrics
  const metrics = {
    totalUsers: 2847,
    activeWebsites: 1923,
    monthlyRevenue: 45620,
    templateDownloads: 12847,
    userGrowth: 23.5,
    websiteGrowth: 18.2,
    revenueGrowth: 12.8,
    downloadGrowth: 31.4,
  };

  const recentActivity = [
    {
      type: "website_created",
      user: "John Doe",
      template: "Restaurant Pro",
      time: "2 min ago",
    },
    {
      type: "template_download",
      user: "Sarah Wilson",
      template: "Gym Elite",
      time: "5 min ago",
    },
    {
      type: "website_published",
      user: "Mike Chen",
      template: "Portfolio Modern",
      time: "8 min ago",
    },
    {
      type: "subscription_upgrade",
      user: "Emma Davis",
      template: "E-commerce Plus",
      time: "12 min ago",
    },
  ];

  const topTemplates = [
    { name: "Restaurant Pro", downloads: 1247, revenue: "$12,470" },
    { name: "Gym Elite", downloads: 892, revenue: "$8,920" },
    { name: "Portfolio Modern", downloads: 756, revenue: "$7,560" },
    { name: "E-commerce Plus", downloads: 634, revenue: "$15,850" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+{metrics.userGrowth}%
              </div>
            </div>
            <h3 className="text-white/70 text-sm mb-1">Total Users</h3>
            <p className="text-3xl font-bold text-white">
              {metrics.totalUsers.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+{metrics.websiteGrowth}%
              </div>
            </div>
            <h3 className="text-white/70 text-sm mb-1">Active Websites</h3>
            <p className="text-3xl font-bold text-white">
              {metrics.activeWebsites.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+{metrics.revenueGrowth}%
              </div>
            </div>
            <h3 className="text-white/70 text-sm mb-1">Monthly Revenue</h3>
            <p className="text-3xl font-bold text-white">
              ${metrics.monthlyRevenue.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />+{metrics.downloadGrowth}
                %
              </div>
            </div>
            <h3 className="text-white/70 text-sm mb-1">Template Downloads</h3>
            <p className="text-3xl font-bold text-white">
              {metrics.templateDownloads.toLocaleString()}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </h3>
              <button className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1">
                View All
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      created website with{" "}
                      <span className="text-blue-400">{activity.template}</span>
                    </p>
                    <p className="text-white/50 text-xs">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Templates */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Top Templates
              </h3>
            </div>
            <div className="space-y-4">
              {topTemplates.map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {template.name}
                      </p>
                      <p className="text-white/50 text-xs">
                        {template.downloads} downloads
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-sm font-semibold">
                      {template.revenue}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/templates" className="group">
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105">
                <Palette className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">
                  Manage Templates
                </h4>
                <p className="text-white/70 text-sm">
                  Add, edit, and organize website templates
                </p>
              </div>
            </Link>

            <Link href="/admin/users" className="group">
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group-hover:scale-105">
                <Users className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">
                  User Management
                </h4>
                <p className="text-white/70 text-sm">
                  View and manage platform users
                </p>
              </div>
            </Link>

            <Link href="/admin/analytics" className="group">
              <div className="p-4 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 group-hover:scale-105">
                <BarChart3 className="w-8 h-8 text-pink-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Analytics</h4>
                <p className="text-white/70 text-sm">
                  View detailed platform analytics
                </p>
              </div>
            </Link>

            <Link href="/monderna" className="group">
              <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group-hover:scale-105">
                <Bot className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Monderna AI</h4>
                <p className="text-white/70 text-sm">
                  Configure AI assistant settings
                </p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
