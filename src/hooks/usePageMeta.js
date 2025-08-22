import { useEffect } from "react";
import { SITE_URL, DEFAULT_SOCIAL_IMAGE } from "../config/seo";

/**
 * usePageMeta
 * Sets document title and selected meta tags (description + OG/Twitter) when a page mounts.
 * Falls back gracefully if document/head not available (SSR safety).
 *
 * @param {Object} options
 * @param {string} options.title - Page specific title (without brand prefix)
 * @param {string} [options.description] - Meta description for the page
 * @param {string} [options.image] - Absolute URL to social share image
 * @param {boolean} [options.setCanonical] - Whether to set canonical link
 */
export default function usePageMeta({
  title,
  description,
  image = SITE_URL + DEFAULT_SOCIAL_IMAGE,
  setCanonical = true,
}) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const brand = "BRAN/DEV";
    const fullTitle = title ? `${brand} – ${title}` : brand;
    document.title = fullTitle;

    const ensureTag = (selector, create) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };

    if (description) {
      ensureTag('meta[name="description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        return m;
      }).setAttribute("content", description);
    }

    const ogTitle = ensureTag('meta[property="og:title"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    });
    ogTitle.setAttribute("content", fullTitle);

    if (description) {
      const ogDesc = ensureTag('meta[property="og:description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:description");
        return m;
      });
      ogDesc.setAttribute("content", description);

      const twDesc = ensureTag('meta[name="twitter:description"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "twitter:description");
        return m;
      });
      twDesc.setAttribute("content", description);
    }

    const twCard = ensureTag('meta[name="twitter:card"]', () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "twitter:card");
      return m;
    });
    twCard.setAttribute("content", "summary_large_image");

    if (image) {
      const ogImg = ensureTag('meta[property="og:image"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("property", "og:image");
        return m;
      });
      ogImg.setAttribute("content", image);

      const twImg = ensureTag('meta[name="twitter:image"]', () => {
        const m = document.createElement("meta");
        m.setAttribute("name", "twitter:image");
        return m;
      });
      twImg.setAttribute("content", image);
    }

    if (setCanonical) {
      const canonicalHref =
        SITE_URL.replace(/\/$/, "") + window.location.pathname;
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalHref);
    }
  }, [title, description, image, setCanonical]);
}
