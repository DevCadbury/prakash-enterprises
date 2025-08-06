const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
      enum: [
        "user_created",
        "user_deleted",
        "user_updated",
        "contact_replied",
        "contact_updated",
        "promotion_sent",
        "notification_email_updated",
        "login",
        "logout",
        "password_reset",
        "role_changed",
      ],
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    targetContact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
    },
    details: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
adminLogSchema.index({ createdAt: -1 });
adminLogSchema.index({ performedBy: 1, createdAt: -1 });
adminLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model("AdminLog", adminLogSchema);
