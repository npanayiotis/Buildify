import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Heart,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let result;
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }
        result = await signUp(formData.name, formData.email, formData.password);
      } else {
        result = await signIn(formData.email, formData.password);
      }

      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden pt-24">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `hsl(${Math.random() * 60 + 200}, 70%, 70%)`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Welcome to Monderna
            </h1>
            <p className="text-white/80 text-lg">
              {isSignUp ? "Create your account" : "Sign in to your account"}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full mx-auto mb-2 flex items-center justify-center border border-white/20">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/70 text-xs">Lightning Fast</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full mx-auto mb-2 flex items-center justify-center border border-white/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/70 text-xs">Secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full mx-auto mb-2 flex items-center justify-center border border-white/20">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/70 text-xs">User Friendly</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    key="name"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required={isSignUp}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isSignUp && (
                  <motion.div
                    key="confirmPassword"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required={isSignUp}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50 transition-all duration-200"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <button
                onClick={switchMode}
                className="text-white/70 hover:text-white transition-colors text-sm"
              >
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <span className="font-semibold text-blue-400">Sign In</span>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <span className="font-semibold text-blue-400">Sign Up</span>
                  </>
                )}
              </button>
            </div>

            {/* Demo Login */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <button
                onClick={async () => {
                  const result = await signIn("demo@monderna.com", "demo123");
                  if (result.success) {
                    router.push("/dashboard");
                  }
                }}
                className="w-full text-white/70 hover:text-white transition-colors text-sm py-2 bg-white/5 hover:bg-white/10 rounded-lg"
              >
                Try Demo Account
              </button>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center text-white/50 text-sm"
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
