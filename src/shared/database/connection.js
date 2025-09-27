import { PrismaClient } from '@prisma/client';

// Global Prisma client instance
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Multi-tenant database helper
export const getTenantDb = (tenantId) => {
  return {
    ...prisma,
    // Add tenant-specific queries here
    async findManyWithTenant(model, options = {}) {
      return prisma[model].findMany({
        ...options,
        where: {
          ...options.where,
          tenantId,
        },
      });
    },
    async findUniqueWithTenant(model, options = {}) {
      return prisma[model].findUnique({
        ...options,
        where: {
          ...options.where,
          tenantId,
        },
      });
    },
    async createWithTenant(model, data) {
      return prisma[model].create({
        data: {
          ...data,
          tenantId,
        },
      });
    },
  };
};

export default prisma;
