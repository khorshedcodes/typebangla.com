"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Keyboard, BookOpen, Target, Volume2 } from "lucide-react";
import { getLessonsByCategory } from "../utils/lessons";

export default function LandingPage() {
  const totalBangla = getLessonsByCategory("bangla").length;
  const totalEnglish = getLessonsByCategory("english").length;

  const features = [
    {
      icon: <BookOpen size={20} />,
      title: "Structured Courses",
      desc: `${totalBangla} Bangla + ${totalEnglish} English lessons, from home row drills to full paragraphs.`,
      color: "var(--accent)"
    },
    {
      icon: <Keyboard size={20} />,
      title: "4 Keyboard Layouts",
      desc: "English QWERTY, UniBijoy, Jatiya, and Avro Phonetic — all with visual keyboard guides.",
      color: "var(--gold)"
    },
    {
      icon: <Target size={20} />,
      title: "Dynamic Drills",
      desc: "Each lesson generates randomized practice drills targeting specific keys for muscle memory.",
      color: "var(--incorrect)"
    },
    {
      icon: <Volume2 size={20} />,
      title: "Audio Feedback",
      desc: "Optional mechanical key sounds via Web Audio for a satisfying, professional typing feel.",
      color: "var(--text-secondary)"
    }
  ];

  return (
    <main className="app-container">
      {/* Hero */}
      <section style={{ padding: "48px 0 32px", maxWidth: 640 }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, lineHeight: 1.15, letterSpacing: "-1px", color: "var(--text-primary)", marginBottom: 16 }}>
          Learn Bangla & English typing
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 28 }}>
          Interactive courses with real-time stats, virtual keyboard guides, and support for UniBijoy, Jatiya, and Avro Phonetic layouts. Free, no account needed.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/practice" className="btn-primary" style={{ padding: "14px 28px", fontSize: "0.95rem" }}>
            Start Practicing
            <ArrowRight size={16} />
          </Link>
          <Link href="/guide" className="btn-secondary" style={{ padding: "14px 28px", fontSize: "0.95rem" }}>
            Keyboard Guide
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
        {features.map((f, i) => (
          <div key={i} className="glass-card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ color: f.color, width: 36, height: 36, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {f.icon}
            </div>
            <h3 style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "0.95rem" }}>{f.title}</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.82rem", lineHeight: 1.5 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="glass-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div>
          <h3 style={{ color: "var(--text-primary)", fontSize: "1.25rem", fontWeight: 700, marginBottom: 4 }}>
            Ready to improve your typing speed?
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>No installation, no sign-up — just open and type.</p>
        </div>
        <Link href="/practice" className="btn-primary">
          Start Now <ArrowRight size={14} />
        </Link>
      </section>
    </main>
  );
}
