import React from "react";

const CalendarView = ({ bookings, selectedDate, onDateSelect }) => {
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    const dayBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.getDate() === day && 
             bookingDate.getMonth() === selectedDate.getMonth() && 
             bookingDate.getFullYear() === selectedDate.getFullYear();
    });
    
    days.push({
      day,
      date,
      bookings: dayBookings
    });
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            ←
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-2 border border-gray-200 rounded-lg ${
              day ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
            }`}
            onClick={() => day && onDateSelect(day.date)}
          >
            {day && (
              <>
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {day.day}
                </div>
                <div className="space-y-1">
                  {day.bookings.slice(0, 2).map((booking, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-1 rounded ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {booking.time} - {booking.customer}
                    </div>
                  ))}
                  {day.bookings.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{day.bookings.length - 2} more
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
