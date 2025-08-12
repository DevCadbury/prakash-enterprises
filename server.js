const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
require("dotenv").config();
const path = require("path");

// Import email service
const {
  sendContactNotification,
  sendLoanApplicationNotification,
  sendQuoteRequestNotification,
  sendOTPEmail,
  sendReplyToCustomer,
  sendContactConfirmation,
  sendPromotionalEmail,
} = require("./utils/emailService");

// Import models
const User = require("./models/User");
const Contact = require("./models/Contact");
const Notification = require("./models/Notification");
const Promotion = require("./models/Promotion");
const Visitor = require("./models/Visitor");
const NotificationEmail = require("./models/NotificationEmail");
const AdminLog = require("./models/AdminLog");
const TokenBlacklist = require("./models/TokenBlacklist");

// Import middleware
const { auth, requireRole } = require("./middleware/auth");

const app = express();
// Remove forced development mode - let environment variables control this
const PORT = process.env.PORT || 5000;

// Trust proxy for rate limiting
app.set("trust proxy", 1);

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production"
        ? {
            directives: {
              defaultSrc: ["'self'"],
              styleSrc: ["'self'", "'unsafe-inline'"],
              scriptSrc: ["'self'"],
              imgSrc: ["'self'", "data:", "https:"],
              connectSrc: ["'self'"],
              fontSrc: ["'self'"],
              objectSrc: ["'none'"],
              mediaSrc: ["'self'"],
              frameSrc: ["'none'"],
            },
          }
        : false,
    hsts: process.env.NODE_ENV === "production",
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);
// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5000",
    ];

    // Add Vercel URLs if in production
    if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
      allowedOrigins.push(
        "https://prakash-enterprises.vercel.app",
        "https://*.vercel.app",
        "https://*.netlify.app"
      );
    }

    // Add VERCEL_URL if available
    if (process.env.VERCEL_URL) {
      allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
    }

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// Apply CORS before rate limiting
app.use(cors(corsOptions));

// Handle CORS preflight requests
app.options("*", cors(corsOptions));

// Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs:
    process.env.NODE_ENV === "production" ? 1 * 60 * 1000 : 1 * 60 * 1000, // 1 min in production, 1 min in dev
  max: process.env.NODE_ENV === "production" ? 100 : 1000, // Stricter in production
  message: {
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Too many requests. Please try again later."
        : "Rate limit exceeded. Please slow down your requests.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Connect to MongoDB with Vercel optimization
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      console.log("🔗 Connecting to MongoDB...");

      await mongoose.connect(process.env.MONGODB_URI, {
        // Production-ready MongoDB options
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 15000, // Increased for production
        socketTimeoutMS: 45000,
        bufferCommands: true,
        // Vercel-specific optimizations
        maxIdleTimeMS: 30000,
        minPoolSize: 1,
        // Connection pool settings
        maxConnecting: 2,
        // Timeout settings
        connectTimeoutMS: 15000,
        heartbeatFrequencyMS: 10000,
        // Production optimizations
        autoIndex: false, // Disable auto-indexing in production
        autoCreate: false, // Disable auto-collection creation
      });

      console.log("✅ MongoDB connected successfully");
      return true;
    } else {
      console.log("⚠️ MONGODB_URI not set");
      return false;
    }
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    return false;
  }
};

// Global variable to track MongoDB connection status
let isMongoConnected = false;

// Connect to database
const initializeDatabase = async () => {
  isMongoConnected = await connectDB();
  return isMongoConnected;
};

// Initialize database on startup
initializeDatabase();

// Helper function to check if MongoDB is ready
const isMongoReady = () => {
  return mongoose.connection.readyState === 1;
};

// Middleware to check MongoDB connection for database operations
const requireMongoDB = (req, res, next) => {
  if (!isMongoReady()) {
    const errorMessage =
      process.env.NODE_ENV === "production"
        ? "Service temporarily unavailable. Please try again later."
        : "Database is not available. Please try again later.";

    return res.status(503).json({
      success: false,
      message: errorMessage,
      error:
        process.env.NODE_ENV === "production"
          ? undefined
          : "MongoDB connection not established",
    });
  }
  next();
};

// Serve static files from React build (works in both development and production)
const buildPath = path.join(__dirname, "client/build");

