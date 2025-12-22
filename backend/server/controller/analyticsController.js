// ==========================================
// FILE: server/controller/analyticsController.js
// COMPLETE PRODUCTION CODE - All 8 Endpoints
// ==========================================

const Analytics = require("../modules/analyticsModel");
const DailyAnalytics = require("../modules/dailyAnalyticsModel");
const geoip = require("geoip-lite");
const UAParser = require("ua-parser-js");
const crypto = require("crypto");

// ===== HELPER FUNCTIONS =====

// Parse user agent to get device/browser/os info
const parseUserAgent = (userAgentString) => {
  const parser = new UAParser(userAgentString);
  const result = parser.getResult();

  return {
    device: result.device.type || "desktop",
    deviceBrand: result.device.vendor || null,
    browser: result.browser.name || null,
    browserVersion: result.browser.version || null,
    os: result.os.name || null,
    osVersion: result.os.version || null,
  };
};

// Get geolocation from IP
const getGeoFromIP = (ip) => {
  try {
    const geo = geoip.lookup(ip);
    if (!geo) {
      return {
        country: null,
        region: null,
        city: null,
        timezone: null,
        latitude: null,
        longitude: null,
      };
    }

    return {
      country: geo.country,
      region: geo.region,
      city: geo.city,
      timezone: geo.timezone,
      latitude: geo.ll ? geo.ll[0] : null,
      longitude: geo.ll ? geo.ll[1] : null,
    };
  } catch (err) {
    console.error("Geolocation error:", err);
    return {
      country: null,
      region: null,
      city: null,
      timezone: null,
      latitude: null,
      longitude: null,
    };
  }
};

// Detect traffic source from referrer and UTM parameters
const detectTrafficSource = (referrer, utmSource, utmMedium) => {
  if (utmSource) {
    if (utmSource.toLowerCase().includes("google")) return "paid_google";
    if (utmSource.toLowerCase().includes("facebook")) return "paid_facebook";
    if (utmMedium === "email") return "email";
  }

  if (!referrer) return "direct";

  const referrerLower = referrer.toLowerCase();

  if (referrerLower.includes("google")) return "organic_google";
  if (referrerLower.includes("bing")) return "organic_bing";
  if (referrerLower.includes("facebook")) return "social_facebook";
  if (referrerLower.includes("twitter")) return "social_twitter";
  if (referrerLower.includes("linkedin")) return "social_linkedin";
  if (referrerLower.includes("instagram")) return "social_instagram";
  if (referrerLower.includes("reddit")) return "social_other";
  if (referrerLower.includes("youtube")) return "social_other";

  return "referral";
};

// Detect if user agent is a bot
const isBot = (userAgent) => {
  const botPatterns = [
    "bot",
    "crawler",
    "spider",
    "scraper",
    "curl",
    "wget",
    "googlebot",
    "bingbot",
    "slurp",
    "duckduckbot",
    "baiduspider",
    "yandexbot",
    "facebookexternalhit",
    "twitterbot",
    "linkedinbot",
    "whatsapp",
    "telegram",
    "skype",
  ];

  const userAgentLower = userAgent.toLowerCase();
  return botPatterns.some((pattern) => userAgentLower.includes(pattern));
};

