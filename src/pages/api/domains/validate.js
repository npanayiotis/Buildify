/**
 * Domain Validation API
 * Validates domain availability and format
 */

import { NextApiRequest, NextApiResponse } from "next";
import { validateDomain, checkDomainAvailability } from "@/lib/domains";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ error: "Domain is required" });
    }

    // Validate domain format and availability
    const validation = await validateDomain(domain);

    if (!validation.valid) {
      return res.status(200).json({
        valid: false,
        error: validation.error,
        suggestions: [],
      });
    }

    // Check domain availability
    const availability = await checkDomainAvailability(domain);

    return res.status(200).json({
      valid: true,
      available: availability.available,
      price: availability.price,
      suggestions: availability.suggestions || [],
    });
  } catch (error) {
    console.error("Domain validation error:", error);
    return res.status(500).json({
      valid: false,
      error: "Domain validation failed",
    });
  }
}
