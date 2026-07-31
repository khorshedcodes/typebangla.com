import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import SlugClient from "@/app/bangla-slug-generator/SlugClient";

export const metadata: Metadata = {
  title: "Bangla URL Slug Generator | বাংলা ইউআরএল স্ল্যাগ জেনারেটর | TypeBangla",
  description: "Generate clean, SEO-friendly URL slugs from Bangla text. Convert Bangla Unicode to clean hyphenated formats or phonetic English to prevent percent-encoding.",
  keywords: [
    "bangla slug generator",
    "bangla url slug generator",
    "বাংলা ইউআরএল স্ল্যাগ জেনারেটর",
    "seo slug generator",
    "bangla to english transliterated slug",
    "clean url generator",
    "percent encoding fix bangla",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-slug-generator",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bangla URL Slug Generator",
      "url": "https://typebangla.com/bangla-slug-generator",
      "description": "Convert Bangla text into clean, SEO-friendly hyphenated URL slugs.",
      "applicationCategory": "SEOApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why use a Bangla URL slug generator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bangla Unicode titles often get converted into ugly percent-encoded URLs like %E0%A6%AC%E0%A6%BE... A slug generator creates clean, readable hyphens or phonetic English slugs."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <Script
        id="jsonld-slug-generator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SlugClient />
    </>
  );
}
