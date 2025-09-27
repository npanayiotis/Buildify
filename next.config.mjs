/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      "@react-three/fiber",
      "@react-three/drei",
      "framer-motion",
    ],
  },

  // Bundle optimization
  webpack: (config, { dev, isServer }) => {
    // Code splitting for 3D libraries
    if (!isServer && config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: "three",
          chunks: "all",
          priority: 10,
        },
        animations: {
          test: /[\\/]node_modules[\\/](framer-motion|@react-spring)[\\/]/,
          name: "animations",
          chunks: "all",
          priority: 9,
        },
      };
    }

    return config;
  },

  // Image optimization
  images: {
    domains: [],
    formats: ["image/webp", "image/avif"],
  },

  // Compression
  compress: true,
};

export default nextConfig;
