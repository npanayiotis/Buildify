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
        const { page = 1, limit = 10, approved, rating } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {
          tenantId,
          ...(approved !== undefined && { isApproved: approved === 'true' }),
          ...(rating && { rating: parseInt(rating) })
        };

        const [reviews, total] = await Promise.all([
          prisma.restaurantReview.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit)
          }),
          prisma.restaurantReview.count({ where })
        ]);

        // Calculate average rating
        const avgRating = await prisma.restaurantReview.aggregate({
          where: { tenantId, isApproved: true },
          _avg: { rating: true },
          _count: { rating: true }
        });

        res.status(200).json({
          reviews,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          },
          stats: {
            averageRating: avgRating._avg.rating || 0,
            totalReviews: avgRating._count.rating || 0
          }
        });
      } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
      }
      break;

    case 'POST':
      try {
        const { name, email, rating, title, content } = req.body;

        if (!name || !rating || !content) {
          return res.status(400).json({ error: 'Name, rating, and content are required' });
        }

        if (rating < 1 || rating > 5) {
          return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }

        const review = await prisma.restaurantReview.create({
          data: {
            tenantId,
            name,
            email,
            rating: parseInt(rating),
            title,
            content,
            isApproved: false // Reviews need approval
          }
        });

        res.status(201).json({
          message: 'Review submitted successfully. It will be published after approval.',
          review
        });
      } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
