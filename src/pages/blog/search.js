import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BlogSearch() {
  const router = useRouter();
  const { q } = router.query;
  const [query, setQuery] = useState(q || "");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (q && q.trim().length >= 2) {
      performSearch(q);
    }
  }, [q]);

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/search?tenantId=default-tenant&q=${encodeURIComponent(
          searchQuery
        )}&type=blog`
      );
      const data = await response.json();

      if (response.ok) {
        setResults(data.results);
        setSuggestions(data.suggestions);
      } else {
        console.error("Search error:", data.error);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    router.push(`/blog/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <>
      <Head>
        <title>Search Blog - Find Articles</title>
        <meta
          name="description"
          content="Search through our blog posts to find articles on topics that interest you."
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
                <Link href="/blog/search" className="text-gray-900 font-medium">
                  Search
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Search Blog</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find articles on topics that interest you
            </p>
          </div>
        </section>

        {/* Search Form */}
        <section className="bg-white py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for articles..."
                  className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Search Results */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {loading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md p-6 animate-pulse"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-24 h-24 bg-gray-300 rounded"></div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : results && results.blog ? (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results for &quot;{query}&quot;
                </h2>
                <span className="text-gray-600">
                  {results.blog.length} result
                  {results.blog.length !== 1 ? "s" : ""} found
                </span>
              </div>

              {results.blog.length > 0 ? (
                <div className="space-y-8">
                  {results.blog.map((post) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start space-x-6">
                        {post.imageUrl && (
                          <div className="relative w-32 h-32 flex-shrink-0">
                            <Image
                              src={post.imageUrl}
                              alt={post.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {post.category}
                            </span>
                            <span className="text-sm text-gray-500">
                              {post.readTime}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                            <Link href={post.url}>{post.title}</Link>
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{post.viewCount} views</span>
                              <span>{post.comments?.length || 0} comments</span>
                            </div>
                            <Link
                              href={post.url}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Read More →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Try different keywords or check your spelling
                  </p>
                  <Link
                    href="/blog"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Browse All Posts
                  </Link>
                </div>
              )}
            </div>
          ) : !q ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Start Your Search
              </h3>
              <p className="text-gray-600 mb-8">
                Enter keywords to find articles that interest you
              </p>
            </div>
          ) : null}

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    {suggestion.text} ({suggestion.count})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Categories */}
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Browse by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "Lifestyle",
                "Travel",
                "Personal Growth",
                "Wellness",
                "Technology",
                "Photography",
              ].map((category) => (
                <Link
                  key={category}
                  href={`/blog?category=${category
                    .toLowerCase()
                    .replace(" ", "-")}`}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="text-2xl mb-2">📝</div>
                  <div className="text-sm font-medium text-gray-900">
                    {category}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
