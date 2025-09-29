import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BlogAbout() {
  const [stats, setStats] = useState({
    posts: 0,
    readers: 0,
    countries: 0,
    years: 0,
  });

  useEffect(() => {
    // Mock data for now - in real app, this would come from API
    setStats({
      posts: 50,
      readers: 25000,
      countries: 100,
      years: 5,
    });
  }, []);

  const interests = [
    "Travel",
    "Photography",
    "Cooking",
    "Reading",
    "Technology",
    "Mindfulness",
  ];

  const achievements = [
    {
      title: "Published Author",
      description: "Author of 2 books on personal growth and mindfulness",
      icon: "📚",
    },
    {
      title: "Travel Blogger",
      description: "Visited 25+ countries and shared experiences",
      icon: "✈️",
    },
    {
      title: "Content Creator",
      description: "Created 500+ pieces of content across platforms",
      icon: "📝",
    },
    {
      title: "Community Builder",
      description: "Built a community of 25,000+ engaged readers",
      icon: "👥",
    },
  ];

  return (
    <>
      <Head>
        <title>About Me - My Blog</title>
        <meta
          name="description"
          content="Learn more about my journey as a writer, traveler, and content creator. Discover my interests, achievements, and what drives my passion for sharing stories."
        />
        <meta property="og:title" content="About Me - My Blog" />
        <meta
          property="og:description"
          content="Learn more about my journey as a writer, traveler, and content creator."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link
                href="/blog/home"
                className="text-2xl font-bold text-gray-900"
              >
                My Blog
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/blog/home"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Home
                </Link>
                <Link href="/blog/about" className="text-gray-900 font-medium">
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
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Writer, traveler, and lifelong learner sharing stories from my
              journey
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Profile Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                  alt="Profile Picture"
                  fill
                  className="object-cover rounded-full border-4 border-white"
                />
              </div>
              <h2 className="text-3xl font-bold mb-2">John Doe</h2>
              <p className="text-xl opacity-90 mb-4">
                Writer & Content Creator
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                I&apos;m a passionate writer, traveler, and lifelong learner.
                Through this blog, I share my experiences, insights, and the
                lessons I&apos;ve learned along my journey. Join me as we
                explore life, creativity, and everything in between.
              </p>
            </div>

            {/* Stats Section */}
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                My Journey in Numbers
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.posts}+
                  </div>
                  <div className="text-gray-600">Articles Published</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.readers.toLocaleString()}+
                  </div>
                  <div className="text-gray-600">Monthly Readers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.countries}+
                  </div>
                  <div className="text-gray-600">Countries Visited</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.years}+
                  </div>
                  <div className="text-gray-600">Years Writing</div>
                </div>
              </div>
            </div>

            {/* Story Section */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                My Story
              </h3>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="mb-6">
                  My journey as a writer began five years ago when I decided to
                  document my travels and share the lessons I was learning along
                  the way. What started as a personal journal quickly evolved
                  into a platform where I could connect with like-minded
                  individuals who were also seeking growth and adventure.
                </p>
                <p className="mb-6">
                  Through this blog, I&apos;ve had the privilege of sharing
                  stories from 25+ countries, documenting the beauty of
                  different cultures, and exploring topics that matter to me -
                  from mindfulness and personal growth to technology and
                  creativity. Each post is a piece of my journey, and I&apos;m
                  grateful to have readers who join me on this adventure.
                </p>
                <p className="mb-6">
                  When I&apos;m not writing or traveling, you&apos;ll find me
                  experimenting in the kitchen, practicing photography, or
                  diving into a good book. I believe that life is about
                  continuous learning and growth, and I&apos;m excited to share
                  this journey with you.
                </p>
              </div>
            </div>

            {/* Interests Section */}
            <div className="p-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What I&apos;m Passionate About
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-medium text-gray-900">{interest}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section */}
            <div className="p-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Achievements & Milestones
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="p-8 border-t border-gray-200 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Connect With Me
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-700 transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-red-600 transition-colors"
                >
                  <span className="sr-only">YouTube</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Newsletter CTA */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
            <p className="text-xl mb-8 opacity-90">
              Join my newsletter for exclusive content, travel tips, and
              personal insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
