import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  Eye,
  Edit3,
  Calendar,
  TrendingUp,
  Settings,
  Palette,
  Bot,
  Crown,
  Star,
  Users,
  Activity,
  ArrowUpRight,
  Plus,
  ExternalLink,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const UserDashboard = () => {
  // Mock user data
  const userMetrics = {
    websitesCreated: 3,
    templatesUsed: 2,
    totalViews: 1247,
    monthlyGrowth: 18.5,
    websitesPublished: 2,
    pendingWebsites: 1,
    favoriteTemplates: 5,
    accountLevel: "Premium",
  };

  const userWebsites = [
    {
      id: 1,
      name: "My Restaurant",
      template: "Restaurant Pro",
      status: "published",
      views: 892,
      lastUpdated: "2 days ago",
      url: "myrestaurant.elevare.com",
    },
    {
      id: 2,
      name: "Fitness Studio",
      template: "Gym Elite",
      status: "published",
      views: 355,
      lastUpdated: "1 week ago",
      url: "fitnessstudio.elevare.com",
    },
    {
      id: 3,
      name: "Portfolio Site",
      template: "Portfolio Modern",
      status: "draft",
      views: 0,
      lastUpdated: "3 days ago",
      url: null,
    },
  ];

  const recentActivity = [
    {
      type: "website_created",
      action: "Created new website",
      website: "Portfolio Site",
      time: "3 days ago",
      icon: Plus,
    },
    {
      type: "website_published",
      action: "Published website",
      website: "My Restaurant",
      time: "5 days ago",
      icon: CheckCircle,
    },
    {
      type: "template_used",
      action: "Used template",
      website: "Gym Elite",
      time: "1 week ago",
      icon: Palette,
    },
    {
      type: "customization",
      action: "Customized website",
      website: "Fitness Studio",
      time: "1 week ago",
      icon: Edit3,
    },
  ];

  const quickStats = [
    {
      label: "Total Views",
      value: userMetrics.totalViews.toLocaleString(),
      icon: Eye,
      color: "from-blue-500 to-purple-500",
    },
    {
      label: "Templates Used",
      value: userMetrics.templatesUsed.toString(),
      icon: Palette,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Published Sites",
      value: userMetrics.websitesPublished.toString(),
      icon: Globe,
      color: "from-pink-500 to-red-500",
    },
    {
      label: "Growth This Month",
      value: `+${userMetrics.monthlyGrowth}%`,
      icon: TrendingUp,
      color: "from-green-500 to-blue-500",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "published":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "draft":
        return <Edit3 className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-500/20 border-green-500/30 text-green-400";
      case "draft":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      default:
        return "bg-gray-500/20 border-gray-500/30 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-white/70 text-sm">
                  Welcome back! Here&apos;s your website overview
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">
                  {userMetrics.accountLevel}
                </span>
              </div>
              <Link href="/templates">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Create Website
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-white/70 text-sm">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Websites */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                My Websites
              </h3>
              <Link
                href="/templates"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                Create New
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {userWebsites.map((website, index) => (
                <motion.div
                  key={website.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                        {website.name}
                      </h4>
                      <p className="text-white/70 text-sm">
                        {website.template}
                      </p>
                      <p className="text-white/50 text-xs">
                        Updated {website.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(website.status)}
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                            website.status
                          )}`}
                        >
                          {website.status}
                        </span>
                      </div>
                      <p className="text-white/70 text-sm">
                        {website.views.toLocaleString()} views
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/customize?website=${website.id}`}>
                        <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </Link>
                      {website.url && (
                        <Link href={`https://${website.url}`} target="_blank">
                          <button className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </h3>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm">
                        {activity.action}{" "}
                        <span className="text-blue-400">
                          {activity.website}
                        </span>
                      </p>
                      <p className="text-white/50 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
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
            <Settings className="w-5 h-5" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/templates" className="group">
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105">
                <Palette className="w-8 h-8 text-blue-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">
                  Browse Templates
                </h4>
                <p className="text-white/70 text-sm">
                  Discover new website templates
                </p>
              </div>
            </Link>

            <Link href="/customize" className="group">
              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group-hover:scale-105">
                <Edit3 className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">Customize</h4>
                <p className="text-white/70 text-sm">
                  Edit your existing websites
                </p>
              </div>
            </Link>

            <Link href="/monderna" className="group">
              <div className="p-4 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 group-hover:scale-105">
                <Bot className="w-8 h-8 text-pink-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">
                  Chat with Monderna
                </h4>
                <p className="text-white/70 text-sm">
                  Get help from AI assistant
                </p>
              </div>
            </Link>

            <Link href="/settings" className="group">
              <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 group-hover:scale-105">
                <Settings className="w-8 h-8 text-green-400 mb-3" />
                <h4 className="text-white font-semibold mb-1">
                  Account Settings
                </h4>
                <p className="text-white/70 text-sm">Manage your account</p>
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Tips & Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">💡 Pro Tip</h3>
              <p className="text-white/80 mb-4">
                You have 1 draft website! Complete your Portfolio Site to
                showcase your work. Consider adding a blog section to boost your
                SEO and engage visitors.
              </p>
              <div className="flex gap-3">
                <Link href="/customize?website=3">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 text-sm">
                    Complete Portfolio
                  </button>
                </Link>
                <Link href="/monderna">
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 text-sm">
                    Ask Monderna for Tips
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
