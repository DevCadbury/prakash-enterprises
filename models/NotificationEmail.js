const mongoose = require("mongoose");

const notificationEmailSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["contact", "loan-application", "quote-request", "promotion", "system"],
      unique: true,
    },
    emails: [{
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    }],
    isEnabled: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
notificationEmailSchema.index({ type: 1 });
notificationEmailSchema.index({ "emails.email": 1 });

module.exports = mongoose.model("NotificationEmail", notificationEmailSchema); 