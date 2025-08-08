const mongoose = require("mongoose");
require("dotenv").config();

// Import models
const User = require("./models/User");
const TokenBlacklist = require("./models/TokenBlacklist");

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/prakash-enterprises",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const debugAuth = async () => {
  try {
    console.log("🔍 Debugging Authentication System...\n");

    // Check MongoDB connection
    console.log(
      "📊 MongoDB Connection Status:",
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    );

    // Check if users exist
    const users = await User.find({}).select("email role isActive");
    console.log("👥 Users in database:", users.length);
    users.forEach((user) => {
      console.log(
        `   - ${user.email} (${user.role}) - Active: ${user.isActive}`
      );
    });

    // Check blacklisted tokens
    const blacklistedTokens = await TokenBlacklist.find({});
    console.log("🚫 Blacklisted tokens:", blacklistedTokens.length);
    blacklistedTokens.forEach((token) => {
      console.log(
        `   - Token: ${token.token.substring(0, 20)}... - Expires: ${
          token.expiresAt
        }`
      );
    });

    // Check environment variables
    console.log("\n🔧 Environment Variables:");
    console.log("   - NODE_ENV:", process.env.NODE_ENV);
    console.log("   - JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");
    console.log(
      "   - MONGODB_URI:",
      process.env.MONGODB_URI ? "Set" : "Not set"
    );

    // Test JWT token creation
    if (users.length > 0) {
      const jwt = require("jsonwebtoken");
      const testUser = users[0];
      const testToken = jwt.sign(
        { userId: testUser._id },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );
      console.log("\n🎫 Test JWT Token created successfully");
      console.log("   - Token length:", testToken.length);

      // Verify token
      try {
        const decoded = jwt.verify(
          testToken,
          process.env.JWT_SECRET || "your-secret-key"
        );
        console.log("   - Token verification: SUCCESS");
        console.log("   - Decoded userId:", decoded.userId);
      } catch (error) {
        console.log("   - Token verification: FAILED -", error.message);
      }
    }

    console.log("\n✅ Debug complete!");
  } catch (error) {
    console.error("❌ Debug error:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run the debug script
debugAuth();
