"use client";

import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

export default function CounterClient() {
  const [text, setText] = useState("");

  const clean = text.trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean).length : 0;
  const charsWithSpace = text.length;
  const charsNoSpace = text.replace(/\s/g, "").length;
  const paragraphs = clean ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
  const readTime = Math.ceil(words / 130);

  const stats = [
    { label: "Words", value: words },
    { label: "Characters", value: charsWithSpace },
    { label: "No Spaces", value: charsNoSpace },
    { label: "Paragraphs", value: paragraphs },
    { label: "Read Time", value: `${readTime}m` },
  ];

  return (
    <main className="app-container">
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          Word Counter
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Count words, characters, and reading time for Bangla and English text.
        </p>
      </div>

      {/* Stats bar */}
      <div className="hud-grid">
        {stats.map((s) => (
          <div key={s.label} className="hud-card">
            <div className="hud-value">{s.value}</div>
            <div className="hud-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Text area */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Your text
          </label>
          {text && (
            <button onClick={() => setText("")} className="btn-icon">
              <RotateCcw size={12} /> <span>Clear</span>
            </button>
          )}
        </div>
        <textarea
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="text-area-glow"
          style={{ fontSize: "1rem", fontFamily: "var(--font-bangla)", resize: "vertical", lineHeight: 1.7 }}
        />
      </div>
    </main>
  );
}
