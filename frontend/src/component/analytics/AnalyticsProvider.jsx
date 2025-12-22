import { createContext, useContext } from 'react';
import { useAnalytics } from '../../useAnalytics';

// ✅ CREATE THE CONTEXT FIRST
const AnalyticsContext = createContext();

// ✅ PROVIDER COMPONENT
export const AnalyticsProvider = ({ children }) => {
  const analytics = useAnalytics();

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
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }
  return context;
};
