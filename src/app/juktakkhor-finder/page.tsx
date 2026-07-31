import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import FinderClient from "./FinderClient";

export const metadata: Metadata = {
  title: "Bangla Juktakkhor Finder | বাংলা যুক্তবর্ণ ও কী-ম্যাপিং নির্দেশিকা | TypeBangla",
  description: "Find keystrokes and typing breakdowns for complex Bangla conjuncts (ক্ষ, জ্ঞ, ষ্ণ, ঙ্ক) in Avro, Bijoy 52, and Jatiya layouts.",
  keywords: [
    "bangla juktakkhor finder",
    "বাংলা যুক্তবর্ণ কীবোর্ড গাইড",
    "how to type juktakkhor in bijoy",
    "avro juktakkhor keystrokes",
    "bangla conjuncts keyboard map",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/juktakkhor-finder",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bangla Juktakkhor Finder",
      "url": "https://typebangla.com/juktakkhor-finder",
      "description": "Find keystrokes for complex Bangla conjunct letters in Avro and Bijoy layouts.",
      "applicationCategory": "EducationalApplication",
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
        id="jsonld-juktakkhor-finder"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FinderClient />
    </>
  );
}