// Generate or retrieve session ID
const getOrCreateSessionId = (req, res) => {
  let sessionId = req.cookies?.sessionId;

  if (!sessionId) {
    sessionId = crypto.randomBytes(16).toString("hex");
    res.cookie("sessionId", sessionId, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return sessionId;
};

// ===== ENDPOINT 1: TRACK EVENT =====
// POST /analytics/track
const trackEvent = async (req, res) => {
  try {
    const {
      pageType,
      pageUrl,
      postId,
      postTitle,
      postCategory,
      timeSpent,
      scrollDepth,
      liked,
      commented,
      pageLoadTime,
      firstContentfulPaint,
      largestContentfulPaint,
      screenResolution,
      language,
    } = req.body;

    if (!pageType || !pageUrl) {
      return res.status(400).json({
        success: false,
        message: "pageType and pageUrl are required",
      });
    }

    // IP & session
    const ip = req.ip || req.connection.remoteAddress || "127.0.0.1";
    const sessionId = getOrCreateSessionId(req, res);

    // New session cookie
    const isNewSession = !req.cookies?.hasAnalyticsCookie;
    res.cookie("hasAnalyticsCookie", "true", {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // User agent
    const userAgent = req.headers["user-agent"] || "";
    if (isBot(userAgent)) {
      return res.json({ success: true, message: "Bot detected, not tracked" });
    }

    // ⭐ Visitor fingerprint (for guests)
    const visitorFingerprint = `${ip}-${userAgent}`;

    const uaData = parseUserAgent(userAgent);
    const geoData = getGeoFromIP(ip);

    const referrer = req.headers.referer || null;
    const utmSource = req.query?.utm_source || null;
    const utmMedium = req.query?.utm_medium || null;
    const utmCampaign = req.query?.utm_campaign || null;
    const utmContent = req.query?.utm_content || null;
    const utmTerm = req.query?.utm_term || null;

    const trafficSource = detectTrafficSource(referrer, utmSource, utmMedium);

    const event = new Analytics({
      sessionId,
      visitorId: sessionId,
      userId: req.decoded?.id || null,
      visitorFingerprint,

      pageType,
      pageUrl,
      postId: postId || null,
      postTitle: postTitle || null,
      postCategory: postCategory || null,

      timeSpent: timeSpent || 0,
      scrollDepth: scrollDepth || 0,
      interaction: {
        liked: liked || false,
        commented: commented || false,
        copied: false,
        shared: false,
      },

      ip,
      country: geoData.country,
      region: geoData.region,
      city: geoData.city,
      timezone: geoData.timezone,
      latitude: geoData.latitude,
      longitude: geoData.longitude,

      userAgent,
      device: uaData.device,
      deviceBrand: uaData.deviceBrand,
      browser: uaData.browser,
      browserVersion: uaData.browserVersion,
      os: uaData.os,
      osVersion: uaData.osVersion,

      referrer,
      trafficSource,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,

      entryTime: new Date(),
      timestamp: new Date(),

      isNewSession,
      pageLoadTime: pageLoadTime || null,
      firstContentfulPaint: firstContentfulPaint || null,
      largestContentfulPaint: largestContentfulPaint || null,
      screenResolution: screenResolution || null,
      language: language || null,
      isBot: false,
    });

    await event.save();

    res.json({
      success: true,
      message: "Event tracked successfully",
      data: { sessionId },
    });
  } catch (err) {
    console.error("Track event error:", err);
    res.status(500).json({
      success: false,
      message: "Error tracking event",
      error: err.message,
    });
  }
};

// ===== Helper: unique person expression =====
const uniquePersonExpr = {
  $cond: [
    { $ne: ["$userId", null] },
    { user: "$userId" },
    { fingerprint: "$visitorFingerprint" },
  ],
};

// ===== ENDPOINT 2: GET DASHBOARD =====
// GET /analytics/dashboard (Admin only)
const getDashboard = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);

    const start = startDate
      ? new Date(startDate)
      : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Summary
    const statsArray = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: uniquePersonExpr },
          newVisitors: {
            $sum: { $cond: ["$isNewSession", 1, 0] },
          },
          avgTimeOnSite: { $avg: "$timeSpent" },
          avgScrollDepth: { $avg: "$scrollDepth" },
          totalLikes: {
            $sum: { $cond: ["$interaction.liked", 1, 0] },
          },
          totalComments: {
            $sum: { $cond: ["$interaction.commented", 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVisits: 1,
          uniqueVisitorsCount: { $size: "$uniqueVisitors" },
          uniqueVisitors: "$uniqueVisitors",
          newVisitors: 1,
          returningVisitors: {
            $subtract: [{ $size: "$uniqueVisitors" }, "$newVisitors"],
          },
          avgTimeOnSite: { $round: ["$avgTimeOnSite", 2] },
          avgScrollDepth: { $round: ["$avgScrollDepth", 2] },
          bounceRate: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$newVisitors", "$totalVisits"] },
                  100,
                ],
              },
              2,
            ],
          },
          totalLikes: 1,
          totalComments: 1,
        },
      },
      {
        $project: {
          totalVisits: 1,
          uniqueVisitors: "$uniqueVisitorsCount",
          newVisitors: 1,
          returningVisitors: 1,
          avgTimeOnSite: 1,
          avgScrollDepth: 1,
          bounceRate: 1,
          totalLikes: 1,
          totalComments: 1,
        },
      },
    ]);

    const summary = statsArray[0] || {};

    // Traffic source breakdown (sessions are fine here)
    const trafficBreakdown = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$trafficSource",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Device breakdown
    const deviceBreakdown = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$device",
          count: { $sum: 1 },
        },
      },
    ]);

    // Browser breakdown
    const browserBreakdown = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$browser",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // Top countries (unique people)
    const topCountries = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          country: { $ne: null },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$country",
          visitors: { $addToSet: uniquePersonExpr },
          pageViews: { $sum: 1 },
          avgTimeSpent: { $avg: "$timeSpent" },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          visitors: { $size: "$visitors" },
          pageViews: 1,
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
        },
      },
      { $sort: { visitors: -1 } },
      { $limit: 20 },
    ]);

    // Top posts
    const topPosts = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          pageType: "blog",
          postId: { $ne: null },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$postId",
          postTitle: { $first: "$postTitle" },
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: uniquePersonExpr },
          avgTimeSpent: { $avg: "$timeSpent" },
          avgScrollDepth: { $avg: "$scrollDepth" },
          likes: {
            $sum: { $cond: ["$interaction.liked", 1, 0] },
          },
          comments: {
            $sum: { $cond: ["$interaction.commented", 1, 0] },
          },
        },
      },
      {
        $project: {
          postId: "$_id",
          postTitle: 1,
          views: 1,
          uniqueVisitors: { $size: "$uniqueVisitors" },
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
          avgScrollDepth: { $round: ["$avgScrollDepth", 2] },
          likes: 1,
          comments: 1,
          _id: 0,
        },
      },
      { $sort: { views: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      success: true,
      data: {
        summary,
        trafficBreakdown,
        deviceBreakdown,
        browserBreakdown,
        topCountries,
        topPosts,
        dateRange: { start, end },
      },
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard",
      error: err.message,
    });
  }
};

