import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import BanglaLoremClient from "./BanglaLoremClient";

export const metadata: Metadata = {
  title: "Bangla Lorem Ipsum Generator | বাংলা লরেম ইপসাম জেনারেটর | TypeBangla",
  description: "Free online Bangla Lorem Ipsum generator for web design, UI/UX mockups, and print typography. Generate custom paragraphs, words, and HTML p tags.",
  keywords: [
    "bangla lorem ipsum",
    "বাংলা লরেম ইপসাম",
    "bangla lorem ipsum generator",
    "bangla dummy text",
    "bangla filler text",
    "bangla placeholder text",
    "bangla text generator",
    "typebangla lorem ipsum"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-lorem-ipsum",
  },
  openGraph: {
    title: "Bangla Lorem Ipsum Generator — Free Dummy Text",
    description: "Generate custom Bangla dummy text for UI design, web development, and publishing.",
    url: "https://typebangla.com/bangla-lorem-ipsum",
    type: "website",
  }
};

export default function BanglaLoremPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Bangla Lorem Ipsum Generator",
    "url": "https://typebangla.com/bangla-lorem-ipsum",
    "description": "Generate custom Bangla dummy text and filler paragraphs for web UI designs and publishing.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <Script
        id="jsonld-lorem-app"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BanglaLoremClient />
    </>
  );
}
