import { useState } from "react";
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function BlogHomePage() {
  const blogData = WEBSITES[0]; // Professional Blog
  const { hero, posts, featuredCategories, newsletter, testimonials } =
    blogData.fullWebsite;

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

      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(${hero.overlay}, ${hero.overlay}), url(${hero.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{hero.title}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            {hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/site/blog/posts"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {hero.buttonText}
            </Link>
            <Link
              href="/site/blog/newsletter"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold transition"
            >
              {hero.buttonSecondary}
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            {hero.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-200 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600">
              Discover content organized by topics that matter to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCategories.map((category, index) => (
              <Link
                key={index}
                href={`/site/blog/categories?category=${category.name}`}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition group"
              >
                <div
                  className={`text-5xl mb-4 group-hover:scale-110 transition`}
                >
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="text-sm text-gray-500">
                  {category.postCount} articles
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Latest Posts</h2>
            <Link
              href="/site/blog/posts"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  {post.featured && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <div className="flex gap-4">
                      <span>👁 {post.views}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">{newsletter.title}</h2>
          <p className="text-xl mb-8 text-blue-100">{newsletter.description}</p>

          <div className="bg-white rounded-lg p-8 text-gray-900">
            <form className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {newsletter.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            What Readers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                {blogData.fullWebsite.navigation.logo}
              </div>
              <p className="text-gray-400">
                {blogData.fullWebsite.footer.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {blogData.fullWebsite.footer.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={`/site/blog${
                        link.url === "/" ? "/home" : link.url
                      }`}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                {blogData.fullWebsite.categories
                  .slice(0, 5)
                  .map((cat, index) => (
                    <li key={index}>
                      <Link
                        href={`/site/blog/categories?category=${cat.name}`}
                        className="text-gray-400 hover:text-white transition"
                      >
                        {cat.name} ({cat.count})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href={blogData.fullWebsite.footer.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Twitter
                </a>
                <a
                  href={blogData.fullWebsite.footer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            {blogData.fullWebsite.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
