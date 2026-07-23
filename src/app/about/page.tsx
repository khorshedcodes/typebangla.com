"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8 fade-in">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 border-b border-zinc-200 pb-3">About typebangla</h2>
        <p className="text-sm text-zinc-600 leading-relaxed">
          typebangla is an advanced online typing training platform that helps users learn Bangla and English typing with speed and accuracy. We believe that proper typing skills are essential in today&apos;s digital world.
        </p>

        <h3 className="text-lg font-bold text-zinc-800 pt-2">Our Mission</h3>
        <p className="text-sm text-zinc-600 leading-relaxed">
          Our goal is to make typing proficiency accessible to Bangla speakers worldwide — especially professionals who use Bangla typing for government jobs, content writing, and data entry. We provide free, browser-based tools that require no installation or account creation.
        </p>

        <h3 className="text-lg font-bold text-zinc-800 pt-2">What We Offer</h3>
        <ul className="list-disc pl-5 text-sm text-zinc-650 space-y-2">
          <li>Structured courses from home row drills to full paragraphs</li>
          <li>Support for UniBijoy, Jatiya, and Avro Phonetic keyboard layouts</li>
          <li>Interactive virtual keyboard with real-time key highlighting</li>
          <li>Speed exams with classic Bengali and English literature passages</li>
          <li>Utility tools: phonetic typing, Unicode-Bijoy converter, voice typing, word counter</li>
        </ul>

        <div className="pt-8 border-t border-zinc-200 text-center">
          <p className="text-xs text-muted-foreground">
            Made with care for Bengali typists worldwide.
          </p>
        </div>
      </div>
    </main>
  );
}
