import { prisma } from "../../../shared/database/connection.js";
import { requireTenant, requireRole } from "../../../shared/auth/middleware.js";

export const createOrder = async (tenantId, orderData) => {
  // Generate order number
  const orderNumber = `ORD-${Date.now()}-${Math.random()
    .toString(36)
    .substr(2, 9)
    .toUpperCase()}`;

  return await prisma.order.create({
    data: {
      ...orderData,
      tenantId,
      orderNumber,
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

export const getOrders = async (tenantId, filters = {}) => {
  const where = {
    tenantId,
    ...(filters.status && { status: filters.status }),
    ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus }),
    ...(filters.search && {
      OR: [
        { orderNumber: { contains: filters.search, mode: "insensitive" } },
        { customerName: { contains: filters.search, mode: "insensitive" } },
        { customerEmail: { contains: filters.search, mode: "insensitive" } },
      ],
    }),
  };

  return await prisma.order.findMany({
    where,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getOrderById = async (tenantId, orderId) => {
  return await prisma.order.findFirst({
    where: {
      id: orderId,
      tenantId,
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

export const updateOrder = async (tenantId, orderId, updateData) => {
  return await prisma.order.update({
    where: {
      id: orderId,
      tenantId,
    },
    data: updateData,
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};

export const getOrderStats = async (tenantId) => {
  const [
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue,
  ] = await Promise.all([
    prisma.order.count({ where: { tenantId } }),
    prisma.order.count({ where: { tenantId, status: "PENDING" } }),
    prisma.order.count({ where: { tenantId, status: "PROCESSING" } }),
    prisma.order.count({ where: { tenantId, status: "SHIPPED" } }),
    prisma.order.count({ where: { tenantId, status: "DELIVERED" } }),
    prisma.order.count({ where: { tenantId, status: "CANCELLED" } }),
    prisma.order.aggregate({
      where: { tenantId, status: "DELIVERED" },
      _sum: { totalAmount: true },
    }),
  ]);

  return {
    total: totalOrders,
    pending: pendingOrders,
    processing: processingOrders,
    shipped: shippedOrders,
    delivered: deliveredOrders,
    cancelled: cancelledOrders,
    totalRevenue: totalRevenue._sum.totalAmount || 0,
  };
};
