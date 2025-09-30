export const restaurantWebsite = {
  id: "elegant-restaurant-website",
  name: "Elegant Restaurant",
  category: "restaurant",
  description:
    "Sophisticated restaurant website with menu, reservations, and elegant design",
  preview:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&crop=center",
  price: 199,
  isPremium: true,
  features: [
    {
      icon: "🍽️",
      title: "Interactive Menu",
      description: "Digital menu with categories, descriptions, and prices",
    },
    {
      icon: "📅",
      title: "Online Reservations",
      description: "Advanced table booking system with time slots",
    },
    {
      icon: "📸",
      title: "Photo Gallery",
      description: "High-quality images of dishes and ambiance",
    },
    {
      icon: "👨‍🍳",
      title: "Chef's Story",
      description: "Meet the culinary team and their expertise",
    },
    {
      icon: "🍷",
      title: "Wine Collection",
      description: "Curated wine selection and pairings",
    },
    {
      icon: "⭐",
      title: "Customer Reviews",
      description: "Testimonials and ratings from diners",
    },
    {
      icon: "📱",
      title: "Mobile App",
      description: "Mobile-optimized ordering and reservations",
    },
    {
      icon: "🎉",
      title: "Events & Catering",
      description: "Private dining and event hosting services",
    },
  ],
  tags: ["restaurant", "food", "elegant", "premium", "fine-dining", "catering"],
  fullWebsite: {
    hero: {
      title: "Welcome to Bella Vista",
      subtitle:
        "Experience culinary excellence in an elegant atmosphere where every dish tells a story of passion, tradition, and innovation",
      buttonText: "View Menu",
      buttonSecondary: "Make Reservation",
      backgroundImage:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      overlay: "rgba(0, 0, 0, 0.5)",
      stats: [
        { number: "15+", label: "Years Experience" },
        { number: "50+", label: "Award-Winning Dishes" },
        { number: "98%", label: "Customer Satisfaction" },
      ],
      featured: {
        title: "Chef's Special Tonight",
        description: "Pan-seared Chilean Sea Bass with Lemon Herb Risotto",
        price: "$42",
        image:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    },
    about: {
      title: "Our Story",
      content:
        "For over two decades, Bella Vista has been serving exceptional cuisine in the heart of the city. Our passion for culinary excellence and warm hospitality creates unforgettable dining experiences.",
      experience: "20+ Years",
      interests: [
        "Fine Dining",
        "Wine Pairing",
        "Local Ingredients",
        "Chef Specialties",
        "Private Events",
      ],
      socialLinks: {
        instagram: "https://instagram.com/bellavista_restaurant",
        facebook: "https://facebook.com/bellavista_restaurant",
        twitter: "https://twitter.com/bellavista_restaurant",
      },
    },
    menu: {
      categories: [
        {
          name: "Appetizers",
          description:
            "Start your culinary journey with our exquisite appetizers",
          items: [
            {
              name: "Truffle Arancini",
              description:
                "Crispy risotto balls with truffle oil, parmesan, and wild mushrooms",
              price: "$18",
              image:
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              popular: true,
            },
            {
              name: "Burrata Caprese",
              description:
                "Fresh burrata with heirloom tomatoes, basil, and aged balsamic",
              price: "$16",
              image:
                "https://images.unsplash.com/photo-1572441713139-0cc4350a0a4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Lobster Bisque",
              description:
                "Rich and creamy lobster soup with cognac and fresh herbs",
              price: "$22",
              image:
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              popular: true,
            },
            {
              name: "Oysters Rockefeller",
              description:
                "Fresh oysters with spinach, herbs, and hollandaise sauce",
              price: "$24",
              image:
                "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
          ],
        },
        {
          name: "Main Courses",
          description:
            "Our signature dishes crafted with the finest ingredients",
          items: [
            {
              name: "Wagyu Beef Tenderloin",
              description:
                "Premium wagyu with truffle mashed potatoes and seasonal vegetables",
              price: "$85",
              image:
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              popular: true,
            },
            {
              name: "Pan-Seared Salmon",
              description:
                "Atlantic salmon with lemon butter sauce and asparagus",
              price: "$32",
              image:
                "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Rack of Lamb",
              description:
                "Herb-crusted lamb with rosemary jus and roasted vegetables",
              price: "$45",
              image:
                "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Duck Confit",
              description:
                "Slow-cooked duck leg with cherry gastrique and wild rice",
              price: "$38",
              image:
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
          ],
        },
        {
          name: "Desserts",
          description: "Sweet endings to perfect your dining experience",
          items: [
            {
              name: "Chocolate Soufflé",
              description:
                "Warm chocolate soufflé with vanilla ice cream and berries",
              price: "$14",
              image:
                "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              popular: true,
            },
            {
              name: "Tiramisu",
              description:
                "Classic Italian dessert with espresso and mascarpone",
              price: "$12",
              image:
                "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Crème Brûlée",
              description:
                "Vanilla custard with caramelized sugar and fresh berries",
              price: "$10",
              image:
                "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
          ],
        },
        {
          name: "Wine Selection",
          description: "Curated wines to complement your meal",
          items: [
            {
              name: "Champagne Dom Pérignon",
              description: "Vintage champagne for special occasions",
              price: "$180",
              image:
                "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Bordeaux Reserve",
              description: "Full-bodied red wine from Bordeaux region",
              price: "$65",
              image:
                "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
            {
              name: "Chardonnay Reserve",
              description: "Oak-aged white wine with buttery notes",
              price: "$45",
              image:
                "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            },
          ],
        },
      ],
    },
    reservations: {
      title: "Make a Reservation",
      subtitle: "Book your table for an unforgettable dining experience",
      phone: "+1 (555) 123-4567",
      email: "reservations@bellavista.com",
      hours: {
        monday: "5:00 PM - 10:00 PM",
        tuesday: "5:00 PM - 10:00 PM",
        wednesday: "5:00 PM - 10:00 PM",
        thursday: "5:00 PM - 10:00 PM",
        friday: "5:00 PM - 11:00 PM",
        saturday: "4:00 PM - 11:00 PM",
        sunday: "4:00 PM - 9:00 PM",
      },
    },
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Main Dining Room",
        description:
          "Elegant atmosphere with warm lighting and sophisticated decor",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Chef's Table",
        description: "Intimate dining experience with direct kitchen view",
      },
      {
        image:
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Wine Cellar",
        description: "Extensive wine collection with over 500 vintages",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Outdoor Patio",
        description: "Al fresco dining experience with garden views",
      },
      {
        image:
          "https://images.unsplash.com/photo-1572441713139-0cc4350a0a4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Private Dining Room",
        description: "Exclusive space for special occasions and events",
      },
      {
        image:
          "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "Kitchen View",
        description: "Watch our chefs create culinary masterpieces",
      },
    ],
    specialEvents: {
      title: "Special Events & Catering",
      description: "Host your special occasions in our elegant dining spaces",
      events: [
        {
          name: "Private Dining",
          description:
            "Exclusive dining room for intimate gatherings up to 20 guests",
          image:
            "https://images.unsplash.com/photo-1572441713139-0cc4350a0a4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          capacity: "Up to 20 guests",
          price: "Starting at $1,200",
          features: [
            "Custom menu",
            "Dedicated server",
            "Private entrance",
            "Audio/visual setup",
          ],
        },
        {
          name: "Chef's Table Experience",
          description: "Intimate 8-course tasting menu with wine pairing",
          image:
            "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          capacity: "Up to 8 guests",
          price: "$150 per person",
          features: [
            "8-course tasting",
            "Wine pairing",
            "Chef interaction",
            "Kitchen view",
          ],
        },
        {
          name: "Corporate Catering",
          description:
            "Professional catering services for business events and meetings",
          image:
            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          capacity: "10-200 guests",
          price: "Custom pricing",
          features: [
            "Custom menu",
            "Professional staff",
            "Setup & cleanup",
            "Delivery available",
          ],
        },
      ],
    },
    awards: {
      title: "Awards & Recognition",
      description: "Recognition for our commitment to culinary excellence",
      achievements: [
        {
          award: "Best Fine Dining Restaurant 2023",
          organization: "City Food & Wine Magazine",
          year: "2023",
          icon: "🏆",
        },
        {
          award: "Chef of the Year",
          organization: "Culinary Excellence Awards",
          year: "2022",
          icon: "👨‍🍳",
        },
        {
          award: "Wine Program Excellence",
          organization: "Wine Spectator",
          year: "2023",
          icon: "🍷",
        },
        {
          award: "Best Service",
          organization: "Restaurant Association",
          year: "2022",
          icon: "⭐",
        },
      ],
    },
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Food Critic",
        content:
          "Bella Vista offers an exceptional dining experience with innovative cuisine and impeccable service. The attention to detail is remarkable.",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
      },
      {
        name: "Michael Chen",
        role: "Regular Customer",
        content:
          "The best restaurant in the city! Every visit is a culinary journey. The wine selection is outstanding and the staff is incredibly knowledgeable.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
      },
      {
        name: "Emily Rodriguez",
        role: "Food Blogger",
        content:
          "From the moment you walk in, you know you're in for something special. The ambiance, service, and food are all world-class.",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
        rating: 5,
      },
    ],
    chef: {
      title: "Meet Our Culinary Team",
      description:
        "Led by award-winning chefs with decades of experience in fine dining",
      headChef: {
        name: "Chef Marco Rodriguez",
        title: "Executive Chef & Owner",
        experience: "25+ Years",
        specialties: [
          "French Cuisine",
          "Mediterranean Fusion",
          "Molecular Gastronomy",
        ],
        bio: "Chef Marco brings over two decades of culinary excellence from some of the world's most prestigious restaurants. His passion for innovation while respecting traditional techniques has earned him numerous awards and recognition.",
        image:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=500&fit=crop&crop=face",
        awards: [
          "James Beard Award Nominee 2023",
          "Michelin Star Recipient 2022",
          "Best Chef - City Magazine 2021",
          "Culinary Excellence Award 2020",
        ],
      },
      team: [
        {
          name: "Chef Sarah Chen",
          title: "Sous Chef",
          specialty: "Asian Fusion",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Chef Antonio Silva",
          title: "Pastry Chef",
          specialty: "French Pastries",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        },
        {
          name: "Chef Elena Volkov",
          title: "Sommelier",
          specialty: "Wine Pairing",
          image:
            "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
        },
      ],
    },
    wineCollection: {
      title: "Curated Wine Selection",
      description: "Over 500 carefully selected wines from around the world",
      featured: [
        {
          name: "Dom Pérignon Vintage 2015",
          type: "Champagne",
          region: "Champagne, France",
          price: "$280",
          description:
            "Elegant and refined with notes of white flowers and citrus",
          image:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=400&fit=crop",
          rating: 98,
        },
        {
          name: "Opus One 2018",
          type: "Red Wine",
          region: "Napa Valley, California",
          price: "$350",
          description: "Bold and complex with dark fruit and spice notes",
          image:
            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=300&h=400&fit=crop",
          rating: 97,
        },
        {
          name: "Corton-Charlemagne 2019",
          type: "White Wine",
          region: "Burgundy, France",
          price: "$180",
          description: "Rich and buttery with mineral undertones",
          image:
            "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=400&fit=crop",
          rating: 96,
        },
      ],
      categories: [
        { name: "Champagne & Sparkling", count: 45 },
        { name: "Red Wines", count: 180 },
        { name: "White Wines", count: 120 },
        { name: "Rosé Wines", count: 35 },
        { name: "Dessert Wines", count: 25 },
        { name: "Spirits & Cocktails", count: 95 },
      ],
    },
    events: {
      title: "Private Events & Catering",
      description: "Host your special occasions in our elegant dining spaces",
      services: [
        {
          name: "Private Dining Room",
          capacity: "Up to 20 guests",
          description: "Intimate setting for special celebrations",
          features: [
            "Private sommelier",
            "Custom menu",
            "Personalized service",
          ],
          price: "From $150 per person",
          image:
            "https://images.unsplash.com/photo-1572441713139-0cc4350a0a4a?w=600&h=400&fit=crop",
        },
        {
          name: "Wine Cellar Experience",
          capacity: "Up to 12 guests",
          description:
            "Exclusive dining in our temperature-controlled wine cellar",
          features: ["Rare wine selection", "Chef's table", "Wine education"],
          price: "From $200 per person",
          image:
            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop",
        },
        {
          name: "Full Restaurant Buyout",
          capacity: "Up to 80 guests",
          description: "Exclusive use of the entire restaurant",
          features: ["Full menu access", "Live music", "Event coordination"],
          price: "From $5,000",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        },
      ],
      occasions: [
        "Anniversary Celebrations",
        "Corporate Events",
        "Wedding Rehearsal Dinners",
        "Birthday Parties",
        "Holiday Celebrations",
        "Wine Tasting Events",
      ],
    },
    awards: {
      title: "Recognition & Awards",
      description:
        "Our commitment to excellence has been recognized by industry leaders",
      achievements: [
        {
          year: "2024",
          award: "Best Fine Dining Restaurant",
          organization: "City Magazine",
          description: "Recognized for exceptional cuisine and service",
        },
        {
          year: "2023",
          award: "Wine Spectator Award of Excellence",
          organization: "Wine Spectator",
          description: "Outstanding wine program with over 500 selections",
        },
        {
          year: "2022",
          award: "Michelin Star",
          organization: "Michelin Guide",
          description: "High quality cooking, worth a stop",
        },
        {
          year: "2021",
          award: "Best Chef Award",
          organization: "Culinary Institute",
          description:
            "Chef Marco Rodriguez recognized for culinary innovation",
        },
      ],
    },
    stats: [
      { number: "25+", label: "Years Experience" },
      { number: "500+", label: "Wine Varieties" },
      { number: "150+", label: "Happy Customers Daily" },
      { number: "4.9", label: "Star Rating" },
      { number: "50+", label: "Award-Winning Dishes" },
      { number: "15+", label: "Chef Specialties" },
    ],
    navigation: {
      logo: "Bella Vista",
      links: [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Menu", href: "/menu" },
        { name: "Chef", href: "/chef" },
        { name: "Wine", href: "/wine" },
        { name: "Events", href: "/events" },
        { name: "Reservations", href: "/reservations" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/contact" },
      ],
    },
    pages: {
      home: "Home page with hero section and featured content",
      about: "About page with restaurant story and team",
      menu: "Menu page with categories and dishes",
      chef: "Chef page with culinary team and specialties",
      wine: "Wine collection page with curated selections",
      events: "Events page with private dining and catering options",
      reservations: "Reservation page with booking form",
      gallery: "Gallery page with restaurant photos",
      contact: "Contact page with location and hours",
    },
    features: {
      onlineMenu: "Interactive menu with descriptions and prices",
      reservations: "Online table booking system",
      gallery: "Photo gallery of restaurant and dishes",
      reviews: "Customer testimonials and ratings",
      contact: "Location, hours, and contact information",
    },
    footer: {
      description:
        "Experience culinary excellence at Bella Vista, where tradition meets innovation in every dish.",
      quickLinks: [
        { name: "About Us", url: "/about" },
        { name: "Menu", url: "/menu" },
        { name: "Reservations", url: "/reservations" },
        { name: "Contact", url: "/contact" },
      ],
      socialLinks: {
        instagram: "https://instagram.com/bellavista_restaurant",
        facebook: "https://facebook.com/bellavista_restaurant",
        twitter: "https://twitter.com/bellavista_restaurant",
      },
      copyright: "© 2024 Bella Vista Restaurant. All rights reserved.",
    },
  },
};
