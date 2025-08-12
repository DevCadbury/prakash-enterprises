#!/bin/bash

echo "🚀 Starting Netlify deployment preparation..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed or not in PATH"
    echo "Please install npm or reinstall Node.js"
    exit 1
fi

echo "✅ Node.js and npm are available"
echo

# Make the deployment script executable
chmod +x deploy-netlify.js

# Run the deployment script
echo "Running deployment script..."
node deploy-netlify.js

echo
echo "🎉 Deployment preparation completed!"
echo
echo "Next steps:"
echo "1. Push your code to GitHub/GitLab/Bitbucket"
echo "2. Connect your repository to Netlify"
echo "3. Set environment variables in Netlify dashboard"
echo "4. Deploy!"
echo
echo "For detailed instructions, see NETLIFY-DEPLOYMENT.md"
echo


