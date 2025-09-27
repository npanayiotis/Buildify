import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/photography-portfolio/projects - Get all portfolio projects
export const getProjects = async (req, res) => {
  try {
    const { tenantId } = req;
    const { category, featured, search, page = 1, limit = 20 } = req.query;

    const where = {
      tenantId,
    };

    // Add filters
    if (category && category !== "all") {
      where.category = category;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [projects, total] = await Promise.all([
      prisma.portfolioProject.findMany({
        where,
        orderBy: [
          { isFeatured: "desc" },
          { order: "asc" },
          { createdAt: "desc" },
        ],
        skip,
        take: parseInt(limit),
      }),
      prisma.portfolioProject.count({ where }),
    ]);

    res.json({
      success: true,
      data: projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// GET /api/photography-portfolio/projects/:id - Get single project
export const getProject = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const project = await prisma.portfolioProject.findFirst({
      where: {
        id,
        tenantId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// POST /api/photography-portfolio/projects - Create new project (Admin)
export const createProject = async (req, res) => {
  try {
    const { tenantId } = req;
    const {
      title,
      description,
      category,
      images,
      isFeatured = false,
    } = req.body;

    if (!title || !images || images.length === 0) {
      return res.status(400).json({ error: "Title and at least one image are required" });
    }

    // Get the highest order number for this category
    const lastProject = await prisma.portfolioProject.findFirst({
      where: { tenantId, category: category || "Portfolio" },
      orderBy: { order: "desc" },
    });

    const project = await prisma.portfolioProject.create({
      data: {
        tenantId,
        title,
        description: description || "",
        category: category || "Portfolio",
        images: images || [],
        isFeatured,
        order: lastProject ? lastProject.order + 1 : 0,
      },
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// PUT /api/photography-portfolio/projects/:id - Update project (Admin)
export const updateProject = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const {
      title,
      description,
      category,
      images,
      isFeatured,
    } = req.body;

    const project = await prisma.portfolioProject.update({
      where: {
        id,
        tenantId,
      },
      data: {
        title,
        description,
        category,
        images,
        isFeatured,
      },
    });

    res.json({ success: true, data: project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// DELETE /api/photography-portfolio/projects/:id - Delete project (Admin)
export const deleteProject = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.portfolioProject.delete({
      where: {
        id,
        tenantId,
      },
    });

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

// PUT /api/photography-portfolio/projects/reorder - Reorder projects (Admin)
export const reorderProjects = async (req, res) => {
  try {
    const { tenantId } = req;
    const { projects } = req.body;

    const updatePromises = projects.map(({ id, order }) =>
      prisma.portfolioProject.update({
        where: { id, tenantId },
        data: { order },
      })
    );

    await Promise.all(updatePromises);

    res.json({ success: true, message: "Projects reordered successfully" });
  } catch (error) {
    console.error("Error reordering projects:", error);
    res.status(500).json({ error: "Failed to reorder projects" });
  }
};

// GET /api/photography-portfolio/projects/categories - Get all categories
export const getCategories = async (req, res) => {
  try {
    const { tenantId } = req;

    // Get unique categories from projects
    const projects = await prisma.portfolioProject.findMany({
      where: {
        tenantId,
        category: { not: null },
      },
      select: { category: true },
      distinct: ["category"],
    });

    const categories = projects.map((project) => ({
      name: project.category,
      slug: project.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      count: 0, // We'll calculate this separately if needed
    }));

    // Get project counts for each category
    for (const category of categories) {
      const count = await prisma.portfolioProject.count({
        where: {
          tenantId,
          category: category.name,
        },
      });
      category.count = count;
    }

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// GET /api/photography-portfolio/projects/featured - Get featured projects
export const getFeaturedProjects = async (req, res) => {
  try {
    const { tenantId } = req;
    const { limit = 6 } = req.query;

    const projects = await prisma.portfolioProject.findMany({
      where: {
        tenantId,
        isFeatured: true,
      },
      orderBy: [
        { order: "asc" },
        { createdAt: "desc" },
      ],
      take: parseInt(limit),
    });

    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    res.status(500).json({ error: "Failed to fetch featured projects" });
  }
};
