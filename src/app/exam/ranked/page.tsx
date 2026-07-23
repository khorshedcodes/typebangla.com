import React from "react";
import { Metadata } from "next";
import RankedExamClient from "./RankedExamClient";

export const metadata: Metadata = {
  title: "3-Minute National Ranked Competition Exam | TypeBangla Leaderboard Challenge",
  description: "Official 3-Minute Ranked Competition Exam. Only scores with >=85% accuracy qualify for the National Speed Leaderboard.",
  alternates: { canonical: "https://typebangla.com/exam/ranked" },
};

export default function RankedExamPage() {
  return <RankedExamClient />;
}
