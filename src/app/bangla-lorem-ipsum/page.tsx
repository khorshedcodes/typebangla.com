import React from "react";
import { Metadata } from "next";
import BanglaLoremClient from "./BanglaLoremClient";

export const metadata: Metadata = {
  title: "Bangla Lorem Ipsum Generator | বাংলা লরেম ইপসাম জেনারেটর | TypeMaster",
  description: "Generate customized Bangla Lorem Ipsum dummy text for websites, UI designs, and printing layouts. Fast, free, and customizable word, sentence, and paragraph generator.",
  keywords: [
    "bangla lorem ipsum",
    "বাংলা লরেম ইপসাম",
    "bangla lorem ipsum generator",
    "bangla dummy text",
    "bangla filler text",
    "bangla placeholder text",
    "bangla text generator",
    "typebangla lorem ipsum"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-lorem-ipsum",
  },
  openGraph: {
    title: "Bangla Lorem Ipsum Generator — Free Dummy Text",
    description: "Generate custom Bangla dummy text for UI design, web development, and publishing.",
    url: "https://typebangla.com/bangla-lorem-ipsum",
    type: "website",
  }
};

export default function BanglaLoremPage() {
  return <BanglaLoremClient />;
}
