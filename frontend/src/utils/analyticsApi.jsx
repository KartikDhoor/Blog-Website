import AxiosInstance from '../component/utils/AxiosInstance';

/**
 * Analytics API Utility Module
 * Handles all analytics-related API calls
 */

// ===== PUBLIC TRACKING ENDPOINT =====
/**
 * Track a page view or user interaction
 * @param {Object} analyticsData - The analytics payload
 * @returns {Promise}
 */
export const trackPageEvent = async (analyticsData) => {
  try {
    const response = await AxiosInstance.post('/analytics/track', {
      pageType: analyticsData.pageType || 'other',
      pageUrl: analyticsData.pageUrl || window.location.pathname,
      postId: analyticsData.postId || null,
      postTitle: analyticsData.postTitle || null,
      postCategory: analyticsData.postCategory || null,
      timeSpent: analyticsData.timeSpent || 0,
      scrollDepth: analyticsData.scrollDepth || 0,
      liked: analyticsData.liked || false,
      commented: analyticsData.commented || false,
      pageLoadTime: analyticsData.pageLoadTime || null,
      firstContentfulPaint: analyticsData.firstContentfulPaint || null,
      largestContentfulPaint: analyticsData.largestContentfulPaint || null,
      screenResolution: analyticsData.screenResolution || `${window.innerWidth}x${window.innerHeight}`,
      language: analyticsData.language || navigator.language,
    });

    return response.data;
  } catch (error) {
    console.error('❌ Analytics tracking error:', error);
    throw error;
  }
};

// ===== ADMIN ENDPOINTS =====
/**
 * Get dashboard analytics overview
 * @param {String} token - JWT token
 * @param {Object} dateRange - { startDate, endDate } (YYYY-MM-DD format)
 * @returns {Promise}
 */
export const getDashboardAnalytics = async (token, dateRange = {}) => {
  try {
    const response = await AxiosInstance.get('/analytics/dashboard', {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      headers: {
        authorization: token,
      },
    });

    return response.data?.data || {};
  } catch (error) {
    console.error('❌ Dashboard analytics error:', error);
    throw error;
  }
};

/**
 * Get detailed analytics for a specific post
 * @param {String} postId - The post ID
 * @param {String} token - JWT token
 * @param {Object} dateRange - { startDate, endDate } (YYYY-MM-DD format)
 * @returns {Promise}
 */
export const getPostAnalytics = async (postId, token, dateRange = {}) => {
  try {
    const response = await AxiosInstance.get(`/analytics/posts/${postId}`, {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      headers: {
        authorization: token,
      },
    });

    return response.data?.data || {};
  } catch (error) {
    console.error(`❌ Post analytics error for ${postId}:`, error);
    throw error;
  }
};

/**
 * Get today's real-time statistics
 * @param {String} token - JWT token
 * @returns {Promise}
 */
export const getTodayAnalytics = async (token) => {
  try {
    const response = await AxiosInstance.get('/analytics/today', {
      headers: {
        authorization: token,
      },
    });

    return response.data?.data || {};
  } catch (error) {
    console.error('❌ Today analytics error:', error);
    throw error;
  }
};

/**
 * Get date range comparison analytics
 * @param {String} token - JWT token
 * @param {String} startDate - Start date (YYYY-MM-DD)
 * @param {String} endDate - End date (YYYY-MM-DD)
 * @returns {Promise}
 */
export const getDateRangeAnalytics = async (token, startDate, endDate) => {
  try {
    const response = await AxiosInstance.get('/analytics/compare', {
      params: { startDate, endDate },
      headers: {
        authorization: token,
      },
    });

    return response.data?.data || {};
  } catch (error) {
    console.error('❌ Date range analytics error:', error);
    throw error;
  }
};

/**
 * Get geographic breakdown
 * @param {String} token - JWT token
 * @param {Object} dateRange - { startDate, endDate }
 * @returns {Promise}
 */
export const getGeographicAnalytics = async (token, dateRange = {}) => {
  try {
    const response = await AxiosInstance.get('/analytics/geographic', {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      headers: {
        authorization: token,
      },
    });

    return response.data?.data || {};
  } catch (error) {
    console.error('❌ Geographic analytics error:', error);
    throw error;
  }
};

/**
 * Get device, browser, and OS statistics
 * @param {String} token - JWT token
 * @param {Object} dateRange - { startDate, endDate }
 * @returns {Promise}
 */
export const getDeviceAnalytics = async (token, dateRange = {}) => {
  try {
    const response = await AxiosInstance.get('/analytics/devices', {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      },
      headers: {
        authorization: token,
      },
    });

    return response.data?.data || {};
  } catch (error) {
    console.error('❌ Device analytics error:', error);
    throw error;
  }
};

/**
 * Get hourly statistics for today
 * @param {String} token - JWT token
 * @returns {Promise}
 */
