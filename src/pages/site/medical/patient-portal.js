import { useState } from "react";
import Link from "next/link";

export default function PatientPortalPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement authentication
    alert("Patient portal login - To be implemented with authentication");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-green-600">
              Medical Practice
            </div>
            <Link
              href="/site/medical/contact"
              className="text-gray-700 hover:text-green-600 transition"
            >
              Back to Website
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Section */}
      <section className="py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏥</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Patient Portal
              </h1>
              <p className="text-gray-600">
                Access your medical records and health information
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="your-email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <Link
                href="#"
                className="block text-sm text-green-600 hover:text-green-700"
              >
                Forgot Password?
              </Link>
              <Link
                href="#"
                className="block text-sm text-green-600 hover:text-green-700"
              >
                New Patient? Register Here
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-sm font-medium text-gray-900">
                Medical Records
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl mb-2">💊</div>
              <div className="text-sm font-medium text-gray-900">
                Prescriptions
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm text-center">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium text-gray-900">
                Appointments
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
