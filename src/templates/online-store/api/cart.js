import { prisma } from "../../../shared/database/connection.js";
import { requireTenant, requireRole } from "../../../shared/auth/middleware.js";

export const createCart = async (tenantId, sessionId) => {
  return await prisma.cart.create({
    data: {
      tenantId,
      sessionId,
    },
  });
};

export const getCart = async (tenantId, sessionId) => {
  return await prisma.cart.findFirst({
    where: {
      tenantId,
      sessionId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const addToCart = async (tenantId, sessionId, productId, quantity) => {
  // Get or create cart
  let cart = await getCart(tenantId, sessionId);
  if (!cart) {
    cart = await createCart(tenantId, sessionId);
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
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    // Add new item
    return await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }
};

export const updateCartItem = async (tenantId, sessionId, itemId, quantity) => {
  if (quantity <= 0) {
    return await removeFromCart(tenantId, sessionId, itemId);
  }

  return await prisma.cartItem.update({
    where: { id: itemId },
    data: { quantity },
  });
};

export const removeFromCart = async (tenantId, sessionId, itemId) => {
  return await prisma.cartItem.delete({
    where: { id: itemId },
  });
};

export const clearCart = async (tenantId, sessionId) => {
  const cart = await getCart(tenantId, sessionId);
  if (cart) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });
  }
};
