import * as cartAPI from "../../../../../templates/fashion-boutique/api/cart.js";

export default async function handler(req, res) {
  try {
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
    req.params = { itemId: req.query.itemId };

    // Route to appropriate handler based on HTTP method
    switch (req.method) {
      case "PUT":
        return await cartAPI.updateCartItem(req, res);
      case "DELETE":
        return await cartAPI.removeFromCart(req, res);
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
