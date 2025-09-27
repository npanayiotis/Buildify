import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";

// Loading skeleton component
const TemplateSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    {/* Header Skeleton */}
    <div className="h-20 bg-white/50 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-300 rounded-xl animate-pulse"></div>
          <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="hidden md:flex space-x-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-16 h-6 bg-gray-300 rounded animate-pulse"
            ></div>
          ))}
        </div>
        <div className="w-24 h-10 bg-gray-300 rounded-xl animate-pulse"></div>
      </div>
    </div>

    {/* Hero Section Skeleton */}
    <div className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="text-center space-y-8">
        <div className="w-96 h-16 bg-gray-300 rounded animate-pulse mx-auto"></div>
        <div className="w-80 h-8 bg-gray-300 rounded animate-pulse mx-auto"></div>
        <div className="flex justify-center space-x-8">
          <div className="w-40 h-12 bg-gray-300 rounded-2xl animate-pulse"></div>
          <div className="w-40 h-12 bg-gray-300 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    </div>

    {/* Content Sections Skeleton */}
    <div className="py-20 space-y-20">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-64 h-12 bg-gray-300 rounded animate-pulse mx-auto mb-8"></div>
            <div className="w-96 h-6 bg-gray-300 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="w-full h-48 bg-gray-300 rounded-lg mb-6 animate-pulse"></div>
                <div className="w-3/4 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>
                <div className="w-full h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Lazy template wrapper with performance optimizations
const LazyTemplateWrapper = ({ templatePath, ...props }) => {
  const [TemplateComponent, setTemplateComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTemplate = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Dynamic import with error handling
        const templateModule = await import(
          `../../pages/templates/${templatePath}`
        );

        if (isMounted) {
          setTemplateComponent(() => templateModule.default);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(`Failed to load template ${templatePath}:`, error);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    // Add small delay to prevent flash of loading state
    const timer = setTimeout(loadTemplate, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [templatePath]);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Failed to Load Template
          </h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (isLoading || !TemplateComponent) {
    return <TemplateSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Suspense fallback={<TemplateSkeleton />}>
        <TemplateComponent {...props} />
      </Suspense>
    </motion.div>
  );
};

export default LazyTemplateWrapper;
