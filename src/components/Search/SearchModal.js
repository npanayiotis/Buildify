import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.trim().length >= 2) {
        performSearch(query);
      } else {
        setResults(null);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/search?tenantId=default-tenant&q=${encodeURIComponent(
          searchQuery
        )}`
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

  const handleClose = () => {
    setQuery("");
    setResults(null);
    setSuggestions([]);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Search</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {/* Search Input */}
          <div className="p-6">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for posts, menu items, programs..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length < 2 ? (
              <div className="p-6 text-center text-gray-500">
                Type at least 2 characters to search
              </div>
            ) : loading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-500">Searching...</p>
              </div>
            ) : results && results.total > 0 ? (
              <div className="p-6 space-y-6">
                {/* Blog Results */}
                {results.blog.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Blog Posts ({results.blog.length})
                    </h3>
                    <div className="space-y-3">
                      {results.blog.map((post) => (
                        <Link
                          key={post.id}
                          href={post.url}
                          onClick={handleClose}
                          className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <h4 className="font-medium text-gray-900">
                            {post.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span>{post.category}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                            <span className="mx-2">•</span>
                            <span>
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Restaurant Results */}
                {results.restaurant.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Menu Items ({results.restaurant.length})
                    </h3>
                    <div className="space-y-3">
                      {results.restaurant.map((item) => (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={handleClose}
                          className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <span>{item.category}</span>
                                {item.isPopular && (
                                  <>
                                    <span className="mx-2">•</span>
                                    <span className="text-red-600">
                                      Popular
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-gray-900">
                                ${item.price}
                              </span>
                              {!item.isAvailable && (
                                <p className="text-xs text-red-600">
                                  Unavailable
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gym Results */}
                {results.gym.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                      Fitness Programs ({results.gym.length})
                    </h3>
                    <div className="space-y-3">
                      {results.gym.map((program) => (
                        <Link
                          key={program.id}
                          href={program.url}
                          onClick={handleClose}
                          className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {program.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {program.description}
                              </p>
                              <div className="flex items-center mt-2 text-xs text-gray-500">
                                <span>{program.duration}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-gray-900">
                                ${program.price}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : results && results.total === 0 ? (
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try different keywords or check your spelling
                </p>
              </div>
            ) : null}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Suggestions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(suggestion.text)}
                      className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {suggestion.text} ({suggestion.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Press ESC to close</span>
              {results && (
                <span>
                  {results.total} result{results.total !== 1 ? "s" : ""} found
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
