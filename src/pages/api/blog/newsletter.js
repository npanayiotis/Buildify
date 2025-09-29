import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { tenantId } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID is required' });
  }

  switch (method) {
    case 'POST':
      try {
        const { email, name, source } = req.body;

        if (!email) {
          return res.status(400).json({ error: 'Email is required' });
        }

        // Check if email already exists
        const existingSubscriber = await prisma.newsletterSubscriber.findFirst({
          where: {
            tenantId,
            email
          }
        });

        if (existingSubscriber) {
          if (existingSubscriber.isActive) {
            return res.status(400).json({ error: 'Email already subscribed' });
          } else {
            // Reactivate existing subscriber
            const subscriber = await prisma.newsletterSubscriber.update({
              where: { id: existingSubscriber.id },
              data: {
                isActive: true,
                name: name || existingSubscriber.name,
                source: source || existingSubscriber.source
              }
            });

            return res.status(200).json({
              message: 'Successfully resubscribed to newsletter',
              subscriber
            });
          }
        }

        // Create new subscriber
        const subscriber = await prisma.newsletterSubscriber.create({
          data: {
            tenantId,
            email,
            name,
            source: source || 'website',
            isActive: true
          }
        });

        res.status(201).json({
          message: 'Successfully subscribed to newsletter',
          subscriber
        });
      } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({ error: 'Failed to subscribe to newsletter' });
      }
      break;

    case 'GET':
      try {
        const { page = 1, limit = 50, active } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {
          tenantId,
          ...(active !== undefined && { isActive: active === 'true' })
        };

        const [subscribers, total] = await Promise.all([
          prisma.newsletterSubscriber.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit)
          }),
          prisma.newsletterSubscriber.count({ where })
        ]);

        res.status(200).json({
          subscribers,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      } catch (error) {
        console.error('Error fetching newsletter subscribers:', error);
        res.status(500).json({ error: 'Failed to fetch newsletter subscribers' });
      }
      break;

    case 'DELETE':
      try {
        const { email } = req.body;

        if (!email) {
          return res.status(400).json({ error: 'Email is required' });
        }

        const subscriber = await prisma.newsletterSubscriber.findFirst({
          where: {
            tenantId,
            email
          }
        });

        if (!subscriber) {
          return res.status(404).json({ error: 'Subscriber not found' });
        }

        await prisma.newsletterSubscriber.update({
          where: { id: subscriber.id },
          data: { isActive: false }
        });

        res.status(200).json({ message: 'Successfully unsubscribed from newsletter' });
      } catch (error) {
        console.error('Error unsubscribing from newsletter:', error);
        res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
