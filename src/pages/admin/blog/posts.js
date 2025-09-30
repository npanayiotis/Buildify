import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";
import Link from "next/link";

export default function BlogPostsAdmin() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "The Future of Web Development",
      excerpt:
        "Exploring the latest trends and technologies shaping the future of web development...",
      category: "Technology",
      author: "John Doe",
      status: "published",
      views: 1250,
      comments: 23,
      publishedAt: "2024-01-15T10:00:00",
      createdAt: "2024-01-14T10:00:00",
      featured: true,
    },
    {
      id: "2",
      title: "Building Better User Experiences",
      excerpt:
        "How to create intuitive and engaging user experiences that keep visitors coming back...",
      category: "Design",
      author: "John Doe",
      status: "published",
      views: 980,
      comments: 15,
      publishedAt: "2024-01-10T10:00:00",
      createdAt: "2024-01-09T10:00:00",
      featured: false,
    },
    {
      id: "3",
      title: "Understanding React Hooks",
      excerpt:
        "A comprehensive guide to React Hooks and their practical applications...",
      category: "Technology",
      author: "John Doe",
      status: "draft",
      views: 0,
      comments: 0,
      publishedAt: null,
      createdAt: "2024-01-16T10:00:00",
      featured: false,
    },
  ]);

  const [filter, setFilter] = useState({ status: "all", category: "all" });
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return colors[status] || colors.draft;
  };

  const filteredPosts = posts.filter((post) => {
    if (filter.status !== "all" && post.status !== filter.status) return false;
    if (filter.category !== "all" && post.category !== filter.category)
      return false;
    return true;
  });

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
    views: posts.reduce((sum, p) => sum + p.views, 0),
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Blog Posts
            </h1>
            <p className="text-gray-600">
              Manage your blog content and articles
            </p>
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            + New Post
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-green-600">
              {stats.published}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.drafts}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">
              {stats.views.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filter.status}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filter.category}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Writing">Writing</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilter({ status: "all", category: "all" })}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>

            <div className="flex items-end">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                Export Posts
              </button>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-600"
                    >
                      No posts found
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          {post.featured && (
                            <span className="text-yellow-500 text-xl">⭐</span>
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-600 max-w-md truncate">
                              {post.excerpt}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              By {post.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                            post.status
                          )}`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="space-y-1">
                          <div className="text-gray-600">
                            👁️ {post.views} views
                          </div>
                          <div className="text-gray-600">
                            💬 {post.comments} comments
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString()
                          : "Not published"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
