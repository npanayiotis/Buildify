import React, { useRef, useState, useEffect, useCallback } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage";
import "grapesjs-blocks-basic";
import "grapesjs-plugin-forms";
import "grapesjs-component-countdown";
import "grapesjs-plugin-export";
import CustomizationPanel from "./CustomizationPanel";

const GrapesJSEditor = ({
  templateData,
  onSave,
  onPublish,
  onTemplateChange,
}) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(templateData);
  const [loadError, setLoadError] = useState(null);
  const [refReady, setRefReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [contentModified, setContentModified] = useState(false);
  const [modifiedPage, setModifiedPage] = useState(null);
  const isApplyingChanges = useRef(false);
  const lastContainerUpdate = useRef(0);
  const [pageNavigated, setPageNavigated] = useState(false);
  const contentInitialized = useRef(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [pageContent, setPageContent] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);

  // Check if ref is ready
  useEffect(() => {
    if (editorRef.current) {
      console.log("✅ Editor ref is ready!");
      setRefReady(true);
    }
  }, []);

  // Generate template-based content for different pages
  const generatePageTemplateContent = useCallback((pagePath, website) => {
    const { fullWebsite } = website;

    if (pagePath === "blog") {
      return `
        <div class="min-h-screen bg-gray-50">
          <!-- Navigation -->
          <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center py-4">
                <button data-nav="home" class="text-2xl font-bold text-gray-900">My Blog</button>
                <div class="hidden md:flex space-x-8">
                  <button data-nav="home" class="text-gray-500 hover:text-gray-900">Home</button>
                  <button data-nav="about" class="text-gray-500 hover:text-gray-900">About</button>
                  <button data-nav="blog" class="text-gray-900 font-medium">Blog</button>
                  <button data-nav="categories" class="text-gray-500 hover:text-gray-900">Categories</button>
                  <button data-nav="archive" class="text-gray-500 hover:text-gray-900">Archive</button>
                  <button data-nav="contact" class="text-gray-500 hover:text-gray-900">Contact</button>
                </div>
              </div>
            </div>
          </nav>

          <!-- Blog Header -->
          <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 class="text-4xl md:text-6xl font-bold mb-6">Latest Posts</h1>
              <p class="text-xl md:text-2xl mb-8 opacity-90">Discover insights, stories, and ideas that inspire</p>
            </div>
          </section>

          <!-- Search and Filters -->
          <section class="py-12 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <div class="flex flex-col md:flex-row gap-4 mb-8">
                <div class="flex-1">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div class="flex gap-2 flex-wrap">
                  <button class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-blue-600 text-white">All</button>
                  <button class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">Lifestyle</button>
                  <button class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">Travel</button>
                  <button class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">Technology</button>
                  <button class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">Personal Growth</button>
                  <button class="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200">Wellness</button>
                </div>
              </div>

              <!-- Blog Posts Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${
                  (fullWebsite?.posts &&
                    fullWebsite.posts
                      .map(
                        (post, index) => `
                  <article class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div class="h-48 bg-gradient-to-br from-blue-400 to-purple-500"></div>
                    <div class="p-6">
                      <div class="flex items-center mb-3">
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">${post.category}</span>
                        <span class="ml-4 text-gray-500 text-sm">${post.readTime}</span>
                      </div>
                      <h3 class="text-xl font-bold text-gray-900 mb-3">${post.title}</h3>
                      <p class="text-gray-600 mb-4 leading-relaxed">${post.excerpt}</p>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-500 text-sm">${post.date}</span>
                        <button class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">Read More →</button>
                      </div>
                    </div>
                  </article>
                `
                      )
                      .join("")) ||
                  ""
                }
              </div>
            </div>
          </section>
        </div>
      `;
    }

    if (pagePath === "about") {
      return `
        <div class="min-h-screen bg-gray-50">
          <!-- Navigation -->
          <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center py-4">
                <button data-nav="home" class="text-2xl font-bold text-gray-900">My Blog</button>
                <div class="hidden md:flex space-x-8">
                  <button data-nav="home" class="text-gray-500 hover:text-gray-900">Home</button>
                  <button data-nav="about" class="text-gray-900 font-medium">About</button>
                  <button data-nav="blog" class="text-gray-500 hover:text-gray-900">Blog</button>
                  <button data-nav="categories" class="text-gray-500 hover:text-gray-900">Categories</button>
                  <button data-nav="archive" class="text-gray-500 hover:text-gray-900">Archive</button>
                  <button data-nav="contact" class="text-gray-500 hover:text-gray-900">Contact</button>
                </div>
              </div>
            </div>
          </nav>

          <!-- About Header -->
          <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 class="text-4xl md:text-6xl font-bold mb-6">About Me</h1>
              <p class="text-xl md:text-2xl mb-8 opacity-90">Get to know the person behind the blog</p>
            </div>
          </section>

          <!-- About Content -->
          <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <!-- Main About Section -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                <div>
                  <div class="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span class="text-6xl text-white">👋</span>
                  </div>
                  <h2 class="text-4xl font-bold text-gray-900 mb-6 text-center lg:text-left">${
                    fullWebsite?.about?.title || "About Me"
                  }</h2>
                  <p class="text-xl text-gray-600 leading-relaxed mb-8">${
                    fullWebsite?.about?.content ||
                    "I'm a passionate writer, traveler, and lifelong learner. Through this blog, I share my experiences, insights, and the lessons I've learned along my journey."
                  }</p>
                  
                  <!-- Experience & Stats -->
                  <div class="grid grid-cols-2 gap-6 mb-8">
                    <div class="bg-blue-50 p-6 rounded-xl text-center">
                      <div class="text-3xl font-bold text-blue-600 mb-2">${
                        fullWebsite?.about?.experience || "5+ Years"
                      }</div>
                      <div class="text-gray-600">Writing Experience</div>
                    </div>
                    <div class="bg-purple-50 p-6 rounded-xl text-center">
                      <div class="text-3xl font-bold text-purple-600 mb-2">50+</div>
                      <div class="text-gray-600">Articles Published</div>
                    </div>
                  </div>
                </div>

                <div class="space-y-8">
                  <!-- Interests -->
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">My Interests</h3>
                    <div class="grid grid-cols-2 gap-4">
                      ${
                        (fullWebsite?.about?.interests &&
                          fullWebsite.about.interests
                            .map(
                              (interest, index) => `
                        <div class="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div class="text-2xl mr-3">${
                            ["✈️", "📸", "🍳", "📚", "💻"][index] || "⭐"
                          }</div>
                          <span class="font-medium text-gray-900">${interest}</span>
                        </div>
                      `
                            )
                            .join("")) ||
                        ""
                      }
                    </div>
                  </div>

                  <!-- Social Links -->
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Connect With Me</h3>
                    <div class="flex space-x-4">
                      ${
                        fullWebsite?.about?.socialLinks?.twitter
                          ? `<a href="${fullWebsite.about.socialLinks.twitter}" class="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">Twitter</a>`
                          : ""
                      }
                      ${
                        fullWebsite?.about?.socialLinks?.instagram
                          ? `<a href="${fullWebsite.about.socialLinks.instagram}" class="p-3 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors">Instagram</a>`
                          : ""
                      }
                      ${
                        fullWebsite?.about?.socialLinks?.linkedin
                          ? `<a href="${fullWebsite.about.socialLinks.linkedin}" class="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">LinkedIn</a>`
                          : ""
                      }
                    </div>
                  </div>
                </div>
              </div>

              <!-- Journey Timeline -->
              <div class="mb-20">
                <h3 class="text-3xl font-bold text-gray-900 mb-12 text-center">My Journey</h3>
                <div class="relative">
                  <div class="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                  
                  <div class="space-y-12">
                    <div class="flex items-center">
                      <div class="w-1/2 pr-8 text-right">
                        <div class="bg-white p-6 rounded-xl shadow-lg">
                          <h4 class="text-xl font-bold text-gray-900 mb-2">Started Blogging</h4>
                          <p class="text-gray-600">Began sharing my thoughts and experiences online</p>
                          <span class="text-sm text-blue-600 font-medium">2021</span>
                        </div>
                      </div>
                      <div class="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                      <div class="w-1/2 pl-8"></div>
                    </div>
                    
                    <div class="flex items-center">
                      <div class="w-1/2 pr-8"></div>
                      <div class="w-8 h-8 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                      <div class="w-1/2 pl-8">
                        <div class="bg-white p-6 rounded-xl shadow-lg">
                          <h4 class="text-xl font-bold text-gray-900 mb-2">First 1000 Readers</h4>
                          <p class="text-gray-600">Reached my first milestone of engaged readers</p>
                          <span class="text-sm text-purple-600 font-medium">2022</span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-center">
                      <div class="w-1/2 pr-8 text-right">
                        <div class="bg-white p-6 rounded-xl shadow-lg">
                          <h4 class="text-xl font-bold text-gray-900 mb-2">Published First Book</h4>
                          <p class="text-gray-600">Compiled my best articles into a comprehensive guide</p>
                          <span class="text-sm text-green-600 font-medium">2023</span>
                        </div>
                      </div>
                      <div class="w-8 h-8 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                      <div class="w-1/2 pl-8"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Values & Mission -->
              <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-2xl">
                <h3 class="text-3xl font-bold text-gray-900 mb-8 text-center">My Mission</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div class="text-center">
                    <div class="text-4xl mb-4">💡</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">Inspire</h4>
                    <p class="text-gray-600">Share insights that spark creativity and personal growth</p>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl mb-4">🤝</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">Connect</h4>
                    <p class="text-gray-600">Build a community of like-minded individuals</p>
                  </div>
                  <div class="text-center">
                    <div class="text-4xl mb-4">🌱</div>
                    <h4 class="text-xl font-bold text-gray-900 mb-3">Grow</h4>
                    <p class="text-gray-600">Learn and evolve together through shared experiences</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      `;
    }

    if (pagePath === "categories") {
      return `
        <div class="min-h-screen bg-gray-50">
          <!-- Navigation -->
          <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center py-4">
                <button data-nav="home" class="text-2xl font-bold text-gray-900">My Blog</button>
                <div class="hidden md:flex space-x-8">
                  <button data-nav="home" class="text-gray-500 hover:text-gray-900">Home</button>
                  <button data-nav="about" class="text-gray-500 hover:text-gray-900">About</button>
                  <button data-nav="blog" class="text-gray-500 hover:text-gray-900">Blog</button>
                  <button data-nav="categories" class="text-gray-900 font-medium">Categories</button>
                  <button data-nav="archive" class="text-gray-500 hover:text-gray-900">Archive</button>
                  <button data-nav="contact" class="text-gray-500 hover:text-gray-900">Contact</button>
                </div>
              </div>
            </div>
          </nav>

          <!-- Categories Header -->
          <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 class="text-4xl md:text-6xl font-bold mb-6">Categories</h1>
              <p class="text-xl md:text-2xl mb-8 opacity-90">Explore content by topic</p>
            </div>
          </section>

          <!-- Categories Grid -->
          <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                ${
                  (fullWebsite?.categories &&
                    fullWebsite.categories
                      .map(
                        (category, index) => `
                  <div class="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
                    <div class="text-3xl mb-3">${
                      ["📝", "✈️", "🧘", "💻", "📸", "🎨"][index] || "📝"
                    }</div>
                    <h3 class="font-semibold text-gray-900 mb-2">${category}</h3>
                    <p class="text-sm text-gray-500">${
                      Math.floor(Math.random() * 20) + 5
                    } posts</p>
                  </div>
                `
                      )
                      .join("")) ||
                  ""
                }
              </div>
            </div>
          </section>
        </div>
      `;
    }

    if (pagePath === "archive") {
      return `
        <div class="min-h-screen bg-gray-50">
          <!-- Navigation -->
          <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center py-4">
                <button data-nav="home" class="text-2xl font-bold text-gray-900">My Blog</button>
                <div class="hidden md:flex space-x-8">
                  <button data-nav="home" class="text-gray-500 hover:text-gray-900">Home</button>
                  <button data-nav="about" class="text-gray-500 hover:text-gray-900">About</button>
                  <button data-nav="blog" class="text-gray-500 hover:text-gray-900">Blog</button>
                  <button data-nav="categories" class="text-gray-500 hover:text-gray-900">Categories</button>
                  <button data-nav="archive" class="text-gray-900 font-medium">Archive</button>
                  <button data-nav="contact" class="text-gray-500 hover:text-gray-900">Contact</button>
                </div>
              </div>
            </div>
          </nav>

          <!-- Archive Header -->
          <section class="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 class="text-4xl md:text-6xl font-bold mb-6">Blog Archive</h1>
              <p class="text-xl md:text-2xl mb-8 opacity-90">Browse all posts organized by date and category</p>
            </div>
          </section>

          <!-- Archive Content -->
          <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <!-- Year Navigation -->
              <div class="mb-12">
                <h2 class="text-3xl font-bold text-gray-900 mb-8">Browse by Year</h2>
                <div class="flex flex-wrap gap-4">
                  <button class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">2024</button>
                  <button class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">2023</button>
                  <button class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">2022</button>
                  <button class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">2021</button>
                </div>
              </div>

              <!-- Monthly Archive -->
              <div class="mb-12">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">2024 Archive</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">December 2024</h4>
                    <p class="text-gray-600 mb-3">3 posts</p>
                    <div class="space-y-2">
                      <div class="text-sm text-gray-700">• The Art of Slow Living</div>
                      <div class="text-sm text-gray-700">• Digital Minimalism</div>
                      <div class="text-sm text-gray-700">• Creative Photography Tips</div>
                    </div>
                  </div>
                  <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">November 2024</h4>
                    <p class="text-gray-600 mb-3">5 posts</p>
                    <div class="space-y-2">
                      <div class="text-sm text-gray-700">• Mindful Morning Routines</div>
                      <div class="text-sm text-gray-700">• Sustainable Living Tips</div>
                      <div class="text-sm text-gray-700">• Remote Work Productivity</div>
                    </div>
                  </div>
                  <div class="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">October 2024</h4>
                    <p class="text-gray-600 mb-3">4 posts</p>
                    <div class="space-y-2">
                      <div class="text-sm text-gray-700">• Autumn Wellness Guide</div>
                      <div class="text-sm text-gray-700">• Home Organization</div>
                      <div class="text-sm text-gray-700">• Creative Writing Tips</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Category Archive -->
              <div class="mb-12">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  ${
                    (fullWebsite?.featuredCategories &&
                      fullWebsite.featuredCategories
                        .map(
                          (category, index) => `
                    <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                      <div class="flex items-center mb-4">
                        <div class="text-2xl mr-3">${category.icon}</div>
                        <div>
                          <h4 class="text-lg font-semibold text-gray-900">${category.name}</h4>
                          <p class="text-sm text-gray-600">${category.postCount} posts</p>
                        </div>
                      </div>
                      <p class="text-gray-600 text-sm mb-4">${category.description}</p>
                      <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">View all posts →</button>
                    </div>
                    `
                        )
                        .join("")) ||
                    ""
                  }
                </div>
              </div>

              <!-- Popular Posts -->
              <div class="mb-12">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Most Popular Posts</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  ${
                    (fullWebsite?.posts &&
                      fullWebsite.posts
                        .slice(0, 6)
                        .map(
                          (post, index) => `
                    <div class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div class="flex items-center mb-3">
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          ${post.category}
                        </span>
                        <span class="ml-3 text-gray-500 text-sm">${post.readTime}</span>
                      </div>
                      <h4 class="text-lg font-semibold text-gray-900 mb-2">${post.title}</h4>
                      <p class="text-gray-600 text-sm mb-3">${post.excerpt}</p>
                      <div class="flex items-center justify-between">
                        <span class="text-gray-500 text-sm">${post.date}</span>
                        <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">Read more →</button>
                      </div>
                    </div>
                    `
                        )
                        .join("")) ||
                    ""
                  }
                </div>
              </div>

              <!-- Archive Stats -->
              <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
                <h3 class="text-2xl font-bold mb-6">Archive Statistics</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div class="text-center">
                    <div class="text-3xl font-bold mb-2">50+</div>
                    <div class="text-blue-200">Total Posts</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold mb-2">6</div>
                    <div class="text-blue-200">Categories</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold mb-2">3</div>
                    <div class="text-blue-200">Years Active</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold mb-2">25K+</div>
                    <div class="text-blue-200">Monthly Readers</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      `;
    }

    if (pagePath === "contact") {
      return `
        <div class="min-h-screen bg-gray-50">
          <!-- Navigation -->
          <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center py-4">
                <button data-nav="home" class="text-2xl font-bold text-gray-900">My Blog</button>
                <div class="hidden md:flex space-x-8">
                  <button data-nav="home" class="text-gray-500 hover:text-gray-900">Home</button>
                  <button data-nav="about" class="text-gray-500 hover:text-gray-900">About</button>
                  <button data-nav="blog" class="text-gray-500 hover:text-gray-900">Blog</button>
                  <button data-nav="categories" class="text-gray-500 hover:text-gray-900">Categories</button>
                  <button data-nav="archive" class="text-gray-500 hover:text-gray-900">Archive</button>
                  <button data-nav="contact" class="text-gray-900 font-medium">Contact</button>
                </div>
              </div>
            </div>
          </nav>

          <!-- Contact Header -->
          <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 class="text-4xl md:text-6xl font-bold mb-6">Get In Touch</h1>
              <p class="text-xl md:text-2xl mb-8 opacity-90">I'd love to hear from you</p>
            </div>
          </section>

          <!-- Contact Content -->
          <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <!-- Contact Form -->
                <div class="bg-white rounded-2xl shadow-lg p-8">
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                  <form class="space-y-6">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your name" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="your@email.com" />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Your message"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">Send Message</button>
                  </form>
                </div>

                <!-- Contact Info -->
                <div class="space-y-8">
                  <div class="bg-gray-50 rounded-2xl p-8">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                    <div class="space-y-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span class="text-blue-600">📧</span>
                        </div>
                        <span class="text-gray-600">hello@myblog.com</span>
                      </div>
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span class="text-blue-600">📱</span>
                        </div>
                        <span class="text-gray-600">+1 (555) 123-4567</span>
                      </div>
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span class="text-blue-600">📍</span>
                        </div>
                        <span class="text-gray-600">New York, NY</span>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-50 rounded-2xl p-8">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Follow Me</h3>
                    <div class="flex space-x-4">
                      <button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Twitter</button>
                      <button class="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors">Instagram</button>
                      <button class="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors">LinkedIn</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      `;
    }

    // Default fallback
    return `
      <div class="min-h-screen bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p class="text-gray-600 mb-8">This page is under construction</p>
          <button data-nav="home" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Go Home</button>
        </div>
      </div>
    `;
  }, []);

  // Function to generate template-based content for different pages
  const fetchPageContent = useCallback(
    async (pagePath) => {
      if (!currentTemplate) return;

      setLoadingPage(true);
      try {
        console.log(`🔄 Generating template content for: ${pagePath}`);

        if (pagePath === "home") {
          // Use the default home page content
          setPageContent(null);
          setCurrentPage("home");
          console.log(`✅ Using home page content`);
        } else {
          // Generate template-based content for other pages
          const pageContent = generatePageTemplateContent(
            pagePath,
            currentTemplate
          );
          setPageContent(pageContent);
          setCurrentPage(pagePath);
          console.log(`✅ Template content generated for: ${pagePath}`);
        }

        // Mark that we've navigated to a new page
        setPageNavigated(true);

        // Debug log for page navigation
        console.log("🔄 Page navigation:", {
          from: currentPage,
          to: pagePath,
          contentModified,
          modifiedPage,
        });
      } catch (error) {
        console.error(`❌ Error generating page content:`, error);
        setPageContent(null);
        setCurrentPage("home");
      } finally {
        setLoadingPage(false);
      }
    },
    [
      currentTemplate,
      generatePageTemplateContent,
      contentModified,
      currentPage,
      modifiedPage,
    ]
  );

  // Handle page content changes
  useEffect(() => {
    if (pageContent !== null) {
      console.log("🔄 Page content changed, updating display");
      // Force content update when pageContent changes
      contentInitialized.current = false;
      // Only reset content modification flag if we're navigating to a different page
      // than the one that was modified
      if (modifiedPage && modifiedPage !== currentPage) {
        console.log(
          "🔄 Resetting content modification flag - navigating to different page"
        );
        setContentModified(false);
        setModifiedPage(null);
      }
    }
  }, [pageContent, modifiedPage, currentPage]);

  // Generate website HTML
  const generateWebsiteHTML = useCallback((website) => {
    console.log("🎨 Generating HTML for:", website.name);

    const { fullWebsite } = website;

    // Use the same structure as WebsitePreview for blog websites
    if (website.category === "blog") {
      return `
        <div class="min-h-screen bg-gray-50">
          <!-- Navigation -->
          <nav class="bg-white shadow-sm sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex justify-between items-center py-4">
                <button data-nav="home" class="text-2xl font-bold text-gray-900">My Blog</button>
                <div class="hidden md:flex space-x-8">
                  <button data-nav="home" class="text-gray-900 font-medium">Home</button>
                  <button data-nav="about" class="text-gray-500 hover:text-gray-900">About</button>
                  <button data-nav="blog" class="text-gray-500 hover:text-gray-900">Blog</button>
                  <button data-nav="categories" class="text-gray-500 hover:text-gray-900">Categories</button>
                  <button data-nav="archive" class="text-gray-500 hover:text-gray-900">Archive</button>
                  <button data-nav="contact" class="text-gray-500 hover:text-gray-900">Contact</button>
                </div>
              </div>
            </div>
          </nav>

          <!-- Hero Section -->
          <section class="relative min-h-screen flex items-center justify-center text-white" style="background: linear-gradient(${
            fullWebsite?.hero?.overlay || "rgba(0, 0, 0, 0.4)"
          }, ${fullWebsite?.hero?.overlay || "rgba(0, 0, 0, 0.4)"}), url('${
        fullWebsite?.hero?.backgroundImage || "/blog_hero.jpg"
      }'); background-size: cover; background-position: center;">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 class="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                ${fullWebsite?.hero?.title || "Welcome to My Blog"}
              </h1>
              <p class="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed">
                ${
                  fullWebsite?.hero?.subtitle ||
                  "Thoughts, stories, and insights from my journey"
                }
              </p>
              <div class="flex gap-6 justify-center flex-wrap">
                <button class="bg-red-500 hover:bg-red-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  ${fullWebsite?.hero?.buttonText || "Read Latest Posts"}
                </button>
                <button class="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                  ${fullWebsite?.hero?.buttonSecondary || "Subscribe"}
                </button>
              </div>
            </div>
          </section>

          <!-- Featured Post Section -->
          <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                  Featured Post
                </h2>
                <p class="text-xl text-gray-600">
                  Our most popular and engaging content
                </p>
              </div>

              ${
                fullWebsite?.posts && fullWebsite.posts.length > 0
                  ? `
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                  <div class="md:flex">
                    <div class="md:w-1/2">
                      <img
                        src="${fullWebsite.posts[0].image}"
                        alt="${fullWebsite.posts[0].title}"
                        class="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div class="md:w-1/2 p-8">
                      <div class="flex items-center mb-4">
                        <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          ${fullWebsite.posts[0].category}
                        </span>
                        <span class="ml-4 text-gray-500 text-sm">
                          ${fullWebsite.posts[0].readTime}
                        </span>
                        <span class="ml-4 text-gray-500 text-sm">
                          ${fullWebsite.posts[0].date}
                        </span>
                      </div>
                      <h3 class="text-2xl font-bold text-gray-900 mb-4">
                        ${fullWebsite.posts[0].title}
                      </h3>
                      <p class="text-gray-600 mb-6 leading-relaxed">
                        ${fullWebsite.posts[0].excerpt}
                      </p>
                      <button class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                </div>
              `
                  : ""
              }
            </div>
          </section>

          <!-- Recent Posts Section -->
          <section class="py-20 bg-gray-50">
            <div class="max-w-6xl mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                  Latest Posts
                </h2>
                <p class="text-xl text-gray-600">
                  Stay updated with our latest content
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${
                  (fullWebsite?.posts &&
                    fullWebsite.posts
                      .slice(1, 4)
                      .map(
                        (post, index) => `
                  <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <img
                      src="${post.image}"
                      alt="${post.title}"
                      class="w-full h-48 object-cover"
                    />
                    <div class="p-6">
                      <div class="flex items-center mb-3">
                        <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          ${post.category}
                        </span>
                        <span class="ml-4 text-gray-500 text-sm">
                          ${post.readTime}
                        </span>
                      </div>
                      <h3 class="text-xl font-bold text-gray-900 mb-3">
                        ${post.title}
                      </h3>
                      <p class="text-gray-600 mb-4 leading-relaxed">
                        ${post.excerpt}
                      </p>
                      <button class="text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                        Read More →
                      </button>
                    </div>
                  </div>
                `
                      )
                      .join("")) ||
                  ""
                }
              </div>
            </div>
          </section>

          <!-- Categories Section -->
          <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">
                  Explore by Category
                </h2>
                <p class="text-xl text-gray-600">
                  Find content that interests you
                </p>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                ${
                  (fullWebsite?.categories &&
                    fullWebsite.categories
                      .map(
                        (category, index) => `
                  <div class="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100 transition-colors cursor-pointer">
                    <div class="text-3xl mb-3">📝</div>
                    <h3 class="font-semibold text-gray-900 mb-2">
                      ${category}
                    </h3>
                    <p class="text-sm text-gray-500">
                      ${Math.floor(Math.random() * 20) + 5} posts
                    </p>
                  </div>
                `
                      )
                      .join("")) ||
                  ""
                }
              </div>
            </div>
          </section>

          <!-- Stats Section -->
          <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div class="max-w-6xl mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-bold mb-4">Blog Statistics</h2>
                <p class="text-xl opacity-90">Our journey in numbers</p>
              </div>

              <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                ${
                  (fullWebsite?.stats &&
                    fullWebsite.stats
                      .map(
                        (stat, index) => `
                  <div class="text-center">
                    <div class="text-4xl font-bold mb-2">${stat.number}</div>
                    <div class="text-lg opacity-90">${stat.label}</div>
                  </div>
                `
                      )
                      .join("")) ||
                  ""
                }
              </div>
            </div>
          </section>

          <!-- Newsletter Section -->
          <section class="py-20 bg-gray-50">
            <div class="max-w-4xl mx-auto px-4 text-center">
              <h2 class="text-4xl font-bold text-gray-900 mb-4">
                ${fullWebsite?.newsletter?.title || "Stay Updated"}
              </h2>
              <p class="text-xl text-gray-600 mb-8">
                ${
                  fullWebsite?.newsletter?.description ||
                  "Get notified when I publish new posts. No spam, just quality content delivered to your inbox."
                }
              </p>
              <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="${
                    fullWebsite?.newsletter?.placeholder ||
                    "Enter your email address"
                  }"
                  class="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button class="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-4">
                Join ${
                  fullWebsite?.newsletter?.subscribers || "2,500+"
                } subscribers
                who get our latest posts
              </p>
            </div>
          </section>

          <!-- Testimonials Section -->
          <section class="py-20 bg-white">
            <div class="max-w-6xl mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">What Readers Say</h2>
                <p class="text-xl text-gray-600">Hear from our amazing community</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${
                  (fullWebsite?.testimonials &&
                    fullWebsite.testimonials
                      .map(
                        (testimonial, index) => `
                <div class="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div class="flex items-center mb-4">
                    <img
                      src="${testimonial.avatar}"
                      alt="${testimonial.name}"
                      class="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 class="font-semibold text-gray-900">${
                        testimonial.name
                      }</h4>
                      <p class="text-sm text-gray-600">${testimonial.role}</p>
                    </div>
                  </div>
                  <p class="text-gray-700 italic mb-4">"${
                    testimonial.content
                  }"</p>
                  <div class="flex text-yellow-400">
                    ${"★".repeat(testimonial.rating)}
                  </div>
                </div>
                `
                      )
                      .join("")) ||
                  ""
                }
              </div>
            </div>
          </section>

          <!-- Featured Categories Section -->
          <section class="py-20 bg-gray-50">
            <div class="max-w-6xl mx-auto px-4">
              <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
                <p class="text-xl text-gray-600">Discover content by topic</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${
                  (fullWebsite?.featuredCategories &&
                    fullWebsite.featuredCategories
                      .map(
                        (category, index) => `
                <div class="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div class="text-4xl mb-4">${category.icon}</div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">${category.name}</h3>
                  <p class="text-gray-600 mb-4">${category.description}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">${category.postCount} posts</span>
                    <div class="w-3 h-3 rounded-full ${category.color}"></div>
                  </div>
                </div>
                `
                      )
                      .join("")) ||
                  ""
                }
              </div>
            </div>
          </section>

          <!-- Footer -->
          <footer class="bg-gray-800 text-white py-12">
            <div class="max-w-6xl mx-auto px-4">
              <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 class="text-xl font-bold mb-4">My Blog</h3>
                  <p class="text-gray-400">
                    ${
                      fullWebsite?.footer?.description ||
                      "Sharing thoughts, stories, and insights from my journey."
                    }
                  </p>
                </div>
                <div>
                  <h4 class="font-semibold mb-4">Quick Links</h4>
                  <ul class="space-y-2">
                    ${
                      (fullWebsite?.footer?.quickLinks &&
                        fullWebsite.footer.quickLinks
                          .map(
                            (link) => `
                      <li>
                        <a href="${link.url}" class="text-gray-400 hover:text-white transition-colors">
                          ${link.name}
                        </a>
                      </li>
                    `
                          )
                          .join("")) ||
                      ""
                    }
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-4">Categories</h4>
                  <ul class="space-y-2">
                    ${
                      (fullWebsite?.categories &&
                        fullWebsite.categories
                          .slice(0, 4)
                          .map(
                            (category) => `
                      <li>
                        <a href="/blog/categories" class="text-gray-400 hover:text-white transition-colors">
                          ${category}
                        </a>
                      </li>
                    `
                          )
                          .join("")) ||
                      ""
                    }
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold mb-4">Connect</h4>
                  <div class="flex space-x-4">
                    ${
                      fullWebsite?.footer?.socialLinks?.twitter
                        ? `<a href="${fullWebsite.footer.socialLinks.twitter}" class="text-gray-400 hover:text-white transition-colors">Twitter</a>`
                        : ""
                    }
                    ${
                      fullWebsite?.footer?.socialLinks?.instagram
                        ? `<a href="${fullWebsite.footer.socialLinks.instagram}" class="text-gray-400 hover:text-white transition-colors">Instagram</a>`
                        : ""
                    }
                    ${
                      fullWebsite?.footer?.socialLinks?.linkedin
                        ? `<a href="${fullWebsite.footer.socialLinks.linkedin}" class="text-gray-400 hover:text-white transition-colors">LinkedIn</a>`
                        : ""
                    }
                    ${
                      fullWebsite?.footer?.socialLinks?.youtube
                        ? `<a href="${fullWebsite.footer.socialLinks.youtube}" class="text-gray-400 hover:text-white transition-colors">YouTube</a>`
                        : ""
                    }
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-700 mt-8 pt-8 text-center">
                <p class="text-gray-400">
                  ${
                    fullWebsite?.footer?.copyright ||
                    "© 2024 My Blog. All rights reserved."
                  }
                </p>
              </div>
            </div>
          </footer>
          
        </div>
      `;
    }

    // Fallback for other website types
    const content = website.fullWebsite || website.components || {};

    return `
      <div class="website-container">
        <!-- Navigation -->
        <nav style="background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #2d3748;">${
              website.name
            }</div>
            <div style="display: flex; gap: 2rem;">
              <a href="#home" style="text-decoration: none; color: #4a5568; font-weight: 500;">Home</a>
              <a href="#about" style="text-decoration: none; color: #4a5568; font-weight: 500;">About</a>
              <a href="#blog" style="text-decoration: none; color: #4a5568; font-weight: 500;">Blog</a>
              <a href="#contact" style="text-decoration: none; color: #4a5568; font-weight: 500;">Contact</a>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="hero" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white; min-height: 500px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem;">${
              content.hero?.title || "Welcome to My Blog"
            }</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95; max-width: 600px; margin-left: auto; margin-right: auto;">${
              content.hero?.subtitle ||
              "Thoughts, stories, and insights from my journey. Join me as I share experiences, lessons learned, and discoveries along the way."
            }</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 50px; cursor: pointer;">Read Latest Posts</button>
              <button style="background: transparent; color: white; border: 2px solid white; padding: 15px 30px; font-size: 1.1rem; border-radius: 50px; cursor: pointer;">Subscribe</button>
            </div>
          </div>
        </section>
        
        <!-- About Section -->
        <section id="about" style="padding: 80px 20px; background: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748;">About Me</h2>
            <p style="font-size: 1.1rem; color: #4a5568; max-width: 800px; margin: 0 auto 2rem;">${
              content.about?.content ||
              "I'm a passionate writer, traveler, and lifelong learner. Through this blog, I share my experiences, insights, and the lessons I've learned along my journey."
            }</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem;">
              <div style="padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Travel</h3>
                <p style="color: #4a5568;">Exploring new places and cultures</p>
              </div>
              <div style="padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Photography</h3>
                <p style="color: #4a5568;">Capturing moments and memories</p>
              </div>
              <div style="padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Writing</h3>
                <p style="color: #4a5568;">Sharing stories and insights</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Section -->
        <section id="blog" style="padding: 80px 20px; background: white;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="font-size: 2.5rem; margin-bottom: 3rem; color: #2d3748; text-align: center;">Latest Posts</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
              <article style="background: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(45deg, #667eea, #764ba2);"></div>
                <div style="padding: 1.5rem;">
                  <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">My Journey Through Europe</h3>
                  <p style="color: #4a5568; margin-bottom: 1rem;">Discovering hidden gems and local cultures across different European cities...</p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #667eea; font-size: 0.9rem;">Travel</span>
                    <span style="color: #4a5568; font-size: 0.9rem;">Dec 15, 2023</span>
                  </div>
                </div>
              </article>
              <article style="background: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(45deg, #ff6b6b, #ffa500);"></div>
                <div style="padding: 1.5rem;">
                  <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">The Art of Mindful Living</h3>
                  <p style="color: #4a5568; margin-bottom: 1rem;">How practicing mindfulness has transformed my daily routine and perspective...</p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #667eea; font-size: 0.9rem;">Lifestyle</span>
                    <span style="color: #4a5568; font-size: 0.9rem;">Dec 10, 2023</span>
                  </div>
                </div>
              </article>
              <article style="background: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(45deg, #4ecdc4, #44a08d);"></div>
                <div style="padding: 1.5rem;">
                  <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Photography Tips for Beginners</h3>
                  <p style="color: #4a5568; margin-bottom: 1rem;">Essential techniques and equipment recommendations for starting your photography journey...</p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #667eea; font-size: 0.9rem;">Photography</span>
                    <span style="color: #4a5568; font-size: 0.9rem;">Dec 5, 2023</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" style="padding: 80px 20px; background: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748;">Get In Touch</h2>
            <p style="font-size: 1.1rem; color: #4a5568; margin-bottom: 3rem;">I'd love to hear from you! Send me a message and I'll respond as soon as possible.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
              <div>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #2d3748;">Contact Information</h3>
                <div style="text-align: left;">
                  <p style="color: #4a5568; margin-bottom: 0.5rem;">📧 hello@myblog.com</p>
                  <p style="color: #4a5568; margin-bottom: 0.5rem;">📱 +1 (555) 123-4567</p>
                  <p style="color: #4a5568; margin-bottom: 0.5rem;">📍 New York, NY</p>
              </div>
              </div>
              <div>
                <form style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <input type="text" placeholder="Your Name" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                  <input type="email" placeholder="Your Email" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                  <textarea placeholder="Your Message" rows="4" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 4px; resize: vertical;"></textarea>
                  <button type="submit" style="background: #667eea; color: white; border: none; padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; width: 100%;">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer style="background: #2d3748; color: white; padding: 2rem; text-align: center;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <p style="margin-bottom: 1rem;">© 2023 ${
              website.name
            }. All rights reserved.</p>
            <div style="display: flex; justify-content: center; gap: 1rem;">
              <a href="#" style="color: white; text-decoration: none;">Twitter</a>
              <a href="#" style="color: white; text-decoration: none;">Instagram</a>
              <a href="#" style="color: white; text-decoration: none;">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    `;
  }, []);

  const generateWebsiteCSS = useCallback(() => {
    return `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; }
      .website-container { width: 100%; }
      .gjs-selected { outline: 3px solid #3b82f6 !important; }
      
      /* Tailwind-like utility classes for blog layout */
      .min-h-screen { min-height: 100vh; }
      .bg-gray-50 { background-color: #f9fafb; }
      .bg-white { background-color: white; }
      .bg-gray-900 { background-color: #111827; }
      .bg-blue-100 { background-color: #dbeafe; }
      .bg-blue-600 { background-color: #2563eb; }
      .bg-blue-700 { background-color: #1d4ed8; }
      .bg-purple-700 { background-color: #7c3aed; }
      .bg-gray-100 { background-color: #f3f4f6; }
      .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
      .from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(37, 99, 235, 0)); }
      .to-purple-700 { --tw-gradient-to: #7c3aed; }
      .from-blue-400 { --tw-gradient-from: #60a5fa; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(96, 165, 250, 0)); }
      .to-purple-500 { --tw-gradient-to: #8b5cf6; }
      
      .text-white { color: white; }
      .text-gray-900 { color: #111827; }
      .text-gray-600 { color: #4b5563; }
      .text-gray-500 { color: #6b7280; }
      .text-gray-400 { color: #9ca3af; }
      .text-blue-600 { color: #2563eb; }
      .text-blue-700 { color: #1d4ed8; }
      .text-blue-100 { color: #dbeafe; }
      
      .text-2xl { font-size: 1.5rem; line-height: 2rem; }
      .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
      .text-5xl { font-size: 3rem; line-height: 1; }
      .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
      .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
      .text-base { font-size: 1rem; line-height: 1.5rem; }
      .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
      
      .font-bold { font-weight: 700; }
      .font-semibold { font-weight: 600; }
      .font-medium { font-weight: 500; }
      
      .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
      .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
      .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
      .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
      .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
      .px-4 { padding-left: 1rem; padding-right: 1rem; }
      .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      .px-8 { padding-left: 2rem; padding-right: 2rem; }
      .p-6 { padding: 1.5rem; }
      
      .mb-2 { margin-bottom: 0.5rem; }
      .mb-4 { margin-bottom: 1rem; }
      .mb-6 { margin-bottom: 1.5rem; }
      .mb-8 { margin-bottom: 2rem; }
      .mb-12 { margin-bottom: 3rem; }
      .mb-16 { margin-bottom: 4rem; }
      .mx-auto { margin-left: auto; margin-right: auto; }
      
      .max-w-4xl { max-width: 56rem; }
      .max-w-6xl { max-width: 72rem; }
      .max-w-7xl { max-width: 80rem; }
      .max-w-3xl { max-width: 48rem; }
      
      .text-center { text-align: center; }
      
      .flex { display: flex; }
      .grid { display: grid; }
      .hidden { display: none; }
      .inline-flex { display: inline-flex; }
      
      .flex-col { flex-direction: column; }
      .items-center { align-items: center; }
      .justify-center { justify-content: center; }
      .justify-between { justify-content: space-between; }
      
      .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
      .gap-4 { gap: 1rem; }
      .gap-8 { gap: 2rem; }
      .space-x-6 > :not([hidden]) ~ :not([hidden]) { margin-left: 1.5rem; }
      .space-x-8 > :not([hidden]) ~ :not([hidden]) { margin-left: 2rem; }
      .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.5rem; }
      .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
      
      .w-16 { width: 4rem; }
      .h-16 { height: 4rem; }
      .h-48 { height: 12rem; }
      .w-full { width: 100%; }
      
      .rounded-lg { border-radius: 0.5rem; }
      .rounded-md { border-radius: 0.375rem; }
      .rounded-full { border-radius: 9999px; }
      
      .border { border-width: 1px; }
      .border-2 { border-width: 2px; }
      .border-transparent { border-color: transparent; }
      .border-white { border-color: white; }
      .border-gray-300 { border-color: #d1d5db; }
      
      .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
      .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
      .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      
      .sticky { position: sticky; }
      .relative { position: relative; }
      .top-0 { top: 0px; }
      .z-50 { z-index: 50; }
      
      .overflow-hidden { overflow: hidden; }
      
      .hover\\:bg-gray-50:hover { background-color: #f9fafb; }
      .hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
      .hover\\:text-gray-900:hover { color: #111827; }
      .hover\\:text-blue-700:hover { color: #1d4ed8; }
      .hover\\:text-white:hover { color: white; }
      .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
      
      .transition-shadow { transition-property: box-shadow; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
      
      @media (min-width: 768px) {
        .md\\:flex { display: flex; }
        .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .sm\\:flex-row { flex-direction: row; }
        .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
      }
      
      @media (min-width: 1024px) {
        .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
        .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      }
    `;
  }, []);

  // Load website into editor
  const loadWebsite = useCallback(
    (editorInstance, website) => {
      if (!editorInstance) {
        console.error("❌ No editor instance");
        setLoadError("Editor not ready");
        setIsLoading(false);
        return;
      }

      // Check if editor is fully initialized
      if (!editorInstance.DomComponents || !editorInstance.CssComposer) {
        console.error("❌ Editor not fully initialized");
        setLoadError("Editor not fully initialized");
        setIsLoading(false);
        return;
      }

      console.log("📥 Loading website:", website.name);

      try {
        console.log("🗑️  Clearing old content...");

        // Safe clearing with null checks
        if (
          editorInstance.DomComponents &&
          typeof editorInstance.DomComponents.clear === "function"
        ) {
          editorInstance.DomComponents.clear();
        }

        if (
          editorInstance.CssComposer &&
          typeof editorInstance.CssComposer.clear === "function"
        ) {
          editorInstance.CssComposer.clear();
        }

        const html = generateWebsiteHTML(website);
        const css = generateWebsiteCSS();

        console.log("✅ Generated HTML (", html.length, "chars)");
        console.log("✅ Generated CSS (", css.length, "chars)");
        console.log("🔍 HTML content preview:", html.substring(0, 200) + "...");

        // Simple approach - just use setComponents
        console.log("📝 Setting components...");

        try {
          editorInstance.setComponents(html);
          console.log("✅ Components set");
        } catch (error) {
          console.error("❌ Error setting components:", error);
        }

        if (typeof editorInstance.setStyle === "function") {
          console.log("🎨 Setting styles...");
          editorInstance.setStyle(css);
          console.log("✅ Styles set");
        }

        if (typeof editorInstance.refresh === "function") {
          console.log("🔄 Refreshing editor...");
          editorInstance.refresh();
          console.log("✅ Editor refreshed");
        }

        // Force a render after a short delay
        setTimeout(() => {
          console.log("🔄 Force rendering after delay...");

          // Multiple render approaches
          try {
            if (typeof editorInstance.render === "function") {
              editorInstance.render();
              console.log("✅ Force render completed");
            }

            // Force canvas update
            if (
              editorInstance.Canvas &&
              typeof editorInstance.Canvas.updateCanvas === "function"
            ) {
              editorInstance.Canvas.updateCanvas();
              console.log("✅ Canvas updated");
            }

            // Force component render
            if (
              editorInstance.DomComponents &&
              typeof editorInstance.DomComponents.render === "function"
            ) {
              editorInstance.DomComponents.render();
              console.log("✅ Components rendered");
            }

            // Force style render
            if (
              editorInstance.CssComposer &&
              typeof editorInstance.CssComposer.render === "function"
            ) {
              editorInstance.CssComposer.render();
              console.log("✅ Styles rendered");
            }

            // Trigger a custom event to force refresh
            editorInstance.trigger("change:canvasOffset");
            editorInstance.trigger("component:update");
            console.log("✅ Events triggered");

            // Final attempt: Force iframe content update
            const canvas = editorInstance.Canvas?.getFrameEl?.();
            if (canvas && canvas.contentDocument) {
              const iframeDoc = canvas.contentDocument;
              const iframeBody = iframeDoc.body;

              if (iframeBody) {
                // Get fresh content from GrapesJS
                const freshHtml = editorInstance.getHtml();
                const freshCss = editorInstance.getCss();

                console.log(
                  "🔄 Final iframe update - HTML:",
                  freshHtml.length,
                  "CSS:",
                  freshCss.length
                );

                // Update iframe content
                iframeBody.innerHTML = freshHtml;

                // Add CSS to head
                let styleEl = iframeDoc.querySelector("style#gjs-css");
                if (!styleEl) {
                  styleEl = iframeDoc.createElement("style");
                  styleEl.id = "gjs-css";
                  iframeDoc.head.appendChild(styleEl);
                }
                styleEl.textContent = freshCss;

                console.log("✅ Final iframe content updated");
              }
            }
          } catch (renderError) {
            console.warn("⚠️ Render error:", renderError);
          }

          // Check if canvas has content - try multiple methods
          let canvas = null;
          let canvasContent = "";

          // Method 1: Try getFrameEl
          try {
            canvas = editorInstance.Canvas?.getFrameEl?.();
            if (canvas) {
              canvasContent = canvas.innerHTML;
              console.log("🔍 Canvas found via getFrameEl:", canvas);
            }
          } catch (e) {
            console.log("🔍 getFrameEl failed:", e.message);
          }

          // Method 2: Try getCanvas
          if (!canvas) {
            try {
              canvas = editorInstance.Canvas?.getCanvas?.();
              if (canvas) {
                canvasContent = canvas.innerHTML;
                console.log("🔍 Canvas found via getCanvas:", canvas);
              }
            } catch (e) {
              console.log("🔍 getCanvas failed:", e.message);
            }
          }

          // Method 3: Try getBody
          if (!canvas) {
            try {
              const body = editorInstance.Canvas?.getBody?.();
              if (body) {
                canvas = body;
                canvasContent = body.innerHTML;
                console.log("🔍 Canvas found via getBody:", body);
              }
            } catch (e) {
              console.log("🔍 getBody failed:", e.message);
            }
          }

          // Method 4: Try container query
          if (!canvas) {
            try {
              const container = editorInstance.getContainer?.();
              if (container) {
                canvas =
                  container.querySelector(".gjs-cv-canvas") ||
                  container.querySelector("iframe");
                if (canvas) {
                  canvasContent = canvas.innerHTML;
                  console.log("🔍 Canvas found via container query:", canvas);
                }
              }
            } catch (e) {
              console.log("🔍 container query failed:", e.message);
            }
          }

          if (canvas) {
            console.log("🔍 Canvas element found:", canvas);
            console.log(
              "🔍 Canvas content:",
              canvasContent.substring(0, 200) + "..."
            );
            console.log(
              "🔍 Canvas children count:",
              canvas.children?.length || 0
            );

            // If canvas is empty, try to force content update
            if (canvasContent.length < 100) {
              console.log("🔄 Canvas appears empty, forcing content update...");

              // Try to get the iframe and update its content directly
              if (canvas.tagName === "IFRAME" && canvas.contentDocument) {
                try {
                  const iframeDoc = canvas.contentDocument;
                  const iframeBody = iframeDoc.body;

                  if (iframeBody) {
                    // Get the current HTML and CSS from GrapesJS
                    const currentHtml = editorInstance.getHtml();
                    const currentCss = editorInstance.getCss();

                    console.log("🔍 Current HTML length:", currentHtml.length);
                    console.log("🔍 Current CSS length:", currentCss.length);

                    // Update iframe content
                    iframeBody.innerHTML = currentHtml;

                    // Add CSS to iframe head
                    let styleEl = iframeDoc.querySelector("style#gjs-css");
                    if (!styleEl) {
                      styleEl = iframeDoc.createElement("style");
                      styleEl.id = "gjs-css";
                      iframeDoc.head.appendChild(styleEl);
                    }
                    styleEl.textContent = currentCss;

                    console.log("✅ Iframe content updated directly");
                  }
                } catch (iframeError) {
                  console.warn("⚠️ Iframe update failed:", iframeError);
                }
              }
            }
          } else {
            console.warn("⚠️ Canvas element not found with any method");
            console.log("🔍 Editor instance:", editorInstance);
            console.log("🔍 Canvas object:", editorInstance.Canvas);
          }

          // Check components
          const components = editorInstance.DomComponents?.getComponents?.();
          if (components) {
            console.log("🔍 Components count:", components.length);
            console.log("🔍 Components:", components);
          }
        }, 100);

        console.log("✅ Website loaded successfully!");

        // Force iframe content update as fallback
        setTimeout(() => {
          const canvas = editorInstance.Canvas?.getFrameEl?.();
          if (canvas && canvas.contentDocument) {
            const iframeDoc = canvas.contentDocument;
            const iframeBody = iframeDoc.body;

            if (iframeBody && iframeBody.innerHTML.length < 100) {
              console.log("🔄 Canvas appears empty, forcing content...");
              iframeBody.innerHTML = html;

              // Add CSS
              let styleEl = iframeDoc.querySelector("style#gjs-css");
              if (!styleEl) {
                styleEl = iframeDoc.createElement("style");
                styleEl.id = "gjs-css";
                iframeDoc.head.appendChild(styleEl);
              }
              styleEl.textContent = css;

              console.log("✅ Content forced to iframe");
            }
          }
        }, 500);

        setIsLoading(false);
        setLoadError(null);
      } catch (error) {
        console.error("❌ Error loading website:", error);
        setLoadError(error.message);
        setIsLoading(false);
      }
    },
    [generateWebsiteHTML, generateWebsiteCSS]
  );

  // Initialize editor - ONLY when ref is ready
  useEffect(() => {
    console.log("🔍 Checking initialization conditions...");
    console.log("- refReady:", refReady);
    console.log("- editorRef.current:", !!editorRef.current);
    console.log("- editor exists:", !!editor);

    if (!refReady || !editorRef.current) {
      console.log("⏳ Not ready to initialize yet - ref not ready");
      return;
    }

    if (editor || isInitializing) {
      console.log("⏳ Editor already exists or initializing, skipping");
      return;
    }

    console.log("🚀 Skipping GrapesJS - using simple HTML preview");
    setIsInitializing(false);
    setIsLoading(false);
    return;

    const timeout = setTimeout(() => {
      console.warn("⏰ Loading timeout!");
      setLoadError("Loading timeout - GrapesJS may not have loaded");
      setIsLoading(false);
    }, 15000);

    try {
      const editorInstance = grapesjs.init({
        container: editorRef.current,
        height: "100%",
        width: "100%",
        storageManager: false,
        fromElement: false,
        showOffsets: true,
        noticeOnUnload: false,
        allowScripts: 1,
        avoidInlineStyle: false,

        canvas: {
          styles: [
            "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
          ],
        },

        deviceManager: {
          devices: [
            { name: "Desktop", width: "" },
            { name: "Tablet", width: "768px" },
            { name: "Mobile", width: "320px" },
          ],
        },

        panels: { defaults: [] },
        styleManager: { appendTo: "#style-manager-container" },
        layerManager: { appendTo: "#layer-manager-container" },
        traitManager: { appendTo: "#trait-manager-container" },
        blockManager: { appendTo: "#blocks-container" },

        // Simplified configuration - no plugins for now
        plugins: [],
      });

      console.log("✅ GrapesJS instance created");

      editorInstance.on("component:selected", (comp) => {
        console.log("📌 Component selected");
        setSelectedElement(comp);
      });

      editorInstance.on("component:deselected", () => {
        console.log("📌 Component deselected");
        setSelectedElement(null);
      });

      // Add canvas ready event
      editorInstance.on("canvas:ready", () => {
        console.log("🎨 Canvas is ready!");
      });

      // Add canvas frame load event
      editorInstance.on("canvas:frame:load", () => {
        console.log("🎨 Canvas frame loaded!");
      });

      // Add component add event
      editorInstance.on("component:add", (component) => {
        console.log("➕ Component added:", component);
      });

      // Add component update event
      editorInstance.on("component:update", (component) => {
        console.log("🔄 Component updated:", component);
      });

      editorInstance.on("load", () => {
        console.log("✅ Editor LOADED!");
        clearTimeout(timeout);
        setEditor(editorInstance);
        setIsInitializing(false);

        // Wait for editor to be fully initialized
        const waitForInitialization = () => {
          if (editorInstance.DomComponents && editorInstance.CssComposer) {
            console.log("✅ Editor fully initialized!");

            // Wait for canvas to be ready
            const waitForCanvas = () => {
              const canvas = editorInstance.Canvas?.getFrameEl?.();
              if (canvas && canvas.contentDocument) {
                console.log("✅ Canvas is ready!");
                if (currentTemplate) {
                  console.log("📦 Loading template:", currentTemplate.name);
                  // Add a small delay to ensure editor is completely ready
                  setTimeout(() => {
                    loadWebsite(editorInstance, currentTemplate);
                  }, 200);
                } else {
                  console.log("⚠️  No template to load");
                  setIsLoading(false);
                }
              } else {
                console.log("⏳ Waiting for canvas to be ready...");
                setTimeout(waitForCanvas, 100);
              }
            };

            // Start waiting for canvas
            setTimeout(waitForCanvas, 100);
          } else {
            console.log("⏳ Waiting for editor initialization...");
            setTimeout(waitForInitialization, 100);
          }
        };

        // Start checking for full initialization
        setTimeout(waitForInitialization, 100);
      });

      editorInstance.on("error", (err) => {
        console.error("❌ GrapesJS error:", err);
        setLoadError(err.message || "Unknown GrapesJS error occurred");
        setIsLoading(false);
        setIsInitializing(false);
      });

      // Add additional error handling for WebGL issues
      try {
        const canvas =
          editorInstance.Canvas?.getFrameEl?.() ||
          editorInstance.Canvas?.getCanvas?.() ||
          editorInstance.Canvas?.getBody?.()?.querySelector?.("canvas") ||
          editorInstance.getContainer?.()?.querySelector?.("canvas");

        if (canvas && typeof canvas.getContext === "function") {
          canvas.addEventListener("webglcontextlost", (event) => {
            console.warn("⚠️ WebGL context lost");
            event.preventDefault();
            setLoadError("WebGL context lost. Please refresh the page.");
            setIsLoading(false);
          });

          canvas.addEventListener("webglcontextrestored", () => {
            console.log("✅ WebGL context restored");
            // Optionally reload the editor
          });
        }
      } catch (e) {
        console.warn("Could not access canvas for WebGL error handling:", e);
      }

      return () => {
        console.log("🧹 Cleaning up editor");
        clearTimeout(timeout);
        if (editorInstance) {
          try {
            // Clean up WebGL contexts
            try {
              const canvas =
                editorInstance.Canvas?.getFrameEl?.() ||
                editorInstance.Canvas?.getCanvas?.() ||
                editorInstance.Canvas?.getBody?.()?.querySelector?.("canvas") ||
                editorInstance.getContainer?.()?.querySelector?.("canvas");

              if (canvas && typeof canvas.getContext === "function") {
                const gl =
                  canvas.getContext("webgl") || canvas.getContext("webgl2");
                if (gl) {
                  const ext = gl.getExtension("WEBGL_lose_context");
                  if (ext) {
                    ext.loseContext();
                  }
                }
              }
            } catch (e) {
              console.warn("Could not access canvas for WebGL cleanup:", e);
            }

            // Destroy GrapesJS editor
            editorInstance.destroy();
          } catch (e) {
            console.error("Error destroying editor:", e);
          }
        }
      };
    } catch (error) {
      console.error("❌ Init error:", error);
      clearTimeout(timeout);
      setLoadError(error.message);
      setIsLoading(false);
      setIsInitializing(false);
    }
  }, [refReady, currentTemplate, loadWebsite]); // eslint-disable-line react-hooks/exhaustive-deps
  // Note: We intentionally exclude 'editor' and 'isInitializing' from dependencies
  // to prevent re-initialization when editor state changes

  // Handle template changes
  useEffect(() => {
    if (!editor || !templateData || templateData.id === currentTemplate?.id)
      return;

    console.log("🔄 Template changed:", templateData.name);
    setCurrentTemplate(templateData);
    setIsLoading(true);

    // Use setTimeout to ensure editor is ready
    setTimeout(() => {
      if (editor && editor.DomComponents && editor.CssComposer) {
        loadWebsite(editor, templateData);
      } else {
        console.log("⏳ Editor not ready for template loading");
        setIsLoading(false);
      }
    }, 100);
  }, [editor, templateData, currentTemplate, loadWebsite]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (editor) {
        try {
          console.log("🧹 Component unmounting - cleaning up editor");

          // Clean up WebGL contexts
          try {
            const canvas =
              editor.Canvas?.getFrameEl?.() ||
              editor.Canvas?.getCanvas?.() ||
              editor.Canvas?.getBody?.()?.querySelector?.("canvas") ||
              editor.getContainer?.()?.querySelector?.("canvas");

            if (canvas && typeof canvas.getContext === "function") {
              const gl =
                canvas.getContext("webgl") || canvas.getContext("webgl2");
              if (gl) {
                const ext = gl.getExtension("WEBGL_lose_context");
                if (ext) {
                  ext.loseContext();
                }
              }
            }
          } catch (e) {
            console.warn(
              "Could not access canvas for WebGL cleanup on unmount:",
              e
            );
          }

          // Destroy GrapesJS editor
          editor.destroy();
        } catch (e) {
          console.error("Error cleaning up editor on unmount:", e);
        }
      }
    };
  }, [editor, currentTemplate, loadWebsite]);

  const handleSave = async () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      const data = {
        html: editor.getHtml(),
        css: editor.getCss(),
        website: currentTemplate,
      };
      if (onSave) await onSave(data);
      alert("Saved!");
    } catch (error) {
      alert("Save failed!");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      const data = {
        html: editor.getHtml(),
        css: editor.getCss(),
        website: currentTemplate,
      };
      if (onPublish) await onPublish(data);
      alert("Published!");
    } catch (error) {
      alert("Publish failed!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateStyle = useCallback(
    (property, value) => {
      if (!editor || !selectedElement) return;

      const map = {
        backgroundColor: "background-color",
        fontFamily: "font-family",
        fontSize: "font-size",
        fontWeight: "font-weight",
      };

      const prop = map[property] || property;
      selectedElement.setStyle({
        ...selectedElement.getStyle(),
        [prop]: value,
      });
      editor.render();
    },
    [editor, selectedElement]
  );

  const handleUpdateContent = useCallback(
    (field, value, isModified = false) => {
      if (isModified) {
        // Set flag to prevent content regeneration during apply
        isApplyingChanges.current = true;

        setContentModified(true);
        setModifiedPage(currentPage);
        console.log(
          "📝 Content marked as modified - preventing HTML regeneration for page:",
          currentPage
        );
      }

      // Apply changes directly to the DOM element regardless of editor state
      if (selectedElement && selectedElement.element) {
        if (field === "text") {
          selectedElement.element.textContent = value;
          console.log("✅ Content applied directly to DOM element:", value);

          // Force a re-render to ensure changes are visible
          if (selectedElement.element.parentNode) {
            selectedElement.element.parentNode.style.display = "none";
            selectedElement.element.parentNode.offsetHeight; // Trigger reflow
            selectedElement.element.parentNode.style.display = "";
          }
        } else if (field === "remove") {
          // Element was removed, clear the selected element
          console.log("🗑️ Element removed from DOM");
          setSelectedElement(null);
        }
      }

      // Also try the GrapesJS editor if available
      if (editor && selectedElement) {
        if (field === "text") {
          selectedElement.set("content", value);
          editor.render();
        }
      }

      // Reset the flag after a short delay to allow for any pending operations
      if (isModified) {
        setTimeout(() => {
          isApplyingChanges.current = false;
        }, 100);
      }
    },
    [editor, selectedElement, currentPage]
  );

  // Loading overlay with better error handling
  const LoadingOverlay = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
        {loadError ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Loading Error
            </h2>
            <p className="text-gray-600 mb-4">
              There was an issue loading the editor
            </p>
            <div className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3 mb-4">
              {loadError}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Loading Editor
            </h2>
            <p className="text-gray-600 mb-4">
              Setting up your website builder...
            </p>
            {currentTemplate && (
              <div className="text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-2 mb-2">
                Loading: {currentTemplate.name}
              </div>
            )}
            <div className="text-xs text-gray-600 bg-gray-50 rounded-lg px-4 py-2 mb-2">
              Ref Ready: {refReady ? "✅" : "⏳"} | Editor:{" "}
              {editor ? "✅" : "⏳"} | Initializing:{" "}
              {isInitializing ? "⏳" : "✅"}
            </div>
            <div className="text-xs text-gray-600 mt-2">
              This may take a few moments...
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 relative">
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900">
            {currentTemplate?.name || "Website Builder"}
          </h2>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
              Desktop
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
              Tablet
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
              Mobile
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div
            className="bg-white shadow-lg mx-auto"
            style={{ maxWidth: "1400px" }}
          >
            <div
              ref={editorRef}
              style={{ height: "calc(100vh - 160px)", minHeight: "600px" }}
            >
              {/* Interactive website preview */}
              {currentTemplate && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    overflow: "auto",
                    position: "relative",
                  }}
                >
                  <style>{`
                    ${generateWebsiteCSS()}
                    
                    /* Interactive styles */
                    .editable {
                      cursor: pointer;
                      transition: all 0.2s ease;
                      position: relative;
                    }
                    
                    .editable:hover {
                      outline: 2px solid #667eea;
                      outline-offset: 2px;
                    }
                    
                    .editable.selected {
                      outline: 3px solid #ff6b6b;
                      outline-offset: 2px;
                    }
                    
                    .editable::after {
                      content: '✏️';
                      position: absolute;
                      top: -10px;
                      right: -10px;
                      background: #667eea;
                      color: white;
                      border-radius: 50%;
                      width: 20px;
                      height: 20px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 10px;
                      opacity: 0;
                      transition: opacity 0.2s ease;
                    }
                    
                    .editable:hover::after {
                      opacity: 1;
                    }
                  `}</style>

                  <div
                    ref={(containerRef) => {
                      if (containerRef && currentTemplate) {
                        // Prevent unnecessary re-renders when content is modified
                        if (
                          contentModified &&
                          containerRef.innerHTML &&
                          containerRef.innerHTML.length > 100
                        ) {
                          console.log(
                            "🚫 Skipping containerRef update - content already modified and has content"
                          );
                          // Still ensure editable classes are applied
                          setTimeout(() => {
                            const textElements = containerRef.querySelectorAll(
                              "h1, h2, h3, h4, h5, h6, p, span, a, button, div"
                            );
                            textElements.forEach((element) => {
                              element.classList.add("editable");
                            });
                          }, 50);
                          return;
                        }

                        // Additional check: if content is modified on current page, don't regenerate at all
                        if (contentModified && modifiedPage === currentPage) {
                          console.log(
                            "🚫 Skipping all content regeneration - content modified by user on current page:",
                            currentPage
                          );
                          return;
                        }

                        // Additional check: if we're currently applying changes, don't regenerate
                        if (isApplyingChanges.current) {
                          console.log(
                            "🚫 Skipping content regeneration - currently applying user changes"
                          );
                          return;
                        }

                        // Debounce mechanism: prevent too frequent updates
                        const now = Date.now();
                        if (now - lastContainerUpdate.current < 100) {
                          console.log(
                            "🚫 Skipping content regeneration - too frequent updates"
                          );
                          return;
                        }
                        lastContainerUpdate.current = now;

                        // Debug log to understand the logic flow
                        console.log("🔍 Content rendering logic:", {
                          contentModified,
                          modifiedPage,
                          currentPage,
                          pageContent: pageContent ? "has content" : "null",
                          contentInitialized: contentInitialized.current,
                          pageNavigated,
                        });

                        // Show loading state
                        if (loadingPage) {
                          containerRef.innerHTML = `
                            <div style="display: flex; justify-content: center; align-items: center; height: 400px; background: #f8f9fa;">
                              <div style="text-align: center;">
                                <div style="width: 40px; height: 40px; border: 4px solid #e3e3e3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                                <p style="color: #666; font-size: 16px;">Loading page...</p>
                              </div>
                            </div>
                            <style>
                              @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                              }
                            </style>
                          `;
                          return;
                        }

                        // Show fetched page content or default home page
                        const contentToShow =
                          pageContent || generateWebsiteHTML(currentTemplate);

                        // Update content if not initialized or if we've navigated to a new page
                        // But skip if content has been modified by user
                        if (
                          (!contentInitialized.current || pageNavigated) &&
                          !contentModified
                        ) {
                          console.log("🔄 Setting HTML content");
                          containerRef.innerHTML = contentToShow;
                          contentInitialized.current = true;

                          // Add editable classes to all interactive elements
                          setTimeout(() => {
                            const textElements = containerRef.querySelectorAll(
                              "h1, h2, h3, h4, h5, h6, p, span, a, button, div"
                            );
                            textElements.forEach((element) => {
                              element.classList.add("editable");
                            });

                            // Add navigation event listeners for both buttons and links
                            const navElements =
                              containerRef.querySelectorAll("[data-nav]");
                            navElements.forEach((element) => {
                              element.addEventListener("click", (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const page = element.getAttribute("data-nav");
                                console.log("🔄 Navigation clicked:", page);
                                fetchPageContent(page);
                              });
                            });

                            // Update active navigation state
                            const currentPageElement =
                              containerRef.querySelector(
                                `[data-nav="${currentPage}"]`
                              );
                            if (currentPageElement) {
                              // Remove active class from all navigation elements
                              navElements.forEach((el) => {
                                el.classList.remove("active");
                                el.classList.add("text-gray-500");
                                el.classList.remove("text-gray-900");
                              });

                              // Add active class to current page element
                              currentPageElement.classList.add("active");
                              currentPageElement.classList.remove(
                                "text-gray-500"
                              );
                              currentPageElement.classList.add("text-gray-900");
                            }
                          }, 100);
                        } else if (contentModified) {
                          console.log(
                            "🚫 Skipping HTML regeneration - content modified by user"
                          );
                          // Still need to add editable classes and event listeners even when content is modified
                          setTimeout(() => {
                            const textElements = containerRef.querySelectorAll(
                              "h1, h2, h3, h4, h5, h6, p, span, a, button, div"
                            );
                            textElements.forEach((element) => {
                              element.classList.add("editable");
                            });

                            // Add navigation event listeners for both buttons and links
                            const navElements =
                              containerRef.querySelectorAll("[data-nav]");
                            navElements.forEach((element) => {
                              element.addEventListener("click", (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const page = element.getAttribute("data-nav");
                                console.log("🔄 Navigation clicked:", page);
                                fetchPageContent(page);
                              });
                            });

                            // Update active navigation state
                            const currentPageElement =
                              containerRef.querySelector(
                                `[data-nav="${currentPage}"]`
                              );
                            if (currentPageElement) {
                              // Remove active class from all navigation elements
                              navElements.forEach((el) => {
                                el.classList.remove("active");
                                el.classList.add("text-gray-500");
                                el.classList.remove("text-gray-900");
                              });

                              // Add active class to current page element
                              currentPageElement.classList.add("active");
                              currentPageElement.classList.remove(
                                "text-gray-500"
                              );
                              currentPageElement.classList.add("text-gray-900");
                            }
                          }, 100);
                        } else if (pageContent !== null && !contentModified) {
                          console.log(
                            "🔄 Updating fetched page content - new page navigation"
                          );
                          containerRef.innerHTML = contentToShow;
                          contentInitialized.current = true;

                          // Add editable classes to all interactive elements
                          setTimeout(() => {
                            const textElements = containerRef.querySelectorAll(
                              "h1, h2, h3, h4, h5, h6, p, span, a, button, div"
                            );
                            textElements.forEach((element) => {
                              element.classList.add("editable");
                            });

                            // Add navigation event listeners for both buttons and links
                            const navElements =
                              containerRef.querySelectorAll("[data-nav]");
                            navElements.forEach((element) => {
                              element.addEventListener("click", (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const page = element.getAttribute("data-nav");
                                console.log("🔄 Navigation clicked:", page);
                                fetchPageContent(page);
                              });
                            });

                            // Update active navigation state
                            const currentPageElement =
                              containerRef.querySelector(
                                `[data-nav="${currentPage}"]`
                              );
                            if (currentPageElement) {
                              // Remove active class from all navigation elements
                              navElements.forEach((el) => {
                                el.classList.remove("active");
                                el.classList.add("text-gray-500");
                                el.classList.remove("text-gray-900");
                              });

                              // Add active class to current page element
                              currentPageElement.classList.add("active");
                              currentPageElement.classList.remove(
                                "text-gray-500"
                              );
                              currentPageElement.classList.add("text-gray-900");
                            }
                          }, 100);

                          // Reset page navigation flag after content is updated
                          setPageNavigated(false);
                        } else if (pageContent !== null && contentModified) {
                          console.log(
                            "🚫 Skipping page content update - content modified by user"
                          );
                          // Still need to add editable classes and event listeners even when content is modified
                          setTimeout(() => {
                            const textElements = containerRef.querySelectorAll(
                              "h1, h2, h3, h4, h5, h6, p, span, a, button, div"
                            );
                            textElements.forEach((element) => {
                              element.classList.add("editable");
                            });

                            // Add navigation event listeners for both buttons and links
                            const navElements =
                              containerRef.querySelectorAll("[data-nav]");
                            navElements.forEach((element) => {
                              element.addEventListener("click", (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const page = element.getAttribute("data-nav");
                                console.log("🔄 Navigation clicked:", page);
                                fetchPageContent(page);
                              });
                            });

                            // Update active navigation state
                            const currentPageElement =
                              containerRef.querySelector(
                                `[data-nav="${currentPage}"]`
                              );
                            if (currentPageElement) {
                              // Remove active class from all navigation elements
                              navElements.forEach((el) => {
                                el.classList.remove("active");
                                el.classList.add("text-gray-500");
                                el.classList.remove("text-gray-900");
                              });

                              // Add active class to current page element
                              currentPageElement.classList.add("active");
                              currentPageElement.classList.remove(
                                "text-gray-500"
                              );
                              currentPageElement.classList.add("text-gray-900");
                            }
                          }, 100);
                        } else {
                          console.log(
                            "🚫 Skipping HTML regeneration - already initialized"
                          );
                        }
                      }
                    }}
                    onClick={(e) => {
                      // Handle navigation clicks - prevent default for all links and navigation buttons
                      if (
                        e.target.tagName === "A" ||
                        e.target.closest("a") ||
                        e.target.hasAttribute("data-nav")
                      ) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }

                      // Remove previous selections
                      document.querySelectorAll(".editable").forEach((el) => {
                        el.classList.remove("selected");
                      });

                      // Find the clicked element
                      const target = e.target;
                      if (target) {
                        target.classList.add("selected");
                        setSelectedElement({
                          tagName: target.tagName,
                          textContent: target.textContent,
                          className: target.className,
                          id: target.id,
                          style: target.style.cssText,
                          element: target,
                        });
                        console.log("Element selected:", target);
                      }
                    }}
                  />
                </div>
              )}

              {/* Debug info */}
              {process.env.NODE_ENV === "development" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "10px",
                    fontSize: "12px",
                    zIndex: 1000,
                    borderRadius: "4px",
                  }}
                >
                  <div>Editor: {editor ? "✅" : "❌"}</div>
                  <div>Loading: {isLoading ? "⏳" : "✅"}</div>
                  <div>Template: {currentTemplate?.name || "None"}</div>
                  <div>Mode: Simple HTML Preview</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CustomizationPanel
          selectedElement={selectedElement}
          onUpdateStyle={handleUpdateStyle}
          onUpdateContent={handleUpdateContent}
          editor={editor}
        />
      </div>

      <div id="style-manager-container" style={{ display: "none" }}></div>
      <div id="layer-manager-container" style={{ display: "none" }}></div>
      <div id="trait-manager-container" style={{ display: "none" }}></div>
      <div id="blocks-container" style={{ display: "none" }}></div>
    </div>
  );
};

export default GrapesJSEditor;
