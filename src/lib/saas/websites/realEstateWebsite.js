export const realEstateWebsite = {
  id: "real-estate-agency-website",
  name: "Real Estate Agency",
  category: "real-estate",
  description:
    "Professional real estate agency website with property listings, agent profiles, and market insights",
  preview:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center",
  price: 199,
  isPremium: true,
  features: [
    {
      icon: "🏠",
      title: "Property Listings",
      description: "Advanced property search and detailed listings",
    },
    {
      icon: "👨‍💼",
      title: "Agent Profiles",
      description: "Professional agent profiles and specialties",
    },
    {
      icon: "📊",
      title: "Market Reports",
      description: "Local market insights and property values",
    },
    {
      icon: "📞",
      title: "Contact Forms",
      description: "Property inquiry and consultation booking",
    },
    {
      icon: "📍",
      title: "Location Maps",
      description: "Interactive maps and neighborhood information",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Perfect for mobile property browsing",
    },
    {
      icon: "🎥",
      title: "Virtual Tours",
      description: "360° virtual property tours and video walkthroughs",
    },
    {
      icon: "📈",
      title: "Market Analytics",
      description: "Comprehensive market trends and property analytics",
    },
    {
      icon: "🏆",
      title: "Awards & Recognition",
      description: "Industry awards and agent achievements",
    },
  ],
  tags: ["real-estate", "property", "homes", "agents", "listings", "buy-sell"],
  fullWebsite: {
    hero: {
      title: "Find Your Dream Home",
      subtitle:
        "Discover exceptional properties with our expert real estate team. Whether you're buying, selling, or investing, we're here to guide you every step of the way.",
      buttonText: "Browse Properties",
      buttonSecondary: "Get Market Report",
      backgroundImage:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        isActive: true,
        content:
          "Real estate homepage with featured properties and market highlights",
      },
      {
        name: "Properties",
        slug: "/properties",
        isActive: true,
        content: "Complete property listings with search and filtering",
      },
      {
        name: "Agents",
        slug: "/agents",
        isActive: true,
        content: "Professional agent profiles and specialties",
      },
      {
        name: "Services",
        slug: "/services",
        isActive: true,
        content: "Buying, selling, and investment services",
      },
      {
        name: "Market",
        slug: "/market",
        isActive: true,
        content: "Market reports and local insights",
      },
      {
        name: "Contact",
        slug: "/contact",
        isActive: true,
        content: "Contact agents and schedule consultations",
      },
    ],
    about: {
      title: "About Our Agency",
      content:
        "With over 25 years of experience in the local real estate market, we've helped thousands of families find their perfect homes and achieve their real estate goals. Our team of dedicated professionals combines local expertise with cutting-edge technology to deliver exceptional results.",
      values: ["Integrity", "Excellence", "Client Focus", "Innovation"],
      experience: "25+ Years Experience",
      properties: "2,500+ Properties Sold",
      specialties: [
        "Residential Sales",
        "Commercial Real Estate",
        "Property Management",
        "Investment Properties",
        "Luxury Homes",
        "First-Time Buyers",
      ],
    },
    properties: {
      featured: [
        {
          title: "Modern Family Home",
          price: "$750,000",
          location: "Downtown District",
          bedrooms: 4,
          bathrooms: 3,
          squareFeet: 2500,
          type: "Single Family",
          image:
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          features: [
            "Updated Kitchen",
            "Master Suite",
            "Two-Car Garage",
            "Private Yard",
          ],
          agent: "Sarah Johnson",
        },
        {
          title: "Luxury Condo",
          price: "$1,200,000",
          location: "Waterfront District",
          bedrooms: 3,
          bathrooms: 2,
          squareFeet: 1800,
          type: "Condominium",
          image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          features: [
            "City Views",
            "Rooftop Deck",
            "Concierge",
            "Fitness Center",
          ],
          agent: "Michael Chen",
        },
        {
          title: "Charming Townhouse",
          price: "$525,000",
          location: "Historic Quarter",
          bedrooms: 3,
          bathrooms: 2,
          squareFeet: 1600,
          type: "Townhouse",
          image:
            "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          features: [
            "Historic Character",
            "Updated Bathrooms",
            "Private Patio",
            "Walk to Shops",
          ],
          agent: "Emily Rodriguez",
        },
      ],
      filters: {
        priceRange: ["Under $500K", "$500K - $750K", "$750K - $1M", "Over $1M"],
        propertyType: [
          "Single Family",
          "Condominium",
          "Townhouse",
          "Multi-Family",
        ],
        bedrooms: ["1+", "2+", "3+", "4+"],
        bathrooms: ["1+", "2+", "3+", "4+"],
        features: [
          "Garage",
          "Pool",
          "Fireplace",
          "Updated Kitchen",
          "Hardwood Floors",
        ],
      },
    },
    agents: [
      {
        name: "Sarah Johnson",
        role: "Senior Real Estate Agent",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Specializing in luxury homes and first-time buyers, Sarah brings 12 years of experience and a passion for helping clients find their perfect home.",
        specialties: [
          "Luxury Homes",
          "First-Time Buyers",
          "Downtown Properties",
        ],
        experience: "12+ years",
        sales: "$50M+ in sales",
        rating: 4.9,
        phone: "(555) 123-4567",
        email: "sarah@realestate.com",
      },
      {
        name: "Michael Chen",
        role: "Commercial Real Estate Specialist",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "With expertise in commercial and investment properties, Michael helps clients build wealth through strategic real estate investments.",
        specialties: [
          "Commercial Real Estate",
          "Investment Properties",
          "Waterfront",
        ],
        experience: "15+ years",
        sales: "$75M+ in sales",
        rating: 4.8,
        phone: "(555) 234-5678",
        email: "michael@realestate.com",
      },
      {
        name: "Emily Rodriguez",
        role: "Residential Specialist",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Emily specializes in residential properties and has a deep understanding of the local market, helping families find their dream homes.",
        specialties: [
          "Residential Sales",
          "Historic Properties",
          "Family Homes",
        ],
        experience: "10+ years",
        sales: "$35M+ in sales",
        rating: 4.9,
        phone: "(555) 345-6789",
        email: "emily@realestate.com",
      },
    ],
    services: [
      {
        name: "Buying a Home",
        description:
          "Comprehensive buying services from property search to closing, with expert guidance every step of the way.",
        icon: "🔑",
        features: [
          "Property Search",
          "Market Analysis",
          "Negotiation",
          "Closing Support",
        ],
        pricing: "Buyer's Agent Commission",
      },
      {
        name: "Selling a Home",
        description:
          "Full-service selling experience with professional marketing, staging advice, and expert negotiation.",
        icon: "🏠",
        features: [
          "Market Analysis",
          "Professional Photos",
          "Marketing Strategy",
          "Showing Management",
        ],
        pricing: "6% Commission",
      },
      {
        name: "Property Management",
        description:
          "Complete property management services for rental properties and investment portfolios.",
        icon: "📋",
        features: [
          "Tenant Screening",
          "Rent Collection",
          "Maintenance",
          "Financial Reports",
        ],
        pricing: "8-10% of Monthly Rent",
      },
      {
        name: "Investment Consulting",
        description:
          "Strategic real estate investment advice to help build and optimize your property portfolio.",
        icon: "📈",
        features: [
          "Market Analysis",
          "Investment Strategy",
          "Property Selection",
          "ROI Optimization",
        ],
        pricing: "Consultation Fee",
      },
    ],
    market: {
      title: "Local Market Insights",
      currentStats: {
        averagePrice: "$650,000",
        medianPrice: "$575,000",
        daysOnMarket: "28 days",
        inventoryLevel: "2.1 months",
        priceChange: "+5.2% YoY",
      },
      neighborhoods: [
        {
          name: "Downtown District",
          averagePrice: "$750,000",
          priceChange: "+6.1%",
          description: "Urban living with modern amenities and city access",
        },
        {
          name: "Waterfront District",
          averagePrice: "$1,200,000",
          priceChange: "+4.8%",
          description: "Luxury waterfront properties with stunning views",
        },
        {
          name: "Historic Quarter",
          averagePrice: "$525,000",
          priceChange: "+7.2%",
          description: "Charming historic homes with character and charm",
        },
      ],
    },
    testimonials: [
      {
        name: "Robert Williams",
        role: "Home Buyer",
        content:
          "Sarah made our first home buying experience seamless. Her knowledge of the market and negotiation skills helped us get our dream home at a great price. Highly recommended!",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "Lisa Martinez",
        role: "Property Investor",
        content:
          "Michael's expertise in investment properties helped me build a successful rental portfolio. His market insights and property analysis are invaluable.",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "David Thompson",
        role: "Home Seller",
        content:
          "Emily sold our home in just 3 weeks! Her marketing strategy and professional photos made all the difference. We couldn't be happier with the results.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
    ],
    contact: {
      address: "123 Real Estate Plaza, Suite 200, Downtown City, ST 12345",
      phone: "(555) 123-4567",
      email: "info@realestate.com",
      hours: {
        weekdays: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "12:00 PM - 4:00 PM",
      },
      consultation: {
        title: "Free Property Consultation",
        description:
          "Schedule a free consultation to discuss your real estate goals and get expert advice on buying, selling, or investing.",
        features: [
          "No obligation",
          "Expert advice",
          "Market insights",
          "Action plan",
        ],
      },
    },
    stats: [
      { number: "2,500+", label: "Properties Sold" },
      { number: "98%", label: "Client Satisfaction" },
      { number: "25+", label: "Years Experience" },
      { number: "$200M+", label: "Total Sales Volume" },
    ],
    seo: {
      title: "Professional Real Estate Agency - Find Your Dream Home",
      description:
        "Expert real estate services for buying, selling, and investing. Professional agents with local market expertise to help you achieve your real estate goals.",
      keywords: [
        "real estate",
        "homes for sale",
        "real estate agents",
        "property listings",
        "home buying",
        "property investment",
      ],
      ogImage:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  },
};
