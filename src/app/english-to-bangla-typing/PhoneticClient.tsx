"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Download, ChevronDown, ChevronUp } from "lucide-react";
import { avroTransliterate } from "../../utils/layouts";

const AVRO_RULES = [
  { roman: "o", bangla: "অ" }, { roman: "a", bangla: "আ" }, { roman: "i", bangla: "ই" },
  { roman: "I", bangla: "ঈ" }, { roman: "u", bangla: "উ" }, { roman: "U", bangla: "ঊ" },
  { roman: "e", bangla: "এ" }, { roman: "O", bangla: "ও" }, { roman: "OI", bangla: "ঐ" },
  { roman: "OU", bangla: "ঔ" }, { roman: "k", bangla: "ক" }, { roman: "kh", bangla: "খ" },
  { roman: "g", bangla: "গ" }, { roman: "gh", bangla: "ঘ" }, { roman: "c", bangla: "চ" },
  { roman: "ch", bangla: "ছ" }, { roman: "j", bangla: "জ" }, { roman: "jh", bangla: "ঝ" },
  { roman: "T", bangla: "ট" }, { roman: "Th", bangla: "ঠ" }, { roman: "D", bangla: "ড" },
  { roman: "Dh", bangla: "ঢ" }, { roman: "t", bangla: "ত" }, { roman: "th", bangla: "থ" },
  { roman: "d", bangla: "দ" }, { roman: "dh", bangla: "ধ" }, { roman: "n", bangla: "ন" },
  { roman: "p", bangla: "প" }, { roman: "f / ph", bangla: "ফ" }, { roman: "b", bangla: "ব" },
  { roman: "v / bh", bangla: "ভ" }, { roman: "m", bangla: "ম" }, { roman: "z", bangla: "য" },
  { roman: "r", bangla: "র" }, { roman: "l", bangla: "ল" }, { roman: "sh / S", bangla: "শ/ষ" },
  { roman: "s", bangla: "স" }, { roman: "h", bangla: "হ" }, { roman: "rr", bangla: "ড়" },
  { roman: "y", bangla: "য়" }, { roman: "ng", bangla: "ং" }, { roman: "H", bangla: "ঃ" },
  { roman: "+ / .", bangla: "যুক্তাক্ষর" }
];

export default function PhoneticClient() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const outputText = inputText
    ? inputText.split("\n").map(line => line.split(" ").map(word => avroTransliterate(word)).join(" ")).join("\n")
    : "";

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!outputText) return;
    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `bangla-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="app-container">
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          Phonetic Bangla Typing
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Type in English (Banglish) and get Bangla Unicode output instantly.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Input */}
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
            English Input
          </label>
          <textarea
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type phonetic text here... (e.g. amar sonar bangla)"
            className="text-area-glow"
            style={{ resize: "vertical" }}
          />
        </div>

        {/* Output */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)" }}>
              Bangla Output
            </label>
            {outputText && (
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={handleCopy} className="btn-icon">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button onClick={handleDownload} className="btn-icon">
                  <Download size={12} />
                  <span>Download</span>
                </button>
                <button onClick={() => setInputText("")} className="btn-icon">
                  <RotateCcw size={12} />
                  <span>Clear</span>
                </button>
              </div>
            )}
          </div>
          <div className="text-area-glow-output" style={{ fontFamily: "var(--font-bangla)", fontSize: "1.1rem", lineHeight: 1.6, minHeight: 120 }}>
            {outputText || <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Bangla output appears here...</span>}
          </div>
        </div>
      </div>

      {/* Collapsible cheat sheet */}
      <div className="glass-card" style={{ padding: "16px 20px" }}>
        <button
          onClick={() => setShowRules(!showRules)}
          style={{
            width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
            background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", fontWeight: 700, fontSize: "0.85rem"
          }}
        >
          <span>Avro Phonetic Rules</span>
          {showRules ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showRules && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 6, marginTop: 16 }}>
            {AVRO_RULES.map((rule, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", padding: "6px 10px", borderRadius: "var(--radius-sm)", background: "var(--bg-base)", border: "1px solid var(--border)" }}>
                <code style={{ color: "var(--gold)", fontWeight: 700 }}>{rule.roman}</code>
                <span style={{ fontFamily: "var(--font-bangla)", color: "var(--text-primary)" }}>{rule.bangla}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
