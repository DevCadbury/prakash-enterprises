@echo off
echo Starting Netlify deployment preparation...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed or not in PATH
    echo Please install npm or reinstall Node.js
    pause
    exit /b 1
)

echo Node.js and npm are available
echo.

REM Run the deployment script
echo Running deployment script...
node deploy-netlify.js

echo.
echo Deployment preparation completed!
echo.
echo Next steps:
echo 1. Push your code to GitHub/GitLab/Bitbucket
echo 2. Connect your repository to Netlify
echo 3. Set environment variables in Netlify dashboard
echo 4. Deploy!
echo.
echo For detailed instructions, see NETLIFY-DEPLOYMENT.md
echo.
pause


