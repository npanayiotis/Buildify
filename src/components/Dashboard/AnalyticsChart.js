import React from "react";

const AnalyticsChart = ({ title, data, type = "line" }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p className="text-gray-500">Chart visualization would go here</p>
          <p className="text-sm text-gray-400 mt-1">
            Integration with Chart.js or similar library
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;
