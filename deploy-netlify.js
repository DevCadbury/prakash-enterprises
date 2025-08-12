#!/usr/bin/env node

/**
 * Netlify Deployment Script
 * This script automates the build process for Netlify deployment
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting Netlify deployment process...\n");

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${step} ${message}`, "cyan");
}

function logSuccess(message) {
  log(`✅ ${message}`, "green");
}

function logError(message) {
  log(`❌ ${message}`, "red");
}

function logWarning(message) {
  log(`⚠️  ${message}`, "yellow");
}

function logInfo(message) {
  log(`ℹ️  ${message}`, "blue");
}

// Check if we're in the right directory
function checkDirectory() {
  logStep("1", "Checking project structure...");

  const requiredFiles = ["package.json", "client/package.json", "netlify.toml"];

  const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));

  if (missingFiles.length > 0) {
    logError(`Missing required files: ${missingFiles.join(", ")}`);
    process.exit(1);
  }

  logSuccess("Project structure verified");
}

// Install dependencies
function installDependencies() {
  logStep("2", "Installing root dependencies...");

  try {
    execSync("npm install", { stdio: "inherit" });
    logSuccess("Root dependencies installed");
  } catch (error) {
    logError("Failed to install root dependencies");
    process.exit(1);
  }

  logStep("3", "Installing client dependencies...");

  try {
    execSync("cd client && npm install", { stdio: "inherit" });
    logSuccess("Client dependencies installed");
  } catch (error) {
    logError("Failed to install client dependencies");
    process.exit(1);
  }
}

// Build the client
function buildClient() {
  logStep("4", "Building client application...");

  try {
    execSync("cd client && npm run build", { stdio: "inherit" });
    logSuccess("Client build completed");
  } catch (error) {
    logError("Client build failed");
    process.exit(1);
  }
}

// Verify build output
function verifyBuild() {
  logStep("5", "Verifying build output...");

  const buildDir = path.join("client", "build");
  const indexHtml = path.join(buildDir, "index.html");

  if (!fs.existsSync(buildDir)) {
    logError("Build directory not found");
    process.exit(1);
  }

  if (!fs.existsSync(indexHtml)) {
    logError("index.html not found in build directory");
    process.exit(1);
  }

  // Check build directory size
  const buildSize = getDirectorySize(buildDir);
  logInfo(`Build directory size: ${formatBytes(buildSize)}`);

  logSuccess("Build output verified");
}

// Check for environment variables
function checkEnvironment() {
  logStep("6", "Checking environment configuration...");

  const envFile = path.join("client", ".env.local");
  const envExample = path.join("client", "env.example");

  if (!fs.existsSync(envFile)) {
    if (fs.existsSync(envExample)) {
      logWarning(
        "No .env.local file found. Please create one based on env.example"
      );
      logInfo("Required environment variables:");
      logInfo("  REACT_APP_API_URL=https://your-backend-api.com");
    } else {
      logWarning("No environment configuration files found");
    }
  } else {
    logSuccess("Environment configuration found");
  }
}

// Generate deployment summary
function generateSummary() {
  logStep("7", "Generating deployment summary...");

  const summary = `
🎉 Netlify Deployment Ready!

📁 Build Directory: client/build
📋 Configuration: netlify.toml
🔄 Redirects: client/public/_redirects

🚀 Next Steps:
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Set build settings:
   - Base directory: client
   - Build command: npm run build
   - Publish directory: build
4. Set environment variables in Netlify dashboard
5. Deploy!

📚 For detailed instructions, see: NETLIFY-DEPLOYMENT.md
  `;

  log(summary, "green");
}

// Utility functions
function getDirectorySize(dirPath) {
  let totalSize = 0;

  if (fs.statSync(dirPath).isDirectory()) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    });
  }

  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Main execution
try {
  checkDirectory();
  installDependencies();
  buildClient();
  verifyBuild();
  checkEnvironment();
  generateSummary();

  log("\n🎊 Netlify deployment preparation completed successfully!", "green");
} catch (error) {
  logError("Deployment preparation failed");
  console.error(error);
  process.exit(1);
}