export const getHourlyAnalytics = async (token) => {
  try {
    const response = await AxiosInstance.get('/analytics/hourly', {
      headers: {
        authorization: token,
      },
    });

    return response.data?.data || [];
  } catch (error) {
    console.error('❌ Hourly analytics error:', error);
    throw error;
  }
};

/**
 * Export analytics data as CSV
 * @param {Object} data - Analytics data to export
 * @param {String} fileName - Name of the CSV file
 */
export const exportAnalyticsAsCSV = (data, fileName = 'analytics') => {
  try {
    // Build CSV content
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Add summary section
    if (data.summary) {
      csvContent += `ANALYTICS SUMMARY\n`;
      csvContent += `Total Visits,${data.summary.totalVisits || 0}\n`;
      csvContent += `Unique Visitors,${data.summary.uniqueVisitors || 0}\n`;
      csvContent += `New Visitors,${data.summary.newVisitors || 0}\n`;
      csvContent += `Returning Visitors,${data.summary.returningVisitors || 0}\n`;
      csvContent += `Avg Time on Site,${data.summary.avgTimeOnSite || 0}s\n`;
      csvContent += `Bounce Rate,${data.summary.bounceRate || 0}%\n`;
      csvContent += `Total Likes,${data.summary.totalLikes || 0}\n`;
      csvContent += `Total Comments,${data.summary.totalComments || 0}\n\n`;
    }

    // Add top posts section
    if (data.topPosts && data.topPosts.length > 0) {
      csvContent += `TOP POSTS\n`;
      csvContent += `Post Title,Views,Unique Visitors,Avg Time (s),Scroll Depth (%),Likes,Comments\n`;
      data.topPosts.forEach((post) => {
        csvContent += `"${post.postTitle}",${post.views},${post.uniqueVisitors},${post.avgTimeSpent},${post.avgScrollDepth},${post.likes},${post.comments}\n`;
      });
      csvContent += '\n';
    }

    // Add traffic breakdown section
    if (data.trafficBreakdown && data.trafficBreakdown.length > 0) {
      csvContent += `TRAFFIC SOURCES\n`;
      csvContent += `Source,Count\n`;
      data.trafficBreakdown.forEach((item) => {
        csvContent += `${item._id},${item.count}\n`;
      });
      csvContent += '\n';
    }

    // Add device breakdown section
    if (data.deviceBreakdown && data.deviceBreakdown.length > 0) {
      csvContent += `DEVICES\n`;
      csvContent += `Device,Count\n`;
      data.deviceBreakdown.forEach((item) => {
        csvContent += `${item._id},${item.count}\n`;
      });
    }

    // Create download link
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `${fileName}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  } catch (error) {
    console.error('❌ Export error:', error);
    throw error;
  }
};

/**
 * Format analytics data for charts
 * @param {Array} data - Raw analytics data
 * @param {String} format - Format type ('pie', 'bar', 'line')
 * @returns {Array}
 */
export const formatChartData = (data, format = 'bar') => {
  if (!Array.isArray(data)) return [];

  switch (format) {
    case 'pie':
      return data.map((item) => ({
        name: item._id || item.name,
        value: item.count || item.views || item.visitors,
      }));
    case 'bar':
      return data.map((item) => ({
        name: item._id || item.name,
        value: item.count || item.views || item.visitors,
      }));
    case 'line':
      return data.map((item) => ({
        time: item._id || item.hour || item.date,
        value: item.visits || item.count || item.views,
      }));
    default:
      return data;
  }
};

/**
 * Calculate growth percentage
 * @param {Number} current - Current value
 * @param {Number} previous - Previous value
 * @returns {Number}
 */
export const calculateGrowth = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

/**
 * Format large numbers with K, M, B suffix
 * @param {Number} num - Number to format
 * @returns {String}
 */
export const formatNumber = (num) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Get time range for analytics
 * @param {String} range - 'today', 'week', 'month', 'year'
 * @returns {Object} { startDate, endDate }
 */
export const getTimeRange = (range = 'month') => {
  const endDate = new Date();
  const startDate = new Date();

  switch (range) {
    case 'today':
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'week':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'month':
      startDate.setDate(startDate.getDate() - 30);
      break;
    case 'year':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate.setDate(startDate.getDate() - 30);
  }

  const formatDate = (date) => date.toISOString().split('T')[0];

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
};

export default {
  trackPageEvent,
  getDashboardAnalytics,
  getPostAnalytics,
  getTodayAnalytics,
  getDateRangeAnalytics,
  getGeographicAnalytics,
  getDeviceAnalytics,
  getHourlyAnalytics,
  exportAnalyticsAsCSV,
  formatChartData,
  calculateGrowth,
  formatNumber,
  getTimeRange,
};
