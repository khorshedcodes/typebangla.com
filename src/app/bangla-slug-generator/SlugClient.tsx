"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw, Globe, Info, Settings2 } from "lucide-react";

// Mappings for Bangla consonants, vowels, vowel signs, and modifiers to phonetic Roman characters
const BANGLA_PHONETIC_MAP: { [key: string]: string } = {
  // Independent Vowels
  "অ": "o", "আ": "a", "ই": "i", "ঈ": "i", "উ": "u", "ঊ": "u", "ঋ": "ri", "এ": "e", "ঐ": "oi", "ও": "o", "ঔ": "ou",
  // Vowel Signs (Kars)
  "া": "a", "ি": "i", "ী": "i", "ু": "u", "ূ": "u", "ৃ": "ri", "ে": "e", "ৈ": "oi", "ো": "o", "ৌ": "ou",
  // Consonants
  "ক": "k", "খ": "kh", "গ": "g", "ঘ": "gh", "ঙ": "ng", "চ": "c", "ছ": "ch", "জ": "j", "ঝ": "jh", "ঞ": "n",
  "ট": "t", "ঠ": "th", "ড": "d", "ঢ": "dh", "ণ": "n", "ত": "t", "থ": "th", "দ": "d", "ধ": "dh", "ন": "n",
  "প": "p", "ফ": "f", "ব": "b", "ভ": "v", "ম": "m", "য": "z", "র": "r", "ল": "l", "শ": "sh", "ষ": "sh",
  "স": "s", "হ": "h", "ড়": "r", "ঢ়": "rh", "য়": "y", "ৎ": "t",
  // Modifiers
  "ং": "ng", "ঃ": "h", "ঁ": "n", "্য": "y", "্র": "r"
};

