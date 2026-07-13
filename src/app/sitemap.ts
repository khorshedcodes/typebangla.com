import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://typebangla.com";

  const routes = [
    "",
    "/practice",
    "/guide",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
    "/english-to-bangla-typing",
    "/unicode-to-bijoy-converter",
    "/bangla-voice-typing",
    "/bangla-word-counter",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/practice" ? "daily" : "monthly",
    priority: route === "" ? 1.0 : route === "/practice" ? 0.9 : 0.5,
  }));
}
