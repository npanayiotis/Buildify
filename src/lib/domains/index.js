/**
 * Domain Management System
 * Handles custom domains and subdomains for customer websites
 */

import { prisma } from "../prisma/client";
import * as vercel from "./vercel";
import * as cloudflare from "./cloudflare";
// DNS operations are handled server-side only

// ========================================
// DOMAIN VALIDATION
// ========================================

export async function validateDomain(domain) {
  try {
    // Basic domain format validation
    const domainRegex =
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      return { valid: false, error: "Invalid domain format" };
    }

    // Check if domain is already taken
    const existingDomain = await prisma.domain.findUnique({
      where: { domain },
    });

    if (existingDomain) {
      return { valid: false, error: "Domain already in use" };
    }

    // Check if domain is available for purchase
    const availability = await checkDomainAvailability(domain);
    if (!availability.available) {
      return { valid: false, error: "Domain not available" };
    }

    return { valid: true };
  } catch (error) {
    console.error("Domain validation error:", error);
    return { valid: false, error: "Domain validation failed" };
  }
}

export async function checkDomainAvailability(domain) {
  // This would integrate with domain registrar APIs
  // For now, return mock data
  const unavailableDomains = ["google.com", "facebook.com", "github.com"];
  return {
    available: !unavailableDomains.includes(domain),
    price: Math.floor(Math.random() * 50) + 10, // Mock price
  };
}

// ========================================
// SUBDOMAIN MANAGEMENT
// ========================================

export async function generateSubdomain(websiteName) {
  // Clean and format the website name
  let subdomain = websiteName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // Ensure it's not empty
  if (!subdomain) {
    subdomain = `website-${Date.now()}`;
  }

  // Check availability and generate unique subdomain
  let finalSubdomain = subdomain;
  let counter = 1;

  while (true) {
    const existing = await prisma.website.findUnique({
      where: { subdomain: finalSubdomain },
    });

    if (!existing) {
      break;
    }

    finalSubdomain = `${subdomain}-${counter}`;
    counter++;
  }

  return finalSubdomain;
}

export async function assignSubdomain(websiteId, subdomain) {
  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: { subdomain },
    });

    // Create domain record
    await prisma.domain.create({
      data: {
        websiteId,
        domain: `${subdomain}.elevare.com`,
        type: "SUBDOMAIN",
        status: "VERIFIED",
        sslStatus: "ACTIVE",
      },
    });

    return { success: true, subdomain };
  } catch (error) {
    console.error("Subdomain assignment error:", error);
    return { success: false, error: error.message };
  }
}

// ========================================
// CUSTOM DOMAIN MANAGEMENT
// ========================================

