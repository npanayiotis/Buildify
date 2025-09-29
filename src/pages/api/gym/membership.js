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
        const { active } = req.query;

        const where = {
          tenantId,
          ...(active !== undefined && { isActive: active === 'true' })
        };

        const plans = await prisma.membershipPlan.findMany({
          where,
          orderBy: [
            { order: 'asc' },
            { price: 'asc' }
          ]
        });

        res.status(200).json(plans);
      } catch (error) {
        console.error('Error fetching membership plans:', error);
        res.status(500).json({ error: 'Failed to fetch membership plans' });
      }
      break;

    case 'POST':
      try {
        const { name, price, period, features, isPopular } = req.body;

        if (!name || price === undefined || !period) {
          return res.status(400).json({ error: 'Name, price, and period are required' });
        }

        const plan = await prisma.membershipPlan.create({
          data: {
            tenantId,
            name,
            price: parseFloat(price),
            period,
            features: features || [],
            isPopular: isPopular || false,
            isActive: true
          }
        });

        res.status(201).json(plan);
      } catch (error) {
        console.error('Error creating membership plan:', error);
        res.status(500).json({ error: 'Failed to create membership plan' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
