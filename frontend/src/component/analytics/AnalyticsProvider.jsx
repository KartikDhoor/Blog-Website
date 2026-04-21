import { createContext, useContext, useEffect, useCallback } from 'react';
import { useAnalytics } from '../../useAnalytics';

// ✅ CREATE THE CONTEXT FIRST
const AnalyticsContext = createContext();

// ✅ PROVIDER COMPONENT
export const AnalyticsProvider = ({ children }) => {
  const analytics = useAnalytics();

  // Initialize tracking on mount
  useEffect(() => {
    // Track page view immediately
    return () => {
    };
  }, []);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

// ✅ CUSTOM HOOK TO USE CONTEXT
export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    console.error('❌ useAnalyticsContext must be used within AnalyticsProvider');
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }
  return context;
};

/**
 * HOC for wrapping components that need analytics
 */
export const withAnalytics = (Component) => {
  return (props) => {
    const analytics = useAnalyticsContext();
    return <Component {...props} analytics={analytics} />;
  };
};
