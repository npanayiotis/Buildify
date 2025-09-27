# SaaS Template Platform - Architecture Documentation

## 🏗️ Project Structure

This is a **multi-tenant SaaS platform** where each template is a fully functional website with its own backend, database, and admin interface.

```
src/
├── shared/                          # Shared components and utilities
│   ├── database/                    # Database connection and schemas
│   │   ├── connection.js           # Prisma client setup
│   │   └── schema.prisma           # Database schema (moved to prisma/)
│   └── auth/                       # Authentication system
│       ├── auth.js                 # User authentication logic
│       └── middleware.js           # Auth middleware for API routes
│
├── templates/                       # Template-specific components
│   ├── tech-startup/               # Tech Startup Template
│   │   ├── api/                    # Backend API logic
│   │   │   ├── services.js         # Services CRUD operations
│   │   │   ├── team.js             # Team members CRUD operations
│   │   │   └── contact.js          # Contact forms handling
│   │   └── components/             # React components
│   │       ├── TechStartupTemplate.js    # Main template component
│   │       ├── AdminDashboard.js         # Admin interface
│   │       ├── AdminServices.js          # Services management
│   │       ├── AdminTeam.js              # Team management
│   │       └── AdminContactForms.js      # Contact forms management
│   │
│   ├── fashion-boutique/           # Fashion Boutique Template (TODO)
│   ├── personal-blog/              # Personal Blog Template (TODO)
│   ├── restaurant/                 # Restaurant Template (TODO)
│   ├── photography-portfolio/      # Photography Portfolio Template (TODO)
│   ├── consulting-firm/            # Consulting Firm Template (TODO)
│   ├── online-store/               # Online Store Template (TODO)
│   └── travel-agency/              # Travel Agency Template (TODO)
│
├── pages/                          # Next.js pages
│   ├── api/                        # API routes
│   │   └── templates/              # Template-specific API endpoints
│   │       └── tech-startup/       # Tech Startup API routes
│   │           ├── services.js     # /api/templates/tech-startup/services
│   │           ├── services/[id].js # /api/templates/tech-startup/services/[id]
│   │           ├── team.js         # /api/templates/tech-startup/team
│   │           ├── team/[id].js    # /api/templates/tech-startup/team/[id]
│   │           ├── contact.js      # /api/templates/tech-startup/contact
│   │           └── contact/[id].js # /api/templates/tech-startup/contact/[id]
│   │
│   ├── admin/                      # Admin pages
│   │   └── tech-startup.js         # Tech Startup admin dashboard
│   │
│   └── templates/                  # Template pages
│       ├── tech-startup.js         # Public Tech Startup website
│       └── tech-startup-new.js     # New functional Tech Startup website
│
└── components/                     # Shared components
    └── Templates/                  # Template-related components
        ├── TemplateCard.js         # Template selection cards
        ├── WebsitePreview.js       # Live preview component
        ├── FullscreenPreview.js    # Fullscreen modal preview
        ├── Lazy3DCanvas.js         # Performance-optimized 3D canvas
        ├── Performance3DComponents.js # Optimized 3D components
        ├── LazyTemplateWrapper.js  # Dynamic template loading
        ├── PerformanceMonitor.js   # Performance monitoring
        └── LazyTemplateWrapper.js  # Template loading wrapper
```

## 🗄️ Database Schema

### Core Models
- **User**: Platform users with tenant association
- **Tenant**: Multi-tenant organization (each customer gets a tenant)
- **Template**: Template instances for each tenant
- **TenantSettings**: Customization settings per tenant

### Template-Specific Models
- **TechStartupService**: Services offered by tech companies
- **TechStartupTeam**: Team members
- **ContactForm**: Contact form submissions
- **Product**: E-commerce products (for Fashion Boutique, Online Store)
- **BlogPost**: Blog posts (for Personal Blog)
- **MenuItem**: Restaurant menu items
- **Reservation**: Restaurant reservations
- **PortfolioImage**: Photography portfolio images
- **ConsultingService**: Consulting services
- **CaseStudy**: Case studies for consulting firms
- **TravelPackage**: Travel packages
- **Booking**: Travel bookings

