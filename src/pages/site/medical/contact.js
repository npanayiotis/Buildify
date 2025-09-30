import Link from "next/link";
import ContactForm from "../../../components/Contact/ContactForm";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function MedicalContactPage() {
  const medicalData = WEBSITES.find((w) => w.id === "medical-practice-website");
  const { contact } = medicalData.fullWebsite;

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
      <section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">
            We're here to help with your healthcare needs
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <ContactForm websiteType="medical" />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Address
                      </h3>
                      <p className="text-gray-600">{contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📞
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600">{contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-red-100 text-red-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      🚨
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Emergency Line
                      </h3>
                      <p className="text-red-600 font-bold">
                        {contact.emergency}
                      </p>
                      <p className="text-sm text-gray-600">
                        {contact.hours.emergency}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      🕒
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Office Hours
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Weekdays: {contact.hours.weekdays}</p>
                        <p>Saturday: {contact.hours.saturday}</p>
                        <p>Sunday: {contact.hours.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {contact.insurance.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {contact.insurance.plans.map((plan, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span className="text-gray-700 text-sm">{plan}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  {contact.insurance.note}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <Link
                  href="/site/medical/appointments"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/site/medical/patient-portal"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  Patient Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-300 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">
              [Map integration - Google Maps with practice location]
            </p>
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
