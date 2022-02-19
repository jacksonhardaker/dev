import React, { createContext, useContext, useEffect, useState } from 'react';
import Router from 'next/router';

export const GoogleAnalyticsContext = createContext();

export const GoogleAnalyticsProvider = ({ children }) => {
  const [analyticsEnabled] = useState(JSON.parse(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED || 'false'));
  const [analyticsInitialized, setAnalyticsInitialized] = useState(null);

  const analyticsDebug = (...args) => {
    console.log(`GA: ${args}`);
  }
  
  const firePageView = url => analytics()('send', 'pageview', url);
  
  const analytics = () => analyticsEnabled ? window.ga : analyticsDebug;
  
  const value = {
    analytics,
    firePageView,
  };

  useEffect(() => {
    if (analyticsInitialized) {
      analytics()('create', 'UA-164498009-1', 'auto');
      firePageView();

      Router.events.on('routeChangeComplete', firePageView);
    }
  }, [analyticsInitialized]);

  useEffect(() => {
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

    setAnalyticsInitialized(true);
  }, []);

  return (
    <GoogleAnalyticsContext.Provider {...{ value }}>
      {children}
    </GoogleAnalyticsContext.Provider>
  );
};

const useGoogleAnalytics = () => useContext(GoogleAnalyticsContext);

export default useGoogleAnalytics;
