import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function PhotographyPortfolioPage() {
  const photographyData = WEBSITES.find(
    (w) => w.id === "photography-studio-website"
  );
  const { portfolio } = photographyData.fullWebsite;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "all"
      ? portfolio.featured
      : portfolio.featured.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-2xl font-bold text-pink-600">
              Photography Studio
            </div>
            <div className="hidden md:flex space-x-8">
              {photographyData.fullWebsite.pages.map((link) => (
                <Link
                  key={link.slug}
                  href={`/site/photography${link.slug}`}
                  className="text-gray-700 hover:text-pink-600 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-pink-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Capturing life's beautiful moments through stunning photography
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`whitespace-nowrap px-4 py-2 rounded-lg font-semibold transition ${
                selectedCategory === "all"
                  ? "bg-pink-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              All Photos
            </button>
            {portfolio.categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === category.name
                    ? "bg-pink-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="font-semibold">{project.title}</p>
                      <p className="text-sm text-gray-200">
                        {project.location}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Capture Your Moments?
          </h2>
          <p className="text-xl mb-8 text-pink-100">
            Book your photography session today
          </p>
          <Link
            href="/site/photography/booking"
            className="inline-block bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition"
          >
            Book a Session
          </Link>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-[500px]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white text-gray-700 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-8">
              <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {selectedProject.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <span className="text-gray-600">Location:</span>{" "}
                  <span className="text-gray-900 font-medium">
                    {selectedProject.location}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Year:</span>{" "}
                  <span className="text-gray-900 font-medium">
                    {selectedProject.date}
                  </span>
                </div>
              </div>

              <Link
                href="/site/photography/booking"
                className="block bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
              >
                Book Similar Session
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            © 2024 Photography Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
