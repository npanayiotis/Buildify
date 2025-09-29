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
        const { page = 1, limit = 20, status, date } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const where = {
          tenantId,
          ...(status && { status }),
          ...(date && {
            date: {
              gte: new Date(date),
              lt: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000)
            }
          })
        };

        const [reservations, total] = await Promise.all([
          prisma.reservation.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            skip,
            take: parseInt(limit)
          }),
          prisma.reservation.count({ where })
        ]);

        res.status(200).json({
          reservations,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Failed to fetch reservations' });
      }
      break;

    case 'POST':
      try {
        const { name, email, phone, date, time, partySize, specialRequests } = req.body;

        if (!name || !email || !phone || !date || !time || !partySize) {
          return res.status(400).json({ error: 'Name, email, phone, date, time, and party size are required' });
        }

        // Check for existing reservation at the same time
        const existingReservation = await prisma.reservation.findFirst({
          where: {
            tenantId,
            date: new Date(date),
            time,
            status: { in: ['PENDING', 'CONFIRMED'] }
          }
        });

        if (existingReservation) {
          return res.status(409).json({ error: 'Time slot is already booked' });
        }

        const reservation = await prisma.reservation.create({
          data: {
            tenantId,
            name,
            email,
            phone,
            date: new Date(date),
            time,
            partySize: parseInt(partySize),
            specialRequests,
            status: 'PENDING'
          }
        });

        res.status(201).json({
          message: 'Reservation created successfully',
          reservation
        });
      } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Failed to create reservation' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
