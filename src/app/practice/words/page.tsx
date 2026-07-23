import React from "react";
import { Metadata } from "next";
import ExamCenter from "../../../components/ExamCenter";
import { AlignLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "বাংলা শব্দ টাইপিং অনুশীলন | TypeBangla",
  description: "সাধারণ ও উচ্চ-ফ্রিকোয়েন্সি বাংলা এবং ইংরেজি শব্দ দিয়ে স্পিড ও নির্ভুলতা বৃদ্ধি করুন।",
  alternates: { canonical: "https://typebangla.com/practice/words" },
};

export default function WordsPracticePage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-900">
          <AlignLeft size={13} />
          <span>শব্দ ড্রিল</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">শব্দ অনুশীলন</h1>
        <p className="text-sm text-muted-foreground">শব্দের পর শব্দ দ্রুত টাইপ করে আঙুলের পেশীর স্মৃতি (Muscle Memory) তৈরি করুন।</p>
      </div>
      <ExamCenter />
    </main>
  );
}
