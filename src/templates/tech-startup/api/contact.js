import { prisma } from '../../../shared/database/connection.js';
import { authenticateToken, requireTenant } from '../../../shared/auth/middleware.js';

// POST /api/tech-startup/contact - Submit contact form
export const submitContactForm = async (req, res) => {
  try {
    const { tenantId } = req;
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        error: 'All fields are required',
        missing: {
          name: !name,
          email: !email,
          subject: !subject,
          message: !message
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const contactForm = await prisma.contactForm.create({
      data: {
        tenantId,
        name,
        email,
        subject,
        message
      }
    });

    // TODO: Send email notification to tenant admin
    // TODO: Send auto-reply to customer

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you soon.',
      data: { id: contactForm.id }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};

// GET /api/tech-startup/contact - Get all contact forms (Admin only)
export const getContactForms = async (req, res) => {
  try {
    const { tenantId } = req;
    const { page = 1, limit = 10, isRead } = req.query;

    const where = { tenantId };
    if (isRead !== undefined) {
      where.isRead = isRead === 'true';
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [forms, total] = await Promise.all([
      prisma.contactForm.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit)
      }),
      prisma.contactForm.count({ where })
    ]);

    res.json({
      success: true,
      data: forms,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({ error: 'Failed to fetch contact forms' });
  }
};

// PUT /api/tech-startup/contact/:id/read - Mark contact form as read
export const markAsRead = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    const contactForm = await prisma.contactForm.update({
      where: { 
        id,
        tenantId
      },
      data: { isRead: true }
    });

    res.json({ success: true, data: contactForm });
  } catch (error) {
    console.error('Error marking contact form as read:', error);
    res.status(500).json({ error: 'Failed to update contact form' });
  }
};

// DELETE /api/tech-startup/contact/:id - Delete contact form
export const deleteContactForm = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.contactForm.delete({
      where: { 
        id,
        tenantId
      }
    });

    res.json({ success: true, message: 'Contact form deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact form:', error);
    res.status(500).json({ error: 'Failed to delete contact form' });
  }
};
