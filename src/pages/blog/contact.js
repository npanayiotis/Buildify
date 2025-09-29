import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function BlogContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // In real app, this would make API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@myblog.com",
      description: "Send me an email anytime",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Call me during business hours",
    },
    {
      icon: "📍",
      title: "Location",
      value: "New York, NY",
      description: "Based in the Big Apple",
    },
    {
      icon: "⏰",
      title: "Response Time",
      value: "24-48 hours",
      description: "I'll get back to you soon",
    },
  ];

  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/myblog",
      icon: "🐦",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/myblog",
      icon: "📸",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/myblog",
      icon: "💼",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/myblog",
      icon: "🎥",
    },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Message Sent!
          </h1>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out. I'll get back to you within 24-48 hours.
          </p>
          <div className="space-y-4">
            <Link
              href="/blog/home"
              className="block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/blog/posts"
              className="block border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Read My Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Me - My Blog</title>
        <meta
          name="description"
          content="Get in touch with me. I'd love to hear from you about collaborations, questions, or just to say hello."
        />
        <meta property="og:title" content="Contact Me - My Blog" />
        <meta
          property="og:description"
          content="Get in touch with me. I'd love to hear from you about collaborations, questions, or just to say hello."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link
                href="/blog/home"
                className="text-2xl font-bold text-gray-900"
              >
                My Blog
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/blog/home"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link
                  href="/blog/about"
                  className="text-gray-500 hover:text-gray-900"
                >
                  About
                </Link>
                <Link
                  href="/blog/posts"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Blog
                </Link>
                <Link
                  href="/blog/categories"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Categories
                </Link>
                <Link
                  href="/blog/archive"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Archive
                </Link>
                <Link
                  href="/blog/contact"
                  className="text-gray-900 font-medium"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              I'd love to hear from you. Let's start a conversation.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Me a Message
              </h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell me what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {info.title}
                        </h3>
                        <p className="text-gray-600">{info.value}</p>
                        <p className="text-sm text-gray-500">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Follow Me
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-2xl">{social.icon}</div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {social.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{social.name.toLowerCase()}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      How quickly do you respond?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      I typically respond within 24-48 hours during weekdays.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Do you accept guest posts?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Yes! I'm always open to quality guest content. Please
                      reach out with your ideas.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Can we collaborate?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Absolutely! I love working with brands and fellow creators
                      on meaningful projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Newsletter CTA */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to my newsletter for exclusive content and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
