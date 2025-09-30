import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function MedicalDoctorsPage() {
  const medicalData = WEBSITES.find((w) => w.id === "medical-practice-website");
  const { doctors } = medicalData.fullWebsite;
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-green-600">
              Medical Practice
            </div>
            <div className="hidden md:flex space-x-8">
              {medicalData.fullWebsite.pages.map((link) => (
                <Link
                  key={link.slug}
                  href={`/site/medical${link.slug}`}
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
      <section className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Meet Our Physicians
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Board-certified doctors dedicated to your health and well-being
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="relative h-80">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{doctor.name}</h3>
                    <p className="text-sm text-gray-200">{doctor.role}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">
                      {doctor.experience}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-bold text-gray-900">
                        {doctor.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {doctor.bio}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      👥 {doctor.patients}+ patients served
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Schedule Your Visit?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Book an appointment with one of our experienced physicians
          </p>
          <Link
            href="/site/medical/appointments"
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Book Appointment
          </Link>
        </div>
      </section>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid md:grid-cols-2">
              <div className="relative h-96 md:h-auto">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="float-right text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>

                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedDoctor.name}
                </h2>
                <p className="text-lg text-green-600 mb-4">
                  {selectedDoctor.role}
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Education
                    </h4>
                    <p className="text-gray-700">{selectedDoctor.education}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Experience
                    </h4>
                    <p className="text-gray-700">{selectedDoctor.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.specialties.map((specialty, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                    <p className="text-gray-600">{selectedDoctor.bio}</p>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedDoctor.rating}
                      </div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedDoctor.patients}+
                      </div>
                      <div className="text-sm text-gray-600">Patients</div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/site/medical/appointments"
                  className="block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  Book with {selectedDoctor.name.split(" ")[1]}
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
            © 2024 Medical Practice. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
