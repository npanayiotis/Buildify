import Link from "next/link";
import ContactForm from "../../../components/Contact/ContactForm";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function PortfolioContactPage() {
  const portfolioData = WEBSITES.find(
    (w) => w.id === "creative-portfolio-website"
  );
  const { contact, navigation, footer } = portfolioData.fullWebsite;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-purple-600">
              {navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/portfolio${
                    link.href === "/" ? "/portfolio" : link.href
                  }`}
                  className="text-gray-700 hover:text-purple-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Let's Work Together</h1>
          <p className="text-xl text-purple-100">
            Have a project in mind? I'd love to hear about it!
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
                Start Your Project
              </h2>
              <ContactForm websiteType="portfolio" />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📱
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600">{contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Location
                      </h3>
                      <p className="text-gray-600">{contact.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      🌐
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Social Media
                      </h3>
                      <div className="flex gap-4 mt-2">
                        <a
                          href={contact.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Instagram
                        </a>
                        <a
                          href={contact.social.behance}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Behance
                        </a>
                        <a
                          href={contact.social.dribbble}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          Dribbble
                        </a>
                        <a
                          href={contact.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Box */}
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {contact.availability.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {contact.availability.description}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold">Response Time:</span>{" "}
                    {contact.availability.responseTime}
                  </p>
                  <p>
                    <span className="font-semibold">Consultation:</span>{" "}
                    {contact.availability.consultation}
                  </p>
                </div>
              </div>

              {/* Services Quick Links */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Services Offered
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/site/portfolio/services"
                    className="block text-purple-600 hover:text-purple-700"
                  >
                    → Brand Identity Design
                  </Link>
                  <Link
                    href="/site/portfolio/services"
                    className="block text-purple-600 hover:text-purple-700"
                  >
                    → Web Design & Development
                  </Link>
                  <Link
                    href="/site/portfolio/services"
                    className="block text-purple-600 hover:text-purple-700"
                  >
                    → Print Design
                  </Link>
                  <Link
                    href="/site/portfolio/services"
                    className="block text-purple-600 hover:text-purple-700"
                  >
                    → Illustration Services
                  </Link>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Answers
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      What's your typical project timeline?
                    </p>
                    <p className="text-gray-600">
                      Most projects take 2-6 weeks depending on scope and
                      complexity.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Do you work with clients remotely?
                    </p>
                    <p className="text-gray-600">
                      Yes! I work with clients worldwide through video calls and
                      online collaboration tools.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      What's your design process?
                    </p>
                    <p className="text-gray-600">
                      Discovery → Research → Concept Development → Design &
                      Refinement → Final Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
