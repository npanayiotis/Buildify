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
        const { page = 1, limit = 10, category, tag, search, featured } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {
          tenantId,
          isPublished: true,
          ...(category && { category }),
          ...(tag && { tags: { has: tag } }),
          ...(search && {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
              { excerpt: { contains: search, mode: 'insensitive' } }
            ]
          }),
          ...(featured === 'true' && { isFeatured: true })
        };

        const [posts, total] = await Promise.all([
          prisma.blogPost.findMany({
            where,
            include: {
              author: {
                select: {
                  id: true,
                  email: true,
                  // Add other user fields as needed
                }
              },
              comments: {
                where: { isApproved: true },
                select: { id: true }
              }
            },
            orderBy: [
              { isFeatured: 'desc' },
              { createdAt: 'desc' }
            ],
            skip,
            take: parseInt(limit)
          }),
          prisma.blogPost.count({ where })
        ]);

        res.status(200).json({
          posts,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
      }
      break;

    case 'POST':
      try {
        const { title, content, excerpt, imageUrl, category, tags, isPublished, isFeatured, seoTitle, seoDescription } = req.body;
        
        // Generate slug from title
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Calculate read time (average 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        const post = await prisma.blogPost.create({
          data: {
            tenantId,
            title,
            slug,
            content,
            excerpt,
            imageUrl,
            category,
            tags,
            isPublished,
            isFeatured,
            seoTitle,
            seoDescription,
            readTime,
            authorId: req.user?.id || 'default-author', // You'll need to implement auth
            viewCount: 0
          }
        });

        res.status(201).json(post);
      } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Failed to create blog post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
