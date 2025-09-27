import {
  createBooking,
  getBookings,
  getBookingStats,
} from "../../../../templates/travel-agency/api/bookings.js";
import { requireTenant, requireRole } from "../../../../shared/auth/middleware.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    switch (method) {
      case "GET":
        const { stats, status, search } = req.query;
        
        if (stats === "true") {
          const bookingStats = await getBookingStats(tenantId);
          return res.status(200).json({ success: true, data: bookingStats });
        }

        const filters = {
          ...(status && { status }),
          ...(search && { search }),
        };

        const bookings = await getBookings(tenantId, filters);
        return res.status(200).json({ success: true, data: bookings });

      case "POST":
        const bookingData = req.body;
        const newBooking = await createBooking(tenantId, bookingData);
        return res.status(201).json({ success: true, data: newBooking });

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Bookings API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