export default function SlugClient() {
  const [inputText, setInputText] = useState("");
  const [separator, setSeparator] = useState("-");
  const [copiedType, setCopiedType] = useState<"unicode" | "phonetic" | null>(null);
  const [domainName, setDomainName] = useState("yoursite.com");
  const [urlPrefix, setUrlPrefix] = useState("blog");

  // Generate Bangla Unicode Slug (e.g. আমার-সোনার-বাংলা)
  const generateUnicodeSlug = (text: string) => {
    if (!text) return "";
    
    // Match non-Bangla and non-alphanumeric characters (excluding spaces which are replaced next)
    // Bangla range is \u0980-\u09FF
    const regex = /[^\u0980-\u09FFa-zA-Z0-9]+/g;
    let slug = text
      .trim()
      .replace(regex, separator)
      .toLowerCase();

    // Clean up duplicate, leading and trailing separators
    const escapedSep = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const duplicateRegex = new RegExp(`${escapedSep}+`, "g");
    const leadingRegex = new RegExp(`^${escapedSep}+`);
    const trailingRegex = new RegExp(`${escapedSep}+$`);

    slug = slug
      .replace(duplicateRegex, separator)
      .replace(leadingRegex, "")
      .replace(trailingRegex, "");

    return slug;
  };

  // Generate Phonetic English Slug (e.g. amar-sonar-bangla)
  const generatePhoneticSlug = (text: string) => {
    if (!text) return "";

    const words = text.trim().split(/\s+/).filter(Boolean);
    const phoneticWords = words.map((word) => {
      let mappedWord = "";
      const chars = Array.from(word);
      
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (BANGLA_PHONETIC_MAP[char] !== undefined) {
          mappedWord += BANGLA_PHONETIC_MAP[char];
        } else if (/[a-zA-Z0-9]/.test(char)) {
          mappedWord += char.toLowerCase();
        }
      }

      // Cleanup repeated vowel translations for readability (e.g. "aamar" -> "amar")
      return mappedWord
        .replace(/aa+/g, "a")
        .replace(/ee+/g, "e")
        .replace(/ii+/g, "i")
        .replace(/oo+/g, "o")
        .replace(/uu+/g, "u")
        .replace(/yy+/g, "y");
    });

    const slug = phoneticWords.filter(Boolean).join(separator);
    
    // Strip trailing/leading separator leftovers
    const escapedSep = separator.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const leadingRegex = new RegExp(`^${escapedSep}+`);
    const trailingRegex = new RegExp(`${escapedSep}+$`);

    return slug.replace(leadingRegex, "").replace(trailingRegex, "");
  };

  const unicodeSlug = generateUnicodeSlug(inputText);
  const phoneticSlug = generatePhoneticSlug(inputText);

  const handleCopy = (slugText: string, type: "unicode" | "phonetic") => {
    if (!slugText) return;
    navigator.clipboard.writeText(slugText);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <main className="app-container">
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
          Bangla URL Slug Generator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Convert Bangla text into SEO-friendly, clean URL slugs in phonetic English or formatted Unicode.
        </p>
      </div>

      <div className="tool-layout">
        {/* Left Column: Editor & Output */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Input Panel */}
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
              Bangla Input Text
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="এখানে বাংলা লিখুন বা পেস্ট করুন... (যেমন: আমার সোনার বাংলা)"
              className="text-area-glow"
              style={{ fontSize: "1.05rem", fontFamily: "var(--font-bangla)", resize: "vertical", lineHeight: 1.6 }}
            />
            {inputText && (
              <button 
                onClick={() => setInputText("")} 
                className="btn-icon" 
                style={{ alignSelf: "flex-end", gap: "4px" }}
              >
                <RotateCcw size={12} />
                <span>Clear Input</span>
              </button>
            )}
          </div>

          {/* Generated Slugs Outputs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Output 1: Unicode Bangla Slug */}
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>
                    Unicode Bangla Slug
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>
                    SEO-friendly Bangla characters. Browser will percent-encode this slug.
                  </span>
                </div>
                {unicodeSlug && (
                  <button 
                    onClick={() => handleCopy(unicodeSlug, "unicode")} 
                    className="btn-icon"
                    style={{
                      borderColor: copiedType === "unicode" ? "var(--accent)" : "var(--border)",
                      color: copiedType === "unicode" ? "var(--accent)" : "var(--text-muted)"
                    }}
                  >
                    {copiedType === "unicode" ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedType === "unicode" ? "Copied" : "Copy"}</span>
                  </button>
                )}
              </div>
              <div 
                className="text-area-glow-output" 
                style={{ 
                  fontFamily: "var(--font-bangla)", 
                  fontSize: "1.1rem", 
                  minHeight: "56px", 
                  display: "flex", 
                  alignItems: "center", 
                  backgroundColor: "var(--bg-base)" 
                }}
              >
                {unicodeSlug || <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Unicode slug will appear here...</span>}
              </div>
            </div>

            {/* Output 2: Phonetic English Slug */}
            <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--accent)" }}>
                    Phonetic English Slug (Recommended)
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block" }}>
                    English phonetic equivalent. Safe from percent-encoding when shared online.
                  </span>
                </div>
                {phoneticSlug && (
                  <button 
                    onClick={() => handleCopy(phoneticSlug, "phonetic")} 
                    className="btn-icon"
                    style={{
                      borderColor: copiedType === "phonetic" ? "var(--accent)" : "var(--border)",
                      color: copiedType === "phonetic" ? "var(--accent)" : "var(--text-muted)"
                    }}
                  >
                    {copiedType === "phonetic" ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedType === "phonetic" ? "Copied" : "Copy"}</span>
                  </button>
                )}
              </div>
              <div 
                className="text-area-glow-output" 
                style={{ 
                  fontFamily: "var(--font-sans)", 
                  fontSize: "1.1rem", 
                  minHeight: "56px", 
                  display: "flex", 
                  alignItems: "center", 
                  backgroundColor: "var(--bg-base)" 
                }}
              >
                {phoneticSlug || <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Phonetic slug will appear here...</span>}
              </div>
            </div>
          </div>

          {/* URL Address Bar Preview */}
          {(unicodeSlug || phoneticSlug) && (
            <div className="glass-card" style={{ border: "1px solid var(--border-active)" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                Live URL Preview
              </span>
              <div style={{ 
                background: "var(--bg-base)", 
                border: "1px solid var(--border)", 
                borderRadius: "var(--radius-md)", 
                padding: "8px 12px", 
                fontFamily: "monospace", 
                fontSize: "0.82rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                overflowX: "auto"
              }}>
                <Globe size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                <span style={{ color: "var(--text-muted)" }}>https://</span>
                <span style={{ color: "var(--text-primary)" }}>{domainName}</span>
                <span style={{ color: "var(--text-muted)" }}>/{urlPrefix}/</span>
                <span style={{ color: "var(--gold)", fontWeight: 600 }}>{phoneticSlug || unicodeSlug}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Settings & Information */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Settings Panel */}
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Settings2 size={16} style={{ color: "var(--accent)" }} />
              <span>Slug Settings</span>
            </h3>

            {/* Separator Select */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Slug Separator</span>
              <div style={{ display: "flex", gap: "6px" }}>
                {[
                  { value: "-", label: "Hyphen (-)" },
                  { value: "_", label: "Underscore (_)" }
                ].map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSeparator(s.value)}
                    className="btn-secondary"
                    style={{
                      flex: 1,
                      fontSize: "0.75rem",
                      padding: "8px 0",
                      borderColor: separator === s.value ? "var(--accent)" : "var(--border)",
                      color: separator === s.value ? "var(--text-primary)" : "var(--text-secondary)",
                      backgroundColor: separator === s.value ? "var(--accent-subtle)" : "var(--bg-elevated)"
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mock Site Customization */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600 }}>Live Preview Mock domain</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <input 
                  type="text" 
                  value={domainName} 
                  onChange={(e) => setDomainName(e.target.value)}
                  className="text-area-glow"
                  style={{ fontSize: "0.75rem", padding: "6px 8px" }}
                  placeholder="e.g. mysite.com"
                />
                <input 
                  type="text" 
                  value={urlPrefix} 
                  onChange={(e) => setUrlPrefix(e.target.value)}
                  className="text-area-glow"
                  style={{ fontSize: "0.75rem", padding: "6px 8px" }}
                  placeholder="e.g. posts"
                />
              </div>
            </div>
          </div>

          {/* Educational / Explanatory block */}
          <div className="glass-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Info size={16} style={{ color: "var(--gold)" }} />
              <span>Why do Bangla URL slugs get weird?</span>
            </h4>
            
            <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "10px" }}>
              <p>
                Browsers display clean Bangla words in the address bar (e.g. <code>/আমার-বাংলা</code>). 
                However, when you **copy-paste** that URL into a chat, document, or email, it turns into a long string of percent-encoded characters:
              </p>
              <div style={{ 
                background: "var(--bg-base)", 
                padding: "6px 8px", 
                borderRadius: "var(--radius-sm)", 
                fontFamily: "monospace", 
                fontSize: "0.7rem", 
                wordBreak: "break-all",
                color: "var(--incorrect)" 
              }}>
                /%E0%A6%86%E0%A6%AE%E0%A6%BE%E0%A6%B0-%E0%A6%AC...
              </div>
              <p>
                This causes broken formatting in messaging apps and makes URLs extremely long.
              </p>
              <p>
                <strong>Solution:</strong>
              </p>
              <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <li>Use **Phonetic Slugs** (like <code>amar-bangla</code>) to guarantee perfect sharing compatibility across Slack, Facebook, and emails.</li>
                <li>Use **Unicode Slugs** if you strictly target Bangla Search Engine Optimization (SEO).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
