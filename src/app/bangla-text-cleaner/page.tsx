import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import CleanerClient from "./CleanerClient";

export const metadata: Metadata = {
  title: "Bangla Text Cleaner & Formatter | বাংলা টেক্সট ক্লিনার ও স্পেস ফিক্সার | TypeBangla",
  description: "Clean messy Bangla text by removing double spaces, fixing Dari (।) spacing, stripping HTML tags, and removing blank lines instantly.",
  keywords: [
    "bangla text cleaner",
    "বাংলা টেক্সট ক্লিনার",
    "bangla font space fixer",
    "fix bangla dari spacing",
    "strip html tags bangla",
    "clean bangla copy paste text",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-text-cleaner",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bangla Text Cleaner & Formatter",
      "url": "https://typebangla.com/bangla-text-cleaner",
      "description": "Clean messy Bangla text by removing extra spaces and fixing Dari punctuation.",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <Script
        id="jsonld-text-cleaner"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CleanerClient />
    </>
  );
}
