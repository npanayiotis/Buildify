# 🚀 Elevare SaaS Platform - Setup Guide

## 📋 Prerequisites

- Node.js 18+ installed
- Git installed
- A code editor (VS Code recommended)

## 🗄️ Database Setup

### Option 1: Supabase (Recommended - Free Tier)

1. **Create Supabase Project:**

   - Go to [supabase.com](https://supabase.com)
   - Sign up and create a new project
   - Wait for the project to be ready (2-3 minutes)

2. **Get Database URL:**

   - Go to Settings → Database
   - Copy the "Connection string" (URI format)
   - Replace `[YOUR-PASSWORD]` with your actual password

3. **Enable Row Level Security (RLS):**
   ```sql
   -- Run this in the SQL Editor
   ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE "Website" ENABLE ROW LEVEL SECURITY;
   ALTER TABLE "Page" ENABLE ROW LEVEL SECURITY;
   ```

### Option 2: Neon Database (Serverless PostgreSQL)

1. **Create Neon Account:**

   - Go to [neon.tech](https://neon.tech)
   - Sign up for free
   - Create a new project

2. **Get Connection String:**
   - Copy the connection string from your dashboard
   - It will look like: `postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/neondb`

### Option 3: Local PostgreSQL

```bash
# macOS
brew install postgresql
brew services start postgresql
createdb elevare_saas

# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb elevare_saas
```

## 🔧 Environment Variables

Create a `.env.local` file in your project root:

```env
# ========================================
# DATABASE CONFIGURATION
# ========================================
DATABASE_URL="postgresql://username:password@localhost:5432/elevare_saas"
# Or use Supabase/Neon URL:
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# ========================================
# AUTHENTICATION
# ========================================
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters"
JWT_EXPIRES_IN="7d"

# ========================================
# VERCEL INTEGRATION
# ========================================
VERCEL_TOKEN="your-vercel-api-token"
VERCEL_TEAM_ID="your-team-id-if-using-team"

# ========================================
# CLOUDFLARE INTEGRATION
# ========================================
CLOUDFLARE_API_TOKEN="your-cloudflare-api-token"
CLOUDFLARE_ZONE_ID="your-zone-id"
CLOUDFLARE_EMAIL="your-cloudflare-email"

# ========================================
# STRIPE PAYMENT PROCESSING
# ========================================
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# ========================================
# EMAIL NOTIFICATIONS (SendGrid)
# ========================================
SENDGRID_API_KEY="SG.your-sendgrid-api-key"
FROM_EMAIL="noreply@yourdomain.com"
FROM_NAME="Elevare Platform"

# ========================================
# FILE STORAGE
# ========================================
# AWS S3 (Optional)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
S3_BUCKET_NAME="elevare-websites"

# Cloudinary (Alternative to S3)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# ========================================
# APPLICATION SETTINGS
# ========================================
NODE_ENV="development"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

## 🚀 Initial Setup Commands

Run these commands in your project directory:

```bash
# 1. Install dependencies (if not already done)
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Push database schema
npx prisma db push

# 4. Seed the database with initial data
npm run db:seed

# 5. Start the development server
npm run dev
```

## 🔑 API Keys Setup Guide

### 1. Vercel API Token

- Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Create a new token with "Full Account" scope
- Copy the token to `VERCEL_TOKEN`

### 2. Stripe Keys

- Go to [stripe.com](https://stripe.com) and create an account
- Go to Developers → API Keys
- Copy the "Publishable key" and "Secret key"
- For webhooks, create an endpoint pointing to your domain

### 3. SendGrid API Key

- Go to [sendgrid.com](https://sendgrid.com) and create an account
- Go to Settings → API Keys
- Create a new API key with "Full Access"
- Copy the key to `SENDGRID_API_KEY`

### 4. Cloudflare API Token

- Go to [dash.cloudflare.com](https://dash.cloudflare.com)
- Go to My Profile → API Tokens
- Create a token with "Zone:Zone:Read, DNS:Edit" permissions
- Copy the token and Zone ID

### 5. Cloudinary (Optional)

- Go to [cloudinary.com](https://cloudinary.com) and create an account
- Get your Cloud Name, API Key, and API Secret from the dashboard

## 🗃️ Database Schema Setup

The Prisma schema is already configured. To apply it:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with initial data
npm run db:seed
```

## 🧪 Testing Your Setup

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Visit the application:**

   - Open [http://localhost:3000](http://localhost:3000)
   - You should see the homepage

3. **Test authentication:**

   - Go to `/auth`
   - Try signing up with a test account

4. **Test templates:**

   - Go to `/templates`
   - Browse the available website templates

5. **Test customization:**
   - Select a template and click "Customize"
   - The GrapesJS editor should load

## 🚨 Troubleshooting

### Database Connection Issues

```bash
# Check if database is accessible
npx prisma db pull

# Reset database if needed
npx prisma migrate reset
```

### Missing Dependencies

```bash
# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## 🚀 Production Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

### Option 2: Railway

1. Connect your GitHub repository
2. Add environment variables
3. Deploy automatically

### Option 3: DigitalOcean App Platform

1. Create a new app from GitHub
2. Configure environment variables
3. Deploy

## 📊 Monitoring & Analytics

After deployment, set up:

- Vercel Analytics (built-in)
- Google Analytics (optional)
- Error tracking with Sentry (optional)

## 🎯 Next Steps After Setup

1. **Customize branding:**

   - Update logo and colors
   - Modify pricing plans
   - Add your contact information

2. **Test the complete flow:**

   - User registration
   - Template selection
   - Website customization
   - Publishing process
   - Payment processing

3. **Set up customer support:**

   - Add help documentation
   - Set up email templates
   - Configure support channels

4. **Launch preparation:**
   - Set up domain and SSL
   - Configure production database
   - Test payment processing
   - Prepare marketing materials

## 💡 Pro Tips

- Start with Supabase free tier for development
- Use Stripe test mode initially
- Set up monitoring and error tracking early
- Keep your JWT secret secure and rotate it regularly
- Use environment-specific configurations

---

**Need Help?** Check the troubleshooting section or review the API documentation in the `/docs` folder.
