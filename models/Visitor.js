const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    page: {
      type: String,
      required: true,
      default: "home",
    },
    referrer: {
      type: String,
      default: "",
    },
    device: {
      type: String,
      enum: ["desktop", "mobile", "tablet"],
      default: "desktop",
    },
    browser: {
      type: String,
      default: "",
    },
    os: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    sessionId: {
      type: String,
      required: true,
    },
    visitDuration: {
      type: Number,
      default: 0, // in seconds
    },
    isReturning: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
visitorSchema.index({ createdAt: -1 });
visitorSchema.index({ page: 1, createdAt: -1 });
visitorSchema.index({ device: 1, createdAt: -1 });

module.exports = mongoose.model("Visitor", visitorSchema);
