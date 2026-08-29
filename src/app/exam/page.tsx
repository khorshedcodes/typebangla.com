import React from "react";
import { Metadata } from "next";
import TestsHubPage from "../tests/page";

export const metadata: Metadata = {
  title: "Online Typing Exams & Speed Tests | TypeBangla Exam Center",
  description: "Take official timed typing exams (1, 3, 5, 10 min) with live WPM scoring, error penalties, and verifiable certificates for Bangla and English.",
  alternates: { canonical: "https://typebangla.com/exam" },
};

export default function ExamPage() {
  return <TestsHubPage />;
}
