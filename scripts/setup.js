/**
 * Setup Script for Elevare SaaS Platform
 * Initializes database, installs dependencies, and configures environment
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up Elevare SaaS Platform...\n");

// ========================================
// ENVIRONMENT CHECK
// ========================================

function checkEnvironment() {
  console.log("📋 Checking environment...");

  // Check Node.js version
  const nodeVersion = process.version;
  const requiredVersion = "18.0.0";

  if (parseInt(nodeVersion.slice(1).split(".")[0]) < 18) {
    console.error("❌ Node.js 18 or higher is required");
    process.exit(1);
  }

  console.log(`✅ Node.js version: ${nodeVersion}`);

  // Check if .env file exists
  const envPath = path.join(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) {
    console.log(
      "⚠️  .env file not found. Please copy env.example to .env and configure it."
    );
    console.log("   cp env.example .env");
    process.exit(1);
  }

  console.log("✅ Environment file found");
}

// ========================================
// INSTALL DEPENDENCIES
// ========================================

function installDependencies() {
  console.log("\n📦 Installing dependencies...");

  try {
    execSync("npm install", { stdio: "inherit" });
    console.log("✅ Dependencies installed successfully");
  } catch (error) {
    console.error("❌ Failed to install dependencies:", error.message);
    process.exit(1);
  }
}

// ========================================
// DATABASE SETUP
// ========================================

function setupDatabase() {
  console.log("\n🗄️  Setting up database...");

  try {
    // Generate Prisma client
    console.log("   Generating Prisma client...");
    execSync("npx prisma generate", { stdio: "inherit" });

    // Push database schema
    console.log("   Pushing database schema...");
    execSync("npx prisma db push", { stdio: "inherit" });

    // Seed database
    console.log("   Seeding database...");
    execSync("node scripts/seed.js", { stdio: "inherit" });

    console.log("✅ Database setup completed");
  } catch (error) {
    console.error("❌ Database setup failed:", error.message);
    console.log("   Please check your DATABASE_URL in .env file");
    process.exit(1);
  }
}

// ========================================
// BUILD PROJECT
// ========================================

function buildProject() {
  console.log("\n🔨 Building project...");

  try {
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ Project built successfully");
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
}

// ========================================
// VERIFICATION
// ========================================

function verifySetup() {
  console.log("\n🔍 Verifying setup...");

  const checks = [
    {
      name: "Package.json",
      check: () => fs.existsSync("package.json"),
    },
    {
      name: "Prisma Schema",
      check: () => fs.existsSync("prisma/schema.prisma"),
    },
    {
      name: "Next.js Config",
      check: () => fs.existsSync("next.config.js"),
    },
    {
      name: "Environment File",
      check: () => fs.existsSync(".env"),
    },
    {
      name: "Build Output",
      check: () => fs.existsSync(".next"),
    },
  ];

  let allPassed = true;

  checks.forEach(({ name, check }) => {
    if (check()) {
      console.log(`   ✅ ${name}`);
    } else {
      console.log(`   ❌ ${name}`);
      allPassed = false;
    }
  });

  if (!allPassed) {
    console.log("\n❌ Setup verification failed");
    process.exit(1);
  }

  console.log("\n✅ Setup verification completed");
}

// ========================================
// MAIN SETUP FUNCTION
// ========================================

async function main() {
  try {
    checkEnvironment();
    installDependencies();
    setupDatabase();
    buildProject();
    verifySetup();

    console.log("\n🎉 Setup completed successfully!");
    console.log("\n📝 Next steps:");
    console.log("   1. Configure your .env file with real values");
    console.log("   2. Set up your PostgreSQL database");
    console.log("   3. Configure Vercel deployment");
    console.log("   4. Set up Stripe for payments");
    console.log("   5. Configure email service (SendGrid)");
    console.log("   6. Set up file storage (Cloudinary/S3)");
    console.log('\n🚀 Run "npm run dev" to start development server');
  } catch (error) {
    console.error("\n❌ Setup failed:", error.message);
    process.exit(1);
  }
}

// Run setup
main();
