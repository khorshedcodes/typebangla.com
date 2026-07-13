"use client";

import React, { useEffect, useState } from "react";
import { useTypingStore, KeyboardLayout, SoundProfile, playTypewriterSound } from "../../store/typingStore";
import TypingArea from "../../components/TypingArea";
import VirtualKeyboard from "../../components/VirtualKeyboard";
import LessonSelector from "../../components/LessonSelector";
import ExamCenter from "../../components/ExamCenter";
import StatsDashboard from "../../components/StatsDashboard";
import { RotateCcw, Sparkles, Settings, X, Volume2, VolumeX } from "lucide-react";

export default function PracticeClient() {
  const {
    targetText,
    typedText,
    activeLayout,
    setActiveLayout,
    isStarted,
    isCompleted,
    elapsedTime,
    resetTest,
    updateElapsedTime,
    errorIndices,
    isRecapTest,
    startRecapTest,
    exitRecapTest,
    focusKeys,
    lessonType,
    soundEnabled,
    setSoundEnabled,
    soundVolume,
    setSoundVolume,
    soundProfile,
    setSoundProfile
  } = useTypingStore();

  const [activeSection, setActiveSection] = useState<"lessons" | "speedtest" | "dashboard">("lessons");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStarted && !isCompleted) {
      interval = setInterval(() => updateElapsedTime(), 1000);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isStarted, isCompleted, updateElapsedTime]);

  const finalWpm = Math.round((typedText.length / 5) / (elapsedTime / 60 || 1));
  const finalAccuracy = Math.round(((typedText.length - errorIndices.length) / (typedText.length || 1)) * 100);
  const nextChar = targetText[typedText.length] || "";

  return (
    <main className="app-container">
      {/* ── Top Control Bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        {/* Layout selector */}
        <div className="layout-selector-bar">
          {(["english", "unibijoy", "jatiya", "avro"] as KeyboardLayout[]).map((layout) => (
            <button
              key={layout}
              onClick={() => setActiveLayout(layout)}
              className={`layout-tab ${activeLayout === layout ? "active" : ""}`}
            >
              {layout === "english" ? "English" : layout === "unibijoy" ? "UniBijoy" : layout === "jatiya" ? "Jatiya" : "Avro"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {/* Settings */}
          <button onClick={() => setShowSettings(true)} className="btn-icon" title="Settings">
            <Settings size={13} />
            <span>Settings</span>
          </button>

          {/* Restart */}
          <button onClick={resetTest} className="btn-icon">
            <RotateCcw size={13} />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* ── Live Stats HUD ── */}
      <StatsDashboard minimal />

      {/* ── Typing Area ── */}
      <TypingArea />

      {/* ── Virtual Keyboard ── */}
      <VirtualKeyboard nextChar={nextChar} />

      {/* ── Section Switcher: Lessons / Speed Test / Dashboard ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="section-tabs">
          <button
            className={`section-tab ${activeSection === "lessons" ? "active" : ""}`}
            onClick={() => setActiveSection("lessons")}
          >
            Lessons
          </button>
          <button
            className={`section-tab ${activeSection === "speedtest" ? "active" : ""}`}
            onClick={() => setActiveSection("speedtest")}
          >
            Speed Test
          </button>
          <button
            className={`section-tab ${activeSection === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveSection("dashboard")}
          >
            Progress Stats
          </button>
        </div>

        {activeSection === "lessons" ? (
          <LessonSelector />
        ) : activeSection === "speedtest" ? (
          <ExamCenter />
        ) : (
          <StatsDashboard />
        )}
      </div>

      {/* ── Completion Modal ── */}
      {isCompleted && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "hsla(160,60%,42%,0.12)",
              color: "var(--accent)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <Sparkles size={24} />
            </div>

            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>
              {isRecapTest ? "Recap Complete!" : "Test Complete!"}
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              {isRecapTest ? "Great job on the recap challenge." : "Here are your results."}
            </p>

            <div className="stats-grid-large">
              <div className="stats-block-large">
                <div className="value">{Math.max(0, finalWpm)}</div>
                <div className="label">WPM</div>
              </div>
              <div className="stats-block-large">
                <div className="value">{Math.max(0, Math.min(100, finalAccuracy))}%</div>
                <div className="label">Accuracy</div>
              </div>
              <div className="stats-block-large">
                <div className="value">{elapsedTime}s</div>
                <div className="label">Time</div>
              </div>
            </div>

            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 24 }}>
              {errorIndices.length} errors · {typedText.length} keystrokes
            </p>

            <div style={{ display: "flex", gap: 10, width: "100%" }}>
              {isRecapTest ? (
                <>
                  <button onClick={resetTest} className="btn-secondary" style={{ flex: 1, padding: "12px" }}>Retry</button>
                  <button onClick={exitRecapTest} className="btn-primary" style={{ flex: 1, padding: "12px" }}>Back to Lesson</button>
                </>
              ) : (
                focusKeys && focusKeys !== "all" &&
                (lessonType === "drill" || lessonType === "combo" || lessonType === "pair") ? (
                  <>
                    <button onClick={resetTest} className="btn-secondary" style={{ flex: 1, padding: "12px" }}>Again</button>
                    <button onClick={startRecapTest} className="btn-primary" style={{ flex: 1, padding: "12px" }}>Recap Test</button>
                  </>
                ) : (
                  <button onClick={resetTest} className="btn-primary" style={{ width: "100%", padding: "12px" }}>
                    Practice Again
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
      {/* ── Settings Modal ── */}
      {showSettings && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-content" style={{ maxWidth: "420px", textAlign: "left", padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                <Settings size={18} style={{ color: "var(--accent)" }} />
                <span>Practice Settings</span>
              </h2>
              <button 
                onClick={() => setShowSettings(false)} 
                className="btn-icon" 
                style={{ border: "none", background: "none", padding: 4, color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <X size={18} />
              </button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Sound Toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>Typing Audio</span>
                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Mechanical audio feedback</span>
                </div>
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)} 
                  className="btn-icon"
                  style={{
                    borderColor: soundEnabled ? "var(--accent)" : "var(--border)",
                    color: soundEnabled ? "var(--accent)" : "var(--text-muted)",
                    backgroundColor: soundEnabled ? "var(--accent-subtle)" : "var(--bg-elevated)",
                    padding: "6px 12px",
                    gap: "6px"
                  }}
                >
                  {soundEnabled ? <Volume2 size={13} style={{ color: "var(--accent)" }} /> : <VolumeX size={13} />}
                  <span>{soundEnabled ? "On" : "Muted"}</span>
                </button>
              </div>
              
              {soundEnabled && (
                <>
                  {/* Volume Slider */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                      <span>Volume</span>
                      <span style={{ color: "var(--accent)" }}>{Math.round(soundVolume * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05" 
                      value={soundVolume}
                      onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                      style={{
                        width: "100%",
                        accentColor: "var(--accent)",
                        cursor: "pointer",
                        background: "var(--bg-elevated)",
                        height: "6px",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                    />
                  </div>
                  
                  {/* Sound Profile Selector */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)" }}>Sound Profile</span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {(["mechanical", "retro", "digital"] as SoundProfile[]).map((profile) => (
                        <button
                          key={profile}
                          onClick={() => {
                            setSoundProfile(profile);
                            setTimeout(() => playTypewriterSound("click"), 30);
                          }}
                          className="btn-secondary"
                          style={{
                            flex: 1,
                            fontSize: "0.75rem",
                            padding: "8px 0",
                            borderColor: soundProfile === profile ? "var(--accent)" : "var(--border)",
                            color: soundProfile === profile ? "var(--text-primary)" : "var(--text-secondary)",
                            backgroundColor: soundProfile === profile ? "var(--accent-subtle)" : "var(--bg-elevated)",
                            fontWeight: soundProfile === profile ? "700" : "500",
                          }}
                        >
                          <span style={{ textTransform: "capitalize" }}>{profile}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            
            <div style={{ marginTop: "24px" }}>
              <button onClick={() => setShowSettings(false)} className="btn-primary" style={{ width: "100%", padding: "10px" }}>
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
