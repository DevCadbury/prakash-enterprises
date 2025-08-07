@echo off
echo 🚀 Committing Prakash Enterprises to GitHub...

REM Check if git is initialized
git status >nul 2>&1
if errorlevel 1 (
    echo 📦 Initializing git repository...
    git init
)

REM Add all files
echo 📁 Adding all files to git...
git add .

REM Check if there are changes to commit
git diff --cached --quiet
if errorlevel 1 (
    echo ℹ️ No changes to commit
    exit /b 0
)

REM Create commit message
set COMMIT_MESSAGE=🚀 Complete Prakash Enterprises Application

echo 💾 Committing changes...
git commit -m "%COMMIT_MESSAGE%"

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo 🔗 Adding GitHub remote...
    git remote add origin https://github.com/DevCadbury/Prakash-enterprises.git
)

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push -u origin main

echo ✅ Successfully committed to GitHub!
echo 🌐 Repository: https://github.com/DevCadbury/Prakash-enterprises
echo.
echo 📋 Next Steps:
echo 1. Deploy to Vercel: npm run deploy
echo 2. Set environment variables in Vercel dashboard
echo 3. Test the deployed application
echo.
echo 🔗 Vercel Deployment:
echo - Install Vercel CLI: npm install -g vercel
echo - Login: vercel login
echo - Deploy: vercel --prod

pause 