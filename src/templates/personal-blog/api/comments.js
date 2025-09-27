import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/personal-blog/comments - Get comments for a post (Admin)
export const getComments = async (req, res) => {
  try {
    const { tenantId } = req;
    const { postId, page = 1, limit = 20, approved } = req.query;

    const where = { tenantId };
    
    if (postId) {
      where.postId = postId;
    }

    if (approved !== undefined && approved !== "") {
      where.isApproved = approved === "true";
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [comments, total] = await Promise.all([
      prisma.blogComment.findMany({
        where,
        include: {
          post: {
            select: {
              id: true,
              title: true,
              slug: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.blogComment.count({ where }),
    ]);

    res.json({
      success: true,
      data: comments,
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
};

// POST /api/personal-blog/comments - Submit new comment (Public)
export const submitComment = async (req, res) => {
  try {
    const { tenantId } = req;
    const { postId, author, email, content } = req.body;

    if (!postId || !author || !email || !content) {
      return res.status(400).json({ 
        error: "Post ID, author, email, and content are required" 
      });
    }

    // Verify the post exists and is published
    const post = await prisma.blogPost.findFirst({
      where: {
        id: postId,
        tenantId,
        isPublished: true,
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const comment = await prisma.blogComment.create({
      data: {
        tenantId,
        postId,
        author,
        email,
        content,
        isApproved: false, // Comments require approval by default
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    res.status(201).json({ 
      success: true, 
      data: comment,
      message: "Comment submitted successfully and is pending approval"
    });
  } catch (error) {
    console.error("Error submitting comment:", error);
    res.status(500).json({ error: "Failed to submit comment" });
  }
};

// PUT /api/personal-blog/comments/:id - Update comment (Admin)
export const updateComment = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const { author, email, content, isApproved } = req.body;

    const comment = await prisma.blogComment.update({
      where: { id, tenantId },
      data: {
        author,
        email,
        content,
        isApproved,
      },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    res.json({ success: true, data: comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

// PUT /api/personal-blog/comments/:id/approve - Approve comment (Admin)
export const approveComment = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const comment = await prisma.blogComment.update({
      where: { id, tenantId },
      data: { isApproved: true },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    res.json({ success: true, data: comment });
  } catch (error) {
    console.error("Error approving comment:", error);
    res.status(500).json({ error: "Failed to approve comment" });
  }
};

// DELETE /api/personal-blog/comments/:id - Delete comment (Admin)
export const deleteComment = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.blogComment.delete({
      where: { id, tenantId },
    });

    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

// GET /api/personal-blog/comments/stats - Get comment statistics (Admin)
export const getCommentStats = async (req, res) => {
  try {
    const { tenantId } = req;

    const [totalComments, pendingComments, approvedComments] = await Promise.all([
      prisma.blogComment.count({
        where: { tenantId },
      }),
      prisma.blogComment.count({
        where: { tenantId, isApproved: false },
      }),
      prisma.blogComment.count({
        where: { tenantId, isApproved: true },
      }),
    ]);

    res.json({
      success: true,
      data: {
        total: totalComments,
        pending: pendingComments,
        approved: approvedComments,
      },
    });
  } catch (error) {
    console.error("Error fetching comment stats:", error);
    res.status(500).json({ error: "Failed to fetch comment statistics" });
  }
};
