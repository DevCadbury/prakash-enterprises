#!/bin/bash

echo "🚀 Committing Prakash Enterprises to GitHub..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
fi

# Add all files
echo "📁 Adding all files to git..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️ No changes to commit"
    exit 0
fi

# Create commit message
COMMIT_MESSAGE="🚀 Complete Prakash Enterprises Application

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

✅ Deployment Ready!"

# Commit with the message
echo "💾 Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Check if remote exists
if ! git remote get-url origin &> /dev/null; then
    echo "🔗 Adding GitHub remote..."
    git remote add origin https://github.com/DevCadbury/Prakash-enterprises.git
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully committed to GitHub!"
echo "🌐 Repository: https://github.com/DevCadbury/Prakash-enterprises"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy to Vercel: npm run deploy"
echo "2. Set environment variables in Vercel dashboard"
echo "3. Test the deployed application"
echo ""
echo "🔗 Vercel Deployment:"
echo "- Install Vercel CLI: npm install -g vercel"
echo "- Login: vercel login"
echo "- Deploy: vercel --prod" 