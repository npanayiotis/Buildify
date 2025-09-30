import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing authentication on mount
    const checkAuth = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          if (userData.isAuthenticated) {
            // Ensure role is set for existing users
            if (!userData.role) {
              userData.role =
                userData.email === "admin@elevare.com" ? "admin" : "user";
              localStorage.setItem("user", JSON.stringify(userData));
            }
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email, password) => {
    try {
      // Simulate API call
      const userData = {
        id: Date.now(),
        name: email.split("@")[0],
        email,
        isAuthenticated: true,
        role: email === "admin@elevare.com" ? "admin" : "user", // Add role based on email
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Sign in error:", error);
      return { success: false, error: "Failed to sign in" };
    }
  };

  const signUp = async (name, email, password) => {
    try {
      // Simulate API call
      const userData = {
        id: Date.now(),
        name,
        email,
        isAuthenticated: true,
        role: "user", // All signups are regular users
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Sign up error:", error);
      return { success: false, error: "Failed to create account" };
    }
  };

  const signOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = () => {
    return user && user.isAuthenticated;
  };

  const requireAuth = (callback) => {
    if (isAuthenticated()) {
      return callback();
    } else {
      // Redirect to auth page
      window.location.href = "/auth";
      return false;
    }
  };

  const isAdmin = () => {
    return user && user.role === "admin";
  };

  const isRegularUser = () => {
    return user && user.role === "user";
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAuthenticated,
    requireAuth,
    isAdmin,
    isRegularUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
