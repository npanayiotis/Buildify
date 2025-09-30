/**
 * Static Site Generator
 * Generates static HTML, CSS, and JS files for websites
 */

import fs from "fs/promises";
import path from "path";

// ========================================
// TEMPLATE GENERATORS
// ========================================

export async function generateHTML(websiteData, pageData) {
  const {
    title,
    description,
    keywords,
    author,
    favicon,
    ogImage,
    customCSS,
    customJS,
    analytics,
  } = websiteData.seo || {};

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || pageData.title || "Website"}</title>
  <meta name="description" content="${
    description || pageData.description || ""
  }">
  <meta name="keywords" content="${keywords || ""}">
  <meta name="author" content="${author || ""}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${title || pageData.title || ""}">
  <meta property="og:description" content="${
    description || pageData.description || ""
  }">
  <meta property="og:image" content="${ogImage || ""}">
  <meta property="og:type" content="website">
  
  <!-- Favicon -->
  ${favicon ? `<link rel="icon" href="${favicon}">` : ""}
  
  <!-- Styles -->
  <link rel="stylesheet" href="/styles/main.css">
  ${customCSS ? `<style>${customCSS}</style>` : ""}
  
  <!-- Analytics -->
  ${
    analytics?.googleAnalytics
      ? generateGoogleAnalytics(analytics.googleAnalytics)
      : ""
  }
</head>
<body>
  ${pageData.content || ""}
  
  <!-- Scripts -->
  <script src="/scripts/main.js"></script>
  ${customJS ? `<script>${customJS}</script>` : ""}
</body>
</html>`;

  return html;
}

export async function generateCSS(websiteData) {
  const { primaryColor, secondaryColor, fontFamily, customCSS } =
    websiteData.theme || {};

  const css = `
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${fontFamily || "'Inter', sans-serif"};
  line-height: 1.6;
  color: #333;
  background-color: #fff;
}

/* Primary Color Variables */
:root {
  --primary-color: ${primaryColor || "#3B82F6"};
  --secondary-color: ${secondaryColor || "#8B5CF6"};
  --text-color: #333;
  --bg-color: #fff;
  --border-color: #e5e7eb;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
h5 { font-size: 1.125rem; }
h6 { font-size: 1rem; }

p {
  margin-bottom: 1rem;
}

/* Layout */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
}

.col {
  flex: 1;
  padding: 0 0.5rem;
}

/* Grid System */
.grid {
  display: grid;
  gap: 1rem;
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Buttons */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: var(--primary-color);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: color-mix(in srgb, var(--primary-color) 80%, black);
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: var(--secondary-color);
}

.btn-outline {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

/* Cards */
.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  background-color: #f9fafb;
  border-top: 1px solid var(--border-color);
}

/* Forms */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Navigation */
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-color);
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

/* Sections */
.section {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #1f2937;
}

/* Footer */
.footer {
  background-color: #1f2937;
  color: white;
  padding: 3rem 0 1rem;
  text-align: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4 {
    grid-template-columns: 1fr;
  }
  
  .nav-menu {
    flex-direction: column;
    gap: 1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}

/* Custom Styles */
${customCSS || ""}
`;

  return css;
}

export async function generateJS(websiteData) {
  const js = `
// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  // Initialize animations
  initAnimations();
  
  // Initialize forms
  initForms();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize analytics
  initAnalytics();
});

// Animation functions
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);
  
  // Observe elements with fade-in class
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Form handling
function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Show loading state
  const submitBtn = form.querySelector('[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Navigation handling
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('nav-menu-open');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Analytics initialization
function initAnalytics() {
  // Track page views
  trackPageView();
  
  // Track interactions
  document.querySelectorAll('.btn, .card, .nav-link').forEach(element => {
    element.addEventListener('click', trackClick);
  });
}

function trackPageView() {
  // Implementation depends on analytics service
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href
    });
  }
}

function trackClick(e) {
  const element = e.target;
  const elementType = element.tagName.toLowerCase();
  const elementText = element.textContent.trim();
  
  // Track click events
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      event_category: 'engagement',
      event_label: \`\${elementType}: \${elementText}\`,
      value: 1
    });
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export functions for global use
window.ElevareWebsite = {
  trackClick,
  trackPageView,
  debounce,
  throttle
};
`;

  return js;
}

// ========================================
// FILE GENERATION
// ========================================

export async function generateStaticFiles(websiteData, outputDir) {
  try {
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });

    // Generate CSS
    const css = await generateCSS(websiteData);
    await fs.writeFile(path.join(outputDir, "styles", "main.css"), css);

    // Generate JS
    const js = await generateJS(websiteData);
    await fs.writeFile(path.join(outputDir, "scripts", "main.js"), js);

    // Generate HTML for each page
    for (const page of websiteData.pages || []) {
      const html = await generateHTML(websiteData, page);
      const pageDir = path.join(outputDir, page.path === "/" ? "" : page.path);
      await fs.mkdir(pageDir, { recursive: true });
      await fs.writeFile(path.join(pageDir, "index.html"), html);
    }

    return {
      success: true,
      files: [
        "styles/main.css",
        "scripts/main.js",
        ...(websiteData.pages?.map((p) => `${p.path}index.html`) || []),
      ],
    };
  } catch (error) {
    console.error("Generate static files error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function generateGoogleAnalytics(measurementId) {
  return `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${measurementId}');
</script>`;
}

export async function optimizeImages(imagePaths, outputDir) {
  // This would integrate with image optimization libraries
  // For now, return the original paths
  return {
    success: true,
    optimizedImages: imagePaths,
  };
}

export async function generateManifest(websiteData) {
  const manifest = {
    name: websiteData.name || "Website",
    short_name: websiteData.shortName || "Website",
    description: websiteData.description || "",
    start_url: "/",
    display: "standalone",
    background_color: websiteData.theme?.backgroundColor || "#ffffff",
    theme_color: websiteData.theme?.primaryColor || "#3B82F6",
    icons: websiteData.icons || [],
  };

  return JSON.stringify(manifest, null, 2);
}

export async function generateRobotsTxt(websiteData) {
  const robots = `User-agent: *
Allow: /

Sitemap: ${websiteData.domain}/sitemap.xml`;

  return robots;
}

export async function generateSitemap(websiteData) {
  const pages = websiteData.pages || [];
  const domain = websiteData.domain || "";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${domain}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority || 0.5}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return sitemap;
}
