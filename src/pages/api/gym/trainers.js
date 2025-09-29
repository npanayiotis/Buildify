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

        const trainers = await prisma.gymTrainer.findMany({
          where,
          orderBy: [
            { order: 'asc' },
            { name: 'asc' }
          ]
        });

        res.status(200).json(trainers);
      } catch (error) {
        console.error('Error fetching gym trainers:', error);
        res.status(500).json({ error: 'Failed to fetch gym trainers' });
      }
      break;

    case 'POST':
      try {
        const { name, role, bio, imageUrl, specialties, certifications, experience } = req.body;

        if (!name || !role || !bio) {
          return res.status(400).json({ error: 'Name, role, and bio are required' });
        }

        const trainer = await prisma.gymTrainer.create({
          data: {
            tenantId,
            name,
            role,
            bio,
            imageUrl,
            specialties: specialties || [],
            certifications: certifications || [],
            experience,
            isActive: true
          }
        });

        res.status(201).json(trainer);
      } catch (error) {
        console.error('Error creating gym trainer:', error);
        res.status(500).json({ error: 'Failed to create gym trainer' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
