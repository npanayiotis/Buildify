import { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function LawCasesAdmin() {
  const [cases, setCases] = useState([
    {
      id: "1",
      caseNumber: "PI-2024-001",
      clientName: "John Smith",
      caseType: "Personal Injury",
      attorney: "Sarah Johnson",
      status: "active",
      filedDate: "2024-01-10",
      courtDate: "2024-03-15",
      estimatedValue: "$500,000",
      priority: "high",
    },
    {
      id: "2",
      caseNumber: "CO-2024-012",
      clientName: "Tech Startup Inc.",
      caseType: "Corporate Law",
      attorney: "Michael Chen",
      status: "active",
      filedDate: "2024-01-05",
      courtDate: null,
      estimatedValue: "N/A",
      priority: "medium",
    },
    {
      id: "3",
      caseNumber: "FA-2023-087",
      clientName: "Sarah Martinez",
      caseType: "Family Law",
      attorney: "Emily Rodriguez",
      status: "closed",
      filedDate: "2023-06-20",
      courtDate: "2023-12-10",
      estimatedValue: "N/A",
      priority: "low",
    },
  ]);

  const [filter, setFilter] = useState({ status: "all", caseType: "all" });
  const [selectedCase, setSelectedCase] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      closed: "bg-gray-100 text-gray-800",
      won: "bg-blue-100 text-blue-800",
      settled: "bg-purple-100 text-purple-800",
    };
    return colors[status] || colors.active;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    };
    return colors[priority] || colors.medium;
  };

  const filteredCases = cases.filter((caseItem) => {
    if (filter.status !== "all" && caseItem.status !== filter.status)
      return false;
    if (filter.caseType !== "all" && caseItem.caseType !== filter.caseType)
      return false;
    return true;
  });

  const stats = {
    total: cases.length,
    active: cases.filter((c) => c.status === "active").length,
    closed: cases.filter((c) => c.status === "closed").length,
    highPriority: cases.filter((c) => c.priority === "high").length,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Case Management
            </h1>
            <p className="text-gray-600">Track and manage all legal cases</p>
          </div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition">
            + New Case
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Cases</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-gray-600">Active Cases</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">
              {stats.closed}
            </div>
            <div className="text-sm text-gray-600">Closed Cases</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {stats.highPriority}
            </div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Case Type
              </label>
              <select
                value={filter.caseType}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, caseType: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="Personal Injury">Personal Injury</option>
                <option value="Corporate Law">Corporate Law</option>
                <option value="Family Law">Family Law</option>
                <option value="Criminal Defense">Criminal Defense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filter.status}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
                <option value="won">Won</option>
                <option value="settled">Settled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilter({ status: "all", caseType: "all" })}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Clear
              </button>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Cases Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Case Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attorney
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      No cases found
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((caseItem) => (
                    <tr key={caseItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">
                          {caseItem.caseNumber}
                        </div>
                        <div className="text-sm text-gray-600">
                          {caseItem.caseType}
                        </div>
                        <span
                          className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                            caseItem.priority
                          )}`}
                        >
                          {caseItem.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {caseItem.clientName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {caseItem.attorney}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            caseItem.status
                          )}`}
                        >
                          {caseItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="space-y-1">
                          <div className="text-gray-600">
                            Filed:{" "}
                            {new Date(caseItem.filedDate).toLocaleDateString()}
                          </div>
                          {caseItem.courtDate && (
                            <div className="text-gray-600">
                              Court:{" "}
                              {new Date(
                                caseItem.courtDate
                              ).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedCase(caseItem)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Case Details Modal */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCase.caseNumber}
                  </h2>
                  <p className="text-gray-600">{selectedCase.caseType}</p>
                </div>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Client
                  </label>
                  <div className="text-lg font-medium text-gray-900">
                    {selectedCase.clientName}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Attorney
                  </label>
                  <div className="text-lg font-medium text-gray-900">
                    {selectedCase.attorney}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Filed Date
                  </label>
                  <div className="text-gray-900">
                    {new Date(selectedCase.filedDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Court Date
                  </label>
                  <div className="text-gray-900">
                    {selectedCase.courtDate
                      ? new Date(selectedCase.courtDate).toLocaleDateString()
                      : "Not scheduled"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Estimated Value
                  </label>
                  <div className="text-lg font-bold text-green-600">
                    {selectedCase.estimatedValue}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Priority
                  </label>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(
                      selectedCase.priority
                    )}`}
                  >
                    {selectedCase.priority}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition">
                  Edit Case
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
