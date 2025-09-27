import { prisma } from '../../../shared/database/connection.js';
import { authenticateToken, requireTenant } from '../../../shared/auth/middleware.js';

// GET /api/tech-startup/team - Get all team members
export const getTeamMembers = async (req, res) => {
  try {
    const { tenantId } = req;
    
    const teamMembers = await prisma.techStartupTeam.findMany({
      where: { 
        tenantId,
        isActive: true 
      },
      orderBy: { order: 'asc' }
    });

    res.json({ success: true, data: teamMembers });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

// POST /api/tech-startup/team - Create new team member
export const createTeamMember = async (req, res) => {
  try {
    const { tenantId } = req;
    const { name, position, bio, image, linkedinUrl, twitterUrl } = req.body;

    // Get the highest order number
    const lastMember = await prisma.techStartupTeam.findFirst({
      where: { tenantId },
      orderBy: { order: 'desc' }
    });

    const teamMember = await prisma.techStartupTeam.create({
      data: {
        tenantId,
        name,
        position,
        bio,
        image: image || null,
        linkedinUrl: linkedinUrl || null,
        twitterUrl: twitterUrl || null,
        order: lastMember ? lastMember.order + 1 : 0
      }
    });

    res.status(201).json({ success: true, data: teamMember });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

// PUT /api/tech-startup/team/:id - Update team member
export const updateTeamMember = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;
    const { name, position, bio, image, linkedinUrl, twitterUrl, isActive } = req.body;

    const teamMember = await prisma.techStartupTeam.update({
      where: { 
        id,
        tenantId
      },
      data: {
        name,
        position,
        bio,
        image,
        linkedinUrl,
        twitterUrl,
        isActive
      }
    });

    res.json({ success: true, data: teamMember });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

// DELETE /api/tech-startup/team/:id - Delete team member
export const deleteTeamMember = async (req, res) => {
  try {
    const { tenantId } = req;
    const { id } = req.params;

    await prisma.techStartupTeam.delete({
      where: { 
        id,
        tenantId
      }
    });

    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};

// PUT /api/tech-startup/team/reorder - Reorder team members
export const reorderTeamMembers = async (req, res) => {
  try {
    const { tenantId } = req;
    const { teamMembers } = req.body;

    const updatePromises = teamMembers.map(({ id, order }) =>
      prisma.techStartupTeam.update({
        where: { id, tenantId },
        data: { order }
      })
    );

    await Promise.all(updatePromises);

    res.json({ success: true, message: 'Team members reordered successfully' });
  } catch (error) {
    console.error('Error reordering team members:', error);
    res.status(500).json({ error: 'Failed to reorder team members' });
  }
};
