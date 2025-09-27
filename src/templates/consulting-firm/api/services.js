import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/consulting-firm/services - Get all services
export const getServices = async (req, res) => {
  try {
    const { tenantId } = req;
    const { search, page = 1, limit = 20 } = req.query;

    const where = {
      tenantId,
      isActive: true,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [services, total] = await Promise.all([
      prisma.consultingService.findMany({
        where,
        orderBy: [
          { order: "asc" },
          { createdAt: "desc" },
        ],
        skip,
        take: parseInt(limit),
      }),
      prisma.consultingService.count({ where }),
    ]);

    res.json({
      success: true,
      data: services,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// GET /api/consulting-firm/services/:id - Get single service
export const getService = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const service = await prisma.consultingService.findFirst({
      where: {
        id,
        tenantId,
        isActive: true,
      },
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ success: true, data: service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
};

// POST /api/consulting-firm/services - Create new service (Admin)
export const createService = async (req, res) => {
  try {
    const { tenantId } = req;
    const {
      title,
      description,
      icon,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    // Get the highest order number
    const lastService = await prisma.consultingService.findFirst({
      where: { tenantId },
      orderBy: { order: "desc" },
    });

    const service = await prisma.consultingService.create({
      data: {
        tenantId,
        title,
        description,
        icon: icon || "💼",
        order: lastService ? lastService.order + 1 : 0,
      },
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
};

// PUT /api/consulting-firm/services/:id - Update service (Admin)
export const updateService = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const {
      title,
      description,
      icon,
      isActive,
    } = req.body;

    const service = await prisma.consultingService.update({
      where: {
        id,
        tenantId,
      },
      data: {
        title,
        description,
        icon,
        isActive,
      },
    });

    res.json({ success: true, data: service });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};

// DELETE /api/consulting-firm/services/:id - Delete service (Admin)
export const deleteService = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.consultingService.delete({
      where: {
        id,
        tenantId,
      },
    });

    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
};

// PUT /api/consulting-firm/services/reorder - Reorder services (Admin)
export const reorderServices = async (req, res) => {
  try {
    const { tenantId } = req;
    const { services } = req.body;

    const updatePromises = services.map(({ id, order }) =>
      prisma.consultingService.update({
        where: { id, tenantId },
        data: { order },
      })
    );

    await Promise.all(updatePromises);

    res.json({ success: true, message: "Services reordered successfully" });
  } catch (error) {
    console.error("Error reordering services:", error);
    res.status(500).json({ error: "Failed to reorder services" });
  }
};
