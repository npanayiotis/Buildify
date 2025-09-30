import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function RestaurantReservationsAdmin() {
  const [reservations, setReservations] = useState([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
      date: "2024-12-20",
      time: "19:00",
      guests: 4,
      specialRequests: "Anniversary celebration - window table preferred",
      status: "confirmed",
      createdAt: "2024-12-15T10:30:00",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "(555) 987-6543",
      date: "2024-12-20",
      time: "20:00",
      guests: 2,
      specialRequests: "Vegetarian options needed",
      status: "pending",
      createdAt: "2024-12-15T14:20:00",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "(555) 456-7890",
      date: "2024-12-21",
      time: "18:30",
      guests: 6,
      specialRequests: "Business dinner",
      status: "confirmed",
      createdAt: "2024-12-15T16:45:00",
    },
  ]);

  const [filter, setFilter] = useState({ date: "", status: "all" });
  const [selectedReservation, setSelectedReservation] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.pending;
  };

  const updateStatus = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === id ? { ...res, status: newStatus } : res))
    );
  };

  const filteredReservations = reservations.filter((res) => {
    if (filter.status !== "all" && res.status !== filter.status) return false;
    if (filter.date && res.date !== filter.date) return false;
    return true;
  });

  const stats = {
    today: reservations.filter(
      (r) => r.date === new Date().toISOString().split("T")[0]
    ).length,
    pending: reservations.filter((r) => r.status === "pending").length,
    confirmed: reservations.filter((r) => r.status === "confirmed").length,
    totalGuests: reservations.reduce((sum, r) => sum + r.guests, 0),
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Restaurant Reservations
          </h1>
          <p className="text-gray-600">
            Manage table bookings and reservations
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.today}
            </div>
            <div className="text-sm text-gray-600">Today's Reservations</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending Confirmation</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.confirmed}
            </div>
            <div className="text-sm text-gray-600">Confirmed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalGuests}
            </div>
            <div className="text-sm text-gray-600">Total Guests</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={filter.date}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => setFilter({ date: "", status: "all" })}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Clear
              </button>
              <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Calendar View Toggle */}
        <div className="flex gap-2 mb-6">
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
            List View
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            Calendar View
          </button>
          <button className="bg-white text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
            Table Layout
          </button>
        </div>

        {/* Reservations Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest Info
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      No reservations found
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {reservation.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reservation.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reservation.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {new Date(reservation.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {reservation.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-medium text-gray-900">
                          {reservation.guests}
                        </span>
                        <span className="text-sm text-gray-600 ml-1">
                          guests
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={reservation.status}
                          onChange={(e) =>
                            updateStatus(reservation.id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            reservation.status
                          )}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedReservation(reservation)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Cancel
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

        {/* Reservation Details Modal */}
        {selectedReservation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Reservation Details
                </h2>
                <button
                  onClick={() => setSelectedReservation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Guest Name
                    </label>
                    <div className="text-lg font-medium text-gray-900">
                      {selectedReservation.name}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Number of Guests
                    </label>
                    <div className="text-lg font-medium text-gray-900">
                      {selectedReservation.guests}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <div className="text-gray-900">
                      {selectedReservation.email}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <div className="text-gray-900">
                      {selectedReservation.phone}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Date
                    </label>
                    <div className="text-gray-900">
                      {new Date(selectedReservation.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Time
                    </label>
                    <div className="text-gray-900">
                      {selectedReservation.time}
                    </div>
                  </div>
                </div>

                {selectedReservation.specialRequests && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Special Requests
                    </label>
                    <div className="mt-1 p-4 bg-gray-50 rounded-lg text-gray-900">
                      {selectedReservation.specialRequests}
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Confirm Reservation
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Cancel Reservation
                  </button>
                </div>

                <div className="text-sm text-gray-600 text-center">
                  Booked on{" "}
                  {new Date(selectedReservation.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
