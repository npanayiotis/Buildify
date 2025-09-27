import { updateCartItem, removeFromCart } from "../../../../../templates/online-store/api/cart.js";

export default async function handler(req, res) {
  const { method } = req;
  const { itemId } = req.query;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";
  const sessionId = req.headers["x-session-id"] || "default-session";

  try {
    switch (method) {
      case "PUT":
        const { quantity } = req.body;
        if (quantity === undefined) {
          return res.status(400).json({ success: false, error: "Quantity is required" });
        }
        
        const updatedItem = await updateCartItem(tenantId, sessionId, itemId, quantity);
        return res.status(200).json({ success: true, data: updatedItem });

      case "DELETE":
        await removeFromCart(tenantId, sessionId, itemId);
        return res.status(200).json({ success: true, message: "Item removed from cart" });

      default:
        res.setHeader("Allow", ["PUT", "DELETE"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Cart item API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
