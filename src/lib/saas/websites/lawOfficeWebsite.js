export const lawOfficeWebsite = {
  id: "law-office-website",
  name: "Professional Law Office",
  category: "law",
  description:
    "Professional law firm website with attorney profiles, practice areas, and client testimonials",
  preview:
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&crop=center",
  price: 299,
  isPremium: true,
  features: [
    {
      icon: "⚖️",
      title: "Practice Areas",
      description: "Comprehensive practice area listings and expertise",
    },
    {
      icon: "👨‍💼",
      title: "Attorney Profiles",
      description: "Detailed attorney biographies and credentials",
    },
    {
      icon: "📞",
      title: "Consultation Booking",
      description: "Online consultation scheduling system",
    },
    {
      icon: "📋",
      title: "Case Studies",
      description: "Portfolio of successful cases and outcomes",
    },
    {
      icon: "💬",
      title: "Client Testimonials",
      description: "Reviews and testimonials from satisfied clients",
    },
    {
      icon: "🏆",
      title: "Awards & Recognition",
      description: "Legal awards and professional recognition",
    },
    {
      icon: "📚",
      title: "Legal Resources",
      description: "Legal guides, articles, and resources",
    },
    {
      icon: "🕒",
      title: "24/7 Availability",
      description: "Emergency legal services and support",
    },
  ],
  tags: [
    "law",
    "legal",
    "attorney",
    "lawyer",
    "professional",
    "consultation",
    "litigation",
    "corporate",
  ],
  fullWebsite: {
    hero: {
      title: "Experienced Legal Representation",
      subtitle:
        "Providing expert legal counsel and representation with over 20 years of combined experience. Your success is our commitment.",
      buttonText: "Free Consultation",
      buttonSecondary: "Our Services",
      backgroundImage:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    pages: [
      {
        name: "Home",
        slug: "/",
        isActive: true,
        content:
          "Law firm homepage with hero, services overview, and consultation CTA",
      },
      {
        name: "About",
        slug: "/about",
        isActive: true,
        content: "Firm history, mission, and attorney profiles",
      },
      {
        name: "Services",
        slug: "/services",
        isActive: true,
        content: "Practice areas and legal services offered",
      },
      {
        name: "Attorneys",
        slug: "/attorneys",
        isActive: true,
        content: "Attorney profiles, credentials, and specialties",
      },
      {
        name: "Cases",
        slug: "/cases",
        isActive: true,
        content: "Case studies and successful outcomes",
      },
      {
        name: "Contact",
        slug: "/contact",
        isActive: true,
        content: "Contact information, consultation booking, and directions",
      },
    ],
    about: {
      title: "About Our Law Firm",
      content:
        "Founded in 2003, our law firm has been providing exceptional legal representation to clients across various practice areas. We combine decades of experience with innovative legal strategies to achieve the best possible outcomes for our clients.",
      values: ["Integrity", "Excellence", "Client Focus", "Results"],
      experience: "20+ Years Experience",
      cases: "500+ Cases Won",
      specialties: [
        "Personal Injury",
        "Corporate Law",
        "Family Law",
        "Criminal Defense",
        "Real Estate Law",
        "Estate Planning",
      ],
    },
    services: [
      {
        name: "Personal Injury Law",
        description:
          "Comprehensive representation for accident victims seeking compensation for injuries, medical expenses, and lost wages.",
        icon: "🚗",
        features: [
          "Car Accidents",
          "Slip & Fall",
          "Medical Malpractice",
          "Wrongful Death",
        ],
        pricing: "Contingency Fee Basis",
      },
      {
        name: "Corporate Law",
        description:
          "Full-service corporate legal support including business formation, contracts, mergers, and acquisitions.",
        icon: "🏢",
        features: [
          "Business Formation",
          "Contract Review",
          "M&A",
          "Compliance",
        ],
        pricing: "Hourly Rates Available",
      },
      {
        name: "Family Law",
        description:
          "Sensitive handling of divorce, custody, adoption, and other family legal matters with compassionate representation.",
        icon: "👨‍👩‍👧‍👦",
        features: ["Divorce", "Child Custody", "Adoption", "Alimony"],
        pricing: "Fixed Fee Packages",
      },
      {
        name: "Criminal Defense",
        description:
          "Aggressive defense representation for criminal charges with a proven track record of successful outcomes.",
        icon: "⚖️",
        features: [
          "DUI Defense",
          "Drug Charges",
          "White Collar",
          "Felony Defense",
        ],
        pricing: "Case-by-Case Basis",
      },
    ],
    attorneys: [
      {
        name: "Sarah Johnson",
        role: "Senior Partner",
        image:
          "https://images.unsplash.com/photo-1594824388852-7a6c8a4b8b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "With over 15 years of experience in personal injury law, Sarah has secured millions in settlements for her clients.",
        specialties: ["Personal Injury", "Medical Malpractice"],
        education: "Juris Doctor, Harvard Law School",
        experience: "15+ years",
        rating: 4.9,
        cases: 200,
      },
      {
        name: "Michael Chen",
        role: "Partner",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Corporate law expert with extensive experience in business formation, mergers, and acquisitions.",
        specialties: ["Corporate Law", "Business Formation", "M&A"],
        education: "Juris Doctor, Stanford Law School",
        experience: "12+ years",
        rating: 4.8,
        cases: 150,
      },
      {
        name: "Emily Rodriguez",
        role: "Associate Attorney",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        bio: "Family law specialist with a compassionate approach to sensitive legal matters.",
        specialties: ["Family Law", "Divorce", "Child Custody"],
        education: "Juris Doctor, UCLA School of Law",
        experience: "8+ years",
        rating: 4.9,
        cases: 100,
      },
    ],
    testimonials: [
      {
        name: "Robert Williams",
        role: "Client",
        content:
          "The team at this law firm exceeded my expectations. They handled my personal injury case with professionalism and dedication, securing a settlement that covered all my medical expenses and more.",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "Lisa Martinez",
        role: "Business Owner",
        content:
          "Their corporate law expertise helped us navigate a complex merger. Their attention to detail and strategic advice was invaluable throughout the entire process.",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
      {
        name: "David Thompson",
        role: "Client",
        content:
          "During my divorce, Emily provided compassionate and expert guidance. She helped me secure a fair settlement and custody arrangement that was best for my children.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&q=80",
        rating: 5,
      },
    ],
    contact: {
      address: "123 Legal Plaza, Suite 400, Downtown City, ST 12345",
      phone: "(555) 123-4567",
      email: "info@lawfirm.com",
      hours: {
        weekdays: "9:00 AM - 6:00 PM",
        saturday: "10:00 AM - 2:00 PM",
        sunday: "Closed",
      },
      consultation: {
        title: "Free Initial Consultation",
        description:
          "Schedule a free 30-minute consultation to discuss your legal needs and determine how we can help you.",
        features: [
          "No obligation",
          "Confidential",
          "Expert advice",
          "Clear next steps",
        ],
      },
    },
    awards: {
      title: "Recognition & Awards",
      description:
        "Our commitment to excellence has been recognized by legal organizations and peer reviews",
      achievements: [
        {
          year: "2024",
          award: "Best Law Firm",
          organization: "Legal Excellence Awards",
          description:
            "Recognized for outstanding client service and case results",
        },
        {
          year: "2023",
          award: "Top 10 Personal Injury Attorneys",
          organization: "State Bar Association",
          description: "Emily Johnson recognized for exceptional advocacy",
        },
        {
          year: "2022",
          award: "Super Lawyers",
          organization: "Thomson Reuters",
          description: "Multiple attorneys recognized as Super Lawyers",
        },
        {
          year: "2021",
          award: "AV Preeminent Rating",
          organization: "Martindale-Hubbell",
          description: "Highest peer rating for legal ability and ethics",
        },
      ],
    },
    legalResources: {
      title: "Legal Resources & Guides",
      description:
        "Helpful legal information and resources to guide you through your legal journey",
      categories: [
        {
          name: "Personal Injury",
          articles: [
            {
              title: "What to Do After a Car Accident",
              description:
                "Essential steps to protect your rights after an accident",
              readTime: "5 min read",
              image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
            },
            {
              title: "Understanding Personal Injury Claims",
              description:
                "Guide to filing and pursuing personal injury claims",
              readTime: "7 min read",
              image:
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
            },
          ],
        },
        {
          name: "Family Law",
          articles: [
            {
              title: "Divorce Process Overview",
              description: "Understanding the divorce process and your rights",
              readTime: "8 min read",
              image:
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=300&h=200&fit=crop",
            },
            {
              title: "Child Custody Guidelines",
              description: "Factors considered in child custody decisions",
              readTime: "6 min read",
              image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
            },
          ],
        },
      ],
    },
    caseStudies: {
      title: "Notable Case Results",
      description:
        "Examples of successful outcomes we've achieved for our clients",
      cases: [
        {
          title: "Multi-Million Dollar Settlement",
          category: "Personal Injury",
          outcome: "$2.5M Settlement",
          description:
            "Secured a substantial settlement for a client injured in a workplace accident",
          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
        },
        {
          title: "Complex Corporate Merger",
          category: "Corporate Law",
          outcome: "Successful Merger",
          description:
            "Facilitated a complex merger between two major corporations",
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        },
        {
          title: "Custody Victory",
          category: "Family Law",
          outcome: "Full Custody Granted",
          description: "Helped client secure full custody of their children",
          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop",
        },
      ],
    },
    stats: [
      { number: "750+", label: "Cases Won" },
      { number: "98%", label: "Success Rate" },
      { number: "25+", label: "Years Experience" },
      { number: "24/7", label: "Emergency Support" },
      { number: "15+", label: "Practice Areas" },
      { number: "4.9", label: "Client Rating" },
    ],
    seo: {
      title: "Professional Law Firm - Expert Legal Representation",
      description:
        "Experienced attorneys providing expert legal representation in personal injury, corporate law, family law, and criminal defense. Free consultations available.",
      keywords: [
        "law firm",
        "attorney",
        "legal representation",
        "personal injury lawyer",
        "corporate law",
        "family law",
      ],
      ogImage:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  },
};
