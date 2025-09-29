import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function GymPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gym/programs?tenantId=default-tenant");
      const data = await response.json();

      if (response.ok) {
        setPrograms(data);
      } else {
        console.error("Error fetching programs:", data.error);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Fitness Programs - Transform Your Body</title>
        <meta
          name="description"
          content="Discover our comprehensive fitness programs designed to help you achieve your health and wellness goals."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Fitness Gym
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Home
                </Link>
                <Link href="/programs" className="text-gray-900 font-medium">
                  Programs
                </Link>
                <Link
                  href="/trainers"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Trainers
                </Link>
                <Link
                  href="/membership"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Membership
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fitness Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Transform your body and mind with our expert-led programs
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-8 animate-pulse"
                >
                  <div className="text-4xl mb-4 bg-gray-300 rounded w-16 h-16"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-4">{program.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {program.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Duration:
                      </span>
                      <span className="text-sm text-gray-900">
                        {program.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        Price:
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        ${program.price}
                      </span>
                    </div>
                  </div>

                  {program.features && program.features.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Features:
                      </h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Book Now
                    </button>
                    <button className="flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💪</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No programs available
              </h3>
              <p className="text-gray-600">
                Check back soon for new fitness programs and classes.
              </p>
            </div>
          )}
        </main>

        {/* Featured Programs */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Programs?
              </h2>
              <p className="text-xl text-gray-600">
                Expert-designed programs that deliver real results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Goal-Oriented
                </h3>
                <p className="text-gray-600">
                  Each program is designed to help you achieve specific fitness
                  goals with measurable results.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Expert Guidance
                </h3>
                <p className="text-gray-600">
                  Learn from certified trainers with years of experience in
                  fitness and nutrition.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Track Progress
                </h3>
                <p className="text-gray-600">
                  Monitor your progress with detailed tracking and regular
                  assessments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Fitness Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join our community and transform your body with our expert-led
              programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/membership"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                View Membership Plans
              </Link>
              <Link
                href="/trainers"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
              >
                Meet Our Trainers
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
