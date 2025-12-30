// src/hooks/useSEO.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO_CONFIG } from "../constants/index.js";

/**
 * SEO hook - Sayfa bazlı meta tag yönetimi
 * @param {Object} options
 * @param {string} options.title - Sayfa başlığı
 * @param {string} options.description - Meta description
 * @param {string} options.keywords - Meta keywords (opsiyonel)
 * @param {string} options.image - Open Graph image URL (opsiyonel)
 * @param {string} options.url - Canonical URL (opsiyonel, otomatik location.pathname kullanılır)
 * @param {string} options.type - Open Graph type (default: "website")
 * @param {Object} options.structuredData - JSON-LD structured data (opsiyonel)
 */
export function useSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  structuredData,
}) {
  // ✅ Hook'lar koşullu çağrılamaz - her zaman çağır
  const location = useLocation();
  const siteName = SEO_CONFIG.SITE_NAME;
  const siteUrl = SEO_CONFIG.SITE_URL;
  const fullTitle = title ? `${title} | ${siteName}` : SEO_CONFIG.DEFAULT_TITLE;
  // ✅ url prop'u varsa onu kullan, yoksa location.pathname kullan
  const canonicalUrl = url
    ? `${siteUrl}${url}`
    : `${siteUrl}${location.pathname}`;
  const ogImage = image || SEO_CONFIG.DEFAULT_IMAGE;
  const metaDescription = description || SEO_CONFIG.DEFAULT_DESCRIPTION;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Meta description
    updateMetaTag("description", metaDescription, "name");
    updateMetaTag("og:description", metaDescription, "property");
    updateMetaTag("twitter:description", metaDescription, "name");

    // Title meta tags
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("twitter:title", fullTitle, "name");

    // URL
    updateMetaTag("canonical", canonicalUrl, "rel", "link");
    updateMetaTag("og:url", canonicalUrl, "property");

    // Image
    updateMetaTag("og:image", ogImage, "property");
    updateMetaTag("twitter:image", ogImage, "name");

    // Type
    updateMetaTag("og:type", type, "property");

    // Keywords
    if (keywords) {
      updateMetaTag("keywords", keywords, "name");
    }

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Cleanup structured data script
      const scriptTag = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (scriptTag && !structuredData) {
        scriptTag.remove();
      }
    };
  }, [
    fullTitle,
    metaDescription,
    canonicalUrl,
    ogImage,
    type,
    keywords,
    structuredData,
  ]);
}

/**
 * Meta tag güncelleme helper fonksiyonu
 */
function updateMetaTag(attr, content, attrType = "name", tagType = "meta") {
  if (tagType === "link" && attr === "canonical") {
    // Canonical link tag
    let linkTag = document.querySelector('link[rel="canonical"]');
    if (!linkTag) {
      linkTag = document.createElement("link");
      linkTag.rel = "canonical";
      document.head.appendChild(linkTag);
    }
    linkTag.href = content;
    return;
  }

  // Meta tag
  const selector =
    attrType === "property"
      ? `meta[property="${attr}"]`
      : `meta[${attrType}="${attr}"]`;

  let metaTag = document.querySelector(selector);
  if (!metaTag) {
    metaTag = document.createElement("meta");
    if (attrType === "property") {
      metaTag.setAttribute("property", attr);
    } else {
      metaTag.setAttribute(attrType, attr);
    }
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute("content", content);
}
