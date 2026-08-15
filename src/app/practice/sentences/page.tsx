import React, { Suspense } from "react";
import { Metadata } from "next";
import ExamCenter from "../../../components/ExamCenter";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "বাংলা বাক্য টাইপিং অনুশীলন | TypeBangla",
  description: "সম্পূর্ণ বাংলা ও ইংরেজি বাক্য টাইপ করে স্বাভাবিক টাইপিং প্রবাহ এবং গতি অর্জন করুন।",
  alternates: { canonical: "https://typebangla.com/practice/sentences" },
};

import SentencesClient from "./SentencesClient";

export default function SentencesPracticePage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-900">
          <FileText size={13} />
          <span>বাক্য টাইপিং</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">বাক্য অনুশীলন</h1>
        <p className="text-sm text-muted-foreground">সম্পূর্ণ বাক্য লিখে বাক্যের গঠন ও দাড়ি/কমা সহ টাইপ শিখুন।</p>
      </div>
      <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-muted-foreground">Loading Sentence Practice...</div>}>
        <SentencesClient />
      </Suspense>
    </main>
  );
}
