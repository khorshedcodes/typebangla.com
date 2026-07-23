import React from "react";
import { Metadata } from "next";
import SlugClient from "@/app/bangla-slug-generator/SlugClient";

export const metadata: Metadata = {
  title: "Bangla URL Slug Generator | বাংলা ইউআরএল স্ল্যাগ জেনারেটর | typebangla",
  description: "Generate clean, SEO-friendly URL slugs from Bangla text. Convert Bangla Unicode to clean hyphenated formats or phonetic English to prevent browser percent-encoding.",
  keywords: [
    "bangla slug generator",
    "bangla url slug generator",
    "বাংলা ইউআরএল স্ল্যাগ জেনারেটর",
    "seo slug generator",
    "bangla to english transliterated slug",
    "clean url generator",
    "percent encoding fix bangla",
    "typebangla"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-slug-generator",
  }
};

export default function Page() {
  return <SlugClient />;
}
