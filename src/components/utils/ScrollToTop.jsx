import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Performance: mark navigation start/end for simple route transition timing
    try {
      performance.mark("route-change-start");
    } catch (_) {}
    window.scrollTo(0, 0);
    // Move focus to main content for accessibility (skip link target)
    const main = document.getElementById("main-content");
    if (main) {
      // Make focusable temporarily if not
      const hadTabIndex = main.hasAttribute("tabindex");
      if (!hadTabIndex) main.setAttribute("tabindex", "-1");
      main.focus({ preventScroll: true });
      if (!hadTabIndex) {
        // Remove after a tick to keep DOM clean
        setTimeout(() => main.removeAttribute("tabindex"), 500);
      }
    }
    try {
      performance.mark("route-change-end");
      performance.measure(
        "route-change",
        "route-change-start",
        "route-change-end"
      );
      const entries = performance.getEntriesByName("route-change");
      const last = entries[entries.length - 1];
      if (last) {
        // eslint-disable-next-line no-console
        console.info(
          `[Perf] Route change to ${pathname} in ${last.duration.toFixed(1)} ms`
        );
      }
      // Clear to avoid unbounded buffer
      performance.clearMarks("route-change-start");
      performance.clearMarks("route-change-end");
      performance.clearMeasures("route-change");
    } catch (_) {}
  }, [pathname]);

  return null;
}

export default ScrollToTop;
