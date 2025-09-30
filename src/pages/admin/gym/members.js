import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function GymMembersAdmin() {
  const [members, setMembers] = useState([
    {
      id: "1",
      name: "Jennifer Smith",
      email: "jennifer@example.com",
      phone: "(555) 123-4567",
      membership: "Premium",
      status: "active",
      joinedDate: "2023-06-15",
      expiryDate: "2024-06-15",
      checkins: 145,
      lastCheckin: "2024-01-15T08:30:00",
    },
    {
      id: "2",
      name: "Robert Wilson",
      email: "robert@example.com",
      phone: "(555) 234-5678",
      membership: "Elite",
      status: "active",
      joinedDate: "2023-08-20",
      expiryDate: "2024-08-20",
      checkins: 98,
      lastCheckin: "2024-01-16T07:15:00",
    },
    {
      id: "3",
      name: "Lisa Martinez",
      email: "lisa@example.com",
      phone: "(555) 345-6789",
      membership: "Basic",
      status: "expired",
      joinedDate: "2023-01-10",
      expiryDate: "2024-01-10",
      checkins: 203,
      lastCheckin: "2024-01-08T18:45:00",
    },
  ]);

  const [filter, setFilter] = useState({ membership: "all", status: "all" });
  const [selectedMember, setSelectedMember] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      suspended: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.active;
  };

  const getMembershipColor = (membership) => {
    const colors = {
      Basic: "bg-blue-100 text-blue-800",
      Premium: "bg-purple-100 text-purple-800",
      Elite: "bg-yellow-100 text-yellow-800",
      Family: "bg-green-100 text-green-800",
    };
    return colors[membership] || colors.Basic;
  };

  const filteredMembers = members.filter((member) => {
    if (filter.membership !== "all" && member.membership !== filter.membership)
      return false;
    if (filter.status !== "all" && member.status !== filter.status)
      return false;
    return true;
  });

  const stats = {
    total: members.length,
    active: members.filter((m) => m.status === "active").length,
    expired: members.filter((m) => m.status === "expired").length,
    totalCheckins: members.reduce((sum, m) => sum + m.checkins, 0),
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gym Members
            </h1>
            <p className="text-gray-600">
              Manage member profiles and memberships
            </p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            + Add Member
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-red-600">
              {stats.expired}
            </div>
            <div className="text-sm text-gray-600">Expired</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalCheckins}
            </div>
            <div className="text-sm text-gray-600">Total Check-ins</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Membership Type
              </label>
              <select
                value={filter.membership}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, membership: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Memberships</option>
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="Elite">Elite</option>
                <option value="Family">Family</option>
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
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilter({ membership: "all", status: "all" })}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Clear
              </button>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membership
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      No members found
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {member.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          {member.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getMembershipColor(
                            member.membership
                          )}`}
                        >
                          {member.membership}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            member.status
                          )}`}
                        >
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="space-y-1">
                          <div className="text-gray-900 font-medium">
                            {member.checkins} check-ins
                          </div>
                          <div className="text-gray-600">
                            Last:{" "}
                            {new Date(member.lastCheckin).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(member.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedMember(member)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Renew
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

        {/* Member Details Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Member Details
                </h2>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Name
                    </label>
                    <div className="text-lg font-medium text-gray-900">
                      {selectedMember.name}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Membership
                    </label>
                    <div className="text-lg font-medium text-gray-900">
                      {selectedMember.membership}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Email
                    </label>
                    <div className="text-gray-900">{selectedMember.email}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Phone
                    </label>
                    <div className="text-gray-900">{selectedMember.phone}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Joined
                    </label>
                    <div className="text-gray-900">
                      {new Date(selectedMember.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Expires
                    </label>
                    <div className="text-gray-900">
                      {new Date(selectedMember.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-3">
                    Activity Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedMember.checkins}
                      </div>
                      <div className="text-sm text-gray-600">
                        Total Check-ins
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Last Check-in</div>
                      <div className="font-medium text-gray-900">
                        {new Date(
                          selectedMember.lastCheckin
                        ).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition">
                    Renew Membership
                  </button>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
