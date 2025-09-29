import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function GymTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gym/trainers?tenantId=default-tenant");
      const data = await response.json();

      if (response.ok) {
        setTrainers(data);
      } else {
        console.error("Error fetching trainers:", data.error);
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Meet Our Trainers - Expert Fitness Coaches</title>
        <meta
          name="description"
          content="Meet our certified trainers who will help you achieve your fitness goals with personalized guidance and expertise."
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
                <Link
                  href="/programs"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Programs
                </Link>
                <Link href="/trainers" className="text-gray-900 font-medium">
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
              Meet Our Trainers
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Expert coaches dedicated to your success
            </p>
          </div>
        </section>

        {/* Trainers Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-8 animate-pulse"
                >
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-5/6"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : trainers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="text-center mb-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      {trainer.imageUrl ? (
                        <Image
                          src={trainer.imageUrl}
                          alt={trainer.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-4xl text-gray-500">👤</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {trainer.name}
                    </h3>
                    <p className="text-lg text-green-600 font-medium mb-2">
                      {trainer.role}
                    </p>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(trainer.rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {trainer.rating || 0} ({trainer.clients || 0} clients)
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 text-center mb-4">
                      {trainer.bio}
                    </p>

                    {trainer.experience && (
                      <div className="text-center mb-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {trainer.experience} Experience
                        </span>
                      </div>
                    )}
                  </div>

                  {trainer.specialties && trainer.specialties.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Specialties:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trainer.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {trainer.certifications &&
                    trainer.certifications.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          Certifications:
                        </h4>
                        <div className="space-y-1">
                          {trainer.certifications.map((cert, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <span className="text-green-500 mr-2">✓</span>
                              {cert}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                      Book Session
                    </button>
                    <button className="flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-lg font-medium hover:bg-green-50 transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No trainers available
              </h3>
              <p className="text-gray-600">
                Check back soon for our certified fitness trainers.
              </p>
            </div>
          )}
        </main>

        {/* Why Choose Our Trainers */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Trainers?
              </h2>
              <p className="text-xl text-gray-600">
                Certified professionals committed to your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Certified
                </h3>
                <p className="text-gray-600 text-sm">
                  All trainers hold nationally recognized certifications
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💪</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Experienced
                </h3>
                <p className="text-gray-600 text-sm">
                  Years of hands-on experience in fitness training
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Goal-Focused
                </h3>
                <p className="text-gray-600 text-sm">
                  Personalized approach to help you achieve your goals
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Supportive
                </h3>
                <p className="text-gray-600 text-sm">
                  Encouraging and motivating throughout your journey
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-green-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Work with a Trainer?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a session with one of our expert trainers and start your
              transformation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/programs"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                View Programs
              </Link>
              <Link
                href="/membership"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
              >
                Join Now
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
