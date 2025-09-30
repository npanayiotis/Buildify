import { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function MedicalAppointmentsAdmin() {
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patientName: "Mary Johnson",
      email: "mary@example.com",
      phone: "(555) 123-4567",
      doctor: "Dr. Sarah Johnson",
      date: "2024-12-20",
      time: "09:00",
      type: "Annual Physical",
      status: "confirmed",
      notes: "Regular checkup",
      createdAt: "2024-12-15T10:30:00",
    },
    {
      id: "2",
      patientName: "James Wilson",
      email: "james@example.com",
      phone: "(555) 234-5678",
      date: "2024-12-20",
      time: "10:30",
      doctor: "Dr. Michael Chen",
      type: "Follow-up Visit",
      status: "pending",
      notes: "Diabetes management follow-up",
      createdAt: "2024-12-16T14:20:00",
    },
    {
      id: "3",
      patientName: "Lisa Martinez",
      email: "lisa@example.com",
      phone: "(555) 345-6789",
      date: "2024-12-21",
      time: "14:00",
      doctor: "Dr. Emily Rodriguez",
      type: "Pediatric Visit",
      status: "confirmed",
      notes: "Child wellness check",
      createdAt: "2024-12-16T09:15:00",
    },
  ]);

  const [filter, setFilter] = useState({
    date: "",
    status: "all",
    doctor: "all",
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
      "no-show": "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.pending;
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (filter.status !== "all" && apt.status !== filter.status) return false;
    if (filter.doctor !== "all" && apt.doctor !== filter.doctor) return false;
    if (filter.date && apt.date !== filter.date) return false;
    return true;
  });

  const stats = {
    today: appointments.filter(
      (a) => a.date === new Date().toISOString().split("T")[0]
    ).length,
    pending: appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    totalPatients: new Set(appointments.map((a) => a.patientName)).size,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Appointments
            </h1>
            <p className="text-gray-600">
              Manage patient appointments and schedules
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            + New Appointment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.today}
            </div>
            <div className="text-sm text-gray-600">
              Today&apos;s Appointments
            </div>
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
              {stats.totalPatients}
            </div>
            <div className="text-sm text-gray-600">Unique Patients</div>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor
              </label>
              <select
                value={filter.doctor}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, doctor: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Doctors</option>
                <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</option>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
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
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      No appointments found
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-gray-600">
                          {appointment.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          {appointment.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {appointment.doctor}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {new Date(appointment.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {appointment.type}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedAppointment(appointment)}
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
      </div>
    </DashboardLayout>
  );
}
