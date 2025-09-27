import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/tech-startup/services - Get all services
export const getServices = async (req, res) => {
  try {
    const { tenantId } = req;

    const services = await prisma.techStartupService.findMany({
      where: {
        tenantId,
        isActive: true,
      },
      orderBy: { order: "asc" },
    });

    res.json({ success: true, data: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

// POST /api/tech-startup/services - Create new service
export const createService = async (req, res) => {
  try {
    const { tenantId } = req;
    const { title, description, icon, price, features } = req.body;

    // Get the highest order number
    const lastService = await prisma.techStartupService.findFirst({
      where: { tenantId },
      orderBy: { order: "desc" },
    });

    const service = await prisma.techStartupService.create({
      data: {
        tenantId,
        title,
        description,
        icon: icon || "🚀",
        price: price ? parseFloat(price) : null,
        features: features || [],
        order: lastService ? lastService.order + 1 : 0,
      },
    });

    res.status(201).json({ success: true, data: service });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
};

// PUT /api/tech-startup/services/:id - Update service
export const updateService = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const { title, description, icon, price, features, isActive } = req.body;

    const service = await prisma.techStartupService.update({
      where: {
        id,
        tenantId, // Ensure user can only update their own services
      },
      data: {
        title,
        description,
        icon,
        price: price ? parseFloat(price) : null,
        features,
        isActive,
      },
    });

    res.json({ success: true, data: service });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};

// DELETE /api/tech-startup/services/:id - Delete service
export const deleteService = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.techStartupService.delete({
      where: {
        id,
        tenantId, // Ensure user can only delete their own services
      },
    });

    res.json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
};

// PUT /api/tech-startup/services/reorder - Reorder services
export const reorderServices = async (req, res) => {
  try {
    const { tenantId } = req;
    const { services } = req.body; // Array of { id, order }

    const updatePromises = services.map(({ id, order }) =>
      prisma.techStartupService.update({
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
