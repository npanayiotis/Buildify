import { useState, useEffect } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ websiteType: "all", status: "all" });
  const [pagination, setPagination] = useState({ page: 1, limit: 20 });

  useEffect(() => {
    fetchContacts();
  }, [filter, pagination.page]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...(filter.websiteType !== "all" && {
          websiteType: filter.websiteType,
        }),
        ...(filter.status !== "all" && { status: filter.status }),
      });

      const response = await fetch(`/api/contact/list?${params}`);
      const data = await response.json();

      setContacts(data.contacts);
      setPagination((prev) => ({ ...prev, ...data.pagination }));
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await fetch(`/api/contact/${id}/update-status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchContacts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      NEW: "bg-blue-100 text-blue-800",
      IN_PROGRESS: "bg-yellow-100 text-yellow-800",
      RESOLVED: "bg-green-100 text-green-800",
      CLOSED: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.NEW;
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Submissions
          </h1>
          <p className="text-gray-600">
            Manage all contact form submissions from your websites
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((status) => {
            const count = contacts.filter((c) => c.status === status).length;
            return (
              <div
                key={status}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize">
                  {status.replace("_", " ").toLowerCase()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Type
              </label>
              <select
                value={filter.websiteType}
                onChange={(e) =>
                  setFilter((prev) => ({
                    ...prev,
                    websiteType: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Websites</option>
                <option value="blog">Blog</option>
                <option value="restaurant">Restaurant</option>
                <option value="gym">Gym</option>
                <option value="law">Law Office</option>
                <option value="portfolio">Portfolio</option>
                <option value="real-estate">Real Estate</option>
                <option value="medical">Medical Practice</option>
                <option value="photography">Photography Studio</option>
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
                <option value="NEW">New</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={fetchContacts}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-600">Loading...</div>
          ) : contacts.length === 0 ? (
            <div className="p-12 text-center text-gray-600">
              No contacts found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {contact.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {contact.email}
                        </div>
                        {contact.phone && (
                          <div className="text-sm text-gray-600">
                            {contact.phone}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 max-w-xs truncate">
                          {contact.subject}
                        </div>
                        <div className="text-sm text-gray-600 max-w-xs truncate">
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm capitalize">
                          {contact.websiteType}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.status}
                          onChange={(e) =>
                            updateStatus(contact.id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            contact.status
                          )}`}
                        >
                          <option value="NEW">New</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="RESOLVED">Resolved</option>
                          <option value="CLOSED">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(contact.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            /* View details */
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.pages} ({pagination.total}{" "}
                total)
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                  }
                  disabled={pagination.page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                  }
                  disabled={pagination.page === pagination.pages}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
