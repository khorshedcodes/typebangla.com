import React, { Suspense } from "react";
import { Metadata } from "next";
import SpeedTestPracticeClient from "./SpeedTestPracticeClient";
import { Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "অনলাইন টাইপিং স্পিড টেস্ট (১, ৫, ১০ মিনিট) | TypeBangla",
  description: "বাংলা ও ইংরেজি টাইপিং স্পিড পরীক্ষা করুন। ডব্লিউপিএম (WPM) ও একিউরেসি সহ রিয়েল-টাইম রিপোর্ট অর্জন করুন।",
  alternates: { canonical: "https://typebangla.com/practice/test" },
};

export default function PracticeTestPage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-900">
          <Clock size={13} />
          <span>টাইমড স্পিড টেস্ট</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">অনলাইন টাইপিং স্পিড টেস্ট</h1>
        <p className="text-sm text-muted-foreground">১, ২, ৩, ৫, ১০ ও ১৫ মিনিটের নির্দিষ্ট সময়ের টাইপিং স্পিড ও একিউরেসি টেস্ট।</p>
      </div>
      <Suspense fallback={<div className="text-center py-12 text-xs font-semibold text-muted-foreground">Loading Speed Test Arena...</div>}>
        <SpeedTestPracticeClient />
      </Suspense>
    </main>
  );
}
