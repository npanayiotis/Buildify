import { restaurantWebsite } from "./restaurantWebsite";
import { gymWebsite } from "./gymWebsite";
import { lawOfficeWebsite } from "./lawOfficeWebsite";
import { portfolioWebsite } from "./portfolioWebsite";
import { realEstateWebsite } from "./realEstateWebsite";
import { medicalPracticeWebsite } from "./medicalPracticeWebsite";
import { photographyStudioWebsite } from "./photographyStudioWebsite";

export const WEBSITE_CATEGORIES = [
  { id: "blog", name: "Blog", icon: "📝", color: "orange" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️", color: "red" },
  { id: "gym", name: "Gym", icon: "💪", color: "green" },
  { id: "law", name: "Law Office", icon: "⚖️", color: "blue" },
  { id: "portfolio", name: "Portfolio", icon: "🎨", color: "purple" },
  { id: "real-estate", name: "Real Estate", icon: "🏠", color: "indigo" },
  { id: "medical", name: "Medical", icon: "🏥", color: "green" },
  { id: "photography", name: "Photography", icon: "📸", color: "pink" },
];

export const WEBSITES = [
  {
    id: "professional-blog-website",
    name: "Professional Blog",
    category: "blog",
    description:
      "Modern blog website perfect for writers, content creators, and thought leaders",
    preview:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    features: [
      {
        icon: "📝",
        title: "Blog Grid",
        description: "Responsive grid layout for blog posts",
      },
      {
        icon: "📄",
        title: "Article Layout",
        description: "Clean, readable article design",
      },
      {
        icon: "📧",
        title: "Newsletter Signup",
        description: "Email subscription functionality",
      },
      {
        icon: "📱",
        title: "Social Media Integration",
        description: "Social media sharing buttons",
      },
      {
        icon: "🔍",
        title: "SEO Optimized",
        description: "Built-in SEO tools for better rankings",
      },
      {
        icon: "📱",
        title: "Mobile Responsive",
        description: "Fully responsive design for all devices",
      },
    ],
    tags: ["blog", "writing", "content", "professional"],
    fullWebsite: {
      hero: {
        title: "Welcome to My Blog",
        subtitle:
          "Thoughts, stories, and insights from my journey. Join me as I explore ideas, share experiences, and connect with like-minded individuals.",
        buttonText: "Read Latest Posts",
        buttonSecondary: "Subscribe",
        backgroundImage:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        overlay: "rgba(0, 0, 0, 0.4)",
        stats: [
          { number: "500+", label: "Articles Published" },
          { number: "25K+", label: "Monthly Readers" },
          { number: "5+", label: "Years Writing" },
        ],
      },
      about: {
        title: "About Me",
        content:
          "I'm a passionate writer and thinker who loves to share insights, stories, and experiences. Through this blog, I aim to connect with readers and explore ideas that matter.",
        experience: "5+ Years",
        interests: [
          "Technology",
          "Writing",
          "Photography",
          "Travel",
          "Learning",
        ],
        socialLinks: {
          twitter: "https://twitter.com/username",
          instagram: "https://instagram.com/username",
          linkedin: "https://linkedin.com/in/username",
          youtube: "https://youtube.com/username",
        },
      },
      posts: [
        {
          title: "The Future of Web Development",
          excerpt:
            "Exploring the latest trends and technologies shaping the future of web development, from AI integration to progressive web apps.",
          date: "2024-01-15",
          category: "Technology",
          readTime: "5 min read",
          image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "John Doe",
          featured: true,
          views: 1250,
          comments: 23,
          tags: ["web development", "technology", "future"],
        },
        {
          title: "Building Better User Experiences",
          excerpt:
            "How to create intuitive and engaging user experiences that keep visitors coming back and drive conversions.",
          date: "2024-01-10",
          category: "Design",
          readTime: "7 min read",
          image:
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "John Doe",
          featured: false,
          views: 980,
          comments: 15,
          tags: ["UX design", "user experience", "design"],
        },
        {
          title: "The Art of Storytelling",
          excerpt:
            "Discover the power of storytelling in content creation and how it can transform your writing and connect with readers.",
          date: "2024-01-05",
          category: "Writing",
          readTime: "6 min read",
          image:
            "https://images.unsplash.com/photo-1486312338219-ce68e2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "John Doe",
          featured: true,
          views: 1450,
          comments: 31,
          tags: ["storytelling", "writing", "content"],
        },
        {
          title: "Sustainable Living Made Simple",
          excerpt:
            "Practical tips and strategies for living a more sustainable lifestyle without sacrificing convenience or comfort.",
          date: "2024-01-01",
          category: "Lifestyle",
          readTime: "8 min read",
          image:
            "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "John Doe",
          featured: false,
          views: 890,
          comments: 18,
          tags: ["sustainability", "lifestyle", "environment"],
        },
        {
          title: "Mastering Productivity in Remote Work",
          excerpt:
            "Essential strategies and tools to boost productivity while working from home and maintaining work-life balance.",
          date: "2023-12-28",
          category: "Productivity",
          readTime: "6 min read",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          author: "John Doe",
          featured: false,
          views: 1120,
          comments: 27,
          tags: ["productivity", "remote work", "work-life balance"],
        },
      ],
      categories: [
        { name: "Technology", count: 25, color: "blue" },
        { name: "Design", count: 18, color: "purple" },
        { name: "Writing", count: 32, color: "green" },
        { name: "Lifestyle", count: 15, color: "orange" },
        { name: "Productivity", count: 12, color: "indigo" },
      ],
      newsletter: {
        title: "Stay Updated",
        description:
          "Get the latest posts delivered straight to your inbox. No spam, just quality content.",
        subscribers: "2,500+ subscribers",
        benefits: [
          "Weekly digest of best posts",
          "Exclusive content and tips",
          "Early access to new articles",
          "No spam, unsubscribe anytime",
        ],
      },
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Web Developer",
          content:
            "This blog has been my go-to resource for staying updated with the latest in web development. The insights are always practical and actionable.",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Mike Chen",
          role: "UX Designer",
          content:
            "The design articles here are incredibly insightful. They've helped me improve my design process and create better user experiences.",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Emily Rodriguez",
          role: "Content Writer",
          content:
            "As a fellow writer, I appreciate the depth and quality of the content. The storytelling articles are particularly inspiring.",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
      ],
      featuredCategories: [
        {
          name: "Technology",
          description: "Latest trends and insights in tech",
          postCount: 12,
          color: "blue",
          icon: "💻",
        },
        {
          name: "Design",
          description: "Creative design inspiration and tips",
          postCount: 8,
          color: "purple",
          icon: "🎨",
        },
        {
          name: "Writing",
          description: "Tips and techniques for better writing",
          postCount: 15,
          color: "green",
          icon: "✍️",
        },
        {
          name: "Lifestyle",
          description: "Personal stories and life experiences",
          postCount: 6,
          color: "orange",
          icon: "🌟",
        },
      ],
      navigation: {
        logo: "My Blog",
        links: [
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Blog", href: "/blog" },
          { name: "Categories", href: "/categories" },
          { name: "Archive", href: "/archive" },
          { name: "Contact", href: "/contact" },
        ],
      },
      pages: {
        home: "Home page with hero section and latest posts",
        about: "About page with personal story and interests",
        blog: "Blog page with all posts and filtering",
        categories: "Categories page with topic organization",
        archive: "Archive page with post history",
        contact: "Contact page with form and information",
      },
      features: {
        blogGrid: "Responsive grid layout for blog posts",
        articleLayout: "Clean, readable article design",
        newsletterSignup: "Email subscription functionality",
        socialSharing: "Social media sharing buttons",
        searchFunctionality: "Search through blog posts",
        commentSystem: "Reader engagement and comments",
      },
      footer: {
        description:
          "A space for thoughts, ideas, and stories. Join me on this journey of discovery and growth.",
        quickLinks: [
          { name: "About", url: "/about" },
          { name: "Blog", url: "/blog" },
          { name: "Categories", url: "/categories" },
          { name: "Contact", url: "/contact" },
        ],
        socialLinks: {
          twitter: "https://twitter.com/username",
          instagram: "https://instagram.com/username",
          linkedin: "https://linkedin.com/in/username",
          youtube: "https://youtube.com/username",
        },
        copyright: "© 2024 My Blog. All rights reserved.",
      },
    },
  },
  restaurantWebsite,
  gymWebsite,
  // Law Office Website
  lawOfficeWebsite,
  // Portfolio Website
  portfolioWebsite,
  // Real Estate Website
  realEstateWebsite,
  // Medical Practice Website
  medicalPracticeWebsite,
  // Photography Studio Website
  photographyStudioWebsite,
];

