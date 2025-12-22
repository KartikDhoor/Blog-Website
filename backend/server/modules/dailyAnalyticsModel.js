// ==========================================
// FILE: server/modules/dailyAnalyticsModel.js
// Complete Production Code
// ==========================================

const mongoose = require('mongoose');

const dailyAnalyticsSchema = new mongoose.Schema({
  // ===== DATE IDENTIFIER =====
  date: {
    type: Date,
    required: true,
    unique: true,
    index: true,
  },

  // ===== OVERALL VISITOR STATS =====
  totalVisits: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  newVisitors: {
    type: Number,
    default: 0,
  },
  returningVisitors: {
    type: Number,
    default: 0,
  },
  totalSessions: {
    type: Number,
    default: 0,
  },

  // ===== ENGAGEMENT METRICS =====
  avgTimeOnSite: {
    type: Number,
    default: 0,
  },
  avgSessionDuration: {
    type: Number,
    default: 0,
  },
  avgScrollDepth: {
    type: Number,
    default: 0,
  },
  bounceRate: {
    type: Number,
    default: 0,
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  totalComments: {
    type: Number,
    default: 0,
  },
  avgPagesPerSession: {
    type: Number,
    default: 0,
  },

  // ===== TRAFFIC SOURCE BREAKDOWN =====
  traffic: {
    direct: { type: Number, default: 0 },
    organic_google: { type: Number, default: 0 },
    organic_bing: { type: Number, default: 0 },
    organic_other: { type: Number, default: 0 },
    social_facebook: { type: Number, default: 0 },
    social_twitter: { type: Number, default: 0 },
    social_linkedin: { type: Number, default: 0 },
    social_instagram: { type: Number, default: 0 },
    social_other: { type: Number, default: 0 },
    referral: { type: Number, default: 0 },
    paid_google: { type: Number, default: 0 },
    paid_facebook: { type: Number, default: 0 },
    paid_other: { type: Number, default: 0 },
    email: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },

  // ===== DEVICE BREAKDOWN =====
  deviceBreakdown: {
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
    desktop: { type: Number, default: 0 },
  },

  // ===== BROWSER BREAKDOWN =====
  browserBreakdown: {
    chrome: { type: Number, default: 0 },
    safari: { type: Number, default: 0 },
    firefox: { type: Number, default: 0 },
    edge: { type: Number, default: 0 },
    samsung: { type: Number, default: 0 },
    opera: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },

  // ===== OS BREAKDOWN =====
  osBreakdown: {
    windows: { type: Number, default: 0 },
    macos: { type: Number, default: 0 },
    linux: { type: Number, default: 0 },
    ios: { type: Number, default: 0 },
    android: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },

  // ===== PAGE TYPE BREAKDOWN =====
  pageTypeBreakdown: {
    blog: { type: Number, default: 0 },
    home: { type: Number, default: 0 },
    category: { type: Number, default: 0 },
    profile: { type: Number, default: 0 },
    search: { type: Number, default: 0 },
    dashboard: { type: Number, default: 0 },
    other: { type: Number, default: 0 },
  },

  // ===== TOP POSTS (Top 10) =====
  topPosts: [
    {
      postId: mongoose.Schema.Types.ObjectId,
      postTitle: String,
      views: Number,
      uniqueVisitors: Number,
      avgTimeSpent: Number,
      scrollDepth: Number,
      likes: Number,
      comments: Number,
      bounceRate: Number,
    },
  ],

  // ===== GEOGRAPHIC TOP 20 =====
  topCountries: [
    {
      country: String,
      countryName: String,
      visitors: Number,
      newVisitors: Number,
      pageViews: Number,
      avgTimeSpent: Number,
      bounceRate: Number,
    },
  ],

  // ===== TOP CITIES =====
  topCities: [
    {
      city: String,
      country: String,
      visitors: Number,
      pageViews: Number,
      avgTimeSpent: Number,
    },
  ],

  // ===== SEARCH KEYWORDS (Top 20) =====
  searchKeywords: [
    {
      keyword: String,
      searches: Number,
      clicks: Number,
    },
  ],

  // ===== REFERRERS (Top 10) =====
  topReferrers: [
    {
      referrer: String,
      visits: Number,
      conversions: Number,
    },
  ],

  // ===== PERFORMANCE METRICS =====
  avgPageLoadTime: {
    type: Number,
    default: null,
  },
  avgFirstContentfulPaint: {
    type: Number,
    default: null,
  },
  avgLargestContentfulPaint: {
    type: Number,
    default: null,
  },

  // ===== RETENTION METRICS =====
  newVisitorRetention: {
    type: Number,
    default: 0,
  },
  avgDaysToReturn: {
    type: Number,
    default: 0,
  },

  // ===== CUSTOM GOALS =====
  conversions: {
    newsletter_signup: { type: Number, default: 0 },
    purchase: { type: Number, default: 0 },
    download: { type: Number, default: 0 },
    contact_form: { type: Number, default: 0 },
  },

  // ===== TIMESTAMPS =====
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// ===== INDEXES =====
dailyAnalyticsSchema.index({ date: -1 });
dailyAnalyticsSchema.index({ date: 1, 'topCountries.country': 1 });

module.exports = mongoose.model('dailyAnalytics', dailyAnalyticsSchema);
