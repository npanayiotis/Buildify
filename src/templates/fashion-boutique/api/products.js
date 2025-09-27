import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/fashion-boutique/products - Get all products
export const getProducts = async (req, res) => {
  try {
    const { tenantId } = req;
    const { category, featured, search, page = 1, limit = 12 } = req.query;

    const where = {
      tenantId,
      isActive: true,
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
        { tags: { has: search } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [
          { isFeatured: "desc" },
          { order: "asc" },
          { createdAt: "desc" },
        ],
        skip,
        take: parseInt(limit),
      }),
      prisma.product.count({ where }),
    ]);

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// GET /api/fashion-boutique/products/:id - Get single product
export const getProduct = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: {
        id,
        tenantId,
        isActive: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// POST /api/fashion-boutique/products - Create new product (Admin)
export const createProduct = async (req, res) => {
  try {
    const { tenantId } = req;
    const {
      name,
      description,
      price,
      comparePrice,
      sku,
      images,
      category,
      tags,
      inventory,
      isFeatured,
    } = req.body;

    // Get the highest order number
    const lastProduct = await prisma.product.findFirst({
      where: { tenantId },
      orderBy: { order: "desc" },
    });

    const product = await prisma.product.create({
      data: {
        tenantId,
        name,
        description,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        sku: sku || null,
        images: images || [],
        category: category || "Uncategorized",
        tags: tags || [],
        inventory: parseInt(inventory) || 0,
        isFeatured: isFeatured === true,
        order: lastProduct ? lastProduct.order + 1 : 0,
      },
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// PUT /api/fashion-boutique/products/:id - Update product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const {
      name,
      description,
      price,
      comparePrice,
      sku,
      images,
      category,
      tags,
      inventory,
      isFeatured,
      isActive,
    } = req.body;

    const product = await prisma.product.update({
      where: {
        id,
        tenantId,
      },
      data: {
        name,
        description,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        sku,
        images,
        category,
        tags,
        inventory: parseInt(inventory),
        isFeatured,
        isActive,
      },
    });

    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// DELETE /api/fashion-boutique/products/:id - Delete product (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.product.delete({
      where: {
        id,
        tenantId,
      },
    });

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

// PUT /api/fashion-boutique/products/reorder - Reorder products (Admin)
export const reorderProducts = async (req, res) => {
  try {
    const { tenantId } = req;
    const { products } = req.body;

    const updatePromises = products.map(({ id, order }) =>
      prisma.product.update({
        where: { id, tenantId },
        data: { order },
      })
    );

    await Promise.all(updatePromises);

    res.json({ success: true, message: "Products reordered successfully" });
  } catch (error) {
    console.error("Error reordering products:", error);
    res.status(500).json({ error: "Failed to reorder products" });
  }
};

// GET /api/fashion-boutique/categories - Get all categories
export const getCategories = async (req, res) => {
  try {
    const { tenantId } = req;

    const categories = await prisma.productCategory.findMany({
      where: {
        tenantId,
        isActive: true,
      },
      orderBy: { order: "asc" },
    });

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// POST /api/fashion-boutique/categories - Create category (Admin)
export const createCategory = async (req, res) => {
  try {
    const { tenantId } = req;
    const { name, slug, description, image } = req.body;

    // Get the highest order number
    const lastCategory = await prisma.productCategory.findFirst({
      where: { tenantId },
      orderBy: { order: "desc" },
    });

    const category = await prisma.productCategory.create({
      data: {
        tenantId,
        name,
        slug,
        description,
        image,
        order: lastCategory ? lastCategory.order + 1 : 0,
      },
    });

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Failed to create category" });
  }
};
