// Utilities to inject JSON-LD structured data tags
// Each function returns a plain object ready to JSON.stringify
import { SITE_URL, AUTHOR, DEFAULT_SOCIAL_IMAGE } from "../config/seo";

export const siteBase = SITE_URL;

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BRAN/DEV",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: siteBase + "/projects?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    url: SITE_URL,
    image: SITE_URL + DEFAULT_SOCIAL_IMAGE,
    jobTitle: "Full Stack Developer",
    sameAs: [AUTHOR.github, AUTHOR.linkedin],
  };
}

export function breadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: SITE_URL + c.path,
    })),
  };
}

export function projectSchema(project) {
  if (!project) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description?.slice(0, 180),
    url: SITE_URL + "/projects/" + project.id,
    image: project.imageUrl
      ? project.imageUrl.startsWith("http")
        ? project.imageUrl
        : SITE_URL + project.imageUrl
      : SITE_URL + DEFAULT_SOCIAL_IMAGE,
    inLanguage: "es",
    keywords: Array.isArray(project.technologies)
      ? project.technologies.join(", ")
      : project.technologies,
  };
}
