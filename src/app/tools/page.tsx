import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import ToolsClient from "./ToolsClient";

export const metadata: Metadata = {
  title: "বাংলা টেক্সট ও টাইপিং টুলস — কনভার্টার, ভয়েস, কীবোর্ড ও স্লাগ জেনারেটর | TypeBangla",
  description: "বাংলা লেখার ১৪টি প্রয়োজনীয় টুল — অনলাইন কীবোর্ড, ইউনিকোড ↔ বিজয় কনভার্টার, AI ভয়েস টাইপিং, টেক্সট টু স্পিচ, শব্দ গণনা ও SEO স্লাগ জেনারেটর।",
  keywords: [
    "bangla text tools",
    "bangla typing tools",
    "unicode to bijoy converter",
    "bijoy to unicode converter",
    "online bangla keyboard",
    "bangla voice typing",
    "bangla lorem ipsum generator",
    "bangla word counter",
    "typebangla tools"
  ],
  alternates: { canonical: "https://typebangla.com/tools" },
  openGraph: {
    title: "14 Free Bangla Text & Typing Utilities | TypeBangla Tools",
    description: "Convert Bijoy 52 to Unicode, perform AI voice typing, count characters, generate Bangla lorem ipsum, and practice mixed typing tests.",
    url: "https://typebangla.com/tools",
    type: "website",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "name": "Bangla Text & Typing Tools Directory",
      "url": "https://typebangla.com/tools",
      "description": "Collection of 14 online utilities for Bangla typists, web designers, and candidates.",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Are all TypeBangla text tools free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, all 14 text utilities including Unicode to Bijoy conversion, voice typing, and lorem generators are 100% free without installation.",
          },
        },
      ],
    },
  ],
};

export default function ToolsPage() {
  return (
    <>
      <Script
        id="jsonld-tools-directory"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolsClient />
    </>
  );
}
