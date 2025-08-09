#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting Production Deployment...\n");

try {
  // Step 1: Install dependencies
  console.log("📦 Installing dependencies...");
  execSync("npm install", { stdio: "inherit" });

  // Step 2: Install client dependencies
  console.log("📦 Installing client dependencies...");
  execSync("cd client && npm install", { stdio: "inherit" });

  // Step 3: Build the client for production
  console.log("🔨 Building client for production...");
  execSync("npm run build:prod", { stdio: "inherit" });

  // Step 4: Verify production build
  const buildPath = path.join(__dirname, "client/build");
  if (!fs.existsSync(buildPath)) {
    throw new Error("Production build failed - build directory not found");
  }

  const indexPath = path.join(buildPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error("Production build failed - index.html not found");
  }

  console.log("✅ Production build verified successfully");

  // Step 5: Test production build locally
  console.log("🧪 Testing production build...");
  console.log("Starting production server on port 5000...");
  console.log("Press Ctrl+C to stop the server after testing\n");

  // Start the production server
  execSync("npm run start:prod", { stdio: "inherit" });
} catch (error) {
  console.error("❌ Deployment failed:", error.message);
  process.exit(1);
}
