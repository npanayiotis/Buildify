/**
 * Website Customization API
 * Handles saving and loading website customization data
 */

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma/client";
import { requireAuth } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    const user = await requireAuth(req);
    if (!user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { id } = req.query;

    switch (req.method) {
      case "GET":
        return await getWebsiteForCustomization(req, res, user, id);
      case "PUT":
        return await saveWebsiteCustomization(req, res, user, id);
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Customization API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// ========================================
// GET WEBSITE FOR CUSTOMIZATION
// ========================================

async function getWebsiteForCustomization(req, res, user, websiteId) {
  try {
    const website = await prisma.website.findFirst({
      where: {
        id: websiteId,
        userId: user.id,
      },
      include: {
        pages: {
          orderBy: { order: "asc" },
        },
        settings: true,
        domains: true,
      },
    });

    if (!website) {
      return res.status(404).json({ error: "Website not found" });
    }

    // Transform the data for the editor
    const customizationData = {
      id: website.id,
      name: website.name,
      description: website.description,
      templateId: website.templateId,
      templateData: website.templateData,
      customCSS: website.customCSS,
      customJS: website.customJS,
      favicon: website.favicon,
      metaTitle: website.metaTitle,
      metaDescription: website.metaDescription,
      metaKeywords: website.metaKeywords,
      pages: website.pages.map((page) => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        content: page.content,
        isHomepage: page.isHomepage,
        order: page.order,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        metaImage: page.metaImage,
      })),
      settings: website.settings,
      domains: website.domains,
      published: website.published,
      publishedAt: website.publishedAt,
      createdAt: website.createdAt,
      updatedAt: website.updatedAt,
    };

    return res.status(200).json(customizationData);
  } catch (error) {
    console.error("Get website for customization error:", error);
    return res.status(500).json({ error: "Failed to load website" });
  }
}

// ========================================
// SAVE WEBSITE CUSTOMIZATION
// ========================================

async function saveWebsiteCustomization(req, res, user, websiteId) {
  try {
    const {
      name,
      description,
      templateData,
      customCSS,
      customJS,
      favicon,
      metaTitle,
      metaDescription,
      metaKeywords,
      pages,
      settings,
    } = req.body;

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

    // Start transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update website
      const updatedWebsite = await tx.website.update({
        where: { id: websiteId },
        data: {
          name: name || website.name,
          description: description || website.description,
          templateData: templateData || website.templateData,
          customCSS: customCSS || website.customCSS,
          customJS: customJS || website.customJS,
          favicon: favicon || website.favicon,
          metaTitle: metaTitle || website.metaTitle,
          metaDescription: metaDescription || website.metaDescription,
          metaKeywords: metaKeywords || website.metaKeywords,
        },
      });

      // Update pages if provided
      if (pages && Array.isArray(pages)) {
        for (const pageData of pages) {
          await tx.page.upsert({
            where: {
              id: pageData.id,
              websiteId: websiteId,
            },
            update: {
              title: pageData.title,
              content: pageData.content,
              isHomepage: pageData.isHomepage,
              order: pageData.order,
              metaTitle: pageData.metaTitle,
              metaDescription: pageData.metaDescription,
              metaImage: pageData.metaImage,
            },
            create: {
              websiteId: websiteId,
              title: pageData.title,
              slug: pageData.slug,
              content: pageData.content,
              isHomepage: pageData.isHomepage || false,
              order: pageData.order || 0,
              published: true,
              metaTitle: pageData.metaTitle,
              metaDescription: pageData.metaDescription,
              metaImage: pageData.metaImage,
            },
          });
        }
      }

      // Update settings if provided
      if (settings) {
        await tx.websiteSettings.upsert({
          where: { websiteId: websiteId },
          update: {
            siteName: settings.siteName,
            siteDescription: settings.siteDescription,
            logo: settings.logo,
            email: settings.email,
            phone: settings.phone,
            address: settings.address,
            city: settings.city,
            state: settings.state,
            zipCode: settings.zipCode,
            country: settings.country,
            socialLinks: settings.socialLinks,
            gaTrackingId: settings.gaTrackingId,
            fbPixelId: settings.fbPixelId,
            gtmId: settings.gtmId,
            stripePublishableKey: settings.stripePublishableKey,
            googleMapsApiKey: settings.googleMapsApiKey,
            primaryColor: settings.primaryColor,
            secondaryColor: settings.secondaryColor,
            fontFamily: settings.fontFamily,
          },
          create: {
            websiteId: websiteId,
            siteName: settings.siteName || website.name,
            siteDescription: settings.siteDescription || website.description,
            logo: settings.logo,
            email: settings.email,
            phone: settings.phone,
            address: settings.address,
            city: settings.city,
            state: settings.state,
            zipCode: settings.zipCode,
            country: settings.country,
            socialLinks: settings.socialLinks,
            gaTrackingId: settings.gaTrackingId,
            fbPixelId: settings.fbPixelId,
            gtmId: settings.gtmId,
            stripePublishableKey: settings.stripePublishableKey,
            googleMapsApiKey: settings.googleMapsApiKey,
            primaryColor: settings.primaryColor,
            secondaryColor: settings.secondaryColor,
            fontFamily: settings.fontFamily,
          },
        });
      }

      return updatedWebsite;
    });

    return res.status(200).json({
      success: true,
      website: result,
      message: "Customization saved successfully",
    });
  } catch (error) {
    console.error("Save customization error:", error);
    return res.status(500).json({ error: "Failed to save customization" });
  }
}