// For Vercel deployment, also check if we're in a serverless environment
const isVercel =
  process.env.VERCEL === "1" || process.env.NODE_ENV === "production";

if (fs.existsSync(buildPath)) {
  // Production-ready static file serving
  app.use(
    express.static(buildPath, {
      maxAge: isVercel ? "1y" : "0",
      etag: true,
      lastModified: true,
      setHeaders: (res, path) => {
        // Set security headers for static files
        if (path.endsWith(".js")) {
          res.setHeader("X-Content-Type-Options", "nosniff");
        }
        // Ensure proper MIME types for Vercel
        if (path.endsWith(".css")) {
          res.setHeader("Content-Type", "text/css");
        }
        if (path.endsWith(".js")) {
          res.setHeader("Content-Type", "application/javascript");
        }
      },
    })
  );
  console.log("✅ Static files served from build directory");
} else {
  if (isVercel) {
    console.error("❌ Production build not found on Vercel");
  } else if (process.env.NODE_ENV === "production") {
    console.error("❌ Production build not found");
  } else {
    console.warn("⚠️ Build directory not found");
  }
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  const mongoStatus =
    mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
  const mongoState = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  res.json({
    success: true,
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    mongoStatus: mongoStatus,
    mongoState: mongoState[mongoose.connection.readyState] || "Unknown",
    mongoReadyState: mongoose.connection.readyState,
    isMongoConnected: isMongoConnected,
    cors: {
      origin:
        process.env.NODE_ENV === "production" || process.env.VERCEL === "1"
          ? ["https://prakash-enterprises.vercel.app", "https://*.vercel.app"]
          : [
              `http://localhost:${process.env.CLIENT_PORT || 3000}`,
              `http://127.0.0.1:${process.env.CLIENT_PORT || 3000}`,
              `http://localhost:${process.env.CLIENT_PORT || 3001}`,
            ],
    },
  });
});

// Clean up expired tokens periodically
const cleanupExpiredTokens = async () => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      return;
    }

    const result = await TokenBlacklist.deleteMany({
      expiresAt: { $lt: new Date() },
    });
    if (result.deletedCount > 0) {
      console.log(`🧹 Cleaned up ${result.deletedCount} expired tokens`);
    }
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
  }
};

// Run cleanup every hour
setInterval(cleanupExpiredTokens, 60 * 60 * 1000);

// Initialize superadmin and dev account
const initializeAccounts = async () => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      if (process.env.NODE_ENV === "production") {
        console.log(
          "⚠️ MongoDB not connected. Admin features will be limited."
        );
      }
      return;
    }

    // Check if dev account exists
    const devAccount = await User.findOne({ email: "prince844121@gmail.com" });
    if (!devAccount) {
      await User.create({
        email: "prince844121@gmail.com",
        password: "1234okay",
        name: "Prince",
        role: "dev",
        isDev: true,
      });
      console.log("✅ Dev account created");
    } else if (!devAccount.isDev) {
      // Update existing account to be dev account
      devAccount.isDev = true;
      devAccount.role = "dev";
      await devAccount.save();
      console.log("✅ Dev account updated");
    }
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("❌ Critical: Failed to initialize admin accounts");
    } else {
      console.error("Error creating dev account:", error);
    }
  }
};

// Initialize accounts on startup
initializeAccounts();

// Admin logging function
const logAdminAction = async (
  action,
  performedBy,
  details,
  targetUser = null,
  targetContact = null,
  metadata = {}
) => {
  try {
    await AdminLog.create({
      action,
      performedBy,
      targetUser,
      targetContact,
      details,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
      metadata,
    });
  } catch (error) {
    console.error("Error logging admin action:", error);
  }
};

// Test endpoint to check if server is working
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    mongoStatus:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Test admin endpoint (no auth required for testing)
app.get("/api/admin/test", (req, res) => {
  res.json({
    success: true,
    message: "Admin endpoints are accessible",
    timestamp: new Date().toISOString(),
    mongoStatus:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  });
});

// Test email notification endpoint
app.post("/api/test-email", requireMongoDB, async (req, res) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.json({
        success: false,
        message: "Email not configured",
        error: "EMAIL_USER and EMAIL_PASS environment variables are required",
      });
    }

    await sendContactNotification({
      name: "Test User",
      email: "test@example.com",
      phone: "1234567890",
      message: "This is a test message",
    });

    res.json({
      success: true,
      message: "Test email sent successfully",
    });
  } catch (error) {
    console.error("Test email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send test email",
      error: error.message,
    });
  }
});

