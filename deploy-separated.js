#!/usr/bin/env node

/**
 * Main Deployment Script for Separated Backend & Frontend
 * This script deploys both backend and frontend to Vercel
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting Separated Backend & Frontend Deployment...\n");

// Check if we're in the root directory
if (!fs.existsSync("backend") || !fs.existsSync("frontend")) {
  console.error("❌ Error: Please run this script from the root directory");
  console.log("💡 Make sure you have both backend/ and frontend/ directories");
  process.exit(1);
}

// Check if vercel is installed
try {
  execSync("vercel --version", { stdio: "ignore" });
} catch (error) {
  console.error("❌ Error: Vercel CLI is not installed");
  console.log("💡 Please install Vercel CLI first:");
  console.log("   npm install -g vercel");
  process.exit(1);
}

// Step 1: Deploy Backend
console.log("📋 Step 1: Deploying Backend...\n");
console.log("📍 Backend directory: ./backend\n");

try {
  // Change to backend directory
  process.chdir("backend");

  // Check if package.json exists
  if (!fs.existsSync("package.json")) {
    throw new Error("package.json not found in backend directory");
  }

  // Install dependencies
  console.log("📦 Installing backend dependencies...");
  execSync("npm install", { stdio: "inherit" });

  // Deploy backend
  console.log("\n🚀 Deploying backend to Vercel...");
  execSync("vercel --prod", { stdio: "inherit" });

  console.log("\n✅ Backend deployed successfully!");

  // Get the deployment URL from user
  console.log("\n📝 Please enter your backend deployment URL:");
  console.log("   (e.g., https://your-backend.vercel.app)");

  // For now, we'll use a placeholder
  const backendUrl = "https://your-backend.vercel.app";
  console.log(`\n📍 Using backend URL: ${backendUrl}`);
  console.log("💡 You can update this in the frontend configuration later");

  // Go back to root
  process.chdir("..");
} catch (error) {
  console.error("\n❌ Backend deployment failed:", error.message);
  console.log("\n💡 Please check the backend configuration and try again");
  process.exit(1);
}

// Step 2: Deploy Frontend
console.log("\n📋 Step 2: Deploying Frontend...\n");
console.log("📍 Frontend directory: ./frontend\n");

try {
  // Change to frontend directory
  process.chdir("frontend");

  // Check if package.json exists
  if (!fs.existsSync("package.json")) {
    throw new Error("package.json not found in frontend directory");
  }

  // Install dependencies
  console.log("📦 Installing frontend dependencies...");
  execSync("npm install", { stdio: "inherit" });

  // Build the project
  console.log("\n🔨 Building the frontend project...");
  execSync("npm run build", { stdio: "inherit" });

  // Deploy frontend
  console.log("\n🚀 Deploying frontend to Vercel...");
  execSync("vercel --prod", { stdio: "inherit" });

  console.log("\n✅ Frontend deployed successfully!");

  // Go back to root
  process.chdir("..");
} catch (error) {
  console.error("\n❌ Frontend deployment failed:", error.message);
  console.log("\n💡 Please check the frontend configuration and try again");
  process.exit(1);
}

// Final instructions
console.log("\n🎉 Deployment Complete!");
console.log("=".repeat(50));
console.log("\n📋 Next Steps:");
console.log("\n1. Backend Configuration:");
console.log("   - Set environment variables in Vercel dashboard:");
console.log("     * MONGODB_URI");
console.log("     * JWT_SECRET");
console.log("     * EMAIL_USER");
console.log("     * EMAIL_PASS");
console.log("     * EMAIL_FROM");
console.log("     * FRONTEND_URL (your frontend domain)");
console.log("\n2. Frontend Configuration:");
console.log("   - Set REACT_APP_API_URL in Vercel dashboard");
console.log("   - Update to your actual backend URL");
console.log("\n3. Testing:");
console.log("   - Test backend APIs: cd backend && node test-apis.js");
console.log("   - Test frontend functionality");
console.log("\n4. Domain Setup:");
console.log("   - Configure custom domains if needed");
console.log("   - Update DNS settings");
console.log(
  "\n💡 For detailed instructions, see: SEPARATED-DEPLOYMENT-GUIDE.md"
);
console.log("\n🚀 Your application is now deployed and separated!");
