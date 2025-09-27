import {
  authenticateToken,
  requireTenant,
} from "../../../../../shared/auth/middleware.js";
import * as ordersAPI from "../../../../../templates/fashion-boutique/api/orders.js";

export default async function handler(req, res) {
  try {
    // For order viewing, we don't require authentication (customer can view their order)
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
      return await ordersAPI.getOrder(req, res);
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
        if (req.query.action === "status") {
          return await ordersAPI.updateOrderStatus(req, res);
        } else if (req.query.action === "payment") {
          return await ordersAPI.updatePaymentStatus(req, res);
        }
        return res.status(405).json({ error: "Method not allowed" });
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Authentication required" });
  }
}
