"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTypingStore } from "../store/typingStore";

export default function TypingArea() {
  const {
    targetText,
    typedText,
    phoneticBuffer,
    activeLayout,
    isCompleted,
    handleKeystroke,
    inputLanguage,
    outputPreview
  } = useTypingStore();

  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) containerRef.current.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || isCompleted) return;
      if (
        e.code === "Space" ||
        e.code === "Backspace" ||
        (e.key.length === 1 && !e.ctrlKey && !e.altKey)
      ) {
        e.preventDefault();
        handleKeystroke(e.code, e.key, e.shiftKey);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, isCompleted, handleKeystroke]);

  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);

  const renderCharacters = () => {
    return Array.from(targetText).map((char, index) => {
      let charClass = "char-untyped";
      const isCurrent = index === typedText.length;

      if (index < typedText.length) {
        charClass = typedText[index] === char ? "char-correct" : "char-incorrect";
      } else if (isCurrent) {
        charClass = "char-current";
      }

      return (
        <span key={index} className={charClass} style={{ position: "relative" }}>
          {isCurrent && <span className="typing-cursor" />}
          {char}
        </span>
      );
    });
  };

  const isBanglaText = !targetText.match(/[a-zA-Z]/);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Avro preview */}
      {activeLayout === "avro" && inputLanguage === "latin" && outputPreview && (
        <div style={{
          fontSize: "1.1rem",
          color: "var(--gold)",
          padding: "10px 14px",
          background: "var(--gold-subtle)",
          border: "1px solid hsla(42,90%,55%,0.2)",
          borderRadius: "var(--radius-sm)",
          fontFamily: "var(--font-bangla)",
          lineHeight: 1.6
        }}>
          <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", letterSpacing: "0.05em", marginBottom: 4, fontWeight: 600 }}>
            Bangla Preview
          </span>
          {outputPreview}
        </div>
      )}

      {/* Typing container */}
      <div style={{ position: "relative" }}>
        {/* Focus overlay */}
        {!isFocused && !isCompleted && (
          <div
            onClick={() => containerRef.current?.focus()}
            style={{
              position: "absolute",
              inset: 0,
              background: "hsla(228, 12%, 7%, 0.8)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "var(--radius-lg)",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Click to focus
            </span>
          </div>
        )}

        {/* Text box */}
        <div
          ref={containerRef}
          tabIndex={0}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="glass-card typing-box-wrapper"
          style={{
            border: isFocused ? "1px solid var(--border-active)" : "1px solid var(--border)",
            outline: "none",
            fontFamily: isBanglaText ? "var(--font-bangla)" : "var(--font-sans)",
            fontSize: isBanglaText ? "1.6rem" : "1.35rem",
            cursor: "text",
            transition: "border-color 0.2s, filter 0.2s",
            filter: (!isFocused && !isCompleted) ? "blur(2px)" : "none"
          }}
        >
          {renderCharacters()}
        </div>
      </div>

      {/* Avro buffer indicator */}
      {activeLayout === "avro" && phoneticBuffer.length > 0 && (
        <div style={{ fontSize: "0.8rem", color: "var(--gold)", display: "flex", alignItems: "center", gap: 8 }}>
          <span>Buffer:</span>
          <code style={{ background: "var(--bg-elevated)", padding: "2px 8px", borderRadius: 4, fontSize: "0.75rem" }}>
            {phoneticBuffer}
          </code>
        </div>
      )}
    </div>
  );
}
