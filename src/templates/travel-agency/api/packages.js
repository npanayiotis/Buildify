import { prisma } from "../../../shared/database/connection.js";
import { requireTenant, requireRole } from "../../../shared/auth/middleware.js";

export const createPackage = async (tenantId, packageData) => {
  return await prisma.travelPackage.create({
    data: {
      ...packageData,
      tenantId,
    },
  });
};

export const getPackages = async (tenantId, filters = {}) => {
  const where = {
    tenantId,
    ...(filters.destination && {
      destination: { contains: filters.destination, mode: "insensitive" },
    }),
    ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    ...(filters.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
    ...(filters.minPrice && { price: { gte: filters.minPrice } }),
    ...(filters.maxPrice && { price: { lte: filters.maxPrice } }),
    ...(filters.search && {
      OR: [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
        { destination: { contains: filters.search, mode: "insensitive" } },
      ],
    }),
  };

  return await prisma.travelPackage.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getPackageById = async (tenantId, packageId) => {
  return await prisma.travelPackage.findFirst({
    where: {
      id: packageId,
      tenantId,
    },
  });
};

export const updatePackage = async (tenantId, packageId, updateData) => {
  return await prisma.travelPackage.update({
    where: {
      id: packageId,
      tenantId,
    },
    data: updateData,
  });
};

export const deletePackage = async (tenantId, packageId) => {
  return await prisma.travelPackage.delete({
    where: {
      id: packageId,
      tenantId,
    },
  });
};

export const getFeaturedPackages = async (tenantId) => {
  return await prisma.travelPackage.findMany({
    where: {
      tenantId,
      isFeatured: true,
      isActive: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getDestinations = async (tenantId) => {
  const packages = await prisma.travelPackage.findMany({
    where: {
      tenantId,
      isActive: true,
    },
    select: {
      destination: true,
    },
  });

  return [...new Set(packages.map((pkg) => pkg.destination))];
};
