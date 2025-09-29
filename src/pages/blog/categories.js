import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BlogCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Mock data for now - in real app, this would come from API
      const mockCategories = [
        {
          id: "lifestyle",
          name: "Lifestyle",
          slug: "lifestyle",
          description:
            "Articles about living well, mindfulness, and personal growth",
          postCount: 15,
          color: "#FF6B6B",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        {
          id: "travel",
          name: "Travel",
          slug: "travel",
          description: "Travel stories, tips, and destination guides",
          postCount: 12,
          color: "#4ECDC4",
          image:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        {
          id: "personal-growth",
          name: "Personal Growth",
          slug: "personal-growth",
          description: "Self-improvement, productivity, and life lessons",
          postCount: 18,
          color: "#45B7D1",
          image:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        {
          id: "wellness",
          name: "Wellness",
          slug: "wellness",
          description: "Health, fitness, and mental wellness topics",
          postCount: 10,
          color: "#96CEB4",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        {
          id: "technology",
          name: "Technology",
          slug: "technology",
          description: "Tech trends, digital tools, and innovation",
          postCount: 8,
          color: "#FFEAA7",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
        {
          id: "photography",
          name: "Photography",
          slug: "photography",
          description: "Photography tips, techniques, and inspiration",
          postCount: 6,
          color: "#DDA0DD",
          image:
            "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        },
      ];

      setCategories(mockCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Blog Categories - Explore Topics</title>
        <meta
          name="description"
          content="Browse our blog posts by category. Find articles about lifestyle, travel, personal growth, wellness, technology, and photography."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                My Blog
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-900">
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-gray-500 hover:text-gray-900"
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Blog
                </Link>
                <Link
                  href="/blog/categories"
                  className="text-gray-900 font-medium"
                >
                  Categories
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
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog Categories
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Explore our content organized by topics
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog?category=${category.slug}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      {category.postCount} posts
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category.postCount} articles
                      </span>
                      <span className="text-blue-600 font-medium group-hover:text-blue-800">
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        {/* Newsletter Signup */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get notified when we publish new posts. No spam, just quality
              content.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
