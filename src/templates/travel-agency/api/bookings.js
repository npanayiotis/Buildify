import { prisma } from "../../../shared/database/connection.js";
import { requireTenant, requireRole } from "../../../shared/auth/middleware.js";

export const createBooking = async (tenantId, bookingData) => {
  return await prisma.travelBooking.create({
    data: {
      ...bookingData,
      tenantId,
    },
    include: {
      package: true,
    },
  });
};

export const getBookings = async (tenantId, filters = {}) => {
  const where = {
    tenantId,
    ...(filters.status && { status: filters.status }),
    ...(filters.paymentStatus && { paymentStatus: filters.paymentStatus }),
    ...(filters.search && {
      OR: [
        { customerName: { contains: filters.search, mode: "insensitive" } },
        { customerEmail: { contains: filters.search, mode: "insensitive" } },
      ],
    }),
  };

  return await prisma.travelBooking.findMany({
    where,
    include: {
      package: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getBookingById = async (tenantId, bookingId) => {
  return await prisma.travelBooking.findFirst({
    where: {
      id: bookingId,
      tenantId,
    },
    include: {
      package: true,
    },
  });
};

export const updateBooking = async (tenantId, bookingId, updateData) => {
  return await prisma.travelBooking.update({
    where: {
      id: bookingId,
      tenantId,
    },
    data: updateData,
    include: {
      package: true,
    },
  });
};

export const getBookingStats = async (tenantId) => {
  const [
    totalBookings,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    completedBookings,
    totalRevenue,
  ] = await Promise.all([
    prisma.travelBooking.count({ where: { tenantId } }),
    prisma.travelBooking.count({ where: { tenantId, status: "PENDING" } }),
    prisma.travelBooking.count({ where: { tenantId, status: "CONFIRMED" } }),
    prisma.travelBooking.count({ where: { tenantId, status: "CANCELLED" } }),
    prisma.travelBooking.count({ where: { tenantId, status: "COMPLETED" } }),
    prisma.travelBooking.aggregate({
      where: { tenantId, status: "COMPLETED" },
      _sum: { totalPrice: true },
    }),
  ]);

  return {
    total: totalBookings,
    pending: pendingBookings,
    confirmed: confirmedBookings,
    cancelled: cancelledBookings,
    completed: completedBookings,
    totalRevenue: totalRevenue._sum.totalPrice || 0,
  };
};
