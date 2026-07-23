import React from "react";
import { Metadata } from "next";
import BijoyClient from "../unicode-to-bijoy-converter/BijoyClient";

export const metadata: Metadata = {
  title: "Bijoy to Unicode Converter | বিজয় থেকে ইউনিকোড কনভার্টার | typebangla",
  description: "Convert legacy Bijoy ANSI (SutonnyMJ) text to web-friendly Unicode Bangla online. Perfect for publishing SutonnyMJ text on websites, blogs, and social media.",
  keywords: [
    "bijoy to unicode converter",
    "বিজয় থেকে ইউনিকোড কনভার্টার",
    "sutonnymj to unicode converter",
    "ansi to unicode bangla",
    "bijoy 52 to unicode online",
    "convert bijoy to unicode",
    "sutonnymj font to unicode",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/bijoy-to-unicode-converter",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bijoy to Unicode Converter",
      "url": "https://typebangla.com/bijoy-to-unicode-converter",
      "description": "Convert legacy Bijoy ANSI (SutonnyMJ) text to modern Unicode Bangla text.",
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
          "name": "How to convert Bijoy ANSI (SutonnyMJ) text to Unicode Bangla?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Paste your SutonnyMJ / Bijoy text into the input box and click copy. The converted text is output as standard web-readable Unicode Bangla."
          }
        }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BijoyClient initialDirection="bijoyToUni" />
    </>
  );
}
