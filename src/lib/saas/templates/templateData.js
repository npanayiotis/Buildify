export const TEMPLATE_CATEGORIES = [
  { id: "business", name: "Business", icon: "💼", color: "blue" },
  { id: "portfolio", name: "Portfolio", icon: "🎨", color: "purple" },
  { id: "ecommerce", name: "E-commerce", icon: "🛒", color: "green" },
  { id: "blog", name: "Blog", icon: "📝", color: "orange" },
  { id: "saas", name: "SaaS", icon: "💻", color: "indigo" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️", color: "red" },
];

export const SAAS_TEMPLATES = [
  {
    id: "modern-startup",
    name: "Modern Startup",
    category: "saas",
    description:
      "Clean, modern template perfect for tech startups and SaaS companies",
    preview: "/api/placeholder/400/300/Template+Preview/667eea/ffffff",
    price: 0,
    isPremium: false,
    features: [
      "Hero Section",
      "Features Grid",
      "Testimonials",
      "Pricing",
      "Contact",
    ],
    tags: ["modern", "startup", "tech", "saas"],
    fullContent: {
      hero: {
        title: "Build Something Amazing",
        subtitle:
          "The easiest way to create stunning websites for your business. No coding required, just drag and drop.",
        buttonText: "Get Started Free",
        buttonSecondary: "Watch Demo",
        backgroundImage:
          "/api/placeholder/1200/600/Hero+Background/667eea/ffffff",
      },
      features: [
        {
          icon: "⚡",
          title: "Lightning Fast",
          description:
            "Deploy your website in seconds with our optimized templates and CDN delivery",
        },
        {
          icon: "🎨",
          title: "Beautiful Design",
          description:
            "Professional templates designed by industry experts with modern aesthetics",
        },
        {
          icon: "📱",
          title: "Mobile Ready",
          description:
            "All templates are fully responsive and mobile-optimized for all devices",
        },
        {
          icon: "🔧",
          title: "Easy Customization",
          description:
            "Drag and drop editor with live preview for instant customization",
        },
        {
          icon: "🚀",
          title: "SEO Optimized",
          description:
            "Built-in SEO features to help your website rank higher in search results",
        },
        {
          icon: "💬",
          title: "24/7 Support",
          description: "Round-the-clock customer support to help you succeed",
        },
      ],
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "CEO, TechCorp",
          content:
            "This platform helped us launch our website in just 2 days. Amazing experience!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
        {
          name: "Mike Chen",
          role: "Founder, StartupXYZ",
          content:
            "The templates are beautiful and the customization options are endless. Highly recommended!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
        {
          name: "Emily Davis",
          role: "Marketing Director",
          content:
            "Finally, a website builder that doesn't require technical skills. Perfect for our team!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
      ],
      pricing: {
        title: "Simple, Transparent Pricing",
        subtitle: "Choose the perfect plan for your needs. No hidden fees.",
        plans: [
          {
            name: "Starter",
            price: "$9",
            period: "month",
            features: [
              "5 Pages",
              "Basic Templates",
              "Email Support",
              "Mobile Responsive",
            ],
            popular: false,
          },
          {
            name: "Professional",
            price: "$29",
            period: "month",
            features: [
              "Unlimited Pages",
              "Premium Templates",
              "Priority Support",
              "Custom Domain",
              "Analytics",
            ],
            popular: true,
          },
          {
            name: "Enterprise",
            price: "$99",
            period: "month",
            features: [
              "Everything in Pro",
              "White Label",
              "API Access",
              "Dedicated Support",
              "Custom Integrations",
            ],
            popular: false,
          },
        ],
      },
      stats: [
        { number: "10,000+", label: "Happy Customers" },
        { number: "99.9%", label: "Uptime" },
        { number: "24/7", label: "Support" },
        { number: "50+", label: "Templates" },
      ],
    },
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    category: "portfolio",
    description:
      "Showcase your creative work with this stunning portfolio template",
    preview: "/api/placeholder/400/300/Template+Preview/667eea/ffffff",
    price: 29,
    isPremium: true,
    features: [
      "Portfolio Grid",
      "About Section",
      "Contact Form",
      "Testimonials",
    ],
    tags: ["portfolio", "creative", "design", "art"],
    fullContent: {
      hero: {
        title: "Creative Designer",
        subtitle: "Bringing ideas to life through design and innovation",
        buttonText: "View My Work",
        buttonSecondary: "Get In Touch",
        backgroundImage:
          "/api/placeholder/1200/600/Hero+Background/667eea/ffffff",
      },
      about: {
        title: "About Me",
        content:
          "I'm a passionate designer with over 5 years of experience creating beautiful, functional designs that tell a story. I specialize in UI/UX design, branding, and digital experiences that connect with users on an emotional level.",
        skills: [
          "UI/UX Design",
          "Branding",
          "Web Design",
          "Illustration",
          "Photography",
        ],
        experience: "5+ Years Experience",
      },
      portfolio: [
        {
          title: "E-commerce Redesign",
          image: "/api/placeholder/400/300/Project/cccccc/ffffff",
          category: "Web Design",
          description:
            "Complete redesign of an online store with improved user experience",
        },
        {
          title: "Brand Identity",
          image: "/api/placeholder/400/300/Project/cccccc/ffffff",
          category: "Branding",
          description: "Modern brand identity for a tech startup",
        },
        {
          title: "Mobile App UI",
          image: "/api/placeholder/400/300/Project/cccccc/ffffff",
          category: "UI/UX",
          description: "Intuitive mobile app interface design",
        },
        {
          title: "Restaurant Website",
          image: "/api/placeholder/400/300/Project/cccccc/ffffff",
          category: "Web Design",
          description: "Elegant website design for a fine dining restaurant",
        },
        {
          title: "Logo Design",
          image: "/api/placeholder/400/300/Project/cccccc/ffffff",
          category: "Branding",
          description: "Minimalist logo design for a creative agency",
        },
        {
          title: "Dashboard Design",
          image: "/api/placeholder/400/300/Project/cccccc/ffffff",
          category: "UI/UX",
          description: "Clean and functional dashboard interface",
        },
      ],
      testimonials: [
        {
          name: "Alex Thompson",
          role: "CEO, Digital Agency",
          content:
            "Working with this designer was a game-changer for our brand. The attention to detail is incredible!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
        {
          name: "Maria Rodriguez",
          role: "Marketing Director",
          content:
            "The portfolio speaks for itself. Every project is beautifully executed and user-focused.",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
      ],
      services: [
        {
          icon: "🎨",
          title: "UI/UX Design",
          description: "Creating intuitive and beautiful user experiences",
        },
        {
          icon: "🏷️",
          title: "Brand Identity",
          description: "Developing memorable brand identities that stand out",
        },
        {
          icon: "💻",
          title: "Web Design",
          description: "Responsive and modern website designs",
        },
      ],
    },
  },
  {
    id: "restaurant-elegant",
    name: "Elegant Restaurant",
    category: "restaurant",
    description:
      "Beautiful restaurant template with menu showcase and reservation system",
    preview: "/api/placeholder/400/300/Template+Preview/667eea/ffffff",
    price: 39,
    isPremium: true,
    features: ["Menu Display", "Reservations", "Gallery", "Contact"],
    tags: ["restaurant", "food", "elegant", "menu"],
    fullContent: {
      hero: {
        title: "Fine Dining Experience",
        subtitle:
          "Exceptional cuisine in an elegant atmosphere. Where culinary artistry meets warm hospitality.",
        buttonText: "Make Reservation",
        buttonSecondary: "View Menu",
        backgroundImage:
          "/api/placeholder/1200/600/Hero+Background/667eea/ffffff",
      },
      about: {
        title: "About Our Restaurant",
        content:
          "Established in 2015, our restaurant has been serving exceptional cuisine in an elegant atmosphere. Our chef brings over 20 years of experience from world-renowned kitchens, creating dishes that celebrate local ingredients with international flair.",
        specialties: [
          "Farm-to-Table",
          "Wine Pairing",
          "Private Dining",
          "Chef's Table",
        ],
      },
      menu: [
        {
          name: "Truffle Risotto",
          price: "$28",
          description:
            "Creamy Arborio rice with black truffle and aged Parmesan",
          image: "/api/placeholder/200/150/Menu+Item/cccccc/ffffff",
          category: "Main Course",
        },
        {
          name: "Wagyu Beef Tenderloin",
          price: "$45",
          description:
            "Premium Wagyu beef with seasonal vegetables and red wine reduction",
          image: "/api/placeholder/200/150/Menu+Item/cccccc/ffffff",
          category: "Main Course",
        },
        {
          name: "Lobster Bisque",
          price: "$18",
          description:
            "Rich and creamy lobster soup with cognac and fresh herbs",
          image: "/api/placeholder/200/150/Menu+Item/cccccc/ffffff",
          category: "Appetizer",
        },
        {
          name: "Chocolate Soufflé",
          price: "$12",
          description: "Warm chocolate soufflé with vanilla bean ice cream",
          image: "/api/placeholder/200/150/Menu+Item/cccccc/ffffff",
          category: "Dessert",
        },
      ],
      gallery: [
        "/api/placeholder/300/200/Gallery/cccccc/ffffff",
        "/api/placeholder/300/200/Gallery/cccccc/ffffff",
        "/api/placeholder/300/200/Gallery/cccccc/ffffff",
        "/api/placeholder/300/200/Gallery/cccccc/ffffff",
        "/api/placeholder/300/200/Gallery/cccccc/ffffff",
        "/api/placeholder/300/200/Gallery/cccccc/ffffff",
      ],
      testimonials: [
        {
          name: "Robert Johnson",
          role: "Food Critic",
          content:
            "The finest dining experience in the city. Every dish is a masterpiece!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
        {
          name: "Sarah Wilson",
          role: "Regular Customer",
          content:
            "The atmosphere is perfect for special occasions. The food never disappoints.",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
      ],
      contact: {
        address: "123 Fine Dining Street, Culinary District",
        phone: "+1 (555) 123-4567",
        email: "info@elegantrestaurant.com",
        hours: "Tue-Sun: 6:00 PM - 11:00 PM",
      },
    },
  },
  {
    id: "fashion-boutique",
    name: "Fashion Boutique",
    category: "ecommerce",
    description: "Stylish e-commerce template for fashion and lifestyle brands",
    preview: "/api/placeholder/400/300/Template+Preview/667eea/ffffff",
    price: 49,
    isPremium: true,
    features: ["Product Grid", "Shopping Cart", "Checkout", "Product Details"],
    tags: ["fashion", "ecommerce", "boutique", "style"],
    fullContent: {
      hero: {
        title: "Discover Your Style",
        subtitle:
          "Curated fashion pieces that express your unique personality. Shop the latest trends from top designers.",
        buttonText: "Shop Collection",
        buttonSecondary: "View Lookbook",
        backgroundImage:
          "/api/placeholder/1200/600/Hero+Background/667eea/ffffff",
      },
      about: {
        title: "About Our Boutique",
        content:
          "We curate the finest fashion pieces from emerging and established designers worldwide. Our mission is to help you express your unique style through carefully selected garments and accessories.",
        values: ["Quality", "Style", "Sustainability", "Personal Service"],
      },
      products: [
        {
          name: "Elegant Evening Dress",
          price: 299,
          image: "/api/placeholder/300/400/Product/cccccc/ffffff",
          category: "Dresses",
          description:
            "Sophisticated black evening dress perfect for special occasions",
          inStock: true,
          sizes: ["XS", "S", "M", "L", "XL"],
        },
        {
          name: "Designer Handbag",
          price: 199,
          image: "/api/placeholder/300/400/Product/cccccc/ffffff",
          category: "Accessories",
          description: "Luxury leather handbag with gold hardware",
          inStock: true,
          colors: ["Black", "Brown", "Tan"],
        },
        {
          name: "Silk Blouse",
          price: 89,
          image: "/api/placeholder/300/400/Product/cccccc/ffffff",
          category: "Tops",
          description: "Premium silk blouse with delicate patterns",
          inStock: true,
          sizes: ["XS", "S", "M", "L"],
        },
        {
          name: "Wool Coat",
          price: 399,
          image: "/api/placeholder/300/400/Product/cccccc/ffffff",
          category: "Outerwear",
          description: "Classic wool coat for the modern professional",
          inStock: false,
          sizes: ["S", "M", "L", "XL"],
        },
      ],
      testimonials: [
        {
          name: "Jessica Martinez",
          role: "Fashion Blogger",
          content:
            "The quality and style of pieces here is unmatched. My go-to boutique for special occasions!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
        {
          name: "Amanda Chen",
          role: "Stylist",
          content:
            "I always find unique pieces here that help my clients stand out. Excellent curation!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
      ],
      services: [
        {
          icon: "👗",
          title: "Personal Styling",
          description: "One-on-one styling sessions with our fashion experts",
        },
        {
          icon: "🚚",
          title: "Free Shipping",
          description: "Complimentary shipping on orders over $100",
        },
        {
          icon: "💳",
          title: "Easy Returns",
          description: "30-day return policy for your peace of mind",
        },
      ],
    },
  },
  {
    id: "personal-blog",
    name: "Personal Blog",
    category: "blog",
    description:
      "Clean and minimal blog template for writers and content creators",
    preview: "/api/placeholder/400/300/Template+Preview/667eea/ffffff",
    price: 0,
    isPremium: false,
    features: ["Blog Grid", "Article Layout", "Sidebar", "Comments"],
    tags: ["blog", "writing", "minimal", "clean"],
    fullContent: {
      hero: {
        title: "Welcome to My Blog",
        subtitle:
          "Thoughts, stories, and insights from my journey. Join me as I share experiences, lessons learned, and discoveries along the way.",
        buttonText: "Read Latest Post",
        buttonSecondary: "Subscribe",
        backgroundImage:
          "/api/placeholder/1200/600/Hero+Background/667eea/ffffff",
      },
      about: {
        title: "About Me",
        content:
          "I'm a passionate writer, traveler, and lifelong learner. Through this blog, I share my experiences, insights, and the lessons I've learned along my journey. Join me as we explore life, creativity, and everything in between.",
        interests: [
          "Travel",
          "Photography",
          "Cooking",
          "Reading",
          "Technology",
        ],
      },
      posts: [
        {
          title: "The Art of Slow Living",
          excerpt:
            "In our fast-paced world, finding moments of stillness and intentionality can transform our daily experience...",
          date: "2024-01-15",
          category: "Lifestyle",
          readTime: "5 min read",
          image: "/api/placeholder/400/250/Blog+Post/cccccc/ffffff",
        },
        {
          title: "Lessons from a Year of Travel",
          excerpt:
            "After visiting 12 countries in the past year, here are the most valuable lessons I've learned...",
          date: "2024-01-10",
          category: "Travel",
          readTime: "8 min read",
          image: "/api/placeholder/400/250/Blog+Post/cccccc/ffffff",
        },
        {
          title: "Building Better Habits",
          excerpt:
            "How small changes in daily routines can lead to significant personal growth and fulfillment...",
          date: "2024-01-05",
          category: "Personal Growth",
          readTime: "6 min read",
          image: "/api/placeholder/400/250/Blog+Post/cccccc/ffffff",
        },
        {
          title: "The Power of Mindfulness",
          excerpt:
            "Exploring meditation, breathing techniques, and present-moment awareness for better mental health...",
          date: "2024-01-01",
          category: "Wellness",
          readTime: "7 min read",
          image: "/api/placeholder/400/250/Blog+Post/cccccc/ffffff",
        },
      ],
      categories: [
        "Lifestyle",
        "Travel",
        "Personal Growth",
        "Wellness",
        "Technology",
        "Photography",
      ],
      newsletter: {
        title: "Stay Updated",
        description:
          "Get notified when I publish new posts. No spam, just quality content delivered to your inbox.",
        placeholder: "Enter your email address",
      },
    },
  },
  {
    id: "business-professional",
    name: "Business Professional",
    category: "business",
    description:
      "Professional template for corporate websites and business services",
    preview: "/api/placeholder/400/300/Template+Preview/667eea/ffffff",
    price: 35,
    isPremium: true,
    features: ["Services", "Team", "About", "Contact"],
    tags: ["business", "professional", "corporate", "services"],
    fullContent: {
      hero: {
        title: "Professional Services",
        subtitle:
          "Excellence in every project we deliver. Trusted by leading companies worldwide for innovative solutions and exceptional results.",
        buttonText: "Get Quote",
        buttonSecondary: "View Portfolio",
        backgroundImage:
          "/api/placeholder/1200/600/Hero+Background/667eea/ffffff",
      },
      about: {
        title: "About Our Company",
        content:
          "With over 15 years of experience in the industry, we provide comprehensive business solutions that drive growth and success. Our team of experts combines deep industry knowledge with cutting-edge technology to deliver exceptional results for our clients.",
        mission:
          "To empower businesses with innovative solutions that drive sustainable growth and success.",
        founded: "Established 2008",
        clients: "500+ Satisfied Clients",
      },
      services: [
        {
          title: "Business Consulting",
          description:
            "Strategic business consulting to optimize operations and drive growth",
          icon: "💼",
          features: [
            "Strategy Development",
            "Process Optimization",
            "Market Analysis",
            "Risk Assessment",
          ],
        },
        {
          title: "Software Development",
          description:
            "Custom software solutions tailored to your business needs",
          icon: "💻",
          features: [
            "Web Applications",
            "Mobile Apps",
            "Cloud Solutions",
            "System Integration",
          ],
        },
        {
          title: "Digital Marketing",
          description:
            "Comprehensive digital marketing strategies to boost your online presence",
          icon: "📈",
          features: [
            "SEO Optimization",
            "Social Media",
            "Content Marketing",
            "PPC Campaigns",
          ],
        },
        {
          title: "Data Analytics",
          description:
            "Transform your data into actionable insights for better decision making",
          icon: "📊",
          features: [
            "Data Visualization",
            "Predictive Analytics",
            "Business Intelligence",
            "Reporting",
          ],
        },
      ],
      team: [
        {
          name: "Sarah Johnson",
          role: "CEO & Founder",
          image: "/api/placeholder/200/200/Team+Member/cccccc/ffffff",
          bio: "15+ years of experience in business strategy and technology consulting",
          linkedin: "https://linkedin.com/in/sarahjohnson",
        },
        {
          name: "Michael Chen",
          role: "CTO",
          image: "/api/placeholder/200/200/Team+Member/cccccc/ffffff",
          bio: "Expert in software architecture and emerging technologies",
          linkedin: "https://linkedin.com/in/michaelchen",
        },
        {
          name: "Emily Rodriguez",
          role: "Head of Marketing",
          image: "/api/placeholder/200/200/Team+Member/cccccc/ffffff",
          bio: "Digital marketing strategist with a track record of successful campaigns",
          linkedin: "https://linkedin.com/in/emilyrodriguez",
        },
      ],
      testimonials: [
        {
          name: "David Thompson",
          role: "CEO, TechCorp",
          content:
            "Their consulting services helped us increase our revenue by 40% in just six months. Highly recommended!",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
        {
          name: "Lisa Park",
          role: "Operations Director",
          content:
            "Professional, reliable, and results-driven. They delivered exactly what they promised.",
          avatar: "/api/placeholder/60/60/Avatar/cccccc/ffffff",
          rating: 5,
        },
      ],
      contact: {
        address: "123 Business District, Corporate Plaza, Suite 500",
        phone: "+1 (555) 123-4567",
        email: "info@businesspro.com",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      },
    },
  },
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
      "50+ Widgets",
      "10+ Ready-made Templates",
      "Community Support",
      "Free Stock Images",
    ],
    limitations: {
      pages: 3,
      templates: "basic",
      support: "community",
    },
    popular: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: 9.99,
    period: "month",
    description: "Great for small businesses",
    features: [
      "15 pages to publish",
      "Everything in Free plan",
      "Premium Templates",
      "Priority Support",
      "Custom Domain",
      "Analytics Dashboard",
    ],
    limitations: {
      pages: 15,
      templates: "premium",
      support: "priority",
    },
    popular: true,
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 19.99,
    period: "month",
    description: "Perfect for growing businesses",
    features: [
      "50 pages to publish",
      "Everything in Starter plan",
      "Advanced Analytics",
      "E-commerce Features",
      "API Access",
      "White-label Options",
    ],
    limitations: {
      pages: 50,
      templates: "all",
      support: "priority",
    },
    popular: false,
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 29.99,
    period: "month",
    description: "For agencies and enterprises",
    features: [
      "Unlimited pages",
      "Everything in Advanced plan",
      "Dedicated Support Manager",
      "Custom Integrations",
      "Team Collaboration",
      "Advanced Security",
    ],
    limitations: {
      pages: "unlimited",
      templates: "all",
      support: "dedicated",
    },
    popular: false,
  },
];

export const WIDGET_TYPES = [
  {
    id: "hero",
    name: "Hero Section",
    icon: "🎯",
    category: "layout",
    description: "Eye-catching header section with title and call-to-action",
  },
  {
    id: "text",
    name: "Text Block",
    icon: "📝",
    category: "content",
    description: "Rich text editor for paragraphs and content",
  },
  {
    id: "image",
    name: "Image",
    icon: "🖼️",
    category: "media",
    description: "Image gallery and single image display",
  },
  {
    id: "button",
    name: "Button",
    icon: "🔘",
    category: "interactive",
    description: "Call-to-action buttons with custom styling",
  },
  {
    id: "features",
    name: "Features Grid",
    icon: "⭐",
    category: "layout",
    description: "Grid layout for showcasing features or services",
  },
  {
    id: "testimonials",
    name: "Testimonials",
    icon: "💬",
    category: "social",
    description: "Customer testimonials and reviews",
  },
  {
    id: "contact",
    name: "Contact Form",
    icon: "📧",
    category: "forms",
    description: "Contact form with email integration",
  },
  {
    id: "pricing",
    name: "Pricing Table",
    icon: "💰",
    category: "business",
    description: "Pricing plans and subscription options",
  },
];

export const DEFAULT_TEMPLATE_CONFIG = {
  layout: {
    containerWidth: "1200px",
    backgroundColor: "#ffffff",
    padding: "0",
    margin: "0 auto",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    headingSize: "2rem",
    bodySize: "1rem",
    lineHeight: "1.6",
  },
  colors: {
    primary: "#3B82F6",
    secondary: "#6B7280",
    accent: "#F59E0B",
    background: "#FFFFFF",
    text: "#1F2937",
  },
  spacing: {
    sectionPadding: "80px 0",
    elementMargin: "20px",
    borderRadius: "8px",
  },
};
