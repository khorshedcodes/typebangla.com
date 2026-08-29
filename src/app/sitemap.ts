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
    // ── Core Pages ──────────────────────────────────────────────────
    { url: `${BASE}/`,            lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/login`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/signup`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/institute`,    lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/practice`,    lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/exam/govt`,   lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/keyboards`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools`,       lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/blog`,        lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/leaderboard`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/game`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },

    // ── High-Intent SEO Landing Pages & Keyboards ───────────────────
    { url: `${BASE}/online-bangla-keyboard`,       lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE}/avro-phonetic-typing`,         lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/bijoy-52-typing`,              lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/jatiya-keyboard-typing`,       lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/probhat-layout-typing`,        lastModified: now, changeFrequency: "weekly", priority: 0.9  },
    { url: `${BASE}/inscript-bangla-typing`,       lastModified: now, changeFrequency: "weekly", priority: 0.9  },
    { url: `${BASE}/english-touch-typing`,        lastModified: now, changeFrequency: "weekly", priority: 0.9  },

    // ── Courses & Curriculum Hubs ───────────────────────────────────
    { url: `${BASE}/courses`,                     lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/courses/english`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/courses/avro`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/courses/unibijoy`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/courses/jatiya`,              lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/courses/probhat`,             lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/courses/inscript`,            lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/courses/unicode`,             lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    // ── Tests & Exam Centers ─────────────────────────────────────────
    { url: `${BASE}/tests`,          lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/tests/1min`,     lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tests/3min`,     lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tests/5min`,     lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tests/avro`,     lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tests/unibijoy`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tests/english`,  lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tests/govt`,     lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/exam`,           lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/exam/govt`,      lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/exam/govt/test`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/exam/ranked`,    lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE}/exam/mock`,      lastModified: now, changeFrequency: "weekly", priority: 0.9 },

    // ── Practice Modes ──────────────────────────────────────────────
    { url: `${BASE}/practice/test`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/words`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/sentences`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/quotes`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/numbers`,   lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/practice/custom`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/practice/avro`,      lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/practice/unibijoy`,  lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/practice/jatiya`,    lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/practice/probhat`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/inscript`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/unicode`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/practice/english`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // ── Keyboard Layout Reference Pages ──────────────────────────────
    { url: `${BASE}/keyboards/avro`,     lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/keyboards/unibijoy`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/keyboards/jatiya`,   lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${BASE}/keyboards/probhat`,  lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE}/keyboards/inscript`, lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE}/keyboards/unicode`,  lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/keyboards/english`,  lastModified: now, changeFrequency: "monthly", priority: 0.7  },

    // ── Tools & Utilities ────────────────────────────────────────────
    { url: `${BASE}/unicode-to-bijoy-converter`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bijoy-to-unicode-converter`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-lorem-ipsum`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-number-converter`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-word-counter`,              lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-text-cleaner`,              lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-text-to-speech`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-voice-typing`,              lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/english-to-bangla-typing`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-slug-generator`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/juktakkhor-finder`,                lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/juktakkhor`,                       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/bangla-english-mixed-typing-test`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },

    // ── Legal & General ──────────────────────────────────────────────
    { url: `${BASE}/about`,   lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`,   lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticRoutes, ...blogRoutes];
}
