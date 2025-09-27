import {
  createOrder,
  getOrders,
  getOrderStats,
} from "../../../../templates/online-store/api/orders.js";
import { requireTenant, requireRole } from "../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const { stats, status, search } = req.query;
        
        if (stats === "true") {
          const orderStats = await getOrderStats(tenantId);
          return res.status(200).json({ success: true, data: orderStats });
        }

        const filters = {
          ...(status && { status }),
          ...(search && { search }),
        };

        const orders = await getOrders(tenantId, filters);
        return res.status(200).json({ success: true, data: orders });

      case "POST":
        const orderData = req.body;
        const newOrder = await createOrder(tenantId, orderData);
        return res.status(201).json({ success: true, data: newOrder });

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Orders API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
