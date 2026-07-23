import React, { Suspense } from "react";
import { Metadata } from "next";
import GovtTestArenaClient from "./GovtTestArenaClient";

export const metadata: Metadata = {
  title: "Government Job Typing Exam Arena | TypeBangla",
  description: "Official 5-Minute and 10-Minute Government Typing Exam Simulator Arena.",
};

export default function GovtTestPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Suspense fallback={<div className="text-center py-12 text-xs text-muted-foreground">Loading Government Exam Arena...</div>}>
        <GovtTestArenaClient />
      </Suspense>
    </main>
  );
}
