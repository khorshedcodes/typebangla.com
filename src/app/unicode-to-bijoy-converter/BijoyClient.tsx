"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Download, ArrowRightLeft } from "lucide-react";
import { unicodeToBijoy, bijoyToUnicode } from "../../utils/bijoyConverter";

export default function BijoyClient() {
  const [inputText, setInputText] = useState("");
  const [copied, setCopied] = useState(false);
  const [direction, setDirection] = useState<"uniToBijoy" | "bijoyToUni">("uniToBijoy");

  const outputText = inputText
    ? direction === "uniToBijoy" ? unicodeToBijoy(inputText) : bijoyToUnicode(inputText)
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
    a.href = url; a.download = `bijoy-${Date.now()}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  const toggleDirection = () => {
    setDirection(prev => prev === "uniToBijoy" ? "bijoyToUni" : "uniToBijoy");
    setInputText(outputText);
  };

  return (
    <main className="app-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
            Unicode ↔ Bijoy Converter
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
            Convert between Unicode and Bijoy ANSI encoding.
          </p>
        </div>
        <button onClick={toggleDirection} className="btn-secondary" style={{ padding: "8px 16px", fontSize: "0.8rem" }}>
          <ArrowRightLeft size={13} />
          <span>{direction === "uniToBijoy" ? "Unicode → Bijoy" : "Bijoy → Unicode"}</span>
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>
            {direction === "uniToBijoy" ? "Unicode Input" : "Bijoy ANSI Input"}
          </label>
          <textarea
            rows={6}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={direction === "uniToBijoy" ? "Paste Unicode Bangla text here..." : "Paste Bijoy ANSI text here..."}
            className="text-area-glow"
            style={{ resize: "vertical", fontFamily: "var(--font-bangla)" }}
          />
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent)" }}>
              {direction === "uniToBijoy" ? "Bijoy ANSI Output" : "Unicode Output"}
            </label>
            {outputText && (
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={handleCopy} className="btn-icon">
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
                <button onClick={handleDownload} className="btn-icon">
                  <Download size={12} /> <span>Download</span>
                </button>
                <button onClick={() => setInputText("")} className="btn-icon">
                  <RotateCcw size={12} /> <span>Clear</span>
                </button>
              </div>
            )}
          </div>
          <div className="text-area-glow-output" style={{ fontFamily: "var(--font-bangla)", fontSize: "1.1rem", lineHeight: 1.6 }}>
            {outputText || <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Converted text appears here...</span>}
          </div>
        </div>
      </div>
    </main>
  );
}
