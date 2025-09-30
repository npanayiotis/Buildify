import Link from "next/link";
import ContactForm from "../../../components/Contact/ContactForm";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function PhotographyContactPage() {
  const photographyData = WEBSITES.find(
    (w) => w.id === "photography-studio-website"
  );
  const { contact } = photographyData.fullWebsite;

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
      <section className="bg-gradient-to-r from-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Contact the Studio</h1>
          <p className="text-xl text-pink-100">{contact.consultation.title}</p>
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
              <ContactForm websiteType="photography" />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Studio Address
                      </h3>
                      <p className="text-gray-600">{contact.studio}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      🕒
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Studio Hours
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Weekdays: {contact.hours.weekdays}</p>
                        <p>Saturday: {contact.hours.saturday}</p>
                        <p>Sunday: {contact.hours.sunday}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-pink-100 text-pink-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      🌐
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Follow Us
                      </h3>
                      <div className="flex gap-4 mt-2">
                        <a
                          href={contact.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700"
                        >
                          Instagram
                        </a>
                        <a
                          href={contact.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700"
                        >
                          Facebook
                        </a>
                        <a
                          href={contact.social.pinterest}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700"
                        >
                          Pinterest
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Free Consultation Box */}
              <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {contact.consultation.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {contact.consultation.description}
                </p>
                <ul className="space-y-2">
                  {contact.consultation.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-pink-600">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <Link
                  href="/site/photography/booking"
                  className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  Book Session
                </Link>
                <Link
                  href="/site/photography/portfolio"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  View Portfolio
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
              [Map integration - Studio location on Google Maps]
            </p>
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
