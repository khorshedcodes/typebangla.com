import React, { Suspense } from "react";
import { Metadata } from "next";
import CustomTestArenaClient from "./CustomTestArenaClient";

export const metadata: Metadata = {
  title: "Custom Document Typing Arena | TypeBangla",
  description: "Distraction-free typing arena for custom documents and text passages.",
};

export default function CustomTestPage() {
  return (
    <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Suspense fallback={<div className="text-center py-12 text-xs text-muted-foreground">Loading Custom Practice Arena...</div>}>
        <CustomTestArenaClient />
      </Suspense>
    </main>
  );
}
