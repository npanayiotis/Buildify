# Website Pages Implementation Guide

## Overview

This document outlines the complete implementation of all 8 website templates with full functionality, content pages, contact forms, and admin dashboards.

## ✅ Completed Components

### 1. Universal Contact Form System

- **Component**: `/src/components/Contact/ContactForm.js`
- **Features**:
  - Reusable across all website types
  - Form validation
  - Success/error messaging
  - Website type tracking
  - Preferred contact method selection

### 2. Contact Form API Endpoints

- **Submit Endpoint**: `/src/pages/api/contact/submit.js`
  - Handles form submissions
  - Validates data
  - Saves to database
- **List Endpoint**: `/src/pages/api/contact/list.js`

  - Retrieves contact submissions
  - Filtering by website type and status
  - Pagination support

- **Update Status**: `/src/pages/api/contact/[id]/update-status.js`
  - Updates submission status
  - Tracks progress (new → in-progress → resolved → closed)

### 3. Database Schema Updates

- **Added ContactSubmission Model** to Prisma schema
- **Fields**:
  - Contact details (name, email, phone, subject, message)
  - Website context (websiteType, websiteId)
  - Status tracking (NEW, IN_PROGRESS, RESOLVED, CLOSED)
  - Timestamps (submittedAt, respondedAt, resolvedAt)

### 4. Admin Dashboard - Contacts

- **Path**: `/admin/contacts`
- **Features**:
  - View all contact submissions
  - Filter by website type and status
  - Update submission status
  - Pagination
  - Stats dashboard (new, in-progress, resolved, closed counts)

### 5. Sample Pages Created

#### Blog Website

- **Home Page**: `/src/pages/site/blog/home.js`
  - Hero section with stats
  - Featured categories
  - Latest posts grid
  - Newsletter signup
  - Testimonials
- **Contact Page**: `/src/pages/site/blog/contact.js`
  - Contact form integration
  - Contact information
  - Social media links
  - FAQ section

#### Restaurant Website

- **Menu Page**: `/src/pages/site/restaurant/menu.js`
  - Category navigation
  - Menu items with images and prices
  - Popular items highlighted
  - Order CTA
- **Reservations Page**: `/src/pages/site/restaurant/reservations.js`
  - Reservation booking form
  - Date/time selection
  - Guest count
  - Special requests
  - Hours of operation
  - Contact information

## 📋 Pages Still Needed

### 1. Blog Website (`/src/pages/site/blog/`)

- ✅ `home.js` - DONE
- ⏳ `about.js` - Create about page with author bio, interests, social links
- ⏳ `posts.js` - All blog posts with search and filtering
- ⏳ `categories.js` - Category listings with post counts
- ⏳ `archive.js` - Archive by date/month
- ✅ `contact.js` - DONE

### 2. Restaurant Website (`/src/pages/site/restaurant/`)

- ✅ `menu.js` - DONE
- ✅ `reservations.js` - DONE
- ⏳ `chef.js` - Chef profiles and culinary team
- ⏳ `wine.js` - Wine collection and pairings
- ⏳ `events.js` - Private events and catering
- ⏳ `gallery.js` - Restaurant photos
- ⏳ `contact.js` - Contact form and location

### 3. Gym Website (`/src/pages/site/gym/`)

- ⏳ `home.js` - Hero, programs overview, testimonials
- ⏳ `about.js` - Gym story and values
- ⏳ `programs.js` - Training programs and classes
- ⏳ `trainers.js` - Trainer profiles and specialties
- ⏳ `facilities.js` - Equipment and amenities
- ⏳ `nutrition.js` - Nutrition services
- ⏳ `membership.js` - Membership plans and pricing
- ⏳ `contact.js` - Contact form and location

### 4. Law Office Website (`/src/pages/site/law/`)

- ⏳ `home.js` - Hero, services, case results
- ⏳ `about.js` - Firm history and values
- ⏳ `services.js` - Practice areas
- ⏳ `attorneys.js` - Attorney profiles and credentials
- ⏳ `cases.js` - Case studies and outcomes
- ⏳ `resources.js` - Legal guides and articles
- ⏳ `contact.js` - Contact form and consultation booking

### 5. Portfolio Website (`/src/pages/site/portfolio/`)

