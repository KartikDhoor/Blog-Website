// ==========================================
// FILE: server/modules/analyticsModel.js
// Complete Production Code
// ==========================================

const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  // ===== SESSION & VISITOR IDENTIFICATION =====
  sessionId: {
    type: String,
    required: true,
    index: true,
  },
  visitorId: {
    type: String,
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null,
    index: true,
  },

  // ⭐ NEW: VISITOR FINGERPRINT (for guests)
  visitorFingerprint: {
    type: String,
    default: null,
    index: true,
  },

  // ===== PAGE INFORMATION =====
  pageType: {
    type: String,
    enum: ["blog", "home", "category", "profile", "search", "dashboard", "other"],
    required: true,
    index: true,
  },
  pageUrl: {
    type: String,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blog",
    default: null,
    index: true,
  },
  postTitle: {
    type: String,
    default: null,
  },
  postCategory: {
    type: String,
    default: null,
  },

  // ===== ENGAGEMENT METRICS =====
  timeSpent: {
    type: Number,
    default: 0,
  },
  scrollDepth: {
    type: Number,
    default: 0,
  },
  interaction: {
    liked: {
      type: Boolean,
      default: false,
    },
    commented: {
      type: Boolean,
      default: false,
    },
    copied: {
      type: Boolean,
      default: false,
    },
    shared: {
      type: Boolean,
      default: false,
    },
  },

  // ===== GEOGRAPHIC DATA =====
  ip: {
    type: String,
    required: true,
    index: true,
  },
  country: {
    type: String,
    default: null,
    index: true,
  },
  region: {
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  timezone: {
    type: String,
    default: null,
  },
  latitude: {
    type: Number,
    default: null,
  },
  longitude: {
    type: Number,
    default: null,
  },

  // ===== DEVICE & BROWSER INFORMATION =====
  userAgent: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    enum: ["mobile", "tablet", "desktop"],
    default: "desktop",
    index: true,
  },
  deviceBrand: {
    type: String,
    default: null,
  },
  browser: {
    type: String,
    default: null,
    index: true,
  },
  browserVersion: {
    type: String,
    default: null,
  },
  os: {
    type: String,
    default: null,
    index: true,
  },
  osVersion: {
    type: String,
    default: null,
  },

  // ===== TRAFFIC SOURCE =====
  referrer: {
    type: String,
    default: null,
  },
  trafficSource: {
    type: String,
    enum: [
      "direct",
      "organic_google",
      "organic_bing",
      "organic_other",
      "social_facebook",
      "social_twitter",
      "social_linkedin",
      "social_instagram",
      "social_other",
      "referral",
      "paid_google",
      "paid_facebook",
      "paid_other",
      "email",
      "other",
    ],
    default: "direct",
    index: true,
  },
  utmSource: {
    type: String,
    default: null,
  },
  utmMedium: {
    type: String,
    default: null,
  },
  utmCampaign: {
    type: String,
    default: null,
  },
  utmContent: {
    type: String,
    default: null,
  },
  utmTerm: {
    type: String,
    default: null,
  },

  // ===== TIMING & TIMESTAMPS =====
  entryTime: {
    type: Date,
    default: Date.now,
  },
  exitTime: {
    type: Date,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true,
  },

  // ===== SESSION TRACKING =====
  isNewSession: {
    type: Boolean,
    default: false,
    index: true,
  },
  sessionDuration: {
    type: Number,
    default: null,
  },
  pageViewInSession: {
    type: Number,
    default: 1,
  },

  // ===== PERFORMANCE METRICS =====
  pageLoadTime: {
    type: Number,
    default: null,
  },
  firstContentfulPaint: {
    type: Number,
    default: null,
  },
  largestContentfulPaint: {
    type: Number,
    default: null,
  },

  // ===== ADDITIONAL METADATA =====
  screenResolution: {
    type: String,
    default: null,
  },
  language: {
    type: String,
    default: null,
  },
  isBot: {
    type: Boolean,
    default: false,
  },
});

// ===== INDEXES =====
analyticsSchema.index({ timestamp: -1, pageType: 1 });
analyticsSchema.index({ postId: 1, timestamp: -1 });
analyticsSchema.index({ country: 1, timestamp: -1 });
analyticsSchema.index({ device: 1, timestamp: -1 });
analyticsSchema.index({ trafficSource: 1, timestamp: -1 });
analyticsSchema.index({ sessionId: 1, timestamp: -1 });
analyticsSchema.index({ userId: 1, timestamp: -1 });
analyticsSchema.index({ visitorFingerprint: 1, timestamp: -1 }); // ⭐ new index

module.exports = mongoose.model("analytics", analyticsSchema);
