# 🚀 Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a MongoDB Atlas cluster
3. **Gmail App Password**: Configure Gmail for sending emails

## 🔧 Environment Variables Setup

Set these environment variables in your Vercel project:

### Required Variables:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/prakash_enterprises
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

### How to Set Environment Variables:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with its value

## 📦 Deployment Steps

### 1. Connect to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### 2. Or Deploy via GitHub

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically deploy on push

## 🔍 Configuration Files

### vercel.json

- Routes API calls to server.js
- Serves React build for frontend
- Handles production environment

### package.json

- Build script: `npm run build`
- Start script: `node server.js`
- Dependencies for both frontend and backend

## 🌐 Production URLs

After deployment, your app will be available at:

- **Main Site**: `https://your-project-name.vercel.app`
- **Admin Dashboard**: `https://your-project-name.vercel.app/admin`

## 🔐 Security Notes

1. **MongoDB**: Use MongoDB Atlas with proper authentication
2. **Email**: Use Gmail App Password (not regular password)
3. **JWT**: Use a strong, unique secret key
4. **CORS**: Configured for production domains

## 🧪 Testing Deployment

1. **Contact Form**: Submit a test contact form
2. **Admin Login**: Login with dev account (prince844121@gmail.com / 1234okay)
3. **Email Notifications**: Verify emails are sent
4. **API Endpoints**: Test all API functionality

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures**: Check Node.js version compatibility
2. **API Errors**: Verify environment variables are set
3. **Email Issues**: Check Gmail App Password configuration
4. **Database Errors**: Verify MongoDB connection string

### Debug Commands:

```bash
# Check build logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls
```

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test locally with production environment variables
4. Contact support with specific error messages