export async function addCustomDomain(websiteId, domain) {
  try {
    // Validate domain
    const validation = await validateDomain(domain);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Check user's plan
    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      include: { user: { include: { subscriptions: true } } },
    });

    const userPlan = website.user.subscriptions[0]?.plan || "FREE";
    if (userPlan === "FREE") {
      return {
        success: false,
        error: "Custom domains require Pro plan or higher",
      };
    }

    // Create domain record
    const domainRecord = await prisma.domain.create({
      data: {
        websiteId,
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

    // Get DNS configuration
    const dnsConfig = await getDNSConfiguration(domain);

    return {
      success: true,
      domain,
      dnsConfig,
      verificationToken: domainRecord.verificationToken,
    };
  } catch (error) {
    console.error("Add custom domain error:", error);
    return { success: false, error: error.message };
  }
}

export async function getDNSConfiguration(domain) {
  // This would integrate with your hosting provider
  // For Vercel, it would look like this:
  const dnsRecords = [
    {
      type: "CNAME",
      name: "@",
      value: "cname.vercel-dns.com",
      ttl: 3600,
    },
    {
      type: "CNAME",
      name: "www",
      value: "cname.vercel-dns.com",
      ttl: 3600,
    },
  ];

  return {
    records: dnsRecords,
    instructions: [
      "1. Go to your domain registrar's DNS settings",
      "2. Add the following DNS records:",
      "3. Wait for DNS propagation (can take up to 48 hours)",
      "4. We will automatically verify and activate your domain",
    ],
  };
}

export async function verifyDomain(websiteId, domain) {
  try {
    // Check DNS records
    const verification = await checkDNSRecords(domain);

    if (verification.verified) {
      // Update domain status
      await prisma.domain.updateMany({
        where: {
          websiteId,
          domain,
        },
        data: {
          status: "VERIFIED",
          sslStatus: "ACTIVE",
        },
      });

      // Update website
      await prisma.website.update({
        where: { id: websiteId },
        data: { domainVerified: true },
      });

      // Set up SSL certificate (automatic with Vercel)
      await setupSSLCertificate(domain);

      return { success: true, verified: true };
    } else {
      return {
        success: false,
        verified: false,
        error: verification.error,
        missingRecords: verification.missingRecords,
      };
    }
  } catch (error) {
    console.error("Domain verification error:", error);
    return { success: false, error: error.message };
  }
}

export async function checkDNSRecords(domain) {
  try {
    // Check for required DNS records
    const requiredRecords = [
      { type: "CNAME", name: "@", value: "cname.vercel-dns.com" },
      { type: "CNAME", name: "www", value: "cname.vercel-dns.com" },
    ];

    const missingRecords = [];

    for (const record of requiredRecords) {
      try {
        const records = await dns.resolve(
          record.name === "@" ? domain : `${record.name}.${domain}`,
          "CNAME"
        );
        if (!records.includes(record.value)) {
          missingRecords.push(record);
        }
      } catch (error) {
        missingRecords.push(record);
      }
    }

    return {
      verified: missingRecords.length === 0,
      missingRecords,
      error:
        missingRecords.length > 0
          ? "DNS records not properly configured"
          : null,
    };
  } catch (error) {
    return {
      verified: false,
      error: "Failed to check DNS records",
      missingRecords: [],
    };
  }
}

// ========================================
// SSL CERTIFICATE MANAGEMENT
// ========================================

export async function setupSSLCertificate(domain) {
  try {
    // With Vercel, SSL is automatically provisioned
    // This function would integrate with your hosting provider's SSL API

    console.log(`SSL certificate setup initiated for ${domain}`);

    // For Vercel:
    // await vercelClient.addDomain({
    //   name: domain,
    //   projectId: process.env.VERCEL_PROJECT_ID,
    // });

    return { success: true };
  } catch (error) {
    console.error("SSL setup error:", error);
    return { success: false, error: error.message };
  }
}

// ========================================
// DOMAIN UTILITIES
// ========================================

function generateVerificationToken() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export async function removeCustomDomain(websiteId, domain) {
  try {
    // Remove domain record
    await prisma.domain.deleteMany({
      where: { websiteId, domain },
    });

    // Update website
    await prisma.website.update({
      where: { id: websiteId },
      data: {
        customDomain: null,
        domainVerified: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Remove domain error:", error);
    return { success: false, error: error.message };
  }
}

export async function getWebsiteByDomain(domain) {
  try {
    const website = await prisma.website.findFirst({
      where: {
        OR: [{ subdomain: domain.split(".")[0] }, { customDomain: domain }],
        published: true,
      },
      include: {
        pages: {
          where: { published: true },
          orderBy: { order: "asc" },
        },
        settings: true,
        domains: true,
      },
    });

    return website;
  } catch (error) {
    console.error("Get website by domain error:", error);
    return null;
  }
}

// ========================================
// DOMAIN ANALYTICS
// ========================================

export async function getDomainStats(websiteId) {
  try {
    const domains = await prisma.domain.findMany({
      where: { websiteId },
      include: {
        website: {
          include: {
            analytics: {
              orderBy: { date: "desc" },
              take: 30,
            },
          },
        },
      },
    });

    return domains.map((domain) => ({
      domain: domain.domain,
      type: domain.type,
      status: domain.status,
      sslStatus: domain.sslStatus,
      analytics: domain.website.analytics,
    }));
  } catch (error) {
    console.error("Get domain stats error:", error);
    return [];
  }
}
