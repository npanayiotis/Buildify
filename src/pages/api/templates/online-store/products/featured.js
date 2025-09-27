import { getFeaturedProducts } from "../../../../../templates/online-store/api/products.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";

  try {
    if (method === "GET") {
      const products = await getFeaturedProducts(tenantId);
      return res.status(200).json({ success: true, data: products });
    } else {
      res.setHeader("Allow", ["GET"]);
      return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Featured products API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
