import {
  getBookingById,
  updateBooking,
} from "../../../../../templates/travel-agency/api/bookings.js";
import { requireTenant, requireRole } from "../../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const booking = await getBookingById(tenantId, id);
        if (!booking) {
          return res.status(404).json({ success: false, error: "Booking not found" });
        }
        return res.status(200).json({ success: true, data: booking });

      case "PUT":
        await requireRole(tenantId, req, res, ["admin", "editor"]);
        
        const updateData = req.body;
        const updatedBooking = await updateBooking(tenantId, id, updateData);
        return res.status(200).json({ success: true, data: updatedBooking });

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Booking API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
