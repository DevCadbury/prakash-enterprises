# PRAKASH ENTERPRISES - Separated Backend & Frontend

This project has been separated into independent backend and frontend applications for better scalability and deployment flexibility.

## 🏗️ Project Structure

```
landing/
├── backend/           # Backend API (Node.js/Express)
│   ├── models/        # MongoDB models
│   ├── middleware/    # Authentication middleware
│   ├── utils/         # Utility functions (email service)
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   ├── vercel.json    # Vercel backend configuration
│   ├── env.example    # Environment variables template
│   ├── test-apis.js   # API testing script
│   ├── deploy-backend.js # Backend deployment script
│   └── start-local.js # Local development script
├── frontend/          # Frontend React app
│   ├── src/           # React source code
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│   ├── vercel.json    # Vercel frontend configuration
│   └── deploy-frontend.js # Frontend deployment script
├── deploy-separated.js # Main deployment orchestrator
├── SEPARATED-DEPLOYMENT-GUIDE.md # Detailed deployment guide
└── README-SEPARATED.md # This file
```

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
2. **Vercel CLI**: `npm install -g vercel`
3. **MongoDB Atlas** account
4. **Gmail** account for email service

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env
# Edit .env with your actual values

# Start locally for testing
node start-local.js
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start locally for testing
npm start
```

## 🚀 Deployment

### Option 1: Automated Deployment (Recommended)

```bash
# From root directory
node deploy-separated.js
```

This script will:

1. Deploy backend to Vercel
2. Deploy frontend to Vercel
3. Guide you through configuration

### Option 2: Manual Deployment

#### Backend Deployment

```bash
cd backend
node deploy-backend.js
```

#### Frontend Deployment

```bash
cd frontend
node deploy-frontend.js <backend-url>
```

## ⚙️ Configuration

### Backend Environment Variables

Set these in your Vercel dashboard:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=PRAKASH ENTERPRISES <your_email@gmail.com>
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables

Set in Vercel dashboard:

```env
REACT_APP_API_URL=https://your-backend-domain.vercel.app
```

## 🧪 Testing

### Backend API Testing

```bash
cd backend

# Test all APIs
node test-apis.js

# Test with custom backend URL
BACKEND_URL=https://your-backend.vercel.app node test-apis.js
```

### Frontend Testing

```bash
cd frontend

# Build test
npm run build

# Start development server
npm start
```

## 🔧 Development

### Backend Development

```bash
cd backend

# Start with nodemon (auto-restart)
npm run dev

# Start without nodemon
npm start
```

### Frontend Development

```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build
```

## 📱 Features

### Backend Features

- ✅ RESTful API endpoints
- ✅ MongoDB integration
- ✅ JWT authentication
- ✅ Email service (Gmail)
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Security middleware (Helmet)
- ✅ Input validation
- ✅ Error handling

### Frontend Features

- ✅ React 18 with hooks
- ✅ Responsive design
- ✅ Admin dashboard
- ✅ Contact forms
- ✅ Visitor tracking
- ✅ Charts and analytics
- ✅ Theme switching
- ✅ Mobile-friendly UI

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**

   - Ensure `FRONTEND_URL` is set correctly in backend
   - Check that frontend domain is allowed

2. **API 404 Errors**

   - Verify backend routes are properly configured
   - Check Vercel deployment logs

3. **Database Connection Issues**

   - Verify `MONGODB_URI` is correct
   - Check MongoDB Atlas network access

4. **Email Service Issues**
   - Use Gmail app passwords, not regular passwords
   - Enable 2-factor authentication on Gmail

### Debug Commands

```bash
# Check backend logs
cd backend
npm run dev

# Check frontend build
cd frontend
npm run build

# Test backend APIs
cd backend
node test-apis.js
```

## 📚 API Documentation

### Public Endpoints

- `GET /api/health` - Health check
- `POST /api/contact` - Contact form submission
- `POST /api/visitor` - Visitor tracking
- `POST /api/quote` - Quote request

### Admin Endpoints

- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/contacts` - Contact list
- `GET /api/admin/visitor-stats` - Visitor statistics

## 🔒 Security

- JWT-based authentication
- Rate limiting on all endpoints
- CORS protection
- Input validation and sanitization
- Helmet security headers
- Secure password hashing (bcrypt)

## 📊 Performance

- MongoDB connection pooling
- Rate limiting to prevent abuse
- Optimized React builds
- CDN delivery via Vercel
- Efficient database queries

## 🚀 Deployment Checklist

### Backend

- [ ] Environment variables set in Vercel
- [ ] MongoDB connection working
- [ ] Email service configured
- [ ] CORS settings updated
- [ ] APIs tested and working

### Frontend

- [ ] Backend URL configured
- [ ] Build successful
- [ ] Environment variables set
- [ ] Responsive design tested
- [ ] Forms submitting correctly

## 📞 Support

For issues and questions:

1. Check the troubleshooting section
2. Review Vercel deployment logs
3. Test APIs individually
4. Verify environment variables

## 📄 License

MIT License - see LICENSE file for details

---

**Note**: This is a separated version of the original monolithic application. The backend and frontend are now independent and can be deployed separately for better scalability and maintenance.
