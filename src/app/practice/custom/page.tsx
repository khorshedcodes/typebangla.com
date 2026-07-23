import React from "react";
import { Metadata } from "next";
import { CustomTextPractice } from "../../../components/CustomTextPractice";

export const metadata: Metadata = {
  title: "নিজস্ব টেক্সট দিয়ে টাইপিং অনুশীলন | TypeBangla",
  description: "নিজের বাংলা বা ইংরেজি টেক্সট পেস্ট করুন অথবা TXT ফাইল আমদানি করুন এবং সেটি দিয়ে টাইপিং অনুশীলন করুন।",
  alternates: { canonical: "https://typebangla.com/practice/custom" },
};

export default function CustomPracticePage() {
  return (
    <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <CustomTextPractice />
    </main>
  );
}
