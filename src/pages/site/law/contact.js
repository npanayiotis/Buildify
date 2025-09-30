import Link from "next/link";
import ContactForm from "../../../components/Contact/ContactForm";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function LawContactPage() {
  const lawData = WEBSITES.find((w) => w.id === "law-office-website");
  const { contact, navigation, footer } = lawData.fullWebsite;

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
      <section className="bg-gradient-to-r from-blue-700 to-gray-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Our Legal Team</h1>
          <p className="text-xl text-blue-100">
            {contact.consultation.title} - Schedule your consultation today
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
                Request a Consultation
              </h2>
              <ContactForm websiteType="law" />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Office Address
                      </h3>
                      <p className="text-gray-600">{contact.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
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

              {/* Free Consultation Box */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {contact.consultation.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {contact.consultation.description}
                </p>
                <ul className="space-y-2">
                  {contact.consultation.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-blue-600">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice Areas Quick Links */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Practice Areas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/site/law/services"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Personal Injury
                  </Link>
                  <Link
                    href="/site/law/services"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Corporate Law
                  </Link>
                  <Link
                    href="/site/law/services"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Family Law
                  </Link>
                  <Link
                    href="/site/law/services"
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Criminal Defense
                  </Link>
                </div>
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
              [Map integration would go here - Google Maps API]
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">{footer.copyright}</div>
        </div>
      </footer>
    </div>
  );
}
