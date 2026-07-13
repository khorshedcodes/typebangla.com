import React from "react";
import { Metadata } from "next";
import CounterClient from "./CounterClient";

export const metadata: Metadata = {
  title: "Bangla Word Counter | বাংলা ওয়ার্ড ও ক্যারেক্টার কাউন্টার | TypeBangla",
  description: "Quickly count words, characters (with and without spaces), and paragraphs in Bangla or English text. Calculate reading times for your essays and articles.",
  keywords: ["bangla word counter", "বাংলা ওয়ার্ড কাউন্টার", "শব্দ ও অক্ষর কাউন্টার", "word counter online", "character count bangla", "bangla character counter", "count bangla words", "bangla text analyzer", "typebangla"],
  alternates: {
    canonical: "https://typebangla.com/bangla-word-counter",
  }
};

export default function Page() {
  return <CounterClient />;
}
