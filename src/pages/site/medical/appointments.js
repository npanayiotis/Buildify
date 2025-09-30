import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function MedicalAppointmentsPage() {
  const medicalData = WEBSITES.find((w) => w.id === "medical-practice-website");
  const { appointments, doctors } = medicalData.fullWebsite;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    doctor: "",
    appointmentType: "",
    reason: "",
    insurance: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      type: "success",
      message:
        "Appointment request received! We will call you to confirm shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-green-600">
              Medical Practice
            </div>
            <div className="hidden md:flex space-x-8">
              {medicalData.fullWebsite.pages.map((link) => (
                <Link
                  key={link.slug}
                  href={`/site/medical${link.slug}`}
                  className="text-gray-700 hover:text-green-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{appointments.title}</h1>
          <p className="text-xl text-blue-100">{appointments.description}</p>
        </div>
      </section>

      {/* Appointment Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Schedule Your Appointment
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Doctor *
                  </label>
                  <select
                    value={formData.doctor}
                    onChange={(e) =>
                      setFormData({ ...formData, doctor: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Choose a physician</option>
                    {doctors.map((doctor, i) => (
                      <option key={i} value={doctor.name}>
                        {doctor.name} - {doctor.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type *
                  </label>
                  <select
                    value={formData.appointmentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appointmentType: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select type</option>
                    {appointments.appointmentTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select time</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    value={formData.insurance}
                    onChange={(e) =>
                      setFormData({ ...formData, insurance: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Blue Cross Blue Shield"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="Please describe your symptoms or reason for appointment"
                  />
                </div>

                {status.message && (
                  <div
                    className={`p-4 rounded-lg ${
                      status.type === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition"
                >
                  Request Appointment
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Booking Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">
                        {appointments.phoneBooking.number}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointments.phoneBooking.hours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      💻
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Online Booking
                      </h4>
                      <p className="text-gray-600">
                        {appointments.onlineBooking.hours}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointments.onlineBooking.responseTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {appointments.preparation.title}
                </h3>
                <ul className="space-y-2">
                  {appointments.preparation.checklist.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Emergency Care
                </h3>
                <p className="text-gray-700 mb-3">
                  For medical emergencies, please call:
                </p>
                <p className="text-2xl font-bold text-red-600">911</p>
                <p className="text-sm text-gray-600 mt-2">
                  For urgent but non-emergency care, contact our emergency line
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            © 2024 Medical Practice. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