// Contact form endpoint
app.post("/api/contact", requireMongoDB, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required",
      });
    }

    // Save contact to database
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
      status: "new",
    });

    // Create notification for admin
    try {
      await Notification.create({
        title: "New Contact Form Submission",
        message: `New contact from ${name} (${email})`,
        type: "contact",
        relatedId: contact._id,
        relatedModel: "Contact",
      });
    } catch (notificationError) {
      console.log(
        "❌ Failed to create notification:",
        notificationError.message
      );
    }

    // Send notification email to configured recipients (optional - only if email is configured)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const notificationResult = await sendContactNotification({
          name,
          email,
          phone,
          message,
        });
        if (process.env.NODE_ENV === "development") {
          console.log(
            `✅ Contact notification sent: ${notificationResult.successful}/${notificationResult.total}`
          );
        }
      }
    } catch (emailError) {
      console.log("❌ Email notification failed:", emailError.message);
    }

    // Send confirmation email to customer (optional - only if email is configured)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendContactConfirmation({ name, email, phone, message });
        if (process.env.NODE_ENV === "development") {
          console.log("✅ Customer confirmation sent");
        }
      }
    } catch (confirmationError) {
      console.log(
        "❌ Customer confirmation failed:",
        confirmationError.message
      );
    }

    res.json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Admin Authentication Routes
app.post("/api/admin/verify-token", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name || "Admin",
        role: req.user.role,
        isDev: req.user.isDev,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

// Add GET method for verify-token as well
app.get("/api/admin/verify-token", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name || "Admin",
        role: req.user.role,
        isDev: req.user.isDev,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
});

app.post("/api/admin/logout", auth, async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (token) {
      // Decode token to get expiration
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your-secret-key"
      );

      // Add token to blacklist
      await TokenBlacklist.create({
        token,
        userId: req.user._id,
        expiresAt: new Date(decoded.exp * 1000), // Convert to Date
      });
    }

    // Log the logout action
    await logAdminAction(
      "logout",
      req.user._id,
      `Admin logout: ${req.user.email}`,
      null,
      null,
      {
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
      }
    );

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

app.post("/api/admin/login", requireMongoDB, async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    console.log("Login attempt for:", email, "Remember me:", rememberMe);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log(
      "User found:",
      user.email,
      "Role:",
      user.role,
      "isDev:",
      user.isDev
    );

    const isPasswordValid = await user.comparePassword(password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (user.isActive === false) {
      console.log("Account is deactivated for user:", email);
      return res.status(401).json({
        success: false,
        message: "Account is deactivated",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Log admin login
    try {
      await logAdminAction(
        "login",
        user._id,
        `Admin login: ${user.email}`,
        null,
        null,
        {
          ipAddress: req.ip,
          userAgent: req.get("User-Agent"),
        }
      );
    } catch (logError) {
      console.error("Error logging admin action:", logError);
      // Don't fail the login if logging fails
    }

    // Set token expiration based on remember me preference
    const tokenExpiration = rememberMe ? "30d" : "24h";

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: tokenExpiration }
    );

    res.json({
      success: true,
      token,
      rememberMe: rememberMe,
      user: {
        id: user._id,
        email: user.email,
        name: user.name || "Admin",
        role: user.role,
        isDev: user.isDev,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

// Forgot password endpoint
app.post("/api/admin/forgot-password", requireMongoDB, async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in user document (in production, use Redis or similar)
    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send OTP email (optional - only if email is configured)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendOTPEmail(email, otp);
        console.log("✅ OTP email sent to:", email);
      } else {
        console.log("ℹ️ Email not configured - OTP not sent");
      }
    } catch (emailError) {
      console.log(
        "❌ Email sending failed (continuing without email):",
        emailError.message
      );
    }

    // In development, return OTP in response if email is not configured
    const response = {
      success: true,
      message: "OTP sent to your email",
    };

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      response.otp = otp; // Only in development
      response.message =
        "OTP sent to your email (check response for OTP in development)";
    }

    res.json(response);
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

// Reset password endpoint
app.post("/api/admin/reset-password", requireMongoDB, async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.resetPasswordOTP !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.resetPasswordExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // Hash the new password
    const bcrypt = require("bcryptjs");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
});

// Change password endpoint
app.post("/api/admin/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    // Log the action
    await logAdminAction(
      "password_changed",
      user._id,
      "Password changed successfully",
      user._id
    );

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
});

// Admin Dashboard Routes (protected)
app.get("/api/admin/dashboard", auth, async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: "new" });
    const repliedContacts = await Contact.countDocuments({ status: "replied" });
    const totalUsers = await User.countDocuments();

    res.json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        repliedContacts,
        totalUsers,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
    });
  }
});

