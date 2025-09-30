export const photographyStudioWebsite = {
  id: "photography-studio-website",
  name: "Photography Studio",
  category: "photography",
  description:
    "Professional photography studio website with portfolio gallery, booking system, and service packages",
  preview:
    "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop&crop=center",
  price: 179,
  isPremium: false,
  features: [
    {
      icon: "📸",
      title: "Portfolio Gallery",
      description: "Stunning photo gallery with categories and filtering",
    },
    {
      icon: "📅",
      title: "Booking System",
      description: "Online session booking and scheduling",
    },
    {
      icon: "🎯",
      title: "Service Packages",
      description: "Photography packages and pricing options",
    },
    {
      icon: "👤",
      title: "About Photographer",
      description: "Professional photographer biography and style",
    },
    {
      icon: "💬",
      title: "Client Testimonials",
      description: "Reviews and feedback from satisfied clients",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Perfect viewing on all devices",
    },
    {
      icon: "🏆",
      title: "Awards & Recognition",
      description: "Photography awards and industry recognition",
    },
    {
      icon: "🎨",
      title: "Photo Editing",
      description: "Professional photo editing and retouching services",
    },
    {
      icon: "📦",
      title: "Print Services",
      description: "High-quality prints and photo products",
    },
    {
      icon: "🎥",
      title: "Video Services",
      description: "Wedding videos and cinematic productions",
    },
  ],
  tags: ["photography", "studio", "portrait", "wedding", "events", "gallery"],
  fullWebsite: {
    hero: {
      title: "Capturing Life's Beautiful Moments",
      subtitle:
        "Professional photography services for weddings, portraits, events, and commercial projects. Let me tell your story through stunning imagery.",
      buttonText: "View Portfolio",
      buttonSecondary: "Book Session",
      backgroundImage:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        isActive: true,
        content:
          "Photography studio homepage with featured work and services overview",
      },
      {
        name: "Portfolio",
        slug: "/portfolio",
        isActive: true,
        content: "Complete photo gallery organized by categories and projects",
      },
      {
        name: "About",
        slug: "/about",
        isActive: true,
        content: "Photographer story, experience, and artistic vision",
      },
      {
        name: "Services",
        slug: "/services",
        isActive: true,
        content: "Photography services, packages, and pricing",
      },
      {
        name: "Blog",
        slug: "/blog",
        isActive: true,
        content: "Photography tips, behind-the-scenes, and latest work",
      },
      {
        name: "Contact",
        slug: "/contact",
        isActive: true,
        content: "Contact information, booking form, and studio location",
      },
    ],
    about: {
      title: "About the Photographer",
      content:
        "With over 12 years of experience behind the lens, I specialize in capturing authentic moments and creating timeless memories. My passion for photography began with a simple camera and has evolved into a career dedicated to telling stories through beautiful imagery.",
      style: [
        "Natural Light",
        "Documentary Style",
        "Candid Moments",
        "Timeless Aesthetics",
      ],
      experience: "12+ Years Experience",
      sessions: "500+ Sessions Completed",
      specialties: [
        "Wedding Photography",
        "Portrait Sessions",
        "Family Photography",
        "Corporate Events",
        "Commercial Photography",
        "Lifestyle Sessions",
      ],
      awards: [
        "Best Wedding Photographer 2023",
        "Photography Excellence Award 2022",
        "Client Choice Award 2021",
      ],
    },
    portfolio: {
      categories: [
        {
          name: "Weddings",
          count: 45,
          description:
            "Beautiful wedding photography capturing your special day",
          featured:
            "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Portraits",
          count: 80,
          description:
            "Professional portrait sessions for individuals and families",
          featured:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Events",
          count: 35,
          description: "Corporate events, parties, and special occasions",
          featured:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
        {
          name: "Commercial",
          count: 25,
          description: "Business photography and commercial projects",
          featured:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        },
      ],
      featured: [
        {
          title: "Sarah & Michael's Wedding",
          category: "Wedding",
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description:
            "A beautiful outdoor wedding ceremony with golden hour portraits",
          location: "Garden Venue, California",
          date: "2023",
        },
        {
          title: "Family Portrait Session",
          category: "Portrait",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Natural family portraits in a local park setting",
          location: "Central Park, New York",
          date: "2023",
        },
        {
          title: "Corporate Gala",
          category: "Event",
          image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description:
            "Elegant corporate event photography with candid moments",
          location: "Grand Hotel Ballroom",
          date: "2023",
        },
        {
          title: "Product Photography",
          category: "Commercial",
          image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          description: "Professional product photography for e-commerce brand",
          location: "Studio",
          date: "2023",
        },
      ],
    },
    services: [
      {
        name: "Wedding Photography",
        description:
          "Complete wedding photography coverage from getting ready to the last dance, capturing every precious moment.",
        icon: "💒",
        features: [
          "Full Day Coverage",
          "Engagement Session",
          "Online Gallery",
          "Print Release",
        ],
        pricing: "Starting at $2,500",
        duration: "8-10 hours",
      },
      {
        name: "Portrait Sessions",
        description:
          "Professional portrait photography for individuals, couples, and families in natural or studio settings.",
        icon: "👤",
        features: [
          "1-2 Hour Session",
          "Location of Choice",
          "Online Gallery",
          "Print Release",
        ],
        pricing: "Starting at $350",
        duration: "1-2 hours",
      },
      {
        name: "Family Photography",
        description:
          "Specialized family photography sessions capturing authentic moments and connections between loved ones.",
        icon: "👨‍👩‍👧‍👦",
        features: [
          "1 Hour Session",
          "Multiple Locations",
          "Online Gallery",
          "Print Release",
        ],
        pricing: "Starting at $450",
        duration: "1 hour",
      },
      {
        name: "Corporate Events",
        description:
          "Professional event photography for corporate functions, conferences, and business gatherings.",
        icon: "🏢",
        features: [
          "Event Coverage",
          "Candid & Posed Shots",
          "Same-Day Preview",
          "Online Gallery",
        ],
        pricing: "Starting at $800",
        duration: "2-4 hours",
      },
      {
        name: "Commercial Photography",
        description:
          "Professional commercial photography for businesses, products, and marketing materials.",
        icon: "📸",
        features: [
          "Product Shots",
          "Lifestyle Images",
          "Multiple Formats",
          "Commercial License",
        ],
        pricing: "Starting at $600",
        duration: "Half day",
      },
    ],
    booking: {
      title: "Book Your Session",
      description:
        "Ready to capture your special moments? Book your photography session today and let's create beautiful memories together.",
      process: [
        {
          step: "1",
          title: "Choose Your Package",
          description:
            "Select the photography package that best fits your needs and budget.",
        },
        {
          step: "2",
          title: "Schedule Your Session",
          description:
            "Pick a date and time that works for your schedule and location preferences.",
        },
        {
          step: "3",
          title: "Confirm & Prepare",
          description:
            "Receive confirmation details and preparation guidelines for your session.",
        },
        {
          step: "4",
          title: "Capture & Deliver",
          description:
            "Enjoy your session and receive your edited photos within 2-3 weeks.",
        },
      ],
      availability: {
        weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
        weekends: "Saturday - Sunday: 10:00 AM - 4:00 PM",
        emergency: "Available for urgent bookings",
      },
    },
    testimonials: [
      {
        name: "Sarah & Michael",
        role: "Wedding Clients",
        content:
          "Our wedding photos are absolutely stunning! You captured every emotion and moment perfectly. We couldn't be happier with the results and will treasure these memories forever.",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "Jennifer Martinez",
        role: "Portrait Client",
        content:
          "The family portrait session was amazing! You made us all feel so comfortable and the photos turned out beautifully. We've already booked another session for next year.",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "David Thompson",
        role: "Corporate Client",
        content:
          "Professional, punctual, and the photos exceeded our expectations. The corporate event coverage was flawless and we received the photos quickly. Highly recommended!",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
    ],
    contact: {
      studio: "123 Photography Studio, Creative District, City, ST 12345",
      phone: "(555) 123-4567",
      email: "hello@photographystudio.com",
      hours: {
        weekdays: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 4:00 PM",
        sunday: "By Appointment Only",
      },
      social: {
        instagram: "https://instagram.com/photographystudio",
        facebook: "https://facebook.com/photographystudio",
        pinterest: "https://pinterest.com/photographystudio",
        website: "https://photographystudio.com",
      },
      consultation: {
        title: "Free Consultation",
        description:
          "Schedule a free 30-minute consultation to discuss your photography needs and get personalized recommendations.",
        features: [
          "No obligation",
          "Custom package options",
          "Location suggestions",
          "Style consultation",
        ],
      },
    },
    stats: [
      { number: "500+", label: "Sessions Completed" },
      { number: "98%", label: "Client Satisfaction" },
      { number: "12+", label: "Years Experience" },
      { number: "200+", label: "Happy Couples" },
    ],
    navigation: {
      logo: "Photography Studio",
      links: [
        { name: "Home", href: "/" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Services", href: "/services" },
        { name: "Booking", href: "/booking" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
    },
    footer: {
      description:
        "Professional photography studio capturing life's beautiful moments with artistic excellence. Specializing in weddings, portraits, and events.",
      quickLinks: [
        { name: "Portfolio", url: "/portfolio" },
        { name: "Services", url: "/services" },
        { name: "Booking", url: "/booking" },
        { name: "Contact", url: "/contact" },
      ],
      socialLinks: {
        instagram: "https://instagram.com/photographystudio",
        facebook: "https://facebook.com/photographystudio",
        pinterest: "https://pinterest.com/photographystudio",
        twitter: "https://twitter.com/photographystudio",
      },
      copyright: "© 2024 Photography Studio. All rights reserved.",
    },
    seo: {
      title: "Professional Photography Studio - Wedding & Portrait Photography",
      description:
        "Professional photography services for weddings, portraits, events, and commercial projects. Capturing life's beautiful moments with artistic excellence and personalized service.",
      keywords: [
        "photography",
        "wedding photographer",
        "portrait photography",
        "family photography",
        "event photography",
        "commercial photography",
      ],
      ogImage:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  },
};
