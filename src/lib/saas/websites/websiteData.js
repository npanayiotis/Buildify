export const WEBSITE_CATEGORIES = [
  { id: "blog", name: "Blog", icon: "📝", color: "orange" },
  { id: "restaurant", name: "Restaurant", icon: "🍽️", color: "red" },
  { id: "gym", name: "Gym", icon: "💪", color: "green" },
];

export const WEBSITES = [
  {
    id: "professional-blog-website",
    name: "Professional Blog",
    category: "blog",
    description:
      "Modern blog website perfect for writers, content creators, and thought leaders",
    preview: "/api/preview/professional-blog-website",
    price: 0,
    isPremium: false,
    features: [
      "Blog Grid",
      "Article Layout",
      "Newsletter Signup",
      "About Section",
      "Social Links",
      "Search Functionality",
    ],
    tags: ["blog", "writing", "content", "modern"],
    fullWebsite: {
      hero: {
        title: "Welcome to My Blog",
        subtitle:
          "Thoughts, stories, and insights from my journey. Join me as I share experiences, lessons learned, and discoveries along the way.",
        buttonText: "Read Latest Posts",
        buttonSecondary: "Subscribe",
        backgroundImage: "/blog_hero.jpg",
        overlay: "rgba(0, 0, 0, 0.4)",
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
        experience: "5+ Years Writing",
        socialLinks: {
          twitter: "https://twitter.com/username",
          instagram: "https://instagram.com/username",
          linkedin: "https://linkedin.com/in/username",
        },
      },
      posts: [
        {
          title: "The Art of Slow Living",
          excerpt:
            "In our fast-paced world, finding moments of stillness and intentionality can transform our daily experience. Here's how to embrace a slower, more mindful approach to life.",
          date: "2024-01-15",
          category: "Lifestyle",
          readTime: "5 min read",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: true,
        },
        {
          title: "Lessons from a Year of Travel",
          excerpt:
            "After visiting 12 countries in the past year, here are the most valuable lessons I've learned about culture, connection, and personal growth.",
          date: "2024-01-10",
          category: "Travel",
          readTime: "8 min read",
          image:
            "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
        },
        {
          title: "Building Better Habits",
          excerpt:
            "How small changes in daily routines can lead to significant personal growth and fulfillment. A practical guide to habit formation.",
          date: "2024-01-05",
          category: "Personal Growth",
          readTime: "6 min read",
          image:
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
        },
        {
          title: "The Power of Mindfulness",
          excerpt:
            "Exploring meditation, breathing techniques, and present-moment awareness for better mental health and overall well-being.",
          date: "2024-01-01",
          category: "Wellness",
          readTime: "7 min read",
          image:
            "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
        },
        {
          title: "Digital Minimalism",
          excerpt:
            "How to reclaim your time and attention in an increasingly connected world. Practical strategies for mindful technology use.",
          date: "2023-12-28",
          category: "Technology",
          readTime: "6 min read",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
        },
        {
          title: "Creative Photography Tips",
          excerpt:
            "Simple techniques to improve your photography skills and capture more meaningful moments in your daily life.",
          date: "2023-12-20",
          category: "Photography",
          readTime: "5 min read",
          image:
            "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
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
        subscribers: "2,500+ subscribers",
      },
      stats: [
        { number: "50+", label: "Articles Published" },
        { number: "25K+", label: "Monthly Readers" },
        { number: "4.9", label: "Average Rating" },
        { number: "100+", label: "Countries Reached" },
      ],
      navigation: {
        home: "Home",
        about: "About",
        blog: "Blog",
        categories: "Categories",
        archive: "Archive",
        search: "Search",
        newsletter: "Newsletter",
        contact: "Contact",
      },
      pages: {
        home: "/blog/home",
        posts: "/blog/posts",
        categories: "/blog/categories",
        archive: "/blog/archive",
        search: "/blog/search",
        newsletter: "/blog/newsletter",
        admin: "/admin/blog",
      },
      features: {
        search: "Advanced search functionality",
        categories: "Organized by topics",
        archive: "Browse by date",
        newsletter: "Email subscriptions",
        comments: "Interactive comments",
        admin: "Content management",
        responsive: "Mobile-friendly design",
        seo: "SEO optimized",
      },
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Reader",
          content:
            "Your blog has been a constant source of inspiration. The way you share personal experiences while providing practical insights is truly remarkable.",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
        },
        {
          name: "Michael Chen",
          role: "Fellow Blogger",
          content:
            "I've been following your journey for over a year now. Your writing style and the depth of your content have helped me grow both personally and professionally.",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
        },
        {
          name: "Emily Rodriguez",
          role: "Subscriber",
          content:
            "Every post you publish adds value to my day. Thank you for sharing your wisdom and making complex topics so accessible.",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
          rating: 5,
        },
      ],
      featuredCategories: [
        {
          name: "Lifestyle",
          description: "Tips for living a more intentional and fulfilling life",
          postCount: 15,
          color: "bg-pink-500",
          icon: "🌱",
        },
        {
          name: "Travel",
          description: "Adventures, destinations, and travel insights",
          postCount: 12,
          color: "bg-blue-500",
          icon: "✈️",
        },
        {
          name: "Personal Growth",
          description: "Self-improvement and development strategies",
          postCount: 18,
          color: "bg-green-500",
          icon: "🌱",
        },
        {
          name: "Technology",
          description: "Digital tools and tech insights for modern living",
          postCount: 8,
          color: "bg-purple-500",
          icon: "💻",
        },
      ],
      footer: {
        description:
          "Sharing thoughts, stories, and insights to inspire and connect with readers around the world.",
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
  {
    id: "elegant-restaurant-website",
    name: "Elegant Restaurant",
    category: "restaurant",
    description:
      "Beautiful restaurant website with menu showcase, reservations, and elegant design",
    preview: "/api/preview/elegant-restaurant-website",
    price: 49,
    isPremium: true,
    features: [
      "Menu Display",
      "Online Reservations",
      "Photo Gallery",
      "Contact Information",
      "Location Map",
      "Reviews Section",
    ],
    tags: ["restaurant", "food", "elegant", "fine-dining"],
    fullWebsite: {
      hero: {
        title: "Fine Dining Experience",
        subtitle:
          "Exceptional cuisine in an elegant atmosphere. Where culinary artistry meets warm hospitality.",
        buttonText: "Make Reservation",
        buttonSecondary: "View Menu",
        backgroundImage:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
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
        experience: "Established 2015",
        awards: "Michelin Recommended",
      },
      menu: [
        {
          name: "Truffle Risotto",
          price: "$28",
          description:
            "Creamy Arborio rice with black truffle and aged Parmesan",
          image:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Main Course",
          popular: true,
        },
        {
          name: "Wagyu Beef Tenderloin",
          price: "$45",
          description:
            "Premium Wagyu beef with seasonal vegetables and red wine reduction",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Main Course",
          popular: false,
        },
        {
          name: "Lobster Bisque",
          price: "$18",
          description:
            "Rich and creamy lobster soup with cognac and fresh herbs",
          image:
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Appetizer",
          popular: true,
        },
        {
          name: "Chocolate Soufflé",
          price: "$12",
          description: "Warm chocolate soufflé with vanilla bean ice cream",
          image:
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Dessert",
          popular: false,
        },
        {
          name: "Seared Scallops",
          price: "$24",
          description:
            "Pan-seared scallops with cauliflower puree and truffle oil",
          image:
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Appetizer",
          popular: true,
        },
        {
          name: "Rack of Lamb",
          price: "$38",
          description: "Herb-crusted rack of lamb with roasted vegetables",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Main Course",
          popular: false,
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      ],
      testimonials: [
        {
          name: "Robert Johnson",
          role: "Food Critic",
          content:
            "The finest dining experience in the city. Every dish is a masterpiece!",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Sarah Wilson",
          role: "Regular Customer",
          content:
            "The atmosphere is perfect for special occasions. The food never disappoints.",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Michael Chen",
          role: "Wine Enthusiast",
          content:
            "Exceptional wine selection and perfect food pairings. A true culinary experience.",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
      ],
      contact: {
        address: "123 Fine Dining Street, Culinary District, NY 10001",
        phone: "+1 (555) 123-4567",
        email: "info@elegantrestaurant.com",
        hours: "Tue-Sun: 6:00 PM - 11:00 PM",
        reservations: "OpenTable",
      },
      stats: [
        { number: "8+", label: "Years Experience" },
        { number: "4.9", label: "Average Rating" },
        { number: "500+", label: "Happy Customers" },
        { number: "50+", label: "Award-Winning Dishes" },
      ],
    },
  },
  {
    id: "fitness-gym-website",
    name: "Fitness Gym",
    category: "gym",
    description:
      "Modern gym website with membership plans, class schedules, and fitness tracking",
    preview: "/api/preview/fitness-gym-website",
    price: 39,
    isPremium: true,
    features: [
      "Membership Plans",
      "Class Schedules",
      "Trainer Profiles",
      "Fitness Programs",
      "Online Booking",
      "Progress Tracking",
    ],
    tags: ["gym", "fitness", "health", "training"],
    fullWebsite: {
      hero: {
        title: "Transform Your Body",
        subtitle:
          "Join our community of fitness enthusiasts and achieve your health goals with our state-of-the-art equipment and expert trainers.",
        buttonText: "Start Free Trial",
        buttonSecondary: "View Programs",
        backgroundImage:
          "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      },
      about: {
        title: "About Our Gym",
        content:
          "We're more than just a gym - we're a community dedicated to helping you achieve your fitness goals. With state-of-the-art equipment, expert trainers, and a supportive environment, we provide everything you need to succeed.",
        values: ["Community", "Excellence", "Support", "Results"],
        experience: "10+ Years Experience",
        members: "5,000+ Active Members",
      },
      programs: [
        {
          name: "Personal Training",
          description:
            "One-on-one sessions with certified trainers to help you reach your specific goals",
          icon: "💪",
          duration: "60 minutes",
          price: "$80/session",
          features: [
            "Customized workout plans",
            "Nutrition guidance",
            "Progress tracking",
            "Flexible scheduling",
          ],
        },
        {
          name: "Group Classes",
          description:
            "High-energy group workouts that combine cardio, strength, and flexibility training",
          icon: "🏃‍♀️",
          duration: "45 minutes",
          price: "$25/class",
          features: [
            "Variety of class types",
            "Experienced instructors",
            "Motivating atmosphere",
            "All fitness levels welcome",
          ],
        },
        {
          name: "Nutrition Coaching",
          description:
            "Personalized nutrition plans and guidance to complement your fitness journey",
          icon: "🥗",
          duration: "30 minutes",
          price: "$60/session",
          features: [
            "Custom meal plans",
            "Macro tracking",
            "Grocery shopping lists",
            "Lifestyle coaching",
          ],
        },
        {
          name: "Recovery & Wellness",
          description:
            "Specialized programs for injury prevention, recovery, and overall wellness",
          icon: "🧘‍♀️",
          duration: "45 minutes",
          price: "$40/session",
          features: [
            "Massage therapy",
            "Stretching sessions",
            "Meditation classes",
            "Injury prevention",
          ],
        },
      ],
      trainers: [
        {
          name: "Sarah Johnson",
          role: "Head Trainer",
          image:
            "https://images.unsplash.com/photo-1594824388852-7a6c8a4b8b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          bio: "Certified personal trainer with 8+ years of experience in strength training and nutrition",
          specialties: ["Strength Training", "Weight Loss", "Nutrition"],
          certifications: ["NASM-CPT", "Precision Nutrition"],
        },
        {
          name: "Mike Rodriguez",
          role: "Fitness Coach",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          bio: "Former professional athlete turned fitness coach specializing in functional training",
          specialties: [
            "Functional Training",
            "Athletic Performance",
            "Injury Prevention",
          ],
          certifications: ["ACSM-CPT", "Functional Movement Screen"],
        },
        {
          name: "Emily Chen",
          role: "Yoga Instructor",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          bio: "Certified yoga instructor with expertise in Vinyasa, Hatha, and restorative yoga",
          specialties: ["Yoga", "Flexibility", "Mindfulness", "Stress Relief"],
          certifications: ["RYT-500", "Yin Yoga Certification"],
        },
      ],
      membership: {
        title: "Choose Your Plan",
        subtitle:
          "Flexible membership options to fit your lifestyle and budget",
        plans: [
          {
            name: "Basic",
            price: "$29",
            period: "month",
            features: [
              "Gym access",
              "Locker room",
              "Basic equipment",
              "Community support",
            ],
            popular: false,
          },
          {
            name: "Premium",
            price: "$49",
            period: "month",
            features: [
              "Everything in Basic",
              "Group classes",
              "Sauna access",
              "Guest passes",
              "Nutrition consultation",
            ],
            popular: true,
          },
          {
            name: "Elite",
            price: "$79",
            period: "month",
            features: [
              "Everything in Premium",
              "Personal training",
              "Nutrition coaching",
              "Recovery services",
              "Priority booking",
            ],
            popular: false,
          },
        ],
      },
      testimonials: [
        {
          name: "Jessica Martinez",
          role: "Member for 2 years",
          content:
            "This gym changed my life! The trainers are amazing and the community is so supportive. I've achieved goals I never thought possible.",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "David Thompson",
          role: "Member for 1 year",
          content:
            "The equipment is top-notch and the trainers really know their stuff. I've seen incredible results in just 6 months.",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Lisa Park",
          role: "Member for 3 years",
          content:
            "The group classes are fantastic! Great energy and amazing instructors. I look forward to every workout.",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
      ],
      contact: {
        address: "456 Fitness Avenue, Health District, NY 10002",
        phone: "+1 (555) 987-6543",
        email: "info@fitnessgym.com",
        hours: "Mon-Fri: 5:00 AM - 11:00 PM, Sat-Sun: 6:00 AM - 10:00 PM",
        social: {
          instagram: "https://instagram.com/fitnessgym",
          facebook: "https://facebook.com/fitnessgym",
          twitter: "https://twitter.com/fitnessgym",
        },
      },
      stats: [
        { number: "5,000+", label: "Active Members" },
        { number: "10+", label: "Years Experience" },
        { number: "50+", label: "Certified Trainers" },
        { number: "4.9", label: "Member Rating" },
      ],
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

export const DEFAULT_WEBSITE_CONFIG = {
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