// Get all contacts
app.get("/api/admin/contacts", auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
});

// Update contact
app.put("/api/admin/contacts/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, message, status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, message, status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.json({
      success: true,
      data: contact,
      message: "Contact updated successfully",
    });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update contact",
    });
  }
});

// Send email to contact
app.post("/api/admin/contacts/:id/email", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, message } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // Send email to contact
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendReplyToCustomer(
          contact.email,
          contact.name,
          message,
          req.user.name || "Admin"
        );
        console.log("✅ Email sent to contact:", contact.email);
      } else {
        console.log("ℹ️ Email not configured - email not sent");
      }
    } catch (emailError) {
      console.log(
        "❌ Email sending failed (continuing without email):",
        emailError.message
      );
    }

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Send email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

// Reply to contact
app.post("/api/admin/contacts/:id/reply", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    // Update contact status
    contact.status = "replied";
    await contact.save();

    // Send reply email (optional - only if email is configured)
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendReplyToCustomer(
          contact.email,
          contact.name,
          message,
          req.user.name || "Admin"
        );
        console.log("✅ Reply email sent to:", contact.email);
      } else {
        console.log("ℹ️ Email not configured - reply not sent");
      }
    } catch (emailError) {
      console.log(
        "❌ Reply email failed (continuing without email):",
        emailError.message
      );
    }

    // Log contact reply
    await logAdminAction(
      "contact_replied",
      req.user._id,
      `Replied to contact: ${contact.email}`,
      null,
      contact._id,
      {
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
        replyLength: message.length,
      }
    );

    res.json({
      success: true,
      message: "Reply sent successfully",
    });
  } catch (error) {
    console.error("Reply error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send reply",
    });
  }
});

// Get all users (dev and superadmin only) - hide dev account from other users
app.get(
  "/api/admin/users",
  auth,
  requireRole(["superadmin", "dev"]),
  async (req, res) => {
    try {
      let query = {};

      // Hide dev account from other users (including other superadmins)
      if (req.user.email !== "prince844121@gmail.com") {
        query.isDev = { $ne: true };
      }

      const users = await User.find(query)
        .select("-password")
        .sort({ createdAt: -1 });
      res.json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
      });
    }
  }
);

// Create new user (dev and superadmin only)
app.post(
  "/api/admin/users",
  auth,
  requireRole(["superadmin", "dev"]),
  async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password,
        role: role || "user",
        createdBy: req.user._id,
      });

      // Log user creation
      await logAdminAction(
        "user_created",
        req.user._id,
        `Created user: ${user.email} with role: ${user.role}`,
        user._id,
        null,
        {
          ipAddress: req.ip,
          userAgent: req.get("User-Agent"),
          newUserRole: user.role,
        }
      );

      res.json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Create user error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }
  }
);

// Delete user with role-based restrictions
app.delete(
  "/api/admin/users/:id",
  auth,
  requireRole(["superadmin", "dev"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Prevent deleting self
      if (id === req.user._id.toString()) {
        return res.status(400).json({
          success: false,
          message: "Cannot delete your own account",
        });
      }

      // Find the user to be deleted
      const userToDelete = await User.findById(id);
      if (!userToDelete) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Prevent deleting dev account
      if (userToDelete.isDev) {
        return res.status(403).json({
          success: false,
          message: "Cannot delete dev account",
        });
      }

      // Role-based deletion rules
      if (req.user.role === "dev") {
        // Dev can delete anyone (including superadmin)
        // No restrictions for dev
      } else if (req.user.role === "superadmin") {
        // Superadmin can delete admin and user, but not other superadmin
        if (userToDelete.role === "superadmin") {
          return res.status(403).json({
            success: false,
            message: "Superadmin cannot delete other superadmin",
          });
        }
      } else if (req.user.role === "admin") {
        // Admin cannot delete any accounts
        return res.status(403).json({
          success: false,
          message: "Admin cannot delete accounts",
        });
      }

      // Log user deletion before deleting
      await logAdminAction(
        "user_deleted",
        req.user._id,
        `Deleted user: ${userToDelete.email} (${userToDelete.role})`,
        userToDelete._id,
        null,
        {
          ipAddress: req.ip,
          userAgent: req.get("User-Agent"),
          deletedUserRole: userToDelete.role,
        }
      );

      // Delete the user
      await User.findByIdAndDelete(id);

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
      });
    }
  }
);

