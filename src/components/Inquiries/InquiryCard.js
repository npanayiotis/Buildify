import React from "react";

const InquiryCard = ({ inquiry }) => {
  const getStatusColor = (status) => {
    const colors = {
      replied: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
      new: "bg-blue-100 text-blue-800"
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };
    return colors[priority.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {inquiry.customer.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{inquiry.customer}</h3>
            <p className="text-sm text-gray-500">{inquiry.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
            {inquiry.status}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(inquiry.priority)}`}>
            {inquiry.priority}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">{inquiry.subject}</h4>
        <p className="text-gray-600 text-sm line-clamp-2">{inquiry.message}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>📅 {inquiry.date}</span>
          <span>🕒 {inquiry.time}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
            Reply
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
            Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryCard;
