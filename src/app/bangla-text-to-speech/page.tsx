import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import TtsClient from "./TtsClient";

export const metadata: Metadata = {
  title: "Bangla Text to Speech | বাংলা টেক্সট টু স্পিচ রিডার (Voice Audio) | TypeBangla",
  description: "Listen to written Bangla text spoken aloud in high-quality audio using Web Speech Synthesis. Free online Bangla voice reader.",
  keywords: [
    "bangla text to speech",
    "বাংলা টেক্সট টু স্পিচ",
    "bangla voice reader",
    "bangla audio text reader",
    "text to speech online bangla",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-text-to-speech",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bangla Text to Speech Reader",
      "url": "https://typebangla.com/bangla-text-to-speech",
      "description": "Listen to written Bangla text spoken aloud with audio controls.",
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
        id="jsonld-text-to-speech"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TtsClient />
    </>
  );
}
