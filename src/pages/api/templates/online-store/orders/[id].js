import {
  getOrderById,
  updateOrder,
} from "../../../../../templates/online-store/api/orders.js";
import { requireTenant, requireRole } from "../../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const order = await getOrderById(tenantId, id);
        if (!order) {
          return res.status(404).json({ success: false, error: "Order not found" });
        }
        return res.status(200).json({ success: true, data: order });

      case "PUT":
        await requireRole(tenantId, req, res, ["admin", "editor"]);
        
        const updateData = req.body;
        const updatedOrder = await updateOrder(tenantId, id, updateData);
        return res.status(200).json({ success: true, data: updatedOrder });

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Order API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
