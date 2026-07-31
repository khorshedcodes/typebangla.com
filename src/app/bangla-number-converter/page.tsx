import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import NumberClient from "./NumberClient";

export const metadata: Metadata = {
  title: "Bangla Number Converter | বাংলা সংখ্যা রূপান্তরকারী (0-9 to ০-৯) | TypeBangla",
  description: "Convert numbers instantly between English (0-9) and Bangla (০-৯) digits. Free online converter for invoice forms, bank slips, and official documents.",
  keywords: [
    "bangla number converter",
    "বাংলা সংখ্যা রূপান্তর",
    "english to bangla number",
    "bangla to english number",
    "bangla digits converter",
    "0-9 to ০-৯ converter",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-number-converter",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bangla Number Converter",
      "url": "https://typebangla.com/bangla-number-converter",
      "description": "Convert numbers instantly between English and Bangla digits.",
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
          "name": "How to convert English numbers to Bangla digits?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Paste your English numbers into TypeBangla Number Converter to instantly get Bangla Unicode digits."
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
        id="jsonld-number-converter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NumberClient />
    </>
  );
}