// Get admin logs (dev and superadmin only)
app.get(
  "/api/admin/logs",
  auth,
  requireRole(["superadmin", "dev"]),
  async (req, res) => {
    try {
      const { page = 1, limit = 50, action, performedBy } = req.query;
      const skip = (page - 1) * limit;

      let query = {};

      // Filter by action if provided
      if (action) {
        query.action = action;
      }

      // Filter by performer if provided
      if (performedBy) {
        query.performedBy = performedBy;
      }

      const logs = await AdminLog.find(query)
        .populate("performedBy", "name email role")
        .populate("targetUser", "name email role")
        .populate("targetContact", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await AdminLog.countDocuments(query);

      res.json({
        success: true,
        data: logs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Get admin logs error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch admin logs",
      });
    }
  }
);

// Get notifications
app.get("/api/admin/notifications", auth, async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
});

// Get unread notification count
app.get("/api/admin/notifications/count", auth, async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Get notification count error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification count",
    });
  }
});

// Mark notification as read
app.put("/api/admin/notifications/:id/read", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Mark notification read error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to mark notification as read",
    });
  }
});

// Send promotion
app.post("/api/admin/promotions/send", auth, async (req, res) => {
  try {
    const { subject, message, recipients } = req.body;

    if (!subject || !message || !recipients || recipients.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Subject, message, and recipients are required",
      });
    }

    // Create promotion record
    const promotion = await Promotion.create({
      subject,
      message,
      recipients: recipients.map((email) => ({ email })),
      totalRecipients: recipients.length,
      sentBy: req.user._id,
      status: "sending",
    });

    // Send emails to all recipients
    let sentCount = 0;
    let failedCount = 0;

    for (const recipient of recipients) {
      try {
        // Check if email service is configured
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
          throw new Error(
            "Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables."
          );
        }

        // Send promotional email
        await sendPromotionalEmail(recipient, subject, message);

        // Update recipient status
        await Promotion.findByIdAndUpdate(
          promotion._id,
          {
            $inc: { sentCount: 1 },
            $set: {
              "recipients.$[elem].status": "sent",
              "recipients.$[elem].sentAt": new Date(),
            },
          },
          {
            arrayFilters: [{ "elem.email": recipient }],
          }
        );

        sentCount++;
        console.log(`✅ Promotional email sent successfully to: ${recipient}`);
      } catch (error) {
        console.error(
          `❌ Failed to send promotional email to ${recipient}:`,
          error.message
        );

        await Promotion.findByIdAndUpdate(
          promotion._id,
          {
            $inc: { failedCount: 1 },
            $set: {
              "recipients.$[elem].status": "failed",
              "recipients.$[elem].error": error.message,
            },
          },
          {
            arrayFilters: [{ "elem.email": recipient }],
          }
        );

        failedCount++;
      }
    }

    // Update promotion status
    await Promotion.findByIdAndUpdate(promotion._id, {
      status: "completed",
      sentCount,
      failedCount,
    });

    // Log promotion sending
    await logAdminAction(
      "promotion_sent",
      req.user._id,
      `Sent promotion: ${subject} to ${sentCount} recipients (${failedCount} failed)`,
      null,
      null,
      {
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
        promotionId: promotion._id,
        sentCount,
        failedCount,
        totalRecipients: recipients.length,
      }
    );

    res.json({
      success: true,
      message: `Promotion sent successfully! ${sentCount} emails sent, ${failedCount} failed`,
      data: {
        sentCount,
        failedCount,
        totalRecipients: recipients.length,
        promotionId: promotion._id,
      },
    });
  } catch (error) {
    console.error("Send promotion error:", error);
    res.status(500).json({
      success: false,
      message: `Failed to send promotion: ${error.message}`,
    });
  }
});

