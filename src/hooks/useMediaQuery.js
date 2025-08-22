import { useState, useEffect } from "react";

/**
 * useMediaQuery - subscribe to a CSS media query.
 * Returns boolean that updates only when the match state changes.
 * Safe for SSR (returns false until mounted).
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    )
      return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia === "undefined"
    )
      return;
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    // Older browsers
    if (mql.addEventListener) mql.addEventListener("change", handler);
    else mql.addListener(handler);
    // Sync in case of race
    setMatches(mql.matches);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", handler);
      else mql.removeListener(handler);
    };
  }, [query]);

  return matches;
}
