import { authenticateToken, requireTenant } from '../../../../shared/auth/middleware.js';
import * as teamAPI from '../../../../templates/tech-startup/api/team.js';

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

    // Route to appropriate handler based on HTTP method
    switch (req.method) {
      case 'GET':
        return await teamAPI.getTeamMembers(req, res);
      case 'POST':
        return await teamAPI.createTeamMember(req, res);
      case 'PUT':
        if (req.query.action === 'reorder') {
          return await teamAPI.reorderTeamMembers(req, res);
        }
        return res.status(405).json({ error: 'Method not allowed' });
      case 'DELETE':
        return res.status(405).json({ error: 'Method not allowed' });
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Authentication required' });
  }
}
