import { useEffect, useRef, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AxiosInstance from './component/utils/AxiosInstance';
import { useAuth } from './component/AuthContext';

export const useAnalytics = () => {
  const location = useLocation();
  const { user, token } = useAuth();
  
  const [pageData, setPageData] = useState({
    pageType: 'other',
    pageUrl: '',
    postId: null,
    postTitle: null,
    postCategory: null,
  });
  
  // ✅ Refs for stable tracking
  const startTimeRef = useRef(Date.now());
  const hasTrackedRef = useRef(false);
  const scrollDepthRef = useRef(0);
  const pageKeyRef = useRef('');
  const likedRef = useRef(false);
  const commentedRef = useRef(false);
  const scrollHandlerRef = useRef(null);
  const currentPageDataRef = useRef(pageData);

  // Update pageData ref
  useEffect(() => {
    currentPageDataRef.current = pageData;
  }, [pageData]);

  // Stable page type detection
  const getPageType = useCallback((pathname) => {
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/category')) return 'category';
    if (pathname.startsWith('/profile')) return 'profile';
    if (pathname.startsWith('/dashboard')) return 'dashboard';
    if (pathname.includes('search')) return 'search';
    return 'other';
  }, []);

  // Stable scroll tracker
  const trackScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollDepthRef.current = Math.max(scrollDepthRef.current, Math.round(scrollPercent));
    }
  }, []);

  // ✅ Track page entry (5s after arrival)
  const trackPageView = useCallback(async () => {
    if (hasTrackedRef.current) {
      return;
    }

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    if (timeSpent < 5) {
      return;
    }

    try {
      const payload = {
        pageType: currentPageDataRef.current.pageType,
        pageUrl: currentPageDataRef.current.pageUrl,
        postId: currentPageDataRef.current.postId,
        postTitle: currentPageDataRef.current.postTitle,
        postCategory: currentPageDataRef.current.postCategory,
        timeSpent,
        scrollDepth: scrollDepthRef.current,
        liked: likedRef.current,
        commented: commentedRef.current,
        pageLoadTime: performance?.timing?.loadEventEnd - performance?.timing?.navigationStart || null,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
      };

      await AxiosInstance.post('/analytics/track', payload);
      
      hasTrackedRef.current = true;
    } catch (error) {
      console.error('❌ Entry tracking failed:', error);
    }
  }, []);

  // ✅ IMMEDIATE Like tracking (separate event)
  const trackLikeImmediately = useCallback(async () => {
    if (likedRef.current) {
      return;
    }

    likedRef.current = true;
    
    try {
      const payload = {
        pageType: currentPageDataRef.current.pageType,
        pageUrl: currentPageDataRef.current.pageUrl,
        postId: currentPageDataRef.current.postId,
        postTitle: currentPageDataRef.current.postTitle,
        postCategory: currentPageDataRef.current.postCategory,
        timeSpent: Math.round((Date.now() - startTimeRef.current) / 1000),
        scrollDepth: scrollDepthRef.current,
        liked: true,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        eventType: 'like',
      };
      
      await AxiosInstance.post('/analytics/track', payload);
    } catch (error) {
      console.error('❌ Like tracking failed:', error);
    }
  }, []);

  // ✅ IMMEDIATE Comment tracking (separate event)
  const trackCommentImmediately = useCallback(async () => {
    if (commentedRef.current) {
      return;
    }

    commentedRef.current = true;
    
    try {
      const payload = {
        pageType: currentPageDataRef.current.pageType,
        pageUrl: currentPageDataRef.current.pageUrl,
        postId: currentPageDataRef.current.postId,
        postTitle: currentPageDataRef.current.postTitle,
        postCategory: currentPageDataRef.current.postCategory,
        timeSpent: Math.round((Date.now() - startTimeRef.current) / 1000),
        scrollDepth: scrollDepthRef.current,
        commented: true,
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        eventType: 'comment',
      };
      
      await AxiosInstance.post('/analytics/track', payload);
    } catch (error) {
      console.error('❌ Comment tracking failed:', error);
    }
  }, []);

  // ✅ MAIN EFFECT: Page entry tracking
  useEffect(() => {
    const currentPageKey = `${location.pathname}-${location.search}`;

    // Reset for new page
    pageKeyRef.current = currentPageKey;
    hasTrackedRef.current = false;
    startTimeRef.current = Date.now();
    scrollDepthRef.current = 0;
    likedRef.current = false;
    commentedRef.current = false;

    // Update page data
    const newPageData = {
      pageType: getPageType(location.pathname),
      pageUrl: location.pathname + location.search,
      postId: pageData.postId,
      postTitle: pageData.postTitle,
      postCategory: pageData.postCategory,
    };
    setPageData(newPageData);

    // ✅ Track entry after 5s
    const entryTimeout = setTimeout(() => {
      if (!hasTrackedRef.current) {
        trackPageView();
      }
    }, 5000);

    // Scroll tracking
    scrollHandlerRef.current = trackScroll;
    window.addEventListener('scroll', scrollHandlerRef.current, { passive: true });

    return () => {
      clearTimeout(entryTimeout);
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
    };
  }, [location.pathname, location.search, trackPageView]);

  // ✅ Public API for Like
  const trackLike = useCallback(() => {
    trackLikeImmediately();
  }, [trackLikeImmediately]);

  // ✅ Public API for Comment
  const trackComment = useCallback(() => {
    trackCommentImmediately();
  }, [trackCommentImmediately]);

  const setPostData = useCallback((postId, postTitle, postCategory = null) => {
    setPageData(prev => ({
      ...prev,
      postId,
      postTitle,
      postCategory,
    }));
  }, []);

  return {
    trackLike,
    trackComment,
    setPostData,
    pageData,
  };
};
