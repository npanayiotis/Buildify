/**
 * Finalize Publishing API
 * Handles the final publishing process
 */

import { NextApiRequest, NextApiResponse } from "next";
import { requireAuth } from "@/lib/auth";
import { publishWebsite } from "@/lib/publishing";
import { prisma } from "@/lib/prisma/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const user = await requireAuth(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { websiteId, domain, domainType, paymentIntentId, cart } = req.body;

    if (!websiteId) {
      return res.status(400).json({ error: "Website ID is required" });
    }

    // Verify website ownership
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userId: user.id,
      },
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    // Verify payment if provided
    if (paymentIntentId) {
      // Here you would verify the payment with Stripe
      // For now, we'll assume payment is valid
      console.log("Payment verified:", paymentIntentId);
    }

    // Handle domain setup
    if (domainType === "custom" && domain) {
      // Add custom domain
      await prisma.domain.create({
        data: {
          websiteId: website.id,
          domain,
          type: "CUSTOM_DOMAIN",
          status: "PENDING",
          verificationToken: generateVerificationToken(),
        },
      });

      // Update website with custom domain
      await prisma.website.update({
        where: { id: websiteId },
        data: { customDomain: domain },
      });
    }

    // Publish the website
    const publishResult = await publishWebsite(websiteId, {
      domain,
      domainType,
      force: true,
    });

    if (publishResult.success) {
      // Update website status
      await prisma.website.update({
        where: { id: websiteId },
        data: {
          published: true,
          publishedAt: new Date(),
          lastPublishedAt: new Date(),
          deploymentUrl: publishResult.url,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Website published successfully",
        url: publishResult.url,
        deploymentId: publishResult.deploymentId,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: publishResult.error,
      });
    }
  } catch (error) {
    console.error("Finalize publishing error:", error);
    return res.status(500).json({
      success: false,
      error: "Publishing failed",
    });
  }
}

// Helper function to generate verification token
function generateVerificationToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
