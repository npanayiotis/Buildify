import { getOrderStats } from "../../../../../templates/online-store/api/orders.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    if (method === "GET") {
      const stats = await getOrderStats(tenantId);
      return res.status(200).json({ success: true, data: stats });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Order stats API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
