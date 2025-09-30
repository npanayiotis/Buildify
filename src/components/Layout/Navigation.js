import React, { useState, useEffect, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sparkles,
  Palette,
  Globe,
  Settings,
  User,
  LogOut,
  Bot,
  Shield,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { requireAuth, user, signOut, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigationClick = (href, requiresAuth = false) => {
    if (requiresAuth) {
      requireAuth(() => router.push(href));
    } else {
      router.push(href);
    }
  };

  const navigationItems = [
    {
      name: "Templates",
      href: "/templates",
      icon: Palette,
      requiresAuth: false,
    },
    {
      name: "Customize",
      href: "/customize",
      icon: Settings,
      requiresAuth: true,
    },
    {
      name: "Dashboard",
      href: "/user-dashboard",
      icon: Globe,
      requiresAuth: true,
    },
    { name: "Monderna", href: "/monderna", icon: Bot, requiresAuth: false },
  ];

  const isActive = (href) => router.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20"
          : "bg-white/10 backdrop-blur-sm border-b border-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/templates" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </motion.div>
            <div>
              <h1
                className={`text-xl font-bold ${
                  scrolled
                    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                    : "text-white drop-shadow-lg"
                }`}
              >
                Elevare
              </h1>
              <p
                className={`text-xs -mt-1 ${
                  scrolled ? "text-gray-500" : "text-white/80 drop-shadow-lg"
                }`}
              >
                Elevate your online presence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() =>
                    handleNavigationClick(item.href, item.requiresAuth)
                  }
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : scrolled
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/10 drop-shadow-lg font-semibold"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                <span
                  className={`text-sm font-medium ${
                    scrolled ? "text-gray-800" : "text-white drop-shadow-lg"
                  }`}
                >
                  Welcome, {user?.name}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={signOut}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    scrolled
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/10 drop-shadow-lg font-semibold"
                  }`}
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/auth")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    scrolled
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/10 drop-shadow-lg font-semibold"
                  }`}
                >
                  <User className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    requireAuth(() => router.push("/user-dashboard"))
                  }
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-200 ${
              scrolled
                ? "text-gray-800 hover:bg-gray-100"
                : "text-white hover:bg-white/10 drop-shadow-lg font-semibold"
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-200/20">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setIsOpen(false);
                        handleNavigationClick(item.href, item.requiresAuth);
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left ${
                        isActive(item.href)
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  {isAuthenticated() ? (
                    <>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          requireAuth(() => router.push("/dashboard"));
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Admin Dashboard</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          router.push("/auth");
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <User className="w-5 h-5" />
                        <span className="font-medium">Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          signOut();
                        }}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/auth");
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">Sign In</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
});

Navigation.displayName = "Navigation";

export default Navigation;
