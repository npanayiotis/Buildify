import React, { useState } from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";

const Help = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Topics", icon: "📚" },
    { id: "getting-started", label: "Getting Started", icon: "🚀" },
    { id: "templates", label: "Templates", icon: "🎨" },
    { id: "customization", label: "Customization", icon: "⚙️" },
    { id: "publishing", label: "Publishing", icon: "🌐" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "technical", label: "Technical", icon: "🔧" }
  ];

  const articles = [
    {
      id: 1,
      title: "How to choose the right template",
      category: "templates",
      description: "Learn how to select the perfect template for your business needs",
      readTime: "5 min read",
      helpful: 24
    },
    {
      id: 2,
      title: "Getting started with SiteCraft",
      category: "getting-started",
      description: "Complete guide to setting up your first website",
      readTime: "10 min read",
      helpful: 18
    },
    {
      id: 3,
      title: "Customizing your template",
      category: "customization",
      description: "Step-by-step guide to personalizing your website",
      readTime: "8 min read",
      helpful: 32
    },
    {
      id: 4,
      title: "Connecting your domain",
      category: "publishing",
      description: "How to connect a custom domain to your website",
      readTime: "6 min read",
      helpful: 15
    },
    {
      id: 5,
      title: "Setting up payments",
      category: "technical",
      description: "Integrate Stripe and PayPal for online payments",
      readTime: "12 min read",
      helpful: 28
    },
    {
      id: 6,
      title: "Understanding your analytics",
      category: "technical",
      description: "How to read and use your website analytics",
      readTime: "7 min read",
      helpful: 21
    },
    {
      id: 7,
      title: "Managing your subscription",
      category: "billing",
      description: "How to update billing information and change plans",
      readTime: "4 min read",
      helpful: 12
    },
    {
      id: 8,
      title: "SEO best practices",
      category: "technical",
      description: "Optimize your website for search engines",
      readTime: "15 min read",
      helpful: 35
    }
  ];

  const faqs = [
    {
      question: "How do I get started with SiteCraft?",
      answer: "Simply sign up for an account, choose a template that fits your business, customize it with your content, and publish it to the web. The entire process takes less than an hour!"
    },
    {
      question: "Can I change my template after publishing?",
      answer: "Yes! You can switch templates at any time. Your content will be preserved, though you may need to adjust some styling to match the new template."
    },
    {
      question: "Do I need coding knowledge?",
      answer: "Not at all! SiteCraft is designed for non-coders. Everything is done through our intuitive visual editor with no coding required."
    },
    {
      question: "What's included in the free plan?",
      answer: "The free plan includes access to basic templates, limited customization options, and SiteCraft subdomain hosting. Premium features require a paid subscription."
    },
    {
      question: "Can I use my own domain?",
      answer: "Absolutely! You can connect your own custom domain to any published website. We'll guide you through the DNS setup process."
    },
    {
      question: "Is there customer support?",
      answer: "Yes! We offer email support for all users and priority support for premium subscribers. You can also browse our comprehensive help center."
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
          <p className="mt-2 text-gray-600">Find answers to your questions and learn how to get the most out of SiteCraft.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl mb-3">📞</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 mb-4">Get help from our support team</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Contact Us
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with us in real-time</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Start Chat
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <div className="text-3xl mb-3">📹</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-gray-600 mb-4">Watch step-by-step guides</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Watch Videos
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <span className="mr-3">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Help Articles */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Help Articles</h2>
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <p className="text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>⏱️ {article.readTime}</span>
                          <span>👍 {article.helpful} found helpful</span>
                        </div>
                      </div>
                      <button className="ml-4 text-blue-600 hover:text-blue-800 font-medium">
                        Read →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <h3 className="font-medium text-gray-900">{faq.question}</h3>
                      <span className="text-gray-400">+</span>
                    </button>
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Help;
