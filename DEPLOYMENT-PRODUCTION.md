# Production Deployment Guide

## Overview

This project is configured to run both frontend and backend as a single unified application, with the frontend as the default route.

## Current Configuration

### ✅ What's Working

- **Unified Hosting**: Both frontend and backend run on the same port (5000)
- **Frontend Default**: All non-API routes serve the React app
- **API Routes**: All `/api/*` routes are handled by the Express server
- **Static Files**: React build files are served from `/client/build`
- **Production Ready**: Server automatically detects environment and serves accordingly

### 🔧 Configuration Files

- `vercel.json` - Vercel deployment configuration
- `server.js` - Unified Express server with frontend serving
- `client/src/config/api.js` - Dynamic API base URL detection

## Deployment Steps

### 1. Build the Application

```bash
npm run build
```

### 2. Test Production Locally

```bash
npm run start:prod
```

### 3. Deploy to Vercel

```bash
vercel --prod
```

## Environment Variables

### Development (.env)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/prakash-enterprises
JWT_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
EMAIL_SERVICE=gmail
```

### Production (Vercel Dashboard)

```
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-secret-key
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
EMAIL_SERVICE=gmail
```

## API Configuration

### Development

- Base URL: `http://localhost:5000`
- Frontend: `http://localhost:3000` (via proxy)

### Production

- Base URL: `https://your-domain.vercel.app`
- Frontend: `https://your-domain.vercel.app`
- Backend: `https://your-domain.vercel.app/api/*`

## Routes Structure

```
/                    → React App (Frontend)
/api/*              → Express API (Backend)
/static/*           → React Build Assets
/*                  → React App (Frontend - SPA routing)
```

## Testing Production Build

1. **Build the client**:

   ```bash
   cd client && npm run build
   ```

2. **Start production server**:

   ```bash
   npm run start:prod
   ```

3. **Test endpoints**:
   - Frontend: `http://localhost:5000/`
   - API Health: `http://localhost:5000/api/health`
   - Admin Login: `http://localhost:5000/api/admin/login`

## Troubleshooting

### Common Issues

1. **Port already in use**: Kill existing processes with `taskkill //PID <PID> //F`
2. **Build not found**: Ensure `npm run build` completed successfully
3. **MongoDB connection**: Check if MongoDB is running locally for development

### Logs

- Server logs show environment and MongoDB connection status
- Frontend logs appear in browser console
- API requests are logged with origin information

## Security Features

- **CORS**: Configured for both development and production
- **Rate Limiting**: 1000 requests per minute per IP
- **Helmet**: Security headers enabled
- **JWT Authentication**: Secure admin access
- **Input Validation**: Express-validator middleware

## Performance

- **Static File Serving**: Optimized React build files
- **Gzip Compression**: Enabled for production builds
- **Caching**: Static assets cached appropriately
- **MongoDB Indexes**: Optimized database queries
