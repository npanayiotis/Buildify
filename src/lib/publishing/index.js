/**
 * Publishing System
 * Handles website publishing, static site generation, and deployment
 */

import { prisma } from "../prisma/client";
import { generateStaticHTML } from "./static-generator";
import { deployToVercel } from "./vercel-deployment";
import { uploadToStorage } from "./storage";
import { sendNotification } from "./notifications";

// ========================================
// MAIN PUBLISHING FLOW
// ========================================

export async function publishWebsite(websiteId, options = {}) {
  try {
    console.log(`Starting publication process for website ${websiteId}`);

    // 1. Get website data
    const website = await getWebsiteData(websiteId);
    if (!website) {
      throw new Error("Website not found");
    }

    // 2. Validate website
    const validation = await validateWebsite(website);
    if (!validation.valid) {
      throw new Error(`Website validation failed: ${validation.error}`);
    }

    // 3. Generate static files
    console.log("Generating static files...");
    const staticFiles = await generateStaticFiles(website);

    // 4. Upload files to storage
    console.log("Uploading files to storage...");
    const uploadResult = await uploadFiles(staticFiles, website);

    // 5. Deploy to hosting provider
    console.log("Deploying to hosting provider...");
    const deployment = await deployWebsite(website, uploadResult);

    // 6. Update database
    console.log("Updating database...");
    await updateWebsiteStatus(websiteId, {
      published: true,
      publishedAt: new Date(),
      lastPublishedAt: new Date(),
      deploymentUrl: deployment.url,
    });

    // 7. Send notifications
    await sendPublishNotification(website);

    console.log("Website published successfully!");
    return {
      success: true,
      url: deployment.url,
      deploymentId: deployment.id,
      message: "Website published successfully",
    };
  } catch (error) {
    console.error("Publishing error:", error);

    // Update status to failed
    await updateWebsiteStatus(websiteId, {
      published: false,
      publishError: error.message,
    });

    // Send failure notification
    await sendPublishFailureNotification(websiteId, error.message);

    return {
      success: false,
      error: error.message,
    };
  }
}

// ========================================
// WEBSITE DATA RETRIEVAL
// ========================================

async function getWebsiteData(websiteId) {
  try {
    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      include: {
        pages: {
          where: { published: true },
          orderBy: { order: "asc" },
        },
        settings: true,
        domains: true,
        user: {
          include: {
            subscriptions: true,
          },
        },
      },
    });

    return website;
  } catch (error) {
    console.error("Get website data error:", error);
    throw error;
  }
}

// ========================================
// WEBSITE VALIDATION
// ========================================

async function validateWebsite(website) {
  const errors = [];

  // Check if website has pages
  if (!website.pages || website.pages.length === 0) {
    errors.push("Website must have at least one page");
  }

  // Check if homepage exists
  const homepage = website.pages.find(
    (page) => page.isHomepage || page.slug === "/"
  );
  if (!homepage) {
    errors.push("Website must have a homepage");
  }

  // Check if website has a name
  if (!website.name || website.name.trim() === "") {
    errors.push("Website must have a name");
  }

  // Check domain configuration
  if (website.customDomain && !website.domainVerified) {
    errors.push("Custom domain must be verified before publishing");
  }

  // Check user subscription
  const userPlan = website.user.subscriptions[0]?.plan || "FREE";
  if (userPlan === "FREE" && website.customDomain) {
    errors.push("Custom domains require Pro plan or higher");
  }

  return {
    valid: errors.length === 0,
    errors,
    error: errors.join(", "),
  };
}

// ========================================
// STATIC FILE GENERATION
// ========================================

async function generateStaticFiles(website) {
  try {
    const files = {};

    // Generate main pages
    for (const page of website.pages) {
      const html = await generatePageHTML(page, website);
      const filename =
        page.slug === "/" ? "index.html" : `${page.slug}/index.html`;
      files[filename] = html;
    }

    // Generate sitemap
    files["sitemap.xml"] = generateSitemap(website);

    // Generate robots.txt
    files["robots.txt"] = generateRobotsTxt(website);

    // Generate manifest.json for PWA
    files["manifest.json"] = generateManifest(website);

    // Generate favicon.ico (if available)
    if (website.favicon) {
      files["favicon.ico"] = website.favicon;
    }

    // Add custom CSS and JS
    if (website.customCSS) {
      files["assets/custom.css"] = website.customCSS;
    }

    if (website.customJS) {
      files["assets/custom.js"] = website.customJS;
    }

    return files;
  } catch (error) {
    console.error("Static file generation error:", error);
    throw error;
  }
}

