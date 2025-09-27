import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/fashion-boutique/cart - Get user's cart
export const getCart = async (req, res) => {
  try {
    const { tenantId } = req;
    const { sessionId } = req.query;

    // In a real app, you'd use user authentication
    // For now, we'll use sessionId for anonymous carts
    const cart = await prisma.cart.findFirst({
      where: {
        tenantId,
        sessionId: sessionId || "anonymous",
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json({ success: true, data: cart || { items: [], total: 0 } });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

// POST /api/fashion-boutique/cart/add - Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { tenantId } = req;
    const { productId, quantity = 1, sessionId } = req.body;

    // Check if product exists and is available
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        tenantId,
        isActive: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.inventory < quantity) {
      return res.status(400).json({ error: "Insufficient inventory" });
    }

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: {
        tenantId,
        sessionId: sessionId || "anonymous",
      },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          tenantId,
          sessionId: sessionId || "anonymous",
        },
      });
    }

    // Check if item already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity;
      if (product.inventory < newQuantity) {
        return res.status(400).json({ error: "Insufficient inventory" });
      }

      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
        include: { product: true },
      });

      return res.json({ success: true, data: updatedItem });
    } else {
      // Add new item
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
        include: { product: true },
      });

      return res.json({ success: true, data: newItem });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

// PUT /api/fashion-boutique/cart/update - Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { tenantId } = req;
    const { itemId, quantity } = req.body;

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          tenantId,
        },
      },
      include: {
        product: true,
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (cartItem.product.inventory < quantity) {
      return res.status(400).json({ error: "Insufficient inventory" });
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: { product: true },
    });

    res.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ error: "Failed to update cart item" });
  }
};

// DELETE /api/fashion-boutique/cart/remove/:itemId - Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { tenantId } = req;
    const { itemId } = req.params;

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: itemId,
        cart: {
          tenantId,
        },
      },
    });

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: { id: itemId },
    });

    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};

// POST /api/fashion-boutique/cart/clear - Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const { tenantId } = req;
    const { sessionId } = req.body;

    const cart = await prisma.cart.findFirst({
      where: {
        tenantId,
        sessionId: sessionId || "anonymous",
      },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });
    }

    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