// Test promotional email endpoint
app.post("/api/admin/test-promotional-email", auth, async (req, res) => {
  try {
    const { testEmail } = req.body;

    if (!testEmail) {
      return res.status(400).json({
        success: false,
        message: "Test email address is required",
      });
    }

    // Check if email service is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({
        success: false,
        message:
          "Email service not configured. Please set EMAIL_USER and EMAIL_PASS environment variables.",
      });
    }

    // Send test promotional email
    await sendPromotionalEmail(
      testEmail,
      "Test Promotional Email - Prakash Enterprises",
      "This is a test promotional email to verify that the email service is working correctly.\n\nIf you received this email, the promotional email system is functioning properly.\n\nBest regards,\nPrakash Enterprises Team"
    );

    res.json({
      success: true,
      message: "Test promotional email sent successfully",
      data: {
        testEmail,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Test promotional email error:", error);
    res.status(500).json({
      success: false,
      message: `Failed to send test promotional email: ${error.message}`,
    });
  }
});

// Get promotion history
app.get("/api/admin/promotions", auth, async (req, res) => {
  try {
    const promotions = await Promotion.find()
      .populate("sentBy", "name email")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: promotions,
    });
  } catch (error) {
    console.error("Get promotions error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch promotions",
    });
  }
});

// Visitor tracking endpoint
app.post("/api/visitor", requireMongoDB, async (req, res) => {
  try {
    const {
      page = "home",
      referrer = "",
      device = "desktop",
      browser = "",
      os = "",
      sessionId,
    } = req.body;

    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get("User-Agent") || "";

    // Check if this is a returning visitor
    const existingVisitor = await Visitor.findOne({
      ip,
      sessionId,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Last 24 hours
    });

    const visitor = new Visitor({
      ip,
      userAgent,
      page,
      referrer,
      device,
      browser,
      os,
      sessionId,
      isReturning: !!existingVisitor,
    });

    await visitor.save();

    res.json({ success: true, message: "Visitor tracked successfully" });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to track visitor" });
  }
});

