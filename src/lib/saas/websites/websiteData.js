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

// Blog Website Definition
export const blogWebsite = {
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
      interests: ["Technology", "Writing", "Photography", "Travel", "Learning"],
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
};

export const WEBSITES = [
  // Enhanced Functional Websites with Live Pages (Original versions removed)
  {
    id: "blog-website-enhanced",
    name: "Professional Blog",
    category: "blog",
    description:
      "Fully functional blog with live pages, contact forms, and admin dashboard",
    preview:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop",
    price: 0,
    isPremium: false,
    features: [
      {
        icon: "✅",
        title: "Live Home Page",
        description: "Working hero, categories, posts",
      },
      {
        icon: "✅",
        title: "Contact Form",
        description: "Database-integrated contact form",
      },
      {
        icon: "✅",
        title: "Admin Dashboard",
        description: "Manage blog posts",
      },
      { icon: "📝", title: "Newsletter", description: "Email subscription" },
      { icon: "👥", title: "Testimonials", description: "Customer reviews" },
    ],
    tags: ["blog", "functional", "live-demo", "contact-form", "admin"],
    livePages: {
      home: "/site/blog/home",
      contact: "/site/blog/contact",
      admin: "/admin/blog/posts",
    },
    fullWebsite: blogWebsite.fullWebsite,
  },
  {
    id: "restaurant-website-enhanced",
    name: "Elegant Restaurant",
    category: "restaurant",
    description:
      "Complete restaurant site with menu, reservations, and booking management",
    preview:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
    price: 199,
    isPremium: true,
    features: [
      {
        icon: "✅",
        title: "Live Menu Page",
        description: "Interactive menu with categories",
      },
      {
        icon: "✅",
        title: "Reservations",
        description: "Table booking system",
      },
      {
        icon: "✅",
        title: "Admin Dashboard",
        description: "Manage reservations",
      },
      {
        icon: "🍽️",
        title: "Menu Management",
        description: "Update dishes easily",
      },
      {
        icon: "📅",
        title: "Booking Calendar",
        description: "Track reservations",
      },
    ],
    tags: ["restaurant", "functional", "live-demo", "reservations", "admin"],
    livePages: {
      menu: "/site/restaurant/menu",
      reservations: "/site/restaurant/reservations",
      admin: "/admin/restaurant/reservations",
    },
    fullWebsite: restaurantWebsite.fullWebsite,
  },
  {
    id: "gym-website-enhanced",
    name: "Fitness Gym",
    category: "gym",
    description:
      "Fitness gym with programs, membership plans, and member management",
    preview:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
    price: 149,
    isPremium: false,
    features: [
      {
        icon: "✅",
        title: "Live Programs Page",
        description: "Training programs showcase",
      },
      {
        icon: "✅",
        title: "Membership Plans",
        description: "Comparison and pricing",
      },
      { icon: "✅", title: "Admin Dashboard", description: "Manage members" },
      { icon: "💪", title: "Member Tracking", description: "Track check-ins" },
      { icon: "📊", title: "Activity Stats", description: "Member analytics" },
    ],
    tags: ["gym", "fitness", "functional", "live-demo", "admin"],
    livePages: {
      programs: "/site/gym/programs",
      admin: "/admin/gym/members",
    },
    fullWebsite: gymWebsite.fullWebsite,
  },
  {
    id: "law-office-website-enhanced",
    name: "Law Office",
    category: "law",
    description:
      "Professional law firm with services, consultation booking, and case management",
    preview:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
    price: 299,
    isPremium: true,
    features: [
      {
        icon: "✅",
        title: "Live Services Page",
        description: "Practice areas display",
      },
      {
        icon: "✅",
        title: "Contact Form",
        description: "Free consultation booking",
      },
      { icon: "✅", title: "Admin Dashboard", description: "Manage cases" },
      { icon: "⚖️", title: "Case Tracking", description: "Track legal cases" },
      { icon: "👨‍💼", title: "Attorney Profiles", description: "Team showcase" },
    ],
    tags: ["law", "legal", "functional", "live-demo", "admin"],
    livePages: {
      services: "/site/law/services",
      contact: "/site/law/contact",
      admin: "/admin/law/cases",
    },
    fullWebsite: lawOfficeWebsite.fullWebsite,
  },
  {
    id: "portfolio-website-enhanced",
    name: "Creative Portfolio",
    category: "portfolio",
    description:
      "Creative portfolio with project gallery, filtering, and project management",
    preview:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    price: 149,
    isPremium: false,
    features: [
      {
        icon: "✅",
        title: "Live Portfolio Gallery",
        description: "Project showcase with filtering",
      },
      {
        icon: "✅",
        title: "Contact Form",
        description: "Project inquiry system",
      },
      { icon: "✅", title: "Admin Dashboard", description: "Manage projects" },
      {
        icon: "🎨",
        title: "Category Filtering",
        description: "Filter by type",
      },
      { icon: "📊", title: "Project Tracking", description: "Track inquiries" },
    ],
    tags: ["portfolio", "creative", "functional", "live-demo", "admin"],
    livePages: {
      portfolio: "/site/portfolio/portfolio",
      contact: "/site/portfolio/contact",
      admin: "/admin/portfolio/projects",
    },
    fullWebsite: portfolioWebsite.fullWebsite,
  },
  {
    id: "real-estate-website-enhanced",
    name: "Real Estate Agency",
    category: "real-estate",
    description:
      "Property listings with advanced search, filters, and property management",
    preview:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    price: 199,
    isPremium: true,
    features: [
      {
        icon: "✅",
        title: "Live Properties Page",
        description: "Property listings",
      },
      {
        icon: "✅",
        title: "Advanced Filters",
        description: "Search by price, type, beds",
      },
      {
        icon: "✅",
        title: "Admin Dashboard",
        description: "Manage properties",
      },
      {
        icon: "🏠",
        title: "Property Details",
        description: "Modal property views",
      },
      {
        icon: "📊",
        title: "Performance Metrics",
        description: "Views and inquiries",
      },
    ],
    tags: ["real-estate", "property", "functional", "live-demo", "admin"],
    livePages: {
      properties: "/site/real-estate/properties",
      admin: "/admin/real-estate/properties-admin",
    },
    fullWebsite: realEstateWebsite.fullWebsite,
  },
  {
    id: "medical-practice-website-enhanced",
    name: "Medical Practice",
    category: "medical",
    description:
      "Complete medical practice with services, doctors, appointments, and patient portal",
    preview:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    price: 249,
    isPremium: true,
    features: [
      {
        icon: "✅",
        title: "5 Live Pages",
        description: "Services, doctors, appointments, contact, portal",
      },
      {
        icon: "✅",
        title: "Appointment Booking",
        description: "Full booking system",
      },
      {
        icon: "✅",
        title: "Admin Dashboard",
        description: "Manage appointments",
      },
      {
        icon: "🏥",
        title: "Patient Portal",
        description: "Secure patient access",
      },
      {
        icon: "👨‍⚕️",
        title: "Doctor Profiles",
        description: "Physician showcase",
      },
    ],
    tags: ["medical", "healthcare", "functional", "live-demo", "admin"],
    livePages: {
      services: "/site/medical/services",
      doctors: "/site/medical/doctors",
      appointments: "/site/medical/appointments",
      contact: "/site/medical/contact",
      patientPortal: "/site/medical/patient-portal",
      admin: "/admin/medical/appointments",
    },
    fullWebsite: medicalPracticeWebsite.fullWebsite,
  },
  {
    id: "photography-studio-website-enhanced",
    name: "Photography Studio",
    category: "photography",
    description:
      "Photography studio with portfolio, services, booking system, and booking management",
    preview:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
    price: 179,
    isPremium: false,
    features: [
      {
        icon: "✅",
        title: "4 Live Pages",
        description: "Portfolio, services, booking, contact",
      },
      {
        icon: "✅",
        title: "Session Booking",
        description: "Photography booking system",
      },
      { icon: "✅", title: "Admin Dashboard", description: "Manage bookings" },
      {
        icon: "📸",
        title: "Photo Gallery",
        description: "Portfolio with filtering",
      },
      { icon: "📅", title: "Booking Calendar", description: "Track sessions" },
    ],
    tags: ["photography", "studio", "functional", "live-demo", "admin"],
    livePages: {
      portfolio: "/site/photography/portfolio",
      services: "/site/photography/services",
      booking: "/site/photography/booking",
      contact: "/site/photography/contact",
      admin: "/admin/photography/bookings",
    },
    fullWebsite: photographyStudioWebsite.fullWebsite,
  },
];

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 399,
    period: "one-time",
    monthlySupport: 39.99,
    description: "Perfect for getting started with your website",
    features: [
      "Complete Website Creation",
      "8 Professional Templates",
      "Drag-and-Drop Page Builder",
      "Mobile Responsive Design",
      "Basic SEO Optimization",
      "Subdomain (yoursite.elevare.com)",
      "Email Support",
      "Monthly Hosting & Support: €39.99",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 399,
    period: "one-time",
    monthlySupport: 39.99,
    description: "Best for growing businesses",
    features: [
      "Everything in Starter",
      "Custom Domain Setup (we configure for you)",
      "Advanced SEO Optimization",
      "Google Analytics Integration",
      "Social Media Integration",
      "Contact Forms & Lead Capture",
      "Priority Email Support",
      "Monthly Hosting & Support: €39.99",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: 599,
    period: "one-time",
    monthlySupport: 59.99,
    description: "For established businesses",
    features: [
      "Everything in Professional",
      "E-commerce Integration",
      "Payment Gateway Setup",
      "Advanced Analytics Dashboard",
      "A/B Testing Tools",
      "Content Management System",
      "Priority Phone Support",
      "Monthly Hosting & Support: €59.99",
    ],
    popular: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 999,
    period: "one-time",
    monthlySupport: 99.99,
    description: "For large organizations",
    features: [
      "Everything in Business",
      "White-label Solution",
      "API Access & Integrations",
      "Custom Development",
      "Dedicated Account Manager",
      "Advanced Security Features",
      "Team Collaboration Tools",
      "Monthly Hosting & Support: €99.99",
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

// ========================================
// EXTRA SERVICES
// ========================================

export const EXTRA_SERVICES = [
  {
    id: "domain-setup",
    name: "Custom Domain Setup",
    price: 49,
    description:
      "We'll configure your custom domain and set up DNS records for you",
    features: [
      "Domain registration assistance",
      "DNS configuration",
      "SSL certificate setup",
      "Email forwarding setup",
      "Complete domain migration",
    ],
    estimatedTime: "24-48 hours",
    popular: true,
  },
  {
    id: "seo-optimization",
    name: "Advanced SEO Optimization",
    price: 99,
    description: "Complete SEO setup to boost your search engine rankings",
    features: [
      "Keyword research & optimization",
      "Meta tags optimization",
      "Schema markup implementation",
      "Google Search Console setup",
      "Sitemap creation & submission",
      "Page speed optimization",
    ],
    estimatedTime: "3-5 business days",
    popular: true,
  },
  {
    id: "content-creation",
    name: "Professional Content Creation",
    price: 149,
    description: "Custom content written by professional copywriters",
    features: [
      "Homepage copywriting",
      "About page content",
      "Service/product descriptions",
      "Blog post (5 articles)",
      "SEO-optimized content",
      "Call-to-action optimization",
    ],
    estimatedTime: "5-7 business days",
    popular: false,
  },
  {
    id: "logo-design",
    name: "Custom Logo Design",
    price: 199,
    description: "Professional logo design for your brand",
    features: [
      "3 initial logo concepts",
      "2 rounds of revisions",
      "Multiple file formats (PNG, SVG, PDF)",
      "Brand guidelines document",
      "Business card design",
      "Social media kit",
    ],
    estimatedTime: "7-10 business days",
    popular: true,
  },
  {
    id: "ecommerce-setup",
    name: "E-commerce Store Setup",
    price: 299,
    description: "Complete online store with payment processing",
    features: [
      "Product catalog setup",
      "Payment gateway integration",
      "Shopping cart functionality",
      "Inventory management",
      "Order processing system",
      "Shipping configuration",
    ],
    estimatedTime: "5-7 business days",
    popular: false,
  },
  {
    id: "social-media-integration",
    name: "Social Media Integration",
    price: 79,
    description: "Connect your website with all your social media platforms",
    features: [
      "Social media feed integration",
      "Share buttons setup",
      "Social login options",
      "Social proof widgets",
      "Instagram gallery",
      "Facebook pixel setup",
    ],
    estimatedTime: "2-3 business days",
    popular: false,
  },
  {
    id: "analytics-setup",
    name: "Advanced Analytics Setup",
    price: 59,
    description: "Complete analytics and tracking setup",
    features: [
      "Google Analytics 4 setup",
      "Google Tag Manager configuration",
      "Conversion tracking",
      "Goal setup",
      "Custom dashboard creation",
      "Monthly analytics report",
    ],
    estimatedTime: "1-2 business days",
    popular: false,
  },
  {
    id: "website-maintenance",
    name: "Website Maintenance Package",
    price: 99,
    period: "monthly",
    description: "Ongoing maintenance and updates for your website",
    features: [
      "Monthly security updates",
      "Performance optimization",
      "Content updates (up to 5 pages)",
      "Backup management",
      "Uptime monitoring",
      "Priority support",
    ],
    estimatedTime: "Ongoing",
    popular: true,
  },
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
