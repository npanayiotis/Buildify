import React, { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import MetricCard from "../components/Analytics/MetricCard";
import ChartCard from "../components/Analytics/ChartCard";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const metrics = [
    {
      title: "Total Visitors",
      value: "12,450",
      change: "15% from last month",
      changeType: "positive",
      icon: "👥",
      description: "Unique visitors to your sites"
    },
    {
      title: "Page Views",
      value: "45,230",
      change: "8% from last month",
      changeType: "positive",
      icon: "📄",
      description: "Total page views across all sites"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "0.5% from last month",
      changeType: "positive",
      icon: "🎯",
      description: "Visitors who completed desired actions"
    },
    {
      title: "Bounce Rate",
      value: "42%",
      change: "2% from last month",
      changeType: "negative",
      icon: "↩️",
      description: "Visitors who left after viewing one page"
    },
    {
      title: "Avg. Session Duration",
      value: "2m 34s",
      change: "12s from last month",
      changeType: "positive",
      icon: "⏱️",
      description: "Average time spent on your sites"
    },
    {
      title: "Top Traffic Source",
      value: "Google",
      change: "25% of total traffic",
      changeType: "neutral",
      icon: "🔍",
      description: "Organic search traffic"
    }
  ];

  const charts = [
    {
      title: "Traffic Overview",
      type: "line",
      description: "Daily visitors and page views over time"
    },
    {
      title: "Traffic Sources",
      type: "doughnut",
      description: "Breakdown of where your visitors come from"
    },
    {
      title: "Top Pages",
      type: "bar",
      description: "Most visited pages across all sites"
    },
    {
      title: "Device Breakdown",
      type: "doughnut",
      description: "Desktop vs mobile vs tablet traffic"
    },
    {
      title: "Geographic Distribution",
      type: "bar",
      description: "Visitors by country and region"
    },
    {
      title: "Conversion Funnel",
      type: "area",
      description: "User journey from visit to conversion"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="mt-2 text-gray-600">Track performance and insights across all your sites.</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {charts.map((chart, index) => (
            <ChartCard key={index} {...chart} timeRange={timeRange} />
          ))}
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performing Sites */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Sites</h3>
            <div className="space-y-4">
              {[
                { name: "Restaurant Template Demo", visitors: 2450, change: "+12%" },
                { name: "Fitness Center Template", visitors: 1890, change: "+8%" },
                { name: "Real Estate Template", visitors: 1650, change: "+15%" },
                { name: "SaaS Landing Page", visitors: 1420, change: "+5%" }
              ].map((site, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{site.name}</p>
                    <p className="text-sm text-gray-500">{site.visitors.toLocaleString()} visitors</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">{site.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "New site published", site: "Restaurant Template", time: "2 hours ago" },
                { action: "Template customized", site: "Fitness Center", time: "4 hours ago" },
                { action: "Domain connected", site: "Real Estate Template", time: "1 day ago" },
                { action: "Analytics updated", site: "SaaS Landing Page", time: "2 days ago" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.site} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
