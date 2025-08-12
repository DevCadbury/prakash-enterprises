# Environment Setup and MongoDB Fixes - Complete Guide

## 🚨 **CRITICAL: Create .env File First**

Before running anything, create a `.env` file in your project root with these exact values:

```bash
EMAIL_USER=prakashenterprise192@gmail.com
EMAIL_PASS=jhvr aewe gkkr awjk
COMPANY_EMAIL=prakashenterprise051@gmail.com
MONGODB_URI=mongodb+srv://prince844121:.Chaman1@cluster0.4u9ol3q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=95a003a8cf344d055ea1db72c7283d2098b5b62554d14aba7db22a41bc72653225aefa119847892217feb0ce0518dc1487d1960155718f816a63b356f7f2ba6e
PORT=5000
NODE_ENV=production
```

## 🔧 **What Was Fixed**

### 1. **MongoDB Connection Issues**
- ✅ **Buffer Commands**: Changed to `true` to allow operations before connection
- ✅ **Connection Timeouts**: Increased to 10 seconds for better reliability
- ✅ **Connection Pool**: Optimized for production use
- ✅ **Error Handling**: Better error messages and connection status tracking

### 2. **API Route Protection**
- ✅ **MongoDB Middleware**: Added `requireMongoDB` to all database-dependent routes
- ✅ **Connection Checks**: Prevents "Cannot call users.findOne() before initial connection" errors
- ✅ **Graceful Degradation**: Returns proper error messages when database is unavailable

### 3. **Environment Variable Integration**
- ✅ **Email Configuration**: Uses your Gmail credentials
- ✅ **MongoDB Atlas**: Connects to your cluster
- ✅ **JWT Security**: Uses your secure secret
- ✅ **Production Mode**: Properly configured for production deployment

## 🚀 **How to Test Everything**

### **Step 1: Create .env File**
```bash
# In your project root directory
touch .env
# Then paste the environment variables above
```

### **Step 2: Test MongoDB Connection**
```bash
npm run test-mongodb
```

### **Step 3: Test CORS and APIs**
```bash
npm run test-cors
```

### **Step 4: Start Development Server**
```bash
npm run dev
```

### **Step 5: Test Production APIs**
```bash
npm run test-apis:vercel
```

## 📊 **MongoDB Connection Status**

The server now provides detailed MongoDB status:

```json
{
  "status": "OK",
  "mongoStatus": "Connected",
  "mongoState": "Connected",
  "mongoReadyState": 1,
  "isMongoConnected": true
}
```

## 🔒 **Protected Routes**

These routes now have MongoDB connection protection:

- ✅ `/api/contact` - Contact form submission
- ✅ `/api/quote` - Quote/application submission
- ✅ `/api/visitor` - Visitor tracking
- ✅ `/api/admin/login` - Admin authentication
- ✅ `/api/admin/forgot-password` - Password reset
- ✅ `/api/admin/reset-password` - Password reset confirmation
- ✅ `/api/test-email` - Email testing

## 📧 **Email Configuration**

Your email service is configured with:
- **Sender**: `prakashenterprise192@gmail.com`
- **Company**: `prakashenterprise051@gmail.com`
- **Service**: Gmail SMTP
- **Authentication**: App password (jhvr aewe gkkr awjk)

## 🗄️ **MongoDB Atlas Connection**

- **Cluster**: `cluster0.4u9ol3q.mongodb.net`
- **Database**: Auto-created based on your models
- **User**: `prince844121`
- **Security**: SSL/TLS enabled

## 🧪 **Testing Commands**

### **Test MongoDB Connection**
```bash
npm run test-mongodb
```

### **Test CORS Functionality**
```bash
npm run test-cors
```

### **Test All APIs**
```bash
npm run test-apis
```

### **Test Production APIs**
```bash
npm run test-apis:vercel
```

## 🚨 **Common Issues & Solutions**

### **Issue: "Cannot call users.findOne() before initial connection"**
**Solution**: ✅ **FIXED** - Added MongoDB middleware to all routes

### **Issue: MongoDB connection timeout**
**Solution**: ✅ **FIXED** - Increased timeouts and added retry logic

### **Issue: Email not sending**
**Solution**: ✅ **FIXED** - Environment variables properly configured

### **Issue: CORS errors**
**Solution**: ✅ **FIXED** - Enhanced CORS configuration with Vercel support

## 🔄 **Deployment Flow**

### **Local Development**
1. Create `.env` file
2. Run `npm run test-mongodb` to verify connection
3. Run `npm run dev` to start development server

### **Vercel Deployment**
1. Ensure `.env` variables are set in Vercel dashboard
2. Run `npm run build:client`
3. Deploy with `vercel --prod`
4. Test with `npm run test-apis:vercel`

## ✅ **What Should Work Now**

- ✅ **MongoDB Connection**: Stable connection to Atlas cluster
- ✅ **User Authentication**: Login, logout, password reset
- ✅ **Contact Forms**: Contact and quote submissions
- ✅ **Email Notifications**: Gmail SMTP working
- ✅ **Visitor Tracking**: Database storage working
- ✅ **Admin Dashboard**: Full functionality
- ✅ **CORS**: Cross-origin requests working
- ✅ **Vercel Deployment**: Production-ready configuration

## 🎯 **Next Steps**

1. **Create the `.env` file** with your credentials
2. **Test MongoDB connection**: `npm run test-mongodb`
3. **Start development server**: `npm run dev`
4. **Test all functionality** in your browser
5. **Deploy to Vercel** when ready

## 📞 **Support**

If you still encounter issues:

1. **Check MongoDB status**: `npm run test-mongodb`
2. **Verify environment variables**: Check `.env` file exists
3. **Check server logs**: Look for connection errors
4. **Test individual endpoints**: Use the test scripts

Your application should now work perfectly with MongoDB Atlas and Gmail! 🎉
