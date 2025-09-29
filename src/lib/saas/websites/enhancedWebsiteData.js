export const ENHANCED_WEBSITES = [
  {
    id: "professional-blog-website-enhanced",
    name: "Professional Blog Enhanced",
    category: "blog",
    description: "Complete blog platform with advanced features, SEO optimization, and content management",
    preview: "/api/preview/professional-blog-website-enhanced",
    price: 0,
    isPremium: false,
    features: [
      "Advanced Blog System",
      "SEO Optimization",
      "Newsletter Management",
      "Comment System",
      "Content Analytics",
      "Social Media Integration",
      "Search Functionality",
      "Category Management",
      "Tag System",
      "User Authentication",
      "Admin Dashboard",
      "Mobile Responsive"
    ],
    tags: ["blog", "writing", "content", "modern", "seo", "analytics"],
    fullWebsite: {
      hero: {
        title: "Welcome to My Blog",
        subtitle: "Thoughts, stories, and insights from my journey. Join me as I share experiences, lessons learned, and discoveries along the way.",
        buttonText: "Read Latest Post",
        buttonSecondary: "Subscribe",
        backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      },
      pages: [
        {
          name: "Home",
          slug: "/",
          isActive: true,
          content: "Main blog homepage with latest posts and featured content"
        },
        {
          name: "About",
          slug: "/about",
          isActive: true,
          content: "Personal story, interests, and background information"
        },
        {
          name: "Blog",
          slug: "/blog",
          isActive: true,
          content: "All blog posts with filtering and search functionality"
        },
        {
          name: "Categories",
          slug: "/categories",
          isActive: true,
          content: "Browse posts by categories like Lifestyle, Travel, Technology"
        },
        {
          name: "Contact",
          slug: "/contact",
          isActive: true,
          content: "Contact form and social media links"
        },
        {
          name: "Newsletter",
          slug: "/newsletter",
          isActive: true,
          content: "Newsletter signup and management"
        }
      ],
      about: {
        title: "About Me",
        content: "I'm a passionate writer, traveler, and lifelong learner. Through this blog, I share my experiences, insights, and the lessons I've learned along my journey. Join me as we explore life, creativity, and everything in between.",
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
          excerpt: "In our fast-paced world, finding moments of stillness and intentionality can transform our daily experience. Here's how to embrace a slower, more mindful approach to life.",
          date: "2024-01-15",
          category: "Lifestyle",
          readTime: "5 min read",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: true,
          views: 1250,
          comments: 23,
          tags: ["mindfulness", "lifestyle", "wellness"]
        },
        {
          title: "Lessons from a Year of Travel",
          excerpt: "After visiting 12 countries in the past year, here are the most valuable lessons I've learned about culture, connection, and personal growth.",
          date: "2024-01-10",
          category: "Travel",
          readTime: "8 min read",
          image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
          views: 2100,
          comments: 45,
          tags: ["travel", "culture", "personal-growth"]
        },
        {
          title: "Building Better Habits",
          excerpt: "How small changes in daily routines can lead to significant personal growth and fulfillment. A practical guide to habit formation.",
          date: "2024-01-05",
          category: "Personal Growth",
          readTime: "6 min read",
          image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
          views: 1800,
          comments: 32,
          tags: ["habits", "productivity", "self-improvement"]
        },
        {
          title: "The Power of Mindfulness",
          excerpt: "Exploring meditation, breathing techniques, and present-moment awareness for better mental health and overall well-being.",
          date: "2024-01-01",
          category: "Wellness",
          readTime: "7 min read",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: true,
          views: 3200,
          comments: 67,
          tags: ["mindfulness", "meditation", "wellness"]
        },
        {
          title: "Digital Minimalism",
          excerpt: "How to reclaim your time and attention in an increasingly connected world. Practical strategies for mindful technology use.",
          date: "2023-12-28",
          category: "Technology",
          readTime: "6 min read",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
          views: 1950,
          comments: 28,
          tags: ["technology", "minimalism", "digital-wellness"]
        },
        {
          title: "Creative Photography Tips",
          excerpt: "Simple techniques to improve your photography skills and capture more meaningful moments in your daily life.",
          date: "2023-12-20",
          category: "Photography",
          readTime: "5 min read",
          image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          featured: false,
          views: 1650,
          comments: 19,
          tags: ["photography", "creativity", "tips"]
        }
      ],
      categories: [
        {
          name: "Lifestyle",
          slug: "lifestyle",
          count: 15,
          color: "#FF6B6B"
        },
        {
          name: "Travel", 
          slug: "travel",
          count: 12,
          color: "#4ECDC4"
        },
        {
          name: "Personal Growth",
          slug: "personal-growth",
          count: 18,
          color: "#45B7D1"
        },
        {
          name: "Wellness",
          slug: "wellness",
          count: 10,
          color: "#96CEB4"
        },
        {
          name: "Technology",
          slug: "technology",
          count: 8,
          color: "#FFEAA7"
        },
        {
          name: "Photography",
          slug: "photography",
          count: 6,
          color: "#DDA0DD"
        }
      ],
      newsletter: {
        title: "Stay Updated",
        description: "Get notified when I publish new posts. No spam, just quality content delivered to your inbox.",
        placeholder: "Enter your email address",
        subscribers: "2,500+ subscribers",
        features: [
          "Weekly digest of new posts",
          "Exclusive content for subscribers",
          "Early access to new articles",
          "Personal updates and behind-the-scenes"
        ]
      },
      stats: [
        { number: "50+", label: "Articles Published" },
        { number: "25K+", label: "Monthly Readers" },
        { number: "4.9", label: "Average Rating" },
        { number: "100+", label: "Countries Reached" },
        { number: "2.5K+", label: "Newsletter Subscribers" },
        { number: "500+", label: "Comments Received" }
      ],
      seo: {
        title: "Personal Blog - Thoughts, Stories & Insights",
        description: "A personal blog sharing thoughts, stories, and insights about life, travel, technology, and personal growth.",
        keywords: ["personal blog", "life insights", "travel stories", "personal growth", "mindfulness"],
        ogImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      }
    }
  },
  {
    id: "elegant-restaurant-website-enhanced",
    name: "Elegant Restaurant Enhanced",
    category: "restaurant",
    description: "Complete restaurant platform with online reservations, menu management, and customer reviews",
    preview: "/api/preview/elegant-restaurant-website-enhanced",
    price: 49,
    isPremium: true,
    features: [
      "Online Reservations",
      "Menu Management",
      "Customer Reviews",
      "Order Tracking",
      "Table Management",
      "Staff Dashboard",
      "Analytics & Reports",
      "Email Marketing",
      "Social Media Integration",
      "Mobile App Ready",
      "Payment Processing",
      "Inventory Management"
    ],
    tags: ["restaurant", "food", "elegant", "fine-dining", "reservations", "menu"],
    fullWebsite: {
      hero: {
        title: "Fine Dining Experience",
        subtitle: "Exceptional cuisine in an elegant atmosphere. Where culinary artistry meets warm hospitality.",
        buttonText: "Make Reservation",
        buttonSecondary: "View Menu",
        backgroundImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      },
      pages: [
        {
          name: "Home",
          slug: "/",
          isActive: true,
          content: "Restaurant homepage with hero, menu highlights, and reservation CTA"
        },
        {
          name: "Menu",
          slug: "/menu",
          isActive: true,
          content: "Complete menu with categories, prices, and descriptions"
        },
        {
          name: "Reservations",
          slug: "/reservations",
          isActive: true,
          content: "Online reservation system with table availability"
        },
        {
          name: "About",
          slug: "/about",
          isActive: true,
          content: "Restaurant story, chef background, and restaurant history"
        },
        {
          name: "Gallery",
          slug: "/gallery",
          isActive: true,
          content: "Photo gallery of dishes, restaurant interior, and events"
        },
        {
          name: "Contact",
          slug: "/contact",
          isActive: true,
          content: "Location, hours, contact information, and directions"
        }
      ],
      about: {
        title: "About Our Restaurant",
        content: "Established in 2015, our restaurant has been serving exceptional cuisine in an elegant atmosphere. Our chef brings over 20 years of experience from world-renowned kitchens, creating dishes that celebrate local ingredients with international flair.",
        specialties: [
          "Farm-to-Table",
          "Wine Pairing",
          "Private Dining",
          "Chef's Table",
        ],
        experience: "Established 2015",
        awards: "Michelin Recommended",
        chef: {
          name: "Chef Maria Rodriguez",
          bio: "With over 20 years of culinary experience, Chef Maria brings a unique blend of traditional techniques and modern innovation to every dish.",
          image: "https://images.unsplash.com/photo-1594824388852-7a6c8a4b8b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      },
      menu: [
        {
          name: "Truffle Risotto",
          price: "$28",
          description: "Creamy Arborio rice with black truffle and aged Parmesan",
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Main Course",
          popular: true,
          allergens: ["Dairy", "Gluten"],
          ingredients: ["Arborio Rice", "Black Truffle", "Parmesan", "Butter", "White Wine"]
        },
        {
          name: "Wagyu Beef Tenderloin",
          price: "$45",
          description: "Premium Wagyu beef with seasonal vegetables and red wine reduction",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Main Course",
          popular: false,
          allergens: [],
          ingredients: ["Wagyu Beef", "Seasonal Vegetables", "Red Wine", "Herbs"]
        },
        {
          name: "Lobster Bisque",
          price: "$18",
          description: "Rich and creamy lobster soup with cognac and fresh herbs",
          image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Appetizer",
          popular: true,
          allergens: ["Shellfish", "Dairy"],
          ingredients: ["Lobster", "Cream", "Cognac", "Fresh Herbs", "Butter"]
        },
        {
          name: "Chocolate Soufflé",
          price: "$12",
          description: "Warm chocolate soufflé with vanilla bean ice cream",
          image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Dessert",
          popular: false,
          allergens: ["Dairy", "Eggs", "Gluten"],
          ingredients: ["Dark Chocolate", "Eggs", "Sugar", "Vanilla", "Butter"]
        },
        {
          name: "Seared Scallops",
          price: "$24",
          description: "Pan-seared scallops with cauliflower puree and truffle oil",
          image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Appetizer",
          popular: true,
          allergens: ["Shellfish", "Dairy"],
          ingredients: ["Scallops", "Cauliflower", "Truffle Oil", "Butter", "Herbs"]
        },
        {
          name: "Rack of Lamb",
          price: "$38",
          description: "Herb-crusted rack of lamb with roasted vegetables",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          category: "Main Course",
          popular: false,
          allergens: ["Gluten"],
          ingredients: ["Lamb", "Herbs", "Seasonal Vegetables", "Olive Oil"]
        }
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
          content: "The finest dining experience in the city. Every dish is a masterpiece!",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Sarah Wilson",
          role: "Regular Customer",
          content: "The atmosphere is perfect for special occasions. The food never disappoints.",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Michael Chen",
          role: "Wine Enthusiast",
          content: "Exceptional wine selection and perfect food pairings. A true culinary experience.",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
      ],
      contact: {
        address: "123 Fine Dining Street, Culinary District, NY 10001",
        phone: "+1 (555) 123-4567",
        email: "info@elegantrestaurant.com",
        hours: "Tue-Sun: 6:00 PM - 11:00 PM",
        reservations: "OpenTable",
        social: {
          instagram: "https://instagram.com/elegantrestaurant",
          facebook: "https://facebook.com/elegantrestaurant",
          twitter: "https://twitter.com/elegantrestaurant"
        }
      },
      stats: [
        { number: "8+", label: "Years Experience" },
        { number: "4.9", label: "Average Rating" },
        { number: "500+", label: "Happy Customers" },
        { number: "50+", label: "Award-Winning Dishes" },
        { number: "1000+", label: "Reservations Monthly" },
        { number: "25+", label: "Wine Selections" }
      ],
      seo: {
        title: "Elegant Restaurant - Fine Dining Experience",
        description: "Experience exceptional cuisine in an elegant atmosphere. Award-winning dishes, wine pairings, and unforgettable dining experiences.",
        keywords: ["fine dining", "restaurant", "elegant", "cuisine", "wine pairing", "reservations"],
        ogImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      }
    }
  },
  {
    id: "fitness-gym-website-enhanced",
    name: "Fitness Gym Enhanced",
    category: "gym",
    description: "Complete gym platform with membership management, class scheduling, and trainer profiles",
    preview: "/api/preview/fitness-gym-website-enhanced",
    price: 39,
    isPremium: true,
    features: [
      "Membership Management",
      "Class Scheduling",
      "Trainer Profiles",
      "Progress Tracking",
      "Online Booking",
      "Payment Processing",
      "Member Dashboard",
      "Fitness Programs",
      "Nutrition Tracking",
      "Social Features",
      "Mobile App",
      "Analytics Dashboard"
    ],
    tags: ["gym", "fitness", "health", "training", "membership", "classes"],
    fullWebsite: {
      hero: {
        title: "Transform Your Body",
        subtitle: "Join our community of fitness enthusiasts and achieve your health goals with our state-of-the-art equipment and expert trainers.",
        buttonText: "Start Free Trial",
        buttonSecondary: "View Programs",
        backgroundImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      },
      pages: [
        {
          name: "Home",
          slug: "/",
          isActive: true,
          content: "Gym homepage with programs, trainers, and membership options"
        },
        {
          name: "Programs",
          slug: "/programs",
          isActive: true,
          content: "All fitness programs and classes available"
        },
        {
          name: "Trainers",
          slug: "/trainers",
          isActive: true,
          content: "Meet our certified trainers and their specialties"
        },
        {
          name: "Membership",
          slug: "/membership",
          isActive: true,
          content: "Membership plans and pricing options"
        },
        {
          name: "Schedule",
          slug: "/schedule",
          isActive: true,
          content: "Class schedules and booking system"
        },
        {
          name: "Contact",
          slug: "/contact",
          isActive: true,
          content: "Location, hours, and contact information"
        }
      ],
      about: {
        title: "About Our Gym",
        content: "We're more than just a gym - we're a community dedicated to helping you achieve your fitness goals. With state-of-the-art equipment, expert trainers, and a supportive environment, we provide everything you need to succeed.",
        values: [
          "Community",
          "Excellence",
          "Support",
          "Results",
        ],
        experience: "10+ Years Experience",
        members: "5,000+ Active Members",
        facilities: [
          "State-of-the-art equipment",
          "Group fitness classes",
          "Personal training",
          "Nutrition counseling",
          "Sauna and recovery",
          "Childcare services"
        ]
      },
      programs: [
        {
          name: "Personal Training",
          description: "One-on-one sessions with certified trainers to help you reach your specific goals",
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
          description: "High-energy group workouts that combine cardio, strength, and flexibility training",
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
          description: "Personalized nutrition plans and guidance to complement your fitness journey",
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
          description: "Specialized programs for injury prevention, recovery, and overall wellness",
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
          image: "https://images.unsplash.com/photo-1594824388852-7a6c8a4b8b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          bio: "Certified personal trainer with 8+ years of experience in strength training and nutrition",
          specialties: ["Strength Training", "Weight Loss", "Nutrition"],
          certifications: ["NASM-CPT", "Precision Nutrition"],
          experience: "8+ years",
          rating: 4.9,
          clients: 150
        },
        {
          name: "Mike Rodriguez",
          role: "Fitness Coach",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          bio: "Former professional athlete turned fitness coach specializing in functional training",
          specialties: ["Functional Training", "Athletic Performance", "Injury Prevention"],
          certifications: ["ACSM-CPT", "Functional Movement Screen"],
          experience: "12+ years",
          rating: 4.8,
          clients: 200
        },
        {
          name: "Emily Chen",
          role: "Yoga Instructor",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
          bio: "Certified yoga instructor with expertise in Vinyasa, Hatha, and restorative yoga",
          specialties: ["Yoga", "Flexibility", "Mindfulness", "Stress Relief"],
          certifications: ["RYT-500", "Yin Yoga Certification"],
          experience: "6+ years",
          rating: 4.9,
          clients: 120
        },
      ],
      membership: {
        title: "Choose Your Plan",
        subtitle: "Flexible membership options to fit your lifestyle and budget",
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
          content: "This gym changed my life! The trainers are amazing and the community is so supportive. I've achieved goals I never thought possible.",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "David Thompson",
          role: "Member for 1 year",
          content: "The equipment is top-notch and the trainers really know their stuff. I've seen incredible results in just 6 months.",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
          rating: 5,
        },
        {
          name: "Lisa Park",
          role: "Member for 3 years",
          content: "The group classes are fantastic! Great energy and amazing instructors. I look forward to every workout.",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
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
        amenities: [
          "Free parking",
          "Locker rooms with showers",
          "Childcare services",
          "Nutrition bar",
          "Sauna and steam room",
          "Free WiFi"
        ]
      },
      stats: [
        { number: "5,000+", label: "Active Members" },
        { number: "10+", label: "Years Experience" },
        { number: "50+", label: "Certified Trainers" },
        { number: "4.9", label: "Member Rating" },
        { number: "100+", label: "Classes Weekly" },
        { number: "24/7", label: "Access Available" }
      ],
      seo: {
        title: "Fitness Gym - Transform Your Body & Mind",
        description: "Join our community of fitness enthusiasts. State-of-the-art equipment, expert trainers, and personalized programs to help you achieve your health goals.",
        keywords: ["gym", "fitness", "personal training", "group classes", "membership", "health"],
        ogImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      }
    }
  }
];

export const WEBSITE_FEATURES = {
  blog: [
    "Advanced Blog System",
    "SEO Optimization", 
    "Newsletter Management",
    "Comment System",
    "Content Analytics",
    "Social Media Integration",
    "Search Functionality",
    "Category Management",
    "Tag System",
    "User Authentication",
    "Admin Dashboard",
    "Mobile Responsive"
  ],
  restaurant: [
    "Online Reservations",
    "Menu Management", 
    "Customer Reviews",
    "Order Tracking",
    "Table Management",
    "Staff Dashboard",
    "Analytics & Reports",
    "Email Marketing",
    "Social Media Integration",
    "Mobile App Ready",
    "Payment Processing",
    "Inventory Management"
  ],
  gym: [
    "Membership Management",
    "Class Scheduling",
    "Trainer Profiles", 
    "Progress Tracking",
    "Online Booking",
    "Payment Processing",
    "Member Dashboard",
    "Fitness Programs",
    "Nutrition Tracking",
    "Social Features",
    "Mobile App",
    "Analytics Dashboard"
  ]
};

export const WEBSITE_PAGES = {
  blog: [
    { name: "Home", slug: "/", content: "Main blog homepage with latest posts" },
    { name: "About", slug: "/about", content: "Personal story and background" },
    { name: "Blog", slug: "/blog", content: "All blog posts with filtering" },
    { name: "Categories", slug: "/categories", content: "Browse posts by categories" },
    { name: "Contact", slug: "/contact", content: "Contact form and social links" },
    { name: "Newsletter", slug: "/newsletter", content: "Newsletter signup" }
  ],
  restaurant: [
    { name: "Home", slug: "/", content: "Restaurant homepage with hero and menu highlights" },
    { name: "Menu", slug: "/menu", content: "Complete menu with categories and prices" },
    { name: "Reservations", slug: "/reservations", content: "Online reservation system" },
    { name: "About", slug: "/about", content: "Restaurant story and chef background" },
    { name: "Gallery", slug: "/gallery", content: "Photo gallery of dishes and interior" },
    { name: "Contact", slug: "/contact", content: "Location, hours, and contact info" }
  ],
  gym: [
    { name: "Home", slug: "/", content: "Gym homepage with programs and membership" },
    { name: "Programs", slug: "/programs", content: "All fitness programs and classes" },
    { name: "Trainers", slug: "/trainers", content: "Meet our certified trainers" },
    { name: "Membership", slug: "/membership", content: "Membership plans and pricing" },
    { name: "Schedule", slug: "/schedule", content: "Class schedules and booking" },
    { name: "Contact", slug: "/contact", content: "Location, hours, and contact info" }
  ]
};
