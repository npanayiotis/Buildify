import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/personal-blog/posts - Get all blog posts
export const getPosts = async (req, res) => {
  try {
    const { tenantId } = req;
    const { 
      page = 1, 
      limit = 10, 
      category, 
      tag, 
      search, 
      published = true 
    } = req.query;

    const where = {
      tenantId,
      ...(published === "true" && { isPublished: true }),
    };

    // Add filters
    if (category && category !== "all") {
      where.category = category;
    }

    if (tag) {
      where.tags = { has: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              email: true,
              // Add user profile fields if available
            },
          },
          comments: {
            where: { isApproved: true },
            select: { id: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.blogPost.count({ where }),
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
};

// GET /api/personal-blog/posts/:slug - Get single blog post
export const getPost = async (req, res) => {
  try {
    const { tenantId } = req;
    const { slug } = req.params;

    const post = await prisma.blogPost.findFirst({
      where: {
        slug,
        tenantId,
        isPublished: true,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
        comments: {
          where: { isApproved: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
};

// POST /api/personal-blog/posts - Create new blog post (Admin)
export const createPost = async (req, res) => {
  try {
    const { tenantId, user } = req;
    const {
      title,
      content,
      excerpt,
      imageUrl,
      category,
      tags,
      isPublished = false,
    } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findFirst({
      where: { slug, tenantId },
    });

    let finalSlug = slug;
    if (existingPost) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const post = await prisma.blogPost.create({
      data: {
        tenantId,
        title,
        slug: finalSlug,
        content,
        excerpt: excerpt || content.substring(0, 200) + "...",
        imageUrl,
        category: category || "General",
        tags: tags || [],
        authorId: user.id,
        isPublished,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
};

// PUT /api/personal-blog/posts/:id - Update blog post (Admin)
export const updatePost = async (req, res) => {
  try {
    const { tenantId, user } = req;
    const { id } = req.params;
    const {
      title,
      content,
      excerpt,
      imageUrl,
      category,
      tags,
      isPublished,
    } = req.body;

    // Check if user owns the post or is admin
    const existingPost = await prisma.blogPost.findFirst({
      where: { id, tenantId },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    if (existingPost.authorId !== user.id && user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to edit this post" });
    }

    // Generate new slug if title changed
    let slug = existingPost.slug;
    if (title && title !== existingPost.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      // Check if new slug already exists
      const slugExists = await prisma.blogPost.findFirst({
        where: { slug, tenantId, id: { not: id } },
      });

      if (slugExists) {
        slug = `${slug}-${Date.now()}`;
      }
    }

    const post = await prisma.blogPost.update({
      where: { id, tenantId },
      data: {
        title,
        slug,
        content,
        excerpt,
        imageUrl,
        category,
        tags,
        isPublished,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    res.json({ success: true, data: post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

// DELETE /api/personal-blog/posts/:id - Delete blog post (Admin)
export const deletePost = async (req, res) => {
  try {
    const { tenantId, user } = req;
    const { id } = req.params;

    // Check if user owns the post or is admin
    const existingPost = await prisma.blogPost.findFirst({
      where: { id, tenantId },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    if (existingPost.authorId !== user.id && user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this post" });
    }

    // Delete associated comments first
    await prisma.blogComment.deleteMany({
      where: { postId: id },
    });

    // Delete the post
    await prisma.blogPost.delete({
      where: { id, tenantId },
    });

    res.json({ success: true, message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};

// GET /api/personal-blog/categories - Get all categories
export const getCategories = async (req, res) => {
  try {
    const { tenantId } = req;

    // Get unique categories from published posts
    const posts = await prisma.blogPost.findMany({
      where: {
        tenantId,
        isPublished: true,
        category: { not: null },
      },
      select: { category: true },
      distinct: ["category"],
    });

    const categories = posts.map((post) => ({
      name: post.category,
      slug: post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      count: 0, // We'll calculate this separately if needed
    }));

    // Get post counts for each category
    for (const category of categories) {
      const count = await prisma.blogPost.count({
        where: {
          tenantId,
          isPublished: true,
          category: category.name,
        },
      });
      category.count = count;
    }

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

// GET /api/personal-blog/tags - Get all tags
export const getTags = async (req, res) => {
  try {
    const { tenantId } = req;

    const posts = await prisma.blogPost.findMany({
      where: {
        tenantId,
        isPublished: true,
      },
      select: { tags: true },
    });

    // Flatten and count tags
    const tagCounts = {};
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const tags = Object.entries(tagCounts).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      count,
    }));

    res.json({ success: true, data: tags });
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
};
