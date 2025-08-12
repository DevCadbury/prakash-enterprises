# Complete Vercel Deployment Guide for Prakash Enterprises

## 🚀 Overview

This guide will help you deploy your full-stack application (backend + frontend) to Vercel at `https://prakash-enterprises.vercel.app/`.

## 📋 Prerequisites

1. Vercel account (free at [vercel.com](https://vercel.com))
2. MongoDB database (MongoDB Atlas recommended)
3. Gmail account for email functionality
4. Git repository with your code

## 🔧 Step 1: Environment Variables Setup

### Required Environment Variables

Set these in your Vercel project settings:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# JWT Secret (generate a random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_SERVICE=gmail

# Production Settings
NODE_ENV=production
PORT=3000

# Optional: Custom Domain
CUSTOM_DOMAIN=https://prakash-enterprises.vercel.app
```

### How to Set Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add each variable above

## 🚀 Step 2: Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm install`
5. Click "Deploy"

## 🔨 Step 3: Build Configuration

The project is already configured with:

- `vercel.json` - Vercel configuration
- `vercel-build.js` - Build script
- `.vercelignore` - Files to exclude

## 📁 Project Structure for Vercel

```
landing/
├── server.js              # Main backend server
├── vercel.json            # Vercel configuration
├── vercel-build.js        # Build script
├── .vercelignore          # Ignore file
├── package.json           # Root dependencies
└── client/                # React frontend
    ├── package.json       # Frontend dependencies
    ├── src/               # Source code
    └── build/             # Built files (generated)
```

## 🔍 Step 4: Verify Deployment

### Check Backend API

```bash
# Health check
curl https://prakash-enterprises.vercel.app/api/health

# Should return: {"success":true,"message":"Server is running"}
```

### Check Frontend

- Visit: `https://prakash-enterprises.vercel.app/`
- Should load the React app without errors

## 🛠️ Troubleshooting

### Common Issues:

#### 1. Build Failures

```bash
# Test build locally first
npm run vercel-build
```

#### 2. MongoDB Connection Issues

- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas network access
- Ensure database user has proper permissions

#### 3. Email Not Working

- Verify Gmail app password is correct
- Check `EMAIL_USER` and `EMAIL_PASS` variables
- Ensure 2FA is enabled on Gmail

#### 4. 404 Errors

- Ensure `vercel.json` routes are correct
- Check that `vercel-build.js` completed successfully
- Verify `client/build` directory exists

### Debug Commands:

```bash
# Check build status
npm run vercel-build

# Test server locally
npm run start

# Check environment variables
node -e "console.log(process.env.NODE_ENV)"
```

## 🔄 Step 5: Continuous Deployment

### Automatic Deployments:

- Push to `main` branch = automatic production deployment
- Push to other branches = preview deployments

### Manual Deployments:

```bash
# Deploy latest changes
vercel --prod

# Preview deployment
vercel
```

## 📊 Monitoring & Analytics

### Vercel Analytics:

- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Custom Monitoring:

- Check Vercel function logs
- Monitor API response times
- Track database connections

## 🔒 Security Features

### Enabled by Default:

- HTTPS only
- CORS protection
- Rate limiting
- Helmet security headers
- JWT authentication

### Additional Security:

- Environment variable protection
- API key management
- Request validation

## 💰 Cost Optimization

### Free Tier Limits:

- 100GB bandwidth/month
- 100 serverless function executions/day
- 100GB storage

### Optimization Tips:

- Use static generation where possible
- Optimize images
- Minimize bundle size
- Cache static assets

## 📞 Support

### Vercel Support:

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Project-Specific Issues:

- Check the logs in Vercel dashboard
- Review environment variables
- Test locally with `npm run vercel-build`

## 🎯 Success Checklist

- [ ] Environment variables set in Vercel
- [ ] MongoDB connection working
- [ ] Email functionality working
- [ ] Frontend loads without errors
- [ ] API endpoints responding
- [ ] Admin dashboard accessible
- [ ] Contact forms working
- [ ] Visitor tracking functional

## 🚀 Final Deployment Command

```bash
# Complete deployment
npm run vercel-build && vercel --prod
```

Your application will be available at: `https://prakash-enterprises.vercel.app/`

---

**Note**: This deployment includes both backend and frontend in a single Vercel project, making it easier to manage and deploy together.
