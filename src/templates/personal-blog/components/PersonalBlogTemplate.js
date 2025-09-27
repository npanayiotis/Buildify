import React, { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lazy3DCanvas from "../../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedTorus,
  OptimizedOrbitControls,
} from "../../../components/Templates/Performance3DComponents";

const PersonalBlogTemplate = memo(() => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPost, setCurrentPost] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0 });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, [selectedCategory, selectedTag, searchQuery, pagination.page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: "6",
        published: "true",
      });

      if (selectedCategory && selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      if (selectedTag) {
        params.append("tag", selectedTag);
      }

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      const response = await fetch(
        `/api/templates/personal-blog/posts?${params}`
      );
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Set default posts if API fails
      setPosts([
        {
          id: "1",
          title: "Welcome to My Personal Blog",
          slug: "welcome-to-my-personal-blog",
          excerpt:
            "This is where I share my thoughts, experiences, and insights about life, technology, and everything in between.",
          content:
            "Welcome to my personal blog! I'm excited to share my journey with you through this digital space. Here, you'll find posts about my experiences, thoughts on technology, travel stories, and much more. I believe in the power of storytelling and the connections we can make through sharing our experiences.",
          imageUrl:
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800",
          category: "Personal",
          tags: ["welcome", "introduction", "blogging"],
          createdAt: new Date().toISOString(),
          author: { email: "blogger@example.com" },
          comments: [{ id: "1" }],
        },
        {
          id: "2",
          title: "My Journey in Web Development",
          slug: "my-journey-in-web-development",
          excerpt:
            "Sharing my experience learning web development and the challenges I faced along the way.",
          content:
            "Web development has been an incredible journey for me. Starting from basic HTML and CSS to mastering modern frameworks like React and Next.js, every step has been a learning experience. The most challenging part was understanding JavaScript's asynchronous nature, but once I got it, it opened up a whole new world of possibilities.",
          imageUrl:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
          category: "Technology",
          tags: ["web-development", "javascript", "learning"],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          author: { email: "blogger@example.com" },
          comments: [{ id: "2" }],
        },
        {
          id: "3",
          title: "Travel Tips for Digital Nomads",
          slug: "travel-tips-for-digital-nomads",
          excerpt:
            "Essential tips for working remotely while traveling the world.",
          content:
            "Working remotely while traveling is a dream come true for many, but it comes with its own set of challenges. From finding reliable WiFi to managing time zones, here are the essential tips that have helped me maintain productivity while exploring new places.",
          imageUrl:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800",
          category: "Travel",
          tags: ["travel", "digital-nomad", "remote-work"],
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          author: { email: "blogger@example.com" },
          comments: [{ id: "3" }],
        },
      ]);
      setPagination({ page: 1, total: 3, pages: 1 });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/templates/personal-blog/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([
        { name: "Personal", slug: "personal", count: 1 },
        { name: "Technology", slug: "technology", count: 1 },
        { name: "Travel", slug: "travel", count: 1 },
      ]);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch("/api/templates/personal-blog/tags");
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([
        { name: "welcome", slug: "welcome", count: 1 },
        { name: "web-development", slug: "web-development", count: 1 },
        { name: "travel", slug: "travel", count: 1 },
      ]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setPagination({ ...pagination, page: 1 });
  };

  const handleTagChange = (tag) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
    setPagination({ ...pagination, page: 1 });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination({ ...pagination, page: 1 });
  };

  const openPost = (post) => {
    setCurrentPost(post);
    setShowPostModal(true);
  };

  const closePostModal = () => {
    setShowPostModal(false);
    setCurrentPost(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-900">
      {/* Optimized 3D Background */}
      <Lazy3DCanvas camera={{ position: [0, 0, 5], fov: 75 }} className="z-0">
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <OptimizedSphere
          position={[-2, 1, -2]}
          color="#3B82F6"
          scale={1.2}
          args={[1, 32, 32]}
        />
        <OptimizedSphere
          position={[2, -1, -1]}
          color="#8B5CF6"
          scale={0.8}
          args={[1, 32, 32]}
        />
        <OptimizedBox
          position={[0, 0, -3]}
          color="#6366F1"
          scale={1}
          args={[0.4, 0.4, 0.4]}
        />
        <OptimizedBox
          position={[-1.5, -1, -2]}
          color="#A855F7"
          scale={0.6}
          args={[0.3, 0.3, 0.3]}
        />
        <OptimizedTorus
          position={[1.5, 1, -1]}
          color="#F59E0B"
          scale={0.8}
          args={[1, 0.3, 16, 100]}
        />

        <OptimizedOrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.2}
        />
      </Lazy3DCanvas>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📝</span>
          </div>
          <span className="text-xl font-bold">My Personal Blog</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className="hover:text-blue-600 transition-colors">
            Home
          </a>
          <a href="#posts" className="hover:text-blue-600 transition-colors">
            Posts
          </a>
          <a href="#about" className="hover:text-blue-600 transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex items-center justify-center min-h-screen px-6"
      >
        <div className="text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Welcome to My Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Sharing thoughts, experiences, and insights about life, technology,
            and everything in between.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById("posts").scrollIntoView()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Read Posts</span>
              <span>→</span>
            </button>
            <button className="border-2 border-blue-400 text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300">
              About Me
            </button>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="posts" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Latest Posts
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Explore my latest thoughts and experiences
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-12">
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-300"
                }`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-300"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Tag Filters */}
            {tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag.slug}
                    onClick={() => handleTagChange(tag.name)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTag === tag.name
                        ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-50 border border-gray-300"
                    }`}
                  >
                    #{tag.name} ({tag.count})
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Posts Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                    onClick={() => openPost(post)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          post.imageUrl || "https://via.placeholder.com/400x250"
                        }
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="text-sm text-blue-600">
                          {post.comments?.length || 0} comments
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
                        Read More
                      </button>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <button
                    onClick={() =>
                      setPagination({
                        ...pagination,
                        page: pagination.page - 1,
                      })
                    }
                    disabled={pagination.page === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    onClick={() =>
                      setPagination({
                        ...pagination,
                        page: pagination.page + 1,
                      })
                    }
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="relative z-10 py-20 px-6 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              I&apos;m a passionate writer and developer who loves sharing
              experiences and insights through blogging. My journey spans
              technology, travel, and personal growth.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Developer</h3>
                <p className="text-gray-600">
                  Passionate about web development and technology
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✈️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Traveler</h3>
                <p className="text-gray-600">
                  Exploring the world and sharing experiences
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Writer</h3>
                <p className="text-gray-600">
                  Sharing thoughts and stories through blogging
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Have questions or want to collaborate? I&apos;d love to hear from
              you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">📧</span>
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-gray-600">hello@myblog.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">🐦</span>
                    </div>
                    <div>
                      <p className="font-semibold">Twitter</p>
                      <p className="text-gray-600">@myblog</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white">💼</span>
                    </div>
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <p className="text-gray-600">linkedin.com/in/myblog</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  Send a Message
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/20 bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📝</span>
            </div>
            <span className="text-xl font-bold">My Personal Blog</span>
          </div>

          <p className="text-gray-600 mb-6">
            Sharing thoughts, experiences, and insights about life and
            technology.
          </p>

          <div className="flex justify-center space-x-8 text-gray-600 mb-6">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              RSS Feed
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            © 2024 My Personal Blog. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {showPostModal && currentPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {currentPost.title}
                </h3>
                <button
                  onClick={closePostModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={
                    currentPost.imageUrl ||
                    "https://via.placeholder.com/800x400"
                  }
                  alt={currentPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{formatDate(currentPost.createdAt)}</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {currentPost.category}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none mb-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {currentPost.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {currentPost.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold mb-4">
                  Comments ({currentPost.comments?.length || 0})
                </h4>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">
                      Comments feature will be available in the admin dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

PersonalBlogTemplate.displayName = "PersonalBlogTemplate";

export default PersonalBlogTemplate;
