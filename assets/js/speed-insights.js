/**
 * Vercel Speed Insights Integration
 * This script initializes Vercel Speed Insights for tracking web performance metrics.
 * Documentation: https://vercel.com/docs/speed-insights
 */

import { injectSpeedInsights } from '../../node_modules/@vercel/speed-insights/dist/index.mjs';

// Initialize Speed Insights
// The debug option is automatically enabled in development mode
injectSpeedInsights({
  // Enable debug logging in development
  debug: true,
  
  // Optional: Sample rate (1 = 100% of events are sent)
  // sampleRate: 1,
  
  // Optional: Middleware to modify or filter events before sending
  // beforeSend: (event) => {
  //   // You can filter or modify events here
  //   // Return null to cancel the event
  //   return event;
  // }
});

console.log('Vercel Speed Insights initialized');
