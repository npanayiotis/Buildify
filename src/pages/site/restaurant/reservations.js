import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function RestaurantReservationsPage() {
  const restaurantData = WEBSITES.find(
    (w) => w.id === "elegant-restaurant-website"
  );
  const { reservations, navigation } = restaurantData.fullWebsite;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      type: "success",
      message: "Reservation request submitted! We will confirm shortly.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-gray-900">
              {navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/restaurant${
                    link.href === "/" ? "/menu" : link.href
                  }`}
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-amber-600 to-red-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{reservations.title}</h1>
          <p className="text-xl text-amber-100">{reservations.subtitle}</p>
        </div>
      </section>

      {/* Reservation Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Book Your Table
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
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
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
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          time: e.target.value,
                        }))
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select time</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="17:30">5:30 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="18:30">6:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        guests: e.target.value,
                      }))
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specialRequests: e.target.value,
                      }))
                    }
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Dietary restrictions, accessibility needs, special occasions, etc."
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
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition"
                >
                  Reserve Table
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 text-red-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">{reservations.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 text-red-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">{reservations.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Hours of Operation
                </h3>
                <div className="space-y-2">
                  {Object.entries(reservations.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="font-medium text-gray-900 capitalize">
                        {day}
                      </span>
                      <span className="text-gray-600">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Reservation Policies
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✓ Reservations are recommended for dinner service</li>
                  <li>✓ Please arrive within 15 minutes of your reservation</li>
                  <li>✓ For parties of 10 or more, please call directly</li>
                  <li>✓ 24-hour cancellation notice appreciated</li>
                  <li>✓ Smart casual dress code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            {restaurantData.fullWebsite.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
