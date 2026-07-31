import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import VoiceClient from "./VoiceClient";

export const metadata: Metadata = {
  title: "Bangla Voice Typing | বাংলা ভয়েস টাইপিং অনলাইন (Speech to Text) | TypeBangla",
  description: "Free online Bangla voice typing and speech-to-text converter. Speak clearly into your mic to dictate text in Bangla or English instantly with high accuracy.",
  keywords: [
    "bangla voice typing",
    "বাংলা ভয়েস টাইপিং",
    "বাংলা ভয়েস রাইটিং",
    "bangla speech to text",
    "bangla speech to text online",
    "voice writing in bangla",
    "voice typing online",
    "typebangla voice"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-voice-typing",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Bangla Voice Typing Online",
      "url": "https://typebangla.com/bangla-voice-typing",
      "description": "Speak into your microphone to dictate Bangla and English text instantly with Web Speech API.",
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
          "name": "Which browsers support Bangla Voice Typing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Google Chrome, Microsoft Edge, and Brave browsers provide full native support for Web Speech API and Bangla voice recognition."
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
        id="jsonld-voice-typing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VoiceClient />
    </>
  );
}
