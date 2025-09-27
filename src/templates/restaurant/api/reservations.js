import { prisma } from "../../../shared/database/connection.js";
import {
  authenticateToken,
  requireTenant,
} from "../../../shared/auth/middleware.js";

// GET /api/restaurant/reservations - Get reservations (Admin)
export const getReservations = async (req, res) => {
  try {
    const { tenantId } = req;
    const { page = 1, limit = 20, status, date } = req.query;

    const where = { tenantId };

    // Add filters
    if (status && status !== "all") {
      where.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      
      where.date = {
        gte: startDate,
        lt: endDate,
      };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [reservations, total] = await Promise.all([
      prisma.restaurantReservation.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: parseInt(limit),
      }),
      prisma.restaurantReservation.count({ where }),
    ]);

    res.json({
      success: true,
      data: reservations,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
};

// POST /api/restaurant/reservations - Create new reservation (Public)
export const createReservation = async (req, res) => {
  try {
    const { tenantId } = req;
    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      message,
      specialRequests,
    } = req.body;

    if (!name || !email || !date || !time || !guests) {
      return res.status(400).json({ 
        error: "Name, email, date, time, and number of guests are required" 
      });
    }

    // Validate date and time
    const reservationDate = new Date(`${date}T${time}`);
    const now = new Date();
    
    if (reservationDate <= now) {
      return res.status(400).json({ 
        error: "Reservation date and time must be in the future" 
      });
    }

    // Check if reservation already exists for the same time
    const existingReservation = await prisma.restaurantReservation.findFirst({
      where: {
        tenantId,
        date: reservationDate,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (existingReservation) {
      return res.status(400).json({ 
        error: "A reservation already exists for this time slot" 
      });
    }

    const reservation = await prisma.restaurantReservation.create({
      data: {
        tenantId,
        name,
        email,
        phone,
        date: reservationDate,
        time,
        guests: parseInt(guests),
        message: message || "",
        specialRequests: specialRequests || "",
        status: "PENDING",
      },
    });

    res.status(201).json({ 
      success: true, 
      data: reservation,
      message: "Reservation submitted successfully. You will receive a confirmation email shortly."
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
};

// PUT /api/restaurant/reservations/:id - Update reservation status (Admin)
export const updateReservation = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const reservation = await prisma.restaurantReservation.update({
      where: {
        id,
        tenantId,
      },
      data: { 
        status,
        notes: notes || "",
      },
    });

    res.json({ success: true, data: reservation });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Failed to update reservation" });
  }
};

// DELETE /api/restaurant/reservations/:id - Delete reservation (Admin)
export const deleteReservation = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.restaurantReservation.delete({
      where: { id, tenantId },
    });

    res.json({ success: true, message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: "Failed to delete reservation" });
  }
};

// GET /api/restaurant/reservations/availability - Check availability
export const checkAvailability = async (req, res) => {
  try {
    const { tenantId } = req;
    const { date, time } = req.query;

    if (!date || !time) {
      return res.status(400).json({ error: "Date and time are required" });
    }

    const reservationDate = new Date(`${date}T${time}`);

    const existingReservation = await prisma.restaurantReservation.findFirst({
      where: {
        tenantId,
        date: reservationDate,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    res.json({ 
      success: true, 
      data: { 
        available: !existingReservation,
        timeSlot: `${date} ${time}`,
      } 
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Failed to check availability" });
  }
};

// GET /api/restaurant/reservations/stats - Get reservation statistics (Admin)
export const getReservationStats = async (req, res) => {
  try {
    const { tenantId } = req;
    const { period = "month" } = req.query;

    const now = new Date();
    let startDate;

    switch (period) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const [
      totalReservations,
      pendingReservations,
      confirmedReservations,
      cancelledReservations,
      completedReservations,
    ] = await Promise.all([
      prisma.restaurantReservation.count({
        where: { tenantId, createdAt: { gte: startDate } },
      }),
      prisma.restaurantReservation.count({
        where: { tenantId, status: "PENDING", createdAt: { gte: startDate } },
      }),
      prisma.restaurantReservation.count({
        where: { tenantId, status: "CONFIRMED", createdAt: { gte: startDate } },
      }),
      prisma.restaurantReservation.count({
        where: { tenantId, status: "CANCELLED", createdAt: { gte: startDate } },
      }),
      prisma.restaurantReservation.count({
        where: { tenantId, status: "COMPLETED", createdAt: { gte: startDate } },
      }),
    ]);

    res.json({
      success: true,
      data: {
        total: totalReservations,
        pending: pendingReservations,
        confirmed: confirmedReservations,
        cancelled: cancelledReservations,
        completed: completedReservations,
        period,
      },
    });
  } catch (error) {
    console.error("Error fetching reservation stats:", error);
    res.status(500).json({ error: "Failed to fetch reservation statistics" });
  }
};
