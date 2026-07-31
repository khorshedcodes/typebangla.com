import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import PhoneticClient from "./PhoneticClient";

export const metadata: Metadata = {
  title: "English to Bangla Typing Online | ইংরেজি টু বাংলা টাইপিং (Phonetic Converter) | TypeBangla",
  description: "Type in English / Banglish phonetics (e.g. ami banglay gan gai) to get instant Bangla Unicode text. Free online phonetic Bangla typing tool.",
  keywords: [
    "english to bangla typing",
    "ইংরেজি টু বাংলা টাইপিং",
    "banglish to bangla converter",
    "phonetic bangla typing online",
    "ami banglay gan gai",
    "avro phonetic online",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/english-to-bangla-typing",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "English to Bangla Phonetic Typing Converter",
      "url": "https://typebangla.com/english-to-bangla-typing",
      "description": "Convert English / Banglish phonetics to Bangla Unicode text in real-time.",
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
        id="jsonld-phonetic-typing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PhoneticClient />
    </>
  );
}
