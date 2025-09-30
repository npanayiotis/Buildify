/**
 * Prisma Client
 * Database connection and utilities
 */

import { PrismaClient } from "@prisma/client";

// ========================================
// CLIENT INITIALIZATION
// ========================================

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ========================================
// CONNECTION UTILITIES
// ========================================

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    return { success: false, error: error.message };
  }
}

export async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
    return { success: false, error: error.message };
  }
}

export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      success: false,
      status: "unhealthy",
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// ========================================
// SEEDING FUNCTIONS
// ========================================

export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Seed default templates
    await seedDefaultTemplates();

    // Seed admin user
    await seedAdminUser();

    console.log("✅ Database seeding completed successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    return { success: false, error: error.message };
  }
}

async function seedDefaultTemplates() {
  const templates = [
    {
      id: "blog-template",
      name: "Professional Blog",
      description: "A clean and modern blog template for content creators",
      category: "Blog",
      preview:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      features: [
        "Responsive Design",
        "SEO Optimized",
        "Blog Post Management",
        "Comment System",
      ],
      price: 399,
      isActive: true,
    },
    {
      id: "restaurant-template",
      name: "Restaurant Website",
      description: "Perfect for restaurants, cafes, and food businesses",
      category: "Restaurant",
      preview:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
      features: [
        "Menu Display",
        "Online Reservations",
        "Location & Hours",
        "Customer Reviews",
      ],
      price: 399,
      isActive: true,
    },
    {
      id: "gym-template",
      name: "Fitness Gym",
      description: "Professional gym and fitness center website",
      category: "Fitness",
      preview:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      features: [
        "Class Schedules",
        "Membership Plans",
        "Trainer Profiles",
        "Facility Gallery",
      ],
      price: 399,
      isActive: true,
    },
    {
      id: "law-office-template",
      name: "Law Office",
      description: "Professional law firm website template",
      category: "Legal",
      preview:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
      features: [
        "Attorney Profiles",
        "Practice Areas",
        "Case Studies",
        "Consultation Booking",
      ],
      price: 399,
      isActive: true,
    },
    {
      id: "portfolio-template",
      name: "Creative Portfolio",
      description: "Showcase your creative work and projects",
      category: "Portfolio",
      preview:
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
      features: [
        "Portfolio Gallery",
        "Project Showcase",
        "About Section",
        "Contact Form",
      ],
      price: 399,
      isActive: true,
    },
    {
      id: "real-estate-template",
      name: "Real Estate Agency",
      description: "Professional real estate agency website",
      category: "Real Estate",
      preview:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      features: [
        "Property Listings",
        "Agent Profiles",
        "Market Reports",
        "Contact Forms",
      ],
      price: 399,
      isActive: true,
    },
    {
      id: "medical-template",
      name: "Medical Practice",
      description: "Healthcare and medical practice website",
      category: "Medical",
      preview:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      features: [
        "Appointment Booking",
        "Doctor Profiles",
        "Services Overview",
        "Patient Portal",
      ],
      price: 399,
      isActive: true,
    },
    {
      id: "photography-template",
      name: "Photography Studio",
      description: "Professional photography portfolio website",
      category: "Photography",
      preview:
        "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=800&h=600&fit=crop",
      features: [
        "Photo Gallery",
        "Booking System",
        "Package Pricing",
        "Client Testimonials",
      ],
      price: 399,
      isActive: true,
    },
  ];

  for (const template of templates) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: template,
      create: template,
    });
  }

  console.log("✅ Default templates seeded");
}

async function seedAdminUser() {
  const bcrypt = await import("bcryptjs");
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@elevare.com" },
    update: {
      name: "Admin User",
      passwordHash: hashedPassword,
      plan: "ENTERPRISE",
      isActive: true,
    },
    create: {
      email: "admin@elevare.com",
      name: "Admin User",
      passwordHash: hashedPassword,
      plan: "ENTERPRISE",
      isActive: true,
    },
  });

  console.log("✅ Admin user seeded");
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

export async function cleanupExpiredSessions() {
  try {
    const result = await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    console.log(`🧹 Cleaned up ${result.count} expired sessions`);
    return { success: true, cleanedCount: result.count };
  } catch (error) {
    console.error("❌ Session cleanup failed:", error);
    return { success: false, error: error.message };
  }
}

export async function getDatabaseStats() {
  try {
    const [
      userCount,
      websiteCount,
      pageCount,
      subscriptionCount,
      templateCount,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.website.count(),
      prisma.page.count(),
      prisma.subscription.count(),
      prisma.template.count(),
    ]);

    return {
      success: true,
      stats: {
        users: userCount,
        websites: websiteCount,
        pages: pageCount,
        subscriptions: subscriptionCount,
        templates: templateCount,
      },
    };
  } catch (error) {
    console.error("❌ Failed to get database stats:", error);
    return { success: false, error: error.message };
  }
}

// ========================================
// EXPORT
// ========================================

export default prisma;
