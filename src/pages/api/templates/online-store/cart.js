import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../../../templates/online-store/api/cart.js";

export default async function handler(req, res) {
  const { method } = req;
  const tenantId = req.headers["x-tenant-id"] || "default-tenant";
  const sessionId = req.headers["x-session-id"] || "default-session";

  try {
    switch (method) {
      case "GET":
        const cart = await getCart(tenantId, sessionId);
        return res.status(200).json({ success: true, data: cart });

      case "POST":
        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
          return res.status(400).json({ success: false, error: "Product ID and quantity are required" });
        }
        
        const cartItem = await addToCart(tenantId, sessionId, productId, quantity);
        return res.status(200).json({ success: true, data: cartItem });

      case "PUT":
        const { itemId, newQuantity } = req.body;
        if (!itemId || newQuantity === undefined) {
          return res.status(400).json({ success: false, error: "Item ID and quantity are required" });
        }
        
        const updatedItem = await updateCartItem(tenantId, sessionId, itemId, newQuantity);
        return res.status(200).json({ success: true, data: updatedItem });

      case "DELETE":
        const { itemId: deleteItemId } = req.body;
        if (deleteItemId) {
          await removeFromCart(tenantId, sessionId, deleteItemId);
        } else {
          await clearCart(tenantId, sessionId);
        }
        return res.status(200).json({ success: true, message: "Cart updated" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }
  } catch (error) {
    console.error("Cart API error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
