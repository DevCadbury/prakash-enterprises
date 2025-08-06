const fs = require("fs");
const path = require("path");

console.log("🔧 Setting up development environment...");

// Check if .env exists
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  console.log("✅ .env file already exists");
} else {
  console.log("📝 Creating .env file for development...");

  const envContent = `NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prakash-enterprises
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password`;

  try {
    fs.writeFileSync(envPath, envContent);
    console.log("✅ .env file created successfully");
  } catch (error) {
    console.error("❌ Failed to create .env file:", error.message);
  }
}

console.log("\n📋 Development Environment Setup Complete!");
console.log("\n💡 Next steps:");
console.log("1. Edit .env file with your actual values");
console.log("2. Start the server: npm run server");
console.log("3. Start the client: npm run client");
console.log("4. Or use: npm run dev (starts both)");
console.log("\n🔗 URLs:");
console.log("- Frontend: http://localhost:3000");
console.log("- Backend: http://localhost:5000");
console.log("- Admin: http://localhost:3000/admin");
