import React from "react";
import { Metadata } from "next";
import ExamCenter from "../../../components/ExamCenter";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "টাইপিং মক পরীক্ষা — পূর্ণ সময়ের মডেল টেস্ট | TypeBangla",
  description: "৫ ও ১০ মিনিটের পূর্ণ সময়ের মডেল টাইপিং টেস্ট দিন। প্রকৃত পরীক্ষার মতো মূল্যায়ন ও ডিজিটাল সার্টিফিকেট অর্জন করুন।",
  alternates: { canonical: "https://typebangla.com/exam/mock" },
};

export default function MockExamPage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-900">
          <Trophy size={13} />
          <span>মক পরীক্ষা মোড</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">পূর্ণাঙ্গ মক টেস্ট</h1>
        <p className="text-sm text-muted-foreground">৫ মিনিট বা ১০ মিনিট সময় নির্ধারণ করে বাস্তব পরীক্ষার পরিবেশে পরীক্ষা দিন।</p>
      </div>
      <ExamCenter />
    </main>
  );
}
