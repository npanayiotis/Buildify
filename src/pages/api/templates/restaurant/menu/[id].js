import {
  authenticateToken,
  requireTenant,
} from "../../../../../shared/auth/middleware.js";
import * as menuAPI from "../../../../../templates/restaurant/api/menu.js";

export default async function handler(req, res) {
  try {
    // For public menu item viewing, we don't require authentication
    if (req.method === "GET") {
      // Get tenant from subdomain or other method
      const host = req.headers.host;
      const subdomain = host.split(".")[0];

      // Find tenant by subdomain
      const { prisma } = await import("../../../../../shared/database/connection.js");
      const tenant = await prisma.tenant.findUnique({
        where: { subdomain },
      });

      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }

      req.tenantId = tenant.id;
      req.params = { id: req.query.id };
      return await menuAPI.getMenuItem(req, res);
    }

    // For admin operations, require authentication
    await new Promise((resolve, reject) => {
      authenticateToken(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await new Promise((resolve, reject) => {
      requireTenant(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Add the id from the URL to req.params
    req.params = { id: req.query.id };

    // Route to appropriate handler based on HTTP method
    switch (req.method) {
      case "PUT":
        return await menuAPI.updateMenuItem(req, res);
      case "DELETE":
        return await menuAPI.deleteMenuItem(req, res);
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Authentication required" });
  }
}
