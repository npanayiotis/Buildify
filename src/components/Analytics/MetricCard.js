import React from "react";

const MetricCard = ({ title, value, change, changeType, icon, description }) => {
  const isPositive = changeType === "positive";
  const isNegative = changeType === "negative";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span
              className={`text-sm font-medium ${
                isPositive
                  ? "text-green-600"
                  : isNegative
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {isPositive && "↗"} {isNegative && "↘"} {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">{description}</span>
          </div>
        </div>
        <div className="text-2xl text-gray-400">{icon}</div>
      </div>
    </div>
  );
};

export default MetricCard;
