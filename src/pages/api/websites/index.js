/**
 * Websites API
 * Handles website CRUD operations
 */

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma/client";
import { requireAuth } from "@/lib/auth";
import { generateSubdomain } from "@/lib/domains";

export default async function handler(req, res) {
  try {
    const user = await requireAuth(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    switch (req.method) {
      case "GET":
        return await getWebsites(req, res, user);
      case "POST":
        return await createWebsite(req, res, user);
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Websites API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ========================================
// GET WEBSITES
// ========================================

async function getWebsites(req, res, user) {
  try {
    const { page = 1, limit = 10, published } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      userId: user.id,
      ...(published !== undefined && { published: published === "true" }),
    };

    const [websites, total] = await Promise.all([
      prisma.website.findMany({
        where,
        include: {
          pages: {
            where: { published: true },
            select: { id: true, title: true, slug: true },
          },
          settings: true,
          domains: true,
          _count: {
            select: { pages: true },
          },
        },
        orderBy: { updatedAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.website.count({ where }),
    ]);

    return res.status(200).json({
      websites,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get websites error:", error);
    return res.status(500).json({ error: "Failed to fetch websites" });
  }
}

// ========================================
// CREATE WEBSITE
// ========================================

async function createWebsite(req, res, user) {
  try {
    const { name, description, templateId, customDomain } = req.body;

    // Validate required fields
    if (!name || !templateId) {
      return res.status(400).json({
        error: "Name and template ID are required",
      });
    }

    // Check user's plan limits
    const userWebsites = await prisma.website.count({
      where: { userId: user.id },
    });

    const userPlan = user.subscriptions[0]?.plan || "FREE";
    const planLimits = {
      FREE: 1,
      PRO: 5,
      ENTERPRISE: -1, // Unlimited
    };

    const limit = planLimits[userPlan];
    if (limit !== -1 && userWebsites >= limit) {
      return res.status(403).json({
        error: `Plan limit reached. ${userPlan} plan allows ${limit} websites.`,
      });
    }

    // Generate subdomain
    const subdomain = await generateSubdomain(name);

    // Create website
    const website = await prisma.website.create({
      data: {
        name,
        description,
        templateId,
        subdomain,
        customDomain,
        userId: user.id,
      },
      include: {
        pages: true,
        settings: true,
        domains: true,
      },
    });

    // Create default settings
    await prisma.websiteSettings.create({
      data: {
        websiteId: website.id,
        siteName: name,
        siteDescription: description,
      },
    });

    // Create default homepage
    await prisma.page.create({
      data: {
        websiteId: website.id,
        title: "Home",
        slug: "/",
        content: JSON.stringify([
          {
            type: "HERO",
            data: {
              title: name,
              subtitle: description,
              ctaText: "Get Started",
              ctaLink: "/contact",
            },
          },
        ]),
        isHomepage: true,
        published: true,
        order: 0,
      },
    });

    // Create domain record
    await prisma.domain.create({
      data: {
        websiteId: website.id,
        domain: `${subdomain}.elevare.com`,
        type: "SUBDOMAIN",
        status: "VERIFIED",
        sslStatus: "ACTIVE",
      },
    });

    return res.status(201).json({
      success: true,
      website,
      message: "Website created successfully",
    });
  } catch (error) {
    console.error("Create website error:", error);
    return res.status(500).json({ error: "Failed to create website" });
  }
}
