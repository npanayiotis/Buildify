import React from "react";

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800"
    };
    return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {booking.customer.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{booking.customer}</h3>
            <p className="text-sm text-gray-500">{booking.email}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">{booking.service}</h4>
        <p className="text-gray-600 text-sm">{booking.description}</p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>📅 {booking.date}</span>
          <span>🕒 {formatTime(booking.time)}</span>
          <span>⏱️ {booking.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
            Edit
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
