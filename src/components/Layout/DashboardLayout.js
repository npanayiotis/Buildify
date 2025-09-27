import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Publish", href: "/publish", icon: "🚀" },
    { name: "Help", href: "/help", icon: "❓" },
  ];

  const sidebarItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Inquiries", href: "/inquiries", icon: "📧" },
    { name: "Bookings", href: "/bookings", icon: "📅" },
    { name: "Products", href: "/products", icon: "🏷️" },
    { name: "Analytics", href: "/analytics", icon: "📈" },
    { name: "Settings", href: "/settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-blue-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center glow-blue">
                  <span className="text-white font-bold text-sm">SC</span>
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Buildify
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    router.pathname === item.href
                      ? "gradient-primary text-white shadow-lg glow-blue"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-md"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg glow-blue transition-all duration-300 hover:scale-105">
                + New Site
              </button>
              <div className="w-8 h-8 gradient-secondary rounded-full flex items-center justify-center glow-purple">
                <span className="text-sm font-medium text-white">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white/80 backdrop-blur-md shadow-lg border-r border-blue-200/50 min-h-screen">
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      router.pathname === item.href
                        ? "gradient-primary text-white shadow-lg glow-blue"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-md"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="mt-8">
                <Link
                  href="/logout"
                  className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50/50 hover:shadow-md transition-all duration-300"
                >
                  <span className="mr-3">🚪</span>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gradient-to-br from-white/50 to-blue-50/30 backdrop-blur-sm">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
