const fs = require("fs");
const path = require("path");

console.log("🔧 Fixing CORS Configuration...");

// Check if server.js exists
if (!fs.existsSync("server.js")) {
  console.log("❌ server.js not found!");
  process.exit(1);
}

// Read server.js content
let serverContent = fs.readFileSync("server.js", "utf8");

// Check if CORS is properly configured
if (!serverContent.includes("cors")) {
  console.log("❌ CORS not found in server.js");
  process.exit(1);
}

console.log("✅ CORS configuration found in server.js");

// Check if the server is running
const http = require("http");

function checkServer() {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: "localhost",
        port: 5000,
        path: "/api/health",
        method: "GET",
        timeout: 5000,
      },
      (res) => {
        console.log(
          `✅ Server is running on port 5000 (Status: ${res.statusCode})`
        );
        resolve(true);
      }
    );

    req.on("error", (err) => {
      console.log(`❌ Server is not running on port 5000: ${err.message}`);
      console.log("\n💡 To start the server:");
      console.log("1. Open a new terminal");
      console.log("2. Run: npm run server");
      console.log("3. Or run: npm run dev (for both server and client)");
      resolve(false);
    });

    req.on("timeout", () => {
      console.log("⏰ Server check timed out");
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  console.log("\n🔍 Checking server status...");
  const serverRunning = await checkServer();

  if (!serverRunning) {
    console.log("\n📋 Next steps:");
    console.log("1. Start the server: npm run server");
    console.log("2. In another terminal, start the client: npm run client");
    console.log("3. Or use: npm run dev (starts both)");
    console.log("\n🔗 Once running, visit:");
    console.log("- Frontend: http://localhost:3000");
    console.log("- Admin: http://localhost:3000/admin");
    console.log("- Health check: http://localhost:5000/api/health");
  } else {
    console.log("\n🎯 Server is running! Try accessing:");
    console.log("- Admin dashboard: http://localhost:3000/admin");
    console.log("- Health endpoint: http://localhost:5000/api/health");
  }
}

main();
