// src/utils/analyticsApi.js
import AxiosInstance from './AxiosInstance';

export const analyticsApi = {
  // Dashboard overview
  getDashboard: (startDate, endDate) => 
    AxiosInstance.get(`/analytics/dashboard?startDate=${startDate}&endDate=${endDate}`),

  // Today's real-time stats
  getTodayStats: () => 
    AxiosInstance.get('/analytics/today'),

  // Single post analytics
  getPostAnalytics: (postId, startDate, endDate) => 
    AxiosInstance.get(`/analytics/posts/${postId}${startDate ? `?startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`),

  // Geographic breakdown
  getGeographic: (startDate, endDate) => 
    AxiosInstance.get(`/analytics/geographic${startDate ? `?startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`),

  // Device/browser stats
  getDevices: (startDate, endDate) => 
    AxiosInstance.get(`/analytics/devices${startDate ? `?startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`),

  // Hourly breakdown
  getHourly: () => 
    AxiosInstance.get('/analytics/hourly'),

  // Date range comparison
  getCompare: (startDate, endDate) => 
    AxiosInstance.get(`/analytics/compare?startDate=${startDate}&endDate=${endDate}`),
};
