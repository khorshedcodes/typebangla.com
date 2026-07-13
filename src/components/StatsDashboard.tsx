"use client";

import React, { useEffect } from "react";
import { useTypingStore } from "../store/typingStore";
import { BarChart3, RotateCcw, TrendingUp, Trophy } from "lucide-react";

export default function StatsDashboard({ minimal = false }: { minimal?: boolean }) {
  const {
    typedText,
    errorIndices,
    elapsedTime,
    history,
    loadHistory,
    clearHistory
  } = useTypingStore();

  useEffect(() => { loadHistory(); }, [loadHistory]);

  const liveWpm = elapsedTime === 0 ? 0 : Math.round((typedText.length / 5) / (elapsedTime / 60));
  const liveAccuracy = typedText.length === 0 ? 100 : Math.round(((typedText.length - errorIndices.length) / typedText.length) * 100);

  /* ── Minimal: just the stats bar ── */
  if (minimal) {
    return (
      <div className="hud-grid">
        <div className="hud-card">
          <div className="hud-value">{liveWpm}</div>
          <div className="hud-label">WPM</div>
        </div>
        <div className="hud-card">
          <div className="hud-value">{liveAccuracy}%</div>
          <div className="hud-label">Accuracy</div>
        </div>
        <div className="hud-card">
          <div className="hud-value">{elapsedTime}s</div>
          <div className="hud-label">Time</div>
        </div>
        <div className="hud-card">
          <div className="hud-value">{errorIndices.length}</div>
          <div className="hud-label">Errors</div>
        </div>
      </div>
    );
  }

  /* ── Full: trend chart + history ── */
  const trendHistory = [...history].reverse().slice(-7);
  const maxWpm = trendHistory.length > 0 ? Math.max(...trendHistory.map(h => h.wpm)) : 0;

  const totalTests = history.length;
  const avgWpm = totalTests > 0 ? Math.round(history.reduce((sum, h) => sum + h.wpm, 0) / totalTests) : 0;
  const peakWpm = totalTests > 0 ? Math.max(...history.map(h => h.wpm)) : 0;
  const avgAccuracy = totalTests > 0 ? Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / totalTests) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Lifetime Stats Overview */}
      <div>
        <h4 style={{ fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", marginBottom: 12 }}>
          <Trophy size={16} style={{ color: "var(--accent)" }} />
          <span>Lifetime Progress Stats</span>
        </h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          <div className="hud-card" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <div className="hud-value" style={{ color: "var(--accent)" }}>{avgWpm}</div>
            <div className="hud-label">Avg Speed (WPM)</div>
          </div>
          <div className="hud-card" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <div className="hud-value" style={{ color: "var(--gold)" }}>{peakWpm}</div>
            <div className="hud-label">Peak Speed (WPM)</div>
          </div>
          <div className="hud-card" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <div className="hud-value" style={{ color: "var(--correct)" }}>{avgAccuracy}%</div>
            <div className="hud-label">Avg Accuracy</div>
          </div>
          <div className="hud-card" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <div className="hud-value">{totalTests}</div>
            <div className="hud-label">Tests Completed</div>
          </div>
        </div>
      </div>

      {/* Trend */}
      <div className="glass-card" style={{ padding: "20px" }}>
        <h4 style={{ fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", marginBottom: 16 }}>
          <TrendingUp size={16} />
          <span>Speed Trend</span>
        </h4>

        {trendHistory.length === 0 ? (
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", padding: "20px 0" }}>
            Complete tests to see your progress.
          </p>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, borderBottom: "1px solid var(--border)" }}>
            {trendHistory.map((item, idx) => {
              const pct = maxWpm > 0 ? (item.wpm / maxWpm) * 80 + 10 : 10;
              return (
                <div key={item.id || idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700 }}>{item.wpm}</span>
                  <div style={{
                    width: "100%", height: `${pct}%`,
                    background: "var(--accent)", borderRadius: "3px 3px 0 0", opacity: 0.7
                  }} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="glass-card" style={{ padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)" }}>
              <BarChart3 size={16} />
              <span>Recent Results</span>
            </h4>
            <button
              onClick={clearHistory}
              style={{ background: "none", border: "none", color: "var(--incorrect)", fontSize: "0.7rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}
            >
              <RotateCcw size={10} /> Clear
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {history.slice(0, 5).map((h) => (
              <div key={h.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 12px", background: "var(--bg-base)", borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)", fontSize: "0.8rem"
              }}>
                <div>
                  <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{h.wpm} WPM</span>
                  <span style={{ color: "var(--text-muted)", marginLeft: 8 }}>{h.accuracy}%</span>
                </div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>{h.layout} · {h.duration}s</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
