"use client";

import React from "react";

export default function AboutPage() {
  return (
    <main className="app-container">
      <div className="prose">
        <h2>About TypeBangla</h2>
        <p>
          TypeBangla is an advanced online typing training platform that helps users learn Bangla and English typing with speed and accuracy. We believe that proper typing skills are essential in today&apos;s digital world.
        </p>

        <h3>Our Mission</h3>
        <p>
          Our goal is to make typing proficiency accessible to Bangla speakers worldwide — especially professionals who use Bangla typing for government jobs, content writing, and data entry. We provide free, browser-based tools that require no installation or account creation.
        </p>

        <h3>What We Offer</h3>
        <ul>
          <li>Structured courses from home row drills to full paragraphs</li>
          <li>Support for UniBijoy, Jatiya, and Avro Phonetic keyboard layouts</li>
          <li>Interactive virtual keyboard with real-time key highlighting</li>
          <li>Speed exams with classic Bengali and English literature passages</li>
          <li>Utility tools: phonetic typing, Unicode-Bijoy converter, voice typing, word counter</li>
        </ul>

        <hr />

        <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.8rem" }}>
          Made with care for Bengali typists worldwide.
        </p>
      </div>
    </main>
  );
}
