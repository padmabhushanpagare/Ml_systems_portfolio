// Utility for Google Analytics Event Tracking
export const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
  // Check if gtag is available (initialized in index.html)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};
