import {
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../../../../templates/online-store/api/products.js";
import { requireTenant, requireRole } from "../../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const product = await getProductById(tenantId, id);
        if (!product) {
          return res.status(404).json({ success: false, error: "Product not found" });
        }
        return res.status(200).json({ success: true, data: product });

      case "PUT":
        await requireRole(tenantId, req, res, ["admin", "editor"]);
        
        const updateData = req.body;
        const updatedProduct = await updateProduct(tenantId, id, updateData);
        return res.status(200).json({ success: true, data: updatedProduct });

      case "DELETE":
        await requireRole(tenantId, req, res, ["admin"]);
        
        await deleteProduct(tenantId, id);
        return res.status(200).json({ success: true, message: "Product deleted" });

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Product API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