## 🔐 Authentication & Authorization

### Multi-Tenant Architecture
- Each customer gets a **Tenant** with unique subdomain
- Users belong to a tenant and have roles (ADMIN, EDITOR, USER)
- API routes are protected with tenant-specific middleware

### Authentication Flow
1. User signs up → Creates Tenant + Template
2. User logs in → Gets JWT token with tenant context
3. API requests include Authorization header with JWT
4. Middleware validates token and adds tenant context to requests

## 🚀 Tech Startup Template Features

### Frontend (Public Website)
- **Hero Section**: 3D animated background with call-to-action
- **Services Section**: Dynamic services from database
- **Team Section**: Team members with social links
- **Contact Form**: Functional contact form with validation
- **Responsive Design**: Mobile-first approach

### Backend API
- **Services API**: CRUD operations for services
- **Team API**: CRUD operations for team members
- **Contact API**: Form submission and admin management

### Admin Dashboard
- **Services Management**: Add, edit, delete, reorder services
- **Team Management**: Manage team members with photos and social links
- **Contact Forms**: View, read, delete contact form submissions
- **Settings**: Template customization (coming soon)

## 🔧 API Endpoints

### Tech Startup API
```
GET    /api/templates/tech-startup/services      # Get all services
POST   /api/templates/tech-startup/services      # Create service
PUT    /api/templates/tech-startup/services/[id] # Update service
DELETE /api/templates/tech-startup/services/[id] # Delete service

GET    /api/templates/tech-startup/team          # Get all team members
POST   /api/templates/tech-startup/team          # Create team member
PUT    /api/templates/tech-startup/team/[id]     # Update team member
DELETE /api/templates/tech-startup/team/[id]     # Delete team member

POST   /api/templates/tech-startup/contact       # Submit contact form
GET    /api/templates/tech-startup/contact       # Get contact forms (admin)
PUT    /api/templates/tech-startup/contact/[id]  # Mark as read/delete
```

## 🎯 Business Model

### SaaS Subscription Tiers
- **Starter**: $29/month - Basic template with admin panel
- **Professional**: $79/month - Advanced features + custom domain
- **Enterprise**: $199/month - White-label + priority support

### Revenue Streams
1. **Monthly Subscriptions**: Recurring revenue from tenants
2. **Transaction Fees**: For e-commerce templates (2-3% per transaction)
3. **Premium Features**: Advanced customization, analytics, etc.
4. **Custom Development**: One-time fees for custom modifications

## 🚧 Next Steps

### Phase 1: Complete Tech Startup Template ✅
- [x] Database schema and API endpoints
- [x] Frontend template with dynamic content
- [x] Admin dashboard for content management
- [x] Contact form functionality

### Phase 2: Build Remaining Templates
- [ ] Fashion Boutique (E-commerce)
- [ ] Personal Blog (CMS)
- [ ] Restaurant (Menu + Reservations)
- [ ] Photography Portfolio (Gallery)
- [ ] Consulting Firm (Services + Case Studies)
- [ ] Online Store (Full E-commerce)
- [ ] Travel Agency (Packages + Bookings)

### Phase 3: Platform Features
- [ ] User authentication and registration
- [ ] Tenant management system
- [ ] Payment processing (Stripe integration)
- [ ] Custom domain support
- [ ] Email notifications
- [ ] Analytics and reporting

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Environment Variables
```env
DATABASE_URL="postgresql://username:password@localhost:5432/database"
JWT_SECRET="your-jwt-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## 📊 Performance Optimizations

- **Lazy Loading**: 3D components load only when visible
- **Code Splitting**: Each template is dynamically imported
- **Memoization**: React.memo for expensive components
- **Bundle Optimization**: Separate chunks for 3D libraries
- **Image Optimization**: Next.js automatic image optimization

## 🔍 Monitoring & Analytics

- **Performance Monitor**: Real-time FPS and memory usage
- **Web Vitals**: Core web vitals tracking
- **Error Tracking**: Comprehensive error logging
- **Usage Analytics**: Template usage and performance metrics

This architecture provides a solid foundation for a scalable SaaS template platform where each template is a complete, functional website with its own backend and admin interface.
