import { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

export default function RealEstatePropertiesAdmin() {
  const [properties, setProperties] = useState([
    {
      id: "1",
      title: "Modern Family Home",
      address: "123 Oak Street, Downtown District",
      price: "$750,000",
      status: "active",
      type: "Single Family",
      bedrooms: 4,
      bathrooms: 3,
      squareFeet: 2500,
      agent: "Sarah Johnson",
      views: 234,
      inquiries: 12,
      listedDate: "2024-01-01",
    },
    {
      id: "2",
      title: "Luxury Condo",
      address: "456 Harbor View, Waterfront District",
      price: "$1,200,000",
      status: "pending",
      type: "Condominium",
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1800,
      agent: "Michael Chen",
      views: 456,
      inquiries: 23,
      listedDate: "2023-12-15",
    },
    {
      id: "3",
      title: "Charming Townhouse",
      address: "789 Maple Ave, Historic Quarter",
      price: "$525,000",
      status: "sold",
      type: "Townhouse",
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1600,
      agent: "Emily Rodriguez",
      views: 567,
      inquiries: 34,
      listedDate: "2023-11-20",
    },
  ]);

  const [filter, setFilter] = useState({ status: "all", type: "all" });
  const [selectedProperty, setSelectedProperty] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      sold: "bg-blue-100 text-blue-800",
      inactive: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.active;
  };

  const filteredProperties = properties.filter((property) => {
    if (filter.status !== "all" && property.status !== filter.status)
      return false;
    if (filter.type !== "all" && property.type !== filter.type) return false;
    return true;
  });

  const stats = {
    total: properties.length,
    active: properties.filter((p) => p.status === "active").length,
    sold: properties.filter((p) => p.status === "sold").length,
    totalViews: properties.reduce((sum, p) => sum + p.views, 0),
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Property Listings
            </h1>
            <p className="text-gray-600">
              Manage real estate listings and properties
            </p>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition">
            + Add Property
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Listings</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-gray-600">Active Listings</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{stats.sold}</div>
            <div className="text-sm text-gray-600">Sold</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalViews}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type
              </label>
              <select
                value={filter.type}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Types</option>
                <option value="Single Family">Single Family</option>
                <option value="Condominium">Condominium</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Multi-Family">Multi-Family</option>
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilter({ status: "all", type: "all" })}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Clear
              </button>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">
                        {property.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {property.address}
                      </div>
                      <div className="text-lg font-bold text-indigo-600 mt-1">
                        {property.price}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="space-y-1 text-gray-600">
                        <div>🛏️ {property.bedrooms} beds</div>
                        <div>🚿 {property.bathrooms} baths</div>
                        <div>📐 {property.squareFeet} sqft</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {property.agent}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                          property.status
                        )}`}
                      >
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="space-y-1">
                        <div className="text-gray-600">
                          👁️ {property.views} views
                        </div>
                        <div className="text-gray-600">
                          💬 {property.inquiries} inquiries
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedProperty(property)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
