/**
 * Database Seeding Script
 * Populates the database with initial data
 */

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ========================================
// SEED DATA
// ========================================

const templates = [
  {
    name: "Professional Blog",
    category: "blog",
    description:
      "Modern blog website perfect for writers, content creators, and thought leaders",
    preview:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "Welcome to My Blog",
        subtitle: "Sharing thoughts, ideas, and insights",
        ctaText: "Read More",
        ctaLink: "/blog",
      },
      sections: [
        {
          type: "HERO",
          data: {
            title: "Welcome to My Blog",
            subtitle: "Sharing thoughts, ideas, and insights",
            ctaText: "Read More",
            ctaLink: "/blog",
          },
        },
        {
          type: "ABOUT",
          data: {
            title: "About This Blog",
            content:
              "This is a space where I share my thoughts, experiences, and insights on various topics that interest me.",
          },
        },
      ],
    }),
    features: JSON.stringify([
      "Responsive Design",
      "SEO Optimized",
      "Social Media Integration",
      "Comment System",
      "Blog Categories",
      "Search Functionality",
    ]),
    tags: JSON.stringify(["blog", "content", "writing", "seo"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
  {
    name: "Elegant Restaurant",
    category: "restaurant",
    description:
      "Beautiful restaurant website with menu, reservations, and gallery",
    preview:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "Bella Vista Restaurant",
        subtitle: "Fine dining experience in the heart of the city",
        ctaText: "Make Reservation",
        ctaLink: "/reservations",
      },
      sections: [
        {
          type: "HERO",
          data: {
            title: "Bella Vista Restaurant",
            subtitle: "Fine dining experience in the heart of the city",
            ctaText: "Make Reservation",
            ctaLink: "/reservations",
          },
        },
        {
          type: "SERVICES",
          data: {
            title: "Our Menu",
            services: [
              {
                title: "Appetizers",
                description: "Fresh and flavorful starters",
                price: "From $12",
              },
              {
                title: "Main Courses",
                description: "Exquisite main dishes",
                price: "From $28",
              },
              {
                title: "Desserts",
                description: "Sweet endings to your meal",
                price: "From $8",
              },
            ],
          },
        },
      ],
    }),
    features: JSON.stringify([
      "Online Reservations",
      "Menu Display",
      "Photo Gallery",
      "Contact Form",
      "Location Map",
      "Opening Hours",
    ]),
    tags: JSON.stringify(["restaurant", "food", "dining", "menu"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
  {
    name: "FitLife Gym",
    category: "gym",
    description:
      "Modern fitness center website with classes, trainers, and membership",
    preview:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "FitLife Gym",
        subtitle: "Transform your body, transform your life",
        ctaText: "Join Now",
        ctaLink: "/membership",
      },
      sections: [
        {
          type: "HERO",
          data: {
            title: "FitLife Gym",
            subtitle: "Transform your body, transform your life",
            ctaText: "Join Now",
            ctaLink: "/membership",
          },
        },
        {
          type: "SERVICES",
          data: {
            title: "Our Services",
            services: [
              {
                title: "Personal Training",
                description: "One-on-one training sessions",
                price: "$80/hour",
              },
              {
                title: "Group Classes",
                description: "Fun and challenging group workouts",
                price: "$15/class",
              },
              {
                title: "Membership",
                description: "Full access to all facilities",
                price: "$49/month",
              },
            ],
          },
        },
      ],
    }),
    features: JSON.stringify([
      "Class Schedules",
      "Trainer Profiles",
      "Membership Plans",
      "Progress Tracking",
      "Equipment Gallery",
      "Nutrition Plans",
    ]),
    tags: JSON.stringify(["gym", "fitness", "health", "training"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
  {
    name: "Professional Law Office",
    category: "law",
    description:
      "Professional law firm website with attorney profiles and consultation booking",
    preview:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "Professional Law Office",
        subtitle: "Experienced legal representation you can trust",
        ctaText: "Free Consultation",
        ctaLink: "/consultation",
      },
    }),
    features: JSON.stringify([
      "Attorney Profiles",
      "Practice Areas",
      "Case Studies",
      "Free Consultation",
      "Legal Resources",
      "Client Reviews",
    ]),
    tags: JSON.stringify(["law", "legal", "attorney", "consultation"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
  {
    name: "Creative Portfolio",
    category: "portfolio",
    description: "Stunning portfolio website for creative professionals",
    preview:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "Creative Portfolio",
        subtitle: "Showcasing my creative work and passion",
        ctaText: "View Portfolio",
        ctaLink: "/portfolio",
      },
    }),
    features: JSON.stringify([
      "Portfolio Gallery",
      "Project Showcases",
      "About Section",
      "Contact Form",
      "Social Links",
      "Resume Download",
    ]),
    tags: JSON.stringify(["portfolio", "creative", "design", "art"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
  {
    name: "Real Estate Agency",
    category: "real-estate",
    description:
      "Professional real estate website with property listings and agent profiles",
    preview:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "Premium Real Estate",
        subtitle: "Find your dream home with our expert agents",
        ctaText: "Search Properties",
        ctaLink: "/properties",
      },
    }),
    features: JSON.stringify([
      "Property Listings",
      "Agent Profiles",
      "Property Search",
      "Virtual Tours",
      "Market Reports",
      "Contact Forms",
    ]),
    tags: JSON.stringify(["real-estate", "property", "home", "agent"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
  {
    name: "Medical Practice",
    category: "medical",
    description:
      "Professional medical practice website with appointment booking and doctor profiles",
    preview:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "Medical Practice",
        subtitle: "Comprehensive healthcare services for you and your family",
        ctaText: "Book Appointment",
        ctaLink: "/appointments",
      },
    }),
    features: JSON.stringify([
      "Appointment Booking",
      "Doctor Profiles",
      "Services Overview",
      "Patient Portal",
      "Health Resources",
      "Insurance Info",
    ]),
    tags: JSON.stringify(["medical", "healthcare", "doctor", "appointment"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
  {
    name: "Photography Studio",
    category: "photography",
    description:
      "Beautiful photography studio website with portfolio gallery and booking system",
    preview:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop&crop=center",
    price: 0,
    isPremium: false,
    templateData: JSON.stringify({
      hero: {
        title: "Photography Studio",
        subtitle: "Capturing life's precious moments with artistic excellence",
        ctaText: "View Gallery",
        ctaLink: "/gallery",
      },
    }),
    features: JSON.stringify([
      "Portfolio Gallery",
      "Booking System",
      "Package Pricing",
      "Client Testimonials",
      "Behind the Scenes",
      "Contact Form",
    ]),
    tags: JSON.stringify(["photography", "studio", "gallery", "booking"]),
    author: "Elevare Team",
    version: "1.0.0",
  },
];

// ========================================
// SEEDING FUNCTIONS
// ========================================

async function seedTemplates() {
  console.log("🌱 Seeding templates...");

  for (const templateData of templates) {
    try {
      await prisma.template.upsert({
        where: { name: templateData.name },
        update: templateData,
        create: templateData,
      });
      console.log(`   ✅ ${templateData.name}`);
    } catch (error) {
      console.error(
        `   ❌ Failed to seed ${templateData.name}:`,
        error.message
      );
    }
  }
}

async function seedDefaultUser() {
  console.log("👤 Creating default admin user...");

  try {
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash("admin123", 12);

    const user = await prisma.user.upsert({
      where: { email: "admin@elevare.com" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@elevare.com",
        passwordHash: hashedPassword,
        plan: "ENTERPRISE",
        isActive: true,
      },
    });

    // Create subscription
    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        plan: "ENTERPRISE",
        status: "ACTIVE",
      },
    });

    console.log(
      "   ✅ Default admin user created (admin@elevare.com / admin123)"
    );
  } catch (error) {
    console.error("   ❌ Failed to create default user:", error.message);
  }
}

// ========================================
// MAIN SEEDING FUNCTION
// ========================================

async function main() {
  try {
    console.log("🚀 Starting database seeding...\n");

    await seedTemplates();
    await seedDefaultUser();

    console.log("\n✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding
main();
