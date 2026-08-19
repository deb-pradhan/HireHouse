import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/kitchen-sink", "/checkout"],
    },
    sitemap: "https://hirehouse.xyz/sitemap.xml",
  };
}
