import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function MedicalServicesPage() {
  const medicalData = WEBSITES.find((w) => w.id === "medical-practice-website");
  const { services, navigation, footer } = medicalData.fullWebsite;
  const [selectedService, setSelectedService] = useState(null);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our Medical Services
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive healthcare services with compassionate care and
              advanced medical technology
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition border border-gray-200"
              >
                <div className="flex items-start gap-6">
                  <div className="bg-green-100 text-green-600 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                    {service.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Services Include:
                      </h4>
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="text-green-600">✓</span>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Providers: {service.providers.join(", ")}
                      </span>
                      <button
                        onClick={() => setSelectedService(service)}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm"
                      >
                        Learn More →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Practice
            </h2>
            <p className="text-xl text-gray-600">
              Excellence in healthcare with patient-centered care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Experienced Physicians
              </h3>
              <p className="text-gray-600">
                Board-certified doctors with decades of combined experience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Advanced Technology
              </h3>
              <p className="text-gray-600">
                State-of-the-art medical equipment and diagnostic tools
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💙</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Compassionate Care
              </h3>
              <p className="text-gray-600">
                Patient-centered approach with personalized treatment plans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Schedule an Appointment</h2>
          <p className="text-xl mb-8 text-green-100">
            Book your appointment today for quality healthcare
          </p>
          <Link
            href="/site/medical/appointments"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                  {selectedService.icon}
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedService.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <p className="text-lg text-gray-600 mb-6">
              {selectedService.description}
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What We Offer:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-green-600 text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-gray-900 mb-2">Our Providers</h4>
              <p className="text-gray-700">
                {selectedService.providers.join(", ")}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/site/medical/appointments"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Schedule Appointment
              </Link>
              <button
                onClick={() => setSelectedService(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
