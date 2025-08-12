# Netlify Deployment Guide

This guide will help you deploy your PRAKASH ENTERPRISES landing page to Netlify.

## Prerequisites

1. A GitHub/GitLab/Bitbucket account with your project repository
2. A Netlify account (free tier available)
3. Your backend API deployed and accessible

## Step 1: Prepare Your Repository

### 1.1 Update Environment Variables

Create a `.env.local` file in the `client` directory for local development:

```bash
cd client
cp env.example .env.local
```

Edit `.env.local` and set your backend API URL:

```env
REACT_APP_API_URL=https://your-backend-api.com
```

### 1.2 Commit and Push Changes

```bash
git add .
git commit -m "Configure for Netlify deployment"
git push origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI (Recommended)

1. **Sign in to Netlify**

   - Go to [netlify.com](https://netlify.com)
   - Sign in with your GitHub/GitLab/Bitbucket account

2. **Create New Site**

   - Click "New site from Git"
   - Choose your repository provider
   - Select your repository

3. **Configure Build Settings**

   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18` (or your preferred version)

4. **Set Environment Variables**

   - Go to Site settings > Environment variables
   - Add the following variables:
     ```
     REACT_APP_API_URL=https://your-backend-api.com
     NODE_ENV=production
     ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**

   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**

   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   cd client
   netlify init
   netlify deploy --prod
   ```

## Step 3: Configure Custom Domain (Optional)

1. **Add Custom Domain**

   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Enter your domain name

2. **Configure DNS**
   - Add a CNAME record pointing to your Netlify site
   - Or use Netlify's nameservers for full DNS management

## Step 4: Environment Variables for Production

Set these environment variables in your Netlify site settings:

### Required Variables

- `REACT_APP_API_URL`: Your backend API URL
- `NODE_ENV`: Set to `production`

### Optional Variables

- `REACT_APP_GA_TRACKING_ID`: Google Analytics tracking ID
- `REACT_APP_SENTRY_DSN`: Sentry error tracking DSN

## Step 5: Verify Deployment

1. **Check Build Logs**

   - Go to your site's Deploys tab
   - Verify the build completed successfully

2. **Test Functionality**

   - Visit your deployed site
   - Test all forms and API calls
   - Verify admin functionality works

3. **Check Console for Errors**
   - Open browser developer tools
   - Look for any JavaScript errors or API call failures

## Troubleshooting

### Common Issues

1. **Build Failures**

   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs for specific error messages

2. **API Calls Failing**

   - Verify `REACT_APP_API_URL` is correct
   - Check CORS configuration on your backend
   - Ensure backend is accessible from Netlify

3. **Routing Issues**

   - Verify `_redirects` file is in the `client/public` directory
   - Check `netlify.toml` configuration

4. **Environment Variables Not Working**
   - Ensure variables start with `REACT_APP_`
   - Redeploy after adding new environment variables
   - Check variable names match exactly

### Performance Optimization

1. **Enable Build Caching**

   - Netlify automatically caches dependencies
   - Use `package-lock.json` for consistent installs

2. **Asset Optimization**

   - React build process optimizes assets automatically
   - Enable gzip compression in Netlify settings

3. **CDN Benefits**
   - Netlify provides global CDN
   - Assets are served from edge locations

## Maintenance

### Regular Updates

1. **Keep Dependencies Updated**

   ```bash
   cd client
   npm update
   ```

2. **Test Locally Before Deploying**

   ```bash
   npm run build
   npm run test
   ```

3. **Monitor Performance**
   - Use Netlify Analytics
   - Monitor Core Web Vitals
   - Check for broken links

### Rollback Strategy

1. **Previous Deployments**

   - Netlify keeps deployment history
   - Easy to rollback to previous versions

2. **Branch Deploys**
   - Set up branch deploys for testing
   - Deploy feature branches before merging

## Support

- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Netlify Community**: [community.netlify.com](https://community.netlify.com)
- **Build Issues**: Check build logs in Netlify dashboard

## Notes

- The `netlify.toml` file configures build settings and redirects
- The `_redirects` file handles client-side routing
- Environment variables must be prefixed with `REACT_APP_` for React apps
- Netlify automatically handles HTTPS and CDN distribution


