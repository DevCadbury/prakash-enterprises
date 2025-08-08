// Vercel Deployment Helper Script
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Vercel Deployment Helper");
console.log("===========================");
console.log("");

// Check if we're in the right directory
const packageJsonPath = path.join(__dirname, "package.json");
if (!fs.existsSync(packageJsonPath)) {
  console.error(
    "❌ Error: package.json not found. Make sure you're in the project root."
  );
  process.exit(1);
}

// Check if vercel.json exists
const vercelJsonPath = path.join(__dirname, "vercel.json");
if (!fs.existsSync(vercelJsonPath)) {
  console.error("❌ Error: vercel.json not found.");
  process.exit(1);
}

console.log("✅ Configuration files found");
console.log("");

// Check if build exists
const buildPath = path.join(__dirname, "client/build");
const indexPath = path.join(buildPath, "index.html");

if (!fs.existsSync(buildPath)) {
  console.log("📦 Building client...");
  try {
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ Build completed");
  } catch (error) {
    console.error("❌ Build failed:", error.message);
    process.exit(1);
  }
} else {
  console.log("✅ Build already exists");
}

console.log("");

// Check environment variables
console.log("🔧 Environment Variables Check:");
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.log("⚠️  Missing environment variables:");
  missingVars.forEach((varName) => {
    console.log(`   - ${varName}`);
  });
  console.log("");
  console.log("💡 Make sure to set these in your Vercel dashboard:");
  console.log("   1. Go to your project settings");
  console.log('   2. Navigate to "Environment Variables"');
  console.log("   3. Add the missing variables");
} else {
  console.log("✅ All required environment variables are set");
}

console.log("");

// Deployment instructions
console.log("📋 Deployment Steps:");
console.log("1. Commit your changes:");
console.log("   git add .");
console.log('   git commit -m "Fix deployment configuration"');
console.log("   git push");
console.log("");
console.log("2. Deploy to Vercel:");
console.log("   vercel --prod");
console.log("");
console.log("3. Set environment variables in Vercel dashboard:");
console.log("   - MONGODB_URI");
console.log("   - JWT_SECRET");
console.log("   - NODE_ENV=production");
console.log("");
console.log("4. Test after deployment:");
console.log("   npm run test-production");
console.log("");

console.log("🎯 Ready for deployment!");
console.log("The 404 error should be resolved with these configurations.");
