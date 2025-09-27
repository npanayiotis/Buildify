import * as cartAPI from "../../../../templates/fashion-boutique/api/cart.js";

export default async function handler(req, res) {
  try {
    // Get tenant from subdomain or other method
    const host = req.headers.host;
    const subdomain = host.split(".")[0];

    // Find tenant by subdomain
    const { prisma } = await import("../../../../shared/database/connection.js");
    const tenant = await prisma.tenant.findUnique({
      where: { subdomain },
    });

    if (!tenant) {
      return res.status(404).json({ error: "Tenant not found" });
    }

    req.tenantId = tenant.id;

    // Route to appropriate handler based on HTTP method
    switch (req.method) {
      case "GET":
        return await cartAPI.getCart(req, res);
      case "POST":
        if (req.query.action === "add") {
          return await cartAPI.addToCart(req, res);
        } else if (req.query.action === "clear") {
          return await cartAPI.clearCart(req, res);
        }
        return res.status(405).json({ error: "Method not allowed" });
      case "PUT":
        if (req.query.action === "update") {
          return await cartAPI.updateCartItem(req, res);
        }
        return res.status(405).json({ error: "Method not allowed" });
      case "DELETE":
        if (req.query.action === "remove") {
          return await cartAPI.removeFromCart(req, res);
        }
        return res.status(405).json({ error: "Method not allowed" });
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
