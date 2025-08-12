# Separated Backend & Frontend Deployment Guide

This guide explains how to deploy the separated backend and frontend on Vercel.

## Project Structure

```
landing/
├── backend/           # Backend API (Node.js/Express)
│   ├── models/        # MongoDB models
│   ├── middleware/    # Authentication middleware
│   ├── utils/         # Utility functions
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   ├── vercel.json    # Vercel backend config
│   └── env.example   # Environment variables template
├── frontend/          # Frontend React app
│   ├── src/           # React source code
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│   └── vercel.json    # Vercel frontend config
└── README.md
```

## Step 1: Deploy Backend First

### 1.1 Prepare Backend Environment

1. Create a new Vercel project for the backend
2. Set environment variables in Vercel dashboard:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_gmail_address
   EMAIL_PASS=your_gmail_app_password
   EMAIL_FROM=PRAKASH ENTERPRISES <your_email@gmail.com>
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

### 1.2 Deploy Backend

```bash
cd backend
vercel --prod
```

### 1.3 Test Backend APIs

After deployment, test the backend APIs:

- Health check: `https://your-backend-domain.vercel.app/api/health`
- Contact form: `https://your-backend-domain.vercel.app/api/contact`

## Step 2: Deploy Frontend

### 2.1 Update Frontend Configuration

1. Update `frontend/src/config/api.js` with your backend URL
2. Set environment variable in Vercel:
   ```
   REACT_APP_API_URL=https://your-backend-domain.vercel.app
   ```

### 2.2 Deploy Frontend

```bash
cd frontend
vercel --prod
```

## Step 3: Update CORS Configuration

### 3.1 Backend CORS

The backend is configured to allow requests from:

- Development: `http://localhost:3000`
- Production: Your frontend domain (set via `FRONTEND_URL`)

### 3.2 Frontend API Calls

The frontend will make API calls to your backend domain in production.

## Environment Variables Reference

### Backend (.env)

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM=PRAKASH ENTERPRISES <your_email@gmail.com>
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=12
```

### Frontend (.env)

```
REACT_APP_API_URL=https://your-backend-domain.vercel.app
```

## Testing Checklist

### Backend Testing

- [ ] Health check endpoint responds
- [ ] Contact form submission works
- [ ] Admin login works
- [ ] CORS allows frontend requests
- [ ] Database connections work
- [ ] Email service works

### Frontend Testing

- [ ] App loads without errors
- [ ] API calls to backend work
- [ ] Forms submit successfully
- [ ] Admin dashboard loads
- [ ] Responsive design works

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` is set correctly in backend
2. **API 404**: Check that backend routes are properly configured
3. **Database Connection**: Verify `MONGODB_URI` is correct
4. **Environment Variables**: Ensure all required variables are set in Vercel

### Debug Commands

```bash
# Test backend locally
cd backend
npm install
npm run dev

# Test frontend locally
cd frontend
npm install
npm start
```

## Security Considerations

1. **JWT Secret**: Use a strong, unique JWT secret
2. **MongoDB**: Use connection string with authentication
3. **Email**: Use app passwords, not regular passwords
4. **CORS**: Restrict to only necessary domains
5. **Rate Limiting**: Configure appropriate limits for your use case

## Performance Optimization

1. **MongoDB**: Use connection pooling
2. **Static Assets**: Frontend assets are served by Vercel CDN
3. **API Caching**: Implement caching for frequently accessed data
4. **Image Optimization**: Use optimized images in frontend

## Monitoring

1. **Vercel Analytics**: Monitor frontend performance
2. **Backend Logs**: Check Vercel function logs
3. **Database**: Monitor MongoDB Atlas metrics
4. **Uptime**: Set up uptime monitoring for both services
