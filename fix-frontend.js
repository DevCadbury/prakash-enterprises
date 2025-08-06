const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔧 Frontend Troubleshooting and Fix Script\n");

// Check if we're in the right directory
if (!fs.existsSync("client")) {
  console.error(
    "❌ Client directory not found. Please run this from the project root."
  );
  process.exit(1);
}

// Function to run commands with better error handling
function runCommand(command, description) {
  try {
    console.log(`📋 ${description}...`);
    execSync(command, { stdio: "inherit", cwd: process.cwd() });
    console.log(`✅ ${description} completed successfully`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return false;
  }
}

// Function to check if port is in use
function checkPort(port) {
  try {
    const result = execSync(`netstat -an | findstr :${port}`, {
      encoding: "utf8",
    });
    return result.includes(`:${port}`);
  } catch (error) {
    return false;
  }
}

async function fixFrontend() {
  console.log("🚀 Starting frontend fix process...\n");

  // Step 1: Check if port 3000 is already in use
  console.log("🔍 Checking if port 3000 is available...");
  if (checkPort(3000)) {
    console.log(
      "⚠️  Port 3000 is already in use. This might be causing issues."
    );
    console.log("💡 Try closing any other React apps or change the port.\n");
  } else {
    console.log("✅ Port 3000 is available\n");
  }

  // Step 2: Clean install client dependencies
  console.log("🧹 Cleaning client dependencies...");
  if (fs.existsSync("client/node_modules")) {
    try {
      execSync("rmdir /s /q client\\node_modules", { stdio: "inherit" });
      console.log("✅ Removed old node_modules");
    } catch (error) {
      console.log("⚠️  Could not remove node_modules (might be in use)");
    }
  }

  if (fs.existsSync("client/package-lock.json")) {
    try {
      fs.unlinkSync("client/package-lock.json");
      console.log("✅ Removed package-lock.json");
    } catch (error) {
      console.log("⚠️  Could not remove package-lock.json");
    }
  }

  // Step 3: Install client dependencies
  console.log("\n📦 Installing client dependencies...");
  if (
    !runCommand("cd client && npm install", "Installing client dependencies")
  ) {
    console.error("❌ Failed to install client dependencies");
    return false;
  }

  // Step 4: Verify react-scripts is properly installed
  console.log("\n🔍 Verifying react-scripts installation...");
  try {
    const clientPackage = JSON.parse(
      fs.readFileSync("client/package.json", "utf8")
    );
    if (clientPackage.dependencies["react-scripts"] !== "5.0.1") {
      console.log("⚠️  Fixing react-scripts version...");
      clientPackage.dependencies["react-scripts"] = "5.0.1";
      fs.writeFileSync(
        "client/package.json",
        JSON.stringify(clientPackage, null, 2)
      );
      runCommand(
        "cd client && npm install",
        "Reinstalling with correct react-scripts"
      );
    }
  } catch (error) {
    console.error("❌ Error reading package.json:", error.message);
  }

  // Step 5: Test if react-scripts is accessible
  console.log("\n🧪 Testing react-scripts...");
  try {
    execSync("cd client && npx react-scripts --version", { stdio: "pipe" });
    console.log("✅ react-scripts is working correctly");
  } catch (error) {
    console.error("❌ react-scripts is not working. Trying to fix...");
    runCommand(
      "cd client && npm install react-scripts@5.0.1",
      "Installing react-scripts specifically"
    );
  }

  // Step 6: Create a test script to start the frontend
  console.log("\n🎯 Creating test startup script...");
  const testScript = `
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting React development server...');
console.log('📁 Working directory:', process.cwd());
console.log('📦 Client directory:', path.join(process.cwd(), 'client'));

const child = spawn('npm', ['start'], {
  cwd: path.join(process.cwd(), 'client'),
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Failed to start React app:', error.message);
});

child.on('exit', (code) => {
  console.log('React app exited with code:', code);
});
`;

  fs.writeFileSync("test-frontend.js", testScript);
  console.log("✅ Created test-frontend.js script");

  console.log("\n🎉 Frontend fix process completed!");
  console.log("\n📋 Next steps:");
  console.log("1. Try running: npm run dev");
  console.log("2. If that fails, try: node test-frontend.js");
  console.log("3. If still failing, try: cd client && npm start");
  console.log("\n🔍 Common issues and solutions:");
  console.log("- If port 3000 is busy: Close other React apps");
  console.log("- If react-scripts not found: Run cd client && npm install");
  console.log("- If build fails: Check for syntax errors in src/");
  console.log("- If still not working: Try restarting your terminal");

  return true;
}

// Run the fix
fixFrontend().then((success) => {
  if (success) {
    console.log("\n✅ Frontend fix completed successfully!");
  } else {
    console.log(
      "\n❌ Frontend fix encountered issues. Please check the errors above."
    );
  }
});
