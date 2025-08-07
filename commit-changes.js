const { execSync } = require("child_process");

console.log("🚀 Committing Prakash Enterprises to GitHub...");

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
  const commitMessage = `🚀 Complete Prakash Enterprises Application

✨ Features Added:
- Modern React landing page with animations
- Complete admin dashboard with role-based access
- Contact form with WhatsApp integration
- Loan & insurance application systems
- Real-time visitor analytics
- Email notification system
- Promotion management
- Admin activity logging
- Custom dialog components
- Responsive design for all devices

🔧 Technical Improvements:
- Production-ready API configuration
- Vercel deployment setup
- Comprehensive error handling
- Security middleware implementation
- Environment-based configuration
- CORS properly configured
- File system error handling
- Enhanced user experience
- Fixed linting errors and unused imports

📋 Admin Features:
- Secure JWT authentication
- User management with RBAC
- Contact management & replies
- Analytics dashboard
- Email campaign management
- Notification settings
- Activity audit trail
- Data export capabilities

🎯 Ready for Production:
- All APIs tested and working
- Vercel deployment configured
- Environment variables documented
- Build process optimized
- Documentation complete

👤 Admin Access:
- Email: prince844121@gmail.com
- Password: 1234okay
- Role: dev (full access)

🔗 URLs:
- Development: http://localhost:3000
- Production: https://prakash-enterprises.vercel.app
- Admin: /admin

✅ Deployment Ready!`;

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
  console.log("1. Deploy to Vercel: npm run deploy");
  console.log("2. Set environment variables in Vercel dashboard");
  console.log("3. Test the deployed application");
  console.log("");
  console.log("🔗 Vercel Deployment:");
  console.log("- Install Vercel CLI: npm install -g vercel");
  console.log("- Login: vercel login");
  console.log("- Deploy: vercel --prod");
} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}
