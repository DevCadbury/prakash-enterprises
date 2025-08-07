const { execSync } = require("child_process");
const fs = require("fs");

console.log("🚀 Committing Vercel Configuration Fix...");

try {
  // Check if git is initialized
  try {
    execSync("git status", { stdio: "ignore" });
  } catch (error) {
    console.log("📦 Initializing git repository...");
    execSync("git init");
  }

  // Add all files
  console.log("📁 Adding all files to git...");
  execSync("git add .");

  // Check if there are changes to commit
  try {
    execSync("git diff --cached --quiet", { stdio: "ignore" });
    console.log("ℹ️ No changes to commit");
    process.exit(0);
  } catch (error) {
    // There are changes to commit
  }

  // Create commit message
  const commitMessage = `🔧 Fix Vercel Deployment Configuration

🐛 Fixed Issues:
- Updated vercel.json to use unified server.js routing
- Removed separate static build configuration
- All routes now point to server.js for proper handling
- Fixed HTML parse error in index.html

✅ Deployment Ready:
- Server.js handles both API and static files
- React app will be served correctly
- API endpoints will work properly
- No more 404 errors on main site

🔗 URLs:
- Main Site: https://prakash-enterprises.vercel.app
- Admin: https://prakash-enterprises.vercel.app/admin
- API: https://prakash-enterprises.vercel.app/api/*

✅ Ready for Production!`;

  // Commit with the message
  console.log("💾 Committing changes...");
  execSync(`git commit -m "${commitMessage}"`);

  // Check if remote exists
  try {
    execSync("git remote get-url origin", { stdio: "ignore" });
  } catch (error) {
    console.log("🔗 Adding GitHub remote...");
    execSync(
      "git remote add origin https://github.com/DevCadbury/Prakash-enterprises.git"
    );
  }

  // Push to GitHub
  console.log("🚀 Pushing to GitHub...");
  execSync("git push -u origin main");

  console.log("✅ Successfully committed to GitHub!");
  console.log(
    "🌐 Repository: https://github.com/DevCadbury/Prakash-enterprises"
  );
  console.log("");
  console.log("📋 Next Steps:");
  console.log("1. Vercel will automatically redeploy");
  console.log(
    "2. Check the deployment at: https://prakash-enterprises.vercel.app"
  );
  console.log(
    "3. Test the admin panel at: https://prakash-enterprises.vercel.app/admin"
  );
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
