import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminReservations = memo(() => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    date: "",
    page: 1,
  });
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchReservations();
    fetchStats();
  }, [filters]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.status !== "all") {
        params.append("status", filters.status);
      }
      if (filters.date) {
        params.append("date", filters.date);
      }
      params.append("page", filters.page.toString());
      params.append("limit", "20");

      const response = await fetch(`/api/templates/restaurant/reservations?${params}`);
      const data = await response.json();
      if (data.success) {
        setReservations(data.data);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/templates/restaurant/reservations/stats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/templates/restaurant/reservations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        fetchReservations();
        fetchStats();
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this reservation?")) {
      try {
        const response = await fetch(`/api/templates/restaurant/reservations/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();
        if (data.success) {
          fetchReservations();
          fetchStats();
        }
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reservations</h2>
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Reservations</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelled</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <motion.tr
                    key={reservation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reservation.name}
                        </div>
                        {reservation.message && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {reservation.message}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(reservation.date)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(reservation.time)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {reservation.guests} {reservation.guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reservation.status)}`}>
                        {reservation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{reservation.email}</div>
                      {reservation.phone && (
                        <div className="text-sm text-gray-500">{reservation.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {reservation.status === "PENDING" && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(reservation.id, "CONFIRMED")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(reservation.id, "CANCELLED")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                        {reservation.status === "CONFIRMED" && (
                          <button
                            onClick={() => handleStatusUpdate(reservation.id, "COMPLETED")}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(reservation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {reservations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No reservations found</div>
              <div className="text-gray-400 text-sm mt-2">
                Try adjusting your filters or check back later
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

AdminReservations.displayName = "AdminReservations";

export default AdminReservations;
