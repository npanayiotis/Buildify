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
        const { category, popular, available } = req.query;

        const where = {
          tenantId,
          isActive: true,
          ...(category && { category }),
          ...(popular === 'true' && { isPopular: true }),
          ...(available !== undefined && { isAvailable: available === 'true' })
        };

        const menuItems = await prisma.menuItem.findMany({
          where,
          include: {
            menu: {
              select: {
                id: true,
                name: true,
                description: true
              }
            }
          },
          orderBy: [
            { isPopular: 'desc' },
            { order: 'asc' },
            { name: 'asc' }
          ]
        });

        res.status(200).json(menuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
      }
      break;

    case 'POST':
      try {
        const { menuId, name, description, price, imageUrl, category, isPopular, isAvailable, allergens, ingredients } = req.body;

        if (!menuId || !name || !description || price === undefined) {
          return res.status(400).json({ error: 'Menu ID, name, description, and price are required' });
        }

        const menuItem = await prisma.menuItem.create({
          data: {
            tenantId,
            menuId,
            name,
            description,
            price: parseFloat(price),
            imageUrl,
            category,
            isPopular: isPopular || false,
            isAvailable: isAvailable !== false,
            allergens: allergens || [],
            ingredients: ingredients || []
          }
        });

        res.status(201).json(menuItem);
      } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Failed to create menu item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
