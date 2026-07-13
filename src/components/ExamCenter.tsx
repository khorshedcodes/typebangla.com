"use client";

import React, { useState } from "react";
import { useTypingStore } from "../store/typingStore";
import { Award, Clock, FileText, Upload, Volume2, VolumeX, BookOpen, Shuffle } from "lucide-react";
import {
  ALL_EXAM_PASSAGES,
  ExamPassage,
  PassageLanguage,
  PassageDifficulty,
  getRandomPassage,
} from "../utils/lessons/exam/examPassages";

const DIFFICULTY_COLORS: Record<PassageDifficulty, string> = {
  easy:   "#10b981",
  medium: "#f59e0b",
  hard:   "#ef4444",
};

const DIFFICULTY_BN: Record<PassageDifficulty, string> = {
  easy:   "সহজ",
  medium: "মধ্যম",
  hard:   "কঠিন",
};

export default function ExamCenter() {
  const {
    selectedDuration,
    setSelectedDuration,
    setTargetText,
    soundEnabled,
    setSoundEnabled,
  } = useTypingStore();

  const [activeTextId, setActiveTextId]     = useState("");
  const [customText, setCustomText]         = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [langFilter, setLangFilter]         = useState<PassageLanguage | "all">("all");
  const [diffFilter, setDiffFilter]         = useState<PassageDifficulty | "all">("all");

  const filtered = ALL_EXAM_PASSAGES.filter((p) => {
    if (langFilter !== "all" && p.language !== langFilter) return false;
    if (diffFilter !== "all" && p.difficulty !== diffFilter) return false;
    return true;
  });

  const handleSelectPassage = (p: ExamPassage) => {
    setActiveTextId(p.id);
    setTargetText(p.text);
    setShowCustomInput(false);
  };

  const handleRandom = () => {
    const lang = langFilter === "all" ? undefined : langFilter;
    const p = getRandomPassage(lang);
    handleSelectPassage(p);
  };

  const handleLoadCustom = () => {
    if (!customText.trim()) return;
    setActiveTextId("custom");
    setTargetText(customText.trim());
  };

  return (
    <div className="glass-card flex flex-col gap-5">

      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ marginBottom: "0.25rem" }}>
            <Award size={20} className="text-emerald" />
            <span>Exam Center</span>
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            Classic literature excerpts — speed &amp; accuracy test
          </p>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="sound-toggle-btn"
          title={soundEnabled ? "Mute" : "Unmute"}
        >
          {soundEnabled
            ? <Volume2 size={18} className="text-correct" />
            : <VolumeX size={18} className="text-muted" />}
        </button>
      </div>

      {/* ── Timer ── */}
      <div className="flex flex-col gap-2">
        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}
               className="flex items-center gap-1">
          <Clock size={14} />
          <span>Test Duration:</span>
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[60, 120, 300, 0].map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedDuration(sec)}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-color)",
                backgroundColor: selectedDuration === sec ? "var(--primary-emerald)" : "var(--bg-secondary)",
                color: selectedDuration === sec ? "white" : "var(--text-secondary)",
                fontSize: "0.85rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {sec === 0 ? "Free Run" : `${sec / 60} Min`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* Language filter */}
        {(["all", "bangla", "english"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLangFilter(l)}
            style={{
              padding: "0.3rem 0.75rem",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: "600",
              border: "1px solid var(--border-color)",
              backgroundColor: langFilter === l ? "var(--primary-emerald)" : "var(--bg-secondary)",
              color: langFilter === l ? "white" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {l === "all" ? "সব / All" : l === "bangla" ? "বাংলা" : "English"}
          </button>
        ))}

        <div style={{ width: "1px", background: "var(--border-color)", margin: "0 0.25rem" }} />

        {/* Difficulty filter */}
        {(["all", "easy", "medium", "hard"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDiffFilter(d)}
            style={{
              padding: "0.3rem 0.75rem",
              borderRadius: "999px",
              fontSize: "0.78rem",
              fontWeight: "600",
              border: `1px solid ${d !== "all" ? DIFFICULTY_COLORS[d as PassageDifficulty] : "var(--border-color)"}`,
              backgroundColor: diffFilter === d
                ? (d !== "all" ? DIFFICULTY_COLORS[d as PassageDifficulty] : "var(--primary-emerald)")
                : "var(--bg-secondary)",
              color: diffFilter === d ? "white" : "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {d === "all" ? "সব Level" : DIFFICULTY_BN[d as PassageDifficulty]}
          </button>
        ))}

        {/* Random button */}
        <button
          onClick={handleRandom}
          title="Pick a random passage"
          style={{
            marginLeft: "auto",
            padding: "0.3rem 0.75rem",
            borderRadius: "999px",
            fontSize: "0.78rem",
            fontWeight: "600",
            border: "1px solid var(--border-color)",
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            transition: "all 0.2s",
          }}
        >
          <Shuffle size={13} />
          Random
        </button>
      </div>

      {/* ── Passage List ── */}
      <div className="flex flex-col gap-2">
        <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "var(--text-secondary)" }}
               className="flex items-center gap-1">
          <FileText size={14} />
          <span>Select Exam Text: <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>({filtered.length} passages)</span></span>
        </label>

        <div className="flex flex-col gap-1.5" style={{ maxHeight: "240px", overflowY: "auto", paddingRight: "0.25rem" }}>
          {filtered.map((p) => {
            const isActive = p.id === activeTextId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPassage(p)}
                style={{
                  textAlign: "left",
                  padding: "0.65rem 0.9rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: isActive ? "hsla(164, 95%, 23%, 0.12)" : "var(--bg-secondary)",
                  border: isActive ? "1px solid var(--primary-emerald)" : "1px solid var(--border-color)",
                  color: isActive ? "white" : "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: "0.15rem" }}>{p.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", fontSize: "0.75rem" }}>
                      <BookOpen size={11} />
                      <span>{p.author}</span>
                      <span style={{ opacity: 0.5 }}>·</span>
                      <span style={{ fontStyle: "italic" }}>{p.source}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.2rem", flexShrink: 0 }}>
                    <span style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      color: DIFFICULTY_COLORS[p.difficulty],
                      border: `1px solid ${DIFFICULTY_COLORS[p.difficulty]}`,
                      borderRadius: "999px",
                      padding: "0.1rem 0.45rem",
                    }}>
                      {DIFFICULTY_BN[p.difficulty]}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", textTransform: "capitalize" }}>
                      {p.language === "bangla" ? "বাংলা" : "English"}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "1.5rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
              No passages match the selected filters.
            </div>
          )}
        </div>
      </div>

      {/* ── Custom Text ── */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          style={{
            background: "transparent",
            border: "1px dashed var(--border-color)",
            borderRadius: "var(--radius-sm)",
            padding: "0.65rem",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "0.82rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "all 0.2s",
          }}
        >
          <Upload size={15} />
          <span>Use Custom Paragraph</span>
        </button>

        {showCustomInput && (
          <div className="flex flex-col gap-2" style={{ marginTop: "0.25rem" }}>
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste your custom Bengali or English text here..."
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
                padding: "0.75rem",
                color: "white",
                fontSize: "0.85rem",
                width: "100%",
                resize: "none",
                outline: "none",
              }}
            />
            <button
              onClick={handleLoadCustom}
              className="btn-primary"
              style={{ width: "100%", padding: "0.6rem" }}
            >
              Load Custom Paragraph
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
