import React from "react";

const ChartCard = ({ title, data, type = "line", timeRange = "7d" }) => {
  const timeRanges = [
    { value: "7d", label: "7 days" },
    { value: "30d", label: "30 days" },
    { value: "90d", label: "90 days" },
    { value: "1y", label: "1 year" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                timeRange === range.value
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500">Chart visualization would go here</p>
          <p className="text-sm text-gray-400 mt-1">
            {type === "line" && "Line chart showing trends over time"}
            {type === "bar" && "Bar chart comparing different metrics"}
            {type === "doughnut" && "Doughnut chart showing distribution"}
            {type === "area" && "Area chart showing cumulative data"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
