import React from "react";
import { Metadata } from "next";
import BijoyClient from "./BijoyClient";

export const metadata: Metadata = {
  title: "Unicode to Bijoy Converter | ইউনিকোড থেকে বিজয় কনভার্টার | typebangla",
  description: "Convert Unicode Bangla text to legacy Bijoy ANSI (SutonnyMJ) code page and vice-versa. Free online font converter for Adobe Photoshop, Illustrator & printing press layouts.",
  keywords: [
    "unicode to bijoy converter",
    "ইউনিকোড থেকে বিজয় কনভার্টার",
    "বিজয় কনভার্টার",
    "bijoy to unicode converter",
    "sutonnymj converter online",
    "convert unicode to bijoy",
    "unicode to bijoy online",
    "sutonnymj font converter",
    "bangla text converter",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/unicode-to-bijoy-converter",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Unicode to Bijoy Converter",
      "url": "https://typebangla.com/unicode-to-bijoy-converter",
      "description": "Convert Unicode Bangla text to legacy Bijoy ANSI (SutonnyMJ) code page and vice-versa.",
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
          "name": "How to convert Unicode to Bijoy ANSI text?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Paste your Unicode Bangla text into the input box on typebangla. The system converts it instantly into Bijoy ANSI format, ready to paste into Illustrator or Photoshop using SutonnyMJ font."
          }
        },
        {
          "@type": "Question",
          "name": "Why do I see strange characters like 'æ', 'ø' after converting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bijoy ANSI encoding maps Bangla characters to ASCII character positions. Once you select the 'SutonnyMJ' font in your desktop software (Photoshop, Word, Illustrator), it renders correctly as Bangla."
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
      <BijoyClient initialDirection="uniToBijoy" />
    </>
  );
}
