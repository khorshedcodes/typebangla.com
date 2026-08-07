import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import OnlineKeyboardClient from "./OnlineKeyboardClient";

export const metadata: Metadata = {
  title: "Online Bangla Keyboard (অনলাইন বাংলা কীবোর্ড) — Virtual Bangla Typing Tool | TypeBangla",
  description: "Free online Bangla virtual keyboard tool. Type Bengali without installing software (Avro, UniBijoy, Jatiya). Interactive clickable keycaps, copy text, download file, and speech reader.",
  keywords: [
    "online bangla keyboard",
    "bangla virtual keyboard",
    "type bangla online",
    "bangla keyboard online",
    "online bangla typing without software",
    "অনলাইন বাংলা কীবোর্ড",
    "অনলাইনে বাংলা টাইপ",
    "avro online keyboard",
    "bijoy online keyboard",
    "typebangla keyboard tool"
  ],
  alternates: { canonical: "https://typebangla.com/online-bangla-keyboard" },
  openGraph: {
    title: "Online Bangla Keyboard (অনলাইন বাংলা কীবোর্ড) — Free Virtual Typing",
    description: "Type Bangla online easily using interactive virtual keyboard. Instant copy, text download, and voice reading.",
    url: "https://typebangla.com/online-bangla-keyboard",
    siteName: "typebangla",
    type: "website",
  },
};

export default function OnlineBanglaKeyboardPage() {
  return (
    <>
      <Script
        id="json-ld-online-keyboard"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Online Bangla Virtual Keyboard",
            "url": "https://typebangla.com/online-bangla-keyboard",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "All",
            "description": "Free online Bangla virtual keyboard tool to type Bengali text without software installation.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      <OnlineKeyboardClient />
    </>
  );
}
