import React from "react";
import { Metadata } from "next";
import ExamCenter from "../../../components/ExamCenter";
import { Binary } from "lucide-react";

export const metadata: Metadata = {
  title: "সংখ্যা ও চিহ্ন টাইপিং অনুশীলন | TypeBangla",
  description: "বাংলা ও ইংরেজি নম্বর রো, বিশেষ চিহ্ন, শতাংশ এবং ব্র্যাকেট টাইপিং অনুশীলন করুন।",
  alternates: { canonical: "https://typebangla.com/practice/numbers" },
};

export default function NumbersPracticePage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-900">
          <Binary size={13} />
          <span>নম্বর ও চিহ্ন</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">সংখ্যা ও বিশেষ চিহ্ন অনুশীলন</h1>
        <p className="text-sm text-muted-foreground">১, ২, ৩... এবং বিশেষ গাণিতিক/পাঙ্কচুয়েশন চিহ্ন টাইপ করার দক্ষতা।</p>
      </div>
      <ExamCenter />
    </main>
  );
}
