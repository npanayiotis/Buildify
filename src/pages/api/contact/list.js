import prisma from "../../../lib/prisma/client";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { websiteType, websiteId, status, page = 1, limit = 20 } = req.query;

    const where = {};
    if (websiteType) where.websiteType = websiteType;
    if (websiteId) where.websiteId = websiteId;
    if (status) where.status = status;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [contacts, total] = await Promise.all([
      prisma.contactSubmission.findMany({
        where,
        orderBy: { submittedAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.contactSubmission.count({ where }),
    ]);

    return res.status(200).json({
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({
      error: "Failed to fetch contacts",
      details: error.message,
    });
  }
}