- ⏳ `home.js` - Hero and featured work
- ⏳ `portfolio.js` - Complete portfolio gallery
- ⏳ `about.js` - Personal story and skills
- ⏳ `services.js` - Services offered
- ⏳ `process.js` - Creative process steps
- ⏳ `contact.js` - Contact form and availability

### 6. Real Estate Website (`/src/pages/site/real-estate/`)

- ⏳ `home.js` - Hero and featured properties
- ⏳ `properties.js` - Property listings with search
- ⏳ `agents.js` - Agent profiles
- ⏳ `services.js` - Buying, selling, investment services
- ⏳ `market.js` - Market reports and insights
- ⏳ `contact.js` - Contact form and consultation booking

### 7. Medical Practice Website (`/src/pages/site/medical/`)

- ⏳ `home.js` - Hero and services overview
- ⏳ `about.js` - Practice history and mission
- ⏳ `services.js` - Medical services offered
- ⏳ `doctors.js` - Physician profiles
- ⏳ `appointments.js` - Online appointment booking
- ⏳ `patient-portal.js` - Patient information access
- ⏳ `contact.js` - Contact form and emergency info

### 8. Photography Studio Website (`/src/pages/site/photography/`)

- ⏳ `home.js` - Hero and featured work
- ⏳ `portfolio.js` - Photo gallery by category
- ⏳ `about.js` - Photographer story
- ⏳ `services.js` - Photography services and packages
- ⏳ `booking.js` - Session booking system
- ⏳ `blog.js` - Photography tips and updates
- ⏳ `contact.js` - Contact form and studio location

## 📊 Admin Dashboards Needed

### 1. Blog Management (`/admin/blog/`)

- ⏳ **Posts Dashboard** - Create, edit, delete blog posts
- ⏳ **Categories Manager** - Manage blog categories
- ⏳ **Comments Moderation** - Approve/moderate comments
- ⏳ **Newsletter Subscribers** - Manage email subscribers
- ⏳ **Analytics** - Post views, popular content

### 2. Restaurant Management (`/admin/restaurant/`)

- ⏳ **Menu Manager** - Add, edit, delete menu items
- ⏳ **Reservations Dashboard** - View and manage bookings
- ⏳ **Events Manager** - Manage private events and catering
- ⏳ **Reviews** - Customer reviews moderation
- ⏳ **Analytics** - Booking trends, popular dishes

### 3. Gym Management (`/admin/gym/`)

- ⏳ **Members Dashboard** - Member management
- ⏳ **Class Schedule Manager** - Manage classes and schedules
- ⏳ **Trainers Manager** - Add/edit trainer profiles
- ⏳ **Programs Manager** - Manage training programs
- ⏳ **Membership Plans** - Edit pricing and features
- ⏳ **Analytics** - Member stats, class attendance

### 4. Law Office Management (`/admin/law/`)

- ⏳ **Cases Dashboard** - Case management system
- ⏳ **Clients Manager** - Client information
- ⏳ **Consultation Requests** - View and schedule consultations
- ⏳ **Resources Manager** - Manage legal articles
- ⏳ **Analytics** - Consultation stats, case outcomes

### 5. Portfolio Management (`/admin/portfolio/`)

- ⏳ **Projects Manager** - Add/edit portfolio projects
- ⏳ **Inquiries Dashboard** - Project inquiries
- ⏳ **Services Manager** - Edit service offerings
- ⏳ **Testimonials** - Manage client testimonials
- ⏳ **Analytics** - Portfolio views, inquiry sources

### 6. Real Estate Management (`/admin/real-estate/`)

- ⏳ **Properties Manager** - Add/edit/delete listings
- ⏳ **Agents Manager** - Agent profile management
- ⏳ **Inquiries Dashboard** - Property inquiries
- ⏳ **Market Reports** - Upload market data
- ⏳ **Analytics** - Property views, inquiry trends

### 7. Medical Practice Management (`/admin/medical/`)

- ⏳ **Appointments Dashboard** - View and manage appointments
- ⏳ **Patients Manager** - Patient records (HIPAA compliant)
- ⏳ **Doctors Manager** - Physician profiles
- ⏳ **Services Manager** - Medical services offered
- ⏳ **Insurance Manager** - Accepted insurance plans
- ⏳ **Analytics** - Appointment trends, patient stats

