import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { tenantId } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID is required' });
  }

  switch (method) {
    case 'GET':
      try {
        const { page = 1, limit = 20, active } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {
          tenantId,
          ...(active !== undefined && { isActive: active === 'true' })
        };

        const [members, total] = await Promise.all([
          prisma.gymMember.findMany({
            where,
            include: {
              plan: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  period: true
                }
              }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit)
          }),
          prisma.gymMember.count({ where })
        ]);

        res.status(200).json({
          members,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      } catch (error) {
        console.error('Error fetching gym members:', error);
        res.status(500).json({ error: 'Failed to fetch gym members' });
      }
      break;

    case 'POST':
      try {
        const { name, email, phone, planId } = req.body;

        if (!name || !email) {
          return res.status(400).json({ error: 'Name and email are required' });
        }

        // Check if member already exists
        const existingMember = await prisma.gymMember.findFirst({
          where: {
            tenantId,
            email
          }
        });

        if (existingMember) {
          return res.status(409).json({ error: 'Member with this email already exists' });
        }

        const member = await prisma.gymMember.create({
          data: {
            tenantId,
            name,
            email,
            phone,
            planId: planId || null,
            isActive: true
          },
          include: {
            plan: {
              select: {
                id: true,
                name: true,
                price: true,
                period: true
              }
            }
          }
        });

        res.status(201).json({
          message: 'Member registered successfully',
          member
        });
      } catch (error) {
        console.error('Error creating gym member:', error);
        res.status(500).json({ error: 'Failed to create gym member' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
