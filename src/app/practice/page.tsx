import React from "react";
import { Metadata } from "next";
import PracticeClient from "./PracticeClient";

export const metadata: Metadata = {
  title: "Interactive Typing Arena - Learn Bangla & English Typing | TypeBangla",
  description: "Practice typing in UniBijoy, Jatiya, Avro, and English layouts. Real-time feedback, typing accuracy scoring, muscle memory training, and speed charts.",
  keywords: ["bangla typing practice", "english typing test", "unibijoy typing trainer", "jatiya keyboard layout", "avro phonetic practice", "typebangla"],
  alternates: {
    canonical: "https://typebangla.com/practice",
  }
};

export default function Page() {
  return <PracticeClient />;
}
