import type { MetadataRoute } from "next";

const SITE_BASE = (
  process.env.NEXT_PUBLIC_CLIENT_URL ||
  process.env.NEXT_PUBLIC_REDIRECT_URL ||
  "https://teatimetelugu.com"
).replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_BASE}/sitemap.xml`,
    host: SITE_BASE,
  };
}
