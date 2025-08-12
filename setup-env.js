const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up environment variables...\n");

// Environment variables to set
const envVars = {
  EMAIL_USER: "prakashenterprise192@gmail.com",
  EMAIL_PASS: "jhvr aewe gkkr awjk",
  COMPANY_EMAIL: "prakashenterprise051@gmail.com",
  MONGODB_URI:
    "mongodb+srv://prince844121:.Chaman1@cluster0.4u9ol3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  JWT_SECRET:
    "95a003a8cf344d055ea1db72c7283d2098b5b62554d14aba7db22a41bc72653225aefa119847892217feb0ce0518dc1487d1960155718f816a63b356f7f2ba6e",
  PORT: "5000",
  NODE_ENV: "production",
};

// Create .env file content
const envContent = Object.entries(envVars)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

// Check if .env file exists
const envPath = path.join(__dirname, ".env");
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log("⚠️  .env file already exists!");
  console.log("📝 Current .env content:");
  console.log("---");
  console.log(fs.readFileSync(envPath, "utf8"));
  console.log("---");

  console.log(
    "\n💡 To update with new values, delete the existing .env file and run this script again."
  );
} else {
  try {
    // Create .env file
    fs.writeFileSync(envPath, envContent);
    console.log("✅ .env file created successfully!");
    console.log("📁 Location:", envPath);
    console.log("\n📋 Environment variables set:");

    Object.entries(envVars).forEach(([key, value]) => {
      if (key === "JWT_SECRET") {
        console.log(`   ${key}: ${value.substring(0, 20)}...`);
      } else if (key === "MONGODB_URI") {
        console.log(
          `   ${key}: mongodb+srv://prince844121:***@cluster0.4u9ol3q.mongodb.net/...`
        );
      } else {
        console.log(`   ${key}: ${value}`);
      }
    });

    console.log("\n🎯 Next steps:");
    console.log("   1. Test MongoDB connection: npm run test-mongodb");
    console.log("   2. Test CORS: npm run test-cors");
    console.log("   3. Start development server: npm run dev");
  } catch (error) {
    console.error("❌ Error creating .env file:", error.message);
    console.log("\n💡 Please create the .env file manually with these values:");
    console.log("---");
    console.log(envContent);
    console.log("---");
  }
}

console.log("\n🔧 Environment setup complete!");
console.log("📚 See SETUP-ENV-FIXES.md for detailed instructions.");