// ===== ENDPOINT 3: GET POST ANALYTICS =====
// GET /analytics/posts/:postId (Admin only)
const getPostAnalytics = async (req, res) => {
  try {
    const { postId } = req.params;
    const { startDate, endDate } = req.query;

    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);
    const start = startDate
      ? new Date(startDate)
      : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    const postStats = await Analytics.aggregate([
      {
        $match: {
          postId: require("mongoose").Types.ObjectId(postId),
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: null,
          totalViews: { $sum: 1 },
          uniqueVisitors: { $addToSet: uniquePersonExpr },
          avgTimeSpent: { $avg: "$timeSpent" },
          avgScrollDepth: { $avg: "$scrollDepth" },
          totalLikes: { $sum: { $cond: ["$interaction.liked", 1, 0] } },
          totalComments: { $sum: { $cond: ["$interaction.commented", 1, 0] } },
          bounceCount: {
            $sum: { $cond: ["$isNewSession", 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalViews: 1,
          uniqueVisitors: { $size: "$uniqueVisitors" },
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
          avgScrollDepth: { $round: ["$avgScrollDepth", 2] },
          totalLikes: 1,
          totalComments: 1,
          bounceRate: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$bounceCount", "$totalViews"] },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
    ]);

    const viewsOverTime = await Analytics.aggregate([
      {
        $match: {
          postId: require("mongoose").Types.ObjectId(postId),
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          views: { $sum: 1 },
          avgTimeSpent: { $avg: "$timeSpent" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const geoBreakdown = await Analytics.aggregate([
      {
        $match: {
          postId: require("mongoose").Types.ObjectId(postId),
          timestamp: { $gte: start, $lte: end },
          country: { $ne: null },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$country",
          views: { $sum: 1 },
          avgTimeSpent: { $avg: "$timeSpent" },
        },
      },
      { $sort: { views: -1 } },
      { $limit: 15 },
    ]);

    res.json({
      success: true,
      data: {
        stats: postStats || {},
        viewsOverTime,
        geoBreakdown,
        dateRange: { start, end },
      },
    });
  } catch (err) {
    console.error("Post analytics error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching post analytics",
      error: err.message,
    });
  }
};

// ===== ENDPOINT 4: GET TODAY'S STATS =====
// GET /analytics/today (Admin only)
const getTodayStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const stats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: today, $lt: tomorrow },
          isBot: false,
        },
      },
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: uniquePersonExpr },
          avgTimeOnSite: { $avg: "$timeSpent" },
          avgScrollDepth: { $avg: "$scrollDepth" },
          totalLikes: { $sum: { $cond: ["$interaction.liked", 1, 0] } },
          totalComments: { $sum: { $cond: ["$interaction.commented", 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          totalVisits: 1,
          uniqueVisitors: { $size: "$uniqueVisitors" },
          avgTimeOnSite: { $round: ["$avgTimeOnSite", 2] },
          avgScrollDepth: { $round: ["$avgScrollDepth", 2] },
          totalLikes: 1,
          totalComments: 1,
        },
      },
    ]);

    res.json({
      success: true,
      data: stats || {},
    });
  } catch (err) {
    console.error("Today stats error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching today stats",
      error: err.message,
    });
  }
};

// ===== ENDPOINT 5: GET DATE RANGE COMPARISON =====
// GET /analytics/compare (Admin only)
const getDateRangeStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "startDate and endDate are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const stats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$timestamp" },
          },
          visits: { $sum: 1 },
          visitors: { $addToSet: uniquePersonExpr },
          avgTimeOnSite: { $avg: "$timeSpent" },
          avgScrollDepth: { $avg: "$scrollDepth" },
          likes: { $sum: { $cond: ["$interaction.liked", 1, 0] } },
          comments: { $sum: { $cond: ["$interaction.commented", 1, 0] } },
        },
      },
      {
        $project: {
          _id: 1,
          visits: 1,
          visitors: { $size: "$visitors" },
          avgTimeOnSite: { $round: ["$avgTimeOnSite", 2] },
          avgScrollDepth: { $round: ["$avgScrollDepth", 2] },
          likes: 1,
          comments: 1,
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      success: true,
      data: {
        stats,
        dateRange: { start, end },
      },
    });
  } catch (err) {
    console.error("Date range stats error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching date range stats",
      error: err.message,
    });
  }
};