async function generatePageHTML(page, website) {
  const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.metaTitle || website.name}</title>
    <meta name="description" content="${
      page.metaDescription || website.description || ""
    }">
    <meta name="keywords" content="${website.metaKeywords || ""}">
    
    <!-- Favicon -->
    ${website.favicon ? `<link rel="icon" href="${website.favicon}">` : ""}
    
    <!-- Custom CSS -->
    ${website.customCSS ? `<style>${website.customCSS}</style>` : ""}
    
    <!-- SEO Meta Tags -->
    <meta property="og:title" content="${page.metaTitle || website.name}">
    <meta property="og:description" content="${
      page.metaDescription || website.description || ""
    }">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${getWebsiteUrl(website)}${page.slug}">
    ${
      page.metaImage
        ? `<meta property="og:image" content="${page.metaImage}">`
        : ""
    }
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${page.metaTitle || website.name}">
    <meta name="twitter:description" content="${
      page.metaDescription || website.description || ""
    }">
    ${
      page.metaImage
        ? `<meta name="twitter:image" content="${page.metaImage}">`
        : ""
    }
    
    <!-- Analytics -->
    ${
      website.settings?.gaTrackingId
        ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${website.settings.gaTrackingId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${website.settings.gaTrackingId}');
    </script>
    `
        : ""
    }
    
    ${
      website.settings?.fbPixelId
        ? `
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${website.settings.fbPixelId}');
      fbq('track', 'PageView');
    </script>
    `
        : ""
    }
</head>
<body>
    ${await generatePageContent(page, website)}
    
    <!-- Custom JavaScript -->
    ${website.customJS ? `<script>${website.customJS}</script>` : ""}
</body>
</html>`;

  return template;
}

async function generatePageContent(page, website) {
  try {
    // Parse page content and generate HTML
    const content =
      typeof page.content === "string"
        ? JSON.parse(page.content)
        : page.content;

    return await renderComponents(content, website);
  } catch (error) {
    console.error("Page content generation error:", error);
    return '<div class="error">Error generating page content</div>';
  }
}

async function renderComponents(components, website) {
  let html = "";

  for (const component of components) {
    switch (component.type) {
      case "HERO":
        html += renderHeroComponent(component, website);
        break;
      case "ABOUT":
        html += renderAboutComponent(component, website);
        break;
      case "SERVICES":
        html += renderServicesComponent(component, website);
        break;
      case "PORTFOLIO":
        html += renderPortfolioComponent(component, website);
        break;
      case "TESTIMONIALS":
        html += renderTestimonialsComponent(component, website);
        break;
      case "CONTACT":
        html += renderContactComponent(component, website);
        break;
      case "FOOTER":
        html += renderFooterComponent(component, website);
        break;
      default:
        html += renderCustomComponent(component, website);
    }
  }

  return html;
}

// ========================================
// COMPONENT RENDERERS
// ========================================

function renderHeroComponent(component, website) {
  const data = component.data || {};
  return `
    <section class="hero" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 100px 0; text-align: center; color: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <h1 style="font-size: 3rem; margin-bottom: 20px; font-weight: bold;">${
          data.title || website.name
        }</h1>
        <p style="font-size: 1.2rem; margin-bottom: 30px; opacity: 0.9;">${
          data.subtitle || website.description
        }</p>
        ${
          data.ctaText
            ? `<a href="${
                data.ctaLink || "#"
              }" style="background: white; color: #667eea; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">${
                data.ctaText
              }</a>`
            : ""
        }
      </div>
    </section>
  `;
}

