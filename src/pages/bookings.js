import React, { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import BookingCard from "../components/Bookings/BookingCard";
import CalendarView from "../components/Bookings/CalendarView";

const Bookings = () => {
  const [viewMode, setViewMode] = useState("list"); // list or calendar
  const [selectedDate, setSelectedDate] = useState(new Date());

  const bookings = [
    {
      id: 1,
      customer: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      service: "Website Consultation",
      description: "Initial consultation for restaurant website design",
      date: "2023-10-27",
      time: "14:00",
      duration: "1 hour",
      status: "confirmed"
    },
    {
      id: 2,
      customer: "Mike Chen",
      email: "mike.chen@example.com",
      service: "Template Customization",
      description: "Customizing SaaS template for tech startup",
      date: "2023-10-28",
      time: "10:30",
      duration: "2 hours",
      status: "pending"
    },
    {
      id: 3,
      customer: "Emily Davis",
      email: "emily.davis@example.com",
      service: "Domain Setup",
      description: "Setting up custom domain for fitness center",
      date: "2023-10-29",
      time: "16:00",
      duration: "30 minutes",
      status: "confirmed"
    },
    {
      id: 4,
      customer: "David Wilson",
      email: "david.wilson@example.com",
      service: "SEO Optimization",
      description: "Optimizing real estate website for search engines",
      date: "2023-10-30",
      time: "11:00",
      duration: "1.5 hours",
      status: "completed"
    },
    {
      id: 5,
      customer: "Lisa Brown",
      email: "lisa.brown@example.com",
      service: "Content Migration",
      description: "Moving content from old website to new template",
      date: "2023-10-31",
      time: "13:30",
      duration: "3 hours",
      status: "cancelled"
    },
    {
      id: 6,
      customer: "Tom Anderson",
      email: "tom.anderson@example.com",
      service: "E-commerce Setup",
      description: "Setting up online store for fashion boutique",
      date: "2023-11-01",
      time: "09:00",
      duration: "4 hours",
      status: "confirmed"
    }
  ];

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    completed: bookings.filter(b => b.status === 'completed').length
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
            <p className="mt-2 text-gray-600">Manage appointments and scheduled sessions.</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "list" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "calendar" 
                    ? "bg-blue-100 text-blue-700" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                Calendar
              </button>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              + New Booking
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="text-2xl text-gray-400">📅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <div className="text-2xl text-green-400">✅</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="text-2xl text-yellow-400">⏳</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
              </div>
              <div className="text-2xl text-blue-400">🎯</div>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === "list" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <CalendarView 
            bookings={bookings} 
            selectedDate={selectedDate} 
            onDateSelect={handleDateSelect} 
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
