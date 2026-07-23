import React from "react";
import { Metadata } from "next";
import { JuktakkhorTrainer } from "../../components/JuktakkhorTrainer";

export const metadata: Metadata = {
  title: "Bangla Juktakkhor (যুক্তাক্ষর) Trainer | TypeMaster",
  description: "Master complex Bangla conjunct ligatures (যুক্তাক্ষর) with interactive keystroke breakdowns for Avro, Bijoy, and Jatiya layouts.",
};

export default function JuktakkhorPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <JuktakkhorTrainer />
    </main>
  );
}
