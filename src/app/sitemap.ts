import { MetadataRoute } from "next";
import { BLOG_POSTS } from "../utils/blogData";

const BASE = "https://typebangla.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    // ── Core ──────────────────────────────────────────────────────────
    { url: `${BASE}/`,            lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/login`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/signup`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/institute`,    lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/learn`,       lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/practice`,    lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/exam/govt`,   lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/keyboards`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,        lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/dashboard`,   lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${BASE}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/game`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/stats`,       lastModified: now, changeFrequency: "weekly", priority: 0.6 },

    // ── Dedicated SEO Landing Pages ─────────────────────────────────────
    { url: `${BASE}/learn/avro-phonetic-typing`,   lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/learn/bijoy-52-typing`,        lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/learn/jatiya-keyboard-typing`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/learn/probhat-layout-typing`,  lastModified: now, changeFrequency: "weekly", priority: 0.9  },
    { url: `${BASE}/learn/inscript-bangla-typing`, lastModified: now, changeFrequency: "weekly", priority: 0.9  },
    { url: `${BASE}/learn/english-touch-typing`,  lastModified: now, changeFrequency: "weekly", priority: 0.9  },

    // ── Learn / Layout courses ─────────────────────────────────────────
    { url: `${BASE}/learn/avro`,     lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/learn/unibijoy`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/learn/jatiya`,   lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE}/learn/probhat`,  lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${BASE}/learn/english`,  lastModified: now, changeFrequency: "monthly", priority: 0.8  },

    // ── Practice modes ─────────────────────────────────────────────────
    { url: `${BASE}/practice/test`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/words`,     lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/practice/sentences`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/practice/quotes`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/practice/numbers`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/practice/custom`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // ── Keyboard layout pages ──────────────────────────────────────────
    { url: `${BASE}/keyboards/avro`,     lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/keyboards/unibijoy`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/keyboards/jatiya`,   lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${BASE}/keyboards/probhat`,  lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE}/keyboards/english`,  lastModified: now, changeFrequency: "monthly", priority: 0.7  },

    // ── Tools & Guides ────────────────────────────────────────────────
    { url: `${BASE}/unicode-to-bijoy-converter`,  lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/bijoy-to-unicode-converter`,  lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/english-to-bangla-typing`,    lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE}/bangla-voice-typing`,          lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE}/bangla-word-counter`,          lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE}/bangla-slug-generator`,        lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${BASE}/juktakkhor`,                   lastModified: now, changeFrequency: "monthly", priority: 0.75 },

    // ── Other ──────────────────────────────────────────────────────────
    { url: `${BASE}/about`,   lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticRoutes, ...blogRoutes];
}
