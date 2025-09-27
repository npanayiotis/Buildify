import {
  authenticateToken,
  requireTenant,
} from "../../../../shared/auth/middleware.js";
import * as commentsAPI from "../../../../templates/personal-blog/api/comments.js";

export default async function handler(req, res) {
  try {
    // For comment submission, we don't require authentication (public)
    if (req.method === "POST") {
      // Get tenant from subdomain or other method
      const host = req.headers.host;
      const subdomain = host.split(".")[0];

      // Find tenant by subdomain
      const { prisma } = await import("../../../../shared/database/connection.js");
      const tenant = await prisma.tenant.findUnique({
        where: { subdomain },
      });

      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" });
      }

      req.tenantId = tenant.id;
      return await commentsAPI.submitComment(req, res);
    }

    // For admin operations, require authentication
    await new Promise((resolve, reject) => {
      authenticateToken(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await new Promise((resolve, reject) => {
      requireTenant(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Route to appropriate handler based on HTTP method
    switch (req.method) {
      case "GET":
        return await commentsAPI.getComments(req, res);
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Authentication required" });
  }
}
