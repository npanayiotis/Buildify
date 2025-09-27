import React from "react";

const InquiryFilters = ({ filters, onFilterChange }) => {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "new", label: "New" },
    { value: "pending", label: "Pending" },
    { value: "replied", label: "Replied" },
    { value: "archived", label: "Archived" }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priority" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            {priorityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => onFilterChange('startDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => onFilterChange('endDate', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search inquiries..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Clear Filters */}
        <button
          onClick={() => onFilterChange('clear', null)}
          className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default InquiryFilters;
