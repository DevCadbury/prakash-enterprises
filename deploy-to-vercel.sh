#!/bin/bash

echo "🚀 Deploying Prakash Enterprises to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at the URL shown above"
echo "📋 Don't forget to set environment variables in Vercel dashboard:"
echo "   - NODE_ENV=production"
echo "   - MONGODB_URI=your-mongodb-connection-string"
echo "   - JWT_SECRET=your-secret-key"
echo "   - EMAIL_USER=your-email@gmail.com"
echo "   - EMAIL_PASS=your-app-password" 