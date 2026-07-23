import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import GovtExamClient from "./GovtExamClient";

export const metadata: Metadata = {
  title: "সরকারি চাকরির টাইপিং পরীক্ষা — কম্পিউটার অপারেটর, ব্যাংক | TypeBangla",
  description: "বাংলাদেশ সরকারের কম্পিউটার অপারেটর, ডেটা এন্ট্রি, ব্যাংক ও মন্ত্রণালয় পদের টাইপিং পরীক্ষার প্রস্তুতি নিন। ৩০ WPM লক্ষ্য, ডিজিটাল সার্টিফিকেট সহ।",
  keywords: ["সরকারি চাকরির টাইপিং পরীক্ষা", "govt job typing test bangla", "computer operator typing", "30 wpm bangla test", "typebangla"],
  alternates: { canonical: "https://typebangla.com/exam/govt" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "সরকারি চাকরির টাইপিং পরীক্ষা",
  "url": "https://typebangla.com/exam/govt",
  "description": "Bangladesh Government Computer Operator typing speed test and exam simulator.",
  "applicationCategory": "EducationalApplication",
};

export default function GovtExamPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Script id="jsonld-govt-exam" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GovtExamClient />
    </main>
  );
}
