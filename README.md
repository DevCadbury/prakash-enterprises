# 🏢 Prakash Enterprises - Loans & Insurance Services

A comprehensive web application for Prakash Enterprises, offering loan and insurance services with a modern admin dashboard.

## ✨ Features

### 🎯 Public Features

- **Modern Landing Page** - Professional design with animations
- **Contact Form** - WhatsApp integration and email notifications
- **Loan Services** - Apply Now functionality with quote requests
- **Insurance Services** - Get Quote functionality with application forms
- **Responsive Design** - Works on all devices
- **Visitor Tracking** - Analytics and user behavior monitoring

### 🔐 Admin Dashboard

- **Secure Authentication** - JWT-based login system
- **User Management** - Role-based access control (dev, superadmin, admin)
- **Contact Management** - View, reply, and email contacts
- **Analytics Dashboard** - Visitor statistics and insights
- **Email Notifications** - Configurable email recipients
- **Promotion Management** - Bulk email campaigns
- **Admin Logs** - Activity tracking and audit trail
- **Real-time Updates** - Live data refresh

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

### Backend

- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Nodemailer** - Email service
- **Bcryptjs** - Password hashing

### Deployment

- **Vercel** - Hosting platform
- **MongoDB Atlas** - Cloud database

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- MongoDB database
- Email service (Gmail recommended)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DevCadbury/Prakash-enterprises.git
   cd Prakash-enterprises
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd client && npm install
   cd ..
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Admin: http://localhost:3000/admin
   - Backend: http://localhost:5000

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start both server and client
npm run server       # Start backend only
npm run client       # Start frontend only

# Testing
npm run test-all     # Test all APIs
npm run test-server  # Test server connectivity
npm run check-dev    # Check development environment

# Production
npm run build        # Build for production
npm start           # Start production server
```

## 📋 API Endpoints

### Public APIs

- `POST /api/contact` - Contact form submission
- `POST /api/quote` - Quote/application requests
- `POST /api/visitor` - Visitor tracking
- `GET /api/health` - Health check

### Admin APIs (Protected)

- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/contacts` - Contact management
- `GET /api/admin/users` - User management
- `GET /api/admin/visitor-stats` - Analytics
- `GET /api/admin/logs` - Admin logs
- `GET /api/admin/notification-emails` - Email settings
- `GET /api/admin/promotions` - Promotion management

## 👤 Admin Access

### Default Dev Account

- **Email**: prince844121@gmail.com
- **Password**: 1234okay
- **Role**: dev (full access)

### Role Permissions

- **dev**: Full access, can delete any user
- **superadmin**: Can manage users and contacts
- **admin**: Can view contacts and send emails

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**

   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Set environment variables in Vercel dashboard**

   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Environment Variables

| Variable      | Description                          | Required |
| ------------- | ------------------------------------ | -------- |
| `NODE_ENV`    | Environment (development/production) | Yes      |
| `MONGODB_URI` | MongoDB connection string            | Yes      |
| `JWT_SECRET`  | JWT signing secret                   | Yes      |
| `EMAIL_USER`  | Email service username               | Yes      |
| `EMAIL_PASS`  | Email service password               | Yes      |
| `PORT`        | Server port (default: 5000)          | No       |

## 📁 Project Structure

```
prakash-enterprises/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── ui/           # UI components
│   │   └── config/       # API configuration
├── models/                # MongoDB schemas
├── middleware/            # Auth middleware
├── utils/                 # Utility functions
├── server.js             # Express server
├── vercel.json           # Vercel configuration
└── package.json          # Dependencies
```

## 🔒 Security Features

- **JWT Authentication** - Secure admin access
- **Role-Based Access Control** - Granular permissions
- **Password Hashing** - Bcrypt encryption
- **Rate Limiting** - API protection
- **CORS Protection** - Cross-origin security
- **Input Validation** - Data sanitization

## 📊 Features Overview

### Public Features

- ✅ Modern, responsive landing page
- ✅ Contact form with WhatsApp integration
- ✅ Loan application system
- ✅ Insurance quote requests
- ✅ Real-time visitor tracking
- ✅ Email notifications

### Admin Features

- ✅ Secure login system
- ✅ User management with roles
- ✅ Contact management and replies
- ✅ Analytics dashboard
- ✅ Email campaign management
- ✅ Notification settings
- ✅ Activity logging
- ✅ Data export (CSV, Excel, PDF)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact:

- **Email**: prince844121@gmail.com
- **Project**: https://github.com/DevCadbury/Prakash-enterprises

---

**Built with ❤️ for Prakash Enterprises**
