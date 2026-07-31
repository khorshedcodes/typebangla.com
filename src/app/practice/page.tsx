import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import { HelpCircle } from "lucide-react";
import { PracticeHubClient } from "../../components/PracticeHubClient";

export const metadata: Metadata = {
  title: "Bangla & English Typing Practice Online | Avro, Bijoy 52 & QWERTY Speed Drills",
  description: "Free online Bangla & English typing practice — timed 1-min & 5-min speed tests, Avro phonetic, SutonnyMJ UniBijoy, paragraph drills, literature quotes, and custom text.",
  keywords: [
    "bangla typing practice online",
    "english typing practice",
    "avro typing practice online",
    "bijoy 52 online typing test",
    "bangla speed test 1 min",
    "typebangla practice hub"
  ],
  alternates: { canonical: "https://typebangla.com/practice" },
};

const FAQS = [
  {
    q: "How can I improve my Bangla typing speed online?",
    a: "Practice daily for 15-20 minutes on TypeBangla using Avro or UniBijoy layout. Start with Word Practice to master finger placement, then move to Paragraph Practice and 1-minute Speed Tests."
  },
  {
    q: "What is the standard WPM required for Govt typing exams in Bangladesh?",
    a: "Most Bangladesh government jobs (BCC standard) require 20 WPM in Bangla (Jatiya/Bijoy layout) and 28-30 WPM in English with at least 95% accuracy."
  },
  {
    q: "What is the difference between Avro Phonetic and UniBijoy layout?",
    a: "Avro Phonetic lets you type Bangla using English keys phonetically (e.g. typing 'ami' yields 'আমি'). UniBijoy uses a fixed key mapping matching traditional Bijoy 52 keyboards."
  },
  {
    q: "Can I upload my own custom Bangla or English text to practice?",
    a: "Yes! Use our Custom Text Speed Builder (/practice/custom) to paste any text or upload .TXT files for personalized typing practice."
  }
];

export default function PracticeHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TypeBangla Practice Hub",
    "url": "https://typebangla.com/practice",
    "description": "Online practice platform for Bangla and English typing with Avro, UniBijoy, Jatiya, and QWERTY speed drills.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-16 fade-in text-foreground">
      {/* Inject JSON-LD SEO Schema */}
      <Script
        id="jsonld-practice-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Script
        id="jsonld-practice-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Main Interactive Practice Hub Client Component */}
      <PracticeHubClient />
    </main>
  );
}
