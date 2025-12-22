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
      console.log('⏭️ Already tracked page entry');
      return;
    }

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    if (timeSpent < 5) {
      console.log(`⏳ Entry wait... (${timeSpent}s)`);
      return;
    }

    try {
      const payload = {
        pageType: currentPageDataRef.current.pageType,
        pageUrl: currentPageDataRef.current.pageUrl,
        postId: currentPageDataRef.current.postId,
        postTitle: currentPageDataRef.current.postTitle,
        timeSpent,
        scrollDepth: scrollDepthRef.current,
        liked: likedRef.current,
        commented: commentedRef.current,  // ✅ Captures comments up to this point
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
      };

      console.log('📥 ENTRY Analytics:', {
        pageKey: pageKeyRef.current,
        timeSpent,
        comments: commentedRef.current ? 1 : 0,
        pageType: currentPageDataRef.current.pageType,
      });

      await AxiosInstance.post('/analytics/track', payload);
      
      hasTrackedRef.current = true;
      console.log('✅ Page entry tracked');
    } catch (error) {
      console.error('❌ Entry tracking failed:', error);
    }
  }, []);

  // ✅ IMMEDIATE Comment tracking (separate event)
  const trackCommentImmediately = useCallback(async () => {
    if (commentedRef.current) {
      console.log('💬 Comment already tracked');
      return;
    }

    commentedRef.current = true;
    
    try {
      const payload = {
        pageType: currentPageDataRef.current.pageType,
        pageUrl: currentPageDataRef.current.pageUrl,
        postId: currentPageDataRef.current.postId,
        postTitle: currentPageDataRef.current.postTitle,
        timeSpent: Math.round((Date.now() - startTimeRef.current) / 1000),
        scrollDepth: scrollDepthRef.current,
        interaction: {
          commented: true,  // ✅ Explicit comment event
        },
        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
        language: navigator.language,
        eventType: 'comment',  // ✅ Special event type
      };

      console.log('💬 IMMEDIATE Comment tracked:', payload);
      await AxiosInstance.post('/analytics/track', payload);
      
      console.log('✅ Comment tracked INSTANTLY');
    } catch (error) {
      console.error('❌ Comment tracking failed:', error);
    }
  }, []);

  // ✅ MAIN EFFECT: Page entry tracking
  useEffect(() => {
    const currentPageKey = `${location.pathname}-${location.search}`;
    
    console.log('🚀 ENTERED:', currentPageKey);

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
    };
    setPageData(newPageData);

    // ✅ Track entry after 5s
    const entryTimeout = setTimeout(() => {
      if (!hasTrackedRef.current) {
        console.log('🎯 Tracking page entry...');
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

  // ✅ Public API
  const trackLike = useCallback(() => {
    likedRef.current = true;
    console.log('👍 Like interaction marked');
  }, []);

  // ✅ FIXED: Track comments IMMEDIATELY
  const trackComment = useCallback(async () => {
    console.log('💬 Comment button clicked');
    await trackCommentImmediately();  // ✅ Instant tracking
  }, [trackCommentImmediately]);

  const setPostData = useCallback((postId, postTitle) => {
    setPageData(prev => ({
      ...prev,
      postId,
      postTitle,
    }));
    console.log('📝 Post updated:', { postId, postTitle });
  }, []);

  return {
    trackLike,
    trackComment,      // ✅ Now works instantly!
    setPostData,
    pageData,
  };
};