// ===== ENDPOINT 6: GET GEOGRAPHIC STATS =====
// GET /analytics/geographic (Admin only)
const getGeographicStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);
    const start = startDate
      ? new Date(startDate)
      : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    const geoStats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          country: { $ne: null },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$country",
          visitors: { $addToSet: uniquePersonExpr },
          pageViews: { $sum: 1 },
          avgTimeSpent: { $avg: "$timeSpent" },
          avgScrollDepth: { $avg: "$scrollDepth" },
          bounceCount: {
            $sum: { $cond: ["$isNewSession", 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          visitors: { $size: "$visitors" },
          pageViews: 1,
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
          avgScrollDepth: { $round: ["$avgScrollDepth", 2] },
          bounceRate: {
            $round: [
              {
                $multiply: [
                  { $divide: ["$bounceCount", "$pageViews"] },
                  100,
                ],
              },
              2,
            ],
          },
        },
      },
      { $sort: { visitors: -1 } },
      { $limit: 50 },
    ]);

    res.json({
      success: true,
      data: {
        countries: geoStats,
        dateRange: { start, end },
      },
    });
  } catch (err) {
    console.error("Geographic stats error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching geographic stats",
      error: err.message,
    });
  }
};

// ===== ENDPOINT 7: GET DEVICE/BROWSER STATS =====
// GET /analytics/devices (Admin only)
const getDeviceStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const end = endDate ? new Date(endDate) : new Date();
    end.setHours(23, 59, 59, 999);
    const start = startDate
      ? new Date(startDate)
      : new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Device breakdown
    const deviceStats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$device",
          visitors: { $addToSet: uniquePersonExpr },
          pageViews: { $sum: 1 },
          avgTimeSpent: { $avg: "$timeSpent" },
        },
      },
      {
        $project: {
          _id: 0,
          device: "$_id",
          visitors: { $size: "$visitors" },
          pageViews: 1,
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
        },
      },
    ]);

    // Browser breakdown
    const browserStats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          browser: { $ne: null },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$browser",
          visitors: { $addToSet: uniquePersonExpr },
          pageViews: { $sum: 1 },
          avgTimeSpent: { $avg: "$timeSpent" },
        },
      },
      {
        $project: {
          _id: 0,
          browser: "$_id",
          visitors: { $size: "$visitors" },
          pageViews: 1,
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
        },
      },
      { $sort: { pageViews: -1 } },
      { $limit: 15 },
    ]);

    // OS breakdown
    const osStats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: start, $lte: end },
          os: { $ne: null },
          isBot: false,
        },
      },
      {
        $group: {
          _id: "$os",
          visitors: { $addToSet: uniquePersonExpr },
          pageViews: { $sum: 1 },
          avgTimeSpent: { $avg: "$timeSpent" },
        },
      },
      {
        $project: {
          _id: 0,
          os: "$_id",
          visitors: { $size: "$visitors" },
          pageViews: 1,
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
        },
      },
      { $sort: { pageViews: -1 } },
    ]);

    res.json({
      success: true,
      data: {
        devices: deviceStats,
        browsers: browserStats,
        operatingSystems: osStats,
        dateRange: { start, end },
      },
    });
  } catch (err) {
    console.error("Device stats error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching device stats",
      error: err.message,
    });
  }
};

// ===== ENDPOINT 8: GET HOURLY STATS =====
// GET /analytics/hourly (Admin only)
const getHourlyStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const hourlyStats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: today, $lt: tomorrow },
          isBot: false,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%H:00", date: "$timestamp" },
          },
          visits: { $sum: 1 },
          visitors: { $addToSet: uniquePersonExpr },
          avgTimeSpent: { $avg: "$timeSpent" },
        },
      },
      {
        $project: {
          _id: 0,
          hour: "$_id",
          visits: 1,
          visitors: { $size: "$visitors" },
          avgTimeSpent: { $round: ["$avgTimeSpent", 2] },
        },
      },
      { $sort: { hour: 1 } },
    ]);

    res.json({
      success: true,
      data: hourlyStats,
    });
  } catch (err) {
    console.error("Hourly stats error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching hourly stats",
      error: err.message,
    });
  }
};

module.exports = {
  trackEvent,
  getDashboard,
  getPostAnalytics,
  getTodayStats,
  getDateRangeStats,
  getGeographicStats,
  getDeviceStats,
  getHourlyStats,
};
