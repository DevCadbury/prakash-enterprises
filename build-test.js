const { execSync } = require("child_process");
const fs = require("fs");

console.log("🔨 Testing Prakash Enterprises Build...");

try {
  // Check if we're in the right directory
  if (!fs.existsSync("client/package.json")) {
    console.error(
      "❌ Error: client/package.json not found. Please run this from the project root."
    );
    process.exit(1);
  }

  console.log("🔨 Building the application...");
  execSync("cd client && npm run build", { stdio: "inherit" });

  console.log("✅ Build completed successfully!");
  console.log("📁 Build files created in client/build/");

  // Check if build files exist
  if (fs.existsSync("client/build/index.html")) {
    console.log("✅ index.html found");
  } else {
    console.error("❌ index.html not found in build directory");
    process.exit(1);
  }

  if (fs.existsSync("client/build/static")) {
    console.log("✅ static files found");
  } else {
    console.error("❌ static files not found in build directory");
    process.exit(1);
  }

  console.log("\n🎉 Build test passed!");
  console.log("✅ Application is ready for deployment");
  console.log("\n📋 Next Steps:");
  console.log("1. Run: node commit-changes.js");
  console.log("2. Deploy to Vercel");
  console.log("3. Test the live application");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  console.log("\n🔧 Common fixes:");
  console.log("- Make sure all dependencies are installed: npm install");
  console.log("- Check for any remaining linting errors");
  console.log("- Ensure all imports are correct");
  process.exit(1);
}
