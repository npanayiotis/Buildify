import { prisma } from "../../../shared/database/connection.js";
import { requireTenant, requireRole } from "../../../shared/auth/middleware.js";

export const createProduct = async (tenantId, productData) => {
  return await prisma.product.create({
    data: {
      ...productData,
      tenantId,
    },
  });
};

export const getProducts = async (tenantId, filters = {}) => {
  const where = {
    tenantId,
    ...(filters.category && { category: filters.category }),
    ...(filters.isActive !== undefined && { isActive: filters.isActive }),
    ...(filters.isFeatured !== undefined && { isFeatured: filters.isFeatured }),
    ...(filters.search && {
      OR: [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ],
    }),
  };

  return await prisma.product.findMany({
    where,
    orderBy: { order: "asc" },
  });
};

export const getProductById = async (tenantId, productId) => {
  return await prisma.product.findFirst({
    where: {
      id: productId,
      tenantId,
    },
  });
};

export const updateProduct = async (tenantId, productId, updateData) => {
  return await prisma.product.update({
    where: {
      id: productId,
      tenantId,
    },
    data: updateData,
  });
};

export const deleteProduct = async (tenantId, productId) => {
  return await prisma.product.delete({
    where: {
      id: productId,
      tenantId,
    },
  });
};

export const getFeaturedProducts = async (tenantId) => {
  return await prisma.product.findMany({
    where: {
      tenantId,
      isFeatured: true,
      isActive: true,
    },
    orderBy: { order: "asc" },
  });
};

export const getProductCategories = async (tenantId) => {
  return await prisma.productCategory.findMany({
    where: {
      tenantId,
      isActive: true,
    },
    orderBy: { order: "asc" },
  });
};
