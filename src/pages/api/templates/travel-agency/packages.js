import {
  createPackage,
  getPackages,
  getFeaturedPackages,
} from "../../../../templates/travel-agency/api/packages.js";
import { requireTenant, requireRole } from "../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const { featured, destination, search, isActive, minPrice, maxPrice } = req.query;
        
        if (featured === "true") {
          const packages = await getFeaturedPackages(tenantId);
          return res.status(200).json({ success: true, data: packages });
        }

        const filters = {
          ...(destination && { destination }),
          ...(search && { search }),
          ...(isActive !== undefined && { isActive: isActive === "true" }),
          ...(minPrice && { minPrice: parseFloat(minPrice) }),
          ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
        };

        const packages = await getPackages(tenantId, filters);
        return res.status(200).json({ success: true, data: packages });

      case "POST":
        await requireRole(tenantId, req, res, ["admin", "editor"]);
        
        const packageData = req.body;
        const newPackage = await createPackage(tenantId, packageData);
        return res.status(201).json({ success: true, data: newPackage });

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Packages API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
