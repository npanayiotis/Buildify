#!/usr/bin/env node

/**
 * Production Setup Script
 * Helps set up the Elevare SaaS platform for production
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Elevare SaaS Platform - Production Setup");
console.log("==========================================\n");

// Check if .env.local exists
const envPath = path.join(process.cwd(), ".env.local");
const envExample = `# ========================================
# DATABASE CONFIGURATION
# ========================================
DATABASE_URL="postgresql://username:password@localhost:5432/elevare_saas"

# ========================================
# AUTHENTICATION
# ========================================
JWT_SECRET="your-super-secret-jwt-key-here-make-it-long-and-random"
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
NEXTAUTH_SECRET="your-nextauth-secret"`;

if (!fs.existsSync(envPath)) {
  console.log("📝 Creating .env.local file...");
  fs.writeFileSync(envPath, envExample);
  console.log("✅ .env.local created! Please update it with your actual values.");
} else {
  console.log("✅ .env.local already exists!");
}

// Check if database is configured
const envContent = fs.readFileSync(envPath, "utf8");
const hasDatabaseUrl = envContent.includes("DATABASE_URL") && 
  !envContent.includes("postgresql://username:password@localhost");

if (!hasDatabaseUrl) {
  console.log("\n⚠️  DATABASE_URL not configured!");
  console.log("Please update your .env.local with a valid database URL:");
  console.log("   - Supabase: https://supabase.com");
  console.log("   - Neon: https://neon.tech");
  console.log("   - Or set up local PostgreSQL");
} else {
  console.log("\n✅ Database URL configured!");
  
  // Try to push schema
  try {
    console.log("\n🗄️  Setting up database schema...");
    execSync("npx prisma db push", { stdio: "inherit" });
    console.log("✅ Database schema updated!");
    
    console.log("\n🌱 Seeding database...");
    execSync("npm run db:seed", { stdio: "inherit" });
    console.log("✅ Database seeded!");
  } catch (error) {
    console.log("❌ Database setup failed:", error.message);
    console.log("Please check your DATABASE_URL and try again.");
  }
}

// Check other important environment variables
const requiredVars = [
  "JWT_SECRET",
  "STRIPE_SECRET_KEY",
  "SENDGRID_API_KEY",
  "VERCEL_TOKEN"
];

console.log("\n🔍 Checking required environment variables:");
let missingVars = [];

requiredVars.forEach(varName => {
  const hasVar = envContent.includes(`${varName}=`) && 
    !envContent.includes(`${varName}="your-`);
  
  if (hasVar) {
    console.log(`✅ ${varName}`);
  } else {
    console.log(`❌ ${varName} - NOT CONFIGURED`);
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log(`\n⚠️  Please configure these variables in .env.local:`);
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
}

// Final instructions
console.log("\n🎯 Next Steps:");
console.log("1. Update .env.local with your actual API keys");
console.log("2. Run: npm run dev");
console.log("3. Visit: http://localhost:3000");
console.log("4. Test the application flow");

console.log("\n📚 For detailed setup instructions, see SETUP_GUIDE.md");
console.log("\n🚀 Happy coding!");
