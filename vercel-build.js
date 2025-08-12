const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting Vercel build process...");

try {
  // Step 1: Install root dependencies (skip if already installed)
  console.log("📦 Checking root dependencies...");
  if (!fs.existsSync("node_modules")) {
    console.log("📦 Installing root dependencies...");
    execSync("npm install", { stdio: "inherit" });
  } else {
    console.log("✅ Root dependencies already installed");
  }

  // Step 2: Install client dependencies (skip if already installed)
  console.log("📦 Checking client dependencies...");
  if (!fs.existsSync("client/node_modules")) {
    console.log("📦 Installing client dependencies...");
    execSync("cd client && npm install", { stdio: "inherit" });
  } else {
    console.log("✅ Client dependencies already installed");
  }

  // Step 3: Build the client for production
  console.log("🔨 Building client for production...");
  execSync("cd client && npm run build", { stdio: "inherit" });

  // Step 4: Verify the build
  const buildPath = path.join(__dirname, "client/build");
  if (!fs.existsSync(buildPath)) {
    throw new Error("❌ Build failed - build directory not found");
  }

  const indexPath = path.join(buildPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    throw new Error("❌ Build failed - index.html not found");
  }

  // Step 5: Check build contents
  const buildFiles = fs.readdirSync(buildPath);
  console.log("✅ Build completed successfully!");
  console.log(`📁 Build directory: ${buildPath}`);
  console.log(`📄 Build files: ${buildFiles.length} files`);
  console.log(`📊 Build size: ${getDirectorySize(buildPath)}`);

  // Step 6: Verify critical files
  const criticalFiles = ["index.html", "static"];
  for (const file of criticalFiles) {
    const filePath = path.join(buildPath, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Warning: Critical file/directory not found: ${file}`);
    } else {
      console.log(`✅ Found: ${file}`);
    }
  }

  // Step 7: Create .vercelignore if it doesn't exist
  const vercelIgnorePath = path.join(__dirname, ".vercelignore");
  if (!fs.existsSync(vercelIgnorePath)) {
    const ignoreContent = `# Development files
node_modules/
.env
.env.local
.env.development
.env.test
.env.production

# Build artifacts
client/build/
build/

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Git
.git/
.gitignore

# Temporary files
*.tmp
*.temp
`;
    fs.writeFileSync(vercelIgnorePath, ignoreContent);
    console.log("✅ Created .vercelignore file");
  }

  console.log("🎉 Vercel build completed successfully!");
  process.exit(0);
} catch (error) {
  console.error("❌ Vercel build failed:", error.message);
  process.exit(1);
}

// Helper function to get directory size
function getDirectorySize(dirPath) {
  try {
    let totalSize = 0;
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    }

    return (totalSize / 1024 / 1024).toFixed(2) + " MB";
  } catch (error) {
    return "Unknown";
  }
}
