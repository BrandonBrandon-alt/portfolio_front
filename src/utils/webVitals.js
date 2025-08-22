// Basic Web Vitals collection (CLS, LCP, INP, FCP, TTFB)
// Using static import (tiny lib) to avoid dynamic resolution issues.
import { onCLS, onLCP, onINP, onFCP, onTTFB } from "web-vitals";

let started = false;

function report(metric) {
  const { name, value, rating } = metric;
  // eslint-disable-next-line no-console
  console.info(`[Vitals] ${name}: ${value.toFixed(2)} (${rating})`);
}

export function initWebVitals() {
  if (started || typeof window === "undefined") return;
  started = true;
  const start = () => {
    try {
      onCLS(report);
      onLCP(report);
      onINP(report);
      onFCP(report);
      onTTFB(report);
    } catch (_) {
      /* swallow */
    }
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(start, { timeout: 4000 });
  } else {
    setTimeout(start, 1500);
  }
}
