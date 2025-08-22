// Lightweight client-side route prefetching system (adaptive)
// - Caches dynamic import promises to avoid duplicate work
// - Respects Data Saver / slow connections
// - Prefetches most probable next routes first (adjacency heuristic)
// - Limits concurrency to avoid blocking main thread

const cache = new Map();

// Map static top-level routes to their dynamic import (must match lazy paths in App.jsx)
const prefetchers = {
  "/projects": () => import("../pages/ProjectsPage"),
  "/skills": () => import("../pages/SkillsPage"),
  "/about": () => import("../pages/AboutPage"),
  "/contact": () => import("../pages/ContactOptionsPage"),
};

// Simple adjacency / likelihood map for prioritisation based on current page
const adjacency = {
  "/": ["/projects", "/skills", "/about", "/contact"],
  "/projects": ["/skills", "/about", "/contact"],
  "/skills": ["/projects", "/about", "/contact"],
  "/about": ["/projects", "/skills", "/contact"],
  "/contact": ["/projects", "/skills", "/about"],
};

function isSlowConnection() {
  try {
    const conn =
      navigator.connection ||
      navigator.webkitConnection ||
      navigator.mozConnection;
    if (!conn) return false;
    if (conn.saveData) return true;
    return /2g/.test(conn.effectiveType || "");
  } catch (_) {
    return false;
  }
}

export function prefetchRoute(path) {
  if (isSlowConnection()) return; // Skip on slow / data saver
  const key = Object.keys(prefetchers).find((r) => path === r);
  if (!key) return;
  if (cache.has(key)) return cache.get(key);
  try {
    const p = prefetchers[key]();
    cache.set(key, p);
    return p;
  } catch (_) {
    // swallow errors silently
  }
}

function prioritizedRoutes() {
  const current =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const primary = adjacency[current] || [];
  const rest = Object.keys(prefetchers).filter((r) => !primary.includes(r));
  return [...primary, ...rest];
}

export function scheduleIdlePrefetch() {
  if (typeof window === "undefined") return;
  if (isSlowConnection()) return; // Do nothing on constrained networks

  const run = () => {
    const routes = prioritizedRoutes();
    let i = 0;
    const maxConcurrent = 2; // keep small; sequential bursts
    let active = 0;
    function next() {
      while (active < maxConcurrent && i < routes.length) {
        const route = routes[i++];
        active++;
        Promise.resolve(prefetchRoute(route)).finally(() => {
          active--;
          if (i < routes.length) {
            // schedule next tick to yield to main thread
            setTimeout(next, 60);
          }
        });
      }
    }
    next();
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 4500 });
  } else {
    setTimeout(run, 2000);
  }
}

// Expose for potential manual triggering (e.g. after user interaction)
export function warmupAllRoutesImmediate() {
  Object.keys(prefetchers).forEach((r) => prefetchRoute(r));
}
