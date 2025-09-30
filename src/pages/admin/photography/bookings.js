import { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function PhotographyBookingsAdmin() {
  const [bookings, setBookings] = useState([
    {
      id: "1",
      clientName: "Sarah & Michael",
      email: "sarah@example.com",
      phone: "(555) 123-4567",
      packageType: "Wedding Photography",
      date: "2024-06-15",
      time: "14:00",
      location: "Garden Venue, California",
      status: "confirmed",
      deposit: "$500",
      balance: "$2,000",
      createdAt: "2024-01-10T10:30:00",
    },
    {
      id: "2",
      clientName: "Jennifer Martinez",
      email: "jennifer@example.com",
      phone: "(555) 234-5678",
      packageType: "Family Photography",
      date: "2024-03-20",
      time: "10:00",
      location: "Central Park",
      status: "pending",
      deposit: "$0",
      balance: "$450",
      createdAt: "2024-01-15T14:20:00",
    },
    {
      id: "3",
      clientName: "Tech Corp",
      email: "events@techcorp.com",
      phone: "(555) 345-6789",
      packageType: "Corporate Events",
      date: "2024-02-28",
      time: "18:00",
      location: "Grand Hotel Ballroom",
      status: "confirmed",
      deposit: "$300",
      balance: "$500",
      createdAt: "2024-01-12T16:45:00",
    },
  ]);

  const [filter, setFilter] = useState({ date: "", status: "all" });
  const [selectedBooking, setSelectedBooking] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return colors[status] || colors.pending;
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter.status !== "all" && booking.status !== filter.status)
      return false;
    if (filter.date && booking.date !== filter.date) return false;
    return true;
  });

  const stats = {
    upcoming: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    revenue: bookings
      .filter((b) => b.status !== "cancelled")
      .reduce((sum, b) => sum + parseFloat(b.balance.replace(/[$,]/g, "")), 0),
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Photography Bookings
            </h1>
            <p className="text-gray-600">
              Manage session bookings and schedules
            </p>
          </div>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            + New Booking
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.upcoming}
            </div>
            <div className="text-sm text-gray-600">Upcoming Sessions</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending Confirmation</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              ${stats.revenue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilter({ date: "", status: "all", doctor: "all" })
                }
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Clear
              </button>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
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
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {booking.clientName}
                      </div>
                      <div className="text-sm text-gray-600">
                        {booking.email}
                      </div>
                      <div className="text-sm text-gray-600">
                        {booking.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {booking.packageType}
                      </div>
                      <div className="text-sm text-gray-600">
                        Balance: {booking.balance}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {booking.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