export const PRICING_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "month",
    description: "Perfect for getting started",
    features: [
      "3 pages to publish",
      "Drag-and-Drop Page Builder",
      "Mobile Responsive",
      "Basic SEO",
      "Community Support",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    period: "month",
    description: "Best for growing businesses",
    features: [
      "Unlimited pages",
      "Advanced Page Builder",
      "Custom Domain",
      "Advanced SEO",
      "Analytics Dashboard",
      "Priority Support",
      "E-commerce Integration",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    period: "month",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "White-label Solution",
      "API Access",
      "Custom Integrations",
      "Dedicated Support",
      "Advanced Analytics",
      "Team Collaboration",
    ],
    popular: false,
  },
  // Law Office Website
  lawOfficeWebsite,
  // Portfolio Website
  portfolioWebsite,
  // Real Estate Website
  realEstateWebsite,
  // Medical Practice Website
  medicalPracticeWebsite,
  // Photography Studio Website
  photographyStudioWebsite,
];

export const FEATURES = [
  {
    name: "Drag & Drop Builder",
    icon: "🎨",
    category: "design",
    description: "Intuitive page builder with drag-and-drop functionality",
  },
  {
    name: "Mobile Responsive",
    icon: "📱",
    category: "responsive",
    description: "All templates are fully responsive and mobile-optimized",
  },
  {
    name: "SEO Optimized",
    icon: "🔍",
    category: "seo",
    description: "Built-in SEO tools to help your site rank higher",
  },
  {
    name: "Fast Loading",
    icon: "⚡",
    category: "performance",
    description: "Optimized for speed and performance",
  },
  {
    name: "Custom Domain",
    icon: "🌐",
    category: "domain",
    description: "Connect your own domain name",
  },
  {
    name: "Analytics",
    icon: "📊",
    category: "analytics",
    description: "Built-in analytics to track your site's performance",
  },
  {
    name: "E-commerce",
    icon: "🛒",
    category: "ecommerce",
    description: "Sell products and accept payments online",
  },
  {
    name: "Blog System",
    icon: "📝",
    category: "content",
    description: "Built-in blog system for content management",
  },
  {
    name: "Contact Forms",
    icon: "📧",
    category: "forms",
    description: "Easy-to-create contact and lead forms",
  },
  {
    name: "Social Integration",
    icon: "📱",
    category: "social",
    description: "Integrate with social media platforms",
  },
  {
    name: "Email Marketing",
    icon: "📬",
    category: "marketing",
    description: "Built-in email marketing tools",
  },
  {
    name: "Pricing Table",
    icon: "💰",
    category: "business",
    description: "Pricing plans and subscription options",
  },
];
