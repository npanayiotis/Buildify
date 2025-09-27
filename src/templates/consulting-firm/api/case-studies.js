import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/consulting-firm/case-studies - Get all case studies
export const getCaseStudies = async (req, res) => {
  try {
    const { tenantId } = req;
    const { industry, client, search, page = 1, limit = 20 } = req.query;

    const where = {
      tenantId,
    };

    // Add filters
    if (industry && industry !== "all") {
      where.industry = industry;
    }

    if (client) {
      where.client = { contains: client, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [caseStudies, total] = await Promise.all([
      prisma.consultingCaseStudy.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.consultingCaseStudy.count({ where }),
    ]);

    res.json({
      success: true,
      data: caseStudies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    res.status(500).json({ error: "Failed to fetch case studies" });
  }
};

// GET /api/consulting-firm/case-studies/:id - Get single case study
export const getCaseStudy = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const caseStudy = await prisma.consultingCaseStudy.findFirst({
      where: {
        id,
        tenantId,
      },
    });

    if (!caseStudy) {
      return res.status(404).json({ error: "Case study not found" });
    }

    res.json({ success: true, data: caseStudy });
  } catch (error) {
    console.error("Error fetching case study:", error);
    res.status(500).json({ error: "Failed to fetch case study" });
  }
};

// GET /api/consulting-firm/case-studies/slug/:slug - Get case study by slug
export const getCaseStudyBySlug = async (req, res) => {
  try {
    const { tenantId } = req;
    const { slug } = req.params;

    const caseStudy = await prisma.consultingCaseStudy.findFirst({
      where: {
        slug,
        tenantId,
      },
    });

    if (!caseStudy) {
      return res.status(404).json({ error: "Case study not found" });
    }

    res.json({ success: true, data: caseStudy });
  } catch (error) {
    console.error("Error fetching case study:", error);
    res.status(500).json({ error: "Failed to fetch case study" });
  }
};

// POST /api/consulting-firm/case-studies - Create new case study (Admin)
export const createCaseStudy = async (req, res) => {
  try {
    const { tenantId } = req;
    const {
      title,
      slug,
      description,
      content,
      imageUrl,
      client,
      industry,
    } = req.body;

    if (!title || !slug || !description || !content) {
      return res.status(400).json({ 
        error: "Title, slug, description, and content are required" 
      });
    }

    // Check if slug already exists
    const existingCaseStudy = await prisma.consultingCaseStudy.findFirst({
      where: {
        slug,
        tenantId,
      },
    });

    if (existingCaseStudy) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    const caseStudy = await prisma.consultingCaseStudy.create({
      data: {
        tenantId,
        title,
        slug,
        description,
        content,
        imageUrl,
        client: client || "",
        industry: industry || "",
      },
    });

    res.status(201).json({ success: true, data: caseStudy });
  } catch (error) {
    console.error("Error creating case study:", error);
    res.status(500).json({ error: "Failed to create case study" });
  }
};

// PUT /api/consulting-firm/case-studies/:id - Update case study (Admin)
export const updateCaseStudy = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const {
      title,
      slug,
      description,
      content,
      imageUrl,
      client,
      industry,
    } = req.body;

    // Check if slug already exists (excluding current case study)
    if (slug) {
      const existingCaseStudy = await prisma.consultingCaseStudy.findFirst({
        where: {
          slug,
          tenantId,
          NOT: { id },
        },
      });

      if (existingCaseStudy) {
        return res.status(400).json({ error: "Slug already exists" });
      }
    }

    const caseStudy = await prisma.consultingCaseStudy.update({
      where: {
        id,
        tenantId,
      },
      data: {
        title,
        slug,
        description,
        content,
        imageUrl,
        client,
        industry,
      },
    });

    res.json({ success: true, data: caseStudy });
  } catch (error) {
    console.error("Error updating case study:", error);
    res.status(500).json({ error: "Failed to update case study" });
  }
};

// DELETE /api/consulting-firm/case-studies/:id - Delete case study (Admin)
export const deleteCaseStudy = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.consultingCaseStudy.delete({
      where: {
        id,
        tenantId,
      },
    });

    res.json({ success: true, message: "Case study deleted successfully" });
  } catch (error) {
    console.error("Error deleting case study:", error);
    res.status(500).json({ error: "Failed to delete case study" });
  }
};

// GET /api/consulting-firm/case-studies/industries - Get all industries
export const getIndustries = async (req, res) => {
  try {
    const { tenantId } = req;

    // Get unique industries from case studies
    const caseStudies = await prisma.consultingCaseStudy.findMany({
      where: {
        tenantId,
        industry: { not: null },
      },
      select: { industry: true },
      distinct: ["industry"],
    });

    const industries = caseStudies
      .map((cs) => cs.industry)
      .filter(Boolean)
      .sort();

    res.json({ success: true, data: industries });
  } catch (error) {
    console.error("Error fetching industries:", error);
    res.status(500).json({ error: "Failed to fetch industries" });
  }
};

// GET /api/consulting-firm/case-studies/featured - Get featured case studies
export const getFeaturedCaseStudies = async (req, res) => {
  try {
    const { tenantId } = req;
    const { limit = 3 } = req.query;

    const caseStudies = await prisma.consultingCaseStudy.findMany({
      where: {
        tenantId,
      },
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
    });

    res.json({ success: true, data: caseStudies });
  } catch (error) {
    console.error("Error fetching featured case studies:", error);
    res.status(500).json({ error: "Failed to fetch featured case studies" });
  }
};
