#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log(
  "🚀 Starting Complete Vercel Deployment for Prakash Enterprises..."
);
console.log("📍 Target URL: https://prakash-enterprises.vercel.app/");
console.log("");

try {
  // Step 1: Check if Vercel CLI is installed
  console.log("📦 Checking Vercel CLI installation...");
  try {
    execSync("vercel --version", { stdio: "pipe" });
    console.log("✅ Vercel CLI is installed");
  } catch (error) {
    console.log("❌ Vercel CLI not found. Installing...");
    execSync("npm install -g vercel", { stdio: "inherit" });
    console.log("✅ Vercel CLI installed successfully");
  }

  // Step 2: Build the project
  console.log("\n🔨 Building project for production...");
  execSync("npm run vercel-build", { stdio: "inherit" });

  // Step 3: Check if build was successful
  const buildPath = path.join(__dirname, "client/build");
  if (!fs.existsSync(buildPath)) {
    throw new Error("Build failed - client/build directory not found");
  }

  const indexPath = path.join(buildPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error("Build failed - index.html not found");
  }

  console.log("✅ Build completed successfully!");

  // Step 4: Check environment variables
  console.log("\n🔍 Checking environment variables...");
  const requiredVars = [
    "MONGODB_URI",
    "JWT_SECRET",
    "EMAIL_USER",
    "EMAIL_PASS",
  ];

  const missingVars = [];
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.log("⚠️  Warning: Some environment variables are not set:");
    missingVars.forEach((varName) => console.log(`   - ${varName}`));
    console.log("\n💡 These should be set in your Vercel project settings");
    console.log("💡 The app will work but some features may not function");
  } else {
    console.log("✅ All required environment variables are set");
  }

  // Step 5: Deploy to Vercel
  console.log("\n🚀 Deploying to Vercel...");
  console.log(
    "💡 This will open a browser window for authentication if needed"
  );

  try {
    execSync("vercel --prod --yes", { stdio: "inherit" });
    console.log("\n🎉 Deployment completed successfully!");
  } catch (error) {
    console.log("\n⚠️  Vercel deployment failed. Trying alternative method...");
    console.log("💡 You may need to run 'vercel login' first");

    // Try to get current project info
    try {
      const projectInfo = execSync("vercel ls", { stdio: "pipe" }).toString();
      console.log("\n📋 Current Vercel projects:");
      console.log(projectInfo);
    } catch (e) {
      console.log("❌ Could not retrieve project information");
    }

    throw new Error("Vercel deployment failed. Please check the logs above.");
  }

  // Step 6: Success message
  console.log("\n🎯 Your application is now deployed!");
  console.log("🔗 Production URL: https://prakash-enterprises.vercel.app/");
  console.log("");
  console.log("📋 Next steps:");
  console.log("1. Visit your application URL");
  console.log("2. Test all functionality");
  console.log("3. Check Vercel dashboard for logs");
  console.log("4. Set up custom domain if needed");
  console.log("");
  console.log("✨ Deployment complete!");
} catch (error) {
  console.error("\n❌ Deployment failed:", error.message);
  console.log("\n🛠️  Troubleshooting:");
  console.log("1. Ensure you're logged into Vercel: vercel login");
  console.log("2. Check your environment variables");
  console.log("3. Verify MongoDB connection");
  console.log("4. Check the build logs above");
  console.log("\n💡 For help, refer to VERCEL-DEPLOYMENT-COMPLETE.md");
  process.exit(1);
}