// Get real visitor statistics
app.get("/api/admin/visitor-stats", auth, async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get visitor counts
    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: today },
    });

    const thisWeekVisitors = await Visitor.countDocuments({
      createdAt: { $gte: thisWeek },
    });

    const thisMonthVisitors = await Visitor.countDocuments({
      createdAt: { $gte: thisMonth },
    });

    const totalVisitors = await Visitor.countDocuments();

    // Get device statistics
    const deviceStats = await Visitor.aggregate([
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get page statistics
    const pageStats = await Visitor.aggregate([
      {
        $group: {
          _id: "$page",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Get hourly data for today
    const hourlyData = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: { $hour: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get daily data for this week
    const dailyData = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: thisWeek },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get browser statistics
    const browserStats = await Visitor.aggregate([
      {
        $match: {
          browser: { $ne: "" },
        },
      },
      {
        $group: {
          _id: "$browser",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Get returning vs new visitors
    const returningVisitors = await Visitor.countDocuments({
      isReturning: true,
    });
    const newVisitors = totalVisitors - returningVisitors;

    res.json({
      success: true,
      data: {
        todayVisitors,
        thisWeekVisitors,
        thisMonthVisitors,
        totalVisitors,
        deviceStats: deviceStats.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        pageStats: pageStats.map((item) => ({
          page: item._id,
          count: item.count,
        })),
        hourlyData: hourlyData.map((item) => ({
          hour: item._id,
          count: item.count,
        })),
        dailyData: dailyData.map((item) => ({
          date: item._id,
          count: item.count,
        })),
        browserStats: browserStats.map((item) => ({
          browser: item._id,
          count: item.count,
        })),
        returningVisitors,
        newVisitors,
      },
    });
  } catch (error) {
    console.error("Error fetching visitor stats:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch visitor stats" });
  }
});

// Get recent visitors
app.get("/api/admin/recent-visitors", auth, async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("ip page device browser os createdAt sessionId");

    res.json({
      success: true,
      data: visitors,
    });
  } catch (error) {
    console.error("Error fetching recent visitors:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch recent visitors" });
  }
});

// Quote and Application submission endpoint
app.post("/api/quote", requireMongoDB, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      amount,
      message,
      type, // "apply" or "quote"
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, and service are required",
      });
    }

    // Save to Contact collection for admin dashboard
    const contact = await Contact.create({
      name,
      email,
      phone,
      message: `Service: ${service}${amount ? ` | Amount: ₹${amount}` : ""}${
        message ? ` | Additional Info: ${message}` : ""
      }`,
      status: "new",
      type: type, // "apply" or "quote"
      service: service,
      amount: amount,
    });

    // Create notification for admin
    const notification = new Notification({
      title: `${type === "apply" ? "New Application" : "New Quote Request"}`,
      message: `${name} (${email}) has submitted a ${
        type === "apply" ? "loan application" : "quote request"
      } for ${service}${amount ? ` - Amount: ₹${amount}` : ""}. ${
        message ? `Message: ${message}` : ""
      }`,
      type: "contact",
      relatedId: contact._id,
      relatedModel: "Contact",
    });

    await notification.save();

    // Send email notification to admin
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        if (type === "apply") {
          const notificationResult = await sendLoanApplicationNotification({
            name,
            email,
            phone,
            service,
            message,
          });
          if (process.env.NODE_ENV === "development") {
            console.log(
              `✅ Loan application notification: ${notificationResult.successful}/${notificationResult.total}`
            );
          }
        } else {
          const notificationResult = await sendQuoteRequestNotification({
            name,
            email,
            phone,
            service,
            amount,
            message,
          });
          if (process.env.NODE_ENV === "development") {
            console.log(
              `✅ Quote request notification: ${notificationResult.successful}/${notificationResult.total}`
            );
          }
        }
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
      }
    }

    // Send confirmation email to customer
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        await sendContactConfirmation({
          name,
          email,
          phone,
          message: `Service: ${service}${
            amount ? ` | Amount: ₹${amount}` : ""
          }${message ? ` | Additional Info: ${message}` : ""}`,
        });
        if (process.env.NODE_ENV === "development") {
          console.log("✅ Customer confirmation sent");
        }
      }
    } catch (confirmationError) {
      console.log(
        "❌ Customer confirmation failed:",
        confirmationError.message
      );
    }

    res.json({
      success: true,
      message: `${
        type === "apply" ? "Application" : "Quote request"
      } submitted successfully! We will get back to you soon.`,
    });
  } catch (error) {
    console.error("Error submitting quote/application:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit request" });
  }
});

// Get notification email settings (dev and superadmin only)
app.get("/api/admin/notification-emails", auth, async (req, res) => {
  try {
    if (req.user.role !== "dev" && req.user.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message:
          "Only dev and superadmin can access notification email settings",
      });
    }

    const notificationEmails = await NotificationEmail.find().sort({
      type: 1,
    });
    res.json({ success: true, data: notificationEmails });
  } catch (error) {
    console.error("Error fetching notification emails:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification email settings",
    });
  }
});

// Update notification email settings (dev and superadmin only)
app.put("/api/admin/notification-emails/:type", auth, async (req, res) => {
  try {
    if (req.user.role !== "dev" && req.user.role !== "superadmin") {
      return res.status(403).json({
        success: false,
        message:
          "Only dev and superadmin can update notification email settings",
      });
    }

    const { type } = req.params;
    const { emails, isEnabled } = req.body;

    // Validate email format
    for (const emailData of emails) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailData.email)) {
        return res.status(400).json({
          success: false,
          message: `Invalid email format: ${emailData.email}`,
        });
      }
    }

    console.log(`🔧 Updating notification emails for type: ${type}`);
    console.log(`📧 Emails to save:`, emails);
    console.log(`✅ isEnabled:`, isEnabled);

    const notificationEmail = await NotificationEmail.findOneAndUpdate(
      { type },
      {
        emails,
        isEnabled,
        updatedBy: req.user._id,
        $setOnInsert: { createdBy: req.user._id }, // Set createdBy only on insert
      },
      { upsert: true, new: true }
    );

    console.log(`✅ Saved notification email settings:`, notificationEmail);

    // Log notification email update
    await logAdminAction(
      "notification_email_updated",
      req.user._id,
      `Updated notification email settings for type: ${type}`,
      null,
      null,
      {
        ipAddress: req.ip,
        userAgent: req.get("User-Agent"),
        notificationType: type,
        emailCount: emails.length,
        isEnabled,
      }
    );

    res.json({
      success: true,
      data: notificationEmail,
      message: "Notification email settings updated successfully",
    });
  } catch (error) {
    console.error("Error updating notification emails:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notification email settings",
    });
  }
});

