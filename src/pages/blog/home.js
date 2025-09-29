import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BlogHome() {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    subscribers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      // Mock data for now - in real app, this would come from API
      const mockFeaturedPost = {
        id: "1",
        title: "The Art of Slow Living",
        slug: "the-art-of-slow-living",
        excerpt:
          "In our fast-paced world, finding moments of stillness and intentionality can transform our daily experience. Here's how to embrace a slower, more mindful approach to life.",
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Lifestyle",
        readTime: "5 min read",
        viewCount: 1250,
        comments: 23,
        createdAt: "2024-01-15T10:00:00Z",
      };

      const mockRecentPosts = [
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
        },
      ];

      const mockCategories = [
        { name: "Lifestyle", count: 15, color: "#FF6B6B" },
        { name: "Travel", count: 12, color: "#4ECDC4" },
        { name: "Personal Growth", count: 18, color: "#45B7D1" },
        { name: "Wellness", count: 10, color: "#96CEB4" },
        { name: "Technology", count: 8, color: "#FFEAA7" },
        { name: "Photography", count: 6, color: "#DDA0DD" },
      ];

      setFeaturedPost(mockFeaturedPost);
      setRecentPosts(mockRecentPosts);
      setCategories(mockCategories);
      setStats({
        totalPosts: 50,
        totalViews: 125000,
        subscribers: 2500,
      });
    } catch (error) {
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>My Blog - Thoughts, Stories & Insights</title>
        <meta
          name="description"
          content="A personal blog sharing thoughts, stories, and insights about life, travel, technology, and personal growth."
        />
        <meta
          property="og:title"
          content="My Blog - Thoughts, Stories & Insights"
        />
        <meta
          property="og:description"
          content="A personal blog sharing thoughts, stories, and insights about life, travel, technology, and personal growth."
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
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
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to My Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Thoughts, stories, and insights from my journey. Join me as I
              share experiences, lessons learned, and discoveries along the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Read Latest Posts
              </Link>
              <Link
                href="/blog/newsletter"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Featured Post
                </h2>
                <p className="text-xl text-gray-600">
                  Our most popular and engaging content
                </p>
              </div>

              <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={featuredPost.imageUrl}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {featuredPost.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {featuredPost.readTime}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(featuredPost.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {featuredPost.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{featuredPost.viewCount} views</span>
                        <span>{featuredPost.comments} comments</span>
                      </div>
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Recent Posts
              </h2>
              <p className="text-xl text-gray-600">
                Latest articles and insights
              </p>
            </div>

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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
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
            )}

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View All Posts
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Explore by Category
              </h2>
              <p className="text-xl text-gray-600">
                Find content that interests you
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/blog?category=${category.name
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow group"
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: category.color }}
                  >
                    📝
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} posts
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Blog Statistics</h2>
              <p className="text-xl opacity-90">Our community in numbers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">
                  {stats.totalPosts}+
                </div>
                <div className="text-lg opacity-90">Articles Published</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {stats.totalViews.toLocaleString()}+
                </div>
                <div className="text-lg opacity-90">Monthly Readers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {stats.subscribers.toLocaleString()}+
                </div>
                <div className="text-lg opacity-90">Newsletter Subscribers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get notified when we publish new posts. No spam, just quality
              content delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              Join {stats.subscribers.toLocaleString()}+ subscribers who get our
              latest posts
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
