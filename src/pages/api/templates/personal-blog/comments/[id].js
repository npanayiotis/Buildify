import {
  authenticateToken,
  requireTenant,
} from "../../../../../shared/auth/middleware.js";
import * as commentsAPI from "../../../../../templates/personal-blog/api/comments.js";

export default async function handler(req, res) {
  try {
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

    // Add the id from the URL to req.params
    req.params = { id: req.query.id };

    // Route to appropriate handler based on HTTP method
    switch (req.method) {
      case "PUT":
        if (req.query.action === "approve") {
          return await commentsAPI.approveComment(req, res);
        }
        return await commentsAPI.updateComment(req, res);
      case "DELETE":
        return await commentsAPI.deleteComment(req, res);
      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Authentication required" });
  }
}
