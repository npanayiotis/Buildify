/**
 * Customer Website Renderer
 * Renders customer websites based on domain routing
 */

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { prisma } from "../../../lib/prisma/client";
import { renderComponents } from "../../../lib/publishing/components";
import { getWebsiteByDomain } from "../../../lib/domains";

// ========================================
// SERVER-SIDE PROPS
// ========================================

export async function getServerSideProps({ params, req, res }) {
  const { websiteId, slug } = params;
  const hostname = req.headers.host;

  try {
    // Get website data
    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      include: {
        pages: {
          where: { published: true },
          orderBy: { order: "asc" },
        },
        settings: true,
        domains: true,
      },
    });

    if (!website) {
      return {
        notFound: true,
      };
    }

    // Check if website is published
    if (!website.published) {
      return {
        redirect: {
          destination: "/maintenance",
          permanent: false,
        },
      };
    }

    // Determine which page to render
    const pagePath = slug ? `/${slug.join("/")}` : "/";
    const page = website.pages.find((p) => p.slug === pagePath);

    if (!page) {
      // Page not found - show 404
      return {
        notFound: true,
      };
    }

    // Parse page content
    const pageContent =
      typeof page.content === "string"
        ? JSON.parse(page.content)
        : page.content;

    return {
      props: {
        website: {
          id: website.id,
          name: website.name,
          description: website.description,
          favicon: website.favicon,
          customCSS: website.customCSS,
          customJS: website.customJS,
          metaTitle: website.metaTitle,
          metaDescription: website.metaDescription,
          metaKeywords: website.metaKeywords,
        },
        page: {
          id: page.id,
          title: page.title,
          slug: page.slug,
          content: pageContent,
          metaTitle: page.metaTitle,
          metaDescription: page.metaDescription,
          metaImage: page.metaImage,
        },
        settings: website.settings,
        hostname,
      },
    };
  } catch (error) {
    console.error("Server-side props error:", error);
    return {
      notFound: true,
    };
  }
}

// ========================================
// CLIENT COMPONENT
// ========================================

export default function CustomerSite({ website, page, settings, hostname }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply custom CSS
    if (website.customCSS) {
      const styleElement = document.createElement("style");
      styleElement.textContent = website.customCSS;
      document.head.appendChild(styleElement);
    }

    // Execute custom JS
    if (website.customJS) {
      try {
        eval(website.customJS);
      } catch (error) {
        console.error("Custom JS error:", error);
      }
    }

    setIsLoading(false);
  }, [website.customCSS, website.customJS]);

  // Loading state
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontSize: "1.2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "3px solid rgba(255,255,255,0.3)",
              borderTop: "3px solid white",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p>Loading {website.name}...</p>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle || website.name}</title>
        <meta
          name="description"
          content={page.metaDescription || website.description}
        />
        <meta name="keywords" content={website.metaKeywords} />

        {/* Favicon */}
        {website.favicon && <link rel="icon" href={website.favicon} />}

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={page.metaTitle || website.name} />
        <meta
          property="og:description"
          content={page.metaDescription || website.description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://${hostname}${page.slug}`} />
        {page.metaImage && (
          <meta property="og:image" content={page.metaImage} />
        )}

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.metaTitle || website.name} />
        <meta
          name="twitter:description"
          content={page.metaDescription || website.description}
        />
        {page.metaImage && (
          <meta name="twitter:image" content={page.metaImage} />
        )}

        {/* Analytics */}
        {settings?.gaTrackingId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaTrackingId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.gaTrackingId}');
                `,
              }}
            />
          </>
        )}

        {/* Facebook Pixel */}
        {settings?.fbPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${settings.fbPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}

        {/* Custom CSS */}
        {website.customCSS && (
          <style dangerouslySetInnerHTML={{ __html: website.customCSS }} />
        )}
      </Head>

      {/* Website Content */}
      <div className="customer-website">
        {renderComponents(page.content, { website, page, settings })}
      </div>

      {/* Custom JavaScript */}
      {website.customJS && (
        <script dangerouslySetInnerHTML={{ __html: website.customJS }} />
      )}

      {/* Global Styles */}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", sans-serif;
          line-height: 1.6;
          color: #333;
        }

        .customer-website {
          min-height: 100vh;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container {
            padding: 0 15px !important;
          }

          .hero h1 {
            font-size: 2rem !important;
          }

          .hero p {
            font-size: 1rem !important;
          }
        }

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Focus Styles */
        a:focus,
        button:focus,
        input:focus,
        textarea:focus {
          outline: 2px solid #667eea;
          outline-offset: 2px;
        }

        /* Loading Animation */
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Utility Classes */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .btn {
          display: inline-block;
          padding: 12px 24px;
          background: #667eea;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .btn:hover {
          background: #5a6fd8;
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .btn-secondary:hover {
          background: #667eea;
          color: white;
        }
      `}</style>
    </>
  );
}

// ========================================
// ERROR PAGES
// ========================================
