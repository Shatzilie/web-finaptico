import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

const BASE_URL = "https://finaptico.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

const setMetaTag = (attribute: string, value: string, content: string) => {
  let element = document.querySelector(`meta[${attribute}="${value}"]`);
  if (element) {
    element.setAttribute("content", content);
  } else {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    element.setAttribute("content", content);
    document.head.appendChild(element);
  }
};

const setCanonical = (url: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (link) {
    link.href = url;
  } else {
    link = document.createElement("link");
    link.rel = "canonical";
    link.href = url;
    document.head.appendChild(link);
  }
};

const SEOHead = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
}: SEOHeadProps) => {
  const fullCanonical = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;
  const fullOgImage = ogImage || DEFAULT_OG_IMAGE;

  useEffect(() => {
    document.title = title;

    setMetaTag("name", "description", description);
    setCanonical(fullCanonical);

    setMetaTag("property", "og:title", ogTitle || title);
    setMetaTag("property", "og:description", ogDescription || description);
    setMetaTag("property", "og:url", fullCanonical);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", fullOgImage);

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", ogTitle || title);
    setMetaTag("name", "twitter:description", ogDescription || description);
    setMetaTag("name", "twitter:image", fullOgImage);
  }, [title, description, fullCanonical, ogTitle, ogDescription, fullOgImage, ogType]);

  return null;
};

export default SEOHead;
