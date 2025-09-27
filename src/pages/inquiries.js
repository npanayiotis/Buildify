import React, { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import InquiryCard from "../components/Inquiries/InquiryCard";
import InquiryFilters from "../components/Inquiries/InquiryFilters";

const Inquiries = () => {
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    startDate: "",
    endDate: "",
    search: "",
  });

  const [viewMode, setViewMode] = useState("grid"); // grid or table

  const inquiries = [
    {
      id: 1,
      customer: "Jane Cooper",
      email: "jane.cooper@example.com",
      subject: "Question about pricing",
      message:
        "Hi, I'm interested in your website building service. Could you tell me more about the pricing and what's included?",
      date: "2023-10-27",
      time: "2:30 PM",
      status: "replied",
      priority: "high",
    },
    {
      id: 2,
      customer: "Cody Fisher",
      email: "cody.fisher@example.com",
      subject: "Partnership opportunity",
      message:
        "We're a digital agency looking to partner with Buildify. We'd like to discuss bulk pricing for our clients.",
      date: "2023-10-26",
      time: "11:15 AM",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      customer: "Esther Howard",
      email: "esther.howard@example.com",
      subject: "Customization request",
      message:
        "I love your website building service! Is it possible to customize the design to match my brand?",
      date: "2023-10-25",
      time: "4:45 PM",
      status: "replied",
      priority: "low",
    },
    {
      id: 4,
      customer: "Jenny Wilson",
      email: "jenny.wilson@example.com",
      subject: "Feedback on the new platform",
      message:
        "The new website building platform looks amazing! I've already started using it for my startup. Great work!",
      date: "2023-10-24",
      time: "9:20 AM",
      status: "archived",
      priority: "low",
    },
    {
      id: 5,
      customer: "Robert Fox",
      email: "robert.fox@example.com",
      subject: "Technical support needed",
      message:
        "I'm having trouble connecting my custom domain. The DNS settings seem correct but it's not working.",
      date: "2023-10-23",
      time: "3:10 PM",
      status: "new",
      priority: "high",
    },
    {
      id: 6,
      customer: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      subject: "Feature request",
      message:
        "Would it be possible to add a blog section to my website? I'd like to share recipes and news.",
      date: "2023-10-22",
      time: "1:30 PM",
      status: "pending",
      priority: "medium",
    },
  ];

  const handleFilterChange = (key, value) => {
    if (key === "clear") {
      setFilters({
        status: "all",
        priority: "all",
        startDate: "",
        endDate: "",
        search: "",
      });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (filters.status !== "all" && inquiry.status !== filters.status)
      return false;
    if (filters.priority !== "all" && inquiry.priority !== filters.priority)
      return false;
    if (
      filters.search &&
      !inquiry.customer.toLowerCase().includes(filters.search.toLowerCase()) &&
      !inquiry.subject.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    replied: inquiries.filter((i) => i.status === "replied").length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inquiries</h1>
            <p className="mt-2 text-gray-600">
              Manage customer inquiries and support requests.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "table"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Table
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              + New Inquiry
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Inquiries
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="text-2xl text-gray-400">📧</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <div className="text-2xl text-blue-400">🆕</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <div className="text-2xl text-yellow-400">⏳</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Replied</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.replied}
                </p>
              </div>
              <div className="text-2xl text-green-400">✅</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <InquiryFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Inquiries Content */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInquiries.map((inquiry) => (
                  <InquiryCard key={inquiry.id} inquiry={inquiry} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Priority
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredInquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <span className="text-xs font-medium text-gray-600">
                                  {inquiry.customer
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {inquiry.customer}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {inquiry.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {inquiry.subject}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                inquiry.status === "replied"
                                  ? "bg-green-100 text-green-800"
                                  : inquiry.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : inquiry.status === "new"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                inquiry.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : inquiry.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {inquiry.priority}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {inquiry.date} {inquiry.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              Reply
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              Archive
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inquiries;