function renderAboutComponent(component, website) {
  const data = component.data || {};
  return `
    <section class="about" style="padding: 80px 0; background: #f8f9fa;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <h2 style="text-align: center; margin-bottom: 50px; font-size: 2.5rem;">${
          data.title || "About Us"
        }</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center;">
          <div>
            <p style="font-size: 1.1rem; line-height: 1.6; color: #666;">${
              data.content || website.description
            }</p>
          </div>
          ${
            data.image
              ? `<div><img src="${data.image}" alt="${
                  data.title || "About"
                }" style="width: 100%; border-radius: 10px;"></div>`
              : ""
          }
        </div>
      </div>
    </section>
  `;
}

function renderServicesComponent(component, website) {
  const data = component.data || {};
  const services = data.services || [];

  let servicesHTML = services
    .map(
      (service) => `
    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
      <h3 style="margin-bottom: 15px; color: #333;">${service.title}</h3>
      <p style="color: #666; line-height: 1.6;">${service.description}</p>
      ${
        service.price
          ? `<div style="margin-top: 20px; font-weight: bold; color: #667eea; font-size: 1.2rem;">${service.price}</div>`
          : ""
      }
    </div>
  `
    )
    .join("");

  return `
    <section class="services" style="padding: 80px 0; background: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <h2 style="text-align: center; margin-bottom: 50px; font-size: 2.5rem;">${
          data.title || "Our Services"
        }</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
          ${servicesHTML}
        </div>
      </div>
    </section>
  `;
}

function renderPortfolioComponent(component, website) {
  const data = component.data || {};
  const items = data.items || [];

  let portfolioHTML = items
    .map(
      (item) => `
    <div style="background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
      ${
        item.image
          ? `<img src="${item.image}" alt="${item.title}" style="width: 100%; height: 200px; object-fit: cover;">`
          : ""
      }
      <div style="padding: 20px;">
        <h3 style="margin-bottom: 10px;">${item.title}</h3>
        <p style="color: #666;">${item.description}</p>
        ${
          item.link
            ? `<a href="${item.link}" style="color: #667eea; text-decoration: none;">View Project →</a>`
            : ""
        }
      </div>
    </div>
  `
    )
    .join("");

  return `
    <section class="portfolio" style="padding: 80px 0; background: #f8f9fa;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <h2 style="text-align: center; margin-bottom: 50px; font-size: 2.5rem;">${
          data.title || "Our Portfolio"
        }</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
          ${portfolioHTML}
        </div>
      </div>
    </section>
  `;
}

function renderTestimonialsComponent(component, website) {
  const data = component.data || {};
  const testimonials = data.testimonials || [];

  let testimonialsHTML = testimonials
    .map(
      (testimonial) => `
    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); text-align: center;">
      <p style="font-style: italic; margin-bottom: 20px; font-size: 1.1rem; color: #666;">"${
        testimonial.content
      }"</p>
      <div>
        <strong>${testimonial.author}</strong>
        ${
          testimonial.position
            ? `<div style="color: #667eea; font-size: 0.9rem;">${testimonial.position}</div>`
            : ""
        }
      </div>
    </div>
  `
    )
    .join("");

  return `
    <section class="testimonials" style="padding: 80px 0; background: white;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <h2 style="text-align: center; margin-bottom: 50px; font-size: 2.5rem;">${
          data.title || "What Our Clients Say"
        }</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
          ${testimonialsHTML}
        </div>
      </div>
    </section>
  `;
}

function renderContactComponent(component, website) {
  const data = component.data || {};
  const settings = website.settings;

  return `
    <section class="contact" style="padding: 80px 0; background: #f8f9fa;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <h2 style="text-align: center; margin-bottom: 50px; font-size: 2.5rem;">${
          data.title || "Contact Us"
        }</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px;">
          <div>
            <h3 style="margin-bottom: 20px;">Get in Touch</h3>
            ${
              settings?.email
                ? `<p style="margin-bottom: 10px;"><strong>Email:</strong> ${settings.email}</p>`
                : ""
            }
            ${
              settings?.phone
                ? `<p style="margin-bottom: 10px;"><strong>Phone:</strong> ${settings.phone}</p>`
                : ""
            }
            ${
              settings?.address
                ? `<p style="margin-bottom: 10px;"><strong>Address:</strong> ${settings.address}</p>`
                : ""
            }
          </div>
          <div>
            <form style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
              <div style="margin-bottom: 20px;">
                <input type="text" placeholder="Your Name" style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
              </div>
              <div style="margin-bottom: 20px;">
                <input type="email" placeholder="Your Email" style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
              </div>
              <div style="margin-bottom: 20px;">
                <textarea placeholder="Your Message" rows="5" style="width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; resize: vertical;"></textarea>
              </div>
              <button type="submit" style="background: #667eea; color: white; padding: 15px 30px; border: none; border-radius: 5px; font-size: 1rem; cursor: pointer; width: 100%;">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooterComponent(component, website) {
  const data = component.data || {};
  const settings = website.settings;

  return `
    <footer style="background: #333; color: white; padding: 50px 0 20px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-bottom: 30px;">
          <div>
            <h3 style="margin-bottom: 20px;">${website.name}</h3>
            <p style="color: #ccc; line-height: 1.6;">${website.description}</p>
          </div>
          <div>
            <h4 style="margin-bottom: 15px;">Contact Info</h4>
            ${
              settings?.email
                ? `<p style="color: #ccc; margin-bottom: 5px;">${settings.email}</p>`
                : ""
            }
            ${
              settings?.phone
                ? `<p style="color: #ccc; margin-bottom: 5px;">${settings.phone}</p>`
                : ""
            }
          </div>
          <div>
            <h4 style="margin-bottom: 15px;">Quick Links</h4>
            ${website.pages
              .map(
                (page) =>
                  `<a href="${page.slug}" style="color: #ccc; text-decoration: none; display: block; margin-bottom: 5px;">${page.title}</a>`
              )
              .join("")}
          </div>
        </div>
        <div style="border-top: 1px solid #555; padding-top: 20px; text-align: center; color: #ccc;">
          <p>&copy; ${new Date().getFullYear()} ${
    website.name
  }. All rights reserved.</p>
          <p>Powered by <a href="https://elevare.com" style="color: #667eea; text-decoration: none;">Elevare</a></p>
        </div>
      </div>
    </footer>
  `;
}

