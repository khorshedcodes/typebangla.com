import React from "react";
import { Metadata } from "next";
import ExamCenter from "../../../components/ExamCenter";
import { Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "বাংলা উদ্ধৃতি টাইপিং অনুশীলন — রবীন্দ্রনাথ, নজরুল | TypeBangla",
  description: "রবীন্দ্রনাথ ঠাকুর, কাজী নজরুল ইসলাম ও বিখ্যাত লেখকদের উক্তি এবং কবিতা টাইপিং অনুশীলন করুন।",
  alternates: { canonical: "https://typebangla.com/practice/quotes" },
};

import QuotesClient from "./QuotesClient";

export default function QuotesPracticePage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-900">
          <Quote size={13} />
          <span>অনবদ্য সাহিত্য ও উক্তি</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">বাংলা উদ্ধৃতি অনুশীলন</h1>
        <p className="text-sm text-muted-foreground">রবীন্দ্রনাথ, নজরুল ও ক্লাসিক সাহিত্যের নির্বাচিত অংশ টাইপ করুন।</p>
      </div>
      <QuotesClient />
    </main>
  );
}
