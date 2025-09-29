import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    page: 1,
  });

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Mock data for now - in real app, this would come from API
      const mockPosts = [
        {
          id: "1",
          title: "The Art of Slow Living",
          slug: "the-art-of-slow-living",
          excerpt:
            "In our fast-paced world, finding moments of stillness and intentionality can transform our daily experience. Here's how to embrace a slower, more mindful approach to life.",
          imageUrl:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Lifestyle",
          readTime: "5 min read",
          viewCount: 1250,
          comments: 23,
          createdAt: "2024-01-15T10:00:00Z",
          featured: true,
        },
        {
          id: "2",
          title: "Lessons from a Year of Travel",
          slug: "lessons-from-a-year-of-travel",
          excerpt:
            "After visiting 12 countries in the past year, here are the most valuable lessons I've learned about culture, connection, and personal growth.",
          imageUrl:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Travel",
          readTime: "8 min read",
          viewCount: 2100,
          comments: 45,
          createdAt: "2024-01-10T14:30:00Z",
          featured: false,
        },
        {
          id: "3",
          title: "Building Better Habits",
          slug: "building-better-habits",
          excerpt:
            "How small changes in daily routines can lead to significant personal growth and fulfillment. A practical guide to habit formation.",
          imageUrl:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Personal Growth",
          readTime: "6 min read",
          viewCount: 1800,
          comments: 32,
          createdAt: "2024-01-05T09:15:00Z",
          featured: false,
        },
        {
          id: "4",
          title: "The Power of Mindfulness",
          slug: "the-power-of-mindfulness",
          excerpt:
            "Exploring meditation, breathing techniques, and present-moment awareness for better mental health and overall well-being.",
          imageUrl:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Wellness",
          readTime: "7 min read",
          viewCount: 3200,
          comments: 67,
          createdAt: "2024-01-01T16:45:00Z",
          featured: true,
        },
        {
          id: "5",
          title: "Digital Minimalism",
          slug: "digital-minimalism",
          excerpt:
            "How to reclaim your time and attention in an increasingly connected world. Practical strategies for mindful technology use.",
          imageUrl:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Technology",
          readTime: "6 min read",
          viewCount: 1950,
          comments: 28,
          createdAt: "2023-12-28T11:20:00Z",
          featured: false,
        },
        {
          id: "6",
          title: "Creative Photography Tips",
          slug: "creative-photography-tips",
          excerpt:
            "Simple techniques to improve your photography skills and capture more meaningful moments in your daily life.",
          imageUrl:
            "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Photography",
          readTime: "5 min read",
          viewCount: 1650,
          comments: 19,
          createdAt: "2023-12-20T13:10:00Z",
          featured: false,
        },
      ];

      setPosts(mockPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: e.target.search.value, page: 1 }));
  };

  const handleCategoryFilter = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: category === prev.category ? "" : category,
      page: 1,
    }));
  };

  return (
    <>
      <Head>
        <title>Blog Posts - Latest Articles & Insights</title>
        <meta
          name="description"
          content="Read our latest blog posts covering lifestyle, travel, technology, and personal growth."
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
                <Link href="/blog/posts" className="text-gray-900 font-medium">
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
              Latest Posts
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover insights, stories, and ideas that inspire
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="bg-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <form onSubmit={handleSearch} className="flex-1 max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search posts..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    🔍
                  </button>
                </div>
              </form>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {[
                  "All",
                  "Lifestyle",
                  "Travel",
                  "Technology",
                  "Personal Growth",
                  "Wellness",
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() =>
                      handleCategoryFilter(category === "All" ? "" : category)
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.category === (category === "All" ? "" : category)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
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
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.imageUrl && (
                    <div className="relative h-48">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                      {post.featured && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{post.viewCount} views</span>
                        <span>{post.comments} comments</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                {filters.search || filters.category
                  ? "Try adjusting your search or filters"
                  : "No blog posts have been published yet"}
              </p>
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
