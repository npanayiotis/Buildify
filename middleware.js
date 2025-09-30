/**
 * Multi-Tenant Routing Middleware
 * Handles subdomain and custom domain routing for customer websites
 */

import { NextResponse } from "next/server";
import { getWebsiteByDomain } from "./src/lib/domains";

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // Skip middleware for API routes, static files, and admin routes
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/admin/") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/templates/") ||
    pathname.startsWith("/customize/") ||
    pathname.startsWith("/monderna/") ||
    pathname.startsWith("/pricing/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  // Extract subdomain or custom domain
  const domainParts = hostname.split(".");

  // Handle main domain (elevare.com)
  if (domainParts.length === 2 && domainParts[1] === "elevare.com") {
    return NextResponse.next();
  }

  // Handle www subdomain
  if (hostname === "www.elevare.com" || hostname === "elevare.com") {
    return NextResponse.next();
  }

  try {
    // Get website by domain
    const website = await getWebsiteByDomain(hostname);

    if (!website) {
      // Domain not found - show 404 or redirect to main site
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    // Check if website is published
    if (!website.published) {
      return NextResponse.rewrite(new URL("/maintenance", request.url));
    }

    // Rewrite to customer site renderer
    const url = request.nextUrl.clone();

    // Handle root path
    if (pathname === "/") {
      url.pathname = `/site/${website.id}`;
    } else {
      // Handle other paths
      url.pathname = `/site/${website.id}${pathname}`;
    }

    // Add website data to headers for the page component
    const response = NextResponse.rewrite(url);
    response.headers.set("x-website-id", website.id);
    response.headers.set("x-website-name", website.name);
    response.headers.set("x-website-domain", hostname);

    return response;
  } catch (error) {
    console.error("Middleware error:", error);

    // On error, redirect to main site
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (admin routes)
     * - auth (authentication routes)
     * - dashboard (user dashboard)
     * - templates (template pages)
     * - customize (customization pages)
     * - monderna (Monderna chatbot)
     * - pricing (pricing pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|admin|auth|dashboard|templates|customize|monderna|pricing).*)",
  ],
};
