/**
 * Authentication System
 * Handles user authentication, authorization, and session management
 */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/client";

// ========================================
// CONFIGURATION
// ========================================

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// ========================================
// USER REGISTRATION
// ========================================

export async function signup(userData) {
  try {
    const { email, password, name } = userData;

    // Validate input
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        error: "User already exists with this email",
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        plan: "FREE",
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        isActive: true,
        createdAt: true,
      },
    });

    // Create session
    const session = await createSession(user.id);

    return {
      success: true,
      user,
      token: session.token,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "Failed to create account",
    };
  }
}

// ========================================
// USER LOGIN
// ========================================

export async function signin(email, password) {
  try {
    // Validate input
    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
        plan: true,
        isActive: true,
        createdAt: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Check if user is active
    if (!user.isActive) {
      return {
        success: false,
        error: "Account is deactivated",
      };
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Remove password hash from response
    delete user.passwordHash;

    // Create session
    const session = await createSession(user.id);

    return {
      success: true,
      user,
      token: session.token,
    };
  } catch (error) {
    console.error("Signin error:", error);
    return {
      success: false,
      error: "Failed to sign in",
    };
  }
}

// ========================================
// SESSION MANAGEMENT
// ========================================

export async function createSession(userId) {
  try {
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    const session = await prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });

    return session;
  } catch (error) {
    console.error("Create session error:", error);
    throw error;
  }
}

export async function validateSession(token) {
  try {
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find session in database
    const session = await prisma.session.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            plan: true,
            isActive: true,
            createdAt: true,
          },
        },
      },
    });

    if (!session) {
      return {
        success: false,
        error: "Invalid session",
      };
    }

    // Check if session is expired
    if (session.expiresAt < new Date()) {
      // Clean up expired session
      await prisma.session.delete({
        where: { id: session.id },
      });

      return {
        success: false,
        error: "Session expired",
      };
    }

    // Check if user is still active
    if (!session.user.isActive) {
      return {
        success: false,
        error: "User account is deactivated",
      };
    }

    return {
      success: true,
      user: session.user,
      sessionId: session.id,
    };
  } catch (error) {
    console.error("Validate session error:", error);
    return {
      success: false,
      error: "Invalid token",
    };
  }
}

export async function signout(token) {
  try {
    await prisma.session.delete({
      where: { token },
    });

    return { success: true };
  } catch (error) {
    console.error("Signout error:", error);
    return {
      success: false,
      error: "Failed to sign out",
    };
  }
}

// ========================================
// AUTHORIZATION
// ========================================

export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Authentication required",
      });
    }

    const validation = await validateSession(token);

    if (!validation.success) {
      return res.status(401).json({
        success: false,
        error: validation.error,
      });
    }

    req.user = validation.user;
    req.sessionId = validation.sessionId;
    next();
  } catch (error) {
    console.error("Require auth error:", error);
    return res.status(500).json({
      success: false,
      error: "Authentication error",
    });
  }
}

export async function requirePlan(requiredPlan) {
  const planHierarchy = {
    FREE: 0,
    PRO: 1,
    ENTERPRISE: 2,
  };

  return (req, res, next) => {
    const userPlan = req.user?.plan || "FREE";

    if (planHierarchy[userPlan] >= planHierarchy[requiredPlan]) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        error: `This feature requires ${requiredPlan} plan or higher`,
      });
    }
  };
}

// ========================================
// PASSWORD MANAGEMENT
// ========================================

export async function changePassword(userId, currentPassword, newPassword) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    if (!isCurrentPasswordValid) {
      return {
        success: false,
        error: "Current password is incorrect",
      };
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash },
    });

    return { success: true };
  } catch (error) {
    console.error("Change password error:", error);
    return {
      success: false,
      error: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists
      return { success: true };
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.id, type: "password_reset" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // TODO: Send reset email
    console.log(`Password reset token for ${email}: ${resetToken}`);

    return { success: true };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      error: "Failed to initiate password reset",
    };
  }
}

export async function confirmPasswordReset(token, newPassword) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.type !== "password_reset") {
      return {
        success: false,
        error: "Invalid reset token",
      };
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { passwordHash: newPasswordHash },
    });

    return { success: true };
  } catch (error) {
    console.error("Confirm password reset error:", error);
    return {
      success: false,
      error: "Invalid or expired reset token",
    };
  }
}

// ========================================
// USER MANAGEMENT
// ========================================

export async function getUserProfile(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        websites: {
          select: {
            id: true,
            name: true,
            domain: true,
            isPublished: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Get user profile error:", error);
    return {
      success: false,
      error: "Failed to get user profile",
    };
  }
}

export async function updateUserProfile(userId, updates) {
  try {
    const allowedUpdates = ["name"];
    const filteredUpdates = Object.keys(updates)
      .filter((key) => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    const user = await prisma.user.update({
      where: { id: userId },
      data: filteredUpdates,
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        isActive: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.error("Update user profile error:", error);
    return {
      success: false,
      error: "Failed to update profile",
    };
  }
}

// ========================================
// EXPORT
// ========================================

export default {
  signup,
  signin,
  signout,
  createSession,
  validateSession,
  requireAuth,
  requirePlan,
  changePassword,
  resetPassword,
  confirmPasswordReset,
  getUserProfile,
  updateUserProfile,
};
