import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/connection.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId, tenantId) => {
  return jwt.sign(
    { userId, tenantId },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const createUser = async (userData) => {
  const { email, password, name, tenantId, templateId } = userData;
  
  const hashedPassword = await hashPassword(password);
  
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      tenantId,
      templateId,
      role: 'ADMIN' // First user of a tenant is admin
    },
    include: {
      tenant: true,
      template: true
    }
  });
};

export const authenticateUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { tenant: true, template: true }
  });

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user.id, user.tenantId);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tenant: user.tenant,
      template: user.template
    },
    token
  };
};

export const createTenant = async (tenantData) => {
  const { name, subdomain, templateType } = tenantData;
  
  // Check if subdomain is available
  const existingTenant = await prisma.tenant.findUnique({
    where: { subdomain }
  });

  if (existingTenant) {
    throw new Error('Subdomain already taken');
  }

  // Create tenant
  const tenant = await prisma.tenant.create({
    data: {
      name,
      subdomain,
      plan: 'STARTER'
    }
  });

  // Create template
  const template = await prisma.template.create({
    data: {
      name: `${name} Template`,
      type: templateType,
      tenantId: tenant.id
    }
  });

  // Create default settings
  await prisma.tenantSettings.create({
    data: {
      tenantId: tenant.id,
      primaryColor: '#3B82F6',
      secondaryColor: '#6366F1'
    }
  });

  return { tenant, template };
};
