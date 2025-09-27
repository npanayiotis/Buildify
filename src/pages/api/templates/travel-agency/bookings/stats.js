import { getBookingStats } from "../../../../../templates/travel-agency/api/bookings.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    if (method === "GET") {
      const stats = await getBookingStats(tenantId);
      return res.status(200).json({ success: true, data: stats });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Booking stats API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
