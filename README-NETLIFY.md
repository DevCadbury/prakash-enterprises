# PRAKASH ENTERPRISES - Netlify Deployment

This is the frontend React application for PRAKASH ENTERPRISES, configured for deployment on Netlify.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git repository (GitHub/GitLab/Bitbucket)
- Netlify account

### 1. Prepare for Deployment

**Windows Users:**

```cmd
deploy-netlify.bat
```

**Mac/Linux Users:**

```bash
chmod +x deploy-netlify.sh
./deploy-netlify.sh
```

**Manual Setup:**

```bash
npm run build:netlify
```

### 2. Deploy to Netlify

1. **Connect Repository**

   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository

2. **Build Settings**

   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`

3. **Environment Variables**

   ```
   REACT_APP_API_URL=https://your-backend-api.com
   NODE_ENV=production
   ```

4. **Deploy!**

## 📁 Project Structure

```
landing/
├── client/                 # React frontend
│   ├── public/            # Public assets
│   │   └── _redirects     # Netlify redirects
│   ├── src/               # Source code
│   └── package.json       # Frontend dependencies
├── netlify.toml           # Netlify configuration
├── deploy-netlify.js      # Deployment script
├── deploy-netlify.bat     # Windows deployment
├── deploy-netlify.sh      # Unix deployment
└── NETLIFY-DEPLOYMENT.md  # Detailed guide
```

## 🔧 Configuration Files

### netlify.toml

- Build settings and redirects
- Security headers
- Cache optimization

### \_redirects

- Handles React Router navigation
- Ensures SPA works correctly

### Environment Variables

- `REACT_APP_API_URL`: Your backend API endpoint
- `NODE_ENV`: Set to `production`

## 🛠️ Available Scripts

```bash
# Build for Netlify
npm run build:netlify

# Development
npm run dev

# Production build
npm run build:prod
```

## 🌐 Backend Requirements

Your backend API must:

- Be accessible from Netlify
- Have CORS configured for your Netlify domain
- Handle all API endpoints defined in `client/src/config/api.js`

## 📱 Features

- ✅ Responsive design
- ✅ Dark/Light theme toggle
- ✅ Contact forms
- ✅ Admin dashboard
- ✅ Visitor tracking
- ✅ SEO optimized
- ✅ Performance optimized

## 🚨 Important Notes

1. **Backend Separation**: This is a frontend-only deployment. Your backend must be hosted separately.

2. **Environment Variables**: Must be set in Netlify dashboard, not in code.

3. **Build Process**: Netlify automatically runs `npm run build` in the `client` directory.

4. **Routing**: All routes redirect to `index.html` for SPA functionality.

## 🔍 Troubleshooting

### Build Failures

- Check Node.js version (18+ recommended)
- Verify all dependencies are in `package.json`
- Check build logs in Netlify dashboard

### API Issues

- Verify `REACT_APP_API_URL` is correct
- Check backend CORS configuration
- Ensure backend is accessible

### Routing Issues

- Verify `_redirects` file exists in `client/public/`
- Check `netlify.toml` configuration

## 📚 Documentation

- [NETLIFY-DEPLOYMENT.md](./NETLIFY-DEPLOYMENT.md) - Complete deployment guide
- [Netlify Docs](https://docs.netlify.com) - Official Netlify documentation
- [React Deployment](https://create-react-app.dev/docs/deployment) - React deployment guide

## 🆘 Support

If you encounter issues:

1. Check the build logs in Netlify dashboard
2. Verify environment variables are set correctly
3. Test your backend API independently
4. Check browser console for JavaScript errors

## 📄 License

MIT License - see LICENSE file for details.

---

**PRAKASH ENTERPRISES** - Professional Loans & Insurance Services