// Get notification email settings by type
app.get("/api/admin/notification-emails/:type", auth, async (req, res) => {
  try {
    const { type } = req.params;
    const notificationEmail = await NotificationEmail.findOne({ type });

    if (!notificationEmail) {
      return res.json({ success: true, data: null });
    }

    res.json({ success: true, data: notificationEmail });
  } catch (error) {
    console.error("Error fetching notification email settings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification email settings",
    });
  }
});

// Catch-all route for React app (works in both development and production)
app.get("*", (req, res) => {
  // Skip API routes
  if (req.path.startsWith("/api/")) {
    return res.status(404).json({
      success: false,
      message: "API endpoint not found",
      path: req.path,
      timestamp: new Date().toISOString(),
    });
  }

  // Serve React app for all other routes
  const indexPath = path.join(__dirname, "client/build/index.html");
  if (fs.existsSync(indexPath)) {
    // Set appropriate headers for SPA routing
    const isVercel =
      process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
    res.setHeader("Cache-Control", isVercel ? "public, max-age=0" : "no-cache");

    // Add Vercel-specific headers
    if (isVercel) {
      res.setHeader("X-Vercel-Cache", "HIT");
    }

    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(
          `❌ Error serving index.html for ${req.path}:`,
          err.message
        );
        res.status(500).json({
          success: false,
          message: "Error serving application",
          path: req.path,
          error: err.message,
        });
      }
    });
  } else {
    const isVercel =
      process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
    let errorMessage;

    if (isVercel) {
      errorMessage =
        "Production build not found on Vercel. This will cause 404 errors. Please ensure the build process completed successfully.";
    } else if (process.env.NODE_ENV === "production") {
      errorMessage =
        "Production build not found. Please ensure the build process completed successfully.";
    } else {
      errorMessage =
        "Build not found. Please run 'npm run build:client' first.";
    }

    console.error(`❌ ${errorMessage}`);
    res.status(404).json({
      success: false,
      message: errorMessage,
      path: req.path,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      isVercel: isVercel,
      buildPath: path.join(__dirname, "client/build"),
      buildExists: fs.existsSync(path.join(__dirname, "client/build")),
    });
  }
});

// Server startup for both development and Vercel
const startServer = () => {
  console.log("🚀 Server started successfully!");
  console.log(`📍 Port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);

  // Show appropriate URL based on environment
  if (process.env.NODE_ENV === "production" || process.env.VERCEL === "1") {
    console.log(
      `🔗 Production URL: ${
        process.env.CUSTOM_DOMAIN || "https://prakash-enterprises.vercel.app"
      }`
    );
  } else {
    console.log(`🔗 Development URL: http://localhost:${PORT}`);
  }

  // MongoDB status
  const mongoStatus =
    mongoose.connection.readyState === 1 ? "✅ Connected" : "❌ Disconnected";
  console.log(`🗄️  MongoDB: ${mongoStatus}`);

  // Email configuration status
  const emailStatus = process.env.EMAIL_USER
    ? "✅ Configured"
    : "❌ Not configured";
  console.log(`📧 Email: ${emailStatus}`);

  // Build status
  const buildPath = path.join(__dirname, "client/build");
  const buildStatus = fs.existsSync(buildPath)
    ? "✅ Available"
    : "❌ Not found";
  console.log(`🏗️  Frontend Build: ${buildStatus}`);

  // Production-specific information
  if (process.env.NODE_ENV === "production") {
    console.log("\n🎯 Production Mode Active");
    console.log("🔒 Security features enabled");
    console.log("⚡ Rate limiting: 100 requests per 15 minutes");
    console.log("🛡️  Content Security Policy enabled");
  }

  console.log("\n✨ Server is ready to handle requests!");
};

// Global error handler for uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  if (process.env.NODE_ENV === "production") {
    process.exit(1);
  }
});

// Start server only if not in Vercel serverless environment
if (process.env.VERCEL !== "1") {
  app.listen(PORT, startServer);
} else {
  // For Vercel, just log that we're ready
  startServer();
  console.log("🔄 Running in Vercel serverless environment");
}
