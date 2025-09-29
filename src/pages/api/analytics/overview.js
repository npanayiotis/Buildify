import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;
  const { tenantId, period = "30d" } = req.query;

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant ID is required" });
  }

  switch (method) {
    case "GET":
      try {
        // Calculate date range based on period
        const now = new Date();
        let startDate;

        switch (period) {
          case "7d":
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
          case "30d":
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
          case "90d":
            startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            break;
          case "1y":
            startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            break;
          default:
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }

        // Get blog analytics
        const blogStats = await getBlogAnalytics(tenantId, startDate);

        // Get restaurant analytics
        const restaurantStats = await getRestaurantAnalytics(
          tenantId,
          startDate
        );

        // Get gym analytics
        const gymStats = await getGymAnalytics(tenantId, startDate);

        // Get overall website stats
        const websiteStats = await getWebsiteStats(tenantId, startDate);

        res.status(200).json({
          period,
          dateRange: {
            start: startDate,
            end: now,
          },
          blog: blogStats,
          restaurant: restaurantStats,
          gym: gymStats,
          website: websiteStats,
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function getBlogAnalytics(tenantId, startDate) {
  const [
    totalPosts,
    publishedPosts,
    totalViews,
    totalComments,
    newsletterSubscribers,
    topPosts,
    categoryStats,
    monthlyPosts,
  ] = await Promise.all([
    prisma.blogPost.count({
      where: { tenantId },
    }),
    prisma.blogPost.count({
      where: { tenantId, isPublished: true },
    }),
    prisma.blogPost.aggregate({
      where: { tenantId, isPublished: true },
      _sum: { viewCount: true },
    }),
    prisma.blogComment.count({
      where: { tenantId, isApproved: true },
    }),
    prisma.newsletterSubscriber.count({
      where: { tenantId, isActive: true },
    }),
    prisma.blogPost.findMany({
      where: { tenantId, isPublished: true },
      orderBy: { viewCount: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        viewCount: true,
        createdAt: true,
      },
    }),
    prisma.blogPost.groupBy({
      by: ["category"],
      where: { tenantId, isPublished: true, category: { not: null } },
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
    }),
    prisma.blogPost.groupBy({
      by: ["createdAt"],
      where: {
        tenantId,
        isPublished: true,
        createdAt: { gte: startDate },
      },
      _count: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    totalPosts,
    publishedPosts,
    totalViews: totalViews._sum.viewCount || 0,
    totalComments,
    newsletterSubscribers,
    topPosts,
    categoryStats,
    monthlyPosts: monthlyPosts.map((item) => ({
      date: item.createdAt,
      count: item._count.createdAt,
    })),
  };
}

async function getRestaurantAnalytics(tenantId, startDate) {
  const [
    totalReservations,
    confirmedReservations,
    totalMenuItems,
    totalReviews,
    averageRating,
    popularMenuItems,
    reservationStats,
    monthlyReservations,
  ] = await Promise.all([
    prisma.reservation.count({
      where: { tenantId },
    }),
    prisma.reservation.count({
      where: { tenantId, status: "CONFIRMED" },
    }),
    prisma.menuItem.count({
      where: { tenantId, isActive: true },
    }),
    prisma.restaurantReview.count({
      where: { tenantId, isApproved: true },
    }),
    prisma.restaurantReview.aggregate({
      where: { tenantId, isApproved: true },
      _avg: { rating: true },
    }),
    prisma.menuItem.findMany({
      where: { tenantId, isActive: true, isPopular: true },
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
      },
    }),
    prisma.reservation.groupBy({
      by: ["status"],
      where: { tenantId },
      _count: { status: true },
    }),
    prisma.reservation.groupBy({
      by: ["createdAt"],
      where: {
        tenantId,
        createdAt: { gte: startDate },
      },
      _count: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    totalReservations,
    confirmedReservations,
    totalMenuItems,
    totalReviews,
    averageRating: averageRating._avg.rating || 0,
    popularMenuItems,
    reservationStats,
    monthlyReservations: monthlyReservations.map((item) => ({
      date: item.createdAt,
      count: item._count.createdAt,
    })),
  };
}

async function getGymAnalytics(tenantId, startDate) {
  const [
    totalMembers,
    activeMembers,
    totalPrograms,
    totalTrainers,
    totalReviews,
    averageRating,
    popularPrograms,
    membershipStats,
    monthlyMembers,
  ] = await Promise.all([
    prisma.gymMember.count({
      where: { tenantId },
    }),
    prisma.gymMember.count({
      where: { tenantId, isActive: true },
    }),
    prisma.gymProgram.count({
      where: { tenantId, isActive: true },
    }),
    prisma.gymTrainer.count({
      where: { tenantId, isActive: true },
    }),
    prisma.gymReview.count({
      where: { tenantId, isApproved: true },
    }),
    prisma.gymReview.aggregate({
      where: { tenantId, isApproved: true },
      _avg: { rating: true },
    }),
    prisma.gymProgram.findMany({
      where: { tenantId, isActive: true },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        name: true,
        price: true,
        duration: true,
      },
    }),
    prisma.gymMember.groupBy({
      by: ["isActive"],
      where: { tenantId },
      _count: { isActive: true },
    }),
    prisma.gymMember.groupBy({
      by: ["createdAt"],
      where: {
        tenantId,
        createdAt: { gte: startDate },
      },
      _count: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    totalMembers,
    activeMembers,
    totalPrograms,
    totalTrainers,
    totalReviews,
    averageRating: averageRating._avg.rating || 0,
    popularPrograms,
    membershipStats,
    monthlyMembers: monthlyMembers.map((item) => ({
      date: item.createdAt,
      count: item._count.createdAt,
    })),
  };
}

async function getWebsiteStats(tenantId, startDate) {
  // This would typically integrate with analytics services like Google Analytics
  // For now, we'll return mock data
  return {
    totalVisitors: 12500,
    pageViews: 45230,
    bounceRate: 42.5,
    averageSessionDuration: "2m 34s",
    topPages: [
      { page: "/", views: 8500 },
      { page: "/blog", views: 3200 },
      { page: "/menu", views: 2800 },
      { page: "/programs", views: 2100 },
    ],
    trafficSources: [
      { source: "Direct", percentage: 45 },
      { source: "Google", percentage: 30 },
      { source: "Social Media", percentage: 15 },
      { source: "Referral", percentage: 10 },
    ],
  };
}
