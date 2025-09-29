import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { tenantId, q, type, limit = 10 } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant ID is required" });
  }

  if (!q || q.trim().length < 2) {
    return res
      .status(400)
      .json({ error: "Search query must be at least 2 characters" });
  }

  switch (method) {
    case "GET":
      try {
        const searchTerm = q.trim();
        const results = {
          blog: [],
          restaurant: [],
          gym: [],
          total: 0,
        };

        // Search blog posts
        if (!type || type === "blog") {
          const blogPosts = await prisma.blogPost.findMany({
            where: {
              tenantId,
              isPublished: true,
              OR: [
                { title: { contains: searchTerm, mode: "insensitive" } },
                { content: { contains: searchTerm, mode: "insensitive" } },
                { excerpt: { contains: searchTerm, mode: "insensitive" } },
                { tags: { has: searchTerm } },
              ],
            },
            include: {
              author: {
                select: {
                  id: true,
                  email: true,
                },
              },
            },
            take: parseInt(limit),
            orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
          });

          results.blog = blogPosts.map((post) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            slug: post.slug,
            category: post.category,
            readTime: post.readTime,
            createdAt: post.createdAt,
            type: "blog",
            url: `/blog/${post.slug}`,
          }));
        }

        // Search restaurant menu items
        if (!type || type === "restaurant") {
          const menuItems = await prisma.menuItem.findMany({
            where: {
              tenantId,
              isActive: true,
              OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                { description: { contains: searchTerm, mode: "insensitive" } },
                { category: { contains: searchTerm, mode: "insensitive" } },
                { ingredients: { has: searchTerm } },
              ],
            },
            include: {
              menu: {
                select: {
                  name: true,
                },
              },
            },
            take: parseInt(limit),
            orderBy: [{ isPopular: "desc" }, { name: "asc" }],
          });

          results.restaurant = menuItems.map((item) => ({
            id: item.id,
            title: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            isPopular: item.isPopular,
            isAvailable: item.isAvailable,
            type: "restaurant",
            url: `/menu#${item.id}`,
          }));
        }

        // Search gym programs
        if (!type || type === "gym") {
          const programs = await prisma.gymProgram.findMany({
            where: {
              tenantId,
              isActive: true,
              OR: [
                { name: { contains: searchTerm, mode: "insensitive" } },
                { description: { contains: searchTerm, mode: "insensitive" } },
                { features: { has: searchTerm } },
              ],
            },
            take: parseInt(limit),
            orderBy: [{ order: "asc" }, { name: "asc" }],
          });

          results.gym = programs.map((program) => ({
            id: program.id,
            title: program.name,
            description: program.description,
            price: program.price,
            duration: program.duration,
            features: program.features,
            type: "gym",
            url: `/programs#${program.id}`,
          }));
        }

        // Calculate total results
        results.total =
          results.blog.length + results.restaurant.length + results.gym.length;

        // Add search suggestions
        const suggestions = await generateSuggestions(searchTerm, tenantId);

        res.status(200).json({
          results,
          suggestions,
          query: searchTerm,
          total: results.total,
        });
      } catch (error) {
        console.error("Error performing search:", error);
        res.status(500).json({ error: "Failed to perform search" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function generateSuggestions(searchTerm, tenantId) {
  try {
    const suggestions = [];

    // Get popular blog categories
    const blogCategories = await prisma.blogPost.groupBy({
      by: ["category"],
      where: {
        tenantId,
        isPublished: true,
        category: { not: null },
      },
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
      take: 5,
    });

    blogCategories.forEach((cat) => {
      if (cat.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.push({
          text: cat.category,
          type: "category",
          count: cat._count.category,
        });
      }
    });

    // Get popular menu categories
    const menuCategories = await prisma.menuItem.groupBy({
      by: ["category"],
      where: {
        tenantId,
        isActive: true,
        category: { not: null },
      },
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
      take: 5,
    });

    menuCategories.forEach((cat) => {
      if (cat.category.toLowerCase().includes(searchTerm.toLowerCase())) {
        suggestions.push({
          text: cat.category,
          type: "menu_category",
          count: cat._count.category,
        });
      }
    });

    return suggestions.slice(0, 10);
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return [];
  }
}
