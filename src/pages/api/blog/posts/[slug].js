import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { slug, tenantId } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID is required' });
  }

  switch (method) {
    case 'GET':
      try {
        const post = await prisma.blogPost.findFirst({
          where: {
            slug,
            tenantId,
            isPublished: true
          },
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
              orderBy: { createdAt: 'desc' }
            }
          }
        });

        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }

        // Increment view count
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { viewCount: { increment: 1 } }
        });

        res.status(200).json(post);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
      }
      break;

    case 'PUT':
      try {
        const { title, content, excerpt, imageUrl, category, tags, isPublished, isFeatured, seoTitle, seoDescription } = req.body;
        
        // Generate new slug if title changed
        const newSlug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Calculate read time
        const wordCount = content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200);

        const post = await prisma.blogPost.update({
          where: { slug },
          data: {
            title,
            slug: newSlug,
            content,
            excerpt,
            imageUrl,
            category,
            tags,
            isPublished,
            isFeatured,
            seoTitle,
            seoDescription,
            readTime
          }
        });

        res.status(200).json(post);
      } catch (error) {
        console.error('Error updating blog post:', error);
        res.status(500).json({ error: 'Failed to update blog post' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.blogPost.delete({
          where: { slug }
        });

        res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        console.error('Error deleting blog post:', error);
        res.status(500).json({ error: 'Failed to delete blog post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
