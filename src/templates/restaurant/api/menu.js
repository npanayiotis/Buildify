import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/restaurant/menu - Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const { tenantId } = req;
    const { category, featured, search, page = 1, limit = 20 } = req.query;

    const where = {
      tenantId,
      isAvailable: true,
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
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { ingredients: { has: search } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [menuItems, total] = await Promise.all([
      prisma.restaurantMenu.findMany({
        where,
        orderBy: [
          { category: "asc" },
          { order: "asc" },
          { createdAt: "desc" },
        ],
        skip,
        take: parseInt(limit),
      }),
      prisma.restaurantMenu.count({ where }),
    ]);

    res.json({
      success: true,
      data: menuItems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// GET /api/restaurant/menu/:id - Get single menu item
export const getMenuItem = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const menuItem = await prisma.restaurantMenu.findFirst({
      where: {
        id,
        tenantId,
        isAvailable: true,
      },
    });

    if (!menuItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }

    res.json({ success: true, data: menuItem });
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ error: "Failed to fetch menu item" });
  }
};

// POST /api/restaurant/menu - Create new menu item (Admin)
export const createMenuItem = async (req, res) => {
  try {
    const { tenantId } = req;
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      ingredients,
      allergens,
      isFeatured = false,
      isAvailable = true,
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Name and price are required" });
    }

    // Get the highest order number for this category
    const lastItem = await prisma.restaurantMenu.findFirst({
      where: { tenantId, category: category || "Main Course" },
      orderBy: { order: "desc" },
    });

    const menuItem = await prisma.restaurantMenu.create({
      data: {
        tenantId,
        name,
        description: description || "",
        price: parseFloat(price),
        imageUrl,
        category: category || "Main Course",
        ingredients: ingredients || [],
        allergens: allergens || [],
        isFeatured,
        isAvailable,
        order: lastItem ? lastItem.order + 1 : 0,
      },
    });

    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ error: "Failed to create menu item" });
  }
};

// PUT /api/restaurant/menu/:id - Update menu item (Admin)
export const updateMenuItem = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const {
      name,
      description,
      price,
      imageUrl,
      category,
      ingredients,
      allergens,
      isFeatured,
      isAvailable,
    } = req.body;

    const menuItem = await prisma.restaurantMenu.update({
      where: {
        id,
        tenantId,
      },
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        category,
        ingredients,
        allergens,
        isFeatured,
        isAvailable,
      },
    });

    res.json({ success: true, data: menuItem });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ error: "Failed to update menu item" });
  }
};

// DELETE /api/restaurant/menu/:id - Delete menu item (Admin)
export const deleteMenuItem = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.restaurantMenu.delete({
      where: {
        id,
        tenantId,
      },
    });

    res.json({ success: true, message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};

// PUT /api/restaurant/menu/reorder - Reorder menu items (Admin)
export const reorderMenuItems = async (req, res) => {
  try {
    const { tenantId } = req;
    const { menuItems } = req.body;

    const updatePromises = menuItems.map(({ id, order }) =>
      prisma.restaurantMenu.update({
        where: { id, tenantId },
        data: { order },
      })
    );

    await Promise.all(updatePromises);

    res.json({ success: true, message: "Menu items reordered successfully" });
  } catch (error) {
    console.error("Error reordering menu items:", error);
    res.status(500).json({ error: "Failed to reorder menu items" });
  }
};

// GET /api/restaurant/menu/categories - Get all categories
export const getCategories = async (req, res) => {
  try {
    const { tenantId } = req;

    // Get unique categories from available menu items
    const menuItems = await prisma.restaurantMenu.findMany({
      where: {
        tenantId,
        isAvailable: true,
        category: { not: null },
      },
      select: { category: true },
      distinct: ["category"],
    });

    const categories = menuItems.map((item) => ({
      name: item.category,
      slug: item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      count: 0, // We'll calculate this separately if needed
    }));

    // Get item counts for each category
    for (const category of categories) {
      const count = await prisma.restaurantMenu.count({
        where: {
          tenantId,
          isAvailable: true,
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
