import { authenticateToken, requireTenant } from '../../../../../shared/auth/middleware.js';
import * as contactAPI from '../../../../../templates/tech-startup/api/contact.js';

export default async function handler(req, res) {
  try {
    // Apply authentication middleware
    await new Promise((resolve, reject) => {
      authenticateToken(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Apply tenant middleware
    await new Promise((resolve, reject) => {
      requireTenant(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Add the id from the URL to req.params
    req.params = { id: req.query.id };

    // Route to appropriate handler based on HTTP method
    switch (req.method) {
      case 'PUT':
        if (req.query.action === 'read') {
          return await contactAPI.markAsRead(req, res);
        }
        return res.status(405).json({ error: 'Method not allowed' });
      case 'DELETE':
        return await contactAPI.deleteContactForm(req, res);
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Authentication required' });
  }
}
