// ==========================================
// FILE: server/routes/analyticsRoutes.js
// COMPLETE PRODUCTION CODE
// ==========================================

const express = require('express');
const router = express.Router();
const analyticsController = require('../controller/analyticsController');
const jwtChecker = require('../config/jwtChecker');

// ===== PUBLIC ENDPOINT (No JWT required) =====
// This endpoint is called from frontend on every page load
router.post('/track', analyticsController.trackEvent);

// ===== ADMIN ENDPOINTS (JWT + Admin check required) =====
// Apply admin middleware to all routes below
router.use('/', jwtChecker.dashboard);

// Dashboard overview
router.get('/dashboard', analyticsController.getDashboard);

// Specific post analytics
router.get('/posts/:postId', analyticsController.getPostAnalytics);

// Today's real-time stats
router.get('/today', analyticsController.getTodayStats);

// Date range comparison
router.get('/compare', analyticsController.getDateRangeStats);

// Geographic breakdown
router.get('/geographic', analyticsController.getGeographicStats);

// Device/browser/OS breakdown
router.get('/devices', analyticsController.getDeviceStats);

// Hourly breakdown (today)
router.get('/hourly', analyticsController.getHourlyStats);

// 404 handler
router.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: 'Analytics endpoint not found',
  });
});

module.exports = router;
