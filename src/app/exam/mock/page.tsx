import React from "react";
import { Metadata } from "next";
import GovtExamClient from "../govt/GovtExamClient";

export const metadata: Metadata = {
  title: "Govt Job Mock Typing Exam Simulator | TypeBangla",
  description: "Simulate official 5-minute Bangladesh Government typing examinations with 30 WPM passing requirements on Jatiya BCC layout.",
  alternates: { canonical: "https://typebangla.com/exam/mock" },
};

export default function MockExamPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <GovtExamClient />
    </main>
  );
}
