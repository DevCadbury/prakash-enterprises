const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up Prakash Enterprises Application...\n");

// Check if client directory exists
if (!fs.existsSync(path.join(__dirname, "client"))) {
  console.error("❌ Client directory not found!");
  process.exit(1);
}

// Check if client package.json exists
if (!fs.existsSync(path.join(__dirname, "client", "package.json"))) {
  console.error("❌ Client package.json not found!");
  process.exit(1);
}

try {
  console.log("📦 Installing root dependencies...");
  execSync("npm install", { stdio: "inherit" });
  console.log("✅ Root dependencies installed successfully!\n");

  console.log("📦 Installing client dependencies...");
  execSync("cd client && npm install", { stdio: "inherit" });
  console.log("✅ Client dependencies installed successfully!\n");

  console.log("🔧 Checking client package.json...");
  const clientPackage = JSON.parse(
    fs.readFileSync(path.join(__dirname, "client", "package.json"), "utf8")
  );

  if (clientPackage.dependencies["react-scripts"] === "^0.0.0") {
    console.log("⚠️  Detected invalid react-scripts version. Fixing...");
    clientPackage.dependencies["react-scripts"] = "5.0.1";
    fs.writeFileSync(
      path.join(__dirname, "client", "package.json"),
      JSON.stringify(clientPackage, null, 2)
    );
    console.log("✅ Fixed react-scripts version to 5.0.1");

    console.log("📦 Reinstalling client dependencies...");
    execSync("cd client && npm install", { stdio: "inherit" });
    console.log("✅ Client dependencies reinstalled successfully!\n");
  }

  console.log("🎯 Setup completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Run: npm run dev");
  console.log("2. Backend will start on: http://localhost:5000");
  console.log("3. Frontend will start on: http://localhost:3000");
  console.log("4. Check console for detailed logs");
  console.log("\n🔑 Default superuser credentials:");
  console.log("   Email: prince844121@gmail.com");
  console.log("   Password: 1234okay");
} catch (error) {
  console.error("❌ Setup failed:", error.message);
  process.exit(1);
}
