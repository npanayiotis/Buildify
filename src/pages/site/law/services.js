import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function LawServicesPage() {
  const lawData = WEBSITES.find((w) => w.id === "law-office-website");
  const { services, navigation, footer } = lawData.fullWebsite;
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-blue-700">
              {navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/law${
                    link.href === "/" ? "/services" : link.href
                  }`}
                  className="text-gray-700 hover:text-blue-700 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-blue-700 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Our Practice Areas
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Comprehensive legal services with expert representation and proven
              results
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
                  <div className="bg-blue-100 text-blue-700 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl">
                    {service.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="space-y-2 mb-4">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        We Handle:
                      </h4>
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <span className="text-blue-600">✓</span>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {service.pricing}
                      </span>
                      <button
                        onClick={() => setSelectedService(service)}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
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
              Why Choose Our Firm
            </h2>
            <p className="text-xl text-gray-600">
              Experience, dedication, and proven results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Experienced Attorneys
              </h3>
              <p className="text-gray-600">
                20+ years of combined legal experience across multiple practice
                areas
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Proven Track Record
              </h3>
              <p className="text-gray-600">
                750+ successful cases with a 98% success rate
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Personalized Service
              </h3>
              <p className="text-gray-600">
                Every client receives dedicated attention and customized legal
                strategies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Need Legal Assistance?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Schedule a free consultation to discuss your legal needs
          </p>
          <Link
            href="/site/law/contact"
            className="inline-block bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Free Consultation
          </Link>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
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
                Our Services Include:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedService.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-blue-600 text-xl">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-gray-900 mb-2">Pricing</h4>
              <p className="text-gray-700">{selectedService.pricing}</p>
            </div>

            <div className="flex gap-4">
              <Link
                href="/site/law/contact"
                className="flex-1 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Schedule Consultation
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
          <div className="text-center text-gray-400">{footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
