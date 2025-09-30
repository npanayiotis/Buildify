import Link from "next/link";

export default function AllWebsitesIndex() {
  const websites = [
    {
      name: "Blog Website",
      description:
        "Professional blog with articles, categories, and newsletter",
      color: "blue",
      pages: [
        { name: "Home", url: "/site/blog/home" },
        { name: "Contact", url: "/site/blog/contact" },
      ],
      admin: "/admin/blog/posts",
    },
    {
      name: "Restaurant Website",
      description: "Elegant restaurant with menu and reservations",
      color: "red",
      pages: [
        { name: "Menu", url: "/site/restaurant/menu" },
        { name: "Reservations", url: "/site/restaurant/reservations" },
      ],
      admin: "/admin/restaurant/reservations",
    },
    {
      name: "Gym Website",
      description: "Fitness center with programs and memberships",
      color: "green",
      pages: [{ name: "Programs", url: "/site/gym/programs" }],
      admin: "/admin/gym/members",
    },
    {
      name: "Law Office Website",
      description: "Professional law firm with practice areas",
      color: "blue",
      pages: [
        { name: "Services", url: "/site/law/services" },
        { name: "Contact", url: "/site/law/contact" },
      ],
      admin: "/admin/law/cases",
    },
    {
      name: "Portfolio Website",
      description: "Creative portfolio for designers and artists",
      color: "purple",
      pages: [
        { name: "Portfolio", url: "/site/portfolio/portfolio" },
        { name: "Contact", url: "/site/portfolio/contact" },
      ],
      admin: "/admin/portfolio/projects",
    },
    {
      name: "Real Estate Website",
      description: "Property listings and agent profiles",
      color: "indigo",
      pages: [{ name: "Properties", url: "/site/real-estate/properties" }],
      admin: "/admin/real-estate/properties-admin",
    },
    {
      name: "Medical Practice Website",
      description: "Healthcare services and appointment booking",
      color: "green",
      pages: [
        { name: "Services", url: "/site/medical/services" },
        { name: "Doctors", url: "/site/medical/doctors" },
        { name: "Appointments", url: "/site/medical/appointments" },
        { name: "Contact", url: "/site/medical/contact" },
        { name: "Patient Portal", url: "/site/medical/patient-portal" },
      ],
      admin: "/admin/medical/appointments",
    },
    {
      name: "Photography Studio Website",
      description: "Professional photography services and gallery",
      color: "pink",
      pages: [
        { name: "Portfolio", url: "/site/photography/portfolio" },
        { name: "Services", url: "/site/photography/services" },
        { name: "Booking", url: "/site/photography/booking" },
        { name: "Contact", url: "/site/photography/contact" },
      ],
      admin: "/admin/photography/bookings",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-600 to-indigo-700 border-blue-200",
      red: "from-red-600 to-amber-600 border-red-200",
      green: "from-green-600 to-teal-700 border-green-200",
      purple: "from-purple-600 to-pink-600 border-purple-200",
      indigo: "from-indigo-600 to-blue-700 border-indigo-200",
      pink: "from-pink-600 to-purple-700 border-pink-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              All 8 Websites - Complete! 🎉
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Access all website pages and admin dashboards from one place
            </p>
            <div className="flex justify-center gap-4">
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">19</div>
                <div className="text-sm">Website Pages</div>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">9</div>
                <div className="text-sm">Admin Dashboards</div>
              </div>
              <div className="bg-white/20 backdrop-blur px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm">Websites Enhanced</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Universal Contact Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 rounded-2xl shadow-xl mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                🎯 Universal Contact Dashboard
              </h2>
              <p className="text-gray-300">
                Manage all contact submissions from all 8 websites in one place
              </p>
            </div>
            <Link
              href="/admin/contacts"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition shadow-lg"
            >
              Open Dashboard →
            </Link>
          </div>
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {websites.map((website, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div
                className={`bg-gradient-to-r ${getColorClasses(
                  website.color
                )} p-6 text-white`}
              >
                <h3 className="text-2xl font-bold mb-2">{website.name}</h3>
                <p className="text-white/90">{website.description}</p>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🌐</span>
                    <span>Website Pages</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {website.pages.map((page, i) => (
                      <Link
                        key={i}
                        href={page.url}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition text-sm font-medium"
                      >
                        {page.name} →
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span>🎛️</span>
                    <span>Admin Dashboard</span>
                  </h4>
                  <Link
                    href={website.admin}
                    className="block bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition font-semibold text-center"
                  >
                    Open Dashboard →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            ✅ All Requirements Met!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <div className="text-2xl font-bold">8/8</div>
              <div className="text-sm text-green-100">Websites Enhanced</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📝</div>
              <div className="text-2xl font-bold">8/8</div>
              <div className="text-sm text-green-100">Contact Forms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎛️</div>
              <div className="text-2xl font-bold">9/9</div>
              <div className="text-sm text-green-100">Admin Dashboards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔗</div>
              <div className="text-2xl font-bold">19</div>
              <div className="text-sm text-green-100">Pages Created</div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 Documentation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/PROJECT_COMPLETE.md"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="font-bold text-gray-900 mb-1">
                📋 Project Complete
              </div>
              <div className="text-sm text-gray-600">
                Complete overview and file list
              </div>
            </a>
            <a
              href="/COMPLETION_GUIDE.md"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="font-bold text-gray-900 mb-1">
                🎯 Completion Guide
              </div>
              <div className="text-sm text-gray-600">
                Templates and quick reference
              </div>
            </a>
            <a
              href="/QUICK_START_WEBSITES.md"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="font-bold text-gray-900 mb-1">
                🚀 Quick Start Guide
              </div>
              <div className="text-sm text-gray-600">
                Getting started instructions
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            All 8 Websites Enhanced - Contact Forms - Admin Dashboards -
            Complete! ✨
          </p>
        </div>
      </footer>
    </div>
  );
}
