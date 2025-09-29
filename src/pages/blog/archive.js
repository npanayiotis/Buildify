import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BlogArchive() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

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
            "In our fast-paced world, finding moments of stillness and intentionality can transform our daily experience.",
          imageUrl:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Lifestyle",
          readTime: "5 min read",
          createdAt: "2024-01-15T10:00:00Z",
          viewCount: 1250,
          comments: 23,
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
          createdAt: "2024-01-10T14:30:00Z",
          viewCount: 2100,
          comments: 45,
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
          createdAt: "2024-01-05T09:15:00Z",
          viewCount: 1800,
          comments: 32,
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
          createdAt: "2024-01-01T16:45:00Z",
          viewCount: 3200,
          comments: 67,
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
          createdAt: "2023-12-28T11:20:00Z",
          viewCount: 1950,
          comments: 28,
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
          createdAt: "2023-12-20T13:10:00Z",
          viewCount: 1650,
          comments: 19,
        },
      ];

      setPosts(mockPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group posts by year and month
  const groupedPosts = posts.reduce((acc, post) => {
    const date = new Date(post.createdAt);
    const year = date.getFullYear();
    const month = date.toLocaleDateString("en-US", { month: "long" });

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(post);
    return acc;
  }, {});

  const years = Object.keys(groupedPosts).sort((a, b) => b - a);

  return (
    <>
      <Head>
        <title>Blog Archive - All Posts</title>
        <meta
          name="description"
          content="Browse all our blog posts organized by date. Find articles from any time period."
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
                  className="text-gray-500 hover:text-gray-900"
                >
                  Categories
                </Link>
                <Link
                  href="/blog/archive"
                  className="text-gray-900 font-medium"
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
              Blog Archive
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Browse all our posts organized by date
            </p>
          </div>
        </section>

        {/* Archive Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="h-8 bg-gray-300 rounded w-48 mb-6"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-300 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-300 rounded mb-2"></div>
                          <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {years.map((year) => (
                <div key={year} className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                    {year}
                  </h2>

                  <div className="space-y-8">
                    {Object.entries(groupedPosts[year])
                      .sort(
                        ([a], [b]) =>
                          new Date(`${a} 1, ${year}`) -
                          new Date(`${b} 1, ${year}`)
                      )
                      .reverse()
                      .map(([month, monthPosts]) => (
                        <div key={month}>
                          <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            {month} ({monthPosts.length} post
                            {monthPosts.length !== 1 ? "s" : ""})
                          </h3>

                          <div className="space-y-4">
                            {monthPosts.map((post) => (
                              <article
                                key={post.id}
                                className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                              >
                                <div className="relative w-20 h-20 flex-shrink-0">
                                  <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                                      {post.category}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {post.readTime}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(
                                        post.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <h4 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                      {post.title}
                                    </Link>
                                  </h4>
                                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {post.excerpt}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                      <span>{post.viewCount} views</span>
                                      <span>{post.comments} comments</span>
                                    </div>
                                    <Link
                                      href={`/blog/${post.slug}`}
                                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                    >
                                      Read More →
                                    </Link>
                                  </div>
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Blog Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {posts.length}
                </div>
                <div className="text-gray-600">Total Posts</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {posts
                    .reduce((sum, post) => sum + post.viewCount, 0)
                    .toLocaleString()}
                </div>
                <div className="text-gray-600">Total Views</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {posts.reduce((sum, post) => sum + post.comments, 0)}
                </div>
                <div className="text-gray-600">Total Comments</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {years.length}
                </div>
                <div className="text-gray-600">Years Active</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
