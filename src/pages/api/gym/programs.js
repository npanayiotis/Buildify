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

        const programs = await prisma.gymProgram.findMany({
          where,
          orderBy: [
            { order: 'asc' },
            { name: 'asc' }
          ]
        });

        res.status(200).json(programs);
      } catch (error) {
        console.error('Error fetching gym programs:', error);
        res.status(500).json({ error: 'Failed to fetch gym programs' });
      }
      break;

    case 'POST':
      try {
        const { name, description, price, duration, icon, features } = req.body;

        if (!name || !description || price === undefined || !duration) {
          return res.status(400).json({ error: 'Name, description, price, and duration are required' });
        }

        const program = await prisma.gymProgram.create({
          data: {
            tenantId,
            name,
            description,
            price: parseFloat(price),
            duration,
            icon,
            features: features || [],
            isActive: true
          }
        });

        res.status(201).json(program);
      } catch (error) {
        console.error('Error creating gym program:', error);
        res.status(500).json({ error: 'Failed to create gym program' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
