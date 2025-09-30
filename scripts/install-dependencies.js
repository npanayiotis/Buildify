/**
 * Install Dependencies Script
 * Installs all required dependencies for the Elevare SaaS platform
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Installing dependencies for Elevare SaaS Platform...\n");

// ========================================
// REDUX DEPENDENCIES
// ========================================

const reduxDependencies = ["@reduxjs/toolkit", "react-redux", "redux-persist"];

// ========================================
// AUTHENTICATION DEPENDENCIES
// ========================================

const authDependencies = ["bcryptjs", "jsonwebtoken"];

// ========================================
// PAYMENT DEPENDENCIES
// ========================================

const paymentDependencies = ["stripe"];

// ========================================
// EMAIL DEPENDENCIES
// ========================================

const emailDependencies = ["@sendgrid/mail"];

// ========================================
// FILE STORAGE DEPENDENCIES
// ========================================

const storageDependencies = ["cloudinary", "sharp", "multer"];

// ========================================
// SECURITY DEPENDENCIES
// ========================================

const securityDependencies = [
  "cors",
  "helmet",
  "express-rate-limit",
  "compression",
  "morgan",
];

// ========================================
// HOSTING DEPENDENCIES
// ========================================

const hostingDependencies = ["@vercel/client"];

// ========================================
// DATABASE DEPENDENCIES
// ========================================

const databaseDependencies = ["@prisma/client", "prisma"];

// ========================================
// DEVELOPMENT DEPENDENCIES
// ========================================

const devDependencies = [
  "@types/bcryptjs",
  "@types/jsonwebtoken",
  "@types/multer",
  "@types/cors",
  "@types/compression",
  "@types/morgan",
];

// ========================================
// INSTALLATION FUNCTIONS
// ========================================

function installDependencies(dependencies, isDev = false) {
  console.log(`📦 Installing ${isDev ? "dev " : ""}dependencies...`);

  try {
    const command = `npm install ${
      isDev ? "--save-dev " : ""
    }${dependencies.join(" ")}`;
    execSync(command, { stdio: "inherit" });
    console.log(
      `✅ ${isDev ? "Dev " : ""}dependencies installed successfully\n`
    );
  } catch (error) {
    console.error(
      `❌ Failed to install ${isDev ? "dev " : ""}dependencies:`,
      error.message
    );
    process.exit(1);
  }
}

function installReduxDependencies() {
  console.log("🔧 Installing Redux dependencies...");
  installDependencies(reduxDependencies);
}

function installAuthDependencies() {
  console.log("🔐 Installing authentication dependencies...");
  installDependencies(authDependencies);
}

function installPaymentDependencies() {
  console.log("💳 Installing payment dependencies...");
  installDependencies(paymentDependencies);
}

function installEmailDependencies() {
  console.log("📧 Installing email dependencies...");
  installDependencies(emailDependencies);
}

function installStorageDependencies() {
  console.log("📁 Installing file storage dependencies...");
  installDependencies(storageDependencies);
}

function installSecurityDependencies() {
  console.log("🛡️ Installing security dependencies...");
  installDependencies(securityDependencies);
}

function installHostingDependencies() {
  console.log("🌐 Installing hosting dependencies...");
  installDependencies(hostingDependencies);
}

function installDatabaseDependencies() {
  console.log("🗄️ Installing database dependencies...");
  installDependencies(databaseDependencies);
}

function installDevDependencies() {
  console.log("🛠️ Installing development dependencies...");
  installDependencies(devDependencies, true);
}

// ========================================
// MAIN INSTALLATION FUNCTION
// ========================================

async function main() {
  try {
    // Check if package.json exists
    if (!fs.existsSync("package.json")) {
      console.error(
        "❌ package.json not found. Please run this script from the project root."
      );
      process.exit(1);
    }

    // Install all dependencies
    installReduxDependencies();
    installAuthDependencies();
    installPaymentDependencies();
    installEmailDependencies();
    installStorageDependencies();
    installSecurityDependencies();
    installHostingDependencies();
    installDatabaseDependencies();
    installDevDependencies();

    console.log("🎉 All dependencies installed successfully!");
    console.log("\n📝 Next steps:");
    console.log("   1. Copy env.example to .env and configure it");
    console.log("   2. Set up your PostgreSQL database");
    console.log("   3. Run: npm run db:generate");
    console.log("   4. Run: npm run db:push");
    console.log("   5. Run: npm run db:seed");
    console.log("   6. Run: npm run dev");
  } catch (error) {
    console.error("\n❌ Installation failed:", error.message);
    process.exit(1);
  }
}

// Run installation
main();
