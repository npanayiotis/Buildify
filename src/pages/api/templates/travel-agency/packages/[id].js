import {
  getPackageById,
  updatePackage,
  deletePackage,
} from "../../../../../templates/travel-agency/api/packages.js";
import { requireTenant, requireRole } from "../../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const packageData = await getPackageById(tenantId, id);
        if (!packageData) {
          return res.status(404).json({ success: false, error: "Package not found" });
        }
        return res.status(200).json({ success: true, data: packageData });

      case "PUT":
        await requireRole(tenantId, req, res, ["admin", "editor"]);
        
        const updateData = req.body;
        const updatedPackage = await updatePackage(tenantId, id, updateData);
        return res.status(200).json({ success: true, data: updatedPackage });

      case "DELETE":
        await requireRole(tenantId, req, res, ["admin"]);
        
        await deletePackage(tenantId, id);
        return res.status(200).json({ success: true, message: "Package deleted" });

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Package API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
