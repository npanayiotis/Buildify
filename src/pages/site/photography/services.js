import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function PhotographyServicesPage() {
  const photographyData = WEBSITES.find(
    (w) => w.id === "photography-studio-website"
  );
  const { services } = photographyData.fullWebsite;
  const [selectedService, setSelectedService] = useState(null);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Photography Services
            </h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Professional photography for every occasion
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
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition border border-gray-200"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {service.pricing}
                      </div>
                      <div className="text-sm text-gray-600">
                        {service.duration}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Package Includes:
                    </h4>
                    {service.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <span className="text-pink-600">✓</span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple process from booking to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {photographyData.fullWebsite.booking.process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-xl mb-8 text-pink-100">
            Let's create beautiful memories together
          </p>
          <Link
            href="/site/photography/booking"
            className="inline-block bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Schedule Your Session
          </Link>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                  {selectedService.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedService.name}
                  </h2>
                  <p className="text-pink-600 font-semibold">
                    {selectedService.pricing}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 mb-6">{selectedService.description}</p>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">
                Package Includes:
              </h3>
              <div className="space-y-2">
                {selectedService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-pink-600 text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Duration:</span>{" "}
                {selectedService.duration}
              </p>
            </div>

            <Link
              href="/site/photography/booking"
              className="block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
            >
              Book This Package
            </Link>
          </div>
        </div>
      )}

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