function renderCustomComponent(component, website) {
  return `
    <div class="custom-component" style="padding: 20px; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
      <h3>${component.name || "Custom Component"}</h3>
      <div>${component.data?.content || "Custom component content"}</div>
    </div>
  `;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function generateSitemap(website) {
  const baseUrl = getWebsiteUrl(website);

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  website.pages.forEach((page) => {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.isHomepage ? "1.0" : "0.8"}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

function generateRobotsTxt(website) {
  const baseUrl = getWebsiteUrl(website);

  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`;
}

function generateManifest(website) {
  return JSON.stringify(
    {
      name: website.name,
      short_name: website.name,
      description: website.description,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#667eea",
      icons: website.favicon
        ? [
            {
              src: website.favicon,
              sizes: "192x192",
              type: "image/png",
            },
          ]
        : [],
    },
    null,
    2
  );
}

function getWebsiteUrl(website) {
  if (website.customDomain && website.domainVerified) {
    return `https://${website.customDomain}`;
  }
  return `https://${website.subdomain}.elevare.com`;
}

// ========================================
// FILE UPLOAD AND DEPLOYMENT
// ========================================

async function uploadFiles(files, website) {
  try {
    // Upload files to your storage provider (S3, Cloudinary, etc.)
    const uploadResult = await uploadToStorage(files, `websites/${website.id}`);

    return {
      success: true,
      cdnUrl: uploadResult.cdnUrl,
      files: uploadResult.files,
    };
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
}

async function deployWebsite(website, uploadResult) {
  try {
    // Deploy to hosting provider (Vercel, Netlify, etc.)
    const deployment = await deployToVercel(website, uploadResult.files);

    return deployment;
  } catch (error) {
    console.error("Deployment error:", error);
    throw error;
  }
}

// ========================================
// DATABASE UPDATES
// ========================================

async function updateWebsiteStatus(websiteId, updates) {
  try {
    await prisma.website.update({
      where: { id: websiteId },
      data: updates,
    });
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
}

// ========================================
// NOTIFICATIONS
// ========================================

async function sendPublishNotification(website) {
  try {
    await sendNotification(website.userId, {
      type: "WEBSITE_PUBLISHED",
      title: "Website Published Successfully!",
      message: `Your website "${website.name}" has been published and is now live.`,
      data: {
        websiteId: website.id,
        websiteName: website.name,
        url: getWebsiteUrl(website),
      },
    });
  } catch (error) {
    console.error("Publish notification error:", error);
  }
}

async function sendPublishFailureNotification(websiteId, errorMessage) {
  try {
    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      include: { user: true },
    });

    if (website) {
      await sendNotification(website.userId, {
        type: "SYSTEM_UPDATE",
        title: "Website Publication Failed",
        message: `Failed to publish website "${website.name}": ${errorMessage}`,
        data: {
          websiteId: website.id,
          websiteName: website.name,
          error: errorMessage,
        },
      });
    }
  } catch (error) {
    console.error("Publish failure notification error:", error);
  }
}

// ========================================
// EXPORT FUNCTIONS
// ========================================

// All functions are already exported individually above
