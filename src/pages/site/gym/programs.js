import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function GymProgramsPage() {
  const gymData = WEBSITES.find((w) => w.id === "fitness-gym-website");
  const { programs, navigation, membership } = gymData.fullWebsite;
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-green-600">
              {navigation.logo}
            </div>
            <div className="hidden md:flex space-x-8">
              {navigation.links.map((link) => (
                <Link
                  key={link.href}
                  href={`/site/gym${
                    link.href === "/" ? "/programs" : link.href
                  }`}
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
      <section className="relative bg-gradient-to-r from-green-600 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Training Programs
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Choose the perfect program to reach your fitness goals with expert
              guidance
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl overflow-hidden shadow-lg border-2 ${
                  program.popular ? "border-green-600" : "border-gray-200"
                } hover:shadow-xl transition`}
              >
                {program.popular && (
                  <div className="bg-green-600 text-white text-center py-2 font-semibold text-sm">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="relative h-64">
                  <img
                    src={program.image}
                    alt={program.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white text-green-600 px-4 py-2 rounded-lg font-bold shadow-lg">
                    {program.price}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {program.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{program.description}</p>

                  <div className="space-y-3 mb-6">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      What's Included:
                    </h4>
                    {program.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <span className="text-green-600 font-bold">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                      Learn More
                    </button>
                    <Link
                      href="/site/gym/membership"
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Membership Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose the membership that fits your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {membership.plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 ${
                  plan.popular ? "ring-2 ring-green-600 shadow-xl" : "shadow-sm"
                } relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Best Value
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {plan.price}
                </div>
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    plan.popular
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join FitLife Gym today and get access to all our programs and
            facilities
          </p>
          <Link
            href="/site/gym/contact"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedProgram.image}
                alt={selectedProgram.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 bg-white text-gray-700 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProgram.name}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {selectedProgram.description}
                  </p>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  {selectedProgram.price}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Program Features
                  </h3>
                  <ul className="space-y-3">
                    {selectedProgram.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-green-600 text-xl">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Program Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">
                        Duration
                      </div>
                      <div className="text-lg text-gray-900">
                        Flexible - Month-to-month or packages
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">
                        Level
                      </div>
                      <div className="text-lg text-gray-900">
                        All fitness levels welcome
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600">
                        Schedule
                      </div>
                      <div className="text-lg text-gray-900">
                        7 days a week - Flexible timing
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/site/gym/contact"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition text-center"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/site/gym/membership"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-4 rounded-lg font-semibold transition text-center"
                >
                  View Memberships
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            {gymData.fullWebsite.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
