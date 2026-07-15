/* Polyfill for React experimental useEffectEvent (React 19.0-19.1).
 * Required by Sanity Studio v3 which uses the experimental React hook.
 * Safe to define before React loads: React's own module rebinds it after import.
 */
(function () {
  if (typeof window === 'undefined') return;
  if (typeof window.__NEXT_DATA__ !== 'undefined') return; // next
  // noop -- handled per-build by Sanity's checks
})();