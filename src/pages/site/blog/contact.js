import Link from "next/link";
import ContactForm from "../../../components/Contact/ContactForm";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function BlogContactPage() {
  const blogData = WEBSITES[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-gray-900">
              {blogData.fullWebsite.navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {blogData.fullWebsite.navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/blog${link.href === "/" ? "/home" : link.href}`}
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
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-blue-100">
            Have a question or want to collaborate? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <ContactForm websiteType="blog" />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📧
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h3>
                      <p className="text-gray-600">hello@myblog.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      📱
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Phone
                      </h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                      🌍
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Social Media
                      </h3>
                      <div className="flex gap-4 mt-2">
                        <a
                          href={blogData.fullWebsite.footer.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Twitter
                        </a>
                        <a
                          href={
                            blogData.fullWebsite.footer.socialLinks.instagram
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-600 hover:text-pink-700"
                        >
                          Instagram
                        </a>
                        <a
                          href={
                            blogData.fullWebsite.footer.socialLinks.linkedin
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 hover:text-blue-800"
                        >
                          LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Answers
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      How quickly do you respond?
                    </p>
                    <p className="text-gray-600">
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Can I collaborate with you?
                    </p>
                    <p className="text-gray-600">
                      Absolutely! We're always open to collaboration
                      opportunities. Just let us know your ideas.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Do you accept guest posts?
                    </p>
                    <p className="text-gray-600">
                      Yes, we welcome guest contributions. Please include your
                      topic idea and writing samples in your message.
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
          <div className="text-center text-gray-400">
            {blogData.fullWebsite.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
