/**
 * Website Publishing API
 * Handles website publishing requests
 */

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma/client";
import { publishWebsite } from "@/lib/publishing";
import { requireAuth } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Authenticate user
    const user = await requireAuth(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { id } = req.query;
    const { force = false } = req.body;

    // Get website
    const website = await prisma.website.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        pages: {
          where: { published: true },
        },
        settings: true,
        domains: true,
      },
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    // Check if website is already published and not forcing
    if (website.published && !force) {
      return res.status(400).json({
        error: "Website is already published. Use force=true to republish.",
      });
    }

    // Check user's plan limits
    const userWebsites = await prisma.website.count({
      where: {
        userId: user.id,
        published: true,
      },
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
        error: `Plan limit reached. ${userPlan} plan allows ${limit} published websites.`,
      });
    }

    // Publish website
    const result = await publishWebsite(id, { force });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Website published successfully",
        url: result.url,
        deploymentId: result.deploymentId,
      });
    } else {
      return res.status(500).json({
        error: result.error,
      });
    }
  } catch (error) {
    console.error("Publish API error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
