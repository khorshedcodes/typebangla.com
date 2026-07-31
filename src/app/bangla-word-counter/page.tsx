import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import CounterClient from "./CounterClient";

export const metadata: Metadata = {
  title: "Bangla Word Counter | বাংলা ওয়ার্ড ও ক্যারেক্টার কাউন্টার | TypeBangla",
  description: "Quickly count words, characters (with and without spaces), sentences, and paragraphs in Bangla and English text with instant reading time analysis.",
  keywords: [
    "bangla word counter",
    "বাংলা ওয়ার্ড কাউন্টার",
    "শব্দ ও অক্ষর কাউন্টার",
    "word counter online",
    "character count bangla",
    "bangla character counter",
    "count bangla words",
    "bangla text analyzer",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-word-counter",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bangla Word & Character Counter",
      "url": "https://typebangla.com/bangla-word-counter",
      "description": "Analyze words, characters, spacing, paragraphs, and reading time for Bangla and English text.",
      "applicationCategory": "UtilitiesApplication",
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
          "name": "How does the Bangla Word Counter calculate character length?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The tool counts Unicode characters, vowels, and conjuncts accurately both with spaces and without spaces."
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
        id="jsonld-word-counter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CounterClient />
    </>
  );
}
