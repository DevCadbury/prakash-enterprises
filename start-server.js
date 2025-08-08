const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting Prakash Enterprises Server...\n");

// Check if .env file exists
if (!fs.existsSync(".env")) {
  console.log("⚠️  .env file not found. Creating a basic one...");
  const envContent = `NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/prakash-enterprises
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-secret-key
PORT=5000
`;
  fs.writeFileSync(".env", envContent);
  console.log(
    "✅ Created .env file. Please update it with your actual credentials.\n"
  );
}

// Check if node_modules exists
if (!fs.existsSync("node_modules")) {
  console.log("📦 Installing dependencies...");
  const install = spawn("npm", ["install"], { stdio: "inherit" });

  install.on("close", (code) => {
    if (code === 0) {
      console.log("✅ Dependencies installed successfully!\n");
      startServer();
    } else {
      console.log("❌ Failed to install dependencies");
      process.exit(1);
    }
  });
} else {
  startServer();
}

function startServer() {
  console.log("🔧 Starting server with nodemon...");
  console.log("📡 Server will be available at: http://localhost:5000");
  console.log("🌐 Frontend should be at: http://localhost:3000");
  console.log("🔍 Health check: http://localhost:5000/api/health\n");

  const server = spawn("npm", ["run", "server"], { stdio: "inherit" });

  server.on("error", (error) => {
    console.error("❌ Failed to start server:", error.message);
    console.log("\n💡 Troubleshooting tips:");
    console.log("1. Make sure MongoDB is running");
    console.log("2. Check if port 5000 is available");
    console.log("3. Verify your .env file has correct credentials");
    console.log("4. Try running: npm install && npm run server");
  });

  server.on("close", (code) => {
    console.log(`\n🛑 Server stopped with code ${code}`);
  });

  // Handle process termination
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down server...");
    server.kill("SIGINT");
    process.exit(0);
  });
}
