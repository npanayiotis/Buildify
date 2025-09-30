import React from "react";
import Link from "next/link";

const WebsitePreview = ({ website }) => {
  if (!website) return null;

  const { fullWebsite } = website;

  // For blog websites, show the complete blog website with navigation
  if (website.category === "blog") {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link
                href="/blog/home"
                className="text-2xl font-bold text-gray-900"
              >
                My Blog
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/blog/home" className="text-gray-900 font-medium">
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
                  className="text-gray-500 hover:text-gray-900"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {fullWebsite.hero?.title || "Welcome to My Blog"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              {fullWebsite.hero?.subtitle ||
                "Thoughts, stories, and insights from my journey"}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                {fullWebsite.hero?.buttonText || "Read Latest Posts"}
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                {fullWebsite.hero?.buttonSecondary || "Subscribe"}
              </button>
            </div>
          </div>
        </section>

        {/* Featured Post Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Featured Post
              </h2>
              <p className="text-xl text-gray-600">
                Our most popular and engaging content
              </p>
            </div>

            {fullWebsite.posts && fullWebsite.posts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={fullWebsite.posts[0].image}
                      alt={fullWebsite.posts[0].title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {fullWebsite.posts[0].category}
                      </span>
                      <span className="ml-4 text-gray-500 text-sm">
                        {fullWebsite.posts[0].readTime}
                      </span>
                      <span className="ml-4 text-gray-500 text-sm">
                        {fullWebsite.posts[0].date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {fullWebsite.posts[0].title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {fullWebsite.posts[0].excerpt}
                    </p>
                    <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Latest Posts
              </h2>
              <p className="text-xl text-gray-600">
                Stay updated with our latest content
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fullWebsite.posts &&
                fullWebsite.posts.slice(1, 4).map((post, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <span className="ml-4 text-gray-500 text-sm">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Explore by Category
              </h2>
              <p className="text-xl text-gray-600">
                Find content that interests you
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {fullWebsite.categories &&
                fullWebsite.categories.map((category, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="text-3xl mb-3">📝</div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {category}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {Math.floor(Math.random() * 20) + 5} posts
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Blog Statistics</h2>
              <p className="text-xl opacity-90">Our journey in numbers</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {fullWebsite.stats &&
                fullWebsite.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg opacity-90">{stat.label}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {fullWebsite.newsletter?.title || "Stay Updated"}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {fullWebsite.newsletter?.description ||
                "Get notified when I publish new posts. No spam, just quality content delivered to your inbox."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={
                  fullWebsite.newsletter?.placeholder ||
                  "Enter your email address"
                }
                className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Join {fullWebsite.newsletter?.subscribers || "2,500+"} subscribers
              who get our latest posts
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">My Blog</h3>
                <p className="text-gray-400">
                  Sharing thoughts, stories, and insights from my journey.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/blog/home"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/about"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/posts"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog/contact"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Categories</h4>
                <ul className="space-y-2">
                  {fullWebsite.categories &&
                    fullWebsite.categories
                      .slice(0, 4)
                      .map((category, index) => (
                        <li key={index}>
                          <Link
                            href="/blog/categories"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {category}
                          </Link>
                        </li>
                      ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 My Blog. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  const renderHeroSection = () => (
    <section className="hero-section bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">{fullWebsite.hero.title}</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
          {fullWebsite.hero.subtitle}
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors">
            {fullWebsite.hero.buttonText}
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-colors">
            {fullWebsite.hero.buttonSecondary}
          </button>
        </div>
      </div>
    </section>
  );

  const renderFeaturesSection = () => {
    if (!website.features) return null;

    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {website.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderPricingSection = () => {
    if (!fullWebsite.pricing) return null;

    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              {fullWebsite.pricing.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {fullWebsite.pricing.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fullWebsite.pricing.plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-lg text-center relative ${
                  plan.popular
                    ? "border-2 border-blue-500 transform scale-105"
                    : "border-2 border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {plan.name}
                </h3>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-800">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 text-lg">/{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-600"
                    >
                      <span className="text-green-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderTestimonialsSection = () => {
    if (!fullWebsite.testimonials) return null;

    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fullWebsite.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderPortfolioSection = () => {
    if (!fullWebsite.portfolio) return null;

    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            My Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullWebsite.portfolio.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-semibold">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderBlogSection = () => {
    if (!fullWebsite.posts) return null;

    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fullWebsite.posts.map((post, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-blue-600 font-semibold">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <a
                      href="#"
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderMenuSection = () => {
    if (!fullWebsite.menu) return null;

    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Menu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fullWebsite.menu.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-semibold">
                      {item.category}
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                      {item.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderProductsSection = () => {
    if (!fullWebsite.products) return null;

    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fullWebsite.products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-semibold">
                      {product.category}
                    </span>
                    <span className="text-2xl font-bold text-gray-800">
                      ${product.price}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {product.description}
                  </p>
                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                      product.inStock
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderAboutSection = () => {
    if (!fullWebsite.about) return null;

    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">
              {fullWebsite.about.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {fullWebsite.about.content}
            </p>
          </div>
          {fullWebsite.about.skills && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {fullWebsite.about.skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow text-center"
                >
                  <span className="text-gray-800 font-semibold">{skill}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  };

  const renderProgramsSection = () => {
    if (!fullWebsite.programs) return null;

    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Our Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fullWebsite.programs.map((program, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {program.name}
                </h3>
                <p className="text-gray-600 mb-6">{program.description}</p>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {program.price}
                  </span>
                  <span className="text-gray-600 text-sm">
                    /{program.duration}
                  </span>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderTrainersSection = () => {
    if (!fullWebsite.trainers) return null;

    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Meet Our Trainers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fullWebsite.trainers.map((trainer, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {trainer.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {trainer.role}
                  </p>
                  <p className="text-gray-600 mb-4">{trainer.bio}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Specialties:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.specialties.map((specialty, specIndex) => (
                        <span
                          key={specIndex}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Certifications:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certifications.map((cert, certIndex) => (
                        <span
                          key={certIndex}
                          className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderMembershipSection = () => {
    if (!fullWebsite.membership) return null;

    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              {fullWebsite.membership.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {fullWebsite.membership.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fullWebsite.membership.plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl shadow-lg text-center relative ${
                  plan.popular
                    ? "border-2 border-blue-500 transform scale-105"
                    : "border-2 border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {plan.name}
                </h3>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-800">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 text-lg">/{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-gray-600"
                    >
                      <span className="text-green-500 mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderContactSection = () => {
    if (!fullWebsite.contact) return null;

    return (
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to start your journey? Contact us today!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-300">{fullWebsite.contact.address}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-300">{fullWebsite.contact.phone}</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300">{fullWebsite.contact.email}</p>
            </div>
          </div>
          {fullWebsite.contact.hours && (
            <div className="text-center mt-8">
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-300">{fullWebsite.contact.hours}</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="website-preview">
      {renderHeroSection()}
      {renderAboutSection()}
      {renderFeaturesSection()}
      {renderPortfolioSection()}
      {renderBlogSection()}
      {renderMenuSection()}
      {renderProductsSection()}
      {renderProgramsSection()}
      {renderTrainersSection()}
      {renderMembershipSection()}
      {renderPricingSection()}
      {renderTestimonialsSection()}
      {renderContactSection()}
    </div>
  );
};

export default WebsitePreview;
