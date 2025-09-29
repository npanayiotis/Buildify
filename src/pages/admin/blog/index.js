import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

export default function BlogAdmin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    totalComments: 0,
    subscribers: 0,
  });

  useEffect(() => {
    fetchPosts();
    fetchStats();
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
          status: "published",
          category: "Lifestyle",
          viewCount: 1250,
          commentCount: 23,
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-01-15T10:00:00Z",
        },
        {
          id: "2",
          title: "Lessons from a Year of Travel",
          slug: "lessons-from-a-year-of-travel",
          status: "published",
          category: "Travel",
          viewCount: 2100,
          commentCount: 45,
          createdAt: "2024-01-10T14:30:00Z",
          updatedAt: "2024-01-10T14:30:00Z",
        },
        {
          id: "3",
          title: "Building Better Habits",
          slug: "building-better-habits",
          status: "draft",
          category: "Personal Growth",
          viewCount: 0,
          commentCount: 0,
          createdAt: "2024-01-05T09:15:00Z",
          updatedAt: "2024-01-05T09:15:00Z",
        },
      ];

      setPosts(mockPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // Mock stats - in real app, this would come from API
      setStats({
        totalPosts: 25,
        publishedPosts: 20,
        draftPosts: 5,
        totalViews: 12500,
        totalComments: 156,
        subscribers: 1250,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleStatusChange = async (postId, newStatus) => {
    try {
      // In real app, this would make API call
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, status: newStatus } : post
        )
      );
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  const handleDelete = async (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        // In real app, this would make API call
        setPosts((prev) => prev.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Blog Management - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage your blog posts, comments, and content from the admin dashboard."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin"
                  className="text-gray-500 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                  Blog Management
                </h1>
              </div>
              <Link
                href="/admin/blog/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                New Post
              </Link>
            </div>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Posts
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalPosts}
                  </p>
                </div>
                <div className="text-4xl text-blue-500">📝</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.publishedPosts}
                  </p>
                </div>
                <div className="text-4xl text-green-500">✅</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Drafts</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.draftPosts}
                  </p>
                </div>
                <div className="text-4xl text-yellow-500">📄</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="text-4xl text-purple-500">👁️</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Comments</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalComments}
                  </p>
                </div>
                <div className="text-4xl text-indigo-500">💬</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Subscribers
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.subscribers.toLocaleString()}
                  </p>
                </div>
                <div className="text-4xl text-pink-500">📧</div>
              </div>
            </div>
          </div>

          {/* Posts Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">All Posts</h2>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">All Categories</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="travel">Travel</option>
                    <option value="personal-growth">Personal Growth</option>
                  </select>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="p-6">
                <div className="animate-pulse space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/6"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/8"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/8"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Post
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Views
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comments
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              /{post.slug}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              post.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.viewCount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {post.commentCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Link
                              href={`/admin/blog/${post.id}/edit`}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </Link>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="text-green-600 hover:text-green-900"
                              target="_blank"
                            >
                              View
                            </Link>
                            <button
                              onClick={() =>
                                handleStatusChange(
                                  post.id,
                                  post.status === "published"
                                    ? "draft"
                                    : "published"
                                )
                              }
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              {post.status === "published"
                                ? "Unpublish"
                                : "Publish"}
                            </button>
                            <button
                              onClick={() => handleDelete(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/blog/new"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="text-3xl text-blue-500 mr-4">✍️</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Create New Post
                  </h3>
                  <p className="text-sm text-gray-600">
                    Write and publish a new blog post
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/blog/comments"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="text-3xl text-green-500 mr-4">💬</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Manage Comments
                  </h3>
                  <p className="text-sm text-gray-600">
                    Review and moderate comments
                  </p>
                </div>
              </div>
            </Link>

            <Link
              href="/admin/blog/newsletter"
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="text-3xl text-purple-500 mr-4">📧</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Newsletter
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manage subscribers and campaigns
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
