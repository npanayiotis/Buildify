import {
  createProduct,
  getProducts,
  getFeaturedProducts,
} from "../../../../templates/online-store/api/products.js";
import { requireTenant, requireRole } from "../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const { featured, category, search, isActive } = req.query;
        
        if (featured === "true") {
          const products = await getFeaturedProducts(tenantId);
          return res.status(200).json({ success: true, data: products });
        }

        const filters = {
          ...(category && { category }),
          ...(search && { search }),
          ...(isActive !== undefined && { isActive: isActive === "true" }),
        };

        const products = await getProducts(tenantId, filters);
        return res.status(200).json({ success: true, data: products });

      case "POST":
        await requireRole(tenantId, req, res, ["admin", "editor"]);
        
        const productData = req.body;
        const newProduct = await createProduct(tenantId, productData);
        return res.status(201).json({ success: true, data: newProduct });

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Products API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
