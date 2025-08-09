# Vercel Deployment Guide

## 🚀 Quick Start

1. **Install Vercel CLI** (if not already installed):

   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:

   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel --prod
   ```

## 📋 Pre-Deployment Checklist

### ✅ Required Files

- [ ] `vercel.json` - Vercel configuration
- [ ] `package.json` - Root package with vercel-build script
- [ ] `server.js` - Main server file
- [ ] `client/package.json` - Client package
- [ ] `vercel-build.js` - Build script

### ✅ Environment Variables

Set these in your Vercel project settings:

**Required:**

- `NODE_ENV=production`
- `MONGODB_URI=your_mongodb_connection_string`
- `JWT_SECRET=your_jwt_secret`

**Optional:**

- `EMAIL_USER=your_email@gmail.com`
- `EMAIL_PASS=your_app_password`
- `EMAIL_SERVICE=gmail`
- `CUSTOM_DOMAIN=https://yourdomain.com`

## 🔧 Build Process

The deployment uses the `vercel-build` script which:

1. Installs root dependencies
2. Installs client dependencies
3. Builds the React client
4. Verifies the build output
5. Reports build status

## 🛣️ Routing Configuration

### API Routes

- `/api/*` → `server.js` (Node.js function)

### Static Files

- `/*.(js|css|png|jpg|...)` → `client/build/*` (static assets)

### SPA Routes

- `/*` → `client/build/index.html` (React app)

## 🚨 Common Issues & Solutions

### 404 Errors

**Problem**: Getting 404 errors on routes
**Solution**:

1. Ensure `vercel-build` script runs successfully
2. Check that `client/build` directory exists
3. Verify `vercel.json` routing configuration

**Problem**: Static assets not loading
**Solution**:

1. Check file paths in `vercel.json`
2. Ensure build includes all static files
3. Verify MIME type headers

### Build Failures

**Problem**: Build script fails
**Solution**:

1. Check Node.js version compatibility
2. Verify all dependencies are in `package.json`
3. Check for syntax errors in source code

**Problem**: Client build fails
**Solution**:

1. Check `client/package.json` dependencies
2. Verify React scripts are working
3. Check for TypeScript/JSX errors

## 🔍 Debugging

### Check Build Output

```bash
npm run vercel-build
```

### Test Locally

```bash
npm run build:prod
npm run start:prod
```

### Vercel Logs

```bash
vercel logs
```

## 📁 File Structure for Vercel

```
landing/
├── vercel.json              # Vercel configuration
├── package.json             # Root package with scripts
├── server.js               # Main server (Node.js function)
├── vercel-build.js         # Build script
├── models/                 # Database models
├── middleware/             # Auth middleware
├── utils/                  # Utility functions
└── client/
    ├── package.json        # Client package
    └── build/              # Built React app (generated)
```

## 🎯 Production Features

- **Static File Caching**: 1 year cache for production assets
- **Security Headers**: Helmet.js protection
- **Rate Limiting**: API request throttling
- **CORS**: Production domain whitelisting
- **Error Handling**: Comprehensive error responses
- **Logging**: Detailed deployment logging

## 🔒 Security

- JWT authentication for admin routes
- Rate limiting on API endpoints
- CORS protection for production domains
- Security headers via Helmet.js
- Input validation on all endpoints

## 📊 Monitoring

- Health check endpoint: `/api/health`
- Build verification in deployment
- Error logging with timestamps
- Environment detection
- Vercel-specific optimizations

## 🚀 Deployment Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove
```

## 📞 Support

If you encounter issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test build locally with `npm run vercel-build`
4. Check `vercel.json` configuration
5. Ensure all required files are present

## 🎉 Success Indicators

- ✅ Build completes without errors
- ✅ All routes accessible (no 404s)
- ✅ Static assets load correctly
- ✅ API endpoints respond
- ✅ React app renders properly
- ✅ Environment variables loaded
- ✅ MongoDB connection established (if configured)
