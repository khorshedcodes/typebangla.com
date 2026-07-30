import React from "react";
import { Metadata } from "next";
import MixedTypingClient from "./MixedTypingClient";

export const metadata: Metadata = {
  title: "Bangla-English Mixed Typing Test | বাংলা-ইংরেজি মিক্সড টাইপিং টেস্ট | TypeMaster",
  description: "Practice bilingual Bangla and English mixed typing tests for government recruitment exams (BPSC, Bank, Secretariat). Test speed and accuracy across both languages.",
  keywords: [
    "bangla english mixed typing test",
    "বাংলা ইংরেজি মিক্সড টাইপিং টেস্ট",
    "bilingual typing test",
    "bpsc typing test",
    "bank typing test",
    "secretariat typing test",
    "typebangla mixed test"
  ],
  alternates: {
    canonical: "https://typebangla.com/bangla-english-mixed-typing-test",
  },
  openGraph: {
    title: "Bangla-English Mixed Typing Test | Bilingual Practice",
    description: "Prepare for official government recruitment typing exams by practicing alternating Bangla and English typing passages.",
    url: "https://typebangla.com/bangla-english-mixed-typing-test",
    type: "website",
  }
};

export default function MixedTypingPage() {
  return <MixedTypingClient />;
}
