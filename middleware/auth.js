const jwt = require("jsonwebtoken");
const User = require("../models/User");
const TokenBlacklist = require("../models/TokenBlacklist");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Check if token is blacklisted
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "Token has been revoked.",
      });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or user inactive.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions.",
      });
    }

    next();
  };
};

module.exports = { auth, requireRole };