### 8. Photography Studio Management (`/admin/photography/`)

- ⏳ **Bookings Dashboard** - View and manage photo sessions
- ⏳ **Gallery Manager** - Upload and organize photos
- ⏳ **Packages Manager** - Edit service packages
- ⏳ **Client Deliveries** - Photo delivery system
- ⏳ **Analytics** - Booking trends, popular services

## 🔧 Additional Features to Implement

### Universal Features

1. **Search Functionality** - Site-wide search for all websites
2. **Analytics Integration** - Google Analytics tracking
3. **SEO Optimization** - Meta tags, sitemaps, structured data
4. **Social Media Integration** - Share buttons, social feeds
5. **Mobile Navigation** - Responsive hamburger menu
6. **Loading States** - Skeleton screens and loading indicators
7. **Error Handling** - 404 pages, error boundaries
8. **Accessibility** - ARIA labels, keyboard navigation

### Booking/Appointment Systems

- **Restaurant Reservations** - Table booking with availability check
- **Gym Class Bookings** - Class scheduling system
- **Medical Appointments** - Doctor appointment booking
- **Photography Sessions** - Session booking calendar
- **Law Consultations** - Consultation scheduling

### Payment Integration

- **Gym Memberships** - Payment processing for memberships
- **Restaurant Orders** - Online ordering (optional)
- **Photography Packages** - Package payment
- **Law Retainers** - Retainer payment processing

## 📝 Implementation Steps

### Step 1: Complete All Website Pages

1. Use the existing page examples as templates
2. Follow the navigation structure in each website's data
3. Integrate ContactForm component on all contact pages
4. Use consistent styling (Tailwind CSS)
5. Ensure mobile responsiveness

### Step 2: Build Admin Dashboards

1. Create dashboard layouts for each website type
2. Implement CRUD operations for each content type
3. Add filtering, sorting, and search
4. Include analytics and reporting
5. Add export functionality (CSV, PDF)

### Step 3: Add Booking/Appointment Systems

1. Create booking forms with date/time selection
2. Implement availability checking
3. Add confirmation emails
4. Create admin booking management
5. Add calendar integrations

### Step 4: Enhance Functionality

1. Add search functionality
2. Implement filtering and sorting
3. Add pagination where needed
4. Create user authentication for client portals
5. Add file upload capabilities

### Step 5: Testing & Polish

1. Test all forms and submissions
2. Verify responsive design on all devices
3. Check accessibility compliance
4. Optimize images and performance
5. Add loading states and error handling

## 🚀 Quick Start

### Running the Application

```bash
# Install dependencies
npm install

# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

### Accessing Pages

- Blog: `http://localhost:3000/site/blog/home`
- Restaurant: `http://localhost:3000/site/restaurant/menu`
- Admin: `http://localhost:3000/admin/contacts`

## 📚 Page Template Structure

Each page should follow this structure:

```javascript
import Link from "next/link";
import { WEBSITES } from "../../../lib/saas/websites/websiteData";

export default function PageName() {
  const websiteData = WEBSITES.find((w) => w.id === "website-id");

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav>...</nav>

      {/* Hero Section */}
      <section>...</section>

      {/* Content Sections */}
      <section>...</section>

      {/* Footer */}
      <footer>...</footer>
    </div>
  );
}
```

## 🎨 Design Guidelines

- **Colors**: Use website-specific brand colors from website data
- **Typography**: Consistent font sizes and weights
- **Spacing**: Use Tailwind's spacing scale (4, 6, 8, 12, 16, 20)
- **Components**: Reuse components across websites
- **Images**: Use unsplash URLs provided in website data

## 📞 Support

For questions or issues during implementation:

1. Check the website data in `/src/lib/saas/websites/`
2. Review example pages for patterns
3. Refer to Tailwind CSS documentation
4. Check Prisma schema for data models

## 🎯 Priority Order

1. ✅ Contact forms and API (DONE)
2. ✅ Admin contacts dashboard (DONE)
3. Complete remaining website pages
4. Build website-specific admin dashboards
5. Add booking/appointment systems
6. Implement payment processing
7. Add analytics and reporting
8. Polish and optimize
