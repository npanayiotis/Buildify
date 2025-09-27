import jwt from 'jsonwebtoken';
import { prisma } from '../database/connection.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { tenant: true }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    req.tenant = user.tenant;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

export const requireTenant = (req, res, next) => {
  if (!req.tenant) {
    return res.status(400).json({ error: 'Tenant context required' });
  }

  next();
};

// Helper to get tenant context from request
export const getTenantContext = (req) => {
  return {
    tenantId: req.tenant?.id,
    userId: req.user?.id,
    userRole: req.user?.role,
    templateType: req.user?.template?.type
  };
};
