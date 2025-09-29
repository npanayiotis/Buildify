import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NewBlogPost() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    category: "",
    tags: [],
    imageUrl: "",
    isPublished: false,
    isFeatured: false,
    seoTitle: "",
    seoDescription: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Lifestyle",
    "Travel",
    "Personal Growth",
    "Wellness",
    "Technology",
    "Photography",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title,
      slug,
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({
      ...prev,
      tags,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/blog/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenantId: "default-tenant",
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin/blog");
      } else {
        setError(data.error || "Failed to create post");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create New Post - Blog Admin</title>
        <meta
          name="description"
          content="Create a new blog post with our easy-to-use editor."
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/blog"
                  className="text-gray-500 hover:text-gray-900"
                >
                  ← Back to Blog
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create New Post
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="post-form"
                  disabled={saving}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Post"}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Form */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form id="post-form" onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Basic Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleTitleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter post title"
                  />
                </div>

                <div>
                  <label
                    htmlFor="slug"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="post-url-slug"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    URL: /blog/{formData.slug}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Excerpt
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Brief description of the post"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags.join(", ")}
                      onChange={handleTagsChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tag1, tag2, tag3"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Separate tags with commas
                    </p>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="imageUrl"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Content
              </h2>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Post Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write your post content here..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supports Markdown formatting
                </p>
              </div>
            </div>

            {/* SEO */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                SEO Settings
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="seoTitle"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    SEO Title
                  </label>
                  <input
                    type="text"
                    id="seoTitle"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="SEO optimized title"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty to use post title
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="seoDescription"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    SEO Description
                  </label>
                  <textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Meta description for search engines"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Leave empty to use post excerpt
                  </p>
                </div>
              </div>
            </div>

            {/* Publishing Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                Publishing Options
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isPublished"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Publish immediately
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isFeatured"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Featured post
                  </label>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
