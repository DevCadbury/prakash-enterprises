const { spawn } = require("child_process");
const path = require("path");

console.log("🚀 Starting Prakash Enterprises Development Environment...");

// Check if required files exist
const fs = require("fs");
const requiredFiles = ["server.js", "client/package.json", "package.json"];

console.log("\n📋 Checking required files...");
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    process.exit(1);
  }
}

// Check if node_modules exist
console.log("\n📦 Checking dependencies...");
if (!fs.existsSync("node_modules")) {
  console.log("📦 Installing root dependencies...");
  const install = spawn("npm", ["install"], { stdio: "inherit" });
  install.on("close", (code) => {
    if (code !== 0) {
      console.error("❌ Failed to install root dependencies");
      process.exit(1);
    }
  });
}

if (!fs.existsSync("client/node_modules")) {
  console.log("📦 Installing client dependencies...");
  const installClient = spawn("npm", ["install"], {
    stdio: "inherit",
    cwd: path.join(__dirname, "client"),
  });
  installClient.on("close", (code) => {
    if (code !== 0) {
      console.error("❌ Failed to install client dependencies");
      process.exit(1);
    }
  });
}

console.log("\n🎯 Development Environment Ready!");
console.log("\n📋 To start development:");
console.log("1. Start server: npm run server");
console.log("2. Start client: npm run client");
console.log("3. Or use both: npm run dev");
console.log("\n🔗 URLs:");
console.log("- Frontend: http://localhost:3000");
console.log("- Backend: http://localhost:5000");
console.log("- Admin: http://localhost:3000/admin");
console.log("\n🧪 Test endpoints:");
console.log("- Health: http://localhost:5000/api/health");
console.log("- Test: http://localhost:5000/api/test");

console.log("\n💡 Troubleshooting:");
console.log("- If CORS errors: Check if server is running on port 5000");
console.log("- If MongoDB errors: Check your MONGODB_URI in .env");
console.log(
  "- If build errors: Run npm install in both root and client directories"
);
