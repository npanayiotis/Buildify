import { useEffect, useState } from "react";

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

export default useReducedMotion;
