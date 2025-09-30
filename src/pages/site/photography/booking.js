import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function PhotographyBookingPage() {
  const photographyData = WEBSITES.find(
    (w) => w.id === "photography-studio-website"
  );
  const { services, booking } = photographyData.fullWebsite;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    packageType: "",
    location: "",
    details: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      type: "success",
      message:
        "Booking request received! We'll contact you within 24 hours to confirm your session.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-pink-600">
              Photography Studio
            </div>
            <div className="hidden md:flex space-x-8">
              {photographyData.fullWebsite.pages.map((link) => (
                <Link
                  key={link.slug}
                  href={`/site/photography${link.slug}`}
                  className="text-gray-700 hover:text-pink-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{booking.title}</h1>
          <p className="text-xl text-pink-100">{booking.description}</p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Book Your Session
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Package *
                  </label>
                  <select
                    value={formData.packageType}
                    onChange={(e) =>
                      setFormData({ ...formData, packageType: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Choose a package</option>
                    {services.map((service, i) => (
                      <option key={i} value={service.name}>
                        {service.name} - {service.pricing}
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Select time</option>
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
                    Session Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="Studio or outdoor location preference"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    placeholder="Tell us about your vision, special requests, number of people, etc."
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
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-semibold transition"
                >
                  Request Booking
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Availability
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Weekdays</p>
                    <p className="text-gray-600">
                      {booking.availability.weekdays}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">Weekends</p>
                    <p className="text-gray-600">
                      {booking.availability.weekends}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2">
                      Emergency Bookings
                    </p>
                    <p className="text-gray-600">
                      {booking.availability.emergency}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  What to Expect
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Confirmation call within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Pre-session consultation to discuss your vision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Professional editing included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-600 mt-1">✓</span>
                    <span>Online gallery delivered within 2-3 weeks</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Contact Studio
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-semibold">Phone:</span>{" "}
                    {photographyData.fullWebsite.contact.phone}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span>{" "}
                    {photographyData.fullWebsite.contact.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            © 2024 Photography Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
