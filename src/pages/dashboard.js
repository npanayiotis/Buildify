import React from "react";
import Link from "next/link";
import DashboardLayout from "../components/Layout/DashboardLayout";
import KPICard from "../components/Dashboard/KPICard";
import AnalyticsChart from "../components/Dashboard/AnalyticsChart";
import InquiriesTable from "../components/Dashboard/InquiriesTable";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KPICard
            title="Total Inquiries"
            value="1,234"
            change="15% from last month"
            changeType="positive"
            icon="📧"
          />
          <KPICard
            title="New Bookings"
            value="56"
            change="10% from last week"
            changeType="positive"
            icon="📅"
          />
          <KPICard
            title="Revenue"
            value="$12,450"
            change="2% from last month"
            changeType="negative"
            icon="💳"
          />
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsChart title="Site Analytics" data={{}} type="line" />
          <AnalyticsChart title="Traffic Sources" data={{}} type="doughnut" />
        </div>

        {/* Recent Inquiries Table */}
        <InquiriesTable />

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="flex space-x-4">
            <Link
              href="/templates"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Templates
            </Link>
            <Link
              href="/customize"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Customize Site
            </Link>
            <Link
              href="/publish"
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
            >
              Publish Site
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
