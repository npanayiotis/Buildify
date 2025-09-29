import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { tenantId } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant ID is required" });
  }

  switch (method) {
    case "GET":
      try {
        const { postId, page = 1, limit = 20, approved } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {
          tenantId,
          ...(postId && { postId }),
          ...(approved !== undefined && { isApproved: approved === "true" }),
        };

        const [comments, total] = await Promise.all([
          prisma.blogComment.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip,
            take: parseInt(limit),
          }),
          prisma.blogComment.count({ where }),
        ]);

        res.status(200).json({
          comments,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit)),
          },
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
      }
      break;

    case "POST":
      try {
        const { postId, author, email, content } = req.body;

        if (!postId || !author || !email || !content) {
          return res
            .status(400)
            .json({
              error: "Post ID, author, email, and content are required",
            });
        }

        // Check if post exists
        const post = await prisma.blogPost.findFirst({
          where: {
            id: postId,
            tenantId,
            isPublished: true,
          },
        });

        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        const comment = await prisma.blogComment.create({
          data: {
            tenantId,
            postId,
            author,
            email,
            content,
            isApproved: false, // Comments need approval
          },
        });

        res.status(201).json({
          message:
            "Comment submitted successfully. It will be published after approval.",
          comment,
        });
      } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ error: "Failed to create comment" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
